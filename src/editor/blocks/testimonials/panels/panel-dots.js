import { __ } from '@wordpress/i18n';
import { ColorControl, DimensionControl, RangeControl, SwitchControl } from 'gutenverse-core/controls';

export const dotsPanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher
    } = props;

    return [
        {
            id: 'dotsSpacingHorizontal',
            label: __('Spacing Horizontal', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'dotsSpacingHorizontal',
                    'responsive': true,
                    'selector': `.${elementId} .swiper-pagination-bullets .swiper-pagination-bullet`,
                    'properties': [
                        {
                            'name': 'margin',
                            'valueType': 'pattern',
                            'pattern': '0 calc({value}px / 2)',
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
            id: 'dotsSpacingVertical',
            label: __('Spacing Vertical', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'dotsSpacingVertical',
                    'responsive': true,
                    'selector': `.${elementId} .swiper-pagination-bullets`,
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
            id: '__dotsNav',
            component: SwitchControl,
            options: [
                {
                    value: 'general',
                    label: 'General'
                },
                {
                    value: 'active',
                    label: 'Active'
                }
            ],
            onChange: ({ __dotsNav }) => setSwitcher({ ...switcher, dotsNav: __dotsNav })
        },
        {
            id: 'dotsWidth',
            show: !switcher.dotsNav || switcher.dotsNav === 'general',
            label: __('Dots Width', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'dotsWidth',
                    'responsive': true,
                    'selector': `.${elementId} .swiper-pagination-bullet`,
                    'properties': [
                        {
                            'name': 'width',
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
            id: 'dotsHeight',
            show: !switcher.dotsNav || switcher.dotsNav === 'general',
            label: __('Dots Height', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'dotsHeight',
                    'responsive': true,
                    'selector': `.${elementId} .swiper-pagination-bullet`,
                    'properties': [
                        {
                            'name': 'height',
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
            id: 'dotsRadius',
            show: !switcher.dotsNav || switcher.dotsNav === 'general',
            label: __('Dots Border Radius', 'gutenverse'),
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
            id: 'dotsColor',
            show: !switcher.dotsNav || switcher.dotsNav === 'general',
            label: __('Dots Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'dotsColor',
                    'responsive': true,
                    'selector': `.${elementId} .swiper-pagination-bullet`,
                    'properties': [
                        {
                            'name': 'background-color',
                            'valueType': 'direct',
                        }
                    ]
                }
            ]
        },
        {
            id: 'dotsActiveWidth',
            show: switcher.dotsNav === 'active',
            label: __('Active Width', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'dotsActiveWidth',
                    'responsive': true,
                    'selector': `.${elementId} .swiper-pagination-bullet.swiper-pagination-bullet-active`,
                    'properties': [
                        {
                            'name': 'width',
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
            id: 'dotsActiveHeight',
            show: switcher.dotsNav === 'active',
            label: __('Active Height', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'dotsActiveHeight',
                    'responsive': true,
                    'selector': `.${elementId} .swiper-pagination-bullet.swiper-pagination-bullet-active`,
                    'properties': [
                        {
                            'name': 'height',
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
            id: 'dotsActiveRadius',
            show: switcher.dotsNav === 'active',
            label: __('Active Border Radius', 'gutenverse'),
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
            id: 'dotsActiveColor',
            show: switcher.dotsNav === 'active',
            label: __('Active Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'dotsActiveColor',
                    'responsive': true,
                    'selector': `.${elementId} .swiper-pagination-bullet.swiper-pagination-bullet-active`,
                    'properties': [
                        {
                            'name': 'background-color',
                            'valueType': 'direct',
                        }
                    ]
                }
            ]
        },
    ];
};