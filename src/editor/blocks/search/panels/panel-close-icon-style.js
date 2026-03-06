import { __ } from '@wordpress/i18n';
import { ColorControl, DimensionControl, RangeControl, SwitchControl } from 'gutenverse-core/controls';

export const closeIconStylePanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher
    } = props;

    return [
        {
            id: 'closeIconSize',
            label: __('Close Icon Size', 'gutenverse'),
            component: RangeControl,
            min: 10,
            max: 300,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'closeIconSize',
                    'responsive': true,
                    'selector': `.${elementId} .gutenverse-search-form .search-input-container .close-icon`,
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
                    'id': 'closeIconSize',
                    'responsive': true,
                    'selector': `.${elementId} .gutenverse-search-form .search-input-container .close-icon svg`,
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
            id: 'closeIconRotate',
            label: __('Close Icon Rotate', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 360,
            step: 1,
            allowDeviceControl: true,
            unit: 'deg',
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'closeIconRotate',
                    'responsive': true,
                    'selector': `.${elementId} .gutenverse-search-form .search-input-container .close-icon`,
                    'properties': [
                        {
                            'name': 'transform',
                            'valueType': 'pattern',
                            'pattern': 'rotate({value}deg)',
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
            id: 'closeIconPadding',
            label: __('Close Icon Padding', 'gutenverse'),
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
            id: 'closeIconMargin',
            label: __('Close Icon Margin', 'gutenverse'),
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
            id: '__iconHover',
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
            onChange: ({ __iconHover }) => setSwitcher({ ...switcher, iconStyle: __iconHover })
        },
        {
            id: 'closeIconColor',
            show: !switcher.iconStyle || switcher.iconStyle === 'normal',
            label: __('Normal Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'closeIconColor',
                    'responsive': true,
                    'selector': `.${elementId} .gutenverse-search-form .search-input-container .close-icon`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct',
                        }
                    ]
                },
                {
                    'type': 'color',
                    'id': 'closeIconColor',
                    'responsive': true,
                    'selector': `.${elementId} .gutenverse-search-form .search-input-container .close-icon svg`,
                    'properties': [
                        {
                            'name': 'fill',
                            'valueType': 'direct',
                        }
                    ]
                }
            ]
        },
        {
            id: 'closeIconColorHover',
            show: switcher.iconStyle === 'hover',
            label: __('Hover Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'closeIconColorHover',
                    'responsive': true,
                    'selector': `.${elementId} .gutenverse-search-form .search-input-container:hover .close-icon`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct',
                        }
                    ]
                },
                {
                    'type': 'color',
                    'id': 'closeIconColorHover',
                    'responsive': true,
                    'selector': `.${elementId} .gutenverse-search-form .search-input-container:hover .close-icon svg`,
                    'properties': [
                        {
                            'name': 'fill',
                            'valueType': 'direct',
                        }
                    ]
                }
            ]
        }
    ];
};