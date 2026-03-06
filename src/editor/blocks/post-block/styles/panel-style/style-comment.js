import { isNotEmpty } from 'gutenverse-core/helper';

const panelCommentStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['commentColor']) && data.push({
        'type': 'color',
        'id': 'commentColor',
        'selector': `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-comment a`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['commentColor']) && data.push({
        'type': 'color',
        'id': 'commentColor',
        'selector': `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-comment svg`,
        'properties': [
            {
                'name': 'fill',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['commentSize']) && data.push({
        'type': 'plain',
        'id': 'commentSize',
        'responsive' : true,
        'selector': `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-comment a`,
        'properties': [
            {
                'name': 'font-size',
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

    isNotEmpty(attributes['commentSize']) && data.push({
        'type': 'plain',
        'id': 'commentSize',
        'responsive' : true,
        'selector': `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-comment svg`,
        'properties': [
            {
                'name': 'font-size',
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

    isNotEmpty(attributes['commentSpacing']) && data.push({
        'type': 'plain',
        'id': 'commentSpacing',
        'responsive': true,
        'selector': `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-comment.icon-position-before span`,
        'properties': [
            {
                'name': 'margin-left',
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

    isNotEmpty(attributes['commentSpacing']) && data.push({
        'type': 'plain',
        'id': 'commentSpacing',
        'responsive': true,
        'selector': `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-comment.icon-position-after span`,
        'properties': [
            {
                'name': 'margin-right',
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

    isNotEmpty(attributes['commentMargin']) && data.push({
        'type': 'dimension',
        'id': 'commentMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-comment`,
    });

    isNotEmpty(attributes['commentPadding']) && data.push({
        'type': 'dimension',
        'id': 'commentPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-comment`,
    });

    return data;
};

export default panelCommentStyle;