import { __ } from '@wordpress/i18n';
import { ColorControl, DimensionControl, RangeControl, SwitchControl, TypographyControl } from 'gutenverse-core/controls';

export const panelTitleStyle = props => {
    const {
        elementId,
        switcher,
        setSwitcher,
    } = props;

    return [
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
            id: 'titleTypography',
            label: __('Title Typography', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: 'titleIconSize',
            label: __('Icon Font Size', 'gutenverse'),
            component: RangeControl,
            min: 0,
            max: 200,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'titleIconSize',
                    'responsive': true,
                    'selector': `.${elementId}.gutenverse-image-box .inner-container .image-box-body .body-title i`,
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
                    'id': 'titleIconSize',
                    'responsive': true,
                    'selector': `.${elementId}.gutenverse-image-box .inner-container .image-box-body .body-title svg`,
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
            id: 'titleIconSpacing',
            label: __('Icon Spacing', 'gutenverse'),
            component: RangeControl,
            min: 0,
            max: 200,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'titleIconSpacing',
                    'responsive': true,
                    'selector': `.${elementId}.gutenverse-image-box .inner-container .image-box-body .body-title.icon-position-before i, .${elementId}.gutenverse-image-box .inner-container .image-box-body .body-title.icon-position-before .gutenverse-icon-svg`,
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
                    'id': 'titleIconSpacing',
                    'responsive': true,
                    'selector': `.${elementId}.gutenverse-image-box .inner-container .image-box-body .body-title.icon-position-after i, .${elementId}.gutenverse-image-box .inner-container .image-box-body .body-title.icon-position-after .gutenverse-icon-svg`,
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
            id: '__titleHover',
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
            onChange: ({ __titleHover }) => setSwitcher({ ...switcher, titleHover: __titleHover })
        },
        {
            id: 'titleNormalColor',
            show: !switcher.titleHover || switcher.titleHover === 'normal',
            label: __('Title Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'titleNormalColor',
                    'selector': `.${elementId}.gutenverse-image-box .inner-container .image-box-body .body-title, .${elementId}.gutenverse-image-box .image-box-body .body-title a`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'titleNormalIconColor',
            show: !switcher.titleHover || switcher.titleHover === 'normal',
            label: __('Icon Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'titleNormalIconColor',
                    'selector': `.${elementId}.gutenverse-image-box .inner-container .image-box-body .body-title i`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                },
                {
                    'type': 'color',
                    'id': 'titleNormalIconColor',
                    'selector': `.${elementId}.gutenverse-image-box .inner-container .image-box-body .body-title svg`,
                    'properties': [
                        {
                            'name': 'fill',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'titleHoverColor',
            show: switcher.titleHover === 'hover',
            label: __('Title Hover Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'titleHoverColor',
                    'selector': `.${elementId}.gutenverse-image-box:hover .inner-container .image-box-body .body-title, .${elementId}.gutenverse-image-box:hover .image-box-body .body-title a`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'titleHoverIconColor',
            show: switcher.titleHover === 'hover',
            label: __('Icon Hover Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'titleHoverIconColor',
                    'selector': `.${elementId}.gutenverse-image-box:hover .inner-container .image-box-body .body-title i`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                },
                {
                    'type': 'color',
                    'id': 'titleHoverIconColor',
                    'selector': `.${elementId}.gutenverse-image-box:hover .inner-container .image-box-body .body-title svg`,
                    'properties': [
                        {
                            'name': 'fill',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
    ];
};