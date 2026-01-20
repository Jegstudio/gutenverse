import { __ } from '@wordpress/i18n';
import { ImageSizeControl, SelectControl, TextControl } from 'gutenverse-core/controls';
import { getDefaultImageLoad } from '../../../helper';

export const panelImage = (props) => {
    const { altType, imageLoad, lazyLoad } = props;
    const defaultImageLoad = getDefaultImageLoad(imageLoad, lazyLoad);

    return [
        {
            id: 'image',
            label: __('Image', 'gutenverse'),
            component: ImageSizeControl
        },
        {
            id: 'imageLoad',
            label: __('Image Load', 'gutenverse'),
            component: SelectControl,
            defaultValue: defaultImageLoad,
            options: [
                {
                    label: __('Normal Load', 'gutenverse'),
                    value: 'eager'
                },
                {
                    label: __('Lazy Load', 'gutenverse'),
                    value: 'lazy'
                },
            ],
        },
        {
            id: 'altType',
            label: __('Alt Type', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: 'None',
                    value: 'none'
                },
                {
                    label: 'Alt from Image',
                    value: 'original'
                },
                {
                    label: 'Custom Alt',
                    value: 'custom'
                },
            ]
        },
        {
            id: 'imageAlt',
            show: altType === 'custom',
            label: __('Custom Caption', 'gutenverse'),
            component: TextControl,
        },
        {
            id: 'ariaLabel',
            label: __('Aria Label', 'gutenverse'),
            component: TextControl,
        },
        {
            id: 'contentStyle',
            label: __('Content Style', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('Default'),
                    value: 'default'
                },
                {
                    label: __('Floating'),
                    value: 'floating'
                },
            ],
        },
    ];
};