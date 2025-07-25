
import edit from './edit';
import save from './save';
import saveV1 from './deprecated/v1/save';
import metadata from './block.json';
import { IconFunFactSVG } from '../../../assets/icon/index';
import example from './data/example';

const { name, attributes } = metadata;

export { metadata, name };

export const settings = {
    icon: <IconFunFactSVG />,
    example: example,
    edit,
    save,
    deprecated: [
        {
            attributes,
            save: saveV1,
        }
    ]
};
