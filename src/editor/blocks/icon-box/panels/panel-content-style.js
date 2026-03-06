import { __ } from '@wordpress/i18n';
import { ColorControl, DimensionControl, RangeControl, TypographyControl } from 'gutenverse-core/controls';
import { handleColor, handleDimension, handleTypography } from 'gutenverse-core/styling';

export const panelContentStyle = (props) => {
    const {
        elementId,
    } = props;

    return [
        {
            id: 'titlePadding',
            label: __('Title Padding', 'gutenverse'),
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
            id: 'titleMargin',
            label: __('Title Margin', 'gutenverse'),
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
            id: 'titleColor',
            label: __('Title Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'titleColor',
                    'selector': `.${elementId} .icon-box.icon-box-body .title`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ],
                }
            ],
        },
        {
            id: 'titleHoverColor',
            label: __('Title Hover Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'titleHoverColor',
                    'selector': `.${elementId}:hover .icon-box.icon-box-body .title`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ],
                }
            ],
        },
        {
            id: 'titleTypography',
            label: __('Title Typography', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: 'descMargin',
            label: __('Description Margin', 'gutenverse'),
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
            id: 'descColor',
            label: __('Description Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'descColor',
                    'selector': `.${elementId} .icon-box.icon-box-body .icon-box-description`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ],
                }
            ],
        },
        {
            id: 'descHoverColor',
            label: __('Description Hover Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'descHoverColor',
                    'selector': `.${elementId}:hover .icon-box.icon-box-body .icon-box-description`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ],
                }
            ],
        },
        {
            id: 'descTypography',
            label: __('Description Typography', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: 'watermarkColor',
            label: __('Watermark Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'watermarkColor',
                    'selector': `.${elementId} .hover-watermark i`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ],
                },
                {
                    'type': 'color',
                    'id': 'watermarkColor',
                    'selector': `.${elementId} .hover-watermark svg`,
                    'properties': [
                        {
                            'name': 'fill',
                            'valueType': 'direct'
                        }
                    ],
                }
            ],
        },
        {
            id: 'watermarkSize',
            label: __('Watermark Font Size', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            unit: 'px',
            min: 1,
            max: 1000,
            step: 1,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'watermarkSize',
                    'selector': `.${elementId} .hover-watermark i`,
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
                    'id': 'watermarkSize',
                    'selector': `.${elementId} .hover-watermark svg`,
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
    ];
};

