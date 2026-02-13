import { __ } from '@wordpress/i18n';
import { ImageControl, RangeControl, RepeaterControl, SelectControl, TextareaControl, TextControl } from 'gutenverse-core/controls';

export const itemPanel = () => {
    return [
        {
            id: 'testimonialData',
            label: __('Testimonial List', 'gutenverse'),
            component: RepeaterControl,
            titleFormat: '<strong><%= value.name%></strong>',
            options: [
                {
                    id: 'name',
                    label: __('Name', 'gutenverse'),
                    component: TextControl,
                },
                {
                    id: 'src',
                    label: __('Client Picture', 'gutenverse'),
                    component: ImageControl,
                },
                {
                    id: 'lazy',
                    label: __('Image Load', 'gutenverse'),
                    component: SelectControl,
                    options: [
                        {
                            value: false,
                            label: __('Normal Load', 'gutenverse')
                        },
                        {
                            value: true,
                            label: __('Lazy Load', 'gutenverse')
                        },
                    ]
                },
                {
                    id: 'rating',
                    label: __('Rating', 'gutenverse'),
                    component: RangeControl,
                    min: 0,
                    max: 5,
                    step: 0.5,
                },
                {
                    id: 'description',
                    label: __('Designation', 'gutenverse'),
                    component: TextControl,
                },
                {
                    id: 'comment',
                    label: __('Comment', 'gutenverse'),
                    component: TextareaControl,
                },
            ],
        },
    ];
};