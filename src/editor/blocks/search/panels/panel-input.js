import { __ } from '@wordpress/i18n';
import { BorderControl, BorderResponsiveControl, BoxShadowControl, ColorControl, DimensionControl, SwitchControl, TypographyControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const inputPanel = props => {
    const {
        elementId,
        setSwitcher,
        switcher
    } = props;

    const device = getDeviceType();

    return [
        {
            id: 'inputPadding',
            label: __('Input Padding', 'gutenverse'),
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
            id: 'inputMargin',
            label: __('Input Margin', 'gutenverse'),
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
            id: 'placeholderColor',
            label: __('Input Placeholder Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'placeholderColor',
                    'responsive': true,
                    'selector': `.${elementId} .gutenverse-search-input::placeholder`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ],
                }
            ]
        },
        {
            id: 'inputTypography',
            label: __('Input Typography', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: '__itemState',
            component: SwitchControl,
            options: [
                {
                    value: 'normal',
                    label: 'Normal'
                },
                {
                    value: 'hover',
                    label: 'Hover'
                },
                {
                    value: 'focus',
                    label: 'Focus'
                },
            ],
            onChange: ({ __itemState }) => setSwitcher({ ...switcher, inputState: __itemState })
        },
        {
            id: 'inputColorNormal',
            show: !switcher.inputState || switcher.inputState === 'normal',
            label: __('Input Color Normal', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'inputColorNormal',
                    'responsive': true,
                    'selector': `.${elementId} .search-input-container-outer .search-input-container gutenverse-search.gutenverse-search-input`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ],
                }
            ]
        },
        {
            id: 'inputBgColorNormal',
            show: !switcher.inputState || switcher.inputState === 'normal',
            label: __('Input Background Color Normal', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'inputBgColorNormal',
                    'responsive': true,
                    'selector': `.${elementId} .search-input-container-outer .search-input-container gutenverse-search.gutenverse-search-input`,
                    'properties': [
                        {
                            'name': 'background-color',
                            'valueType': 'direct'
                        }
                    ],
                }
            ]
        },
        {
            id: 'inputBorderNormal',
            show: (!switcher.inputState || switcher.inputState === 'normal') && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'inputBorderNormal',
                    'selector': `.${elementId} .search-input-container-outer .search-input-container gutenverse-search.gutenverse-search-input`,
                }
            ]
        },
        {
            id: 'inputBorderNormalResponsive',
            show: (!switcher.inputState || switcher.inputState === 'normal') && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'inputBorderNormalResponsive',
                    'selector': `.${elementId} .search-input-container-outer .search-input-container gutenverse-search.gutenverse-search-input`,
                }
            ]
        },
        {
            id: 'inputColorHover',
            show: switcher.inputState === 'hover',
            label: __('Input Color Hover', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'inputColorHover',
                    'responsive': true,
                    'selector': `.${elementId} .search-input-container-outer .search-input-container gutenverse-search.gutenverse-search-input:hover`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ],
                }
            ]
        },
        {
            id: 'inputBgColorHover',
            show: switcher.inputState === 'hover',
            label: __('Input Background Color Hover', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'inputBgColorHover',
                    'responsive': true,
                    'selector': `.${elementId} .search-input-container-outer .search-input-container gutenverse-search.gutenverse-search-input:hover`,
                    'properties': [
                        {
                            'name': 'background-color',
                            'valueType': 'direct'
                        }
                    ],
                }
            ]
        },
        {
            id: 'inputBorderHover',
            show: switcher.inputState === 'hover' && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'inputBorderHover',
                    'selector': `.${elementId} .search-input-container-outer .search-input-container gutenverse-search.gutenverse-search-input:hover`,
                }
            ]
        },
        {
            id: 'inputBorderHoverResponsive',
            show: switcher.inputState === 'hover' && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'inputBorderHoverResponsive',
                    'selector': `.${elementId} .search-input-container-outer .search-input-container gutenverse-search.gutenverse-search-input:hover`,
                }
            ]
        },
        {
            id: 'inputColorFocus',
            show: switcher.inputState === 'focus',
            label: __('Input Color Focus', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'inputColorFocus',
                    'responsive': true,
                    'selector': `.${elementId} .search-input-container-outer .search-input-container gutenverse-search.gutenverse-search-input:focus`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ],
                }
            ]
        },
        {
            id: 'inputBgColorFocus',
            show: switcher.inputState === 'focus',
            label: __('Input Background Color Focus', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'inputBgColorFocus',
                    'responsive': true,
                    'selector': `.${elementId} .search-input-container-outer .search-input-container gutenverse-search.gutenverse-search-input:focus`,
                    'properties': [
                        {
                            'name': 'background-color',
                            'valueType': 'direct'
                        }
                    ],
                }
            ]
        },
        {
            id: 'inputBorderFocus',
            show: (switcher.inputState === 'focus') && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'inputBorderFocus',
                    'selector': `.${elementId} .search-input-container-outer .search-input-container gutenverse-search.gutenverse-search-input:focus`,
                },
                {
                    'type': 'plain',
                    'id': 'inputBorderFocus',
                    'selector': `.${elementId} .search-input-container-outer .search-input-container gutenverse-search.gutenverse-search-input:focus-visible`,
                    'properties':[
                        {
                            'name': 'outline',
                            'valueType': 'pattern',
                            'pattern': 'none !important',
                        }
                    ]
                }
            ]
        },
        {
            id: 'inputBorderFocusResponsive',
            show: (switcher.inputState === 'focus') && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'inputBorderFocusResponsive',
                    'selector': `.${elementId} .search-input-container-outer .search-input-container gutenverse-search.gutenverse-search-input:focus`,
                },
                {
                    'type': 'plain',
                    'id': 'inputBorderFocusResponsive',
                    'selector': `.${elementId} .search-input-container-outer .search-input-container gutenverse-search.gutenverse-search-input:focus-visible`,
                    'properties':[
                        {
                            'name': 'outline',
                            'valueType': 'pattern',
                            'pattern': 'none !important',
                        }
                    ]
                }
            ]
        },
        {
            id: 'inputAreaBoxShadow',
            show: !switcher.inputState || switcher.inputState === 'normal',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            liveStyle: [
                {
                    'type': 'boxShadow',
                    'id': 'inputAreaBoxShadow',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId} .search-input-container-outer .search-input-container gutenverse-search.gutenverse-search-input, .${elementId} .guten-button-wrapper .guten-button`,
                }
            ]
        },
        {
            id: 'inputAreaBoxShadowHover',
            show: switcher.inputState === 'hover',
            label: __('Hover Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            liveStyle: [
                {
                    'type': 'boxShadow',
                    'id': 'inputAreaBoxShadowHover',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId} .search-input-container-outer .search-input-container gutenverse-search.gutenverse-search-input:hover, .${elementId} .guten-button-wrapper .guten-button:hover`,
                }
            ]
        },
        {
            id: 'inputAreaBoxShadowFocus',
            show: switcher.inputState === 'focus',
            label: __('Focus Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            liveStyle: [
                {
                    'type': 'boxShadow',
                    'id': 'inputAreaBoxShadowFocus',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId} .search-input-container-outer .search-input-container gutenverse-search.gutenverse-search-input:hover, .${elementId} .guten-button-wrapper .guten-button:focus`,
                }
            ]
        }
    ];
};