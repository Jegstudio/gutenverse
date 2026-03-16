
import edit from './edit';
import save from './save';
import metadata from './block.json';
import { IconButtonSVG } from '../../../assets/icon/index';
import example from './data/example';
import saveV1 from './deprecated/v1/save';
import saveV2 from './deprecated/v2/save';
import saveV3 from './deprecated/v3/save';

const { name, attributes, supports } = metadata;

export { metadata, name };

const attrUntilV3 = {
    ...attributes,
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
};

export const settings = {
    icon: <IconButtonSVG />,
    example,
    edit,
    save,
    deprecated: [
        {
            attributes: attrUntilV3,
            supports: supports,
            save: saveV1
        },
        {
            attributes: attrUntilV3,
            supports: supports,
            save: saveV2
        },
        {
            attributes: attrUntilV3,
            supports: supports,
            save: saveV3
        },
    ],
    usesContext: ['hoverWithParent', 'parentSelector'],
};
