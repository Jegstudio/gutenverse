import { __ } from '@wordpress/i18n';
import { CheckboxControl } from 'gutenverse-core/controls';

export const settingPanel = () => {
    return [
        {
            id: 'showForm',
            label: __('Show Comment Form', 'gutenverse'),
            component: CheckboxControl,
        },
    ];
};