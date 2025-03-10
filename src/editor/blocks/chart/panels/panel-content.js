import { __ } from '@wordpress/i18n';
import { AlertControl, SelectControl, RangeControl, CheckboxControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const contentPanel = (props) => {
    const {
        elementId,
        enableContent,
        chartType,
        chartContent,
        chartItems,
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
            style: [
                {
                    selector: `.${elementId}, .${elementId}.Mobile-noFlip, .${elementId}.Desktop-noFlip, .${elementId}.Tablet-noFlip`,
                    allowRender: value => value !== 'flipCard',
                    render: value => `flex-direction: ${value};`
                },
            ],
        },
    ];
};