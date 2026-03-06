import { __ } from '@wordpress/i18n';
import { ColorControl, GradientWithAngleControl, SelectControl, SwitchControl, TextShadowControl, TextStrokeControl, TypographyControl } from 'gutenverse-core/controls';

export const styleTextAnimatedPanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher,
        animatedColorType,
    } = props;

    return [
        {
            id: 'textAnimatedTypography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: 'animatedColorType',
            label: __('Color Type'),
            component: SelectControl,
            options: [
                {
                    label: __('Color', 'gutenverse'),
                    value: 'color',
                },
                {
                    label: __('Gradient', 'gutenverse'),
                    value: 'gradient',
                },
            ]
        },
        {
            id: '__colorHover',
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
            onChange: ({ __colorHover }) => setSwitcher({ ...switcher, color: __colorHover })
        },
        // Color
        {
            id: 'textAnimatedColor',
            show: (!switcher.color || switcher.color === 'normal') && animatedColorType === 'color',
            label: __('Text color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'textAnimatedColor',
                    'selector': `.editor-styles-wrapper .${elementId} .text-content .text-wrapper`,
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
            id: 'textAnimatedColorHover',
            show: (switcher.color === 'hover') && animatedColorType === 'color',
            label: __('Text color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'textAnimatedColorHover',
                    'selector': `.editor-styles-wrapper .${elementId}:hover .text-content .text-wrapper`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ],
                }
            ]
        },
        // Gradient
        {
            id: 'textAnimatedGradient',
            show: (!switcher.color || switcher.color === 'normal') && animatedColorType === 'gradient',
            label: __('Text Gradient', 'gutenverse'),
            component: GradientWithAngleControl,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'textAnimatedGradient',
                    'selector': `.editor-styles-wrapper .${elementId} .text-content .text-wrapper .letter`,
                    'properties': [
                        {
                            'name': 'background',
                            'valueType': 'function',
                            'functionName': 'customHandleBackground',
                        },
                        {
                            'name': 'background-clip',
                            'valueType': 'pattern',
                            'pattern': 'text',
                        },
                        {
                            'name': '-webkit-text-fill-color',
                            'valueType': 'pattern',
                            'pattern': 'transparent',
                        }
                    ],
                }
            ]
        },
        {
            id: 'textAnimatedGradientHover',
            show: (switcher.color === 'hover') && animatedColorType === 'gradient',
            label: __('Text Gradient', 'gutenverse'),
            component: GradientWithAngleControl,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'textAnimatedGradientHover',
                    'selector': `.editor-styles-wrapper .${elementId}:hover .text-content .text-wrapper .letter`,
                    'properties': [
                        {
                            'name': 'background',
                            'valueType': 'function',
                            'functionName': 'customHandleBackground',
                        },
                        {
                            'name': 'background-clip',
                            'valueType': 'pattern',
                            'pattern': 'text',
                        },
                        {
                            'name': '-webkit-text-fill-color',
                            'valueType': 'pattern',
                            'pattern': 'transparent',
                        }
                    ],
                }
            ]
        },
        // End gradient
        {
            id: 'textAnimatedShadow',
            label: __('Text Shadow', 'gutenverse'),
            component: TextShadowControl,
            liveStyle: [
                {
                    'type': 'textShadow',
                    'id': 'textAnimatedShadow',
                    'properties': [
                        {
                            'name': 'text-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.editor-styles-wrapper .${elementId} .text-content .text-wrapper`,
                }
            ]
        },
        {
            id: 'textAnimatedStroke',
            label: __('Text Stroke', 'gutenverse'),
            component: TextStrokeControl,
            liveStyle: [
                {
                    'type': 'textStroke',
                    'id': 'textAnimatedStroke',
                    'selector': `.editor-styles-wrapper .${elementId} .text-content .text-wrapper`,
                }
            ]
        }
    ];
};

