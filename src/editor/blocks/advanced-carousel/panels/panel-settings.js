import { __ } from '@wordpress/i18n';
import { SelectControl, CheckboxControl, SizeControl, RangeControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { handleUnitPoint } from 'gutenverse-core/styling';

export const settingsPanel = (props) => {
    const {
        elementId,
        sliderStyle,
        customSliderHeight,
        sliderEffect,
        sliderNumber,
        autoplay,

        setAttributes,
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
            id: 'loop',
            label: __('Loop', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'autoplay',
            label: __('Autoplay', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'delay',
            label: __('Autoplay Delay', 'gutenverse'),
            show: autoplay,
            component: RangeControl,
            min: 500,
            max: 10000,
            step: 100,
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
            onChange: (value) => {
                const { sliderEffect } = value;
                if ('normal' !== sliderEffect) {
                    setAttributes({
                        sliderNumber: {
                            'Desktop': 1,
                            'Mobile': 1,
                            'Tablet': 1,
                        }
                    });
                }
            }
        },
        {
            id: 'sliderNumber',
            label: __('Slider Number', 'gutenverse'),
            show: sliderEffect === 'normal',
            component: RangeControl,
            min: 1,
            max: 5,
            step: 1,
            allowDeviceControl: true,
        },
        {
            id: 'spaceBetween',
            label: __('Space Between', 'gutenverse'),
            show: sliderEffect === 'normal',
            component: RangeControl,
            min: 0,
            max: 100,
            step: 1,
            allowDeviceControl: true,
        },
        {
            id: 'centeredSlides',
            show: sliderEffect === 'normal' && 1 < sliderNumber[deviceType],
            label: __('Centered Slides', 'gutenverse'),
            component: CheckboxControl,
            allowDeviceControl: true,
        },
    ];
};