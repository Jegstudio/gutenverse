import { __ } from '@wordpress/i18n';
import { BorderControl, BorderResponsiveControl, ColorControl, DimensionControl, RangeControl, SwitchControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const iconStylePanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher
    } = props;

    const device = getDeviceType();

    return [
        {
            id: 'iconSize',
            label: __('Icon Size', 'gutenverse'),
            component: RangeControl,
            min: 10,
            max: 300,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'iconSize',
                    'responsive': true,
                    'selector': `.${elementId}.guten-fun-fact .fun-fact-inner .icon `,
                    'properties': [
                        {
                            'name': 'font-size',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ]
                },
                {
                    'type': 'plain',
                    'id': 'iconSize',
                    'responsive': true,
                    'selector': `.${elementId}.guten-fun-fact .fun-fact-inner .icon svg`,
                    'properties': [
                        {
                            'name': 'font-size',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            id: 'iconRotate',
            label: __('Icon Rotate', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 360,
            step: 1,
            allowDeviceControl: true,
            unit: 'deg',
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'iconRotate',
                    'responsive': true,
                    'selector': `.${elementId}.guten-fun-fact .fun-fact-inner .icon `,
                    'properties': [
                        {
                            'name': 'transform',
                            'valueType': 'pattern',
                            'pattern': 'rotate({value}deg)',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            id: 'iconPadding',
            label: __('Padding', 'gutenverse'),
            component: DimensionControl,
            position: ['top', 'right', 'bottom', 'left'],
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                percent: {
                    text: '%',
                    unit: '%'
                },
            },
        },
        {
            id: 'iconMargin',
            label: __('Margin', 'gutenverse'),
            component: DimensionControl,
            position: ['top', 'right', 'bottom', 'left'],
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                percent: {
                    text: '%',
                    unit: '%'
                },
            },
        },
        {
            id: '__iconHover',
            component: SwitchControl,
            options: [
                {
                    value: 'normal',
                    label: 'Normal'
                },
                {
                    value: 'hover',
                    label: 'Hover'
                }
            ],
            onChange: ({ __iconHover }) => setSwitcher({ ...switcher, iconStyle: __iconHover })
        },
        {
            id: 'iconColor',
            show: !switcher.iconStyle || switcher.iconStyle === 'normal',
            label: __('Normal Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'iconColor',
                    'responsive': true,
                    'selector': `.${elementId}.guten-fun-fact .fun-fact-inner .icon`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct',
                        }
                    ]
                },
                {
                    'type': 'color',
                    'id': 'iconColor',
                    'responsive': true,
                    'selector': `.${elementId}.guten-fun-fact .fun-fact-inner .icon svg`,
                    'properties': [
                        {
                            'name': 'fill',
                            'valueType': 'direct',
                        }
                    ]
                }
            ]
        },
        {
            id: 'iconBgColor',
            show: !switcher.iconStyle || switcher.iconStyle === 'normal',
            label: __('Normal Background Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'iconBgColor',
                    'responsive': true,
                    'selector': `.${elementId}.guten-fun-fact .fun-fact-inner .icon`,
                    'properties': [
                        {
                            'name': 'background-color',
                            'valueType': 'direct',
                        }
                    ]
                }
            ]
        },
        {
            id: 'iconBorder',
            show: (!switcher.iconStyle || switcher.iconStyle === 'normal') && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'iconBorder',
                    'selector': `.${elementId} .fun-fact-inner .icon`,
                }
            ]
        },
        {
            id: 'iconBorderResponsive',
            show: (!switcher.iconStyle || switcher.iconStyle === 'normal') && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'iconBorderResponsive',
                    'selector': `.${elementId} .fun-fact-inner .icon`,
                }
            ]
        },
        {
            id: 'iconColorHover',
            show: switcher.iconStyle === 'hover',
            label: __('Hover Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'iconColorHover',
                    'responsive': true,
                    'selector': `.${elementId}.guten-fun-fact .fun-fact-inner:hover .icon`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct',
                        }
                    ]
                },
                {
                    'type': 'color',
                    'id': 'iconColorHover',
                    'responsive': true,
                    'selector': `.${elementId}.guten-fun-fact .fun-fact-inner:hover .icon svg`,
                    'properties': [
                        {
                            'name': 'fill',
                            'valueType': 'direct',
                        }
                    ]
                }
            ]
        },
        {
            id: 'iconBgColorHover',
            show: switcher.iconStyle === 'hover',
            label: __('Hover Background Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'iconBgColorHover',
                    'responsive': true,
                    'selector': `.${elementId}.guten-fun-fact .fun-fact-inner:hover .icon`,
                    'properties': [
                        {
                            'name': 'background-color',
                            'valueType': 'direct',
                        }
                    ]
                }
            ]
        },
        {
            id: 'iconBorderHover',
            show: switcher.iconStyle === 'hover' && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'iconBorderHover',
                    'selector': `.${elementId} .fun-fact-inner:hover .icon`,
                }
            ]
        },
        {
            id: 'iconBorderHoverResponsive',
            show: switcher.iconStyle === 'hover' && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'iconBorderHoverResponsive',
                    'selector': `.${elementId} .fun-fact-inner:hover .icon`,
                }
            ]
        }
    ];
};