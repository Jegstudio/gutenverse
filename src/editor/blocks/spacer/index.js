
import edit from './edit';
import save from './save';
import metadata from './block.json';
import { IconSpacerSVG } from '../../../assets/icon/index';
import example from './data/example';

const { name } = metadata;

export { metadata, name };

export const settings = {
    icon: <IconSpacerSVG />,
    example,
    edit,
    save,
};
