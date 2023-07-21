
import edit from './edit';
import save from './save';
import metadata from './block.json';
import example from './data/example';
import { IconDividerSVG } from '../../../assets/icon/index';

const { name } = metadata;

export { metadata, name };

export const settings = {
    icon: <IconDividerSVG />,
    example: example,
    edit,
    save,
};