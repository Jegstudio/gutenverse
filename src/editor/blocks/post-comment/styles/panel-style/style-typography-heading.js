import { isNotEmpty } from 'gutenverse-core/helper';

const typographyHeadingStyle = (elementId, attributes, data) => {

    isNotEmpty(attributes['typographyHeading']) && data.push({
        'type': 'typography',
        'id': 'typographyHeading',
        'selector': `.${elementId} h1, .${elementId} h2, .${elementId} h3, .${elementId} h4, .${elementId} h5, .${elementId} h6`,
    });

    isNotEmpty(attributes['colorHeading']) && data.push({
        'type': 'color',
        'id': 'colorHeading',
        'selector': `.${elementId} h1, .${elementId} h2, .${elementId} h3, .${elementId} h4, .${elementId} h5, .${elementId} h6`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['marginHeading']) && data.push({
        'type': 'dimension',
        'id': 'marginHeading',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} h1, .${elementId} h2, .${elementId} h3, .${elementId} h4, .${elementId} h5, .${elementId} h6, .${elementId} .comment-reply-title`,
    });

    isNotEmpty(attributes['typographyCommentTitle']) && data.push({
        'type': 'typography',
        'id': 'typographyCommentTitle',
        'selector': `.${elementId} .guten-post-comment-title p`,
    });

    isNotEmpty(attributes['colorCommentTitle']) && data.push({
        'type': 'color',
        'id': 'colorCommentTitle',
        'selector': `.${elementId} .guten-post-comment-title p`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['marginCommentTitle']) && data.push({
        'type': 'dimension',
        'id': 'marginCommentTitle',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .guten-post-comment-title`,
    });
    isNotEmpty(attributes['commentCountTypography']) && data.push({
        'type': 'typography',
        'id': 'commentCountTypography',
        'selector': `.${elementId} .guten-post-comment-title p span.comment-count`,
    });

    isNotEmpty(attributes['commentCountColor']) && data.push({
        'type': 'color',
        'id': 'commentCountColor',
        'selector': `.${elementId} .guten-post-comment-title p span.comment-count`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['postTitleTypography']) && data.push({
        'type': 'typography',
        'id': 'postTitleTypography',
        'selector': `.${elementId} .guten-post-comment-title p span.comment-post-title`,
    });

    isNotEmpty(attributes['postTitleColor']) && data.push({
        'type': 'color',
        'id': 'postTitleColor',
        'selector': `.${elementId} .guten-post-comment-title p span.comment-post-title`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    return data;
};

export default typographyHeadingStyle;