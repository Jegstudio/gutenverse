/* Gutenverse dependencies */
import { IconHeadingSVG } from '../../../assets/icon/index';

/* Local dependencies */
import edit from './edit';
import save from './save';
import saveV1 from './deprecated/v1/save';
import attrV1 from './deprecated/v1/attributes.json';
import saveV2 from './deprecated/v2/save';
import attrV2 from './deprecated/attrV2/attributes.json';
import metadata from './block.json';
import example from './data/example';

const { name, supports } = metadata;

export { metadata, name };

export const settings = {
    icon: <IconHeadingSVG />,
    example,
    edit,
    save,
    deprecated: [
        {
            attributes: attrV1,
            supports: supports,
            save: saveV1
        },
        {
            attributes: attrV2,
            supports: supports,
            save: saveV2
        }
    ]
};
