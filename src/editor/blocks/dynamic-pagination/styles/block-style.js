import { isNotEmpty } from 'gutenverse-core/helper';
import { backgroundStyle } from 'gutenverse-core/controls';

const getBlockStyle = (elementId, attributes) => {
    let data = [];
    const selector = `.${elementId}`;

    data = backgroundStyle({
        attributes,
        data,
        backgroundSelector: `.${elementId}:not(.background-animated), .${elementId}.background-animated > .guten-background-animated .animated-layer`,
        backgroundHoverSelector: `.${elementId}:not(.background-animated):hover, .${elementId}.background-animated:hover > .guten-background-animated .animated-layer`,
    });

    /** spacing */
    isNotEmpty(attributes['padding']) && data.push({
        'type': 'dimension',
        'id': 'padding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': selector,
    });

    isNotEmpty(attributes['margin']) && data.push({
        'type': 'dimension',
        'id': 'margin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': selector,
    });

    /** typography */
    isNotEmpty(attributes['typographyHeadingColor']) && data.push({
        'type': 'color',
        'id': 'typographyHeadingColor',
        'selector': `.${elementId} .wp-block-gutenverse-heading`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['typographyTextColor']) && data.push({
        'type': 'color',
        'id': 'typographyTextColor',
        'selector': `.${elementId} a`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['typographyLinkColor']) && data.push({
        'type': 'color',
        'id': 'typographyLinkColor',
        'selector': `.${elementId} a`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['typographyLinkHoverColor']) && data.push({
        'type': 'color',
        'id': 'typographyLinkHoverColor',
        'selector': `.${elementId} a:hover`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['typographyTextAlign']) && data.push({
        'type': 'color',
        'id': 'typographyTextAlign',
        'selector': `.${elementId}`,
        'properties': [
            {
                'name': 'text-align',
                'valueType': 'pattern',
                'pattern': '{value}',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    },
                }
            }
        ],
    });

    /** Border **/
    isNotEmpty(attributes['border']) && data.push({
        'type': 'border',
        'id': 'border',
        'selector': `${selector}`,
    });

    isNotEmpty(attributes['borderHover']) && data.push({
        'type': 'border',
        'id': 'borderHover',
        'selector': `${selector}:hover`,
    });

    isNotEmpty(attributes['borderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderResponsive',
        'selector': `${selector}`,
    });

    isNotEmpty(attributes['borderResponsiveHover']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderResponsiveHover',
        'selector': `${selector}:hover`,
    });

    return data;
};

export default getBlockStyle;
