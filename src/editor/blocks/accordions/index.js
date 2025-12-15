
import edit from './edit';
import save from './save';
import metadata from './block.json';
import { IconAccordionSVG } from '../../../assets/icon/index';
import example from './data/example';
import saveV1 from './deprecated/v1/save';

const { name, attributes } = metadata;

export { metadata, name };

export const settings = {
    icon: <IconAccordionSVG />,
    example,
    edit,
    deprecated: [
        {
            attributes: attributes,
            save: saveV1
        },
    ],
    save,
};
