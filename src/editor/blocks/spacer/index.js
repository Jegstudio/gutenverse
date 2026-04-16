
import edit from './edit';
import save from './save';
import metadata from './block.json';
import { IconSpacerSVG } from '../../../assets/icon/index';
import example from './data/example';
import saveV1 from './deprecated/v1/save';

const { name, attributes, supports } = metadata;

export { metadata, name };

export const settings = {
    icon: <IconSpacerSVG />,
    example,
    edit,
    save,
    deprecated: [
        {
            supports,
            attributes,
            save: saveV1,
        }
    ]
};
