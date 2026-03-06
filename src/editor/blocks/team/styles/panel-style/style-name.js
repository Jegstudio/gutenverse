import { isNotEmpty } from 'gutenverse-core/helper';

const nameStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['nameSpace']) && data.push({
        'type': 'plain',
        'id': 'nameSpace',
        'responsive': true,
        'selector': `.${elementId} .profile-title, #${elementId} .profile-title, .${elementId} .profile-box .profile-card.card-overlay .profile-body .profile-title`,
        'properties': [
            {
                'name': 'margin-bottom',
                'valueType': 'pattern',
                'pattern' : '{value}px',
                'patternValues' : {
                    'value' : {
                        'type' : 'direct'
                    }
                }
            }
        ]
    });

    isNotEmpty(attributes['nameColor']) && data.push({
        'type': 'color',
        'id': 'nameColor',
        'selector': `.${elementId} .profile-title, #${elementId} .profile-title, .${elementId} .profile-box .profile-card.card-overlay .profile-body .profile-title, .${elementId} .profile-box .profile-card.card-title-social-horizontal .profile-body .profile-title,
                    .${elementId} .profile-title> a, #${elementId} .profile-title> a, .${elementId} .profile-box .profile-card.card-overlay .profile-body .profile-title> a, .${elementId} .profile-box .profile-card.card-title-social-horizontal .profile-body .profile-title> a`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['nameColorHover']) && data.push({
        'type': 'color',
        'id': 'nameColorHover',
        'selector': `.${elementId}:hover .profile-title, #${elementId}:hover .profile-title, .${elementId}:hover .profile-box .profile-card.card-overlay .profile-body .profile-title, .${elementId}:hover .profile-box .profile-card.card-title-social-horizontal .profile-body .profile-title,
                    .${elementId}:hover .profile-title> a, #${elementId}:hover .profile-title> a, .${elementId}:hover .profile-box .profile-card.card-overlay .profile-body .profile-title> a, .${elementId}:hover .profile-box .profile-card.card-title-social-horizontal .profile-body .profile-title> a`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['nameTypography']) && data.push({
        'type': 'typography',
        'id': 'nameTypography',
        'selector': `.${elementId} .profile-title, #${elementId} .profile-title, .${elementId} .profile-box .profile-card.card-overlay .profile-body .profile-title,
                    .${elementId} .profile-title> a, #${elementId} .profile-title> a, .${elementId} .profile-box .profile-card.card-overlay .profile-body .profile-title> a`,
    });

    isNotEmpty(attributes['nameTextShadow']) && data.push({
        'type': 'textShadow',
        'id': 'nameTextShadow',
        'properties': [
            {
                'name': 'text-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .profile-title, #${elementId} .profile-title, .${elementId} .profile-box .profile-card.card-overlay .profile-body .profile-title`,
    });
    return data;
};

export default nameStyle;