import { __ } from '@wordpress/i18n';
import { CheckboxControl } from 'gutenverse-core/controls';

export const settingPanel = () => {
    return [
        {
            id: 'postLink',
            label: __('Make Image a Link to Post', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'placeholderImg',
            label: __('Show Placeholder Image', 'gutenverse'),
            description: __('Show Placeholder Image when post doesn\'t have featured image', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'imageLazy',
            label: __('Set Lazy Load', 'gutenverse'),
            component: CheckboxControl,
        },
    ];
};