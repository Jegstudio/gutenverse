
import edit from './edit';
import save from './save';
import metadata from './block.json';
import { IconPostTermsSVG } from '../../../assets/icon/index';

const { name } = metadata;

export { metadata, name };

export const settings = {
    icon: <IconPostTermsSVG />,
    edit,
    save,
    __experimentalLabel: (attributes) => {
        const taxonomy = attributes?.taxonomy;
        if (taxonomy) {
            const label = typeof taxonomy === 'string'
                ? taxonomy.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
                : taxonomy;
            return `${label} (Taxonomy)`;
        }
        return undefined;
    },
};
