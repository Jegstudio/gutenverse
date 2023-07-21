import { __ } from '@wordpress/i18n';
import { BorderControl, BoxShadowControl, DimensionControl, RangeControl } from 'gutenverse-core/controls';
import { allowRenderBoxShadow, handleBorder, handleDimension } from 'gutenverse-core/styling';
import { handleBoxShadow } from 'gutenverse-core/styling';

export const thumbnailPanel = ({elementId}) => {
    return [
        {
            id: 'thumbnailWidth',
            label: __('Width', 'gutenverse'),
            component: RangeControl,
            min: 0,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .guten-postblock:not(.postblock-type-5) .guten-thumb, .${elementId} .guten-postblock.postblock-type-5 .guten-post`,
                    render: value => `width: ${value}%; flex-basis: ${value}%;`
                }
            ]
        },
        {
            id: 'thumbnailMargin',
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
                    selector: `.${elementId} .guten-postblock .guten-thumb`,
                    render: value => handleDimension(value, 'margin')
                }
            ]
        },
        {
            id: 'thumbnailPadding',
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
                    selector: `.${elementId} .guten-postblock .guten-thumb`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: 'thumbnailBorder',
            label: __('Border Type', 'gutenverse'),
            component: BorderControl,
            style: [
                {
                    selector: `.${elementId} .guten-postblock .guten-thumb`,
                    hasChild: true,
                    render: value => handleBorder(value)
                }
            ]
        },
        {
            id: 'thumbnailBoxShadow',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.${elementId} .guten-postblock .guten-thumb`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        },
    ];
};