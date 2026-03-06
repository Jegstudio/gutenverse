import { __ } from '@wordpress/i18n';
import { RangeControl, SelectControl, SelectSearchControl } from 'gutenverse-core/controls';
import { isOnEditor } from 'gutenverse-core/helper';
import { fetchImageSizes } from 'gutenverse-core/requests';

export const dataPanel = (props) => {
    const {
        elementId,
        imageRatio
    } = props;

    const imageSize = isOnEditor() ? fetchImageSizes :
        () => {
            return {
                label: '',
                value: ''
            };
        };

    return [
        {
            id: 'imageSize',
            label: __('Image Size', 'gutenverse'),
            component: SelectSearchControl,
            onSearch: imageSize
        },
        {
            id: 'imageFit',
            label: __('Image Fit', 'gutenverse'),
            component: SelectControl,
            allowDeviceControl: true,
            options: [
                {
                    label: __('Cover', 'gutenverse'),
                    value: 'cover'
                },
                {
                    label: __('Fill', 'gutenverse'),
                    value: 'fill'
                },
                {
                    label: __('Contain', 'gutenverse'),
                    value: 'contain'
                },
            ],
        },
        {
            id: 'imageRatio',
            label: __('Image Ratio', 'gutenverse'),
            component: SelectControl,
            allowDeviceControl: true,
            options: [
                {
                    value: 'auto',
                    label: 'Original'
                },
                {
                    value: '1',
                    label: 'Square (1:1)'
                },
                {
                    value: '4/3',
                    label: 'Landscape (4:3)'
                },
                {
                    value: '3/4',
                    label: 'Potrait (3:4)'
                },
                {
                    value: 'custom',
                    label: 'Custom'
                },
            ],
        },
        {
            id: 'imageRatioCustom',
            label: __('Custom Image Ratio', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            show: imageRatio === 'custom',
            min: 0,
            max: 5,
            step: 0.1,
            description: __('Set to 0 for original ratio, or adjust for custom aspect ratio', 'gutenverse'),
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'imageRatioCustom',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'aspect-ratio',
                            'valueType': 'function',
                            'functionName': 'handleImageRatio'
                        }
                    ],
                    'selector': `.${elementId} img`,
                }
            ],
        },
        {
            id: 'imagePosition',
            label: __('Image Position', 'gutenverse'),
            component: SelectControl,
            allowDeviceControl: true,
            options: [
                {
                    label: __('Center center', 'gutenverse'),
                    value: 'center center'
                },
                {
                    label: __('Center Left', 'gutenverse'),
                    value: 'center left'
                },
                {
                    label: __('Center Right', 'gutenverse'),
                    value: 'center right'
                },
                {
                    label: __('Top Center', 'gutenverse'),
                    value: 'top center'
                },
                {
                    label: __('Top Left', 'gutenverse'),
                    value: 'top left'
                },
                {
                    label: __('Top Right', 'gutenverse'),
                    value: 'top right'
                },
                {
                    label: __('Bottom Center', 'gutenverse'),
                    value: 'bottom center'
                },
                {
                    label: __('Bottom Left', 'gutenverse'),
                    value: 'bottom left'
                },
                {
                    label: __('Bottom Right', 'gutenverse'),
                    value: 'bottom right'
                },
            ]
        },
    ];
};

