
import edit from './edit';
import save from './save';
import metadata from './block.json';
import { IconBreadcrumbSVG } from '../../../assets/icon/index';

const { name, attributes, supports } = metadata;

export { metadata, name };

export const settings = {
    icon: <IconBreadcrumbSVG />,
    edit,
    save,
};
