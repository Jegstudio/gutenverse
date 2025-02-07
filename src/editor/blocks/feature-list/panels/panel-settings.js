import { __ } from '@wordpress/i18n';
import { CheckboxControl, IconControl, ImageControl, RangeControl, RepeaterControl, SelectControl, TextareaControl, TextControl } from 'gutenverse-core/controls';

export const settingsPanel = () => {
    return [
        {
            id: 'featureList',
            component: RepeaterControl,
            titleFormat: '<strong><%= value.title ? value.title : "Feature List" %></strong>',
            repeaterDefault: {
                type: 'icon',
            },
            options: [
                {
                    id: 'title',
                    label: __('Title', 'gutenverse'),
                    component: TextControl,
                },
                {
                    id: 'content',
                    label: __('Content', 'gutenverse'),
                    component: TextareaControl,
                },
                {
                    id: 'link',
                    label: __('Link', 'gutenverse'),
                    component: TextControl
                },
                {
                    id: 'type',
                    label: __('Icon Type', 'gutenverse'),
                    component: SelectControl,
                    options: [
                        {
                            value: 'icon',
                            label: 'Icon'
                        },
                        {
                            value: 'image',
                            label: 'Image'
                        },
                    ],
                },
                {
                    id: 'image',
                    label: __('Image', 'gutenverse'),
                    show: value => value.type === 'image',
                    component: ImageControl,
                },
                {
                    id: 'lazyLoad',
                    label: __('Set Lazy Load', 'gutenverse'),
                    show: value => value.type === 'image',
                    component: CheckboxControl,
                },
                {
                    id: 'icon',
                    label: __('Icon', 'gutenverse'),
                    show: value => value.type === 'icon',
                    component: IconControl,
                },
            ],
        },
        {
            id: 'iconWrapperShape',
            label: __('Icon Wrapper Shape', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    value: 'square',
                    label: 'Square'
                },
                {
                    value: 'rhombus',
                    label: 'Rhombus'
                },
            ]
        },
        {
            id: 'iconPosition',
            label: __('Icon Wrapper Shape', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    value: 'left',
                    label: 'Left'
                },
                {
                    value: 'right',
                    label: 'Right'
                },
            ],
        },
        {
            id: 'showConnector',
            label: __('Show Connector', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'listSpace',
            component: RangeControl,
            label: __('List Space', 'gutenverse'),
            allowDeviceControl: true,
            min: 1,
            max: 100,
            step: 1,
        },
    ];
};