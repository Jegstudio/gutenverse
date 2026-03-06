
import { isNotEmpty } from 'gutenverse-core/helper';

const mainCommentStyle = (elementId, attributes, data) => {

    isNotEmpty(attributes['mainContainerBgColor']) && data.push({
        'type': 'color',
        'id': 'mainContainerBgColor',
        'responsive': true,
        'selector': `.${elementId} .commentlist .comment.depth-1`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['mainContainerMargin']) && data.push({
        'type': 'dimension',
        'id': 'mainContainerMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .commentlist .comment.depth-1`,
    });

    isNotEmpty(attributes['mainContainerPadding']) && data.push({
        'type': 'dimension',
        'id': 'mainContainerPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .commentlist .comment.depth-1`,
    });

    isNotEmpty(attributes['mainContainerBorder']) && data.push({
        'type': 'borderResponsive',
        'id': 'mainContainerBorder',
        'selector': `.${elementId} .commentlist .comment.depth-1`,
    });

    isNotEmpty(attributes['mainBgColor']) && data.push({
        'type': 'color',
        'id': 'mainBgColor',
        'responsive': true,
        'selector': `.${elementId} .commentlist .comment.depth-1 > .comment-body`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['mainMargin']) && data.push({
        'type': 'dimension',
        'id': 'mainMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .commentlist .comment.depth-1 > .comment-body`,
    });

    isNotEmpty(attributes['mainPadding']) && data.push({
        'type': 'dimension',
        'id': 'mainPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .commentlist .comment.depth-1 > .comment-body`,
    });

    isNotEmpty(attributes['mainBorder']) && data.push({
        'type': 'borderResponsive',
        'id': 'mainBorder',
        'selector': `.${elementId} .commentlist .comment.depth-1 > .comment-body`,
    });

    return data;
};

export default mainCommentStyle;