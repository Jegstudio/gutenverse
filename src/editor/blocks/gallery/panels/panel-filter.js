import { __ } from '@wordpress/i18n';
import { CheckboxControl, RepeaterControl, SelectControl, TextControl } from 'gutenverse-core/controls';

export const filterPanel = ({ filter }) => {
    return [
        {
            id: 'filter',
            label: __('Enable Filtering', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'filterType',
            show: filter,
            label: __('Type', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('Filter Tab'),
                    value: 'tab'
                },
                {
                    label: __('Filter & Search'),
                    value: 'search'
                }
            ]
        },
        {
            id: 'filterAll',
            show: filter,
            label: __('Label for "All"', 'gutenverse'),
            component: TextControl
        },
        {
            id: 'filterList',
            show: filter,
            component: RepeaterControl,
            titleFormat: '<strong><%= value.name%></strong>',
            options: [
                {
                    id: 'name',
                    label: __('Filter Name', 'gutenverse'),
                    component: TextControl,
                },
            ],
        },
    ];
};