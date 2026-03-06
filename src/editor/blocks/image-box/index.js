
import edit from './edit';
import save from './save';
import saveV1 from './deprecated/v1/save';
import saveV2 from './deprecated/v2/save';
import saveV3 from './deprecated/v3/save';
import saveV4 from './deprecated/v4/save';
import saveV5 from './deprecated/v5/save';
import metadata from './block.json';
import { IconImageBoxSVG } from '../../../assets/icon/index';
import example from './data/example';

const { name, attributes } = metadata;

export { metadata, name };

export const settings = {
    icon: <IconImageBoxSVG />,
    example,
    edit,
    save,
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
        },
        {
            attributes,
            save: saveV4
        },
        {
            attributes,
            save: saveV5
        }
    ]
};
