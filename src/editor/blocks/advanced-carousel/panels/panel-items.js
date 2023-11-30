import { __ } from '@wordpress/i18n';
import { SelectControl } from 'gutenverse-core/components';
import { ImageControl, RepeaterControl, TextControl } from 'gutenverse-core/controls';

export const itemsPanel = () => {
    return [
        {
            id: 'type',
            label: __('Slider Type', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('Text'),
                    value: 'text'
                },
                {
                    label: __('Image'),
                    value: 'image'
                },
            ],
        },
        {
            id: 'items',
            label: __('Slider Items', 'gutenverse'),
            component: RepeaterControl,
            titleFormat: '<strong><%= value.title%></strong>',
            options: [
                {
                    id: 'image',
                    label: __('Image', 'gutenverse'),
                    component: ImageControl,
                },
                {
                    id: 'imagePopup',
                    label: __('Popup Image', 'gutenverse'),
                    component: ImageControl,
                },
                {
                    id: 'imageDescription',
                    label: __('Image Description', 'gutenverse'),
                    component: TextControl,
                },
            ],
        },
    ];
};