import { isNotEmpty } from 'gutenverse-core/helper';

const buttonStyle = (elementId, attributes, data) => {

    isNotEmpty(attributes['typographyButton']) && data.push({
        'type': 'typography',
        'id': 'typographyButton',
        'selector': `.${elementId}.guten-post-comment input[type=submit]`,
    });

    isNotEmpty(attributes['colorButton']) && data.push({
        'type': 'color',
        'id': 'colorButton',
        'selector': `.${elementId}.guten-post-comment input[type=submit]`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['bgcolorButton']) && data.push({
        'type': 'color',
        'id': 'bgcolorButton',
        'selector': `.${elementId}.guten-post-comment input[type=submit]`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['bggradientButton']) && data.push({
        'type': 'background',
        'id': 'bggradientButton',
        'selector': `.${elementId}.guten-post-comment input[type=submit]`,
    });

    isNotEmpty(attributes['borderButton']) && data.push({
        'type': 'border',
        'id': 'borderButton',
        'selector': `.${elementId}.guten-post-comment input[type=submit]`,
    });

    isNotEmpty(attributes['borderButtonResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderButtonResponsive',
        'selector': `.${elementId}.guten-post-comment input[type=submit]`,
    });

    isNotEmpty(attributes['marginButton']) && data.push({
        'type': 'dimension',
        'id': 'marginButton',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.guten-post-comment input[type=submit]`,
    });

    isNotEmpty(attributes['paddingButton']) && data.push({
        'type': 'dimension',
        'id': 'paddingButton',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.guten-post-comment input[type=submit]`,
    });

    isNotEmpty(attributes['colorButtonHover']) && data.push({
        'type': 'color',
        'id': 'colorButtonHover',
        'selector': `.${elementId}.guten-post-comment input[type=submit]:hover`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['bgcolorButtonHover']) && data.push({
        'type': 'color',
        'id': 'bgcolorButtonHover',
        'selector': `.${elementId}.guten-post-comment input[type=submit]:hover`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['bggradientButtonHover']) && data.push({
        'type': 'background',
        'id': 'bggradientButtonHover',
        'selector': `.${elementId}.guten-post-comment input[type=submit]:hover`,
    });

    isNotEmpty(attributes['borderButtonHover']) && data.push({
        'type': 'border',
        'id': 'borderButtonHover',
        'selector': `.${elementId}.guten-post-comment input[type=submit]:hover`,
    });

    isNotEmpty(attributes['borderButtonHoverResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderButtonHoverResponsive',
        'selector': `.${elementId}.guten-post-comment input[type=submit]:hover`,
    });

    isNotEmpty(attributes['marginButtonHover']) && data.push({
        'type': 'dimension',
        'id': 'marginButtonHover',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.guten-post-comment input[type=submit]:hover`,
    });

    isNotEmpty(attributes['paddingButtonHover']) && data.push({
        'type': 'dimension',
        'id': 'paddingButtonHover',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.guten-post-comment input[type=submit]:hover`,
    });
    return data;
};

export default buttonStyle;