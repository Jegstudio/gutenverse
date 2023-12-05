import { __ } from '@wordpress/i18n';
import { ImageControl, RepeaterControl, TextControl, TextareaControl, BackgroundControl, ColorControl, ImageSizeControl } from 'gutenverse-core/controls';
import { handleBackground, handleColor } from 'gutenverse-core/styling';

export const itemsPanel = (props) => {
    const {
        elementId,
        sliderStyle,
    } = props;

    return [
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
                    show: () => sliderStyle === '2',
                    label: __('Image', 'gutenverse'),
                    component: ImageSizeControl,
                },
                {
                    id: 'imagePopup',
                    show: () => sliderStyle === '2',
                    label: __('Popup Image', 'gutenverse'),
                    component: ImageControl,
                },
                {
                    id: 'imageDescription',
                    show: () => sliderStyle === '2',
                    label: __('Image Description', 'gutenverse'),
                    component: TextControl,
                },
                {
                    id: 'text',
                    show: () => sliderStyle === '1',
                    label: __('Text', 'gutenverse'),
                    component: TextareaControl,
                },
                {
                    id: 'textColor',
                    show: () => sliderStyle === '1',
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
                    show: () => sliderStyle === '1',
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