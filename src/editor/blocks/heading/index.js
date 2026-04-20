/* Gutenverse dependencies */
import { IconHeadingSVG } from '../../../assets/icon/index';

/* Local dependencies */
import edit from './edit';
import save from './save';
import saveV1 from './deprecated/v1/save';
import attrV1 from './deprecated/v1/attributes.json';
import saveV2 from './deprecated/v2/save';
import attrV2 from './deprecated/attrV2/attributes.json';
import saveV3 from './deprecated/v3/save';
import metadata from './block.json';
import example from './data/example';

const { name, supports } = metadata;

export { metadata, name };

export const settings = {
    icon: <IconHeadingSVG />,
    example,
    edit,
    save,
    deprecated: [
        {
            attributes: {
                ...attrV2,
                anchor: {
                    type: 'string',
                    source: 'attribute',
                    selector: 'h1, h2, h3, h4, h5, h6',
                    attribute: 'id'
                }
            },
            migrate: (attributes) => {
                return {
                    ...attributes,
                    content: attributes.content
                };
            },
            supports: supports,
            save: saveV3
        },
        {
            attributes: attrV2,
            migrate: (attributes) => {
                return {
                    ...attributes,
                    content: attributes.content
                };
            },
            supports: supports,
            save: saveV2
        },
        {
            attributes: attrV1,
            migrate: (attributes) => {
                return {
                    ...attributes,
                    content: attributes.content
                };
            },
            supports: supports,
            save: saveV1
        },
    ]
};
