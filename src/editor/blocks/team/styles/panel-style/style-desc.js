import { isNotEmpty } from 'gutenverse-core/helper';

const descStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['descSpace']) && data.push({
        'type': 'plain',
        'id': 'descSpace',
        'responsive': true,
        'selector': `.${elementId} .profile-desc, #${elementId} .profile-desc, #${elementId} .profile-phone, #${elementId} .profile-email, .${elementId} .profile-box .profile-card.card-overlay .profile-body .profile-desc`,
        'properties': [
            {
                'name': 'margin-bottom',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct'
                    }
                }
            }
        ]
    });

    isNotEmpty(attributes['descColor']) && data.push({
        'type': 'color',
        'id': 'descColor',
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .profile-desc, #${elementId} .profile-desc, #${elementId} .profile-phone, #${elementId} .profile-email, .${elementId} .profile-box .profile-card.card-overlay .profile-body .profile-desc, .${elementId} .profile-box .profile-card.card-title-social-horizontal .profile-body .profile-desc,
                    .${elementId} .profile-desc> a, #${elementId} .profile-desc> a, #${elementId} .profile-phone> a, #${elementId} .profile-email> a, .${elementId} .profile-box .profile-card.card-overlay .profile-body .profile-desc> a, .${elementId} .profile-box .profile-card.card-title-social-horizontal .profile-body .profile-desc> a`,
    });

    isNotEmpty(attributes['descColorHover']) && data.push({
        'type': 'color',
        'id': 'descColorHover',
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}:hover .profile-desc, #${elementId}:hover .profile-desc, #${elementId}:hover .profile-phone, #${elementId}:hover .profile-email, .${elementId}:hover .profile-box .profile-card.card-overlay .profile-body .profile-desc, .${elementId}:hover .profile-box .profile-card.card-title-social-horizontal .profile-body .profile-desc,
                    .${elementId}:hover .profile-desc> a, #${elementId}:hover .profile-desc> a, #${elementId}:hover .profile-phone> a, #${elementId}:hover .profile-email> a, .${elementId}:hover .profile-box .profile-card.card-overlay .profile-body .profile-desc> a, .${elementId}:hover .profile-box .profile-card.card-title-social-horizontal .profile-body .profile-desc> a`,
    });

    isNotEmpty(attributes['descTypography']) && data.push({
        'type': 'typography',
        'id': 'descTypography',
        'selector': `.${elementId} .profile-desc, #${elementId} .profile-desc, #${elementId} .profile-phone, #${elementId} .profile-email, .${elementId} .profile-box .profile-card.card-overlay .profile-body .profile-desc,
                    .${elementId} .profile-desc> a, #${elementId} .profile-desc> a, #${elementId} .profile-phone> a, #${elementId} .profile-email> a, .${elementId} .profile-box .profile-card.card-overlay .profile-body .profile-desc> a`,
    });

    isNotEmpty(attributes['descTextShadow']) && data.push({
        'type': 'textShadow',
        'id': 'descTextShadow',
        'properties': [
            {
                'name': 'text-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .profile-desc, #${elementId} .profile-desc, #${elementId} .profile-phone, #${elementId} .profile-email, .${elementId} .profile-box .profile-card.card-overlay .profile-body .profile-desc,
                    .${elementId} .profile-desc> a, #${elementId} .profile-desc> a, #${elementId} .profile-phone> a, #${elementId} .profile-email> a, .${elementId} .profile-box .profile-card.card-overlay .profile-body .profile-desc> a`,
    });
    return data;
};

export default descStyle;