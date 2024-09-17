import { __ } from '@wordpress/i18n';
import { handleColor, handleDimension, handleTypography } from 'gutenverse-core/styling';
import { ColorControl, DimensionControl, TypographyControl } from 'gutenverse-core/controls';

export const textTypographyPanel = (props) => {
    const {
        elementId
    } = props;

    return [
        {
            id: 'typographyText',
            label: __('Text Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} p`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ],
        },
        {
            id: 'colorText',
            label: __('Text Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} p`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'marginText',
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
                rem: {
                    text: 'rem',
                    unit: 'rem'
                },
            },
            style: [
                {
                    selector: `.${elementId} p`,
                    render: value => handleDimension(value, 'margin')
                }
            ]
        },
    ];
};

