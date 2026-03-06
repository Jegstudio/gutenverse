import { __ } from '@wordpress/i18n';
import { ColorControl, DimensionControl, RangeControl, TypographyControl } from 'gutenverse-core/controls';

export const contentStylePanel = (props) => {
    const {
        elementId
    } = props;

    return [
        {
            id: 'prefixColor',
            label: __('Prefix Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'prefixColor',
                    'responsive': true,
                    'selector': `.${elementId}.guten-fun-fact .fun-fact-inner .content .number-wrapper .prefix`,
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
            id: 'suffixColor',
            label: __('Suffix Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'suffixColor',
                    'responsive': true,
                    'selector': `.${elementId}.guten-fun-fact .fun-fact-inner .content .number-wrapper .suffix`,
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
            id: 'numberColor',
            label: __('Number Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'numberColor',
                    'responsive': true,
                    'selector': `.${elementId}.guten-fun-fact .fun-fact-inner .content .number-wrapper`,
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
            id: 'titleColor',
            label: __('Title Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'titleColor',
                    'responsive': true,
                    'selector': `.${elementId}.guten-fun-fact .fun-fact-inner .content .title`,
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
            id: 'prefixTypography',
            label: __('Prefix Typography', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: 'suffixTypography',
            label: __('Suffix Typography', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: 'numberTypography',
            label: __('Number Typography', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: 'titleTypography',
            label: __('Title Typography', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: 'numberBottomSpace',
            label: __('Number Bottom Space', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            unit: 'px',
            min: 0,
            max: 300,
            step: 1,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'numberBottomSpace',
                    'responsive': true,
                    'selector': `.${elementId}.guten-fun-fact .fun-fact-inner .content .number-wrapper `,
                    'properties': [
                        {
                            'name': 'margin-bottom',
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
            id: 'numberRightSpace',
            label: __('Number Right Space', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            unit: 'px',
            min: 0,
            max: 300,
            step: 1,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'numberRightSpace',
                    'responsive': true,
                    'selector': `.${elementId} .fun-fact-inner .content .number-wrapper .number.loaded`,
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
            id: 'titleBottomSpace',
            label: __('Title Bottom Space', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            unit: 'px',
            min: 0,
            max: 300,
            step: 1,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'titleBottomSpace',
                    'responsive': true,
                    'selector': `.${elementId}.guten-fun-fact .fun-fact-inner .content .title `,
                    'properties': [
                        {
                            'name': 'margin-bottom',
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
            id: 'contentPadding',
            label: __('Content Padding', 'gutenverse'),
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
    ];
};