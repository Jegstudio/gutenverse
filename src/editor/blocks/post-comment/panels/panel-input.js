import { __ } from '@wordpress/i18n';
import { allowRenderBoxShadow, handleBorder, handleBorderResponsive, handleBoxShadow, handleColor, handleDimension, handleTypography } from 'gutenverse-core/styling';
import { BorderControl, BorderResponsiveControl, BoxShadowControl, ColorControl, DimensionControl, SwitchControl, TypographyControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const inputPanel = (props) => {
    const {
        elementId,
        setSwitcher,
        switcher
    } = props;

    const device = getDeviceType();

    return [
        {
            id: 'inputTypography',
            label: __('Input Typography', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: 'inputMargin',
            label: __('Input Margin', 'gutenverse'),
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
                rem: {
                    text: 'rem',
                    unit: 'rem'
                },
            },
        },
        {
            id: 'inputPadding',
            label: __('Input Padding', 'gutenverse'),
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
                rem: {
                    text: 'rem',
                    unit: 'rem'
                },
            },
        },
        {
            id: '__itemState',
            component: SwitchControl,
            options: [
                {
                    value: 'normal',
                    label: 'Normal'
                },
                {
                    value: 'hover',
                    label: 'Hover'
                },
                {
                    value: 'focus',
                    label: 'Focus'
                }
            ],
            onChange: ({ __itemState }) => setSwitcher({ ...switcher, inputState: __itemState })
        },
        {
            id: 'inputBorder',
            show: device === 'Desktop' && (!switcher.inputState || switcher.inputState === 'normal'),
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'inputBorder',
                    'selector': `.${elementId} .comment-form input:not([type=submit]), .${elementId} .comment-form textarea`,
                }
            ]
        },
        {
            id: 'inputBorderResponsive',
            show: device !== 'Desktop' && (!switcher.inputState || switcher.inputState === 'normal'),
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'inputBorderResponsive',
                    'selector': `.${elementId} .comment-form input:not([type=submit]), .${elementId} .comment-form textarea`,
                }
            ]
        },
        {
            id: 'inputBorderHover',
            show: device === 'Desktop' && switcher.inputState === 'hover',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'inputBorderHover',
                    'selector': `.${elementId} .comment-form input:not([type=submit]):hover, .${elementId} .comment-form textarea:hover`,
                }
            ]
        },
        {
            id: 'inputBorderHoverResponsive',
            show: device !== 'Desktop' && switcher.inputState === 'hover',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'inputBorderHoverResponsive',
                    'selector': `.${elementId} .comment-form input:not([type=submit]):hover, .${elementId} .comment-form textarea:hover`,
                }
            ]
        },
        {
            id: 'inputBorderFocus',
            show: device === 'Desktop' && switcher.inputState === 'focus',
            label: __('Border Focus', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'inputBorderFocus',
                    'selector': `.${elementId} .comment-form input:not([type=submit]):focus, .${elementId} .comment-form textarea:focus`,
                }
            ]
        },
        {
            id: 'inputBorderFocusResponsive',
            show: device !== 'Desktop' && switcher.inputState === 'focus',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'inputBorderFocusResponsive',
                    'selector': `.${elementId} .comment-form input:not([type=submit]):focus, .${elementId} .comment-form textarea:focus`,
                }
            ]
        },
        {
            id: 'inputColorNormal',
            show: !switcher.inputState || switcher.inputState === 'normal',
            label: __('Input Color Normal', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            liveStyle: {
                'type': 'color',
                'id': 'inputColorNormal',
                'responsive': true,
                'selector':`.${elementId} .comment-form input:not([type=submit]), .${elementId} .comment-form textarea`,
                'properties': [
                    {
                        'name': 'color',
                        'valueType': 'direct'
                    }
                ]
            }
        },
        {
            id: 'inputBgColorNormal',
            show: !switcher.inputState || switcher.inputState === 'normal',
            label: __('Input Background Color Normal', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            liveStyle: {
                'type': 'color',
                'id': 'inputBgColorNormal',
                'responsive': true,
                'selector':`.${elementId} .comment-form input:not([type=submit]), .${elementId} .comment-form textarea`,
                'properties': [
                    {
                        'name': 'background-color',
                        'valueType': 'direct'
                    }
                ]
            }
        },
        {
            id: 'inputColorHover',
            show: switcher.inputState === 'hover',
            label: __('Input Color Hover', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            liveStyle: {
                'type': 'color',
                'id': 'inputColorHover',
                'responsive': true,
                'selector': `.${elementId} .comment-form input:not([type=submit]):hover, .${elementId} .comment-form textarea:hover`,
                'properties': [
                    {
                        'name': 'color',
                        'valueType': 'direct'
                    }
                ]
            }
        },
        {
            id: 'inputBgColorHover',
            show: switcher.inputState === 'hover',
            label: __('Input Background Color Hover', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            liveStyle: {
                'type': 'color',
                'id': 'inputBgColorHover',
                'responsive': true,
                'selector': `.${elementId} .comment-form input:not([type=submit]):hover, .${elementId} .comment-form textarea:hover`,
                'properties': [
                    {
                        'name': 'background-color',
                        'valueType': 'direct'
                    }
                ]
            }
        },
        {
            id: 'inputColorFocus',
            show: switcher.inputState === 'focus',
            label: __('Input Color Focus', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            liveStyle: {
                'type': 'color',
                'id': 'inputColorFocus',
                'responsive': true,
                'selector': `.${elementId} .comment-form input:not([type=submit]):focus, .${elementId} .comment-form textarea:focus, .${elementId} .comment-form input:not([type=submit]):focus-visible, .${elementId} .comment-form textarea:focus-visible`,
                'properties': [
                    {
                        'name': 'color',
                        'valueType': 'direct'
                    }
                ]
            }
        },
        {
            id: 'inputBgColorFocus',
            show: switcher.inputState === 'focus',
            label: __('Input Background Color Focus', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            liveStyle: {
                'type': 'color',
                'id': 'inputBgColorFocus',
                'responsive': true,
                'selector': `.${elementId} .comment-form input:not([type=submit]):focus, .${elementId} .comment-form textarea:focus, .${elementId} .comment-form input:not([type=submit]):focus-visible, .${elementId} .comment-form textarea:focus-visible`,
                'properties': [
                    {
                        'name': 'background-color',
                        'valueType': 'direct'
                    }
                ]
            }
        },
        {
            id: '__inputAreaHover',
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
            onChange: ({ __inputAreaHover }) => setSwitcher({ ...switcher, inputAreaHover: __inputAreaHover })
        },
        {
            id: 'inputAreaBoxShadow',
            show: !switcher.inputAreaHover || switcher.inputAreaHover === 'normal',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            liveStyle: {
                'type': 'boxShadow',
                'id': 'inputAreaBoxShadow',
                'properties': [
                    {
                        'name': 'box-shadow',
                        'valueType': 'direct'
                    }
                ],
                'selector': `.${elementId} .comment-form input:not([type=submit],[type=checkbox]), .${elementId} .comment-form textarea`,
            }
        },
        {
            id: 'inputAreaBoxShadowHover',
            show: switcher.inputAreaHover === 'hover',
            label: __('Hover Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            liveStyle: {
                'type': 'boxShadow',
                'id': 'inputAreaBoxShadowHover',
                'properties': [
                    {
                        'name': 'box-shadow',
                        'valueType': 'direct'
                    }
                ],
                'selector': `.${elementId} .comment-form input:not([type=submit],[type=checkbox]):hover, .${elementId} .comment-form textarea:hover`,
            }
        }
    ];
};

