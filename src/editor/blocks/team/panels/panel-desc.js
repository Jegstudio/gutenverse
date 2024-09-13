import { __ } from '@wordpress/i18n';
import { allowRenderTextShadow, handleColor, handleTypography } from 'gutenverse-core/styling';
import { ColorControl, RangeControl, TextShadowControl, TypographyControl } from 'gutenverse-core/controls';
import { handleTextShadow } from 'gutenverse-core/styling';

export const descPanel = (props) => {
    const {
        elementId
    } = props;

    return [
        {
            id: 'descSpace',
            label: __('Text Space', 'gutenverse'),
            component: RangeControl,
            min: 0,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
            style: [
                {
                    selector: `.${elementId} .profile-desc, #${elementId} .profile-desc, #${elementId} .profile-phone, #${elementId} .profile-email, .${elementId} .profile-box .profile-card.card-overlay .profile-body .profile-desc`,
                    render: value => `margin-bottom: ${value}px;`
                }
            ]
        },
        {
            id: 'descColor',
            label: __('Text color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .profile-desc, #${elementId} .profile-desc, #${elementId} .profile-phone, #${elementId} .profile-email, .${elementId} .profile-box .profile-card.card-overlay .profile-body .profile-desc,
                            .${elementId} .profile-desc> a, #${elementId} .profile-desc> a, #${elementId} .profile-phone> a, #${elementId} .profile-email> a, .${elementId} .profile-box .profile-card.card-overlay .profile-body .profile-desc> a`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'descColorHover',
            label: __('Hover Text Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId}:hover .profile-desc, #${elementId}:hover .profile-desc, #${elementId}:hover .profile-phone, #${elementId}:hover .profile-email, .${elementId}:hover .profile-box .profile-card.card-overlay .profile-body .profile-desc,
                            .${elementId}:hover .profile-desc> a, #${elementId}:hover .profile-desc> a, #${elementId}:hover .profile-phone> a, #${elementId}:hover .profile-email> a, .${elementId}:hover .profile-box .profile-card.card-overlay .profile-body .profile-desc> a`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'descTypography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} .profile-desc, #${elementId} .profile-desc, #${elementId} .profile-phone, #${elementId} .profile-email, .${elementId} .profile-box .profile-card.card-overlay .profile-body .profile-desc,
                            .${elementId} .profile-desc> a, #${elementId} .profile-desc> a, #${elementId} .profile-phone> a, #${elementId} .profile-email> a, .${elementId} .profile-box .profile-card.card-overlay .profile-body .profile-desc> a`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ],
        },
        {
            id: 'descTextShadow',
            label: __('Text Shadow', 'gutenverse'),
            component: TextShadowControl,
            style: [
                {
                    selector: `.${elementId} .profile-desc, #${elementId} .profile-desc, #${elementId} .profile-phone, #${elementId} .profile-email, .${elementId} .profile-box .profile-card.card-overlay .profile-body .profile-desc,
                            .${elementId} .profile-desc> a, #${elementId} .profile-desc> a, #${elementId} .profile-phone> a, #${elementId} .profile-email> a, .${elementId} .profile-box .profile-card.card-overlay .profile-body .profile-desc> a`,
                    allowRender: (value) => allowRenderTextShadow(value),
                    render: value => handleTextShadow(value)
                }
            ]
        }
    ];
};

