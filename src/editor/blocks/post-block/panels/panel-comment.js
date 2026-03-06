import { __ } from '@wordpress/i18n';
import {
    ColorControl,
    DimensionControl,
    RangeControl,
} from 'gutenverse-core/controls';

export const commentPanel = (props) => {
    const { elementId } = props;

    return [
        {
            id: 'commentColor',
            label: __('Text color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'commentColor',
                    'selector': `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-comment a`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ],
                },
                {
                    'type': 'color',
                    'id': 'commentColor',
                    'selector': `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-comment svg`,
                    'properties': [
                        {
                            'name': 'fill',
                            'valueType': 'direct'
                        }
                    ],
                }
            ]
        },
        {
            id: 'commentSize',
            label: __('Size', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'commentSize',
                    'responsive': true,
                    'selector': `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-comment a`,
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
                    'id': 'commentSize',
                    'responsive': true,
                    'selector': `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-comment svg`,
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
            id: 'commentSpacing',
            label: __('Spacing', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'commentSpacing',
                    'responsive': true,
                    'selector': `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-comment.icon-position-before span`,
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
                },
                {
                    'type': 'plain',
                    'id': 'commentSpacing',
                    'responsive': true,
                    'selector': `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-comment.icon-position-after span`,
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
            id: 'commentMargin',
            label: __('Margin', 'gutenverse'),
            component: DimensionControl,
            position: ['top', 'right', 'bottom', 'left'],
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    unit: 'px',
                },
                em: {
                    text: 'em',
                    unit: 'em',
                },
                percent: {
                    text: '%',
                    unit: '%',
                },
            },
        },
        {
            id: 'commentPadding',
            label: __('Padding', 'gutenverse'),
            component: DimensionControl,
            position: ['top', 'right', 'bottom', 'left'],
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    unit: 'px',
                },
                em: {
                    text: 'em',
                    unit: 'em',
                },
                percent: {
                    text: '%',
                    unit: '%',
                },
            },
        },
    ];
};
