
import edit from './edit';
import save from './save';
import metadata from './block.json';
import { IconPortfolioGallerySVG } from '../../../assets/icon/index';
import example from './data/example';
import saveV1 from './deprecated/v1/save';

const { name, attributes, supports } = metadata;

export { metadata, name };
export const settings = {
    icon: <IconPortfolioGallerySVG />,
    example,
    edit,
    save,
    deprecated: [
        {
            attributes,
            supports,
            save: saveV1,
        }
    ]
};
