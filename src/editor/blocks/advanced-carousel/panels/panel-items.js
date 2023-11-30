import { __ } from '@wordpress/i18n';
import { ImageControl, RepeaterControl, TextControl, SelectControl, TextareaControl, CheckboxControl, BackgroundControl, ColorControl } from 'gutenverse-core/controls';
import { handleBackground, handleColor } from 'gutenverse-core/styling';

export const itemsPanel = (props) => {
    const {
        elementId,
        sliderType
    } = props;

    return [
        {
            id: 'overflowHideContainer',
            label: __('Overflow Hide container', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'sliderType',
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
            id: 'sliderEffect',
            label: __('Slider Effect', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('Normal'),
                    value: 'normal'
                },
                {
                    label: __('Card'),
                    value: 'card'
                },
                {
                    label: __('Cube'),
                    value: 'cube'
                },
                {
                    label: __('Coverflow'),
                    value: 'coverflow'
                },
                {
                    label: __('Flip'),
                    value: 'flip'
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
                    id: 'title',
                    label: __('Slider Name', 'gutenverse'),
                    component: TextControl,
                },
                {
                    id: 'image',
                    show: () => sliderType === 'image',
                    label: __('Image', 'gutenverse'),
                    component: ImageControl,
                },
                {
                    id: 'imagePopup',
                    show: () => sliderType === 'image',
                    label: __('Popup Image', 'gutenverse'),
                    component: ImageControl,
                },
                {
                    id: 'imageDescription',
                    show: () => sliderType === 'image',
                    label: __('Image Description', 'gutenverse'),
                    component: TextControl,
                },
                {
                    id: 'text',
                    show: () => sliderType === 'text',
                    label: __('Text', 'gutenverse'),
                    component: TextareaControl,
                },
                {
                    id: 'textColor',
                    show: () => sliderType === 'text',
                    label: __('Text Color', 'gutenverse'),
                    component: ColorControl,
                    style: [
                        {
                            selector: index => {
                                return `.${elementId}.guten-advanced-carousel .carousel-slide-${index}`;
                            },
                            render: value => handleColor(value, 'color')
                        }
                    ],
                },
                {
                    id: 'textBackground',
                    show: () => sliderType === 'text',
                    label: __('Background', 'gutenverse'),
                    component: BackgroundControl,
                    options: ['default', 'gradient'],
                    style: [
                        {
                            selector: index => {
                                return `.${elementId}.guten-advanced-carousel .carousel-slide-${index}`;
                            },
                            hasChild: true,
                            render: value => handleBackground(value)
                        }
                    ]
                },
            ],
        },
    ];
};