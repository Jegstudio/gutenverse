import { __ } from '@wordpress/i18n';
import { CheckboxControl, NumberControl, SelectControl, TextControl } from 'gutenverse-core/controls';

export const contentPanel = ({showSupper}) => {
    return [
        {
            id: 'prefix',
            label: __('Number Prefix', 'gutenverse'),
            component: TextControl,
        },
        {
            id: 'safeNumber',
            label: __('Number Value', 'gutenverse'),
            component: TextControl,
        },
        {
            id: 'suffix',
            label: __('Number Suffix', 'gutenverse'),
            component: TextControl,
        },
        {
            id: 'numberFormat',
            description: __('Number format makes numbers easier to read, like changing 1000 to 1,000.', 'gutenverse'),
            label: __('Number Format', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    value: '',
                    label: 'None'
                },
                {
                    value: 'comma',
                    label: 'Comma'
                },
                {
                    value: 'point',
                    label: 'Point'
                },
            ]
        },
        {
            id: 'duration',
            label: __('Animation Duration (ms)', 'gutenverse'),
            component: NumberControl,
        },
        {
            id: 'title',
            label: __('Title', 'gutenverse'),
            component: TextControl,
        },
        {
            id: 'showSupper',
            label: __('Enable Supper', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'supper',
            show: showSupper,
            label: __('Supper', 'gutenverse'),
            component: TextControl,
        },
    ];
};