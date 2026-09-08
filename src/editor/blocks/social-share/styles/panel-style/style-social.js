import { isNotEmpty } from 'gutenverse-core/helper';

const socialStyle = (elementId, attributes, data) => {
    const visibleButtonCount = parseInt(attributes['visibleButtonCount'], 10) || 2;
    const hiddenPreviewSelectors = attributes['enableMoreButton'] ? Array.from({ length: 20 }, (value, index) => index + 1)
        .filter(index => index > visibleButtonCount)
        .map(index => `.editor-styles-wrapper .${elementId}.has-more-toggle .guten-social-share-item-wrapper.guten-social-share-item-order-${index}`) : [];

    hiddenPreviewSelectors.length && data.push({
        'type': 'plain',
        'id': 'enableMoreButton',
        'selector': hiddenPreviewSelectors.join(', '),
        'properties': [
            {
                'name': 'opacity',
                'valueType': 'function',
                'valueFunc': () => '0.45',
            },
            {
                'name': 'order',
                'valueType': 'function',
                'valueFunc': () => '2',
            }
        ],
    });

    attributes['enableMoreButton'] && data.push({
        'type': 'plain',
        'id': 'enableMoreButton',
        'selector': `.editor-styles-wrapper .${elementId}.has-more-toggle > .gutenverse-share-more-toggle`,
        'properties': [
            {
                'name': 'order',
                'valueType': 'function',
                'valueFunc': () => '1',
            }
        ],
    });

    isNotEmpty(attributes['layoutMode']) && attributes['layoutMode'] === 'stretch' && data.push({
        'type': 'plain',
        'id': 'layoutMode',
        'selector': `.editor-styles-wrapper .${elementId}.guten-social-share`,
        'properties': [
            {
                'name': 'width',
                'valueType': 'function',
                'valueFunc': () => '100%',
            },
            {
                'name': 'align-items',
                'valueType': 'function',
                'valueFunc': () => 'stretch',
            }
        ],
    });

    isNotEmpty(attributes['alignment']) && data.push({
        'type': 'plain',
        'id': 'alignment',
        'responsive': true,
        'selector': `.editor-styles-wrapper .${elementId}, .editor-styles-wrapper .${elementId}.vertical > div`,
        'properties': [
            {
                'name': 'justify-content',
                'valueType': 'direct',
            },
            {
                'name': 'align-items',
                'valueType': 'direct',
            }
        ],
    });
    isNotEmpty(attributes['alignment']) && data.push({
        'type': 'plain',
        'id': 'alignment',
        'responsive': true,
        'selector': `.editor-styles-wrapper .${elementId}.horizontal`,
        'properties': [
            {
                'name': 'text-align',
                'valueType': 'function',
                'functionName': 'handleAlign'
            }
        ],
    });
    isNotEmpty(attributes['gap']) && data.push({
        'type': 'plain',
        'id': 'gap',
        'responsive' : true,
        'properties': [
            {
                'name': 'margin-left',
                'valueType': 'pattern',
                'pattern' : '{value}px',
                'patternValues' : {
                    'value' : {
                        'type' : 'direct'
                    }
                }
            }
        ],
        'selector': `.editor-styles-wrapper .${elementId}.horizontal > div:not(:first-of-type), .editor-styles-wrapper .${elementId}.horizontal > .gutenverse-share-more-toggle`,
    });

    isNotEmpty(attributes['gap']) && attributes['enableMoreButton'] && data.push({
        'type': 'plain',
        'id': 'gap',
        'responsive' : true,
        'properties': [
            {
                'name': 'row-gap',
                'valueType': 'pattern',
                'pattern' : '{value}px',
                'patternValues' : {
                    'value' : {
                        'type' : 'direct'
                    }
                }
            }
        ],
        'selector': `.editor-styles-wrapper .${elementId}.has-more-toggle.horizontal`,
    });

    isNotEmpty(attributes['gap']) && data.push({
        'type': 'plain',
        'id': 'gap',
        'responsive' : true,
        'properties': [
            {
                'name': 'margin-top',
                'valueType': 'pattern',
                'pattern' : '{value}px',
                'patternValues' : {
                    'value' : {
                        'type' : 'direct'
                    }
                }
            }
        ],
        'selector': `.editor-styles-wrapper .${elementId}.vertical > div:not(:first-of-type), .editor-styles-wrapper .${elementId}.vertical > .gutenverse-share-more-toggle`,
    });
    return data;
};

export default socialStyle;
