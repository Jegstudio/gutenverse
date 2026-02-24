
import edit from './edit';
import save from './save';
import metadata from './block.json';
import { IconAnimatedTextSVG } from '../../../assets/icon/index';

const { name } = metadata;

export { metadata, name };

export const settings = {
    icon: IconAnimatedTextSVG,
    edit,
    save,
    __experimentalLabel: (attributes) => {
        const fieldContent = attributes?.fieldContent;
        if (fieldContent) {
            const label = fieldContent?.label || fieldContent;
            const cleanLabel = typeof label === 'string' && label.includes(' (')
                ? label.split(' (')[0]
                : label;
            return `${cleanLabel} (Dynamic Field)`;
        }
        return undefined;
    },
};
