import { __ } from '@wordpress/i18n';
import { AlignCenter, AlignLeft, AlignRight } from 'react-feather';
import { TypographyControl, IconRadioControl, RangeControl, ColorControl } from 'gutenverse-core/controls';

export const chartPanel = (props) => {
    const {
        elementId,
        chartType,
        chartContent
    } = props;

    return [
        {
            id: 'chartContentAlign',
            label: __('Chart Alignment', 'gutenverse'),
            allowDeviceControl: true,
            component: IconRadioControl,
            options: [
                {
                    label: __('Align Left', 'gutenverse'),
                    value: 'baseline',
                    icon: <AlignLeft/>,
                },
                {
                    label: __('Align Center', 'gutenverse'),
                    value: 'center',
                    icon: <AlignCenter/>,
                },
                {
                    label: __('Align Right', 'gutenverse'),
                    value: 'end',
                    icon: <AlignRight/>,
                },
            ],
        },
        {
            id: 'chartContainerSize',
            label: __('Chart Container Size', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            isParseFloat: true,
            unit: '%',
            min: 0,
            max: 100,
            step: 1,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'chartContainerSize',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'width',
                            'valueType': 'pattern',
                            'pattern': '{value}% !important',
                            'patternValues': {
                                'value': {
                                    'type': 'direct',
                                    'key': 'chartContainerSize',
                                },

                            }
                        }
                    ],
                    'selector': `.${elementId} .chart-content.content-chart`,
                }
            ],
        },
        {
            id: 'chartSize',
            label: __('Chart Size', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            isParseFloat: true,
            unit: 'px',
            min: 0,
            max: 250,
            step: 1,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'chartSize',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'width',
                            'valueType': 'pattern',
                            'pattern': '{value}px !important',
                            'patternValues': {
                                'value': {
                                    'type': 'direct',
                                    'key': 'chartSize',
                                },
                            }
                        }
                    ],
                    'selector': `.${elementId} .chart-inside.type-doughnut, .${elementId} .chart-container`,
                },
                {
                    'type': 'plain',
                    'id': 'chartSize',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'width',
                            'valueType': 'pattern',
                            'pattern': '{value}px !important; height: {value}px !important',
                            'patternValues': {
                                'value': {
                                    'type': 'direct',
                                    'key': 'chartSize',
                                },
                            }
                        }
                    ],
                    'selector': `.${elementId} canvas`,
                }
            ]
        },
        {
            id: 'cutout',
            label: __('Cutout Percentage', 'gutenverse'),
            component: RangeControl,
            show: 'doughnut' === chartType,
            unit: '%',
            min: 0,
            max: 100,
            step: 1,
            allowDeviceControl:true
        },
        {
            id: 'barThickness',
            label: __('Bar Thickness', 'gutenverse'),
            component: RangeControl,
            show: 'bar' === chartType,
            unit: 'px',
            min: 0,
            max: 250,
            step: 1,
        },
        {
            id: 'cutoutBackground',
            label: __('Bar Background', 'gutenverse'),
            show: 'doughnut' === chartType,
            component: ColorControl,
        },
        {
            id: 'indicatorColor',
            label: __('Indicator Color', 'gutenverse'),
            show: chartContent !== 'none',
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'indicatorColor',
                    'selector': `.${elementId} .chart-content .chart-inside > *`,
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
            id: 'indicatorTypography',
            label: __('Indicator Typography', 'gutenverse'),
            show: chartContent !== 'none',
            component: TypographyControl,
        },
    ];
};