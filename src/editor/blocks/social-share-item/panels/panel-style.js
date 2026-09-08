import { __ } from '@wordpress/i18n';
import {
    CheckboxControl,
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
        itemGrow,
        showText,
        switcher,
        setSwitcher,
        context = {}
    } = props;

    const device = getDeviceType();
    const buttonLayout = context['gutenverse/socialShareButtonLayout'] || 'split';

    return [
        {
            id: 'itemGrow',
            label: __('Grow Item', 'gutenverse'),
            description: __('Allow this share item to fill available horizontal space.', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'itemWidth',
            show: !itemGrow,
            label: __('Item Width', 'gutenverse'),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 1000,
                    step: 1
                },
                '%': {
                    text: '%',
                    min: 1,
                    max: 100,
                    step: 1
                },
            },
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'itemWidth',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'width',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.editor-styles-wrapper #${elementId}.gutenverse-share-item`,
                },
                {
                    'type': 'plain',
                    'id': 'itemWidth',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'width',
                            'valueType': 'function',
                            'valueFunc': () => '100%'
                        }
                    ],
                    'selector': `.editor-styles-wrapper .guten-social-share.button-layout-solid #${elementId}.gutenverse-share-item a`,
                },
                {
                    'type': 'plain',
                    'id': 'itemWidth',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'flex',
                            'valueType': 'function',
                            'valueFunc': () => '1 1 auto'
                        }
                    ],
                    'selector': `.editor-styles-wrapper .guten-social-share:not(.button-layout-solid) #${elementId}.gutenverse-share-item .gutenverse-share-text`,
                }
            ]
        },
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
                    'selector': `.editor-styles-wrapper #${elementId}.gutenverse-share-item i, .editor-styles-wrapper #${elementId}.gutenverse-share-item svg`,
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
                    'selector': `.editor-styles-wrapper #${elementId}.gutenverse-share-item .gutenverse-share-icon i, .editor-styles-wrapper #${elementId}.gutenverse-share-item .gutenverse-share-icon svg`,
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
            id: 'buttonBackgroundColor',
            show: buttonLayout === 'solid' && (!switcher.socialHover || switcher.socialHover === 'normal'),
            label: __('Button Background Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'buttonBackgroundColor',
                    'selector': `.editor-styles-wrapper #${elementId}.gutenverse-share-item a`,
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
            id: 'iconBackgroundColor',
            show: buttonLayout === 'split' && (!switcher.socialHover || switcher.socialHover === 'normal'),
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
            show: buttonLayout === 'split' && (!switcher.socialHover || switcher.socialHover === 'normal'),
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
                    'selector': `.editor-styles-wrapper #${elementId}.gutenverse-share-item:hover .gutenverse-share-icon i, .editor-styles-wrapper #${elementId}.gutenverse-share-item:hover .gutenverse-share-icon svg`,
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
            id: 'buttonBackgroundColorHover',
            show: buttonLayout === 'solid' && switcher.socialHover === 'hover',
            label: __('Button Background Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'buttonBackgroundColorHover',
                    'selector': `.editor-styles-wrapper .guten-social-share.button-layout-solid #${elementId}.gutenverse-share-item:hover a`,
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
            id: 'iconBackgroundColorHover',
            show: buttonLayout === 'split' && switcher.socialHover === 'hover',
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
            show: buttonLayout === 'split' && switcher.socialHover === 'hover',
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
