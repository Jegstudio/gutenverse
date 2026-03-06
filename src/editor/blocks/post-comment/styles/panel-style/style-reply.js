import { isNotEmpty } from 'gutenverse-core/helper';

const replyStyle = (elementId, attributes, data) => {

    isNotEmpty(attributes['replyBgColor']) && data.push({
        'type': 'color',
        'id': 'replyBgColor',
        'responsive': true,
        'selector': `.${elementId} .commentlist .comment .children`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['replyMargin']) && data.push({
        'type': 'dimension',
        'id': 'replyMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .commentlist .comment .children`,
    });

    isNotEmpty(attributes['replyPadding']) && data.push({
        'type': 'dimension',
        'id': 'replyPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .commentlist .comment .children`,
    });

    isNotEmpty(attributes['replyBorder']) && data.push({
        'type': 'borderResponsive',
        'id': 'replyBorder',
        'responsive': true,
        'selector': `.${elementId} .commentlist .comment .children`,
    });

    return data;
};

export default replyStyle;