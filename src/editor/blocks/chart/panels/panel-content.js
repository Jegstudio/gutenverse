import { __ } from '@wordpress/i18n';
import { SelectControl, RangeControl, CheckboxControl, AlertControl, SizeControl, IconSVGControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const contentPanel = (props) => {
    const {
        elementId,
        enableContent,
        chartType,
        chartContent,
        chartItems
    } = props;

    let multiValue = false;
    if (chartItems.length > 1) {
        multiValue = true;
    } else {
        multiValue = false;
    }

    const deviceType = getDeviceType();

    return [
        {
            id: 'activate-notice',
            component: AlertControl,
            show: multiValue && 'percentage' === chartContent,
            children: <>
                <span>{__('The Chart has more than 1 item, Max Value will be used instead of 100 for the percentage.', 'gutenverse')}</span>
            </>
        },
        {
            id: 'chartContent',
            label: __('Indicator Content', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('None'),
                    value: 'none'
                },
                {
                    label: __('Percentage'),
                    value: 'percentage'
                },
                {
                    label: __('Icon'),
                    value: 'icon'
                },
                {
                    label: __('Number'),
                    value: 'number'
                },
            ],
        },
        {
            id: 'icon',
            label: __('Icon', 'gutenverse'),
            component: IconSVGControl,
            show: chartContent === 'icon',
        },
        {
            id: 'indicatorIconSize',
            label: __('Icon Size', 'gutenverse'),
            component: SizeControl,
            allowDeviceControl: true,
            show: 'icon' === chartContent,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 100,
                    step: 1
                },
                em: {
                    text: 'em',
                    min: 0.1,
                    max: 3,
                    step: 0.1
                },
            },
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'indicatorIconSize',
                    'responsive': true,
                    'selector': `.editor-styles-wrapper .${elementId} .chart-content .chart-inside > i`,
                    'properties': [
                        {
                            'name': 'font-size',
                            'valueType': 'direct'
                        }
                    ]
                },
                {
                    'type': 'unitPoint',
                    'id': 'indicatorIconSize',
                    'responsive': true,
                    'selector': `.editor-styles-wrapper .${elementId} .chart-content .chart-inside svg`,
                    'properties': [
                        {
                            'name': 'font-size',
                            'valueType': 'direct'
                        }
                    ]
                },
            ],
        },
        {
            id: 'minValue',
            label: __('Min Value', 'gutenverse'),
            show: 'bar' === chartType && 'number' === chartContent,
            component: RangeControl,
            min: 0,
            max: 5000,
            step: 10,
        },
        {
            id: 'totalValue',
            label: __('Max Value', 'gutenverse'),
            description: __('If Chart has more than 1 item or Chart Content is Number, Max Value will be used', 'gutenverse'),
            component: RangeControl,
            min: 0,
            max: 5000,
            step: 10,
        },
        {
            id: 'animationDuration',
            label: __('Animation Duration', 'gutenverse'),
            component: RangeControl,
            min: 0,
            max: 10000,
            step: 10,
        },
        {
            id: 'enableContent',
            label: __('Enable Content', 'gutenverse'),
            component: CheckboxControl,
            allowDeviceControl: true,
            usePreviousDeviceValue: true,
            usePreviousDevice: true,
            deviceValues: enableContent,
        },
        {
            id: 'titleTag',
            show: enableContent && enableContent[deviceType],
            label: __('Title Tag', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('H1'),
                    value: 'h1'
                },
                {
                    label: __('H2'),
                    value: 'h2'
                },
                {
                    label: __('H3'),
                    value: 'h3'
                },
                {
                    label: __('H4'),
                    value: 'h4'
                },
                {
                    label: __('H5'),
                    value: 'h5'
                },
                {
                    label: __('H6'),
                    value: 'h6'
                },
                {
                    label: __('SPAN'),
                    value: 'span'
                },
            ],
        },
        {
            id: 'contentType',
            show: enableContent && enableContent[deviceType],
            label: __('Content Type', 'gutenverse'),
            component: SelectControl,
            allowDeviceControl: true,
            options: [
                {
                    label: __('Static'),
                    value: 'column-reverse'
                },
                {
                    label: __('Flip card'),
                    value: 'flipCard'
                },
                {
                    label: __('Float Left'),
                    value: 'row'
                },
                {
                    label: __('Float Right'),
                    value: 'row-reverse'
                },
            ],
        },
        {
            id: 'contentOrder',
            show: enableContent && enableContent[deviceType],
            label: __('Content Order', 'gutenverse'),
            component: SelectControl,
            allowDeviceControl: false,
            options: [
                {
                    label: __('Title - Number - Description'),
                    value: '1,2,3'
                },
                {
                    label: __('Title - Description - Number'),
                    value: '1,3,2'
                },
                {
                    label: __('Number - Title - Description'),
                    value: '2,1,3'
                },
                {
                    label: __('Number - Description - Title'),
                    value: '3,1,2'
                },
                {
                    label: __('Description - Title - Number'),
                    value: '2,3,1'
                },
                {
                    label: __('Description - Number - Title'),
                    value: '3,2,1'
                },
            ],
        },
    ];
};