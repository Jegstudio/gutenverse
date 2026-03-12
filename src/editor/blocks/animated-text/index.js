
import edit from './edit';
import save from './save';
import metadata from './block.json';
import example from './data/example';
import { IconAnimatedTextSVG } from '../../../assets/icon/index';
import saveV1 from './deprecated/v1/save';
import saveV2 from './deprecated/v2/save';
import saveV3 from './deprecated/v3/save';
import saveV4 from './deprecated/v4/save';

const { name, attributes, supports } = metadata;

export { metadata, name };

export const settings = {
    icon: <IconAnimatedTextSVG />,
    example,
    edit,
    save,
    deprecated: [
        {
            attributes,
            supports,
            save: saveV1
        },
        {
            attributes,
            supports,
            save: saveV2
        },
        {
            attributes,
            supports,
            save: saveV3
        },
        {
            attributes,
            supports,
            save: saveV4
        }
    ]
};
