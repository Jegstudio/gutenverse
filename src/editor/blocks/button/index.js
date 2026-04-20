
import edit from './edit';
import save from './save';
import metadata from './block.json';
import { IconButtonSVG } from '../../../assets/icon/index';
import example from './data/example';
import saveV1 from './deprecated/v1/save';
import saveV2 from './deprecated/v2/save';
import saveV3 from './deprecated/v3/save';
import attrV1 from './deprecated/attrV1/attributes.json';

const { name, supports } = metadata;

export { metadata, name };

export const settings = {
    icon: <IconButtonSVG />,
    example,
    edit,
    save,
    deprecated: [
        {
            attributes: attrV1,
            supports: supports,
            migrate: (attributes) => {
                return {
                    ...attributes,
                    linkTarget: attributes.linkTarget,
                    rel: attributes.rel,
                };
            },
            save: saveV3
        },
        {
            attributes: attrV1,
            supports: supports,
            migrate: (attributes) => {
                return {
                    ...attributes,
                    linkTarget: attributes.linkTarget,
                    rel: attributes.rel,
                };
            },
            save: saveV2
        },
        {
            attributes: attrV1,
            supports: supports,
            migrate: (attributes) => {
                return {
                    ...attributes,
                    linkTarget: attributes.linkTarget,
                    rel: attributes.rel,
                };
            },
            save: saveV1
        },
    ],
    usesContext: ['hoverWithParent', 'parentSelector'],
};
