import { __ } from '@wordpress/i18n';
import { BackgroundControl, ColorControl, SelectControl, SwitchControl } from 'gutenverse-core/controls';

export const contentColor = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher,
    } = props;

    return [

        {
            id: 'color',
            label: __('Social Icon Color', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('Fill'),
                    value: 'fill'
                },
                {
                    label: __('Border'),
                    value: 'border'
                },
                {
                    label: __('Custom'),
                    value: 'custom'
                },
            ],
        },
        {
            id: '__socialIconsHover',
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
            onChange: ({ __socialIconsHover }) => setSwitcher({ ...switcher, socialIconsHover: __socialIconsHover })
        },
        {
            id: 'iconColor',
            label: __('Icon Color', 'gutenverse'),
            show: !switcher.socialIconsHover || switcher.socialIconsHover === 'normal',
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'iconColor',
                    'selector': `.${elementId}.fill .guten-social-icon a i, .${elementId}.border .guten-social-icon a i, .${elementId}.custom .guten-social-icon a i`,
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
                    'selector': `.${elementId}.fill .guten-social-icon a svg, .${elementId}.border .guten-social-icon a svg, .${elementId}.custom .guten-social-icon a svg`,
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
                    'selector': `.${elementId}.border .guten-social-icon a`,
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
            label: __('Text Color', 'gutenverse'),
            show: !switcher.socialIconsHover || switcher.socialIconsHover === 'normal',
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'textColor',
                    'selector': `.${elementId} .guten-social-icon a span`,
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
            label: __('Icon Color', 'gutenverse'),
            show: switcher.socialIconsHover === 'hover',
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'hoverIconColor',
                    'selector': `.${elementId}.fill .guten-social-icon a:hover i, .${elementId}.border .guten-social-icon a:hover i, .${elementId}.custom .guten-social-icon a:hover i`,
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
                    'selector': `.${elementId}.fill .guten-social-icon a:hover svg, .${elementId}.border .guten-social-icon a:hover svg, .${elementId}.custom .guten-social-icon a:hover svg`,
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
                    'selector': `.${elementId}.border .guten-social-icon a:hover`,
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
            label: __('Text Color', 'gutenverse'),
            show: switcher.socialIconsHover === 'hover',
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'hoverTextColor',
                    'selector': `.${elementId} .guten-social-icon a:hover span`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        // Bg Swithcer
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
            onChange: ({ __bgIconType }) => setSwitcher({ ...switcher, bgIconsType: __bgIconType })
        },
        // Bg Color
        {
            id: 'bgColor',
            label: __('Background Color', 'gutenverse'),
            show: (!switcher.socialIconsHover || switcher.socialIconsHover === 'normal') && (!switcher.bgIconsType || switcher.bgIconsType === 'color'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'bgColor',
                    'selector': `.${elementId}.fill .guten-social-icon a, .${elementId}.border .guten-social-icon a, .${elementId}.custom .guten-social-icon a`,
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
            label: __('Hover Background Color', 'gutenverse'),
            show: switcher.socialIconsHover === 'hover' && (!switcher.bgIconsType || switcher.bgIconsType === 'color'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'hoverBgColor',
                    'selector': `.${elementId}.fill .guten-social-icon a:hover, .${elementId}.border .guten-social-icon a:hover, .${elementId}.custom .guten-social-icon a:hover`,
                    'properties': [
                        {
                            'name': 'background-color',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        // Bg gradient
        {
            id: 'bgGradient',
            label: __('Background Gradient', 'gutenverse'),
            show: (!switcher.socialIconsHover || switcher.socialIconsHover === 'normal') && switcher.bgIconsType === 'gradient',
            component: BackgroundControl,
            options: ['gradient'],
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'bgGradient',
                    'selector': `.${elementId}.fill .guten-social-icon a, .${elementId}.border .guten-social-icon a, .${elementId}.custom .guten-social-icon a`,
                }
            ]
        },
        {
            id: 'hoverBgGradient',
            label: __('Hover Background Gradient', 'gutenverse'),
            show: switcher.socialIconsHover === 'hover' && switcher.bgIconsType === 'gradient',
            component: BackgroundControl,
            options: ['gradient'],
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'hoverBgGradient',
                    'selector': `.${elementId}.fill .guten-social-icon a:hover, .${elementId}.border .guten-social-icon a:hover, .${elementId}.custom .guten-social-icon a:hover`,
                }
            ]
        },
    ];
};