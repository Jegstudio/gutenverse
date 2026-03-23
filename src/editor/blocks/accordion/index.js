
import edit from './edit';
import save from './save';
import metadata from './block.json';
import { IconAccordionSVG } from '../../../assets/icon/index';
import saveV1 from './deprecated/v1/save';
import saveV2 from './deprecated/v2/save';
import attrV1 from './deprecated/attrV1/attributes.json';

const { name, attributes, supports } = metadata;
export { metadata, name };

export const settings = {
    icon: <IconAccordionSVG />,
    edit,
    save,
    deprecated: [
        {
            attributes: attrV1,
            supports,
            save: saveV1
        },
        {
            attributes: attrV1,
            supports,
            save: saveV2
        }
    ]
};
