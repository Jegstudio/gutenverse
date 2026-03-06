import { __ } from '@wordpress/i18n';
import { BorderControl, BorderResponsiveControl, ColorControl, DimensionControl, RangeControl, SelectControl, SwitchControl, TypographyControl, BackgroundControl, HeadingControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';

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
        },
        {
            id: 'iconColor',
            label: __('Icon Color', 'gutenverse'),
            show: !switcher.textIcon || switcher.textIcon === 'icon',
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'iconColor',
                    'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-button .item-buttons .gallery-link span, .${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .item-caption-over .item-buttons .gallery-link span`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                },
                {
                    'type': 'color',
                    'id': 'iconColor',
                    'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-button .item-buttons .gallery-link span svg, .${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .item-caption-over .item-buttons .gallery-link span svg`,
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
            id: 'iconBg',
            label: __('Icon Background', 'gutenverse'),
            show: !switcher.textIcon || switcher.textIcon === 'icon',
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'iconBg',
                    'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-button .item-buttons .gallery-link span, .${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .item-caption-over .item-buttons .gallery-link span`,
                    'properties': [
                        {
                            'name': 'background',
                            'valueType': 'direct'
                        }
                    ]
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
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'iconSize',
                    'responsive': true,
                    'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-button .item-buttons .gallery-link span, .${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .item-caption-over .item-buttons .gallery-link span`,
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
                    ]
                },
                {
                    'type': 'plain',
                    'id': 'iconSize',
                    'responsive': true,
                    'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-button .item-buttons .gallery-link span svg, .${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .item-caption-over .item-buttons .gallery-link span svg`,
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
                    ]
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
        },
        {
            id: 'iconBorder',
            show: device === 'Desktop' && !switcher.textIcon || switcher.textIcon === 'icon',
            label: __('Icon Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'iconBorder',
                    'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-button .item-buttons .gallery-link span, .${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .item-caption-over .item-buttons .gallery-link span`,
                }
            ]
        },
        {
            id: 'iconBorderResponsive',
            show: device !== 'Desktop' && !switcher.textIcon || switcher.textIcon === 'icon',
            label: __('Icon Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'iconBorderResponsive',
                    'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-button .item-buttons .gallery-link span, .${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .item-caption-over .item-buttons .gallery-link span`,
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
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'iconTextGap',
                    'responsive': true,
                    'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .gallery-link.with-text`,
                    'properties': [
                        {
                            'name': 'gap',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ]
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
        },

        //text zoom style
        {
            id: 'textZoomHeading',
            component: HeadingControl,
            show: switcher.textIcon === 'text',
            label: __('Text Zoom Styles')
        },
        {
            id: 'textZoomTypography',
            label: __('Text Zoom Typography', 'gutenverse'),
            show: switcher.textIcon === 'text',
            component: TypographyControl,
        },
        {
            id: 'textZoomColor',
            label: __('Text Zoom Color', 'gutenverse'),
            show: switcher.textIcon === 'text',
            component: ColorControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'textZoomColor',
                    'responsive': true,
                    'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .gallery-link.with-text.zoom .item-icon-text`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct',
                        }
                    ]
                }
            ]
        },
        {
            id: 'textZoomBackground',
            label: __('Text Zoom Background', 'gutenverse'),
            show: switcher.textIcon === 'text',
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'textZoomBackground',
                    'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .gallery-link.with-text.zoom .item-icon-text`,
                }
            ]
        },
        {
            id: 'textZoomBorder',
            show: switcher.textIcon === 'text',
            label: __('Text Zoom Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'textZoomBorder',
                    'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .gallery-link.with-text.zoom .item-icon-text`,
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
        },

        //text link style
        {
            id: 'textLinkHeading',
            component: HeadingControl,
            show: switcher.textIcon === 'text',
            label: __('Text Link Styles')
        },
        {
            id: 'textLinkTypography',
            label: __('Text Link Typography', 'gutenverse'),
            show: switcher.textIcon === 'text',
            component: TypographyControl,
        },
        {
            id: 'textLinkColor',
            label: __('Text Link Color', 'gutenverse'),
            show: switcher.textIcon === 'text',
            component: ColorControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'textLinkColor',
                    'responsive': true,
                    'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .gallery-link.with-text.link .item-icon-text`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct',
                        }
                    ]
                }
            ]
        },
        {
            id: 'textLinkBackground',
            label: __('Text Link Background', 'gutenverse'),
            show: switcher.textIcon === 'text',
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'textLinkBackground',
                    'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .gallery-link.with-text.link .item-icon-text`,
                }
            ]
        },
        {
            id: 'textLinkBorder',
            show: switcher.textIcon === 'text',
            label: __('Text Link Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'textLinkBorder',
                    'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .gallery-link.with-text.link .item-icon-text`,
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
        },

    ];
};