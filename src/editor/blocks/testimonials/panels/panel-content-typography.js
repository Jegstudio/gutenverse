import { __ } from '@wordpress/i18n';
import { CheckboxControl, ColorControl, DimensionControl, RangeControl, SwitchControl, TypographyControl } from 'gutenverse-core/controls';

export const panelContentTypography = props => {
    const {
        elementId,
        quoteOverride,
        switcher,
        setSwitcher
    } = props;

    return [
        {
            id: 'nameTypography',
            label: __('Name Typography', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: 'designationTypography',
            label: __('Designation Typography', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: 'descriptionTypography',
            label: __('Comment Typography', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: 'designationSpacing',
            label: __('Designation Spacing', 'gutenverse'),
            component: RangeControl,
            min: 0,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'designationSpacing',
                    'responsive': true,
                    'selector': `.${elementId} .guten-testimonial-item .testimonial-box .profile-info .profile-des`,
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
                    ]
                }
            ]
        },
        {
            id: 'descriptionMargin',
            label: __('Comment Margin', 'gutenverse'),
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
            id: 'quoteSize',
            label: __('Quote Icon Size', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 200,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'quoteSize',
                    'responsive': true,
                    'selector': `.${elementId} .guten-testimonial-item .testimonial-box .icon-content i`,
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
                    'id': 'quoteSize',
                    'responsive': true,
                    'selector': `.${elementId} .guten-testimonial-item .testimonial-box .icon-content svg`,
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
            id: 'quoteOverride',
            label: __('Override Quote Position', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'quotePositionTop',
            show: quoteOverride,
            label: __('Top', 'gutenverse'),
            component: RangeControl,
            min: -200,
            max: 200,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'quotePositionTop',
                    'responsive': true,
                    'selector': `.${elementId}.guten-testimonials .swiper-container .guten-testimonial-item .testimonial-box .icon-content.quote-override`,
                    'properties': [
                        {
                            'name': 'top',
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
            id: 'quotePositionLeft',
            show: quoteOverride,
            label: __('Left', 'gutenverse'),
            component: RangeControl,
            min: -200,
            max: 200,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'quotePositionLeft',
                    'responsive': true,
                    'selector': `.${elementId}.guten-testimonials .swiper-container .guten-testimonial-item .testimonial-box .icon-content.quote-override`,
                    'properties': [
                        {
                            'name': 'left',
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
            id: '__textHover',
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
            onChange: ({ __textHover }) => setSwitcher({ ...switcher, state: __textHover })
        },
        {
            id: 'nameNormalColor',
            show: !switcher.state || switcher.state === 'normal',
            label: __('Name Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'nameNormalColor',
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId}.guten-testimonials .swiper-container .guten-testimonial-item .testimonial-box .profile-info .profile-name`,
                }
            ]
        },
        {
            id: 'nameHoverColor',
            show: switcher.state === 'hover',
            label: __('Name Hover Color', 'gutenverse'),
            component: ColorControl,
        },
        {
            id: 'designationNormalColor',
            show: !switcher.state || switcher.state === 'normal',
            label: __('Designation Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'designationNormalColor',
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId}.guten-testimonials .swiper-container .guten-testimonial-item .testimonial-box .profile-info .profile-des`,
                }
            ]
        },
        {
            id: 'designationHoverColor',
            show: switcher.state === 'hover',
            label: __('Designation Hover Color', 'gutenverse'),
            component: ColorControl,
        },
        {
            id: 'descriptionNormalColor',
            show: !switcher.state || switcher.state === 'normal',
            label: __('Comment Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'descriptionNormalColor',
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId}.guten-testimonials .swiper-container .guten-testimonial-item .testimonial-box .comment-content p`,
                }
            ]
        },
        {
            id: 'descriptionHoverColor',
            show: switcher.state === 'hover',
            label: __('Comment Hover Color', 'gutenverse'),
            component: ColorControl,
        },
        {
            id: 'quoteNormalColor',
            show: !switcher.state || switcher.state === 'normal',
            label: __('Quote Icon Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'quoteNormalColor',
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId} .guten-testimonial-item .testimonial-box .icon-content i`,
                },
                {
                    'type': 'color',
                    'id': 'quoteNormalColor',
                    'properties': [
                        {
                            'name': 'fill',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId} .guten-testimonial-item .testimonial-box .icon-content svg`,
                }
            ]
        },
        {
            id: 'quoteHoverColor',
            show: switcher.state === 'hover',
            label: __('Quote Icon Hover Color', 'gutenverse'),
            component: ColorControl,
        },
    ];
};