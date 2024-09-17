import { __ } from '@wordpress/i18n';
import { allowRenderTextShadow, handleColor, handleTypography } from 'gutenverse-core/styling';
import { ColorControl, RangeControl, TextShadowControl, TypographyControl } from 'gutenverse-core/controls';
import { handleTextShadow } from 'gutenverse-core/styling';

export const jobPanel = (props) => {
    const {
        elementId
    } = props;

    return [
        {
            id: 'jobSpace',
            label: __('Text Space', 'gutenverse'),
            component: RangeControl,
            min: 0,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
            style: [
                {
                    selector: `.${elementId} .profile-sub, #${elementId} .profile-sub, .${elementId} .profile-box .profile-card.card-overlay .profile-body .profile-sub`,
                    render: value => `margin-bottom: ${value}px;`
                }
            ]
        },
        {
            id: 'jobColor',
            label: __('Text color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .profile-sub, #${elementId} .profile-sub, .${elementId} .profile-box .profile-card.card-overlay .profile-body .profile-sub,
                            .${elementId} .profile-sub> a, #${elementId} .profile-sub> a, .${elementId} .profile-box .profile-card.card-overlay .profile-body .profile-sub> a`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'jobColorHover',
            label: __('Hover Text Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId}:hover .profile-sub, #${elementId}:hover .profile-sub, .${elementId}:hover .profile-box .profile-card.card-overlay .profile-body .profile-sub,
                            .${elementId}:hover .profile-sub> a, #${elementId}:hover .profile-sub> a, .${elementId}:hover .profile-box .profile-card.card-overlay .profile-body .profile-sub> a`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'jobTypography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} .profile-sub, #${elementId} .profile-sub, .${elementId} .profile-box .profile-card.card-overlay .profile-body .profile-sub,
                            .${elementId} .profile-sub> a, #${elementId} .profile-sub> a, .${elementId} .profile-box .profile-card.card-overlay .profile-body .profile-sub> a`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ],
        },
        {
            id: 'jobTextShadow',
            label: __('Text Shadow', 'gutenverse'),
            component: TextShadowControl,
            style: [
                {
                    selector: `.${elementId} .profile-sub, #${elementId} .profile-sub, .${elementId} .profile-box .profile-card.card-overlay .profile-body .profile-sub`,
                    allowRender: (value) => allowRenderTextShadow(value),
                    render: value => handleTextShadow(value)
                }
            ]
        }
    ];
};

