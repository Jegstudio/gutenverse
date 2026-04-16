
import edit from './edit';
import save from './save';
import saveV1 from './deprecated/v1/save';
import saveV2 from './deprecated/v2/save';
import saveV3 from './deprecated/v3/save';
import saveV4 from './deprecated/v4/save';
import saveV5 from './deprecated/v5/save';
import saveV6 from './deprecated/v6/save';
import metadata from './block.json';
import { IconImageBoxSVG } from '../../../assets/icon/index';
import example from './data/example';

const { name, attributes } = metadata;

export { metadata, name };

// v6 attributes: same as current but with old source-based linkTarget and rel
const v6Attributes = {
    ...attributes,
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
};

export const settings = {
    icon: <IconImageBoxSVG />,
    example,
    edit,
    save,
    deprecated: [
        {
            attributes: v6Attributes,
            save: saveV6,
            migrate(attr) {
                return attr;
            },
        },
        {
            attributes,
            save: saveV5,
        },
        {
            attributes,
            save: saveV4,
        },
        {
            attributes,
            save: saveV3,
        },
        {
            attributes,
            save: saveV2,
        },
        {
            attributes,
            save: saveV1,
        },
    ],
};
