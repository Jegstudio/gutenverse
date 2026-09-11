
import edit from './edit';
import save from './save';
import saveV1 from './deprecated/v1/save';
import saveV2 from './deprecated/v2/save';
import saveV3 from './deprecated/v3/save';
import metadata from './block.json';
import { IconImageSVG } from '../../../assets/icon/index';
import example from './data/example';


const { name, attributes } = metadata;
const deprecatedAttributes = {
    ...attributes,
    linkTarget: {
        ...attributes.linkTarget,
        source: 'attribute',
        selector: 'a',
        attribute: 'target'
    },
    rel: {
        ...attributes.rel,
        source: 'attribute',
        selector: 'a',
        attribute: 'rel'
    }
};

export { metadata, name };

export const settings = {
    icon: <IconImageSVG />,
    example,
    edit,
    save,
    deprecated: [
        {
            attributes: deprecatedAttributes,
            save: saveV3
        },
        {
            attributes: deprecatedAttributes,
            save: saveV2
        },
        {
            attributes: deprecatedAttributes,
            save: saveV1
        }
    ]
};
