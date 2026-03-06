import { __ } from '@wordpress/i18n';
import { BorderControl, BorderResponsiveControl, BoxShadowControl, IconRadioControl, RangeControl, SizeControl } from 'gutenverse-core/controls';
import { AlignCenter, AlignLeft, AlignRight } from 'react-feather';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const stylePanel = (props) => {
    const {
        elementId
    } = props;

    const device = getDeviceType();

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
            ],
        },
        {
            id: 'size',
            label: __('Size', 'gutenverse'),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 1000,
                    step: 1
                },
                em: {
                    text: 'em',
                    min: 1,
                    max: 100,
                    step: 0.1
                },
                ['%']: {
                    text: '%',
                    min: 1,
                    max: 100,
                    step: 1
                },
            },
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'size',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'max-width',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId} img`,
                }
            ],
        },
        {
            id: 'opacity',
            label: __('Opacity', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            min: 1,
            max: 100,
            step: 1,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'opacity',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'opacity',
                            'valueType': 'pattern',
                            'pattern': 'calc({value}/100)',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ],
                    'selector': `.${elementId} img`,
                }
            ],
        },
        {
            id: 'rotate',
            label: __('Rotate', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            unit: 'deg',
            min: 0,
            max: 360,
            step: 1,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'rotate',
                    'responsive': true,
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
                    ],
                    'selector': `.${elementId} img`,
                }
            ],
        },
        {
            id: 'imageBorder',
            show: device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'imageBorder',
                    'selector': `.${elementId} img`,
                }
            ],
        },
        {
            id: 'imageBorderResponsive',
            show: device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'imageBorderResponsive',
                    'selector': `.${elementId} img`,
                }
            ],
        },
        {
            id: 'imageBoxShadow',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            liveStyle: [
                {
                    'type': 'boxShadow',
                    'id': 'imageBoxShadow',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId} img`,
                }
            ],
        },
    ];
};

