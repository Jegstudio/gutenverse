import { __ } from '@wordpress/i18n';
import { ColorControl, DimensionControl, RangeControl, TypographyControl, CheckboxControl } from 'gutenverse-core/controls';

export const postmetaPanel = (props) => {
    const {
        elementId,
        postMetaInline
    } = props;

    return [
        {
            id: 'metaTypography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: 'metaColor',
            label: __('Text color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'metaColor',
                    'selector': `.${elementId} .guten-postblock .guten-postblock-content .guten-post-meta`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ],
                }
            ]
        },
        {
            id: 'metaColorIcon',
            label: __('Icon color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'metaColorIcon',
                    'selector': `.${elementId} .guten-postblock .guten-postblock-content .guten-post-meta i`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ],
                },
                {
                    'type': 'color',
                    'id': 'metaColorIcon',
                    'selector': `.${elementId} .guten-postblock .guten-postblock-content .guten-post-meta svg`,
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
            id: 'metaSizeIcon',
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
                    'id': 'metaSizeIcon',
                    'responsive' : true,
                    'selector': `.${elementId} .guten-postblock .guten-postblock-content .guten-post-meta i`,
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
                    'id': 'metaSizeIcon',
                    'responsive' : true,
                    'selector': `.${elementId} .guten-postblock .guten-postblock-content .guten-post-meta svg`,
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
            id: 'metaAuthorTypography',
            label: __('Author Typography', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: 'metaAuthorColor',
            label: __('Author color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'metaAuthorColor',
                    'selector': `.${elementId} .guten-postblock .guten-postblock-content .guten-post-meta .guten-meta-author a`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ],
                }
            ]
        },
        {
            id: 'metaMargin',
            label: __('Margin', 'gutenverse'),
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
            id: 'metaAuthorIconSpacing',
            label: __('Author Icon Spacing', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'metaAuthorIconSpacing',
                    'responsive': true,
                    'selector': `.${elementId} .guten-postblock .guten-postblock-content .guten-post-meta .guten-meta-author.icon-position-before i`,
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
                    'id': 'metaAuthorIconSpacing',
                    'responsive': true,
                    'selector': `.${elementId} .guten-postblock .guten-postblock-content .guten-post-meta .guten-meta-author.icon-position-after i`,
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
            id: 'metaDateIconSpacing',
            label: __('Date Icon Spacing', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'metaDateIconSpacing',
                    'responsive': true,
                    'selector': `.${elementId} .guten-postblock .guten-postblock-content .guten-post-meta .guten-meta-date.icon-position-before i`,
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
                    'id': 'metaDateIconSpacing',
                    'responsive': true,
                    'selector': `.${elementId} .guten-postblock .guten-postblock-content .guten-post-meta .guten-meta-date.icon-position-after i`,
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
            id: 'postMetaInline',
            label: __('Set Inline Post Meta', 'gutenverse'),
            component: CheckboxControl,
            allowDeviceControl: true,
            deviceValues: postMetaInline,
            usePreviousDeviceValue: true,
            usePreviousDevice: true,
        },
    ];
};