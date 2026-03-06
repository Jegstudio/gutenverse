import { isNotEmpty } from 'gutenverse-core/helper';

const dotsStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['dotsSpacingHorizontal']) && data.push({
        'type': 'plain',
        'id': 'dotsSpacingHorizontal',
        'responsive': true,
        'selector': `.${elementId} .swiper-pagination-bullets .swiper-pagination-bullet`,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'pattern',
                'pattern' : '0 calc({value}px / 2)',
                'patternValues' : {
                    'value' : {
                        'type' : 'direct'
                    }
                }
            }
        ]
    });
    isNotEmpty(attributes['dotsSpacingVertical']) && data.push({
        'type': 'plain',
        'id': 'dotsSpacingVertical',
        'responsive': true,
        'selector': `.${elementId} .swiper-pagination-bullets`,
        'properties': [
            {
                'name': 'margin-top',
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

    isNotEmpty(attributes['dotsWidth']) && data.push({
        'type': 'plain',
        'id': 'dotsWidth',
        'responsive': true,
        'selector': `.${elementId} .swiper-pagination-bullet`,
        'properties': [
            {
                'name': 'width',
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

    isNotEmpty(attributes['dotsHeight']) && data.push({
        'type': 'plain',
        'id': 'dotsHeight',
        'responsive': true,
        'selector': `.${elementId} .swiper-pagination-bullet`,
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
        ]
    });

    isNotEmpty(attributes['dotsRadius']) && data.push({
        'type': 'dimension',
        'id': 'dotsRadius',
        'responsive': true,
        'selector': `.${elementId} .swiper-pagination-bullet`,
        'properties': [
            {
                'name': 'border-radius',
                'valueType': 'direct',
                'multiDimension' : false
            }
        ]
    });

    isNotEmpty(attributes['dotsColor']) && data.push({
        'type': 'color',
        'id': 'dotsColor',
        'responsive': true,
        'selector': `.${elementId} .swiper-pagination-bullet`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['dotsActiveWidth']) && data.push({
        'type': 'plain',
        'id': 'dotsActiveWidth',
        'responsive': true,
        'selector': `.${elementId} .swiper-pagination-bullet.swiper-pagination-bullet-active`,
        'properties': [
            {
                'name': 'width',
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

    isNotEmpty(attributes['dotsActiveHeight']) && data.push({
        'type': 'plain',
        'id': 'dotsActiveHeight',
        'responsive': true,
        'selector': `.${elementId} .swiper-pagination-bullet.swiper-pagination-bullet-active`,
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
        ]
    });

    isNotEmpty(attributes['dotsActiveRadius']) && data.push({
        'type': 'dimension',
        'id': 'dotsActiveRadius',
        'responsive': true,
        'selector': `.${elementId} .swiper-pagination-bullet.swiper-pagination-bullet-active`,
        'properties': [
            {
                'name': 'border-radius',
                'valueType': 'direct',
                'multiDimension' : false
            }
        ]
    });

    isNotEmpty(attributes['dotsActiveColor']) && data.push({
        'type': 'color',
        'id': 'dotsActiveColor',
        'responsive': true,
        'selector': `.${elementId} .swiper-pagination-bullet.swiper-pagination-bullet-active`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct',
            }
        ]
    });
    return data;
};

export default dotsStyle;