import { __ } from '@wordpress/i18n';
import { IconSVGControl, RangeControl, SelectControl, TextControl } from 'gutenverse-core/controls';

export const progressPanel = (props) => {
    const { style } = props;

    return [
        {
            id: 'style',
            label: __('Style', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: 'Default',
                    value: 'default'
                },
                {
                    label: 'Inner Content',
                    value: 'inner-content'
                },
                {
                    label: 'Bar Shadow',
                    value: 'bar-shadow'
                },
                {
                    label: 'Tooltip',
                    value: 'tooltip-style'
                },
                {
                    label: 'Tooltip Box',
                    value: 'tooltip-box'
                },
                {
                    label: 'Tooltip Rounded',
                    value: 'tooltip-rounded'
                },
                {
                    label: 'Tooltip Circle',
                    value: 'tooltip-circle'
                },
                {
                    label: 'Switch',
                    value: 'switch'
                },
                {
                    label: 'Ribbon',
                    value: 'ribbon'
                },
            ]
        },
        {
            id: 'title',
            label: __('Title', 'gutenverse'),
            component: TextControl,
        },
        {
            id: 'arrowIcon',
            label: __('Progress Icon', 'gutenverse'),
            component: IconSVGControl,
            show: style === 'inner-content'
        },
        {
            id: 'percentage',
            label: __('Percentage', 'gutenverse'),
            component: RangeControl,
            min: 0,
            max: 100,
            step: 1,
            isParseFloat: true,
            unit: '%',
        },
        {
            id: 'duration',
            label: __('Duration', 'gutenverse'),
            component: RangeControl,
            min: 100,
            max: 10000,
            step: 1,
            isParseFloat: true,
            unit: 'ms',
        },
    ];
};

