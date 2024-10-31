import { __ } from '@wordpress/i18n';
import { BorderControl, BorderResponsiveControl, ColorControl, DimensionControl, RangeControl, SelectControl, SwitchControl, TypographyControl, BackgroundControl, HeadingControl } from 'gutenverse-core/controls';
import { getDeviceType, isEmptyValue } from 'gutenverse-core/editor-helper';
import { handleBorder, handleBorderResponsive, handleColor, handleDimension, handleTypography, handleBackground } from 'gutenverse-core/styling';

export const iconPanel = (props) => {
    const device = getDeviceType();
    const { 
        elementId, 
        selectionIconPadding, 
        switcher,
        setSwitcher 
    } = props;
    return [
        {
            id: '__textIcon',
            component: SwitchControl,
            options: [
                {
                    value: 'icon',
                    label: 'Icon'
                },
                {
                    value: 'text',
                    label: 'Text'
                }
            ],
            onChange: ({ __textIcon }) => setSwitcher({ ...switcher, textIcon: __textIcon })
        },
        {
            id: 'iconWrapperMargin',
            label: __('Wrapper Margin', 'gutenverse'),
            show: !switcher.textIcon || switcher.textIcon === 'icon',
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
                rem: {
                    text: 'rem',
                    unit: 'rem'
                },
            },
            style: [
                {
                    selector: `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .item-buttons`,
                    render: value => handleDimension(value, 'margin')
                }
            ]
        },
        {
            id: 'iconBg',
            label: __('Icon Background', 'gutenverse'),
            show: !switcher.textIcon || switcher.textIcon === 'icon',
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-button .item-buttons .gallery-link span,
                    .${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .item-caption-over .item-buttons .gallery-link span`,
                    render: value => handleColor(value, 'background')
                }
            ]
        },
        {
            id: 'iconColor',
            label: __('Icon Color', 'gutenverse'),
            show: !switcher.textIcon || switcher.textIcon === 'icon',
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-button .item-buttons .gallery-link span,
                    .${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .item-caption-over .item-buttons .gallery-link span`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'iconSize',
            label: __('Icon Size', 'gutenverse'),
            show: !switcher.textIcon || switcher.textIcon === 'icon',
            component: RangeControl,
            min: 0,
            max: 300,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
            style: [
                {
                    selector: `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-button .item-buttons .gallery-link span,
                    .${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .item-caption-over .item-buttons .gallery-link span`,
                    render: value => `font-size: ${value}px`
                }
            ]
        },
        {
            id: 'selectionIconPadding',
            label: __('Select Setting Icon Padding', 'gutenverse'),
            show: !switcher.textIcon || switcher.textIcon === 'icon',
            component: SelectControl,
            options: [
                {
                    value: 'all',
                    label: __('All in One')
                },
                {
                    value: 'custom',
                    label: __('Custom')
                },
            ],
        },
        {
            id: 'zoomIconPadding',
            label: __('Zoom Icon Padding', 'gutenverse'),
            component: DimensionControl,
            allowDeviceControl: true,
            show: selectionIconPadding === 'custom' && !switcher.textIcon || switcher.textIcon === 'icon',
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
                rem: {
                    text: 'rem',
                    unit: 'rem'
                },
            },
            style: [
                {
                    selector: `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-button .item-buttons .gallery-link.zoom span,
                    .${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .item-caption-over .item-buttons .gallery-link.zoom span`,
                    allowRender: () => selectionIconPadding === 'custom',
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: 'linkIconPadding',
            label: __('Link Icon Padding', 'gutenverse'),
            component: DimensionControl,
            allowDeviceControl: true,
            show: selectionIconPadding === 'custom' && !switcher.textIcon || switcher.textIcon === 'icon',
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
                rem: {
                    text: 'rem',
                    unit: 'rem'
                },
            },
            style: [
                {
                    selector: `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-button .item-buttons .gallery-link.link span,
                    .${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .item-caption-over .item-buttons .gallery-link.link span`,
                    allowRender: () => selectionIconPadding === 'custom',
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: 'iconPadding',
            label: __('Icon Padding', 'gutenverse'),
            component: DimensionControl,
            allowDeviceControl: true,
            show: selectionIconPadding === 'all' && !switcher.textIcon || switcher.textIcon === 'icon',
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
                rem: {
                    text: 'rem',
                    unit: 'rem'
                },
            },
            style: [
                {
                    selector: `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-button .item-buttons .gallery-link span,
                    .${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .item-caption-over .item-buttons .gallery-link span`,
                    allowRender: () => selectionIconPadding === 'all',
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: 'iconBorder',
            show: device === 'Desktop' && !switcher.textIcon || switcher.textIcon === 'icon',
            label: __('Icon Border', 'gutenverse'),
            component: BorderControl,
            style: [
                {
                    selector: `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-button .item-buttons .gallery-link span,
                    .${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .item-caption-over .item-buttons .gallery-link span`,
                    hasChild: true,
                    render: value => handleBorder(value)
                }
            ]
        },
        {
            id: 'iconBorderResponsive',
            show: device !== 'Desktop' && !switcher.textIcon || switcher.textIcon === 'icon',
            label: __('Icon Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-button .item-buttons .gallery-link span,
                    .${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .item-caption-over .item-buttons .gallery-link span`,
                    allowRender: () => device !== 'Desktop',
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
        {
            id: 'iconTextGap',
            label: __('Icon Text Gap', 'gutenverse'),
            show: switcher.textIcon === 'text',
            component: RangeControl,
            allowDeviceControl: true,
            unit: 'px',
            min: 0,
            max: 100,
            step: 1,
            style: [
                {
                    selector: `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .gallery-link.with-text`,
                    render: value => `gap: ${value}px;`
                }
            ]
        },
        {
            id: 'iconTextPosition',
            label: __('Text Position', 'gutenverse'),
            show: switcher.textIcon === 'text',
            component: SelectControl,
            allowDeviceControl: true,
            options: [
                {
                    value: 'column',
                    label: __('Top')
                },
                {
                    value: 'column-reverse',
                    label: __('Bottom')
                },
                {
                    value: 'row',
                    label: __('Left')
                },
                {
                    value: 'row-reverse',
                    label: __('Right')
                },
            ],
            style: [
                {
                    selector: `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .gallery-link.with-text`,
                    render: value => `flex-direction: ${value};`
                }
            ]
        },

        //text zoom style
        {
            id: 'textZoomHeading',
            component: HeadingControl,
            label: __('Text Zoom Styles')
        },
        {
            id: 'textZoomTypography',
            label: __('Text Zoom Typography', 'gutenverse'),
            show: switcher.textIcon === 'text',
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .gallery-link.with-text.zoom .item-icon-text`,
                    hasChild: true,
                    render: (value, id) => handleTypography(value, props, id)
                }
            ],
        },
        {
            id: 'textZoomColor',
            label: __('Text Zoom Color', 'gutenverse'),
            show: switcher.textIcon === 'text',
            component: ColorControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .gallery-link.with-text.zoom .item-icon-text`,
                    render: value => handleColor(value, 'color')
                }
            ],
        },
        {
            id: 'textZoomBackground',
            label: __('Text Zoom Background', 'gutenverse'),
            show: switcher.textIcon === 'text',
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .gallery-link.with-text.zoom .item-icon-text`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'textZoomBorder',
            show: switcher.textIcon === 'text',
            label: __('Text Zoom Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .gallery-link.with-text.zoom .item-icon-text`,
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
        {
            id: 'textZoomMargin',
            label: __('Text Zoom Margin', 'gutenverse'),
            show: switcher.textIcon === 'text',
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
                rem: {
                    text: 'rem',
                    unit: 'rem'
                },
            },
            style: [
                {
                    selector: `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .gallery-link.with-text.zoom .item-icon-text`,
                    render: value => handleDimension(value, 'margin')
                }
            ]
        },
        {
            id: 'textZoomPadding',
            label: __('Text Zoom Padding', 'gutenverse'),
            component: DimensionControl,
            allowDeviceControl: true,
            show: switcher.textIcon === 'text',
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
                rem: {
                    text: 'rem',
                    unit: 'rem'
                },
            },
            style: [
                {
                    selector: `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .gallery-link.with-text.zoom .item-icon-text`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },

        //text link style
        {
            id: 'textLinkHeading',
            component: HeadingControl,
            label: __('Text Link Styles')
        },
        {
            id: 'textLinkTypography',
            label: __('Text Link Typography', 'gutenverse'),
            show: switcher.textIcon === 'text',
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .gallery-link.with-text.link .item-icon-text`,
                    hasChild: true,
                    render: (value, id) => handleTypography(value, props, id)
                }
            ],
        },
        {
            id: 'textLinkColor',
            label: __('Text Link Color', 'gutenverse'),
            show: switcher.textIcon === 'text',
            component: ColorControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .gallery-link.with-text.link .item-icon-text`,
                    render: value => handleColor(value, 'color')
                }
            ],
        },
        {
            id: 'textLinkBackground',
            label: __('Text Link Background', 'gutenverse'),
            show: switcher.textIcon === 'text',
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .gallery-link.with-text.link .item-icon-text`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'textLinkBorder',
            show: switcher.textIcon === 'text',
            label: __('Text Link Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .gallery-link.with-text.link .item-icon-text`,
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
        {
            id: 'textLinkMargin',
            label: __('Text Link Margin', 'gutenverse'),
            show: switcher.textIcon === 'text',
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
                rem: {
                    text: 'rem',
                    unit: 'rem'
                },
            },
            style: [
                {
                    selector: `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .gallery-link.with-text.link .item-icon-text`,
                    render: value => handleDimension(value, 'margin')
                }
            ]
        },
        {
            id: 'textLinkPadding',
            label: __('Text Link Padding', 'gutenverse'),
            component: DimensionControl,
            allowDeviceControl: true,
            show: switcher.textIcon === 'text',
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
                rem: {
                    text: 'rem',
                    unit: 'rem'
                },
            },
            style: [
                {
                    selector: `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .gallery-link.with-text.link .item-icon-text`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },

    ];
};