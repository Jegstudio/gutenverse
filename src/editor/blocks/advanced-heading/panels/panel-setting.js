
import { __ } from '@wordpress/i18n';
import { AlignCenter, AlignLeft, AlignRight } from 'gutenverse-core/components';
import { IconRadioControl, SelectControl, TextControl } from 'gutenverse-core/controls';

export const settingPanel = ({showSub}) => {
    return [
        {
            id: 'alignText',
            label: __('Alignment', 'gutenverse'),
            component: IconRadioControl,
            allowDeviceControl: true,
            options: [
                {
                    label: __('Align Left', 'gutenverse'),
                    value: 'flex-start',
                    icon: <AlignLeft/>,
                },
                {
                    label: __('Align Center', 'gutenverse'),
                    value: 'center',
                    icon: <AlignCenter/>,
                },
                {
                    label: __('Align Right', 'gutenverse'),
                    value: 'flex-end',
                    icon: <AlignRight/>,
                },
            ],
        },
        {
            id: 'titleTag',
            label: __('Main Text Tag', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('H1'),
                    value: 'h1'
                },
                {
                    label: __('H2'),
                    value: 'h2'
                },
                {
                    label: __('H3'),
                    value: 'h3'
                },
                {
                    label: __('H4'),
                    value: 'h4'
                },
                {
                    label: __('H5'),
                    value: 'h5'
                },
                {
                    label: __('H6'),
                    value: 'h6'
                },
                {
                    label: __('SPAN'),
                    value: 'span'
                },
            ],
        },
        {
            id: 'subTag',
            label: __('Sub Text Tag', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('H1'),
                    value: 'h1'
                },
                {
                    label: __('H2'),
                    value: 'h2'
                },
                {
                    label: __('H3'),
                    value: 'h3'
                },
                {
                    label: __('H4'),
                    value: 'h4'
                },
                {
                    label: __('H5'),
                    value: 'h5'
                },
                {
                    label: __('H6'),
                    value: 'h6'
                },
                {
                    label: __('SPAN'),
                    value: 'span'
                },
            ],
        },
        {
            id: 'text',
            label: __('Main Text'),
            component: TextControl,
            liveUpdate: true,
        },
        {
            id: 'focusText',
            label: __('Focus Text'),
            component: TextControl,
            liveUpdate: true,
        },
        {
            id: 'subText',
            show: showSub && showSub !== 'none',
            label: __('Subtitle Text'),
            component: TextControl,
            liveUpdate: true,
        },
        {
            id: 'showSub',
            label: __('Show Subtitle', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('None'),
                    value: 'none'
                },
                {
                    label: __('Top'),
                    value: 'top'
                },
                {
                    label: __('Bottom'),
                    value: 'bottom'
                },
            ]
        },
    ];
};