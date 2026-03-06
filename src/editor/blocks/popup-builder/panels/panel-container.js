import { __ } from '@wordpress/i18n';
import { BackgroundControl, BorderControl, BorderResponsiveControl, BoxShadowControl, DimensionControl, HeadingControl, SelectControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const containerPanel = (props) => {
    const { elementId, popupType } = props;

    const device = getDeviceType();

    return [
        {
            id: 'containerPadding',
            label: __('Padding', 'gutenverse'),
            component: DimensionControl,
            allowDeviceControl: true,
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px',
                },
                em: {
                    text: 'em',
                    unit: 'em',
                },
                ['%']: {
                    text: '%',
                    unit: '%',
                },
            },
        },
        {
            id: 'backgroundColor',
            label: __('Background', 'gutenverse'),
            component: BackgroundControl,
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'backgroundColor',
                    'selector': `.${elementId}.guten-popup-builder .guten-popup .guten-popup-content`,
                }
            ]
        },
        {
            id: 'containerBorder',
            show: device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'containerBorder',
                    'selector': `.${elementId}.guten-popup-builder .guten-popup .guten-popup-content`,
                }
            ]
        },
        {
            id: 'containerBorderResponsive',
            show: device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'containerBorderResponsive',
                    'selector': `.${elementId}.guten-popup-builder .guten-popup .guten-popup-content`,
                }
            ]
        },
        {
            id: 'containerBoxShadow',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            liveStyle: [
                {
                    'type': 'boxShadow',
                    'id': 'containerBoxShadow',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId}.guten-popup-builder .guten-popup .guten-popup-content`,
                }
            ]
        },
        {
            id: 'titleSocialSeparator',
            component: HeadingControl,
            label: __('Video Container', 'gutenverse'),
            show: popupType === 'youtube'
        },
        {
            id: 'videoContainerContentHorizontalAlign',
            label: __('Horizontal Align', 'gutenverse'),
            component: SelectControl,
            allowDeviceControl: true,
            options: [
                {
                    label: 'Default',
                    value: 'default'
                },
                {
                    label: 'Start',
                    value: 'start'
                },
                {
                    label: 'Center',
                    value: 'center'
                },
                {
                    label: 'End',
                    value: 'end'
                },
            ],
        },
        {
            id: 'videoContainerContentVerticalAlign',
            label: __('Vertical Align', 'gutenverse'),
            component: SelectControl,
            allowDeviceControl: true,
            options: [
                {
                    label: 'Default',
                    value: 'default'
                },
                {
                    label: 'Top',
                    value: 'start'
                },
                {
                    label: 'Middle',
                    value: 'center'
                },
                {
                    label: 'Bottom',
                    value: 'end'
                },
            ],
        },
        {
            id: 'videoContainerBorder',
            show: device === 'Desktop' && popupType === 'youtube',
            label: __('Video Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'videoContainerBorder',
                    'selector': `.${elementId}.guten-popup-builder .guten-popup .guten-popup-content .guten-popup-video-container`,
                }
            ]
        },
        {
            id: 'videoContainerBorderResponsive',
            show: device !== 'Desktop' && popupType === 'youtube',
            label: __('Video Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'videoContainerBorderResponsive',
                    'selector': `.${elementId}.guten-popup-builder .guten-popup .guten-popup-content .guten-popup-video-container`,
                }
            ]
        },
    ];
};
