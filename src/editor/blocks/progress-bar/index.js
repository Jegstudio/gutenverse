
import edit from './edit';
import save from './save';
import metadata from './block.json';
import { IconProgressBarSVG } from '../../../assets/icon/index';
import example from './data/example';
import saveV1 from './deprecated/v1/save';

const { name, attributes } = metadata;

export { metadata, name };

export const settings = {
    icon: <IconProgressBarSVG />,
    example,
    edit,
    save,
    deprecated: [
        {
            attributes: {
                ...attributes,
                percentage: {
                    type: 'int',
                    default: 75,
                    deprecated: true,
                },
                duration: {
                    type: 'int',
                    default: 3500,
                    deprecated: true,
                },
            },
            migrate: (attributes) => {
                const { percentage, duration } = attributes;
                const newAttributes = {
                    ...attributes,
                    percentage: parseInt(percentage),
                    duration: parseInt(duration)
                };

                return [
                    newAttributes
                ];
            },
            save: saveV1
        }
    ]
};