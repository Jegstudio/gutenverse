import { __ } from '@wordpress/i18n';
import { ColorControl, RangeControl, SwitchControl, TextShadowControl, TypographyControl } from 'gutenverse-core/controls';

export const biographyStylePanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher
    } = props;

    return [
        {
            id: 'biographyTypography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: 'biographyMargintop',
            label: __('Margin Top', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            min: 0,
            max: 100,
            step: 1,
            unit: 'px',
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'biographyMargintop',
                    'responsive': true,
                    'selector': `.guten-post-author.${elementId} span.author-bio`,
                    'properties': [
                        {
                            'name': 'margin-top',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct',
                                },
                            }
                        },
                    ],
                }
            ]
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
            id: 'biographyColor',
            show: (!switcher.styleHover || switcher.styleHover === 'normal'),
            label: __('Text color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'biographyColor',
                    'selector': `.${elementId} .author-bio`,
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
            id: 'biographyTextShadow',
            show: (!switcher.styleHover || switcher.styleHover === 'normal'),
            label: __('Text Shadow', 'gutenverse'),
            component: TextShadowControl,
            liveStyle: [
                {
                    'type': 'textShadow',
                    'id': 'biographyTextShadow',
                    'properties': [
                        {
                            'name': 'text-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId} .author-bio`,
                }
            ],
        },
        {
            id: 'biographyColorHover',
            show: switcher.styleHover === 'hover',
            label: __('Hover Text color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'biographyColorHover',
                    'selector': `.${elementId}:hover .author-bio`,
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
            id: 'biographyTextShadowHover',
            show: switcher.styleHover === 'hover',
            label: __('Hover Text Shadow', 'gutenverse'),
            component: TextShadowControl,
            liveStyle: [
                {
                    'type': 'textShadow',
                    'id': 'biographyTextShadowHover',
                    'properties': [
                        {
                            'name': 'text-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId}:hover .author-bio`,
                }
            ],
        },
    ];
};