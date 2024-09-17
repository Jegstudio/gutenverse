import { __ } from '@wordpress/i18n';
import { allowRenderTextShadow, handleColor, handleTypography } from 'gutenverse-core/styling';
import { ColorControl, RangeControl, TextShadowControl, TypographyControl } from 'gutenverse-core/controls';
import { handleTextShadow } from 'gutenverse-core/styling';

export const namePanel = (props) => {
    const {
        elementId
    } = props;

    return [
        {
            id: 'nameSpace',
            label: __('Text Space', 'gutenverse'),
            component: RangeControl,
            min: 0,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
            style: [
                {
                    selector: `.${elementId} .profile-title, #${elementId} .profile-title, .${elementId} .profile-box .profile-card.card-overlay .profile-body .profile-title`,
                    render: value => `margin-bottom: ${value}px;`
                }
            ]
        },
        {
            id: 'nameColor',
            label: __('Text color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .profile-title, #${elementId} .profile-title, .${elementId} .profile-box .profile-card.card-overlay .profile-body .profile-title,
                            .${elementId} .profile-title> a, #${elementId} .profile-title> a, .${elementId} .profile-box .profile-card.card-overlay .profile-body .profile-title> a`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'nameColorHover',
            label: __('Hover Text Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId}:hover .profile-title, #${elementId}:hover .profile-title, .${elementId}:hover .profile-box .profile-card.card-overlay .profile-body .profile-title,
                            .${elementId}:hover .profile-title> a, #${elementId}:hover .profile-title> a, .${elementId}:hover .profile-box .profile-card.card-overlay .profile-body .profile-title> a`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'nameTypography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} .profile-title, #${elementId} .profile-title, .${elementId} .profile-box .profile-card.card-overlay .profile-body .profile-title,
                            .${elementId} .profile-title> a, #${elementId} .profile-title> a, .${elementId} .profile-box .profile-card.card-overlay .profile-body .profile-title> a`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ],
        },
        {
            id: 'nameTextShadow',
            label: __('Text Shadow', 'gutenverse'),
            component: TextShadowControl,
            style: [
                {
                    selector: `.${elementId} .profile-title, #${elementId} .profile-title, .${elementId} .profile-box .profile-card.card-overlay .profile-body .profile-title`,
                    allowRender: (value) => allowRenderTextShadow(value),
                    render: value => handleTextShadow(value)
                }
            ]
        }
    ];
};

