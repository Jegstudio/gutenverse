import { isNotEmpty } from 'gutenverse-core/helper';

const typographyLlinkStyle = (elementId, attributes, data) => {

    isNotEmpty(attributes['typographyLink']) && data.push({
        'type': 'typography',
        'id': 'typographyLink',
        'selector': `.${elementId} .comment-form a`,
    });

    isNotEmpty(attributes['colorLink']) && data.push({
        'type': 'color',
        'id': 'colorLink',
        'selector': `.${elementId} .comment-form a`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['marginLink']) && data.push({
        'type': 'dimension',
        'id': 'marginLink',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .comment-form a`,
    });

    isNotEmpty(attributes['userNameTypography']) && data.push({
        'type': 'typography',
        'id': 'userNameTypography',
        'selector': `.${elementId} .commentlist b.fn a.url`,
    });

    isNotEmpty(attributes['userNameColor']) && data.push({
        'type': 'color',
        'id': 'userNameColor',
        'selector': `.${elementId} .commentlist b.fn a.url`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['dateTypography']) && data.push({
        'type': 'typography',
        'id': 'dateTypography',
        'selector': `.${elementId} .commentlist .comment-metadata a time`,
    });

    isNotEmpty(attributes['dateColor']) && data.push({
        'type': 'color',
        'id': 'dateColor',
        'selector': `.${elementId} .commentlist .comment-metadata a time`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['replyLinkTypography']) && data.push({
        'type': 'typography',
        'id': 'replyLinkTypography',
        'selector': `.${elementId} .commentlist .reply .comment-reply-link`,
    });

    isNotEmpty(attributes['replyLinkColor']) && data.push({
        'type': 'color',
        'id': 'replyLinkColor',
        'selector': `.${elementId} .commentlist .reply .comment-reply-link`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    return data;
};

export default typographyLlinkStyle;