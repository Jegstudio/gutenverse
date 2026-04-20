
import edit from './edit';
import save from './save';
import metadata from './block.json';
import { IconGmapsSVG } from '../../../assets/icon/index';
import example from './data/example';
import saveV1 from './deprecated/v1/save';
import saveV2 from './deprecated/v2/save';

const { name, attributes, supports } = metadata;

export { metadata, name };

export const settings = {
    icon: <IconGmapsSVG />,
    example,
    edit,
    save,
    deprecated: [
        {
            attributes,
            supports,
            save: saveV2,
        },
        {
            attributes,
            supports,
            save: saveV1,
        },
    ]
};
