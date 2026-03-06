
import { __ } from '@wordpress/i18n';
import { AlignLeft, AlignRight, AlignCenter } from 'gutenverse-core/components';
import { DimensionControl, IconSVGControl, IconRadioControl, RangeControl, SelectControl, SizeControl, TextControl } from 'gutenverse-core/controls';
import { handleDimension, handleUnitPoint } from 'gutenverse-core/styling';

export const iconPanel = ({ elementId, iconView, iconBorderWidth, iconBorderRadius, iconShape, removeStyle }) => {
    return [
        {
            id: 'icon',
            label: __('Icon', 'gutenverse'),
            component: IconSVGControl,
        },
        {
            id: 'iconAlign',
            label: __('Icon Alignment', 'gutenverse'),
            component: IconRadioControl,
            allowDeviceControl: true,
            options: [
                {
                    label: __('Align Left', 'gutenverse'),
                    value: 'left',
                    icon: <AlignLeft />,
                },
                {
                    label: __('Align Center', 'gutenverse'),
                    value: 'center',
                    icon: <AlignCenter />,
                },
                {
                    label: __('Align Right', 'gutenverse'),
                    value: 'right',
                    icon: <AlignRight />,
                }
            ],
        },
        {
            id: 'iconSize',
            label: __('Size', 'gutenverse'),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 10,
                    max: 100,
                    step: 1
                },
                em: {
                    text: 'em',
                    min: 0.6,
                    max: 6,
                    step: 0.1
                },
            },
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'iconSize',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'font-size',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId} i`,
                },
                {
                    'type': 'unitPoint',
                    'id': 'iconSize',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'font-size',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId} .guten-icon-wrapper .gutenverse-icon-svg svg`,
                }
            ]
        },
        {
            id: 'iconPadding',
            label: __('Padding', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            unit: 'px',
            min: 0,
            max: 100,
            step: 1,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'iconPadding',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'padding',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ],
                    'selector': `.${elementId} .guten-icon-wrapper`,
                }
            ],
        },
        {
            id: 'iconRotate',
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
                    'id': 'iconRotate',
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
                    'selector': `.${elementId} .guten-icon-wrapper i, .${elementId} .guten-icon-wrapper svg`,
                }
            ],
        },
        {
            id: 'iconView',
            label: __('Icon View', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: 'Framed',
                    value: 'framed'
                },
                {
                    label: 'Stacked',
                    value: 'stacked'
                }
            ]
        },
        {
            id: 'iconShape',
            label: __('Icon Shape', 'gutenverse'),
            component: SelectControl,
            onChange: ({ iconShape }) => {
                if ('custom' !== iconShape) {
                    removeStyle('iconBorderWidth-style-0');
                    removeStyle('iconBorderRadius-style-0');
                }
            },
            options: [
                {
                    label: 'Square',
                    value: 'square'
                },
                {
                    label: 'Rounded',
                    value: 'rounded'
                },
                {
                    label: 'Circle',
                    value: 'circle'
                },
                {
                    label: 'Custom',
                    value: 'custom'
                },
            ],
        },
        {
            id: 'iconBorderWidth',
            label: __('Border Width', 'gutenverse'),
            component: DimensionControl,
            show: iconShape === 'custom' && iconView === 'framed',
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                ['%']: {
                    text: '%',
                    unit: '%'
                },
            },
        },
        {
            id: 'iconBorderRadius',
            label: __('Border Radius', 'gutenverse'),
            component: DimensionControl,
            show: iconShape === 'custom',
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                ['%']: {
                    text: '%',
                    unit: '%'
                },
            },
        },
        {
            id: 'ariaLabel',
            label: __('Aria Label', 'gutenverse'),
            component: TextControl
        }
    ];
};