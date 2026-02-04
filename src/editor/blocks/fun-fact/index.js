
import edit from './edit';
import save from './save';
import saveV1 from './deprecated/v1/save';
import saveV2 from './deprecated/v2/save';
import saveV3 from './deprecated/v3/save';
import saveV4 from './deprecated/v4/save';
import saveV5 from './deprecated/v5/save';
import metadata from './block.json';
import { IconFunFactSVG } from '../../../assets/icon/index';
import example from './data/example';

const { name, attributes, supports } = metadata;

export { metadata, name };

export const settings = {
    icon: <IconFunFactSVG />,
    example,
    edit,
    save,
    deprecated: [
        {
            attributes,
            supports,
            save: saveV5,
        },
        {
            attributes,
            supports,
            save: saveV4,
        },
        {
            attributes,
            supports,
            save: saveV3,
        },
        {
            attributes: {
                ...attributes,
                number: {
                    type: 'string',
                    deprecated: true,
                },
            },
            migrate: (attributes) => {
                const { number } = attributes;
                const newAttributes = {
                    ...attributes,
                    safeNumber: number,
                };

                return [
                    newAttributes
                ];
            },
            save: saveV2,
        },
        {
            attributes,
            save: saveV1,
        },
    ]
};
