import { __ } from '@wordpress/i18n';
import { BackgroundControl, BorderControl, BorderResponsiveControl, BoxShadowControl, ColorControl, DimensionControl, RangeControl, SwitchControl, TypographyControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const loadMoreStylePanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher
    } = props;

    const device = getDeviceType();

    return [
        {
            id: 'loadMoreMarginTop',
            label: __('Margin Top', 'gutenverse'),
            component: RangeControl,
            min: 0,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'loadMoreMarginTop',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'margin-top',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ],
                    'selector': `.${elementId}.guten-gallery .load-more-items`,
                }
            ]
        },
        {
            id: 'loadMoreIconSize',
            label: __('Icon Size', 'gutenverse'),
            component: RangeControl,
            min: 0,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'loadMoreIconSize',
                    'responsive': true,
                    'selector': `.${elementId}.guten-gallery .load-more-items .load-more-icon`,
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
                    'id': 'loadMoreIconSize',
                    'responsive': true,
                    'selector': `.${elementId}.guten-gallery .load-more-items .load-more-icon svg`,
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
            id: 'loadMoreIconSpacing',
            label: __('Icon Spacing', 'gutenverse'),
            component: RangeControl,
            min: 0,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'loadMoreIconSpacing',
                    'responsive': true,
                    'selector': `.${elementId}.guten-gallery .load-more-items .load-more-icon.icon-position-before`,
                    'properties': [
                        {
                            'name': 'margin-right',
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
                    'id': 'loadMoreIconSpacing',
                    'responsive': true,
                    'selector': `.${elementId}.guten-gallery .load-more-items .load-more-icon.icon-position-after`,
                    'properties': [
                        {
                            'name': 'margin-left',
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
            id: 'loadMoreTypography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: 'loadMorePadding',
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
                ['%']: {
                    text: '%',
                    unit: '%'
                },
            },
        },
        {
            id: 'loadMoreBoxShadow',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            liveStyle: [
                {
                    'type': 'boxShadow',
                    'id': 'loadMoreBoxShadow',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId}.guten-gallery .load-more-items .guten-gallery-load-more`,
                }
            ]
        },
        {
            id: '__loadHover',
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
            onChange: ({ __loadHover }) => setSwitcher({ ...switcher, loadHover: __loadHover })
        },
        {
            id: 'loadMoreTextColor',
            show: !switcher.loadHover || switcher.loadHover === 'normal',
            label: __('Normal Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'loadMoreTextColor',
                    'responsive': true,
                    'selector': `.${elementId}.guten-gallery .load-more-items .guten-gallery-load-more`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                },
                {
                    'type': 'color',
                    'id': 'loadMoreTextColor',
                    'responsive': true,
                    'selector': `.${elementId}.guten-gallery .load-more-items .guten-gallery-load-more svg`,
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
            id: 'loadMoreTextColorHover',
            show: switcher.loadHover === 'hover',
            label: __('Hover Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'loadMoreTextColorHover',
                    'responsive': true,
                    'selector': `.${elementId}.guten-gallery .load-more-items .guten-gallery-load-more:hover`,
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
            id: 'loadMoreBackground',
            show: !switcher.loadHover || switcher.loadHover === 'normal',
            label: __('Normal Background', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'loadMoreBackground',
                    'selector': `.${elementId}.guten-gallery .load-more-items .guten-gallery-load-more`,
                }
            ]
        },
        {
            id: 'loadMoreBackgroundHover',
            show: switcher.loadHover === 'hover',
            label: __('Hover Background', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'loadMoreBackgroundHover',
                    'selector': `.${elementId}.guten-gallery .load-more-items .guten-gallery-load-more:hover`,
                }
            ]
        },
        {
            id: 'loadMoreBorder',
            show: (!switcher.loadHover || switcher.loadHover === 'normal') && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'loadMoreBorder',
                    'selector': `.${elementId}.guten-gallery .load-more-items .guten-gallery-load-more`,
                }
            ]
        },
        {
            id: 'loadMoreBorderResponsive',
            show: (!switcher.loadHover || switcher.loadHover === 'normal') && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'loadMoreBorderResponsive',
                    'selector': `.${elementId}.guten-gallery .load-more-items .guten-gallery-load-more`,
                }
            ]
        },
        {
            id: 'loadMoreBorderHover',
            show: switcher.loadHover === 'hover' && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'loadMoreBorderHover',
                    'selector': `.${elementId}.guten-gallery .load-more-items .guten-gallery-load-more:hover`,
                }
            ]
        },
        {
            id: 'loadMoreBorderHoverResponsive',
            show: switcher.loadHover === 'hover' && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'loadMoreBorderResponsiveHover',
                    'selector': `.${elementId}.guten-gallery .load-more-items .guten-gallery-load-more:hover`,
                }
            ]
        },
    ];
};