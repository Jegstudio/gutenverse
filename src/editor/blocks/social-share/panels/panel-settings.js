import { __ } from '@wordpress/i18n';
import { SelectControl } from 'gutenverse-core/controls';

export const panelSettings = () => {

    return [
        {
            id: 'orientation',
            label: __('Orientation', 'gutenverse'),
            component: SelectControl,
            options: [
                { value: 'horizontal', label: __('Horizontal', 'gutenverse') },
                { value: 'vertical', label: __('Vertical', 'gutenverse') },
            ],
        },
        {
            id: 'layoutMode',
            label: __('Layout Mode', 'gutenverse'),
            component: SelectControl,
            options: [
                { value: 'default', label: __('Default', 'gutenverse') },
                { value: 'stretch', label: __('Stretch Bar', 'gutenverse') },
            ],
        },
    ];
};
