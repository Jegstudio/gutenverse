
import edit from './edit';
import save from './save';
import metadata from './block.json';
import { IconStarRatingSVG } from '../../../assets/icon/index';
import example from './data/example';
import saveV1 from './deprecated/v1/save';

const { name, attributes } = metadata;

export { metadata, name };

export const settings = {
    icon: <IconStarRatingSVG />,
    example,
    edit,
    save,
    deprecated: [
        {
            attributes: {
                ...attributes,
                rating: {
                    type: 'int',
                    default: 7,
                    deprecated: true,
                },
                total: {
                    type: 'int',
                    default: 10,
                    deprecated: true,
                },
            },
            migrate: (attributes) => {
                const { rating, total } = attributes;
                const newAttributes = {
                    ...attributes,
                    rating: parseFloat(rating),
                    total: parseFloat(total)
                };

                return [
                    newAttributes
                ];
            },
            save: saveV1
        }
    ],
};
