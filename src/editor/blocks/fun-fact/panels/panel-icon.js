import { __ } from '@wordpress/i18n';
import { IconSVGControl, ImageControl, RangeControl, SelectControl, TextControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { getDefaultImageLoad } from "../../../helper";

export const iconPanel = ({ elementId, iconType, imageLoad, lazyLoad }) => {
    const device = getDeviceType();

    const defaultImageLoad = getDefaultImageLoad(imageLoad, lazyLoad);
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
                {
                    value: 'svg',
                    label: 'SVG'
                },
            ],
        },
        {
            id: 'icon',
            show: iconType === 'icon' || iconType === 'svg',
            label: __('Select Icon', 'gutenverse'),
            component: IconSVGControl,
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
            id: 'imageLoad',
            label: __('Image Load', 'gutenverse'),
            show: iconType === 'image',
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
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'imageSize',
                    'selector': `.${elementId}.guten-fun-fact .fun-fact-inner .icon img`,
                    'properties': [
                        {
                            'name': 'width',
                            'valueType': 'pattern',
                            'pattern': '{value}px; height: {value}px; object-fit: cover;',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ]
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
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'imageSizeResponsive',
                    'responsive' : true,
                    'selector': `.${elementId}.guten-fun-fact .fun-fact-inner .icon img`,
                    'properties': [
                        {
                            'name': 'width',
                            'valueType': 'pattern',
                            'pattern': '{value}px; height: {value}px; object-fit: cover;',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ]
                }
            ]
        },
    ];
};