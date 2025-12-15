
import edit from './edit';
import save from './save';
import metadata from './block.json';
import { IconButtonSVG } from '../../../assets/icon/index';
import example from './data/example';
import saveV1 from './deprecated/v1/save';

const { name, attributes } = metadata;

export { metadata, name };

export const settings = {
    icon: <IconButtonSVG />,
    example,
    edit,
    save,
    deprecated: [
        {
            attributes: attributes,
            save: saveV1
        },
    ],
    usesContext: ['hoverWithParent', 'parentSelector'],
};
