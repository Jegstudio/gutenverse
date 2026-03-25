
import edit from './edit';
import save from './save';
import metadata from './block.json';
import { IconTabsSVG } from '../../../assets/icon/index';
import example from './data/example';
import saveV1 from './deprecated/v1/save';
import saveV2 from './deprecated/v2/save';

const { name, attributes, supports } = metadata;

export { metadata, name };

const deprecatedAttributes = {
    ...attributes,
    tabs: {
        type: 'array',
        source: 'query',
        selector: '.tab-heading-item',
        query: {
            tabId: {
                type: 'string',
                source: 'attribute',
                attribute: 'data-id',
            },
            text: {
                type: 'string',
                source: 'html',
                selector: 'span',
            },
        },
    },
};

export const settings = {
    icon: <IconTabsSVG />,
    example,
    edit,
    save,
    deprecated: [
        {
            attributes: deprecatedAttributes,
            supports,
            save: saveV2,
        },
        {
            attributes: deprecatedAttributes,
            supports,
            save: saveV1,
        },
    ]
};
