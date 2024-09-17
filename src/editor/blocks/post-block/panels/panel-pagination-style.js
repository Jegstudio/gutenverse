import { __ } from '@wordpress/i18n';

import { AlignCenter, AlignLeft, AlignRight, AlignJustify } from 'gutenverse-core/components';
import { BackgroundControl, BorderControl, BorderResponsiveControl, BoxShadowControl, ColorControl, DimensionControl, IconRadioControl, RangeControl, SizeControl, SwitchControl, TypographyControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { allowRenderBoxShadow, handleBackground, handleBorder, handleBorderResponsive, handleColor, handleDimension, handleTypography, handleUnitPoint } from 'gutenverse-core/styling';
import { handleBoxShadow } from 'gutenverse-core/styling';

export const paginationStylePanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher,
        paginationMode,
    } = props;

    const device = getDeviceType();

    return [
        {
            id: 'navigationAlign',
            label: __('Alignment', 'gutenverse'),
            allowDeviceControl: true,
            show: 'prevnext' === paginationMode,
            component: IconRadioControl,
            options: [
                {
                    label: __('Left', 'gutenverse'),
                    value: 'left',
                    icon: <AlignLeft/>,
                },
                {
                    label: __('Center', 'gutenverse'),
                    value: 'center',
                    icon: <AlignCenter/>,
                },
                {
                    label: __('Right', 'gutenverse'),
                    value: 'right',
                    icon: <AlignRight/>,
                },
                {
                    label: __('Edge', 'gutenverse'),
                    value: 'space-between',
                    icon: <AlignJustify/>,
                },
            ],
            style: [
                {
                    selector: `.${elementId} .guten-postblock.guten-pagination-prevnext .guten_block_nav`,
                    render: value => `justify-content: ${value};`
                }
            ]
        },
        {
            id: 'paginationTypography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} .guten-postblock .guten-block-pagination .guten-block-loadmore span, .${elementId} .guten-postblock .guten_block_nav .btn-pagination`,
                    hasChild: true,
                    render: (value, id) => handleTypography(value, props, id)
                }
            ]
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
            style: [
                {
                    selector: `.${elementId} .guten-postblock .guten-block-pagination .guten-block-loadmore, .${elementId} .guten-postblock .guten_block_nav`,
                    render: value => handleDimension(value, 'margin')
                }
            ]
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
            style: [
                {
                    selector: `.${elementId} .guten-postblock .guten-block-pagination .guten-block-loadmore, .${elementId} .guten-postblock .guten_block_nav .btn-pagination`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: 'numberGap',
            label: __('Number Gap', 'gutenverse'),
            show: 'number' === paginationMode,
            component: RangeControl,
            min: 0,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
            style: [
                {
                    selector: `.${elementId} .guten-postblock.guten-pagination-number  .guten_block_nav`,
                    render: value => `gap: ${value}px;`
                }
            ]
        },
        {
            id: 'paginationWidth',
            label: 'number' === paginationMode ? __('Number Width', 'gutenverse') : __('Width', 'gutenverse'),
            show: 'prevnext' !== paginationMode,
            component: SizeControl,
            min: 1,
            max: 500,
            step: 1,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 500,
                    step: 1
                },
                ['%']: {
                    text: '%',
                    min: 1,
                    max: 100,
                    step: 1
                },
            },
            style: [
                {
                    selector: `.${elementId} .guten-postblock .guten-block-pagination .guten-block-loadmore, .${elementId} .guten-postblock:not(.guten-pagination-prevnext) .guten_block_nav .btn-pagination:not(.next):not(.prev)`,
                    render: value => handleUnitPoint(value, 'width')
                },
            ],
        },
        {
            id: 'paginationNavigationWidth',
            label: 'prevnext' === paginationMode ? __('Width', 'gutenverse') : __('Navigation Width', 'gutenverse'),
            show: 'number' === paginationMode || 'prevnext' === paginationMode,
            component: SizeControl,
            min: 1,
            max: 500,
            step: 1,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 500,
                    step: 1
                },
                ['%']: {
                    text: '%',
                    min: 1,
                    max: 100,
                    step: 1
                },
            },
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .guten-postblock.guten-pagination-prevnext .guten_block_nav .btn-pagination.next, .${elementId} .guten-postblock.guten-pagination-prevnext .guten_block_nav .btn-pagination.prev,
                        .${elementId} .guten-postblock.guten-pagination-number .guten_block_nav .btn-pagination.next, .${elementId} .guten-postblock.guten-pagination-number .guten_block_nav .btn-pagination.prev`,
                    render: value => handleUnitPoint(value, 'width')
                },
            ],
        },
        {
            id: 'paginationHeight',
            label: __('Number Height', 'gutenverse'),
            show: 'number' === paginationMode,
            component: RangeControl,
            min: 1,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
            style: [
                {
                    selector: `.${elementId} .guten-postblock.guten-pagination-number .guten_block_nav .btn-pagination:not(.next):not(.prev), .${elementId} .guten-postblock.guten-pagination-number .guten_block_nav span`,
                    allowRender: () => 'number' === paginationMode,
                    render: value => `line-height: ${value}px;`
                },
            ],
        },
        {
            id: 'paginationNavigationHeight',
            label: __('Navigation Height', 'gutenverse'),
            show: 'number' === paginationMode,
            component: RangeControl,
            min: 1,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
            style: [
                {
                    selector: `.${elementId} .guten-postblock.guten-pagination-number .guten_block_nav .btn-pagination.next, .${elementId} .guten-postblock.guten-pagination-number .guten_block_nav .btn-pagination.prev`,
                    render: value => `line-height: ${value}px;`
                },
            ],
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
            style: [
                {
                    selector: `.${elementId} .guten-postblock .guten-block-pagination .guten-block-loadmore.icon-position-before i, .${elementId} .guten-postblock .guten_block_nav .btn-pagination.prev i`,
                    render: value => `margin-right: ${value}px;`
                },
                {
                    selector: `.${elementId} .guten-postblock .guten-block-pagination .guten-block-loadmore.icon-position-after i, .${elementId} .guten-postblock .guten_block_nav .btn-pagination.next i`,
                    render: value => `margin-left: ${value}px;`
                }
            ],
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
            style: [
                {
                    selector: `.${elementId} .guten-postblock .guten-block-pagination .guten-block-loadmore.icon-position-before i, .${elementId} .guten-postblock .guten_block_nav .btn-pagination.prev i`,
                    render: value => handleUnitPoint(value, 'font-size')
                },
                {
                    selector: `.${elementId} .guten-postblock .guten-block-pagination .guten-block-loadmore.icon-position-after i, .${elementId} .guten-postblock .guten_block_nav .btn-pagination.next i`,
                    render: value => handleUnitPoint(value, 'font-size')
                },
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
            style: [
                {
                    selector: `.${elementId} .guten-postblock .guten-block-pagination,  .${elementId} .guten-postblock .guten_block_nav`,
                    render: value => `text-align: ${value};`
                }
            ]
        },
        {
            id: '__paginationHover',
            component: SwitchControl,
            options: (() => {
                if ('prevnext' === paginationMode) {
                    return [
                        {
                            value: 'normal',
                            label: 'Normal'
                        },
                        {
                            value: 'hover',
                            label: 'Hover'
                        },
                        {
                            value: 'disabled',
                            label: 'Disabled'
                        }
                    ];
                } else if ('number' === paginationMode) {
                    return [
                        {
                            value: 'normal',
                            label: 'Normal'
                        },
                        {
                            value: 'hover',
                            label: 'Hover'
                        },
                        {
                            value: 'current',
                            label: 'Active'
                        }
                    ];
                } else {
                    return [
                        {
                            value: 'normal',
                            label: 'Normal'
                        },
                        {
                            value: 'hover',
                            label: 'Hover'
                        }
                    ];
                }
            })(),
            onChange: ({ __paginationHover }) => setSwitcher({ ...switcher, paginationHover: __paginationHover })
        },
        {
            id: 'paginationColor',
            show: !switcher.paginationHover || switcher.paginationHover === 'normal',
            label: __('Normal color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .guten-postblock .guten-block-pagination .guten-block-loadmore, .${elementId} .guten-postblock .guten_block_nav .btn-pagination`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'paginationCurrentColor',
            show: !switcher.paginationHover || switcher.paginationHover === 'current',
            label: __('Active color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .guten-postblock .guten_block_nav .btn-pagination.current`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'paginationDisabledColor',
            show: !switcher.paginationHover || switcher.paginationHover === 'disabled',
            label: __('Disabled color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .guten-postblock .guten_block_nav .btn-pagination.disabled`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'paginationHoverColor',
            show: switcher.paginationHover === 'hover',
            label: __('Hover color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .guten-postblock .guten-block-pagination .guten-block-loadmore:hover, .${elementId} .guten-postblock .guten_block_nav .btn-pagination:not(.disabled):not(.current):hover`,
                    render: value => handleColor(value, 'color')
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
            style: [
                {
                    selector: `.${elementId} .guten-postblock .guten-block-pagination .guten-block-loadmore, .${elementId} .guten-postblock .guten_block_nav .btn-pagination`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'paginationCurrentBackground',
            show: !switcher.paginationHover || switcher.paginationHover === 'current',
            label: __('Active Background', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId} .guten-postblock .guten_block_nav .btn-pagination.current`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'paginationDisabledBackground',
            show: !switcher.paginationHover || switcher.paginationHover === 'disabled',
            label: __('Disabled Background', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId} .guten-postblock .guten_block_nav .btn-pagination.disabled`,
                    hasChild: true,
                    render: value => handleBackground(value)
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
            style: [
                {
                    selector: `.${elementId} .guten-postblock .guten-block-pagination .guten-block-loadmore:hover, .${elementId} .guten-postblock .guten_block_nav .btn-pagination:not(.disabled):not(.current):hover`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'paginationBorder',
            show: (!switcher.paginationHover || switcher.paginationHover === 'normal') && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            style: [
                {
                    selector: `.${elementId} .guten-postblock .guten-block-pagination .guten-block-loadmore, .${elementId} .guten-postblock .guten_block_nav .btn-pagination`,
                    hasChild: true,
                    render: value => handleBorder(value)
                }
            ]
        },
        {
            id: 'paginationBorderResponsive',
            show: (!switcher.paginationHover || switcher.paginationHover === 'normal') && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .guten-postblock .guten-block-pagination .guten-block-loadmore, .${elementId} .guten-postblock .guten_block_nav .btn-pagination`,
                    allowRender: () => device !== 'Desktop',
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
        {
            id: 'paginationHoverBorder',
            show: switcher.paginationHover === 'hover' && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            style: [
                {
                    selector: `.${elementId} .guten-postblock .guten-block-pagination .guten-block-loadmore:hover, .${elementId} .guten-postblock .guten_block_nav .btn-pagination:hover`,
                    hasChild: true,
                    render: value => handleBorder(value)
                }
            ]
        },
        {
            id: 'paginationHoverBorderResponsive',
            show: switcher.paginationHover === 'hover' && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .guten-postblock .guten-block-pagination .guten-block-loadmore:hover, .${elementId} .guten-postblock .guten_block_nav .btn-pagination:hover`,
                    allowRender: () => device !== 'Desktop',
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
        {
            id: 'paginationShadow',
            show: !switcher.paginationHover || switcher.paginationHover === 'normal',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.${elementId} .guten-postblock .guten-block-pagination .guten-block-loadmore, .${elementId} .guten-postblock .guten_block_nav .btn-pagination`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        },
        {
            id: 'paginationHoverShadow',
            show: switcher.paginationHover === 'hover',
            label: __('Hover Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.${elementId} .guten-postblock .guten-block-pagination .guten-block-loadmore:hover, .${elementId} .guten-postblock .guten_block_nav .btn-pagination:hover`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        },
    ];
};