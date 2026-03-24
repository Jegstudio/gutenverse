
import edit from './edit';
import save from './save';
import metadata from './block.json';
import saveV1 from './deprecated/v1/save';
import saveV2 from './deprecated/v2/save';
import saveV3 from './deprecated/v3/save';
import { IconListItemSVG } from '../../../assets/icon/index';
import attrV1 from './deprecated/attrV1/attributes.json';
import attrV2 from './deprecated/attrV2/attributes.json';


const { name, supports } = metadata;

export { metadata, name };

export const settings = {
    icon: <IconListItemSVG />,
    edit,
    save,
    deprecated: [
        {
            attributes: attrV2,
            supports,
            migrate: (attributes) => {
                return {
                    ...attributes,
                    icon: attributes.icon,
                    url: attributes.url,
                    linkTarget: attributes.linkTarget,
                    rel: attributes.rel,
                    text: attributes.text
                };
            },
            save: saveV3
        },
        {
            attributes: attrV1,
            supports,
            migrate: (attributes) => {
                return {
                    ...attributes,
                    icon: attributes.icon
                };
            },
            save: saveV2
        },
        {
            attributes: attrV1,
            supports,
            migrate: (attributes) => {
                return {
                    ...attributes,
                    icon: attributes.icon
                };
            },
            save: saveV1
        }
    ]
};
