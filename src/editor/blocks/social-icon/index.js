
import edit from './edit';
import save from './save';
import metadata from './block.json';
import { IconSocialSVG } from '../../../assets/icon/index';
import saveV1 from './deprecated/v1/save';
import saveV2 from './deprecated/v2/save';

const { name, attributes } = metadata;

export { metadata, name };

const v2Attributes = {
    ...attributes,
    icon: {
        type: 'string',
        source: 'attribute',
        selector: 'i',
        attribute: 'class',
        default: 'fab fa-wordpress',
    },
};

export const settings = {
    icon: <IconSocialSVG />,
    edit,
    save,
    deprecated: [
        {
            attributes: v2Attributes,
            save: saveV2
        },
        {
            attributes: v2Attributes,
            save: saveV1
        }
    ]
};
