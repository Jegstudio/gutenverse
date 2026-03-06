import { __ } from '@wordpress/i18n';
import { IconSVGControl} from 'gutenverse-core/controls';

export const closeIconPanel = () => {
    return [
        {
            id: 'closeIcon',
            label: __('Select Close Icon', 'gutenverse'),
            component: IconSVGControl,
        },
    ];
};