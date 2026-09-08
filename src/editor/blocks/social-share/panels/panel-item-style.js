import { __ } from '@wordpress/i18n';
import {
    BorderControl,
    BorderResponsiveControl,
    ColorControl,
    IconRadioControl,
    NumberControl,
    RangeControl,
    SelectControl,
    SizeControl,
    SwitchControl,
    TypographyControl
} from 'gutenverse-core/controls';
import { AlignCenter, AlignLeft, AlignRight } from 'gutenverse-core/components';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { isNotEmpty } from 'gutenverse-core/helper';

export const panelItemStyle = props => {
    const {
        elementId,
        buttonLayout,
        primaryButtonWidth,
        primaryButtonCount,
        switcher,
        setSwitcher
    } = props;

    const device = getDeviceType();
    const buttonCount = parseInt(primaryButtonCount, 10);
    const hasButtonCount = !isNaN(buttonCount) && buttonCount > 0;
    const orderedItemSelectors = hasButtonCount ? Array.from({ length: buttonCount }, (value, index) => `.editor-styles-wrapper .${elementId} .guten-social-share-item-wrapper.guten-social-share-item-order-${index + 1}`) : [`.editor-styles-wrapper .${elementId} .guten-social-share-item-wrapper.guten-social-share-item-order-0`];
    const orderedShareItemSelector = orderedItemSelectors.map(selector => `${selector} .gutenverse-share-item`).join(', ');
    const orderedShareItemAnchorSelector = orderedItemSelectors.map(selector => `${selector} .gutenverse-share-item a`).join(', ');
    const orderedShareItemTextSelector = orderedItemSelectors.map(selector => selector.replace(`.editor-styles-wrapper .${elementId}`, `.editor-styles-wrapper .${elementId}:not(.button-layout-solid)`) + ' .gutenverse-share-text').join(', ');

    return [
        {
            id: 'buttonLayout',
            label: __('Button Layout', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('Split Icon & Text', 'gutenverse'),
                    value: 'split'
                },
                {
                    label: __('Solid Button', 'gutenverse'),
                    value: 'solid'
                },
            ],
        },
        {
            id: 'primaryButtonWidth',
            label: __('Primary Button Width', 'gutenverse'),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 1200,
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
                    'id': 'primaryButtonWidth',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'width',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': orderedShareItemSelector,
                },
                {
                    'type': 'plain',
                    'id': 'primaryButtonWidth',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'width',
                            'valueType': 'function',
                            'valueFunc': () => '100%'
                        }
                    ],
                    'selector': orderedShareItemAnchorSelector,
                },
                {
                    'type': 'plain',
                    'id': 'primaryButtonWidth',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'flex',
                            'valueType': 'function',
                            'valueFunc': () => '1 1 auto'
                        }
                    ],
                    'selector': orderedShareItemTextSelector,
                }
            ],
        },
        {
            id: 'primaryButtonCount',
            show: isNotEmpty(primaryButtonWidth),
            label: __('Apply Width to First Buttons', 'gutenverse'),
            component: NumberControl,
            min: 0,
            max: 20,
        },
        {
            id: 'buttonHeight',
            label: __('Button Height', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            unit: 'px',
            min: 1,
            max: 200,
            step: 1,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'buttonHeight',
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
                    'selector': `.editor-styles-wrapper .${elementId} .gutenverse-share-item a`,
                }
            ],
        },
        {
            id: 'buttonContentAlign',
            show: buttonLayout === 'solid',
            label: __('Button Content Alignment', 'gutenverse'),
            component: IconRadioControl,
            allowDeviceControl: true,
            options: [
                {
                    label: __('Align Left', 'gutenverse'),
                    value: 'flex-start',
                    icon: <AlignLeft />,
                },
                {
                    label: __('Align Center', 'gutenverse'),
                    value: 'center',
                    icon: <AlignCenter />,
                },
                {
                    label: __('Align Right', 'gutenverse'),
                    value: 'flex-end',
                    icon: <AlignRight />,
                },
            ],
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'buttonContentAlign',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'justify-content',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.editor-styles-wrapper .${elementId} .gutenverse-share-item a`,
                }
            ],
        },
        {
            id: 'buttonIconGap',
            show: buttonLayout === 'solid',
            label: __('Icon Text Gap', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            unit: 'px',
            min: 0,
            max: 100,
            step: 1,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'buttonIconGap',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'margin-right',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ],
                    'selector': `.editor-styles-wrapper .${elementId} .gutenverse-share-item.has-text .gutenverse-share-icon`,
                }
            ],
        },
        {
            id: 'typography',
            label: __('Typography', 'gutenverse'),
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
                    'selector': `.editor-styles-wrapper .${elementId} .gutenverse-share-item i, .editor-styles-wrapper .${elementId} .gutenverse-share-item svg`,
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
                    'selector': `.editor-styles-wrapper .${elementId} .gutenverse-share-item .gutenverse-share-icon i, .editor-styles-wrapper .${elementId} .gutenverse-share-item .gutenverse-share-icon svg`,
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
                    'selector': `.editor-styles-wrapper .${elementId} .gutenverse-share-item a`,
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
                    'selector': `.editor-styles-wrapper .${elementId} .gutenverse-share-item .gutenverse-share-icon`,
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
                    'selector': `.editor-styles-wrapper .${elementId} .gutenverse-share-item .gutenverse-share-text`,
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
                    'selector': `.editor-styles-wrapper .${elementId} .gutenverse-share-item .gutenverse-share-text`,
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
            id: 'borderType',
            show: (!switcher.socialHover || switcher.socialHover === 'normal') && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'borderType',
                    'selector': `.editor-styles-wrapper .${elementId} .gutenverse-share-item`,
                }
            ]
        },
        {
            id: 'borderTypeResponsive',
            show: (!switcher.socialHover || switcher.socialHover === 'normal') && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'borderTypeResponsive',
                    'selector': `.editor-styles-wrapper .${elementId} .gutenverse-share-item`,
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
                    'selector': `.editor-styles-wrapper .${elementId} .gutenverse-share-item:hover .gutenverse-share-icon i, .editor-styles-wrapper .${elementId} .gutenverse-share-item:hover .gutenverse-share-icon svg`,
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
                    'selector': `.editor-styles-wrapper .${elementId} .gutenverse-share-item:hover a`,
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
                    'selector': `.editor-styles-wrapper .${elementId} .gutenverse-share-item:hover .gutenverse-share-icon`,
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
                    'selector': `.editor-styles-wrapper .${elementId} .gutenverse-share-item:hover .gutenverse-share-text`,
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
                    'selector': `.editor-styles-wrapper .${elementId} .gutenverse-share-item:hover .gutenverse-share-text`,
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
            id: 'borderTypeHover',
            show: switcher.socialHover === 'hover' && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'borderTypeHover',
                    'selector': `.editor-styles-wrapper .${elementId} .gutenverse-share-item:hover`,
                }
            ]
        },
        {
            id: 'borderTypeHoverResponsive',
            show: switcher.socialHover === 'hover' && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'borderTypeHoverResponsive',
                    'selector': `.editor-styles-wrapper .${elementId} .gutenverse-share-item:hover`,
                }
            ]
        },
    ];
};
