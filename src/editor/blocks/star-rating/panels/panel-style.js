import { __ } from '@wordpress/i18n';
import { ColorControl, RangeControl, TypographyControl } from 'gutenverse-core/controls';

export const panelStyle = ({ elementId }) => {
    return [
        {
            id: 'titleColor',
            label: __('Title Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'titleColor',
                    'selector': `.${elementId} .rating-title`,
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
            id: 'titleTypography',
            label: __('Title Typography', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: 'gap',
            label: __('Content Gap', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            unit: 'px',
            min: 1,
            max: 50,
            step: 1,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'gap',
                    'selector': `.${elementId} .rating-title`,
                    'responsive': true,
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
                }
            ]
        },
        {
            id: 'iconSize',
            label: __('Icon Size', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            unit: 'px',
            min: 1,
            max: 100,
            step: 1,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'iconSize',
                    'selector': `.${elementId} .rating-icons i`,
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
                    'id': 'iconSize',
                    'selector': `.${elementId} .rating-icons svg`,
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
            ]
        },
        {
            id: 'iconGap',
            label: __('Icon Gap', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            unit: 'px',
            min: 1,
            max: 50,
            step: 1,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'iconGap',
                    'selector': `.${elementId} .rating-icons i`,
                    'responsive': true,
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
                    'id': 'iconGap',
                    'selector': `.${elementId} .gutenverse-icon-svg`,
                    'responsive': true,
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
                }
            ]
        },
        {
            id: 'iconColorMarked',
            label: __('Icon Color (Marked)', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'iconColorMarked',
                    'selector': `.${elementId} .rating-icons i.full`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                },
                {
                    'type': 'color',
                    'id': 'iconColorMarked',
                    'selector': `.${elementId} .rating-icons .gutenverse-icon-svg.full svg`,
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
            id: 'iconColorUnmarked',
            label: __('Icon Color (Unmarked)', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'iconColorUnmarked',
                    'selector': `.${elementId} .rating-icons i.empty`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                },
                {
                    'type': 'color',
                    'id': 'iconColorUnmarked',
                    'selector': `.${elementId} .rating-icons .gutenverse-icon-svg..empty svg`,
                    'properties': [
                        {
                            'name': 'fill',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
    ];
};