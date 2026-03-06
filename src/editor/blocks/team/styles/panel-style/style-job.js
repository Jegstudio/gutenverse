import { isNotEmpty } from 'gutenverse-core/helper';

const jobStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['jobSpace']) && data.push({
        'type': 'plain',
        'id': 'jobSpace',
        'responsive': true,
        'selector': `.${elementId} .profile-sub, #${elementId} .profile-sub, .${elementId} .profile-box .profile-card.card-overlay .profile-body .profile-sub`,
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
    isNotEmpty(attributes['jobColor']) && data.push({
        'type': 'color',
        'id': 'jobColor',
        'selector': `.${elementId} .profile-sub, #${elementId} .profile-sub, .${elementId} .profile-box .profile-card.card-overlay .profile-body .profile-sub, .${elementId} .profile-box .profile-card.card-title-social-horizontal .profile-body .profile-sub,
                    .${elementId} .profile-sub> a, #${elementId} .profile-sub> a, .${elementId} .profile-box .profile-card.card-overlay .profile-body .profile-sub> a, .${elementId} .profile-box .profile-card.card-title-social-horizontal .profile-body .profile-sub> a`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['jobColorHover']) && data.push({
        'type': 'color',
        'id': 'jobColorHover',
        'selector': `.${elementId}:hover .profile-sub, #${elementId}:hover .profile-sub, .${elementId}:hover .profile-box .profile-card.card-overlay .profile-body .profile-sub, .${elementId}:hover .profile-box .profile-card.card-title-social-horizontal .profile-body .profile-sub,
                            .${elementId}:hover .profile-sub> a, #${elementId}:hover .profile-sub> a, .${elementId}:hover .profile-box .profile-card.card-overlay .profile-body .profile-sub> a, .${elementId}:hover .profile-box .profile-card.card-title-social-horizontal .profile-body .profile-sub> a`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['jobTypography']) && data.push({
        'type': 'typography',
        'id': 'jobTypography',
        'selector': `.${elementId} .profile-sub, #${elementId} .profile-sub, .${elementId} .profile-box .profile-card.card-overlay .profile-body .profile-sub,
                            .${elementId} .profile-sub> a, #${elementId} .profile-sub> a, .${elementId} .profile-box .profile-card.card-overlay .profile-body .profile-sub> a`,
    });

    isNotEmpty(attributes['jobTextShadow']) && data.push({
        'type': 'textShadow',
        'id': 'jobTextShadow',
        'properties': [
            {
                'name': 'text-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .profile-sub, #${elementId} .profile-sub, .${elementId} .profile-box .profile-card.card-overlay .profile-body .profile-sub`,
    });
    return data;
};

export default jobStyle;