import { isNotEmpty } from 'gutenverse-core/helper';

const avatarStyle = (elementId, attributes, data) => {

    isNotEmpty(attributes['avatarMargin']) && data.push({
        'type': 'dimension',
        'id': 'avatarMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .comment-author img.avatar`,
    });

    isNotEmpty(attributes['avatarBorder']) && data.push({
        'type': 'border',
        'id': 'avatarBorder',
        'selector': `.${elementId} .comment-author img.avatar`,
    });

    isNotEmpty(attributes['avatarBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'avatarBorderResponsive',
        'selector': `.${elementId} .comment-author img.avatar`,
    });

    return data;
};

export default avatarStyle;