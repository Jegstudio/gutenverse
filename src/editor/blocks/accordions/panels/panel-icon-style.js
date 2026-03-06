import { BackgroundControl, BorderControl, BorderResponsiveControl, BoxShadowControl, DimensionControl, RangeControl } from 'gutenverse-core/controls';
import { __ } from '@wordpress/i18n';
import { ColorControl, IconSVGControl, SwitchControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const panelIconStyle = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher
    } = props;

    const device = getDeviceType();

    return [
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
            id: '__accIconActive',
            component: SwitchControl,
            options: [
                {
                    value: 'normal',
                    label: 'Normal'
                },
                {
                    value: 'active',
                    label: 'Active'
                }
            ],
            onChange: ({ __accIconActive }) => setSwitcher({ ...switcher, accIcon: __accIconActive })
        },
        {
            id: 'iconSize',
            label: __('Icon Size', 'gutenverse'),
            component: RangeControl,
            show: !switcher.accIcon || switcher.accIcon === 'normal',
            unit: 'px',
            min: 1,
            max: 200,
            step: 1,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'iconSize',
                    'responsive': true,
                    'selector': `.${elementId} .accordion-item .accordion-icon`,
                    'properties': [
                        {
                            'name': 'font-size',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct',
                                }
                            }
                        }
                    ],
                },
                {
                    'type': 'plain',
                    'id': 'iconSize',
                    'responsive': true,
                    'selector': `.${elementId} .accordion-item .accordion-icon svg`,
                    'properties': [
                        {
                            'name': 'font-size',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct',
                                }
                            }
                        }
                    ],
                }
            ]
        },
        {
            id: 'iconClosed',
            show: !switcher.accIcon || switcher.accIcon === 'normal',
            label: __('Normal Icon', 'gutenverse'),
            component: IconSVGControl,
        },
        {
            id: 'iconColor',
            show: !switcher.accIcon || switcher.accIcon === 'normal',
            label: __('Normal Icon Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'iconColor',
                    'selector': `.${elementId} .accordion-item .accordion-icon i`,
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
                    'selector': `.${elementId} .accordion-item .accordion-icon svg`,
                    'properties': [
                        {
                            'name': 'fill',
                            'valueType': 'direct'
                        }
                    ],
                }
            ]
        },
        {
            id: 'iconBackground',
            show: !switcher.accIcon || switcher.accIcon === 'normal',
            label: __('Background', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'type': 'background',
                    'selector': `.${elementId} .accordion-item .accordion-icon`,
                    'responsive': true
                }
            ]
        },
        {
            id: 'iconBorder',
            show: (!switcher.accIcon || switcher.accIcon === 'normal') && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'selector': `.${elementId} .accordion-item .accordion-icon`,
                }
            ]
        },
        {
            id: 'iconBorderResponsive',
            show: (!switcher.accIcon || switcher.accIcon === 'normal') && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'responsive': true,
                    'selector': `.${elementId} .accordion-item .accordion-icon`,
                }
            ]
        },
        {
            id: 'iconBoxShadow',
            show: !switcher.accIcon || switcher.accIcon === 'normal',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            liveStyle: [
                {
                    'type': 'boxShadow',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId} .accordion-item .accordion-icon`,
                }
            ]
        },
        {
            id: 'iconActiveSize',
            label: __('Icon Active Size', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 200,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
            show: switcher.accIcon === 'active',
            liveStyle: [
                {
                    'type': 'plain',
                    'responsive': true,
                    'selector': `.${elementId} .accordion-item.active .accordion-icon`,
                    'properties': [
                        {
                            'name': 'font-size',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct',
                                }
                            }
                        }
                    ],
                },
                {
                    'type': 'plain',
                    'responsive': true,
                    'selector': `.${elementId} .accordion-item.active .accordion-icon svg`,
                    'properties': [
                        {
                            'name': 'font-size',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct',
                                }
                            }
                        }
                    ],
                }
            ]
        },
        {
            id: 'iconOpen',
            show: switcher.accIcon === 'active',
            label: __('Active Icon', 'gutenverse'),
            component: IconSVGControl,
        },
        {
            id: 'iconActiveColor',
            show: switcher.accIcon === 'active',
            label: __('Active Icon Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'selector': `.${elementId} .accordion-item.active .accordion-icon i`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ],
                },
                {
                    'type': 'color',
                    'selector': `.${elementId} .accordion-item.active .accordion-icon svg`,
                    'properties': [
                        {
                            'name': 'fill',
                            'valueType': 'direct'
                        }
                    ],
                }
            ]
        },
        {
            id: 'iconActiveBackground',
            show: switcher.accIcon === 'active',
            label: __('Active Background', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'type': 'background',
                    'selector': `.${elementId} .accordion-item.active .accordion-icon`,
                    'responsive': true
                }
            ]
        },
        {
            id: 'iconActiveBorder',
            show: switcher.accIcon === 'active' && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'selector': `.${elementId} .accordion-item.active .accordion-icon`,
                }
            ]
        },
        {
            id: 'iconActiveBorderResponsive',
            show: switcher.accIcon === 'active' && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'responsive': true,
                    'selector': `.${elementId} .accordion-item.active .accordion-icon`,
                }
            ]
        },
        {
            id: 'iconActiveBoxShadow',
            show: switcher.accIcon === 'active',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            liveStyle: [
                {
                    'type': 'boxShadow',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId} .accordion-item.active .accordion-icon`,
                }
            ]
        },
    ];
};
