import { __ } from '@wordpress/i18n';
import { IconControl, RangeControl, SelectControl, TextControl } from 'gutenverse-core/controls';

export const settingPanel = ({elementId, grid}) => {
    return [
        {
            id: 'zoomOptions',
            label: __('Zoom Options', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    value: 'item',
                    label: __('On Item Click')
                },
                {
                    value: 'button',
                    label: __('On Button Click')
                },
                {
                    value: 'disable',
                    label: __('Disable Zoom')
                },
            ]
        },
        {
            id: 'showed',
            label: __('Total Item to Show', 'gutenverse'),
            component: RangeControl,
            isParseFloat: true,
            min: 1,
            max: 50,
            step: 1,
        },
        {
            id: 'animationDuration',
            label: __('Animation Duration', 'gutenverse'),
            component: RangeControl,
            min: 100,
            max: 10000,
            step: 1,
            unit: 's',
            style: [
                {
                    selector: `.${elementId} .gallery-items .gallery-item-wrap .thumbnail-wrap .caption-wrap`,
                    render: value => `animation-duration: ${value/1000}s!important;`
                }
            ]
        },
        {
            id: 'column',
            label: __('Column', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 6,
            step: 1,
            allowDeviceControl: true
        },
        {
            id: 'grid',
            label: __('Grid', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    value: 'grid',
                    label: __('Grid')
                },
                {
                    value: 'masonry',
                    label: __('Masonry')
                },
            ]
        },
        {
            id: 'height',
            show: grid === 'grid',
            label: __('Height', 'gutenverse'),
            component: RangeControl,
            min: 0,
            max: 1000,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
            liveUpdate: true,
            style: [
                {
                    selector: `.${elementId}:not([data-grid="masonry"]) .gallery-items .gallery-item-wrap .thumbnail-wrap`,
                    allowRender: (value) => value && grid === 'grid',
                    render: value => `height: ${value}px;`
                }
            ]
        },
        {
            id: 'layout',
            label: __('Layout', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    value: 'overlay',
                    label: __('Overlay')
                },
                {
                    value: 'card',
                    label: __('Card')
                },
            ]
        },
        {
            id: 'hover',
            label: __('Hover Style', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    value: 'none',
                    label: __('None')
                },
                {
                    value: 'slide-up',
                    label: __('Slide In Up')
                },
                {
                    value: 'fade-in',
                    label: __('Fade In')
                },
                {
                    value: 'zoom-in',
                    label: __('Zoom In')
                },
            ]
        },
        {
            id: 'zoomIcon',
            label: __('Zoom Icon', 'gutenverse'),
            component: IconControl,
        },
        {
            id: 'zoomText',
            label: __('Zoom Text', 'gutenverse'),
            component: TextControl,
        },
        {
            id: 'linkIcon',
            label: __('Link Icon', 'gutenverse'),
            component: IconControl,
        },
        {
            id: 'linkText',
            label: __('Link Text', 'gutenverse'),
            component: TextControl,
        },
    ];
};