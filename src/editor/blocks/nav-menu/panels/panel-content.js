import { __ } from '@wordpress/i18n';

import { IconRadioControl, SelectControl, TextControl } from 'gutenverse-core/controls';
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from 'gutenverse-core/components';

export const contentPanel = () => {

    return [
        {
            id: 'alignment',
            label: __('Alignment', 'gutenverse'),
            component: IconRadioControl,
            allowDeviceControl: true,
            options: [
                {
                    label: __('Align Left', 'gutenverse'),
                    value: 'flex-start',
                    icon: <AlignLeft />,
                },
                {
                    label: __('Align Center', 'gutenverse'),
                    value: 'center',
                    icon: <AlignCenter />,
                },
                {
                    label: __('Align Right', 'gutenverse'),
                    value: 'flex-end',
                    icon: <AlignRight />,
                },
                {
                    label: __('Align Right', 'gutenverse'),
                    value: 'space-between',
                    icon: <AlignJustify />,
                },
            ],
        },
        {
            id: 'breakpoint',
            label: __('Responsive Breakpoint', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('Tablet', 'gutenverse'),
                    value: 'tablet',
                },
                {
                    label: __('Mobile', 'gutenverse'),
                    value: 'mobile',
                },
            ]
        },
        {
            id: 'hamburgerAriaLabel',
            label: __('Hamburger Button Aria Label', 'gutenverse'),
            component: TextControl,
        },
        {
            id: 'closeAriaLabel',
            label: __('Close Button Aria Label', 'gutenverse'),
            component: TextControl,
        },
        {
            id: 'mobileLogoAriaLabel',
            label: __('Mobile Logo Aria Label', 'gutenverse'),
            component: TextControl,
        },
    ];
};