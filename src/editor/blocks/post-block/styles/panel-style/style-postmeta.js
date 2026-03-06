import { isNotEmpty } from 'gutenverse-core/helper';

const postMetaStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['metaTypography']) && data.push({
        'type': 'typography',
        'id': 'metaTypography',
        'selector': `.${elementId} .guten-postblock .guten-postblock-content .guten-post-meta`,
    });

    isNotEmpty(attributes['metaColor']) && data.push({
        'type': 'color',
        'id': 'metaColor',
        'selector': `.${elementId} .guten-postblock .guten-postblock-content .guten-post-meta`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });
    isNotEmpty(attributes['metaColorIcon']) && data.push({
        'type': 'color',
        'id': 'metaColorIcon',
        'selector': `.${elementId} .guten-postblock .guten-postblock-content .guten-post-meta i`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['metaColorIcon']) && data.push({
        'type': 'color',
        'id': 'metaColorIcon',
        'selector': `.${elementId} .guten-postblock .guten-postblock-content .guten-post-meta svg`,
        'properties': [
            {
                'name': 'fill',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['metaSizeIcon']) && data.push({
        'type': 'plain',
        'id': 'metaSizeIcon',
        'responsive' : true,
        'selector': `.${elementId} .guten-postblock .guten-postblock-content .guten-post-meta i`,
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

    isNotEmpty(attributes['metaSizeIcon']) && data.push({
        'type': 'plain',
        'id': 'metaSizeIcon',
        'responsive' : true,
        'selector': `.${elementId} .guten-postblock .guten-postblock-content .guten-post-meta svg`,
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

    isNotEmpty(attributes['metaAuthorTypography']) && data.push({
        'type': 'typography',
        'id': 'metaAuthorTypography',
        'selector': `.${elementId} .guten-postblock .guten-postblock-content .guten-post-meta .guten-meta-author a`,
    });

    isNotEmpty(attributes['metaAuthorColor']) && data.push({
        'type': 'color',
        'id': 'metaAuthorColor',
        'selector': `.${elementId} .guten-postblock .guten-postblock-content .guten-post-meta .guten-meta-author a`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['metaMargin']) && data.push({
        'type': 'dimension',
        'id': 'metaMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .guten-postblock .guten-postblock-content .guten-post-meta`,
    });

    isNotEmpty(attributes['metaAuthorIconSpacing']) && data.push({
        'type': 'plain',
        'id': 'metaAuthorIconSpacing',
        'responsive' : true,
        'selector': `.${elementId} .guten-postblock .guten-postblock-content .guten-post-meta .guten-meta-author.icon-position-before i, .${elementId} .guten-postblock .guten-postblock-content .guten-post-meta .guten-meta-author.icon-position-before svg`,
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

    isNotEmpty(attributes['metaAuthorIconSpacing']) && data.push({
        'type': 'plain',
        'id': 'metaAuthorIconSpacing',
        'responsive' : true,
        'selector': `.${elementId} .guten-postblock .guten-postblock-content .guten-post-meta .guten-meta-author.icon-position-after i, .${elementId} .guten-postblock .guten-postblock-content .guten-post-meta .guten-meta-author.icon-position-after svg`,
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

    isNotEmpty(attributes['metaDateIconSpacing']) && data.push({
        'type': 'plain',
        'id': 'metaDateIconSpacing',
        'responsive' : true,
        'selector': `.${elementId} .guten-postblock .guten-postblock-content .guten-post-meta .guten-meta-date.icon-position-before i, .${elementId} .guten-postblock .guten-postblock-content .guten-post-meta .guten-meta-date.icon-position-before svg`,
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

    isNotEmpty(attributes['metaDateIconSpacing']) && data.push({
        'type': 'plain',
        'id': 'metaDateIconSpacing',
        'responsive' : true,
        'selector': `.${elementId} .guten-postblock .guten-postblock-content .guten-post-meta .guten-meta-date.icon-position-after i, .${elementId} .guten-postblock .guten-postblock-content .guten-post-meta .guten-meta-date.icon-position-after svg`,
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

    data.push({
        'type': 'plain',
        'id': 'postMetaInline',
        'responsive' : true,
        'selector': `.${elementId} .guten-postblock .guten-postblock-content .guten-post-meta`,
        'properties': [
            {
                'name': 'display',
                'valueType': 'function',
                'functionName': 'handleSimpleCondition',
                'functionProps' : {
                    'valueTrue' : 'inline-flex',
                    'valueFalse' : 'flex'
                }
            }
        ],
    });
    return data;
};

export default postMetaStyle;