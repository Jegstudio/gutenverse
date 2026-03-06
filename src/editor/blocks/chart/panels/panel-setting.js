import { __ } from '@wordpress/i18n';
import { SelectControl, CheckboxControl } from 'gutenverse-core/controls';

export const settingPanel = (props) => {
    const {
        chartType,
    } = props;

    return [
        {
            id: 'chartType',
            label: __('Chart type', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('Pie'),
                    value: 'doughnut'
                },
                {
                    label: __('Bar'),
                    value: 'bar'
                },
                // {
                //     label: __('Line'),
                //     value: 'line'
                // },
            ],
        },
        {
            id: 'legendDisplay',
            show: 'doughnut' !== chartType,
            label: __('Show Legend', 'gutenverse'),
            component: CheckboxControl
        },
        {
            id: 'tooltipDisplay',
            label: __('Show tooltip', 'gutenverse'),
            component: CheckboxControl
        },
    ];
};