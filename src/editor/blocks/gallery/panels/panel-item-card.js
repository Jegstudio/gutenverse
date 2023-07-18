import { __ } from '@wordpress/i18n';

import { AlignCenter, AlignLeft, AlignRight } from 'react-feather';
import { BackgroundControl, BorderControl, ColorControl, DimensionControl, HeadingControl, IconRadioControl, TypographyControl } from 'gutenverse-core/controls';
import { handleBackground, handleBorder, handleColor, handleDimension, handleTypography } from 'gutenverse-core/styling';

export const itemCardPanel = (props) => {
    const {
        elementId
    } = props;

    return [
        {
            id: 'itemCardBackground',
            component: BackgroundControl,
            allowDeviceControl: true,
            options: [ 'default', 'gradient' ],
            style: [
                {
                    selector: `.${elementId} .gallery-items .gallery-item-wrap .grid-item .caption-wrap.style-card`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'submenuSplitter',
            component: HeadingControl,
        },
        {
            id: 'itemCardPadding',
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
                ['%']: {
                    text: '%',
                    unit: '%'
                },
            },
            style: [
                {
                    selector: `.${elementId} .gallery-items .gallery-item-wrap .grid-item .caption-wrap.style-card`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: 'itemCardBorder',
            label: __('Border Type', 'gutenverse'),
            component: BorderControl,
            style: [
                {
                    selector: `.${elementId} .gallery-items .gallery-item-wrap .grid-item .caption-wrap.style-card`,
                    hasChild: true,
                    render: value => handleBorder(value)
                }
            ]
        },
        {
            id: 'itemCardAlign',
            label: __('Alignment', 'gutenverse'),
            component: IconRadioControl,
            allowDeviceControl: true,
            options: [
                {
                    label: __('Align Left', 'gutenverse'),
                    value: 'left',
                    icon: <AlignLeft/>,
                },
                {
                    label: __('Align Center', 'gutenverse'),
                    value: 'center',
                    icon: <AlignCenter/>,
                },
                {
                    label: __('Align Right', 'gutenverse'),
                    value: 'right',
                    icon: <AlignRight/>,
                },
            ],
            style: [
                {
                    selector: `.${elementId} .gallery-items .gallery-item-wrap .grid-item .caption-wrap.style-card`,
                    render: value => `text-align: ${value};`
                }
            ]
        },
        {
            id: 'submenuSplitter',
            component: HeadingControl,
            label: __('Title Typography')
        },
        {
            id: 'itemCardTitleColor',
            label: __('Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .gallery-items .gallery-item-wrap .grid-item .caption-wrap.style-card .item-caption-over .item-title`,
                    render: value => handleColor(value, 'color')
                }
            ],
        },
        {
            id: 'itemCardTitleColorHover',
            label: __('Hover Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .gallery-items .gallery-item-wrap .grid-item .caption-wrap.style-card:hover .item-caption-over .item-title`,
                    render: value => handleColor(value, 'color')
                }
            ],
        },
        {
            id: 'itemCardTitleTypography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} .gallery-items .gallery-item-wrap .grid-item .caption-wrap.style-card .item-caption-over .item-title`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ],
        },
        {
            id: 'submenuSplitter',
            component: HeadingControl,
            label: __('Content Typography')
        },
        {
            id: 'itemCardContentColor',
            label: __('Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .gallery-items .gallery-item-wrap .grid-item .caption-wrap.style-card .item-caption-over .item-content`,
                    render: value => handleColor(value, 'color')
                }
            ],
        },
        {
            id: 'itemCardContentColorHover',
            label: __('Hover Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .gallery-items .gallery-item-wrap .grid-item .caption-wrap.style-card:hover .item-caption-over .item-content`,
                    render: value => handleColor(value, 'color')
                }
            ],
        },
        {
            id: 'itemCardContentTypography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} .gallery-items .gallery-item-wrap .grid-item .caption-wrap.style-card .item-caption-over .item-content`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ],
        },
    ];
};