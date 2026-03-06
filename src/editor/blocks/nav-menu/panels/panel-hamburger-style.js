import { __ } from '@wordpress/i18n';
import { AlignLeft, AlignRight } from 'gutenverse-core/components';
import { IconRadioControl, SizeControl, RangeControl, SwitchControl, BackgroundControl, ColorControl, DimensionControl, HeadingControl, BorderControl, BorderResponsiveControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const hamburgerStyle = (props) => {
    const {
        elementId,
        setSwitcher,
        switcher,
    } = props;

    const device = getDeviceType();

    return [
        {
            id: 'hamburgerAlignment',
            label: __('Hamburger Alignment', 'gutenverse'),
            component: IconRadioControl,
            allowDeviceControl: true,
            options: [
                {
                    label: __('Align Left', 'gutenverse'),
                    value: 'flex-start',
                    icon: <AlignLeft />,
                },
                {
                    label: __('Align Right', 'gutenverse'),
                    value: 'flex-end',
                    icon: <AlignRight />,
                },
            ],
        },
        {
            id: 'hamburgerWidth',
            label: __('Width', 'gutenverse'),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 1000,
                    step: 1
                },
                '%': {
                    text: '%',
                    min: 1,
                    max: 100,
                    step: 0.1
                },
            },
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'minutesWidth',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'width',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu .gutenverse-hamburger-menu`,
                }
            ],
        },
        {
            id: 'hamburgerSize',
            label: __('Icon Size', 'gutenverse'),
            component: RangeControl,
            min: 5,
            max: 300,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
            liveStyle:
                [
                    {
                        'type': 'plain',
                        'id': 'hamburgerSize',
                        'responsive': true,
                        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu .gutenverse-hamburger-menu i`,
                        'properties': [
                            {
                                'name': 'font-size',
                                'valueType': 'pattern',
                                'pattern': '{value}px',
                                'patternValues': {
                                    'value': {
                                        'type': 'direct',
                                    },
                                }
                            }
                        ],
                    },
                    {
                        'type': 'plain',
                        'id': 'hamburgerSize',
                        'responsive': true,
                        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu .gutenverse-hamburger-menu svg`,
                        'properties': [
                            {
                                'name': 'font-size',
                                'valueType': 'pattern',
                                'pattern': '{value}px',
                                'patternValues': {
                                    'value': {
                                        'type': 'direct',
                                    },
                                }
                            }
                        ],
                    }
                ],
        },
        {
            id: 'hamburgerPadding',
            label: __('Padding', 'gutenverse'),
            component: DimensionControl,
            allowDeviceControl: true,
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                ['%']: {
                    text: '%',
                    unit: '%'
                },
            },
        },
        {
            id: 'hamburgerMargin',
            label: __('Margin', 'gutenverse'),
            component: DimensionControl,
            allowDeviceControl: true,
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                ['%']: {
                    text: '%',
                    unit: '%'
                },
            },
        },
        {
            id: '__hamburgerState',
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
            ],
            onChange: ({ __hamburgerState }) => setSwitcher({ ...switcher, hamburgerState: __hamburgerState })
        },
        {
            id: 'hamburgerColorNormal',
            show: switcher.hamburgerState === undefined || switcher.hamburgerState === 'normal',
            label: __('Icon Color', 'gutenverse'),
            allowDeviceControl: true,
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'hamburgerColorNormal',
                    'responsive': true,
                    'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu .gutenverse-hamburger-menu`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                },
                {
                    'type': 'color',
                    'id': 'hamburgerColorNormal',
                    'responsive': true,
                    'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu .gutenverse-hamburger-menu svg`,
                    'properties': [
                        {
                            'name': 'fill',
                            'valueType': 'direct'
                        }
                    ]
                }
            ],
        },
        {
            id: 'hamburgerBgNormal',
            show: switcher.hamburgerState === undefined || switcher.hamburgerState === 'normal',
            component: BackgroundControl,
            label: __('Normal Background', 'gutenverse'),
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'id': 'hamburgerBgNormal',
                    'type': 'background',
                    'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu .gutenverse-hamburger-menu`,
                }
            ],
        },
        {
            id: 'hamburgerBorderNormal',
            show: (switcher.hamburgerState === undefined || switcher.hamburgerState === 'normal') && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'hamburgerBorderNormal',
                    'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu .gutenverse-hamburger-menu`,
                }
            ],
        },
        {
            id: 'hamburgerBorderNormalResponsive',
            show: (switcher.hamburgerState === undefined || switcher.hamburgerState === 'normal') && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'hamburgerBorderNormalResponsive',
                    'responsive': true,
                    'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu .gutenverse-hamburger-menu`,
                }
            ],
        },
        {
            id: 'hamburgerColorHover',
            show: switcher.hamburgerState === 'hover',
            label: __('Hover Icon Color', 'gutenverse'),
            allowDeviceControl: true,
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'hamburgerColorHover',
                    'responsive': true,
                    'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu .gutenverse-hamburger-menu:hover`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                },
                {
                    'type': 'color',
                    'id': 'hamburgerColorHover',
                    'responsive': true,
                    'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu .gutenverse-hamburger-menu:hover svg`,
                    'properties': [
                        {
                            'name': 'fill',
                            'valueType': 'direct'
                        }
                    ]
                }
            ],
        },
        {
            id: 'hamburgerBgHover',
            show: switcher.hamburgerState === 'hover',
            component: BackgroundControl,
            label: __('Hover Background', 'gutenverse'),
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'id': 'hamburgerBgHover',
                    'type': 'background',
                    'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu .gutenverse-hamburger-menu:hover`,
                }
            ],
        },
        {
            id: 'hamburgerBorderHover',
            show: switcher.hamburgerState === 'hover' && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'hamburgerBorderHover',
                    'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu .gutenverse-hamburger-menu:hover`,
                }
            ],
        },
        {
            id: 'hamburgerBorderHoverResponsive',
            show: switcher.hamburgerState === 'hover' && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'hamburgerBorderHoverResponsive',
                    'responsive': true,
                    'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu .gutenverse-hamburger-menu:hover`,
                }
            ],
        },
        {
            id: 'closeIconHeading',
            component: HeadingControl,
            label: __('Close Icon')
        },
        {
            id: 'closeWidth',
            label: __('Width', 'gutenverse'),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 1000,
                    step: 1
                },
                '%': {
                    text: '%',
                    min: 1,
                    max: 100,
                    step: 0.1
                },
            },
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'closeWidth',
                    'responsive': true,
                    'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-close-menu`,
                    'properties': [
                        {
                            'name': 'width',
                            'valueType': 'direct'
                        }
                    ],
                },
            ],
        },
        {
            id: 'closeSize',
            label: __('Icon Size', 'gutenverse'),
            component: RangeControl,
            min: 5,
            max: 300,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'closeSize',
                    'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-close-menu i`,
                    'responsive': true,
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
                    'id': 'closeSize',
                    'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-close-menu svg`,
                    'responsive': true,
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
            ],
        },
        {
            id: 'closePadding',
            label: __('Padding', 'gutenverse'),
            component: DimensionControl,
            allowDeviceControl: true,
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                ['%']: {
                    text: '%',
                    unit: '%'
                },
            },
        },
        {
            id: 'closeMargin',
            label: __('Margin', 'gutenverse'),
            component: DimensionControl,
            allowDeviceControl: true,
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                ['%']: {
                    text: '%',
                    unit: '%'
                },
            },
        },
        {
            id: '__closeState',
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
            ],
            onChange: ({ __closeState }) => setSwitcher({ ...switcher, closeState: __closeState })
        },
        {
            id: 'closeColorNormal',
            show: switcher.closeState === undefined || switcher.closeState === 'normal',
            label: __('Icon Color', 'gutenverse'),
            allowDeviceControl: true,
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'closeColorNormal',
                    'responsive': true,
                    'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-close-menu`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                },
                {
                    'type': 'color',
                    'id': 'closeColorNormal',
                    'responsive': true,
                    'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-close-menu svg`,
                    'properties': [
                        {
                            'name': 'fill',
                            'valueType': 'direct'
                        }
                    ]
                }
            ],
        },
        {
            id: 'closeBgNormal',
            show: switcher.closeState === undefined || switcher.closeState === 'normal',
            component: BackgroundControl,
            label: __('Normal Background', 'gutenverse'),
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'id': 'closeBgNormal',
                    'type': 'background',
                    'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-close-menu`,
                }
            ],
        },
        {
            id: 'closeBorderNormal',
            show: (switcher.closeState === undefined || switcher.closeState === 'normal') && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'closeBorderNormal',
                    'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-close-menu`,
                }
            ],
        },
        {
            id: 'closeBorderNormalResponsive',
            show: (switcher.closeState === undefined || switcher.closeState === 'normal') && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'closeBorderNormalResponsive',
                    'responsive': true,
                    'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-close-menu`,
                }
            ],
        },
        {
            id: 'closeColorHover',
            show: switcher.closeState === 'hover',
            label: __('Hover Icon Color', 'gutenverse'),
            allowDeviceControl: true,
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'closeColorHover',
                    'responsive': true,
                    'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-close-menu:hover`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                },
                {
                    'type': 'color',
                    'id': 'closeColorHover',
                    'responsive': true,
                    'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-close-menu:hover svg`,
                    'properties': [
                        {
                            'name': 'fill',
                            'valueType': 'direct'
                        }
                    ]
                }
            ],
        },
        {
            id: 'closeBgHover',
            show: switcher.closeState === 'hover',
            component: BackgroundControl,
            label: __('Hover Background', 'gutenverse'),
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'id': 'closeBgHover',
                    'type': 'background',
                    'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-close-menu:hover`,
                }
            ],
        },
        {
            id: 'closeBorderHover',
            show: switcher.closeState === 'hover' && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'closeBorderHover',
                    'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-close-menu:hover`,
                }
            ],
        },
        {
            id: 'closeBorderHoverResponsive',
            show: switcher.closeState === 'hover' && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'closeBorderHoverResponsive',
                    'responsive': true,
                    'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-close-menu:hover`,
                }
            ],
        },
    ];
};