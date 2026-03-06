
import edit from './edit';
import save from './save';
import saveV1 from './deprecated/v1/save';
import metadata from './block.json';
import { IconListSVG } from '../../../assets/icon/index';
import example from './data/example';

const { name, attributes, supports } = metadata;

export { metadata, name };

export const settings = {
    icon: <IconListSVG />,
    example,
    edit,
    save,
    deprecated: [
        {
            attributes: attributes,
            supports,
            save: saveV1,
        }
    ]
};
