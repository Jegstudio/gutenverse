import { __ } from '@wordpress/i18n';

import { AlignCenter, AlignLeft, AlignRight } from 'react-feather';
import { ColorControl, DimensionControl, IconRadioControl, RangeControl } from 'gutenverse-core/controls';

export const panelRatingStyle = ({ elementId }) => {
    return [
        {
            id: 'ratingAlignment',
            label: __('Alignment', 'gutenverse'),
            component: IconRadioControl,
            allowDeviceControl: true,
            options: [
                {
                    label: __('Align Left', 'gutenverse'),
                    value: 'left',
                    icon: <AlignLeft />,
                },
                {
                    label: __('Align Center', 'gutenverse'),
                    value: 'center',
                    icon: <AlignCenter />,
                },
                {
                    label: __('Align Right', 'gutenverse'),
                    value: 'right',
                    icon: <AlignRight />,
                },
            ],
        },
        {
            id: 'ratingColor',
            label: __('Normal Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'ratingColor',
                    'selector': `.${elementId}.style-1 .guten-testimonial-item ul.rating-stars li, 
                    .${elementId}.style-2 .guten-testimonial-item ul.rating-stars li, 
                    .${elementId}.style-3 .guten-testimonial-item ul.rating-stars li, 
                    .${elementId}.style-4 .guten-testimonial-item ul.rating-stars li`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct',
                        }
                    ]
                },
                {
                    'type': 'color',
                    'id': 'ratingColor',
                    'selector': `.${elementId}.style-1 .guten-testimonial-item ul.rating-stars li svg, 
                    .${elementId}.style-2 .guten-testimonial-item ul.rating-stars li svg, 
                    .${elementId}.style-3 .guten-testimonial-item ul.rating-stars li svg, 
                    .${elementId}.style-4 .guten-testimonial-item ul.rating-stars li svg`,
                    'properties': [
                        {
                            'name': 'fill',
                            'valueType': 'direct',
                        }
                    ]
                }
            ]
        },
        {
            id: 'ratingColorHover',
            label: __('Hover Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'ratingColorHover',
                    'selector': `.${elementId}.style-1 .guten-testimonial-item:hover ul.rating-stars li, 
                                .${elementId}.style-2 .guten-testimonial-item:hover ul.rating-stars li, 
                                .${elementId}.style-3 .guten-testimonial-item:hover ul.rating-stars li, 
                                .${elementId}.style-4 .guten-testimonial-item:hover ul.rating-stars li`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct',
                        }
                    ]
                }
            ]
        },
        {
            id: 'ratingIconSize',
            label: __('Icon Size', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'ratingIconSize',
                    'responsive': true,
                    'selector': `.${elementId} ul.rating-stars li i`,
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
                    'id': 'ratingIconSize',
                    'responsive': true,
                    'selector': `.${elementId} ul.rating-stars li svg`,
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
            id: 'ratingIconGap',
            label: __('Icon Gap', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'ratingIconGap',
                    'responsive': true,
                    'selector': `.${elementId}.style-1 ul.rating-stars, 
                                .${elementId}.style-2 ul.rating-stars, 
                                .${elementId}.style-3 ul.rating-stars, 
                                .${elementId}.style-4 ul.rating-stars`,
                    'properties': [
                        {
                            'name': 'gap',
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
            id: 'ratingMargin',
            label: __('Icon Margin', 'gutenverse'),
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
                rem: {
                    text: 'rem',
                    unit: 'rem'
                },
            },
        },
    ];
};