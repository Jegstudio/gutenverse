/* External dependencies */


/* Gutenverse dependencies */
import { IconHeadingSVG } from '../../../assets/icon/index';

/* Local dependencies */
import edit from './edit';
import save from './save';
import saveV1 from './deprecated/v1/save';
import attrV1 from './deprecated/v1/attributes.json';
import metadata from './block.json';
import example from './data/example';

const { name } = metadata;

export { metadata, name };

export const settings = {
    icon: <IconHeadingSVG />,
    example,
    edit,
    save,
    deprecated: [
        {
            attributes: attrV1,
            save: saveV1
        }
    ]
};
