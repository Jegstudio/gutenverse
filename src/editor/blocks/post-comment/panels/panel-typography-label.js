import { __ } from '@wordpress/i18n';
import { handleColor, handleDimension, handleTypography } from 'gutenverse-core/styling';
import { ColorControl, DimensionControl, TypographyControl } from 'gutenverse-core/controls';

export const labelTypographyPanel = (props) => {
    const {
        elementId
    } = props;

    return [
        {
            id: 'typographyLabel',
            label: __('Label Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} label`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ],
        },
        {
            id: 'colorLabel',
            label: __('Label Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} label`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'colorRequired',
            label: __('Required Indicator Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} label span`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'marginLabel',
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
                    render: value => handleDimension(value, 'margin'),
                    selector: `
                        .${elementId} label,
                        .${elementId} .comment-form-author label,
                        .${elementId} .comment-form-comment label,
                        .${elementId} .comment-form-email label,
                        .${elementId} .comment-form-url label
                    `,
                }
            ]
        },
    ];
};

