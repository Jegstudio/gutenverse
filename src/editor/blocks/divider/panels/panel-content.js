import { __ } from '@wordpress/i18n';

import { AlignCenter, AlignLeft, AlignRight } from 'gutenverse-core/components';
import { ColorControl, IconControl, IconRadioControl, RangeControl, SelectControl, SizeControl, TypographyControl } from 'gutenverse-core/controls';

export const contentPanel = (props) => {
    const {
        content
    } = props;

    return [
        {
            id: 'content',
            label: __('Add Content', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('None'),
                    value: 'none'
                },
                {
                    label: __('Text'),
                    value: 'text'
                },
                {
                    label: __('Icon'),
                    value: 'icon'
                },
            ],
        },
        {
            id: 'contentAlign',
            label: __(' Content Alignment', 'gutenverse'),
            show: ['text', 'icon'].includes(content),
            component: IconRadioControl,
            options: [
                {
                    label: __('Align Left', 'gutenverse'),
                    value: 'left',
                    icon: <AlignLeft/>,
                },
                {
                    label: __('Align Center', 'gutenverse'),
                    value: 'center',
                    icon: <AlignCenter/>,
                },
                {
                    label: __('Align Right', 'gutenverse'),
                    value: 'right',
                    icon: <AlignRight/>,
                },
            ]
        },
        {
            id: 'contentColor',
            label: __('Color', 'gutenverse'),
            show: ['text', 'icon'].includes(content),
            component: ColorControl,
        },
        {
            id: 'contentSpacing',
            label: __('Spacing', 'gutenverse'),
            show: ['text', 'icon'].includes(content),
            component: RangeControl,
            allowDeviceControl: true,
            unit: 'px',
            min: 1,
            max: 50,
            step: 1,
        },
        {
            id: 'typography',
            label: __('Typography', 'gutenverse'),
            show: content === 'text',
            component: TypographyControl,
        },
        {
            id: 'icon',
            label: __('Divider Icon', 'gutenverse'),
            show: content === 'icon',
            component: IconControl,
        },
        {
            id: 'iconSize',
            label: __('Icon Size', 'gutenverse'),
            show: content === 'icon',
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 10,
                    max: 100,
                    step: 1
                },
                em: {
                    text: 'em',
                    min: 0.6,
                    max: 6,
                    step: 0.1
                },
            },
        },
    ];
};