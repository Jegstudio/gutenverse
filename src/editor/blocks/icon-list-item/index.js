
import edit from './edit';
import save from './save';
import metadata from './block.json';
import saveV1 from './deprecated/v1/save';
import saveV2 from './deprecated/v2/save';
import saveV3 from './deprecated/v3/save';
import { IconListItemSVG } from '../../../assets/icon/index';

const { name, attributes, supports } = metadata;

export { metadata, name };

const v2Attributes = {
    ...attributes,
    icon: {
        type: 'string',
        source: 'attribute',
        selector: 'i',
        attribute: 'class',
        default: '',
    },
    url: {
        type: 'string',
        source: 'attribute',
        selector: 'a',
        attribute: 'href',
    },
    linkTarget: {
        type: 'string',
        source: 'attribute',
        selector: 'a',
        attribute: 'target',
    },
    rel: {
        type: 'string',
        source: 'attribute',
        selector: 'a',
        attribute: 'rel',
    },
    text: {
        type: 'string',
        source: 'html',
        selector: 'span',
        default: 'List item',
    },
};

const v3Attributes = {
    ...attributes,
    url: {
        type: 'string',
        source: 'attribute',
        selector: 'a',
        attribute: 'href',
    },
    linkTarget: {
        type: 'string',
        source: 'attribute',
        selector: 'a',
        attribute: 'target',
    },
    rel: {
        type: 'string',
        source: 'attribute',
        selector: 'a',
        attribute: 'rel',
    },
    text: {
        type: 'string',
        source: 'html',
        selector: 'span',
        default: 'List item',
    },
};

export const settings = {
    icon: <IconListItemSVG />,
    edit,
    save,
    deprecated: [
        {
            attributes: v3Attributes,
            supports,
            save: saveV3
        },
        {
            attributes: v2Attributes,
            supports,
            save: saveV2
        },
        {
            attributes: v2Attributes,
            supports,
            save: saveV1
        }
    ]
};
