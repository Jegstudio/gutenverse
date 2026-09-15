import { __ } from '@wordpress/i18n';
import { CheckboxControl, NumberControl, SelectControl } from 'gutenverse-core/controls';

export const panelSettings = (props) => {
    const {
        enableMoreButton,
        orientation = 'horizontal'
    } = props;

    const isHorizontal = orientation !== 'vertical';

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
            show: isHorizontal,
            label: __('Layout Mode', 'gutenverse'),
            component: SelectControl,
            options: [
                { value: 'default', label: __('Default', 'gutenverse') },
                { value: 'stretch', label: __('Stretch Bar', 'gutenverse') },
            ],
        },
        {
            id: 'enableMoreButton',
            label: __('Enable More Button', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'visibleButtonCount',
            show: enableMoreButton,
            label: __('Visible Buttons Before More', 'gutenverse'),
            component: NumberControl,
            min: 1,
            max: 20,
        },
    ];
};
