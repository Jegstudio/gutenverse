import { __ } from '@wordpress/i18n';

import { AlignCenter, AlignLeft, AlignRight } from 'gutenverse-core/components';
import { BackgroundControl, BorderControl, BorderResponsiveControl, BoxShadowControl, ColorControl, DimensionControl, IconRadioControl, RangeControl, SizeControl, SwitchControl, TypographyControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { paginationSwitcher } from '../data/data';

export const paginationStylePanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher,
        paginationMode
    } = props;

    const device = getDeviceType();

    return [
        {
            id: 'paginationTypography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: 'paginationMargin',
            label: __('Margin', 'gutenverse'),
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
            id: 'paginationPadding',
            label: __('Padding', 'gutenverse'),
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
            id: 'paginationWidth',
            label: __('Width', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            unit: '%',
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'paginationWidth',
                    'responsive': true,
                    'selector': `.${elementId} .guten-postlist .guten-block-pagination .guten-block-loadmore, .${elementId} .guten-postlist .guten_block_nav .btn-pagination`,
                    'properties': [
                        {
                            'name': 'width',
                            'valueType': 'pattern',
                            'pattern': '{value}%',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ],
                }
            ]
        },
        {
            id: 'paginationIconSpacing',
            label: __('Icon Spacing', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'paginationIconSpacing',
                    'responsive': true,
                    'selector': `.${elementId} .guten-postlist .guten-block-pagination .guten-block-loadmore.icon-position-before i, .${elementId} .guten-postlist .guten_block_nav .btn-pagination.prev i, .${elementId} .guten-postlist .guten-block-pagination .guten-block-loadmore.icon-position-before svg, .${elementId} .guten-postlist .guten_block_nav .btn-pagination.prev svg`,
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
                },
                {
                    'type': 'plain',
                    'id': 'paginationIconSpacing',
                    'responsive': true,
                    'selector': `.${elementId} .guten-postlist .guten-block-pagination .guten-block-loadmore.icon-position-after i, .${elementId} .guten-postlist .guten_block_nav .btn-pagination.next i, .${elementId} .guten-postlist .guten-block-pagination .guten-block-loadmore.icon-position-after svg, .${elementId} .guten-postlist .guten_block_nav .btn-pagination.next svg`,
                    'properties': [
                        {
                            'name': 'margin-left',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ],
                }
            ]
        },
        {
            id: 'paginationIconSize',
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
                    'id': 'paginationIconSize',
                    'responsive': true,
                    'selector': `.${elementId} .guten-postlist .guten-block-pagination .guten-block-loadmore.icon-position-before i, .${elementId} .guten-postlist .guten_block_nav .btn-pagination.prev i`,
                    'properties': [
                        {
                            'name': 'font-size',
                            'valueType': 'direct',
                        }
                    ],
                },
                {
                    'type': 'unitPoint',
                    'id': 'paginationIconSize',
                    'responsive': true,
                    'selector': `.${elementId} .guten-postlist .guten-block-pagination .guten-block-loadmore.icon-position-before svg, .${elementId} .guten-postlist .guten_block_nav .btn-pagination.prev svg`,
                    'properties': [
                        {
                            'name': 'font-size',
                            'valueType': 'direct',
                        }
                    ],
                },
                {
                    'type': 'unitPoint',
                    'id': 'paginationIconSize',
                    'responsive': true,
                    'selector': `.${elementId} .guten-postlist .guten-block-pagination .guten-block-loadmore.icon-position-after i, .${elementId} .guten-postlist .guten_block_nav .btn-pagination.next i`,
                    'properties': [
                        {
                            'name': 'font-size',
                            'valueType': 'direct',
                        }
                    ],
                },
                {
                    'type': 'unitPoint',
                    'id': 'paginationIconSize',
                    'responsive': true,
                    'selector': `.${elementId} .guten-postlist .guten-block-pagination .guten-block-loadmore.icon-position-after svg, .${elementId} .guten-postlist .guten_block_nav .btn-pagination.next svg`,
                    'properties': [
                        {
                            'name': 'font-size',
                            'valueType': 'direct',
                        }
                    ],
                }
            ]
        },
        {
            id: 'paginationAlign',
            label: __('Alignment', 'gutenverse'),
            component: IconRadioControl,
            allowDeviceControl: true,
            options: [
                {
                    label: __('Align Left', 'gutenverse'),
                    value: 'left',
                    icon: <AlignLeft />,
                },
                {
                    label: __('Align Center', 'gutenverse'),
                    value: 'center',
                    icon: <AlignCenter />,
                },
                {
                    label: __('Align Right', 'gutenverse'),
                    value: 'right',
                    icon: <AlignRight />,
                },
            ],
        },
        {
            id: '__paginationHover',
            component: SwitchControl,
            options: paginationSwitcher(paginationMode),
            onChange: ({ __paginationHover }) => setSwitcher({ ...switcher, paginationHover: __paginationHover })
        },
        {
            id: 'paginationColor',
            show: !switcher.paginationHover || switcher.paginationHover === 'normal',
            label: __('Normal color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'paginationColor',
                    'selector': `.${elementId} .guten-postlist .guten-block-pagination .guten-block-loadmore, .${elementId} .guten-postlist .guten_block_nav .btn-pagination`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct',
                        }
                    ],
                },
                {
                    'type': 'color',
                    'id': 'paginationColor',
                    'selector': `.${elementId} .guten-postlist .guten-block-pagination .guten-block-loadmore svg, .${elementId} .guten-postlist .guten_block_nav .btn-pagination svg`,
                    'properties': [
                        {
                            'name': 'fill',
                            'valueType': 'direct',
                        }
                    ],
                }
            ]
        },
        {
            id: 'paginationCurrentColor',
            show: switcher.paginationHover === 'current',
            label: __('Active color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'paginationCurrentColor',
                    'selector': `.${elementId} .guten-postlist .guten_block_nav .btn-pagination.current`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct',
                        }
                    ],
                },
                {
                    'type': 'color',
                    'id': 'paginationCurrentColor',
                    'selector': `.${elementId} .guten-postlist .guten_block_nav .btn-pagination.current svg`,
                    'properties': [
                        {
                            'name': 'fill',
                            'valueType': 'direct',
                        }
                    ],
                }
            ]
        },
        {
            id: 'paginationDisabledColor',
            show: switcher.paginationHover === 'disabled',
            label: __('Disabled color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'paginationDisabledColor',
                    'selector': `.${elementId} .guten-postlist .guten_block_nav .btn-pagination.disabled`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct',
                        }
                    ],
                },
                {
                    'type': 'color',
                    'id': 'paginationDisabledColor',
                    'selector': `.${elementId} .guten-postlist .guten_block_nav .btn-pagination.disabled svg`,
                    'properties': [
                        {
                            'name': 'fill',
                            'valueType': 'direct',
                        }
                    ],
                }
            ]
        },
        {
            id: 'paginationHoverColor',
            show: switcher.paginationHover === 'hover',
            label: __('Hover color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'paginationHoverColor',
                    'selector': `.${elementId} .guten-postlist .guten-block-pagination .guten-block-loadmore:hover, .${elementId} .guten-postlist .guten_block_nav .btn-pagination:not(.disabled):not(.current):hover`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct',
                        }
                    ],
                },
                {
                    'type': 'color',
                    'id': 'paginationHoverColor',
                    'selector': `.${elementId} .guten-postlist .guten-block-pagination .guten-block-loadmore:hover svg, .${elementId} .guten-postlist .guten_block_nav .btn-pagination:not(.disabled):not(.current):hover svg`,
                    'properties': [
                        {
                            'name': 'fill',
                            'valueType': 'direct',
                        }
                    ],
                }
            ]
        },
        {
            id: 'paginationBackground',
            show: !switcher.paginationHover || switcher.paginationHover === 'normal',
            label: __('Background', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'paginationBackground',
                    'selector': `.${elementId} .guten-postlist .guten-block-pagination .guten-block-loadmore, .${elementId} .guten-postlist .guten_block_nav .btn-pagination`,
                }
            ]
        },
        {
            id: 'paginationCurrentBackground',
            show: switcher.paginationHover === 'current',
            label: __('Active Background', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'paginationCurrentBackground',
                    'selector': `.${elementId} .guten-postlist .guten_block_nav .btn-pagination.current`,
                }
            ]
        },
        {
            id: 'paginationDisabledBackground',
            show: switcher.paginationHover === 'disabled',
            label: __('Disabled Background', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'paginationDisabledBackground',
                    'selector': `.${elementId} .guten-postlist .guten_block_nav .btn-pagination.disabled`,
                }
            ]
        },
        {
            id: 'paginationHoverBackground',
            show: switcher.paginationHover === 'hover',
            label: __('Hover Background', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'paginationHoverBackground',
                    'selector': `.${elementId} .guten-postlist .guten-block-pagination .guten-block-loadmore:hover, .${elementId} .guten-postlist .guten_block_nav .btn-pagination:not(.disabled):not(.current):hover`,
                }
            ]
        },
        {
            id: 'paginationBorder',
            show: (!switcher.paginationHover || switcher.paginationHover === 'normal') && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'paginationBorder',
                    'selector': `.${elementId} .guten-postlist .guten-block-pagination .guten-block-loadmore, .${elementId} .guten-postlist .guten_block_nav .btn-pagination`,
                }
            ]
        },
        {
            id: 'paginationBorderResponsive',
            show: (!switcher.paginationHover || switcher.paginationHover === 'normal') && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'paginationBorderResponsive',
                    'selector': `.${elementId} .guten-postlist .guten-block-pagination .guten-block-loadmore, .${elementId} .guten-postlist .guten_block_nav .btn-pagination`,
                }
            ]
        },
        {
            id: 'paginationHoverBorder',
            show: switcher.paginationHover === 'hover' && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'paginationHoverBorder',
                    'selector': `.${elementId} .guten-postlist .guten-block-pagination .guten-block-loadmore:hover, .${elementId} .guten-postlist .guten_block_nav .btn-pagination:hover`,
                }
            ]
        },
        {
            id: 'paginationHoverBorderResponsive',
            show: switcher.paginationHover === 'hover' && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'paginationHoverBorderResponsive',
                    'selector': `.${elementId} .guten-postlist .guten-block-pagination .guten-block-loadmore:hover, .${elementId} .guten-postlist .guten_block_nav .btn-pagination:hover`,
                }
            ]
        },
        {
            id: 'paginationShadow',
            show: !switcher.paginationHover || switcher.paginationHover === 'normal',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            liveStyle: [
                {
                    'type': 'boxShadow',
                    'id': 'paginationShadow',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId} .guten-postlist .guten-block-pagination .guten-block-loadmore, .${elementId} .guten-postlist .guten_block_nav .btn-pagination`,
                }
            ]
        },
        {
            id: 'paginationHoverShadow',
            show: switcher.paginationHover === 'hover',
            label: __('Hover Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            liveStyle: [
                {
                    'type': 'boxShadow',
                    'id': 'paginationHoverShadow',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId} .guten-postlist .guten-block-pagination .guten-block-loadmore:hover, .${elementId} .guten-postlist .guten_block_nav .btn-pagination:hover`,
                }
            ]
        },
    ];
};