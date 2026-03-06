import { isNotEmpty } from 'gutenverse-core/helper';

const panelLightboxStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['itemLightboxTitleTypography']) && data.push({
        'type': 'typography',
        'id': 'itemLightboxTitleTypography',
        'selector': `.gutenverse-popup-gallery.${elementId} .images .image-list .content-image .content-description-wrapper .content-title`,
    });
    isNotEmpty(attributes['itemLightboxTitleColor']) && data.push({
        'type': 'color',
        'id': 'itemLightboxTitleColor',
        'responsive': false,
        'selector': `.gutenverse-popup-gallery.${elementId} .images .image-list .content-image .content-description-wrapper .content-title`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });
    isNotEmpty(attributes['itemLightboxDescriptionTypography']) && data.push({
        'type': 'typography',
        'id': 'itemLightboxDescriptionTypography',
        'selector': `.gutenverse-popup-gallery.${elementId} .images .image-list .content-image .content-description-wrapper .content-description`,
    });
    isNotEmpty(attributes['itemLightboxDescriptionColor']) && data.push({
        'type': 'color',
        'id': 'itemLightboxDescriptionColor',
        'responsive': false,
        'selector': `.gutenverse-popup-gallery.${elementId} .images .image-list .content-image .content-description-wrapper .content-description`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });
    isNotEmpty(attributes['itemLightboxTextPadding']) && data.push({
        'type': 'dimension',
        'id': 'itemLightboxTextPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector':  `.gutenverse-popup-gallery.${elementId} .images .image-list .content-image .content-description-wrapper`,
    });
    isNotEmpty(attributes['itemLightboxTextMargin']) && data.push({
        'type': 'dimension',
        'id': 'itemLightboxTextMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector':  `.gutenverse-popup-gallery.${elementId} .images .image-list .content-image .content-description-wrapper`,
    });
    if (isNotEmpty(attributes['images'])) {
        let imagesLightboxOption = imagesLightboxGetBlockStyle(elementId, attributes['images']);
        data.push({
            'type': 'repeater',
            'id': 'images',
            'repeaterOpt': imagesLightboxOption
        });
    }
    return data;
};

const imagesLightboxGetBlockStyle = (elementId, attribute) => {
    return attribute.map((el, index) => {
        let arrOpt = [];
        isNotEmpty(el['itemLightboxTextPadding']) && arrOpt.push({
            'type': 'dimension',
            'id': 'itemLightboxTextPadding',
            'responsive': true,
            'properties': [
                {
                    'name': 'padding',
                    'valueType': 'direct'
                }
            ],
            'selector':  `.gutenverse-popup-gallery.${elementId} .images .image-list.image-list-${index} .content-image .content-description-wrapper`,
        });
        isNotEmpty(el['itemLightboxTextMargin']) && arrOpt.push({
            'type': 'dimension',
            'id': 'itemLightboxTextMargin',
            'responsive': true,
            'properties': [
                {
                    'name': 'margin',
                    'valueType': 'direct'
                }
            ],
            'selector':  `.gutenverse-popup-gallery.${elementId} .images .image-list.image-list-${index} .content-image .content-description-wrapper`,
        });
        isNotEmpty(el['itemLightboxTitleTypography']) && arrOpt.push({
            'type': 'typography',
            'id': 'itemLightboxTitleTypography',
            'selector': `.gutenverse-popup-gallery.${elementId} .images .image-list.image-list-${index} .content-image .content-description-wrapper .content-title`,
        });
        isNotEmpty(el['itemLightboxTitleColor']) && arrOpt.push({
            'type': 'color',
            'id': 'itemLightboxTitleColor',
            'responsive': false,
            'selector': `.gutenverse-popup-gallery.${elementId} .images .image-list.image-list-${index} .content-image .content-description-wrapper .content-title`,
            'properties': [
                {
                    'name': 'color',
                    'valueType': 'direct'
                }
            ]
        });
        isNotEmpty(el['itemLightboxDescriptionTypography']) && arrOpt.push({
            'type': 'typography',
            'id': 'itemLightboxDescriptionTypography',
            'selector': `.gutenverse-popup-gallery.${elementId} .images .image-list.image-list-${index} .content-image .content-description-wrapper .content-description`,
        });
        isNotEmpty(el['itemLightboxDescriptionColor']) && arrOpt.push({
            'type': 'color',
            'id': 'itemLightboxDescriptionColor',
            'responsive': false,
            'selector': `.gutenverse-popup-gallery.${elementId} .images .image-list.image-list-${index} .content-image .content-description-wrapper .content-description`,
            'properties': [
                {
                    'name': 'color',
                    'valueType': 'direct'
                }
            ]
        });
        return arrOpt;
    });
};

export default panelLightboxStyle;