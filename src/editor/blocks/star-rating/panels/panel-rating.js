
import { __ } from '@wordpress/i18n';
import { IconRadioControl, TextControl, RangeControl, SelectControl } from 'gutenverse-core/controls';
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from 'gutenverse-core/components';

export const panelRating = () => {
    return [
        {
            id: 'align',
            label: __('Alignment', 'gutenverse'),
            component: IconRadioControl,
            allowDeviceControl: true,
            options: [
                {
                    label: __('Align Left', 'gutenverse'),
                    value: 'flex-start',
                    icon: <AlignLeft/>,
                },
                {
                    label: __('Align Center', 'gutenverse'),
                    value: 'center',
                    icon: <AlignCenter/>,
                },
                {
                    label: __('Align Right', 'gutenverse'),
                    value: 'flex-end',
                    icon: <AlignRight/>,
                },
                {
                    label: __('Align Justify', 'gutenverse'),
                    value: 'space-between',
                    icon: <AlignJustify/>,
                },
            ],
        },
        {
            id: 'title',
            label: __('Title', 'gutenverse'),
            component: TextControl,
        },
        {
            id: 'starIcon',
            label: __('Star Style', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: 'Default',
                    value: 'default'
                },
                {
                    label: 'Default Fill',
                    value: 'fill'
                },
                {
                    label: 'Sharp',
                    value: 'sharp'
                },
                {
                    label: 'Sharp Fill',
                    value: 'sharp-fill'
                },
                {
                    label: 'Thumbs Up',
                    value: 'thumbs'
                },
                {
                    label: 'Smiley Fill',
                    value: 'smile-2'
                },
            ]
        },
        {
            id: 'rating',
            label: __('Rating', 'gutenverse'),
            component: RangeControl,
            isParseFloat: true,
            liveUpdate: true,
            min: 0,
            max: 10,
            step: 1,
        },
        {
            id: 'total',
            label: __('Total', 'gutenverse'),
            component: RangeControl,
            liveUpdate: true,
            isParseFloat: true,
            min: 0,
            max: 10,
            step: 1,
        },
    ];
};