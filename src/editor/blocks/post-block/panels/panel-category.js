import { __ } from '@wordpress/i18n';
import { BorderControl, BoxShadowControl, ColorControl, DimensionControl, TypographyControl } from 'gutenverse-core/controls';
import { allowRenderBoxShadow, handleBorderResponsive, handleColor, handleDimension, handleTypography } from 'gutenverse-core/styling';
import { handleBoxShadow } from 'gutenverse-core/styling';

export const categoryPanel = (props) => {
    const {
        elementId
    } = props;

    return [
        {
            id: 'categoryColor',
            label: __('Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .guten-postblock .guten-post-category a`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'categoryTypography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} .guten-postblock .guten-post-category a`,
                    hasChild: true,
                    render: (value, id) => handleTypography(value, props, id)
                }
            ]
        },
        {
            id: 'categoryBackground',
            label: __('Background', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .guten-postblock .guten-post-category`,
                    render: value => handleColor(value, 'background')
                }
            ]
        },
        {
            id: 'categoryMargin',
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
                    selector: `.${elementId} .guten-postblock .guten-post-category`,
                    render: value => handleDimension(value, 'margin')
                }
            ]
        },
        {
            id: 'categoryPadding',
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
                    selector: `.${elementId} .guten-postblock .guten-post-category`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: 'categoryBorder_v2',
            label: __('Border Type', 'gutenverse'),
            component: BorderControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .guten-postblock .guten-post-category`,
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
        {
            id: 'categoryShadow',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.${elementId} .guten-postblock .guten-post-category`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        },
    ];
};