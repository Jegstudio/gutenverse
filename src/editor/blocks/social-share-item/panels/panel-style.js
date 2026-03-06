import { __ } from '@wordpress/i18n';
import {
    ColorControl,
    SizeControl,
    SwitchControl,
    TypographyControl,
    BorderControl,
    BorderResponsiveControl,
    BoxShadowControl
} from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const panelStyle = props => {
    const {
        elementId,
        showText,
        switcher,
        setSwitcher
    } = props;

    const device = getDeviceType();

    return [
        {
            id: 'typography',
            label: __('Typography', 'gutenverse'),
            show: showText,
            component: TypographyControl,
        },
        {
            id: 'iconSize',
            label: __('Icon Size', 'gutenverse'),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 100,
                    step: 1
                },
                em: {
                    text: 'em',
                    min: 0.1,
                    max: 3,
                    step: 0.1
                },
            },
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'iconSize',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'font-size',
                            'valueType': 'direct'
                        },
                        {
                            'name': 'width',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.editor-styles-wrapper #${elementId}.gutenverse-share-item i`,
                }
            ]
        },
        {
            id: '__socialHover',
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
            onChange: ({ __socialHover }) => setSwitcher({ ...switcher, socialHover: __socialHover })
        },
        {
            id: 'iconColor',
            show: !switcher.socialHover || switcher.socialHover === 'normal',
            label: __('Icon Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'iconColor',
                    'selector': `.editor-styles-wrapper #${elementId}.gutenverse-share-item .gutenverse-share-icon i`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'iconBackgroundColor',
            show: !switcher.socialHover || switcher.socialHover === 'normal',
            label: __('Icon Background Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'iconBackgroundColor',
                    'selector': `.editor-styles-wrapper #${elementId}.gutenverse-share-item .gutenverse-share-icon`,
                    'properties': [
                        {
                            'name': 'background-color',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'backgroundColor',
            show: !switcher.socialHover || switcher.socialHover === 'normal',
            label: __('Text Background Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'backgroundColor',
                    'selector': `.editor-styles-wrapper #${elementId}.gutenverse-share-item .gutenverse-share-text`,
                    'properties': [
                        {
                            'name': 'background-color',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'textColor',
            show: !switcher.socialHover || switcher.socialHover === 'normal',
            label: __('Text Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'textColor',
                    'selector': `.editor-styles-wrapper #${elementId}.gutenverse-share-item .gutenverse-share-text`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'border',
            show: (!switcher.socialHover || switcher.socialHover === 'normal') && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'border',
                    'selector': `.editor-styles-wrapper #${elementId}.gutenverse-share-item`,
                }
            ]
        },
        {
            id: 'borderResponsive',
            show: (!switcher.socialHover || switcher.socialHover === 'normal') && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'borderResponsive',
                    'selector': `.editor-styles-wrapper #${elementId}.gutenverse-share-item`,
                }
            ]
        },
        {
            id: 'iconColorHover',
            show: switcher.socialHover === 'hover',
            label: __('Icon Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'iconColorHover',
                    'selector': `.editor-styles-wrapper #${elementId}.gutenverse-share-item:hover .gutenverse-share-icon i`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'iconBackgroundColorHover',
            show: switcher.socialHover === 'hover',
            label: __('Icon Background Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'iconBackgroundColorHover',
                    'selector': `.editor-styles-wrapper #${elementId}.gutenverse-share-item:hover .gutenverse-share-icon`,
                    'properties': [
                        {
                            'name': 'background-color',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'backgroundColorHover',
            show: switcher.socialHover === 'hover',
            label: __('Text Background Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'backgroundColorHover',
                    'selector': `.editor-styles-wrapper #${elementId}.gutenverse-share-item:hover .gutenverse-share-text`,
                    'properties': [
                        {
                            'name': 'background-color',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'textColorHover',
            show: switcher.socialHover === 'hover',
            label: __('Text Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'textColorHover',
                    'selector': `.editor-styles-wrapper #${elementId}.gutenverse-share-item:hover .gutenverse-share-text`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'borderHover',
            show: switcher.socialHover === 'hover' && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'borderHover',
                    'selector': `.editor-styles-wrapper #${elementId}.gutenverse-share-item:hover`,
                }
            ]
        },
        {
            id: 'borderHoverResponsive',
            show: switcher.socialHover === 'hover' && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'borderHoverResponsive',
                    'selector': `.editor-styles-wrapper #${elementId}.gutenverse-share-item:hover`,
                }
            ]
        },
        {
            id: 'boxShadow',
            show: !switcher.socialHover || switcher.socialHover === 'normal',
            label: __('Box Shadow', '--gctd--'),
            component: BoxShadowControl,
            liveStyle: [
                {
                    'type': 'boxShadow',
                    'id': 'boxShadow',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.editor-styles-wrapper #${elementId}.gutenverse-share-item`,
                }
            ]
        },
        {
            id: 'boxShadowHover',
            show: switcher.socialHover === 'hover',
            label: __('Box Shadow', '--gctd--'),
            component: BoxShadowControl,
            liveStyle: [
                {
                    'type': 'boxShadow',
                    'id': 'boxShadowHover',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.editor-styles-wrapper #${elementId}.gutenverse-share-item:hover`,
                }
            ]
        }
    ];
};