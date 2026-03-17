
import edit from './edit';
import save from './save';
import metadata from './block.json';
import { IconButtonSVG } from '../../../assets/icon/index';
import example from './data/example';
import saveV1 from './deprecated/v1/save';
import saveV2 from './deprecated/v2/save';
import saveV3 from './deprecated/v3/save';

const { name, attributes, supports } = metadata;

export { metadata, name };

export const settings = {
    icon: <IconButtonSVG />,
    example,
    edit,
    save,
    deprecated: [
        {
            attributes,
            supports: supports,
            save: saveV1
        },
        {
            attributes,
            supports: supports,
            save: saveV2
        },
        {
            attributes,
            supports: supports,
            save: saveV3
        },
    ],
    usesContext: ['hoverWithParent', 'parentSelector'],
};
