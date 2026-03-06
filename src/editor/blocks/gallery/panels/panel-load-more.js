import { __ } from '@wordpress/i18n';

import { AlignCenter, AlignLeft, AlignRight } from 'gutenverse-core/components';
import { CheckboxControl, IconSVGControl, IconRadioControl, RangeControl, SelectControl, TextControl } from 'gutenverse-core/controls';

export const loadMorePanel = (props) => {
    const {
        enableLoadMore
    } = props;

    return [
        {
            id: 'enableLoadMore',
            label: __('Enable Load More', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'itemsPerLoad',
            show: enableLoadMore,
            label: __('Items Per Load', 'gutenverse'),
            component: RangeControl,
            isParseFloat : true,
            min: 1,
            max: 50,
            step: 1,
        },
        {
            id: 'enableLoadText',
            show: enableLoadMore,
            label: __('Button Text', 'gutenverse'),
            component: TextControl,
        },
        {
            id: 'enableLoadIcon',
            show: enableLoadMore,
            label: __('Button Icon', 'gutenverse'),
            component: IconSVGControl,
        },
        {
            id: 'enableLoadIconPosition',
            show: enableLoadMore,
            label: __('Icon Position', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('Before'),
                    value: 'before'
                },
                {
                    label: __('After'),
                    value: 'after'
                },
            ]
        },
        {
            id: 'enableLoadAlign',
            show: enableLoadMore,
            label: __('Alignment', 'gutenverse'),
            component: IconRadioControl,
            allowDeviceControl: true,
            options: [
                {
                    label: __('Align Left', 'gutenverse'),
                    value: 'left',
                    icon: <AlignLeft/>,
                },
                {
                    label: __('Align Center', 'gutenverse'),
                    value: 'center',
                    icon: <AlignCenter/>,
                },
                {
                    label: __('Align Right', 'gutenverse'),
                    value: 'right',
                    icon: <AlignRight/>,
                },
            ],
        },
    ];
};