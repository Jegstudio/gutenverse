import { __ } from '@wordpress/i18n';
import { BackgroundControl, BorderControl, BorderResponsiveControl, BoxShadowControl, ColorControl, DimensionControl, RangeControl, SelectControl, SwitchControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const panelIconStyle = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher,
        iconStyleMode
    } = props;

    const device = getDeviceType();

    return [
        {
            id: 'iconStyleMode',
            label: __('Color Mode', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    value: 'color',
                    label: 'Color'
                },
                {
                    value: 'gradient',
                    label: 'Gradient'
                }
            ],
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
            onChange: ({ __iconHover }) => setSwitcher({ ...switcher, icon: __iconHover })
        },
        // Icon Color
        {
            id: 'iconColor',
            show: (!switcher.icon || switcher.icon === 'normal') && (!iconStyleMode || iconStyleMode === 'color'),
            label: __('Normal Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'iconColor',
                    'selector': `.guten-icon-box.${elementId} .icon-box.icon-box-header .icon i`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ],
                },
                {
                    'type': 'color',
                    'id': 'iconColor',
                    'selector': `.guten-icon-box.${elementId} .icon-box.icon-box-header .icon svg`,
                    'properties': [
                        {
                            'name': 'fill',
                            'valueType': 'direct'
                        }
                    ],
                }
            ],
        },
        {
            id: 'iconHoverColor',
            show: switcher.icon === 'hover' && (!iconStyleMode || iconStyleMode === 'color'),
            label: __('Hover Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'iconHoverColor',
                    'selector': `.guten-icon-box.${elementId}:hover .icon-box.icon-box-header .icon i`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ],
                },
                {
                    'type': 'color',
                    'id': 'iconHoverColor',
                    'selector': `.guten-icon-box.${elementId}:hover .icon-box.icon-box-header .icon svg`,
                    'properties': [
                        {
                            'name': 'fill',
                            'valueType': 'direct'
                        }
                    ],
                }
            ],
        },
        // Bg Color
        {
            id: 'iconBgColor',
            show: (!switcher.icon || switcher.icon === 'normal') && (!iconStyleMode || iconStyleMode === 'color'),
            label: __('Normal Background Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'iconBgColor',
                    'selector': `.${elementId} .icon-box.icon-box-header .icon`,
                    'properties': [
                        {
                            'name': 'background-color',
                            'valueType': 'direct'
                        }
                    ],
                }
            ],
        },
        {
            id: 'iconHoverBgColor',
            show: switcher.icon === 'hover' && (!iconStyleMode || iconStyleMode === 'color'),
            label: __('Hover Background Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'iconHoverBgColor',
                    'selector': `.${elementId}:hover .icon-box.icon-box-header .icon`,
                    'properties': [
                        {
                            'name': 'background-color',
                            'valueType': 'direct'
                        }
                    ],
                }
            ],
        },
        // Icon Gradient
        {
            id: 'iconGradient',
            show: (!switcher.icon || switcher.icon === 'normal') && iconStyleMode === 'gradient',
            component: BackgroundControl,
            type: 'Gradient Color',
            options: ['gradient'],
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'iconGradient',
                    'properties': [
                        {
                            'name': 'background-image',
                            'valueType': 'function',
                            'functionName' : 'customHandleBackground'
                        }
                    ],
                    'selector': `.guten-icon-box.${elementId} .icon-box.icon-box-header .icon .icon-style-gradient`,
                }
            ],
        },
        {
            id: 'iconGradientHover',
            show: switcher.icon === 'hover' && iconStyleMode === 'gradient',
            component: BackgroundControl,
            type: 'Hover Gradient Color',
            options: ['gradient'],
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'iconGradientHover',
                    'properties': [
                        {
                            'name': 'background-image',
                            'valueType': 'function',
                            'functionName' : 'customHandleBackground'
                        }
                    ],
                    'selector': `.guten-icon-box.${elementId}:hover .icon-box.icon-box-header .icon .icon-style-gradient`,
                }
            ],
        },
        // Bg Gradient
        {
            id: 'iconBgGradient',
            show: (!switcher.icon || switcher.icon === 'normal') && iconStyleMode === 'gradient',
            component: BackgroundControl,
            options: ['gradient'],
            type: 'Gradient Background Color',
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'iconBgGradient',
                    'properties': [
                        {
                            'name': 'background-image',
                            'valueType': 'function',
                            'functionName' : 'customHandleBackground'
                        }
                    ],
                    'selector': `.guten-icon-box.${elementId} .icon-box.icon-box-header .icon.bg-style-gradient`,
                }
            ],
        },
        {
            id: 'iconBgGradientHover',
            show: switcher.icon === 'hover' && iconStyleMode === 'gradient',
            component: BackgroundControl,
            options: ['gradient'],
            type: 'Hover Gradient Background Color',
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'iconBgGradientHover',
                    'properties': [
                        {
                            'name': 'background-image',
                            'valueType': 'function',
                            'functionName' : 'customHandleBackground'
                        }
                    ],
                    'selector': `.guten-icon-box.${elementId}:hover .icon-box.icon-box-header .icon.bg-style-gradient`,
                }
            ],
        },
        {
            id: 'iconBorder',
            show: (!switcher.icon || switcher.icon === 'normal') && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'iconBorder',
                    'selector': `.${elementId} .icon-box.icon-box-header .icon `,
                }
            ],
        },
        {
            id: 'iconBorderResponsive',
            show: (!switcher.icon || switcher.icon === 'normal') && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'iconBorderResponsive',
                    'id': 'buttonBorderHoverResponsive',
                    'responsive': true,
                    'selector': `.${elementId} .icon-box.icon-box-header .icon`,
                }
            ],
        },
        {
            id: 'iconBoxShadow',
            show: !switcher.icon || switcher.icon === 'normal',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            liveStyle: [
                {
                    'type': 'boxShadow',
                    'id': 'iconBoxShadow',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId} .icon-box.icon-box-header .icon`,
                }
            ],
        },
        {
            id: 'iconBorderHover',
            show: switcher.icon === 'hover' && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'iconBorderHover',
                    'selector': `.${elementId}:hover .icon-box.icon-box-header .icon`,
                }
            ],
        },
        {
            id: 'iconBorderHoverResponsive',
            show: switcher.icon === 'hover' && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'iconBorderResponsive',
                    'id': 'iconBorderHoverResponsive',
                    'responsive': true,
                    'selector': `.${elementId}:hover .icon-box.icon-box-header .icon`,
                }
            ],
        },
        {
            id: 'iconBoxShadowHover',
            show: switcher.icon === 'hover',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            liveStyle: [
                {
                    'type': 'boxShadow',
                    'id': 'iconBoxShadowHover',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId}:hover .icon-box.icon-box-header .icon`,
                }
            ],
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
            id: 'iconRotate',
            label: __('Icon Rotate', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            unit: 'deg',
            min: 1,
            max: 360,
            step: 1,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'iconRotate',
                    'selector': `.${elementId} .icon-box.icon-box-header .icon`,
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
            ],
        },
    ];
};