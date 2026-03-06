import { __ } from '@wordpress/i18n';
import { HeadingControl, BackgroundControl, ColorControl, DimensionControl, IconSVGControl, SwitchControl, TypographyControl, BorderControl, BorderResponsiveControl, RangeControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const SubmenuItemStyle = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher,
    } = props;

    const device = getDeviceType();

    return [
        {
            id: 'submenuItemIndicator',
            label: __('Indicator Item', 'gutenverse'),
            component: IconSVGControl,
        },
        {
            id: 'SubmenuIndicatorSize',
            label: __('Icon Indicator Size', 'gutenverse'),
            component: RangeControl,
            min: 5,
            max: 300,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'SubmenuIndicatorSize',
                    'responsive': true,
                    'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .gutenverse-menu-wrapper .gutenverse-menu > li > a > i, .${elementId}.guten-element.wp-block-gutenverse-nav-menu .gutenverse-menu-wrapper .gutenverse-menu > ul > li > a > i`,
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
                    'id': 'SubmenuIndicatorSize',
                    'responsive': true,
                    'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .gutenverse-menu-wrapper .gutenverse-menu > li > a svg, .${elementId}.guten-element.wp-block-gutenverse-nav-menu .gutenverse-menu-wrapper .gutenverse-menu > ul > li > a svg`,
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
            id: 'submenuIndicatorMargin',
            label: __('Indicator Margin', 'gutenverse'),
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
            id: 'submenuIndicatorPadding',
            label: __('Indicator Padding', 'gutenverse'),
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
            id: 'submenuIndicatorBorder',
            show: device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'submenuIndicatorBorder',
                    'selector': `.${elementId}.guten-element .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children > a i`,
                }
            ],
        },
        {
            id: 'submenuIndicatorBorderResponsive',
            show: device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'submenuIndicatorBorderResponsive',
                    'responsive': true,
                    'selector': `.${elementId}.guten-element .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children > a i`,
                }
            ],
        },
        {
            id: 'submenuTypography',
            label: __('Submenu Typography', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: 'submenuSpacing',
            label: __('Submenu Padding', 'gutenverse'),
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
            },
        },
        {
            id: 'submenuMargin',
            label: __('Submenu Margin', 'gutenverse'),
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
            },
        },
        {
            id: '__submenuState',
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
                    value: 'active',
                    label: 'Active'
                }
            ],
            onChange: ({ __submenuState }) => setSwitcher({ ...switcher, itemState: __submenuState })
        },
        {
            id: 'submenuTextNormalColor',
            show: switcher.itemState === undefined || switcher.itemState === 'normal',
            label: __('Submenu Text Normal Color', 'gutenverse'),
            allowDeviceControl: true,
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'submenuTextNormalColor',
                    'responsive': true,
                    'selector': `.${elementId}.guten-element .gutenverse-menu-wrapper .gutenverse-menu .sub-menu li > a`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                }
            ],
        },
        {
            id: 'submenuIndicatorColor',
            show: switcher.itemState === undefined || switcher.itemState === 'normal',
            label: __('Indicator Color', 'gutenverse'),
            allowDeviceControl: true,
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'submenuIndicatorColor',
                    'responsive': true,
                    'selector': `.${elementId}.guten-element .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children > a > i`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                },
                {
                    'type': 'color',
                    'id': 'submenuIndicatorColor',
                    'responsive': true,
                    'selector': `.${elementId}.guten-element .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children > a > svg`,
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
            id: 'submenuTextNormalBg',
            show: switcher.itemState === undefined || switcher.itemState === 'normal',
            component: BackgroundControl,
            label: __('Submenu Text Normal Background', 'gutenverse'),
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'id': 'submenuTextNormalBg',
                    'type': 'background',
                    'selector': `.${elementId}.guten-element .gutenverse-menu-wrapper .gutenverse-menu .sub-menu li > a`,
                },
            ],
        },
        {
            id: 'submenuTextHoverColor',
            show: switcher.itemState === 'hover',
            label: __('Submenu Text Hover Color', 'gutenverse'),
            allowDeviceControl: true,
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'submenuTextHoverColor',
                    'responsive': true,
                    'selector': `.${elementId}.guten-element .gutenverse-menu-wrapper .gutenverse-menu .sub-menu li:hover > a`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                }
            ],
        },
        {
            id: 'submenuIndicatorHoverColor',
            show: switcher.itemState === 'hover',
            label: __('Indicator Color', 'gutenverse'),
            allowDeviceControl: true,
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'submenuIndicatorHoverColor',
                    'responsive': true,
                    'selector': `.${elementId}.guten-element .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children:hover > a > i`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                },
                {
                    'type': 'color',
                    'id': 'submenuIndicatorHoverColor',
                    'responsive': true,
                    'selector': `.${elementId}.guten-element .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children:hover > a > svg`,
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
            id: 'submenuTextHoverBg',
            show: switcher.itemState === 'hover',
            component: BackgroundControl,
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'id': 'submenuTextHoverBg',
                    'type': 'background',
                    'selector': `.${elementId}.guten-element .gutenverse-menu-wrapper .gutenverse-menu .sub-menu li:hover > a`,
                },
            ],
        },
        {
            id: 'submenuTextActiveColor',
            show: switcher.itemState === 'active',
            label: __('Submenu Text Active Color', 'gutenverse'),
            allowDeviceControl: true,
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'submenuTextActiveColor',
                    'responsive': true,
                    'selector': `.${elementId}.guten-element .gutenverse-menu-wrapper .gutenverse-menu .sub-menu > li.current-menu-item > a`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                }
            ],
        },
        {
            id: 'submenuIndicatorActiveColor',
            show: switcher.itemState === 'active',
            label: __('Indicator Color', 'gutenverse'),
            allowDeviceControl: true,
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'submenuIndicatorActiveColor',
                    'responsive': true,
                    'selector': `.${elementId}.guten-element .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children.current-menu-parent > a > i`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                },
                {
                    'type': 'color',
                    'id': 'submenuIndicatorActiveColor',
                    'responsive': true,
                    'selector': `.${elementId}.guten-element .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu li.menu-item-has-children.current-menu-parent > a > svg`,
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
            id: 'submenuTextActiveBg',
            show: switcher.itemState === 'active',
            component: BackgroundControl,
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'id': 'submenuTextActiveBg',
                    'type': 'background',
                    'selector': `.${elementId}.guten-element .gutenverse-menu-wrapper .gutenverse-menu .sub-menu > li.current-menu-item > a`,
                },
            ],
        },
        {
            id: 'submenuItemBorderHeadingResponsive',
            component: HeadingControl,
            label: __('Submenu Border')
        },
        {
            id: 'submenuItemBorder',
            show: device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'submenuItemBorder',
                    'selector': `.${elementId}.guten-element .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu .sub-menu li > a`,
                }
            ],
        },
        {
            id: 'submenuItemBorderResponsive',
            show: device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'submenuItemBorderResponsive',
                    'responsive': true,
                    'selector': `.${elementId}.guten-element .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu .sub-menu li > a`,
                }
            ],
        },
        {
            id: 'submenuFirstItemBorderHeading',
            component: HeadingControl,
            label: __('Submenu First Child Border')
        },
        {
            id: 'submenuFirstItemBorder',
            show: device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'submenuFirstItemBorder',
                    'selector': `.${elementId}.guten-element .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu .sub-menu li:first-child > a`,
                }
            ],
        },
        {
            id: 'submenuFirstItemBorderResponsive',
            show: device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'submenuFirstItemBorderResponsive',
                    'responsive': true,
                    'selector': `.${elementId}.guten-element .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu .sub-menu li:first-child > a`,
                }
            ],
        },
        {
            id: 'submenuLastItemBorderHeading',
            component: HeadingControl,
            label: __('Submenu Last Child Border')
        },
        {
            id: 'submenuLastItemBorder',
            show: device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'submenuLastItemBorder',
                    'selector': `.${elementId}.guten-element .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu .sub-menu li:last-child > a`,
                }
            ],
        },
        {
            id: 'submenuLastItemBorderResponsive',
            show: device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'submenuLastItemBorderResponsive',
                    'responsive': true,
                    'selector': `.${elementId}.guten-element .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-menu .sub-menu li:last-child > a`,
                }
            ],
        },
    ];
};