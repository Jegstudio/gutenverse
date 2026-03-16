
import edit from './edit';
import saveV3 from './save';
import metadata from './block.json';
import { IconDualButtonSVG } from '../../../assets/icon/index';
import example from './data/example';
import saveV1 from './deprecated/v1/save';
import saveV2 from './deprecated/v2/save';
import save from './deprecated/v3/save';

const { name, attributes, supports } = metadata;

export { metadata, name };

export const settings = {
    icon: <IconDualButtonSVG />,
    example,
    edit,
    save,
    deprecated: [
        {
            attributes: attributes,
            supports,
            save: saveV1
        },
        {
            attributes: attributes,
            supports,
            save: saveV2
        },
        {
            attributes: attributes,
            supports,
            save: saveV3
        },
    ],
};
