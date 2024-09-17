import { __ } from '@wordpress/i18n';
import { DimensionControl, RangeControl, SelectControl, BorderResponsiveControl } from 'gutenverse-core/controls';
import { handleDimension, handleBorderResponsive } from 'gutenverse-core/styling';

export const imagePanel = (props) => {
    const {
        elementId,
    } = props;

    return [
        {
            id: 'imageWidth',
            label: __('Width', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            unit: '%',
            min: 1,
            max: 100,
            step: 1,
            style: [
                {
                    selector: `.${elementId} .guten-postlist .guten-post a img`,
                    render: value => `width: ${value}%;`
                }
            ]
        },
        {
            id: 'imageHeight',
            label: __('Height', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            unit: 'px',
            min: 1,
            max: 1000,
            step: 1,
            style: [
                {
                    selector: `.${elementId} .guten-postlist .guten-post a img`,
                    render: value => `height: ${value}px;`
                }
            ]
        },
        {
            id: 'imageFit',
            label: __('Image Fit', 'gutenverse'),
            component: SelectControl,
            allowDeviceControl: true,
            options: [
                {
                    label: 'Default',
                    value: 'default'
                },
                {
                    label: 'Fill',
                    value: 'fill'
                },
                {
                    label: 'Cover',
                    value: 'cover'
                },
                {
                    label: 'Contain',
                    value: 'contain'
                },
            ],
            style: [
                {
                    selector: `.${elementId} .guten-postlist .guten-post a img`,
                    render: value => value !== 'default' ? `object-fit: ${value};` : ''
                }
            ]
        },
        {
            id: 'imageMargin',
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
                    selector: `.${elementId} .guten-postlist .guten-post a img`,
                    render: value => handleDimension(value, 'margin')
                }
            ]
        },
        {
            id: 'imageBorder',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .guten-postlist .guten-post a img`,
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
    ];
};