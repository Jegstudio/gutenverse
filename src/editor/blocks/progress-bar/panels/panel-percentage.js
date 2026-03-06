
import { __ } from '@wordpress/i18n';
import { BorderControl, BoxShadowControl, ColorControl, SizeControl, TextShadowControl, TypographyControl } from 'gutenverse-core/controls';

export const percentPanel = ({ elementId, style }) => {
    return [
        {
            id: 'percentBgColor',
            label: __('Percent Background Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'percentBgColor',
                    'properties': [
                        {
                            'name': 'background-color',
                            'valueType': 'direct',
                        }
                    ],
                    'selector': `.${elementId} .progress-group[class*="tooltip-"] .progress-skill-bar .skill-bar .skill-track .number-percentage-wrapper,
                    .${elementId} .progress-group.ribbon .progress-skill-bar .skill-bar .skill-track .number-percentage-wrapper,
                    .${elementId} .progress-group[class*="tooltip-"]:not(.tooltip-style) .progress-skill-bar .skill-bar .skill-track .number-percentage-wrapper:before`,
                },
                {
                    'type': 'color',
                    'id': 'percentBgColor',
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct',
                        }
                    ],
                    'selector': `.${elementId} .progress-group.tooltip-style .progress-skill-bar .skill-bar .skill-track .number-percentage-wrapper:before`
                },
                {
                    'type': 'color',
                    'id': 'percentBgColor',
                    'properties': [
                        {
                            'name': 'border-right-color',
                            'valueType': 'direct',
                        },
                        {
                            'name': 'border-bottom-color',
                            'valueType': 'direct',
                        },
                    ],
                    'selector': `.${elementId} .progress-group.ribbon .progress-skill-bar .skill-bar .skill-track .number-percentage-wrapper:before`
                }
            ]
        },
        {
            id: 'percentColor',
            label: __('Percent Text Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'percentColor',
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct',
                        }
                    ],
                    'selector': `.${elementId} .progress-group .progress-skill-bar .number-percentage, .${elementId} .progress-group .number-percentage`
                }
            ]
        },
        {
            id: 'percentTypography',
            label: __('Percent Typography', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: 'percentTextShadow',
            label: __('Percent Text Shadow', 'gutenverse'),
            component: TextShadowControl,
            liveStyle: [
                {
                    'type': 'textShadow',
                    'id': 'percentTextShadow',
                    'properties': [
                        {
                            'name': 'text-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId} .progress-group .progress-skill-bar .number-percentage, .${elementId} .progress-group .number-percentage`,
                }
            ]
        },
        {
            id: 'percentSwitchSize',
            show: 'switch' === style,
            label: __('Percent Switch Size', 'gutenverse'),
            component: SizeControl,
            units: {
                px: {
                    text: 'px',
                    min: 0,
                    max: 100,
                    step: 1
                },
            },
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'percentSwitchSize',
                    'properties': [
                        {
                            'name': 'width',
                            'valueType': 'direct'
                        },
                        {
                            'name': 'height',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId} .progress-group.switch .progress-skill-bar .skill-bar .skill-track:before`,
                }
            ]
        },
        {
            id: 'percentSwitchBorder',
            show: 'switch' === style,
            label: __('Percent Switch Border', 'gutenverse'),
            component: BorderControl,
        },
        {
            id: 'percentSwitchBoxShadow',
            label: __('Percent Switch Box Shadow', 'gutenverse'),
            show: 'switch' === style,
            component: BoxShadowControl,
            liveStyle: [
                {
                    'type': 'boxShadow',
                    'id': 'percentSwitchBoxShadow',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId} .progress-group.switch .progress-skill-bar .skill-bar .skill-track:before`,
                }
            ]
        },
    ];
};