
import edit from './edit';
import save from './save';
import metadata from './block.json';
import { IconSocialSVG } from '../../../assets/icon/index';
import saveV1 from './deprecated/v1/save';
import saveV2 from './deprecated/v2/save';
import saveV3 from './deprecated/v3/save';

const { name, attributes } = metadata;

export { metadata, name };

// OLD Attributes with sources for deprecations
const v3Attributes = {
    ...attributes,
    url: {
        type: 'string',
        source: 'attribute',
        selector: 'a',
        attribute: 'href'
    },
    linkTarget: {
        type: 'string',
        source: 'attribute',
        selector: 'a',
        attribute: 'target'
    },
    rel: {
        type: 'string',
        source: 'attribute',
        selector: 'a',
        attribute: 'rel'
    },
    text: {
        type: 'string',
        source: 'html',
        selector: 'span'
    },
};

const v2Attributes = {
    ...v3Attributes,
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
            attributes: v3Attributes,
            save: saveV3,
            migrate(attr) {
                return attr;
            },
        },
        {
            attributes: v2Attributes,
            save: saveV2,
            migrate(attr) {
                return attr;
            },
        },
        {
            attributes: v2Attributes,
            save: saveV1,
            migrate(attr) {
                return attr;
            },
        },
    ],
};
