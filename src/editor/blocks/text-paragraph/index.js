
import edit from './edit';
import save from './save';
import metadata from './block.json';
import example from './data/example';
import { IconTextParagraphSVG } from '../../../assets/icon/index';
import saveV1 from './deprecated/v1/save';
import saveV2 from './deprecated/v2/save';
import attrV2 from './deprecated/attrV2/attributes.json';

const { name, attributes } = metadata;

export { metadata, name };

export const settings = {
    icon: <IconTextParagraphSVG />,
    example,
    edit,
    save,
    deprecated: [
        {
            attributes: attrV2,
            save: saveV2,
        },
        {
            attributes,
            save: saveV1,
        },
    ]
};
