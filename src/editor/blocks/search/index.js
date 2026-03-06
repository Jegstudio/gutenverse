
import edit from './edit';
import save from './save';
import saveV1 from './deprecated/v1/save';
import saveV2 from './deprecated/v2/save';
import saveV3 from './deprecated/v3/save';
import metadata from './block.json';
import { IconSearchSVG } from '../../../assets/icon/index';

const { name, attributes, support } = metadata;

export { metadata, name };

export const settings = {
    icon: <IconSearchSVG />,
    edit,
    save,
    deprecated: [
        {
            attributes,
            save: saveV1
        },
        {
            support,
            attributes,
            save: saveV2,
        },
        {
            support,
            attributes,
            save: saveV3,
        }
    ]
};
