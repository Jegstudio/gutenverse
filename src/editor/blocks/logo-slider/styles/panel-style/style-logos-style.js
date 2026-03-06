import { isNotEmpty } from 'gutenverse-core/helper';

const panelLogosStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['imageFixHeight']) && isNotEmpty(attributes['imageHeight'])  && data.push({
        'type': 'plain',
        'id': 'imageFixHeight',
        'responsive' : true,
        'properties': [
            {
                'name': 'height',
                'valueType': 'pattern',
                'pattern' : '{value}px',
                'patternValues' : {
                    'value' : {
                        'type' : 'direct'
                    }
                }
            }
        ],
        'selector': `.${elementId}.guten-client-logo .swiper-container .content-image img`,
        'multiAttr' : {
            'imageHeight' : attributes['imageHeight']
        }
    });

    isNotEmpty(attributes['imageFixHeight']) && isNotEmpty(attributes['imageHeight']) && data.push({
        'type': 'plain',
        'id': 'imageHeight',
        'responsive': true,
        'properties': [
            {
                'name': 'height',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct'
                    }
                }
            }
        ],
        'selector': `.${elementId}.guten-client-logo .swiper-container .content-image img`,
    });

    isNotEmpty(attributes['imageFixHeight']) && isNotEmpty(attributes['imageFit']) && data.push({
        'type': 'plain',
        'id': 'imageFit',
        'responsive': true,
        'properties': [
            {
                'name': 'object-fit',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.guten-client-logo .swiper-container .content-image img`,
    });

    isNotEmpty(attributes['imageMargin']) && data.push({
        'type': 'dimension',
        'id': 'imageMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.guten-client-logo .swiper-container .content-image .main-image`,
    });

    isNotEmpty(attributes['imagePadding']) && data.push({
        'type': 'dimension',
        'id': 'imagePadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.guten-client-logo .swiper-container .content-image .main-image`,
    });

    isNotEmpty(attributes['transitionDuration']) && data.push({
        'type': 'plain',
        'id': 'transitionDuration',
        'responsive' : true,
        'properties': [
            {
                'name': 'transition-duration',
                'valueType': 'pattern',
                'pattern' : '{value}s',
                'patternValues' : {
                    'value' : {
                        'type' : 'direct'
                    }
                }
            }
        ],
        'selector': `.${elementId}.guten-client-logo .swiper-container .content-image .hover-image, .${elementId}.guten-client-logo .swiper-container .content-image .main-image`,
    });

    isNotEmpty(attributes['filter']) && data.push({
        'type': 'plain',
        'id': 'filter',
        'selector': `.${elementId}.guten-client-logo .swiper-container .content-image .main-image`,
        'properties': [
            {
                'name': 'filter',
                'valueType': 'function',
                'functionName': 'handleFilterImage',
            }
        ],
    });

    isNotEmpty(attributes['filterHover']) && data.push({
        'type': 'plain',
        'id': 'filterHover',
        'selector': `.${elementId}.guten-client-logo .swiper-container .content-image .hover-image`,
        'properties': [
            {
                'name': 'filter',
                'valueType': 'function',
                'functionName': 'handleFilterImage',
            }
        ],
    });

    isNotEmpty(attributes['logoBackgroundNormal']) && data.push({
        'type': 'background',
        'id': 'logoBackgroundNormal',
        'selector': `.${elementId}.guten-client-logo .swiper-container .content-image .main-image`,
    });

    isNotEmpty(attributes['imageBorder']) && data.push({
        'type': 'border',
        'id': 'imageBorder',
        'selector': `.${elementId}.guten-client-logo .swiper-container .content-image .main-image`,
    });

    isNotEmpty(attributes['imageBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'imageBorderResponsive',
        'selector': `.${elementId}.guten-client-logo .swiper-container .content-image .main-image`,
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
        'selector': `.${elementId}.guten-client-logo .swiper-container .content-image .main-image`,
    });

    isNotEmpty(attributes['opacity']) && data.push({
        'type': 'plain',
        'id': 'opacity',
        'properties': [
            {
                'name': 'opacity',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.guten-client-logo .swiper-container .content-image .main-image`,
    });

    isNotEmpty(attributes['imageHoverMargin']) && data.push({
        'type': 'dimension',
        'id': 'imageHoverMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.guten-client-logo .swiper-container .content-image .hover-image`,
    });

    isNotEmpty(attributes['imageHoverPadding']) && data.push({
        'type': 'dimension',
        'id': 'imageHoverPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.guten-client-logo .swiper-container .content-image .hover-image`,
    });

    isNotEmpty(attributes['logoBackgroundHover']) && data.push({
        'type': 'background',
        'id': 'logoBackgroundHover',
        'selector': `.${elementId}.guten-client-logo .swiper-container .content-image .hover-image`,
    });

    isNotEmpty(attributes['imageBorderHover']) && data.push({
        'type': 'border',
        'id': 'imageBorderHover',
        'selector': `.${elementId}.guten-client-logo .swiper-container .content-image .hover-image`,
    });

    isNotEmpty(attributes['imageBorderHoverResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'imageBorderHoverResponsive',
        'selector': `.${elementId}.guten-client-logo .swiper-container .content-image .hover-image`,
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
        'selector': `.${elementId}.guten-client-logo .swiper-container .content-image .hover-image`,
    });

    isNotEmpty(attributes['hoverOpacity']) && data.push({
        'type': 'plain',
        'id': 'hoverOpacity',
        'properties': [
            {
                'name': 'opacity',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.guten-client-logo .swiper-container .image-list:hover .content-image .hover-image`,
    });
    return data;
};

export default panelLogosStyle;