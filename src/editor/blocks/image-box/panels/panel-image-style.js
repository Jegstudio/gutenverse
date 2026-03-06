import { __ } from '@wordpress/i18n';
import { BoxShadowControl, DimensionControl, ImageFilterControl, RangeControl, SelectControl, SizeControl, SwitchControl } from 'gutenverse-core/controls';

export const panelImageStyle = props => {
    const {
        elementId,
        switcher,
        setSwitcher,
    } = props;

    return [
        {
            id: 'imageMargin',
            label: __('Image Margin', 'gutenverse'),
            component: DimensionControl,
            position: ['top', 'right', 'bottom', 'left'],
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                percent: {
                    text: '%',
                    unit: '%'
                },
            },
        },
        {
            id: 'imagePadding',
            label: __('Image Padding', 'gutenverse'),
            component: DimensionControl,
            position: ['top', 'right', 'bottom', 'left'],
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                percent: {
                    text: '%',
                    unit: '%'
                },
            },
        },
        {
            id: 'imageBorderRadius',
            label: __('Border Radius', 'gutenverse'),
            component: DimensionControl,
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                ['%']: {
                    text: '%',
                    unit: '%'
                },
            },
        },
        {
            id: 'imageBoxShadow',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            liveStyle: [
                {
                    'type': 'boxShadow',
                    'id': 'imageBoxShadow',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId}.gutenverse-image-box .inner-container .image-box-header`,
                }
            ]
        },
        {
            id: 'imageHeight',
            label: __('Image Height', 'gutenverse'),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 1000,
                    step: 1
                },
                em: {
                    text: 'em',
                    min: 0.1,
                    max: 10,
                    step: 0.1
                },
            },
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'imageHeight',
                    'responsive': true,
                    'selector': `.${elementId}.gutenverse-image-box .inner-container .image-box-header img`,
                    'properties': [
                        {
                            'name': 'height',
                            'valueType': 'direct',
                        }
                    ]
                }
            ]
        },
        {
            id: 'imageFit',
            label: __('Image Fit', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('Cover', 'gutenverse'),
                    value: 'cover'
                },
                {
                    label: __('Contain', 'gutenverse'),
                    value: 'contain'
                },
                {
                    label: __('Fil', 'gutenverse'),
                    value: 'fill'
                },
                {
                    label: __('Scale Down', 'gutenverse'),
                    value: 'scale-down'
                },
                {
                    label: __('None', 'gutenverse'),
                    value: 'none'
                },
            ],
        },
        {
            id: '__imageHover',
            component: SwitchControl,
            options: [
                {
                    value: 'normal',
                    label: 'Normal'
                },
                {
                    value: 'hover',
                    label: 'Hover'
                }
            ],
            onChange: ({ __imageHover }) => setSwitcher({ ...switcher, imageHover: __imageHover })
        },
        {
            id: 'imageOpacity',
            show: !switcher.imageHover || switcher.imageHover === 'normal',
            label: __('Image Opacity', 'gutenverse'),
            component: RangeControl,
            min: 0.1,
            max: 1,
            step: 0.1,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'imageOpacity',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'opacity',
                            'valueType': 'function',
                            'functionName': 'handleOpacity'
                        }
                    ],
                    'selector': `.${elementId}.gutenverse-image-box .inner-container .image-box-header img`,
                }
            ]
        },
        {
            id: 'imageHoverOpacity',
            show: switcher.imageHover === 'hover',
            label: __('Image Hover Opacity', 'gutenverse'),
            component: RangeControl,
            min: 0.1,
            max: 1,
            step: 0.1,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'imageHoverOpacity',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'opacity',
                            'valueType': 'function',
                            'functionName': 'handleOpacity'
                        }
                    ],
                    'selector': `.${elementId}.gutenverse-image-box:hover .inner-container .image-box-header img`,
                }
            ]
        },
        {
            id: 'imageHoverScale',
            show: switcher.imageHover === 'hover',
            label: __('Image Hover Scale', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 2,
            step: 0.1,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'imageHoverScale',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'transform',
                            'valueType': 'pattern',
                            'pattern': ` scale({value});
                    -webkit-transform: scale({value}); 
                    -o-transform: scale({value}); 
                    -moz-transform: scale({value}); 
                    -ms-transform: scale({value});`,
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ],
                    'selector': `.${elementId}.gutenverse-image-box:hover .inner-container .image-box-header img`,
                }
            ]
        },
        {
            id: 'imageFilter',
            label: __('Image Filter', 'gutenverse'),
            show: !switcher.imageHover || switcher.imageHover === 'normal',
            component: ImageFilterControl,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'imageFilter',
                    'selector': `.${elementId}.gutenverse-image-box .inner-container .image-box-header img`,
                    'properties': [
                        {
                            'name': 'filter',
                            'valueType': 'function',
                            'functionName': 'handleFilterImage',
                        }
                    ],
                }
            ]
        },
        {
            id: 'imageFilterHover',
            label: __('Image Hover Filter', 'gutenverse'),
            show: switcher.imageHover === 'hover',
            component: ImageFilterControl,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'imageFilterHover',
                    'selector': `.${elementId}.gutenverse-image-box:hover .inner-container .image-box-header img`,
                    'properties': [
                        {
                            'name': 'filter',
                            'valueType': 'function',
                            'functionName': 'handleFilterImage',
                        }
                    ],
                }
            ]
        },
    ];
};