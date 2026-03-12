
import edit from './edit';
import save from './save';
import metadata from './block.json';
import { IconSocialSVG } from '../../../assets/icon/index';
import example from './data/example';

const { name } = metadata;

export { metadata, name };

export const settings = {
    icon: <IconSocialSVG />,
    example,
    edit,
    save,
};
