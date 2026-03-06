import { __ } from '@wordpress/i18n';
import { BackgroundControl, ColorControl, SwitchControl } from 'gutenverse-core/controls';

export const contentColor = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher
    } = props;

    return [
        {
            id: '__socialIconHover',
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
            onChange: ({ __socialIconHover }) => setSwitcher({ ...switcher, socialIconHover: __socialIconHover })
        },
        {
            id: 'iconColor',
            show: !switcher.socialIconHover || switcher.socialIconHover === 'normal',
            label: __('Icon Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'iconColor',
                    'selector': `.guten-social-icons.fill .guten-social-icon #${elementId} i, .guten-social-icons.border .guten-social-icon #${elementId} i, .guten-social-icons.custom .guten-social-icon #${elementId} i`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                },
                {
                    'type': 'color',
                    'id': 'iconColor',
                    'selector': `.guten-social-icons.fill .guten-social-icon #${elementId} svg, .guten-social-icons.border .guten-social-icon #${elementId} svg, .guten-social-icons.custom .guten-social-icon #${elementId} svg`,
                    'properties': [
                        {
                            'name': 'fill',
                            'valueType': 'direct'
                        }
                    ]
                },
                {
                    'type': 'color',
                    'id': 'iconColor',
                    'selector': `.guten-social-icons.border .guten-social-icon #${elementId}`,
                    'properties': [
                        {
                            'name': 'border-color',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'textColor',
            show: !switcher.socialIconHover || switcher.socialIconHover === 'normal',
            label: __('Text Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'textColor',
                    'selector': `.guten-social-icons .guten-social-icon #${elementId} span`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'hoverIconColor',
            show: switcher.socialIconHover === 'hover',
            label: __('Hover Icon Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'hoverIconColor',
                    'selector': `.guten-social-icons.fill .guten-social-icon #${elementId}:hover i, .guten-social-icons.border .guten-social-icon #${elementId}:hover i, .guten-social-icons.custom .guten-social-icon #${elementId}:hover i`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                },
                {
                    'type': 'color',
                    'id': 'hoverIconColor',
                    'selector': `.guten-social-icons.fill .guten-social-icon #${elementId}:hover svg, .guten-social-icons.border .guten-social-icon #${elementId}:hover svg, .guten-social-icons.custom .guten-social-icon #${elementId}:hover svg`,
                    'properties': [
                        {
                            'name': 'fill',
                            'valueType': 'direct'
                        }
                    ]
                },
                {
                    'type': 'color',
                    'id': 'hoverIconColor',
                    'selector': `.guten-social-icons.border .guten-social-icon #${elementId}:hover`,
                    'properties': [
                        {
                            'name': 'border-color',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'hoverTextColor',
            show: switcher.socialIconHover === 'hover',
            label: __('Hover Text Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'hoverTextColor',
                    'selector': `.guten-social-icons .guten-social-icon #${elementId}:hover span`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        // Bg switcher
        {
            id: '__bgIconType',
            component: SwitchControl,
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
            onChange: ({ __bgIconType }) => setSwitcher({ ...switcher, bgIconType: __bgIconType })
        },
        // Bg color
        {
            id: 'bgColor',
            show: (!switcher.socialIconHover || switcher.socialIconHover === 'normal') && (!switcher.bgIconType || switcher.bgIconType === 'color'),
            label: __('Background Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'bgColor',
                    'selector': `.guten-social-icons.fill .guten-social-icon #${elementId}, .guten-social-icons.border .guten-social-icon #${elementId}, .guten-social-icons.custom .guten-social-icon #${elementId}`,
                    'properties': [
                        {
                            'name': 'background-color',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'hoverBgColor',
            show: switcher.socialIconHover === 'hover' && (!switcher.bgIconType || switcher.bgIconType === 'color'),
            label: __('Hover Background Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'hoverBgColor',
                    'selector': `.guten-social-icons.fill .guten-social-icon #${elementId}:hover, .guten-social-icons.border .guten-social-icon #${elementId}:hover, .guten-social-icons.custom .guten-social-icon #${elementId}:hover`,
                    'properties': [
                        {
                            'name': 'background-color',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        // Bg Gradient
        {
            id: 'bgGradient',
            show: (!switcher.socialIconHover || switcher.socialIconHover === 'normal') && switcher.bgIconType === 'gradient',
            label: __('Background Gradient', 'gutenverse'),
            component: BackgroundControl,
            options: ['gradient'],
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'bgGradient',
                    'selector': `.guten-social-icons.fill .guten-social-icon #${elementId}, .guten-social-icons.border .guten-social-icon #${elementId}, .guten-social-icons.custom .guten-social-icon #${elementId}`,
                }
            ]
        },
        {
            id: 'hoverBgGradient',
            show: switcher.socialIconHover === 'hover' && switcher.bgIconType === 'gradient',
            label: __('Hover Background Gradient', 'gutenverse'),
            component: BackgroundControl,
            options: ['gradient'],
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'hoverBgGradient',
                    'selector': `.guten-social-icons.fill .guten-social-icon #${elementId}:hover, .guten-social-icons.border .guten-social-icon #${elementId}:hover, .guten-social-icons.custom .guten-social-icon #${elementId}:hover`,
                }
            ]
        },
    ];
};