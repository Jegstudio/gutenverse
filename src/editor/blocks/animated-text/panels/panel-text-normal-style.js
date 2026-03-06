import { __ } from '@wordpress/i18n';
import { ColorControl, GradientWithAngleControl, SelectControl, SwitchControl, TextShadowControl, TextStrokeControl, TypographyControl } from 'gutenverse-core/controls';

export const styleTextNormalPanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher,
        normalColorType,
    } = props;

    return [
        {
            id: 'textNormalTypography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: 'normalColorType',
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
            id: 'textNormalColor',
            show: (!switcher.color || switcher.color === 'normal') && normalColorType === 'color',
            label: __('Text color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'textNormalColor',
                    'selector': `.editor-styles-wrapper .${elementId} .non-animated-text`,
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
            id: 'textNormalColorHover',
            show: (switcher.color === 'hover') && normalColorType === 'color',
            label: __('Text color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'textNormalColorHover',
                    'selector': `.editor-styles-wrapper .${elementId}:hover .non-animated-text`,
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
            id: 'textNormalGradient',
            show: (!switcher.color || switcher.color === 'normal') && normalColorType === 'gradient',
            label: __('Text Gradient', 'gutenverse'),
            component: GradientWithAngleControl,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'textNormalGradient',
                    'selector': `.editor-styles-wrapper .${elementId} .non-animated-text`,
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
            id: 'textNormalGradientHover',
            show: (switcher.color === 'hover') && normalColorType === 'gradient',
            label: __('Text Gradient', 'gutenverse'),
            component: GradientWithAngleControl,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'textNormalGradientHover',
                    'selector': `.editor-styles-wrapper .${elementId}:hover .non-animated-text`,
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
            id: 'textNormalShadow',
            label: __('Text Shadow', 'gutenverse'),
            component: TextShadowControl,
            liveStyle: [
                {
                    'type': 'textShadow',
                    'id': 'textNormalShadow',
                    'properties': [
                        {
                            'name': 'text-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.editor-styles-wrapper .${elementId} .non-animated-text`,
                }
            ]
        },
        {
            id: 'textNormalStroke',
            label: __('Text Stroke', 'gutenverse'),
            component: TextStrokeControl,
            liveStyle: [
                {
                    'type': 'textStroke',
                    'id': 'textNormalStroke',
                    'selector': `.editor-styles-wrapper .${elementId} .non-animated-text`,
                }
            ]
        }
    ];
};

