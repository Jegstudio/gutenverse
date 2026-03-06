import { isNotEmpty } from 'gutenverse-core/helper';

const imageStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['imgWidth']) && data.push({
        'type': 'unitPoint',
        'id': 'imgWidth',
        'responsive': true,
        'selector': `.${elementId} .profile-box .profile-card.card-default img,
                    .${elementId} .profile-box .profile-card.card-overlay img,
                    .${elementId} .profile-box .profile-card.card-title-social-horizontal img,
                    .${elementId} .profile-box .profile-card.card-hover img,
                    .${elementId} .profile-box .profile-card.card-default .profile-header img,
                    .${elementId} .profile-box .profile-card.card-overlay .profile-header img,
                    .${elementId} .profile-box .profile-card.card-hover .profile-header img,
                    .${elementId} .profile-box .profile-card.card-title-social-horizontal,
                    .${elementId} .profile-box .profile-card.card-overlay`,
        'properties': [
            {
                'name': 'width',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['imgHeight']) && data.push({
        'type': 'unitPoint',
        'id': 'imgHeight',
        'responsive': true,
        'selector': `.${elementId} .profile-box .profile-card.card-default img,
                    .${elementId} .profile-box .profile-card.card-overlay img,
                    .${elementId} .profile-box .profile-card.card-title-social-horizontal img,
                    .${elementId} .profile-box .profile-card.card-hover img,
                    .${elementId} .profile-box .profile-card.card-default .profile-header img,
                    .${elementId} .profile-box .profile-card.card-overlay .profile-header img,
                    .${elementId} .profile-box .profile-card.card-hover .profile-header img`,
        'properties': [
            {
                'name': 'height',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['imgRotate']) && data.push({
        'type': 'plain',
        'id': 'imgRotate',
        'responsive': true,
        'selector': `.${elementId} .profile-box .profile-card.card-default img,
                    .${elementId} .profile-box .profile-card.card-overlay img,
                    .${elementId} .profile-box .profile-card.card-title-social-horizontal img,
                    .${elementId} .profile-box .profile-card.card-hover img,
                    .${elementId} .profile-box .profile-card.card-default .profile-header img,
                    .${elementId} .profile-box .profile-card.card-overlay .profile-header img,
                    .${elementId} .profile-box .profile-card.card-hover .profile-header img`,
        'properties': [
            {
                'name': 'transform',
                'valueType': 'pattern',
                'pattern' : 'rotate({value}deg)',
                'patternValues' : {
                    'value' : {
                        'type' : 'direct'
                    }
                }
            }
        ]
    });

    isNotEmpty(attributes['imgSpacing']) && data.push({
        'type': 'plain',
        'id': 'imgSpacing',
        'responsive': true,
        'selector': `.${elementId} .profile-box .profile-card.card-default .profile-header,
                    .${elementId} .profile-box .profile-card.card-hover .profile-header`,
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

    isNotEmpty(attributes['imageBackground']) && data.push({
        'type': 'background',
        'id': 'imageBackground',
        'selector': `.${elementId} .profile-box .profile-card img`,
    });

    isNotEmpty(attributes['imageBackgroundHover']) && data.push({
        'type': 'background',
        'id': 'imageBackgroundHover',
        'selector': `.${elementId} .profile-box .profile-card img:hover`,
    });

    isNotEmpty(attributes['imageBorder']) && data.push({
        'type': 'border',
        'id': 'imageBorder',
        'selector': `.${elementId} .profile-box .profile-card img`,
    });

    isNotEmpty(attributes['imageBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'imageBorderResponsive',
        'selector': `.${elementId} .profile-box .profile-card img`,
    });

    isNotEmpty(attributes['imageBoxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'imageBoxShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .profile-box .profile-card img`,
    });

    isNotEmpty(attributes['imageBorderHover']) && data.push({
        'type': 'border',
        'id': 'imageBorderHover',
        'selector': `.${elementId} .profile-box .profile-card img:hover`,
    });

    isNotEmpty(attributes['imageBorderHoverResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'imageBorderHoverResponsive',
        'selector': `.${elementId} .profile-box .profile-card img:hover`,
    });

    isNotEmpty(attributes['imageBoxShadowHover']) && data.push({
        'type': 'boxShadow',
        'id': 'imageBoxShadowHover',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .profile-box .profile-card img:hover`,
    });
    return data;
};

export default imageStyle;