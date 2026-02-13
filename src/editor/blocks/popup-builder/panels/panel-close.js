import { __ } from '@wordpress/i18n';
import { CheckboxControl, ColorControl, IconSVGControl, RangeControl, SizeControl, SelectControl, DimensionControl, BackgroundControl, BorderControl, SwitchControl, BoxShadowControl, BorderResponsiveControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const closePanel = (props) => {
    const {
        elementId,
        showCloseButton,
        switcher,
        setSwitcher
    } = props;

    const device = getDeviceType();
    const closeSwitch = switcher.closeSwitch ? switcher.closeSwitch : 'normal';

    return [
        {
            id: 'closePopupOverlay',
            label: __('Click overlay to close', 'gutenverse'),
            description: __('Enable this option to close popup when overlay clicked.'),
            component: CheckboxControl,
        },
        {
            id: 'showCloseButton',
            label: __('Show Close Button', 'gutenverse'),
            description: __('Show close button '),
            component: CheckboxControl,
        },
        {
            id: 'closePosition',
            label: __('Close Position', 'gutenverse'),
            show: showCloseButton,
            component: SelectControl,
            options: [
                {
                    label: __('Overlay', 'gutenverse'),
                    value: 'overlay',
                },
                {
                    label: __('Container', 'gutenverse'),
                    value: 'container',
                },
            ],
        },
        {
            id: 'closeIcon',
            label: __('Close Icon', 'gutenverse'),
            show: showCloseButton,
            component: IconSVGControl,
        },
        {
            id: 'closeButtonSize',
            label: __('Close icons size', 'gutenverse'),
            component: RangeControl,
            show: showCloseButton,
            allowDeviceControl: true,
            unit: 'px',
            min: 1,
            max: 200,
            step: 1,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'closeButtonSize',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'font-size',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ],
                    'selector': `.${elementId}.guten-popup-builder .guten-popup-close i`,
                },
                {
                    'type': 'plain',
                    'id': 'closeButtonSize',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'font-size',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ],
                    'selector': `.${elementId}.guten-popup-builder .guten-popup-close svg`,
                }
            ]
        },
        {
            id: 'closePositioningLeft',
            label: __('Left Orientation', 'gutenverse'),
            component: SizeControl,
            show: showCloseButton,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: -1000,
                    max: 1000,
                    step: 1,
                    unit: 'px',
                },
                ['%']: {
                    text: '%',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: '%',
                },
                vw: {
                    text: 'vw',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: 'vw',
                },
                vh: {
                    text: 'vw',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: 'vw',
                },
            },
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'closePositioningLeft',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'left',
                            'valueType': 'direct',
                        }
                    ],
                    'selector': `.${elementId}.guten-popup-builder .guten-popup-close`,
                }
            ]
        },
        {
            id: 'closePositioningRight',
            label: __('Right Orientation', 'gutenverse'),
            component: SizeControl,
            show: showCloseButton,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: -1000,
                    max: 1000,
                    step: 1,
                    unit: 'px',
                },
                ['%']: {
                    text: '%',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: '%',
                },
                vw: {
                    text: 'vw',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: 'vw',
                },
                vh: {
                    text: 'vw',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: 'vw',
                },
            },
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'closePositioningRight',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'right',
                            'valueType': 'direct',
                        }
                    ],
                    'selector': `.${elementId}.guten-popup-builder .guten-popup-close`,
                }
            ]
        },
        {
            id: 'closePositioningTop',
            label: __('Top Orientation', 'gutenverse'),
            component: SizeControl,
            show: showCloseButton,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: -1000,
                    max: 1000,
                    step: 1,
                    unit: 'px',
                },
                ['%']: {
                    text: '%',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: '%',
                },
                vw: {
                    text: 'vw',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: 'vw',
                },
                vh: {
                    text: 'vw',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: 'vw',
                },
            },
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'closePositioningTop',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'top',
                            'valueType': 'direct',
                        }
                    ],
                    'selector': `.${elementId}.guten-popup-builder .guten-popup-close`,
                }
            ]
        },
        {
            id: 'closePositioningBottom',
            label: __('Bottom Orientation', 'gutenverse'),
            component: SizeControl,
            show: showCloseButton,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: -1000,
                    max: 1000,
                    step: 1,
                    unit: 'px',
                },
                ['%']: {
                    text: '%',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: '%',
                },
                vw: {
                    text: 'vw',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: 'vw',
                },
                vh: {
                    text: 'vw',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: 'vw',
                },
            },
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'closePositioningBottom',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'bottom',
                            'valueType': 'direct',
                        }
                    ],
                    'selector': `.${elementId}.guten-popup-builder .guten-popup-close`,
                }
            ]
        },
        {
            id: 'closePadding',
            label: __('Padding', 'gutenverse'),
            component: DimensionControl,
            allowDeviceControl: true,
            show: showCloseButton,
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px',
                },
                em: {
                    text: 'em',
                    unit: 'em',
                },
                ['%']: {
                    text: '%',
                    unit: '%',
                },
            },
        },
        {
            id: '__closeSwitch',
            component: SwitchControl,
            show: showCloseButton,
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
            onChange: ({ __closeSwitch }) => setSwitcher({ ...switcher, closeSwitch: __closeSwitch })
        },
        {
            id: 'closeButtonColor',
            label: __('Close Icon Color', 'gutenverse'),
            show: showCloseButton && closeSwitch === 'normal',
            component: ColorControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'closeButtonColor',
                    'responsive': true,
                    'selector': `.${elementId}.guten-popup-builder .guten-popup .guten-popup-close i`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                },
                {
                    'type': 'color',
                    'id': 'closeButtonColor',
                    'responsive': true,
                    'selector': `.${elementId}.guten-popup-builder .guten-popup .guten-popup-close svg`,
                    'properties': [
                        {
                            'name': 'fill',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'closeButtonBgColor',
            component: BackgroundControl,
            show: showCloseButton && closeSwitch === 'normal',
            label: __('Close Icon Background Color', 'gutenverse'),
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'closeButtonBgColor',
                    'selector': `.${elementId}.guten-popup-builder .guten-popup-close`,
                }
            ]
        },
        {
            id: 'closeBorder',
            show: device === 'Desktop' && showCloseButton && closeSwitch === 'normal',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'closeBorder',
                    'selector': `.${elementId}.guten-popup-builder .guten-popup .guten-popup-close`,
                }
            ]
        },
        {
            id: 'closeBorderResponsive',
            show: device !== 'Desktop' && showCloseButton && closeSwitch === 'normal',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'closeBorderResponsive',
                    'selector': `.${elementId}.guten-popup-builder .guten-popup .guten-popup-close`,
                }
            ]
        },
        {
            id: 'closeBoxShadow',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            show: showCloseButton && closeSwitch === 'normal',
            liveStyle: [
                {
                    'type': 'boxShadow',
                    'id': 'closeBoxShadow',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId}.guten-popup-builder .guten-popup .guten-popup-close`,
                }
            ]
        },
        {
            id: 'closeButtonColorHover',
            label: __('Close Icon Color', 'gutenverse'),
            show: showCloseButton && closeSwitch === 'hover',
            component: ColorControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'closeButtonColorHover',
                    'responsive': true,
                    'selector': `.${elementId}.guten-popup-builder .guten-popup .guten-popup-close:hover i`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                },
                {
                    'type': 'color',
                    'id': 'closeButtonColorHover',
                    'responsive': true,
                    'selector': `.${elementId}.guten-popup-builder .guten-popup .guten-popup-close:hover svg`,
                    'properties': [
                        {
                            'name': 'fill',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'closeButtonBgColorHover',
            component: BackgroundControl,
            show: showCloseButton && closeSwitch === 'hover',
            label: __('Close Icon Background Color', 'gutenverse'),
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'closeButtonBgColorHover',
                    'selector': `.${elementId}.guten-popup-builder .guten-popup-close:hover`,
                }
            ]
        },
        {
            id: 'closeBorderHover',
            show: showCloseButton && closeSwitch === 'hover' && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'closeBorderHover',
                    'selector': `.${elementId}.guten-popup-builder .guten-popup .guten-popup-close:hover`,
                }
            ]
        },
        {
            id: 'closeBorderHoverResponsive',
            show: showCloseButton && closeSwitch === 'hover' && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'closeBorderHoverResponsive',
                    'selector': `.${elementId}.guten-popup-builder .guten-popup .guten-popup-close:hover`,
                }
            ]
        },
        {
            id: 'closeBoxShadowHover',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            show: showCloseButton && closeSwitch === 'hover',
            liveStyle: [
                {
                    'type': 'boxShadow',
                    'id': 'closeBoxShadowHover',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId}.guten-popup-builder .guten-popup .guten-popup-close:hover`,
                }
            ]
        }
    ];
};
