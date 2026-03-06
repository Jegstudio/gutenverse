import { __ } from '@wordpress/i18n';
import { ColorControl, DimensionControl, RangeControl, SelectControl, SizeControl } from 'gutenverse-core/controls';
import { isNotEmpty } from 'gutenverse-core/helper';

export const linePanel = (props) => {
    const {
        elementId,
        showLine
    } = props;
    return [
        {
            id: 'showLine',
            label: __('Show Line', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('None'),
                    value: 'none'
                },
                {
                    label: __('Top'),
                    value: 'top'
                },
                {
                    label: __('Bottom'),
                    value: 'bottom'
                },
                {
                    label: __('Left of Title'),
                    value: 'before'
                },
                {
                    label: __('Right of Title'),
                    value: 'after'
                },
                {
                    label: __('Between Title and Subtitle'),
                    value: 'between'
                },
            ]
        },

        {
            id: 'lineColor',
            label: __('Line Color', 'gutenverse'),
            show: showLine && showLine !== 'none',
            component: ColorControl,
            liveStyle: [
                {
                    'id': 'lineColor',
                    'type': 'color',
                    'selector': `.editor-styles-wrapper .${elementId}.guten-advanced-heading .heading-line`,
                    'properties': [
                        {
                            'name': 'border-color',
                            'valueType': 'direct'
                        }
                    ],
                }
            ]
        },
        {
            id: 'lineWidth',
            label: __('Line Width', 'gutenverse'),
            show: showLine && showLine !== 'none',
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 10,
                    max: 100,
                    step: 1
                },
                ['%']: {
                    text: '%',
                    min: 0,
                    max: 100,
                    step: 0.1
                },
            },
            liveStyle: [
                isNotEmpty(showLine) && showLine !== 'none' && {
                    'id': 'lineWidth',
                    'type': 'unitPoint',
                    'responsive': true,
                    'selector': `.editor-styles-wrapper .${elementId}.guten-advanced-heading .heading-line`,
                    'properties': [
                        {
                            'name': 'width',
                            'valueType': 'direct',
                        }
                    ]
                }
            ]
        },
        {
            id: 'lineHeight',
            label: __('Line Height', 'gutenverse'),
            show: showLine && showLine !== 'none',
            component: RangeControl,
            allowDeviceControl: true,
            unit: 'px',
            min: 0,
            max: 50,
            step: 1,
            liveStyle: [
                isNotEmpty(showLine) && showLine !== 'none' && {
                    'id': 'lineWidth',
                    'type': 'plain',
                    'properties': [
                        {
                            'name': 'border-top-width',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct',
                                }
                            }
                        }
                    ],
                    'selector': `.editor-styles-wrapper .${elementId}.guten-advanced-heading .heading-line`,
                    'responsive': true,
                }
            ]
        },
        {
            id: 'lineStyle',
            label: __('Line Style', 'gutenverse'),
            show: showLine && showLine !== 'none',
            component: SelectControl,
            options: [
                {
                    label: __('Default/Solid'),
                    value: 'solid'
                },
                {
                    label: __('Dotted'),
                    value: 'dotted'
                },
                {
                    label: __('Dashed'),
                    value: 'dashed'
                },
                {
                    label: __('Double'),
                    value: 'double'
                },
            ],
        },
        {
            id: 'lineMargin',
            label: __('Margin', 'gutenverse'),
            show: showLine && showLine !== 'none',
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
    ];
};