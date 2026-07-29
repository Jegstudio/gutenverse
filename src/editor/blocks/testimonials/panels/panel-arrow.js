import { __ } from '@wordpress/i18n';
import { BorderControl, BorderResponsiveControl, BoxShadowControl, ColorControl, DimensionControl, RangeControl, SelectControl, SwitchControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const arrowPanel = (props) => {
    const {
        elementId,
        showArrow,
        arrowLayout,
        switcher,
        setSwitcher
    } = props;

    const device = getDeviceType();

    return [
        {
            id: 'arrowLayout',
            show: showArrow,
            label: __('Arrow Arrangement', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    value: 'split',
                    label: __('Split', 'gutenverse')
                },
                {
                    value: 'grouped',
                    label: __('Grouped', 'gutenverse')
                }
            ]
        },
        {
            id: 'arrowPosition',
            show: showArrow && arrowLayout === 'split',
            label: __('Arrow Position', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    value: 'default',
                    label: __('Default', 'gutenverse')
                },
                {
                    value: 'top',
                    label: __('Top', 'gutenverse')
                },
                {
                    value: 'bottom',
                    label: __('Bottom', 'gutenverse')
                }
            ]
        },
        {
            id: 'arrowGroupPosition',
            show: showArrow && arrowLayout === 'grouped',
            label: __('Group Position', 'gutenverse'),
            component: SelectControl,
            options: [
                { value: 'top-left', label: __('Top Left', 'gutenverse') },
                { value: 'top-center', label: __('Top Center', 'gutenverse') },
                { value: 'top-right', label: __('Top Right', 'gutenverse') },
                { value: 'middle-left', label: __('Middle Left', 'gutenverse') },
                { value: 'middle-center', label: __('Center', 'gutenverse') },
                { value: 'middle-right', label: __('Middle Right', 'gutenverse') },
                { value: 'bottom-left', label: __('Bottom Left', 'gutenverse') },
                { value: 'bottom-center', label: __('Bottom Center', 'gutenverse') },
                { value: 'bottom-right', label: __('Bottom Right', 'gutenverse') }
            ]
        },
        {
            id: 'arrowOffsetX',
            show: showArrow && (
                arrowLayout === 'grouped' ||
                arrowLayout === 'split'
            ),
            label: __('Horizontal Offset', 'gutenverse'),
            component: RangeControl,
            min: -200,
            max: 200,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'arrowOffsetX',
                    'responsive': true,
                    'selector': `.${elementId}.guten-testimonials`,
                    'properties': [
                        {
                            'name': '--guten-testimonial-arrow-offset-x',
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
            id: 'arrowOffsetY',
            show: showArrow && (
                arrowLayout === 'grouped' ||
                arrowLayout === 'split'
            ),
            label: __('Vertical Offset', 'gutenverse'),
            component: RangeControl,
            min: -200,
            max: 200,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'arrowOffsetY',
                    'responsive': true,
                    'selector': `.${elementId}.guten-testimonials`,
                    'properties': [
                        {
                            'name': '--guten-testimonial-arrow-offset-y',
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
            id: 'arrowGap',
            show: showArrow && arrowLayout === 'grouped',
            label: __('Arrow Gap', 'gutenverse'),
            component: RangeControl,
            min: 0,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'arrowGap',
                    'responsive': true,
                    'selector': `.${elementId}.guten-testimonials`,
                    'properties': [
                        {
                            'name': '--guten-testimonial-arrow-gap',
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
            id: 'arrowFontSize',
            label: __('Arrow Size', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'arrowFontSize',
                    'responsive': true,
                    'selector': `.${elementId} div[class*='swiper-button-']`,
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
            id: '__arrowHover',
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
                    value: 'disabled',
                    label: 'Disabled'
                }
            ],
            onChange: ({ __arrowHover }) => setSwitcher({ ...switcher, arrowHover: __arrowHover })
        },
        {
            id: 'arrowColor',
            show: !switcher.arrowHover || switcher.arrowHover === 'normal',
            label: __('Normal Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'arrowColor',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId} div[class*='swiper-button-']`,
                }
            ]
        },
        {
            id: 'arrowBgColor',
            show: !switcher.arrowHover || switcher.arrowHover === 'normal',
            label: __('Background Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'arrowBgColor',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'background-color',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId} div[class*='swiper-button-']`,
                }
            ]
        },
        {
            id: 'arrowPadding',
            show: !switcher.arrowHover || switcher.arrowHover === 'normal',
            label: __('Normal Padding', 'gutenverse'),
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
            id: 'arrowMargin',
            show: !switcher.arrowHover || switcher.arrowHover === 'normal',
            label: __('Normal Margin', 'gutenverse'),
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
            id: 'arrowOpacity',
            show: !switcher.arrowHover || switcher.arrowHover === 'normal',
            label: __('Normal Opacity', 'gutenverse'),
            component: RangeControl,
            min: 0,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'arrowOpacity',
                    'responsive': true,
                    'selector': `.${elementId} div[class*='swiper-button-']`,
                    'properties': [
                        {
                            'name': 'opacity',
                            'valueType': 'function',
                            'functionName': 'handleOpacity'
                        }
                    ]
                }
            ]
        },
        {
            id: 'arrowBorder',
            show: (!switcher.arrowHover || switcher.arrowHover === 'normal') && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'arrowBorder',
                    'selector': `.${elementId} div[class*='swiper-button-']`,
                }
            ]
        },
        {
            id: 'arrowBorderResponsive',
            show: (!switcher.arrowHover || switcher.arrowHover === 'normal') && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'arrowBorderResponsive',
                    'selector': `.${elementId} div[class*='swiper-button-']`,
                }
            ]
        },
        {
            id: 'arrowBoxShadow',
            show: !switcher.arrowHover || switcher.arrowHover === 'normal',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            liveStyle: [
                {
                    'type': 'boxShadow',
                    'id': 'arrowBoxShadow',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId} div[class*='swiper-button-']`,
                }
            ]
        },
        {
            id: 'arrowHoverColor',
            show: switcher.arrowHover === 'hover',
            label: __('Hover Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
        },
        {
            id: 'arrowHoverBgColor',
            show: switcher.arrowHover === 'hover',
            label: __('Background Hover Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
        },
        {
            id: 'arrowHoverPadding',
            show: switcher.arrowHover === 'hover',
            label: __('Hover Padding', 'gutenverse'),
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
            id: 'arrowHoverMargin',
            show: switcher.arrowHover === 'hover',
            label: __('Hover Margin', 'gutenverse'),
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
            id: 'arrowHoverOpacity',
            show: switcher.arrowHover === 'hover',
            label: __('Hover Opacity', 'gutenverse'),
            component: RangeControl,
            min: 0,
            max: 100,
            step: 1,
            allowDeviceControl: true,
        },
        {
            id: 'arrowBorderHover',
            show: switcher.arrowHover === 'hover' && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
        },
        {
            id: 'arrowBorderHoverResponsive',
            show: switcher.arrowHover === 'hover' && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
        },
        {
            id: 'arrowBoxShadowHover',
            show: switcher.arrowHover === 'hover',
            label: __('Hover Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
        },
        {
            id: 'arrowDisabledColor',
            show: switcher.arrowHover === 'disabled',
            label: __('Disabled Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'arrowDisabledColor',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId} div[class*='swiper-button-'].swiper-button-disabled`,
                }
            ]
        },
        {
            id: 'arrowDisabledBgColor',
            show: switcher.arrowHover === 'disabled',
            label: __('Background Disabled Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'arrowDisabledBgColor',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'background-color',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId} div[class*='swiper-button-'].swiper-button-disabled`,
                }
            ]
        },
        {
            id: 'arrowDisabledPadding',
            show: switcher.arrowHover === 'disabled',
            label: __('Disabled Padding', 'gutenverse'),
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
            }
        },
        {
            id: 'arrowDisabledMargin',
            show: switcher.arrowHover === 'disabled',
            label: __('Disabled Margin', 'gutenverse'),
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
            id: 'arrowDisabledOpacity',
            show: switcher.arrowHover === 'disabled',
            label: __('Disabled Opacity', 'gutenverse'),
            component: RangeControl,
            min: 0,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'arrowDisabledOpacity',
                    'responsive': true,
                    'selector': `.${elementId} div[class*='swiper-button-'].swiper-button-disabled`,
                    'properties': [
                        {
                            'name': 'opacity',
                            'valueType': 'function',
                            'functionName': 'handleOpacity'
                        }
                    ]
                }
            ]
        },
        {
            id: 'arrowBorderDisabled',
            show: switcher.arrowHover === 'disabled',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'arrowBorderHoverResponsive',
                    'selector': `.${elementId} div[class*='swiper-button-'].swiper-button-disabled`,
                }
            ]
        },
        {
            id: 'arrowBoxShadowDisabled',
            show: switcher.arrowHover === 'disabled',
            label: __('Disabled Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            liveStyle: [
                {
                    'type': 'boxShadow',
                    'id': 'arrowBoxShadowDisabled',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId} div[class*='swiper-button-'].swiper-button-disabled`,
                }
            ]
        }
    ];
};
