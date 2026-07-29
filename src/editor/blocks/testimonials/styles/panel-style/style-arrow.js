import { isNotEmpty } from 'gutenverse-core/helper';

const arrowStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['arrowOffsetX']) && data.push({
        'type': 'plain',
        'id': 'arrowOffsetX',
        'responsive': true,
        'selector': `.${elementId}.guten-testimonials`,
        'properties': [
            {
                'name': '--guten-testimonial-arrow-offset-x',
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

    isNotEmpty(attributes['arrowOffsetY']) && data.push({
        'type': 'plain',
        'id': 'arrowOffsetY',
        'responsive': true,
        'selector': `.${elementId}.guten-testimonials`,
        'properties': [
            {
                'name': '--guten-testimonial-arrow-offset-y',
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

    isNotEmpty(attributes['arrowGap']) && data.push({
        'type': 'plain',
        'id': 'arrowGap',
        'responsive': true,
        'selector': `.${elementId}.guten-testimonials`,
        'properties': [
            {
                'name': '--guten-testimonial-arrow-gap',
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

    isNotEmpty(attributes['arrowFontSize']) && data.push({
        'type': 'plain',
        'id': 'arrowFontSize',
        'responsive': true,
        'selector': `.${elementId} div[class*='swiper-button-']`,
        'properties': [
            {
                'name': 'font-size',
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

    isNotEmpty(attributes['arrowColor']) && data.push({
        'type': 'color',
        'id': 'arrowColor',
        'responsive': true,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} div[class*='swiper-button-']`,
    });

    isNotEmpty(attributes['arrowBgColor']) && data.push({
        'type': 'color',
        'id': 'arrowBgColor',
        'responsive': true,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} div[class*='swiper-button-']`,
    });

    isNotEmpty(attributes['arrowPadding']) && data.push({
        'type': 'dimension',
        'id': 'arrowPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} div[class*='swiper-button-']`,
    });

    isNotEmpty(attributes['arrowMargin']) && data.push({
        'type': 'dimension',
        'id': 'arrowMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} div[class*='swiper-button-']`,
    });

    isNotEmpty(attributes['arrowOpacity']) && data.push({
        'type': 'plain',
        'id': 'arrowOpacity',
        'responsive': true,
        'selector': `.${elementId} div[class*='swiper-button-']`,
        'properties': [
            {
                'name': 'opacity',
                'valueType': 'function',
                'functionName' : 'handleOpacity'
            }
        ]
    });

    isNotEmpty(attributes['arrowBorder']) && data.push({
        'type': 'border',
        'id': 'arrowBorder',
        'selector': `.${elementId} div[class*='swiper-button-']`,
    });

    isNotEmpty(attributes['arrowBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'arrowBorderResponsive',
        'selector': `.${elementId} div[class*='swiper-button-']`,
    });

    isNotEmpty(attributes['arrowBoxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'arrowBoxShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} div[class*='swiper-button-']`,
    });

    isNotEmpty(attributes['arrowHoverColor']) && data.push({
        'type': 'color',
        'id': 'arrowHoverColor',
        'responsive': true,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} div[class*='swiper-button-']:not(.swiper-button-disabled):hover`,
    });

    isNotEmpty(attributes['arrowHoverBgColor']) && data.push({
        'type': 'color',
        'id': 'arrowHoverBgColor',
        'responsive': true,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} div[class*='swiper-button-']:not(.swiper-button-disabled):hover`,
    });

    isNotEmpty(attributes['arrowHoverPadding']) && data.push({
        'type': 'dimension',
        'id': 'arrowHoverPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} div[class*='swiper-button-']:not(.swiper-button-disabled):hover`,
    });

    isNotEmpty(attributes['arrowHoverMargin']) && data.push({
        'type': 'dimension',
        'id': 'arrowHoverMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} div[class*='swiper-button-']:not(.swiper-button-disabled):hover`,
    });

    isNotEmpty(attributes['arrowHoverOpacity']) && data.push({
        'type': 'plain',
        'id': 'arrowHoverOpacity',
        'responsive': true,
        'selector': `.${elementId} div[class*='swiper-button-']:not(.swiper-button-disabled):hover`,
        'properties': [
            {
                'name': 'opacity',
                'valueType': 'function',
                'functionName' : 'handleOpacity'
            }
        ]
    });

    isNotEmpty(attributes['arrowBorderHover']) && data.push({
        'type': 'border',
        'id': 'arrowBorderHover',
        'selector': `.${elementId} div[class*='swiper-button-']:not(.swiper-button-disabled):hover`,
    });

    isNotEmpty(attributes['arrowBorderHoverResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'arrowBorderHoverResponsive',
        'selector': `.${elementId} div[class*='swiper-button-']:not(.swiper-button-disabled):hover`,
    });

    isNotEmpty(attributes['arrowBoxShadowHover']) && data.push({
        'type': 'boxShadow',
        'id': 'arrowBoxShadowHover',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} div[class*='swiper-button-']:not(.swiper-button-disabled):hover`,
    });

    isNotEmpty(attributes['arrowDisabledColor']) && data.push({
        'type': 'color',
        'id': 'arrowDisabledColor',
        'responsive': true,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} div[class*='swiper-button-'].swiper-button-disabled`,
    });

    isNotEmpty(attributes['arrowDisabledBgColor']) && data.push({
        'type': 'color',
        'id': 'arrowDisabledBgColor',
        'responsive': true,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} div[class*='swiper-button-'].swiper-button-disabled`,
    });

    isNotEmpty(attributes['arrowDisabledPadding']) && data.push({
        'type': 'dimension',
        'id': 'arrowDisabledPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} div[class*='swiper-button-'].swiper-button-disabled`,
    });

    isNotEmpty(attributes['arrowDisabledMargin']) && data.push({
        'type': 'dimension',
        'id': 'arrowDisabledMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} div[class*='swiper-button-'].swiper-button-disabled`,
    });

    isNotEmpty(attributes['arrowDisabledOpacity']) && data.push({
        'type': 'plain',
        'id': 'arrowDisabledOpacity',
        'responsive': true,
        'selector': `.${elementId} div[class*='swiper-button-'].swiper-button-disabled`,
        'properties': [
            {
                'name': 'opacity',
                'valueType': 'function',
                'functionName' : 'handleOpacity'
            }
        ]
    });

    isNotEmpty(attributes['arrowBorderDisabled']) && data.push({
        'type': 'borderResponsive',
        'id': 'arrowBorderDisabled',
        'selector': `.${elementId} div[class*='swiper-button-'].swiper-button-disabled`,
    });

    isNotEmpty(attributes['arrowBoxShadowDisabled']) && data.push({
        'type': 'boxShadow',
        'id': 'arrowBoxShadowDisabled',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} div[class*='swiper-button-'].swiper-button-disabled`,
    });
    return data;
};

export default arrowStyle;
