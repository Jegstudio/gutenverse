import { __ } from '@wordpress/i18n';

import { ColorControl, IconRadioControl, RangeControl, SwitchControl, TextShadowControl, TypographyControl } from 'gutenverse-core/controls';
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from 'gutenverse-core/components';
export const stylePanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher,
        contentType,
    } = props;

    return [
        {
            id: 'alignment',
            label: __('Alignment', 'gutenverse'),
            component: IconRadioControl,
            allowDeviceControl: true,
            options: [
                {
                    label: __('Align Left', 'gutenverse'),
                    value: 'flex-start',
                    icon: <AlignLeft />,
                },
                {
                    label: __('Align Center', 'gutenverse'),
                    value: 'center',
                    icon: <AlignCenter />,
                },
                {
                    label: __('Align Right', 'gutenverse'),
                    value: 'flex-end',
                    icon: <AlignRight />,
                },
                contentType === 'string' && {
                    label: __('Align Right', 'gutenverse'),
                    value: 'space-between',
                    icon: <AlignJustify />,
                },
            ],
        },
        {
            id: 'typography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: 'contentGap',
            label: __('Gap', 'gutenverse'),
            component: RangeControl,
            show: contentType === 'block',
            unit: 'px',
            min: 0,
            max: 100,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'contentGap',
                    'selector': `.${elementId} .post-term-block`,
                    'responsive': true,
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
            ],
        },
        {
            id: '__styleHover',
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
            onChange: ({ __styleHover }) => setSwitcher({ ...switcher, styleHover: __styleHover })
        },
        {
            id: 'color',
            show: !switcher.styleHover || switcher.styleHover === 'normal',
            label: __('Text color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'color',
                    'selector': `.${elementId} h1, .${elementId} h2, .${elementId} h3, .${elementId} h4, .${elementId} h5, .${elementId} h6, .${elementId} span, .${elementId} a`,
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
            id: 'textShadow',
            show: !switcher.styleHover || switcher.styleHover === 'normal',
            label: __('Text Shadow', 'gutenverse'),
            component: TextShadowControl,
            liveStyle: [
                {
                    'type': 'textShadow',
                    'id': 'textShadow',
                    'properties': [
                        {
                            'name': 'text-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId} h1, .${elementId} h2, .${elementId} h3, .${elementId} h4, .${elementId} h5, .${elementId} h6, .${elementId} span`,
                }
            ],
        },
        {
            id: 'colorHover',
            show: switcher.styleHover === 'hover',
            label: __('Hover Text color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'colorHover',
                    'selector': `.${elementId}:hover h1, .${elementId}:hover h2, .${elementId}:hover h3, .${elementId}:hover h4, .${elementId}:hover h5, .${elementId}:hover h6, .${elementId}:hover span, .${elementId}:hover a`,
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
            id: 'colorItemHover',
            show: switcher.styleHover === 'hover',
            label: __('Hover Item Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'colorItemHover',
                    'selector': `.${elementId} h1.term-item:hover, .${elementId} h2.term-item:hover, .${elementId} h3.term-item:hover, .${elementId} h4.term-item:hover, .${elementId} h5.term-item:hover, .${elementId} h6.term-item:hover, .${elementId} span.term-item:hover, .${elementId} a.term-item:hover, .${elementId} .term-list:hover`,
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
            id: 'textShadowHover',
            show: switcher.styleHover === 'hover',
            label: __('Hover Text Shadow', 'gutenverse'),
            component: TextShadowControl,
            liveStyle: [
                {
                    'type': 'textShadow',
                    'id': 'textShadowHover',
                    'properties': [
                        {
                            'name': 'text-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId}:hover h1, .${elementId}:hover h2, .${elementId}:hover h3, .${elementId}:hover h4, .${elementId}:hover h5, .${elementId}:hover h6, .${elementId}:hover span`,
                }
            ],
        }
    ];
};

