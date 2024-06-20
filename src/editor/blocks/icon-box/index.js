
import edit from './edit';
import save from './save';
import saveV1 from './deprecated/v1/save';
import saveV2 from './deprecated/v2/save';
import saveV3 from './deprecated/v3/save';
import metadata from './block.json';
import { IconBoxSVG } from '../../../assets/icon/index';
import example from './data/example';

const { name, attributes } = metadata;

export { metadata, name };

export const settings = {
    icon: <IconBoxSVG />,
    example: example,
    edit,
    save,
    providesContext: {
        'hoverWithParent': 'hoverWithParent',
        'parentSelector' : 'parentSelector'
    },
    deprecated: [
        {
            attributes,
            save: saveV1
        },
        {
            attributes,
            save: saveV2
        },
        {
            attributes,
            save: saveV3
        }
    ]
};
