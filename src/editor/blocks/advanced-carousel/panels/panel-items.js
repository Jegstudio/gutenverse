import { __ } from '@wordpress/i18n';
import { ImageControl, RepeaterControl, TextControl, SelectControl, TextareaControl, CheckboxControl, BackgroundControl, ColorControl, DimensionControl, SizeControl, ImageSizeControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { handleBackground, handleColor, handleUnitPoint } from 'gutenverse-core/styling';

export const itemsPanel = (props) => {
    const {
        elementId,
        sliderStyle,
        customSliderHeight,
        addStyle,
        removeStyle,
    } = props;

    const deviceType = getDeviceType();

    return [
        {
            id: 'overflowHideContainer',
            label: __('Overflow Hide container', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'sliderStyle',
            label: __('Slider Type', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('Style 1'),
                    value: '1'
                },
                {
                    label: __('Style 2'),
                    value: '2'
                },
            ],
        },
        {
            id: 'allowPopup',
            label: __('Allow Popup', 'gutenverse'),
            show: sliderStyle === '2',
            component: CheckboxControl,
        },
        {
            id: 'customSliderHeight',
            label: __('Custom Slider Height', 'gutenverse'),
            component: CheckboxControl,
            onChange: (value) => {
                const { customSliderHeight, sliderHeight } = value;
                if (customSliderHeight) {
                    const point = handleUnitPoint(sliderHeight[deviceType], 'height', false);
                    addStyle(
                        'sliderHeight-style-0',
                        `.${elementId}.guten-advanced-carousel .carousel-content { ${point} }`
                    );
                } else {
                    removeStyle('sliderHeight-style-0');
                }
            }
        },
        {
            id: 'sliderHeight',
            label: __('Slider Height', 'gutenverse'),
            show: customSliderHeight,
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 1000,
                    step: 1,
                    unit: 'px',
                },
                ['%']: {
                    text: '%',
                    min: 1,
                    max: 100,
                    step: 1,
                    unit: '%',
                },
                vw: {
                    text: 'vh',
                    min: 1,
                    max: 100,
                    step: 1,
                    unit: 'vh',
                },
            },
            style: [
                {
                    selector: `.${elementId}.guten-advanced-carousel .carousel-content`,
                    allowRender: () => customSliderHeight,
                    render: value => handleUnitPoint(value, 'height', false)
                }
            ]
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