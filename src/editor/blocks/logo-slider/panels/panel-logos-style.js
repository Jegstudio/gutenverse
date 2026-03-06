import { __ } from '@wordpress/i18n';
import { BackgroundControl, BorderControl, BorderResponsiveControl, BoxShadowControl, CheckboxControl, DimensionControl, ImageFilterControl, RangeControl, SelectControl, SwitchControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const logosStylePanel = (props) => {
    const {
        elementId,
        imageFixHeight,
        switcher,
        setSwitcher,
    } = props;

    const device = getDeviceType();

    return [
        {
            id: 'imageFixHeight',
            label: __('Fix Height', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'imageHeight',
            show: imageFixHeight,
            label: __('Height', 'gutenverse'),
            component: RangeControl,
            min: 0,
            max: 400,
            step: 1,
            unit: 'px',
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'imageHeight',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'height',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ],
                    'selector': `.${elementId}.guten-client-logo .swiper-container .content-image img`,
                }
            ]
        },
        {
            id: 'imageFit',
            show: imageFixHeight,
            label: __('Image Fit', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    value: 'cover',
                    label: 'Cover'
                },
                {
                    value: 'contain',
                    label: 'Contain'
                },
                {
                    value: 'fill',
                    label: 'Fill'
                },
                {
                    value: 'scale-down',
                    label: 'Scale Down'
                },
                {
                    value: 'none',
                    label: 'None'
                },
            ],
            allowDeviceControl: true,
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
        // Normal
        {
            id: 'filter',
            show: !switcher.imageHover || switcher.imageHover === 'normal',
            label: __('Filter', 'gutenverse'),
            component: ImageFilterControl,
        },
        {
            id: 'filterHover',
            show: switcher.imageHover === 'hover',
            label: __('Filter', 'gutenverse'),
            component: ImageFilterControl,
        },
        {
            id: 'imagePadding',
            show: !switcher.imageHover || switcher.imageHover === 'normal',
            label: __('Normal Padding', 'gutenverse'),
            component: DimensionControl,
            allowDeviceControl: true,
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                ['%']: {
                    text: '%',
                    unit: '%'
                },
            },
        },
        {
            id: 'imageMargin',
            show: !switcher.imageHover || switcher.imageHover === 'normal',
            label: __('Normal Margin', 'gutenverse'),
            component: DimensionControl,
            allowDeviceControl: true,
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                ['%']: {
                    text: '%',
                    unit: '%'
                },
            },
        },
        {
            id: 'transitionDuration',
            show: switcher.imageHover === 'hover',
            label: __('Transition Duration', 'gutenverse'),
            component: RangeControl,
            min: 0,
            max: 10,
            step: 0.1,
            allowDeviceControl: true,
        },
        {
            id: 'imageHoverPadding',
            show: switcher.imageHover === 'hover',
            label: __('Hover Padding', 'gutenverse'),
            component: DimensionControl,
            allowDeviceControl: true,
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                ['%']: {
                    text: '%',
                    unit: '%'
                },
            },
        },
        {
            id: 'imageHoverMargin',
            show: switcher.imageHover === 'hover',
            label: __('Hover Margin', 'gutenverse'),
            component: DimensionControl,
            allowDeviceControl: true,
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                ['%']: {
                    text: '%',
                    unit: '%'
                },
            },
        },
        {
            id: 'logoBackgroundNormal',
            show: !switcher.imageHover || switcher.imageHover === 'normal',
            label: __('Logo Background Normal', 'gutenverse'),
            component: BackgroundControl,
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'logoBackgroundNormal',
                    'selector': `.${elementId}.guten-client-logo .swiper-container .content-image .main-image`,
                }
            ]
        },
        {
            id: 'logoBackgroundHover',
            show: switcher.imageHover === 'hover',
            label: __('Logo Background Hover', 'gutenverse'),
            component: BackgroundControl,
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'logoBackgroundHover',
                    'selector': `.${elementId}.guten-client-logo .swiper-container .content-image .hover-image`,
                }
            ]
        },
        {
            id: 'imageBorder',
            show: (!switcher.imageHover || switcher.imageHover === 'normal') && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'imageBorder',
                    'selector': `.${elementId}.guten-client-logo .swiper-container .content-image .main-image`,
                }
            ]
        },
        {
            id: 'imageBorderResponsive',
            show: (!switcher.imageHover || switcher.imageHover === 'normal') && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'imageBorderResponsive',
                    'selector': `.${elementId}.guten-client-logo .swiper-container .content-image .main-image`,
                }
            ]
        },
        {
            id: 'imageBoxShadow',
            show: !switcher.imageHover || switcher.imageHover === 'normal',
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
                    'selector': `.${elementId}.guten-client-logo .swiper-container .content-image .main-image`,
                }
            ]
        },
        {
            id: 'opacity',
            show: !switcher.imageHover || switcher.imageHover === 'normal',
            label: __('Opacity', 'gutenverse'),
            component: RangeControl,
            min: 0.1,
            max: 1,
            step: 0.1,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'opacity',
                    'properties': [
                        {
                            'name': 'opacity',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId}.guten-client-logo .swiper-container .content-image .main-image`,
                }
            ]
        },
        {
            id: 'imageBorderHover',
            show: switcher.imageHover === 'hover' && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'imageBorderHover',
                    'selector': `.${elementId}.guten-client-logo .swiper-container .content-image .hover-image`,
                }
            ]
        },
        {
            id: 'imageBorderHoverResponsive',
            show: switcher.imageHover === 'hover' && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'imageBorderHoverResponsive',
                    'selector': `.${elementId}.guten-client-logo .swiper-container .content-image .hover-image`,
                }
            ]
        },
        {
            id: 'imageBoxShadowHover',
            show: switcher.imageHover === 'hover',
            label: __('Hover Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            liveStyle: [
                {
                    'type': 'boxShadow',
                    'id': 'imageBoxShadowHover',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId}.guten-client-logo .swiper-container .content-image .hover-image`,
                }
            ]
        },
        {
            id: 'hoverOpacity',
            show: switcher.imageHover === 'hover',
            label: __('Hover Opacity', 'gutenverse'),
            component: RangeControl,
            min: 0.1,
            max: 1,
            step: 0.1,
            isParseFloat: false,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'hoverOpacity',
                    'properties': [
                        {
                            'name': 'opacity',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId}.guten-client-logo .swiper-container .image-list:hover .content-image .hover-image`,
                }
            ]
        },
    ];
};