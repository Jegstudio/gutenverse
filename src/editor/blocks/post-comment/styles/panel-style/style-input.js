import { isNotEmpty } from 'gutenverse-core/helper';

const inputStyle = (elementId, attributes, data) => {

    isNotEmpty(attributes['inputTypography']) && data.push({
        'type': 'typography',
        'id': 'inputTypography',
        'selector': `.${elementId} .comment-form input:not([type=submit]), .${elementId} .comment-form textarea`,
    });

    isNotEmpty(attributes['inputBorder']) && data.push({
        'type': 'border',
        'id': 'inputBorder',
        'selector': `.${elementId} .comment-form input:not([type=submit]), .${elementId} .comment-form textarea`,
    });

    isNotEmpty(attributes['inputBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'inputBorderResponsive',
        'selector': `.${elementId} .comment-form input:not([type=submit]), .${elementId} .comment-form textarea`,
    });

    isNotEmpty(attributes['inputBorderHover']) && data.push({
        'type': 'border',
        'id': 'inputBorderHover',
        'selector': `.${elementId} .comment-form input:not([type=submit]):hover, .${elementId} .comment-form textarea:hover`,
    });

    isNotEmpty(attributes['inputBorderHoverResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'inputBorderHoverResponsive',
        'selector': `.${elementId} .comment-form input:not([type=submit]):hover, .${elementId} .comment-form textarea:hover`,
    });

    isNotEmpty(attributes['inputBorderFocus']) && data.push({
        'type': 'border',
        'id': 'inputBorderFocus',
        'selector': `.${elementId} .comment-form input:not([type=submit]):focus, .${elementId} .comment-form textarea:focus`,
    });

    isNotEmpty(attributes['inputBorderFocusResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'inputBorderFocusResponsive',
        'selector': `.${elementId} .comment-form input:not([type=submit]):focus, .${elementId} .comment-form textarea:focus`,
    });

    isNotEmpty(attributes['inputMargin']) && data.push({
        'type': 'dimension',
        'id': 'inputMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .comment-form input:not([type=submit]), .${elementId} .comment-form textarea`,
    });

    isNotEmpty(attributes['inputPadding']) && data.push({
        'type': 'dimension',
        'id': 'inputPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .comment-form input:not([type=submit]), .${elementId} .comment-form textarea`,
    });

    isNotEmpty(attributes['inputColorNormal']) && data.push({
        'type': 'color',
        'id': 'inputColorNormal',
        'responsive': true,
        'selector': `.${elementId} .comment-form input:not([type=submit]), .${elementId} .comment-form textarea`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['inputBgColorNormal']) && data.push({
        'type': 'color',
        'id': 'inputBgColorNormal',
        'responsive': true,
        'selector': `.${elementId} .comment-form input:not([type=submit]), .${elementId} .comment-form textarea`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['inputColorHover']) && data.push({
        'type': 'color',
        'id': 'inputColorHover',
        'responsive': true,
        'selector': `.${elementId} .comment-form input:not([type=submit]):hover, .${elementId} .comment-form textarea:hover`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['inputBgColorHover']) && data.push({
        'type': 'color',
        'id': 'inputBgColorHover',
        'responsive': true,
        'selector': `.${elementId} .comment-form input:not([type=submit]):hover, .${elementId} .comment-form textarea:hover`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['inputColorFocus']) && data.push({
        'type': 'color',
        'id': 'inputColorFocus',
        'responsive': true,
        'selector': `.${elementId} .comment-form input:not([type=submit]):focus, .${elementId} .comment-form textarea:focus, .${elementId} .comment-form input:not([type=submit]):focus-visible, .${elementId} .comment-form textarea:focus-visible`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['inputBgColorFocus']) && data.push({
        'type': 'color',
        'id': 'inputBgColorFocus',
        'responsive': true,
        'selector': `.${elementId} .comment-form input:not([type=submit]):focus, .${elementId} .comment-form textarea:focus, .${elementId} .comment-form input:not([type=submit]):focus-visible, .${elementId} .comment-form textarea:focus-visible`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['inputAreaBoxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'inputAreaBoxShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .comment-form input:not([type=submit],[type=checkbox]), .${elementId} .comment-form textarea`,
    });

    isNotEmpty(attributes['inputAreaBoxShadowHover']) && data.push({
        'type': 'boxShadow',
        'id': 'inputAreaBoxShadowHover',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .comment-form input:not([type=submit],[type=checkbox]):hover, .${elementId} .comment-form textarea:hover`,
    });
    return data;
};

export default inputStyle;