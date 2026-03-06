import { __ } from '@wordpress/i18n';
import { AlignCenter, AlignLeft, AlignRight } from 'gutenverse-core/components';
import { BackgroundControl, BorderResponsiveControl, ColorControl, DimensionControl, IconRadioControl, SizeControl, SwitchControl, TextShadowControl, TypographyControl } from 'gutenverse-core/controls';

export const linkPanel = (props) => {
    const {
        elementId,
        setSwitcher,
        switcher
    } = props;
    return [
        {
            id: 'linkAlignment',
            label: __('Content Alignment', 'gutenverse'),
            component: IconRadioControl,
            options: [
                {
                    label: __('Align Left', 'gutenverse'),
                    value: 'start',
                    icon: <AlignLeft />,
                },
                {
                    label: __('Align Center', 'gutenver se'),
                    value: 'center',
                    icon: <AlignCenter />,
                },
                {
                    label: __('Align Right', 'gutenverse'),
                    value: 'end',
                    icon: <AlignRight />,
                }
            ],
        },
        {
            id: 'linkPadding',
            label: __('Link Padding', 'gutenverse'),
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
            id: 'linkMargin',
            label: __('Link Margin', 'gutenverse'),
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
            id: 'linkBorder',
            label: __('Link Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'linkBorder',
                    'selector': `.${elementId}.guten-portfolio-gallery .portfolio-gallery-container .row-item .row-link-wrapper a`,
                }
            ]
        },
        {
            id: 'linkTypography',
            label: __('Link Typography', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: 'linkIconSpace',
            component: SizeControl,
            label: __('Icon Text Space', 'gutenverse'),
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 100,
                    step: 1,
                    unit: 'px',
                },
                ['%']: {
                    text: '%',
                    min: 1,
                    max: 100,
                    step: 1,
                    unit: '%',
                },
                vh: {
                    text: 'vh',
                    min: 1,
                    max: 100,
                    step: 1,
                    unit: 'vh',
                },
            },
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'linkIconSpace',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'gap',
                            'valueType': 'direct',
                        }
                    ],
                    'selector': `.${elementId}.guten-portfolio-gallery .portfolio-gallery-container .row-item .row-link-wrapper a`,
                }
            ]
        },
        {
            id: 'linkIconSize',
            component: SizeControl,
            label: __('Icon Size', 'gutenverse'),
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 100,
                    step: 1,
                    unit: 'px',
                },
                ['%']: {
                    text: '%',
                    min: 1,
                    max: 100,
                    step: 1,
                    unit: '%',
                },
                vh: {
                    text: 'vh',
                    min: 1,
                    max: 100,
                    step: 1,
                    unit: 'vh',
                },
            },
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'linkIconSize',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'font-size',
                            'valueType': 'direct',
                        }
                    ],
                    'selector': `.${elementId}.guten-portfolio-gallery .portfolio-gallery-container .row-item .row-link-wrapper a i`,
                },
                {
                    'type': 'unitPoint',
                    'id': 'linkIconSize',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'font-size',
                            'valueType': 'direct',
                        }
                    ],
                    'selector': `.${elementId}.guten-portfolio-gallery .portfolio-gallery-container .row-item .row-link-wrapper a svg`,
                }
            ]
        },
        {
            id: '__hoverSwitch',
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
            onChange: ({ __hoverSwitch }) => setSwitcher({ ...switcher, hoverSwitch: __hoverSwitch })
        },
        {
            id: 'linkBackground',
            label: __('Link Background', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: true,
            show: switcher.hoverSwitch === 'normal' || !switcher.hoverSwitch,
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'linkBackground',
                    'selector': `.${elementId}.guten-portfolio-gallery .portfolio-gallery-container .row-item .row-link-wrapper a`,
                }
            ]
        },
        {
            id: 'linkColor',
            label: __('Link Color', 'gutenverse'),
            show: switcher.hoverSwitch === 'normal' || !switcher.hoverSwitch,
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'linkColor',
                    'selector': `.${elementId}.guten-portfolio-gallery .portfolio-gallery-container .row-item .row-link-wrapper a`,
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
            id: 'linkIconColor',
            label: __('Icon Color', 'gutenverse'),
            show: switcher.hoverSwitch === 'normal' || !switcher.hoverSwitch,
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'linkIconColor',
                    'selector': `.${elementId}.guten-portfolio-gallery .portfolio-gallery-container .row-item .row-link-wrapper a i`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                },
                {
                    'type': 'color',
                    'id': 'linkIconColor',
                    'selector': `.${elementId}.guten-portfolio-gallery .portfolio-gallery-container .row-item .row-link-wrapper a svg`,
                    'properties': [
                        {
                            'name': 'fill',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'linkTextShadow',
            label: __('Link Text Shadow', 'gutenverse'),
            show: switcher.hoverSwitch === 'normal' || !switcher.hoverSwitch,
            component: TextShadowControl,
            liveStyle: [
                {
                    'type': 'textShadow',
                    'id': 'linkTextShadow',
                    'properties': [
                        {
                            'name': 'text-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId}.guten-portfolio-gallery .portfolio-gallery-container .row-item .row-link-wrapper a`,
                }
            ]
        },
        {
            id: 'linkBackgroundHover',
            label: __('Link Background', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: true,
            show: switcher.hoverSwitch === 'hover',
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'linkBackground',
                    'selector': `.${elementId}.guten-portfolio-gallery .portfolio-gallery-container .row-item .row-link-wrapper a:hover`,
                }
            ]
        },
        {
            id: 'linkColorHover',
            label: __('Link Color', 'gutenverse'),
            show: switcher.hoverSwitch === 'hover',
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'linkColorHover',
                    'selector': `.${elementId}.guten-portfolio-gallery .portfolio-gallery-container .row-item .row-link-wrapper a:hover`,
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
            id: 'linkIconColorHover',
            label: __('Icon Color', 'gutenverse'),
            show: switcher.hoverSwitch === 'hover',
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'linkIconColorHover',
                    'selector': `.${elementId}.guten-portfolio-gallery .portfolio-gallery-container .row-item .row-link-wrapper a:hover i`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                },
                {
                    'type': 'color',
                    'id': 'linkIconColorHover',
                    'selector': `.${elementId}.guten-portfolio-gallery .portfolio-gallery-container .row-item .row-link-wrapper a:hover svg`,
                    'properties': [
                        {
                            'name': 'fill',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'linkTextShadowHover',
            label: __('Link Text Shadow', 'gutenverse'),
            show: switcher.hoverSwitch === 'hover',
            component: TextShadowControl,
            liveStyle: [
                {
                    'type': 'textShadow',
                    'id': 'linkTextShadowHover',
                    'properties': [
                        {
                            'name': 'text-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId}.guten-portfolio-gallery .portfolio-gallery-container .row-item .row-link-wrapper a:hover`,
                }
            ]
        }
    ];
};