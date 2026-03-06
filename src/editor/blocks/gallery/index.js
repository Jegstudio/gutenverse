
import edit from './edit';
import save from './save';
import metadata from './block.json';
import { IconGallerySVG } from '../../../assets/icon/index';
import example from './data/example';
import saveV1 from './deprecated/v1/save';
import saveV2 from './deprecated/v2/save';
import saveV3 from './deprecated/v3/save';
import saveV4 from './deprecated/v4/save';
import saveV5 from './deprecated/v5/save';

const { name, attributes } = metadata;

export { metadata, name };
export const settings = {
    icon: <IconGallerySVG />,
    example,
    edit,
    save,
    deprecated: [
        {
            attributes: {
                ...attributes,
                showed: {
                    type: 'int',
                    default: 6,
                    deprecated: true,
                },
                animationDuration: {
                    type: 'int',
                    default: 500,
                    copyStyle: true,
                    deprecated: true,
                },
                itemsPerLoad: {
                    type: 'int',
                    deprecated: true,
                },
            },
            migrate: (attributes) => {
                const { showed } = attributes;
                const newAttributes = {
                    ...attributes,
                    showed: parseInt(showed),
                };

                return [
                    newAttributes
                ];
            },
            save: saveV1
        },
        {
            attributes: {
                ...attributes,
                showed: {
                    type: 'int',
                    default: 6,
                    deprecated: true,
                },
                animationDuration: {
                    type: 'int',
                    default: 500,
                    copyStyle: true,
                    deprecated: true,
                },
                itemsPerLoad: {
                    type: 'int',
                    deprecated: true,
                },
                images: {
                    type: 'array',
                    default: [
                        {
                            id: 'Two'
                        },
                        {
                            id: 'Three'
                        },
                        {
                            id: 'Four'
                        },
                        {
                            id: 'Five'
                        }
                    ],
                    deprecated: true,
                }
            },
            save: saveV2,
        },
        {
            attributes: {
                ...attributes,
                showed: {
                    type: 'int',
                    default: 6,
                    deprecated: true,
                },
                animationDuration: {
                    type: 'int',
                    default: 500,
                    copyStyle: true,
                    deprecated: true,
                },
                itemsPerLoad: {
                    type: 'int',
                    deprecated: true,
                },
            },
            save: saveV3,
        },
        {
            attributes: attributes,
            save: saveV4
        },
        {
            attributes: attributes,
            save: saveV5
        },
    ]
};
