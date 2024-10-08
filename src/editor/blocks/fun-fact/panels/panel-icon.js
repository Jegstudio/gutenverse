import { __ } from '@wordpress/i18n';
import { CheckboxControl, IconControl, ImageControl, RangeControl, SelectControl, TextControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const iconPanel = ({ elementId, iconType, imageSize, removeStyle }) => {
    const device = getDeviceType();
    return [
        {
            id: 'iconType',
            label: __('Icon Type', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    value: 'none',
                    label: 'None'
                },
                {
                    value: 'icon',
                    label: 'Icon'
                },
                {
                    value: 'image',
                    label: 'Image'
                },
            ],
            onChange: values => {
                if (!values.imageFixHeight) {
                    removeStyle('imageSize-style-0');
                }
            },
            style: [
                {
                    selector: `.${elementId} .fun-fact-inner .icon img`,
                    allowRender: value => value === 'image',
                    render: () => `width: ${imageSize}px; height: ${imageSize}px; object-fit: cover;`
                }
            ]
        },
        {
            id: 'icon',
            show: iconType === 'icon',
            label: __('Select Icon', 'gutenverse'),
            component: IconControl,
        },
        {
            id: 'image',
            show: iconType === 'image',
            label: __('Select Image', 'gutenverse'),
            component: ImageControl,
        },
        {
            id: 'imageAlt',
            show: iconType === 'image',
            label: __('Image Alt', 'gutenverse'),
            component: TextControl,
        },
        {
            id: 'lazyLoad',
            show: iconType === 'image',
            label: __('Set Lazy Load', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'imageSize',
            show: iconType === 'image' && device === 'Desktop',
            label: __('Image Size', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 1000,
            step: 1,
            isParseFloat: true,
            showDeviceControl: true,
            unit: 'px',
            style: [
                {
                    selector: `.${elementId} .fun-fact-inner .icon img`,
                    allowRender: () => iconType === 'image',
                    render: value => `width: ${value}px; height: ${value}px; object-fit: cover;`
                }
            ]
        },
        {
            id: 'imageSizeResponsive',
            show: iconType === 'image' && device !== 'Desktop',
            label: __('Image Size', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 1000,
            step: 1,
            isParseFloat: true,
            allowDeviceControl: true,
            unit: 'px',
            style: [
                {
                    selector: `.${elementId} .fun-fact-inner .icon img`,
                    allowRender: () => iconType === 'image' && device !== 'Desktop',
                    render: value => `width: ${value}px; height: ${value}px; object-fit: cover;`
                }
            ]
        },
    ];
};