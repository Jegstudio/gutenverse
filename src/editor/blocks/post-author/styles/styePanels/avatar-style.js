import { isNotEmpty } from 'gutenverse-core/helper';

export const avatarStyle = (elementId, attributes, data) => {

    isNotEmpty(attributes['size']) && attributes['authorAvatar'] && data.push({
        'type': 'unitPoint',
        'id': 'size',
        'responsive': true,
        'selector': `.${elementId} img`,
        'properties': [
            {
                'name': 'width',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['avatarGap']) && attributes['authorAvatar'] && data.push({
        'type': 'plain',
        'id': 'avatarGap',
        'responsive': true,
        'properties': [
            {
                'name': 'margin-right',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct'
                    }
                }
            }
        ],
        'selector': `.${elementId} img`,
    });

    isNotEmpty(attributes['opacity']) && attributes['authorAvatar'] && data.push({
        'type': 'plain',
        'id': 'opacity',
        'selector': `.${elementId} img`,
        'responsive': true,
        'properties': [
            {
                'name': 'opacity',
                'valueType': 'pattern',
                'pattern': 'calc({value}/100)',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    },

                }
            }
        ],
    });

    isNotEmpty(attributes['rotate']) && attributes['authorAvatar'] && data.push({
        'type': 'plain',
        'id': 'rotate',
        'selector': `.${elementId} img`,
        'responsive': true,
        'properties': [
            {
                'name': 'transform',
                'valueType': 'pattern',
                'pattern': 'rotate({value}deg)',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    },

                }
            }
        ],
    });

    isNotEmpty(attributes['authorBorder']) && attributes['authorAvatar'] && data.push({
        'type': 'border',
        'id': 'authorBorder',
        'selector': `.${elementId} img`,
    });

    isNotEmpty(attributes['authorBorderResponsive']) && attributes['authorAvatar'] && data.push({
        'type': 'borderResponsive',
        'id': 'authorBorderResponsive',
        'selector': `.${elementId} img`,
    });

    isNotEmpty(attributes['authorBoxShadow']) && attributes['authorAvatar'] && data.push({
        'type': 'boxShadow',
        'id': 'authorBoxShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} img`,
    });

    return data;
};