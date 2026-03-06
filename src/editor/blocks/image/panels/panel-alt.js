import { __ } from '@wordpress/i18n';
import { CheckboxControl, SelectControl, TextControl } from 'gutenverse-core/controls';
import { getDefaultImageLoad } from '../../../helper';

export const altPanel = (props) => {
    const {
        altType,
        imageLoad,
        lazyLoad
    } = props;

    const defaultImageLoad = getDefaultImageLoad(imageLoad, lazyLoad);

    return [
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
            id: 'fetchPriorityHigh',
            label: __('Fetch Priority High', 'gutenverse'),
            component: CheckboxControl,
            description: __('Signals the browser to prioritize fetching this image. Use this only for the LCP (Largest Contentful Paint) element.', '--gctd--')
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
            id: 'altCustom',
            show: altType === 'custom',
            label: __('Custom Caption', 'gutenverse'),
            component: TextControl,
        },
        {
            id: 'ariaLabel',
            label: __('Aria Label', 'gutenverse'),
            component: TextControl,
        },
    ];
};

