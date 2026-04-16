
import edit from './edit';
import saveV1 from './deprecated/v1/save';
import saveV2 from './deprecated/v2/save';
import save from './save';
import metadata from './block.json';
import { IconCountdownSVG } from '../../../assets/icon/index';
import example from './data/example';

const { name, attributes, support } = metadata;

export { metadata, name };

export const settings = {
    icon: <IconCountdownSVG />,
    example,
    edit,
    save,
    deprecated: [
        {
            support,
            attributes,
            save: saveV2
        },
        {
            support,
            attributes,
            save: saveV1
        },
    ]
};
