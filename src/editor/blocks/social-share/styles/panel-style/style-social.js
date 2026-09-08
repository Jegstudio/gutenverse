import { isNotEmpty } from 'gutenverse-core/helper';

const socialStyle = (elementId, attributes, data) => {
    const isHorizontalStretch = attributes['orientation'] !== 'vertical' && attributes['layoutMode'] === 'stretch';
    const visibleButtonCount = parseInt(attributes['visibleButtonCount'], 10) || 2;
    const hiddenStartIndex = visibleButtonCount + 1;
    const parsedPrimaryButtonCount = parseInt(attributes['primaryButtonCount'], 10);
    const primaryButtonCount = Math.max(isNaN(parsedPrimaryButtonCount) ? 2 : parsedPrimaryButtonCount, 2);
    const hiddenPreviewSelector = `.editor-styles-wrapper .${elementId}.has-more-toggle > .guten-social-share-item-wrapper:nth-of-type(n+${hiddenStartIndex})`;
    const stretchItemSelectors = Array.from({ length: primaryButtonCount }, (value, index) => `.editor-styles-wrapper .${elementId}.stretch-layout.horizontal .guten-social-share-item-wrapper.guten-social-share-item-order-${index + 1}`);
    const stretchInnerWrapperSelector = stretchItemSelectors.map(selector => `${selector} > div`).join(', ');
    const stretchShareItemSelector = stretchItemSelectors.map(selector => `${selector} .gutenverse-share-item`).join(', ');
    const stretchShareItemAnchorSelector = stretchItemSelectors.map(selector => `${selector} .gutenverse-share-item a`).join(', ');

    attributes['enableMoreButton'] && data.push({
        'type': 'plain',
        'id': 'enableMoreButton',
        'selector': hiddenPreviewSelector,
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

    isHorizontalStretch && data.push({
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

    isHorizontalStretch && data.push({
        'type': 'plain',
        'id': 'layoutMode',
        'selector': stretchItemSelectors.join(', '),
        'properties': [
            {
                'name': 'flex',
                'valueType': 'function',
                'valueFunc': () => '1 1 320px !important',
            },
            {
                'name': 'max-width',
                'valueType': 'function',
                'valueFunc': () => 'none !important',
            },
            {
                'name': 'min-width',
                'valueType': 'function',
                'valueFunc': () => '0',
            },
            {
                'name': 'width',
                'valueType': 'function',
                'valueFunc': () => 'auto !important',
            }
        ],
    });

    isHorizontalStretch && data.push({
        'type': 'plain',
        'id': 'layoutMode',
        'selector': `${stretchInnerWrapperSelector}, ${stretchShareItemSelector}, ${stretchShareItemAnchorSelector}`,
        'properties': [
            {
                'name': 'display',
                'valueType': 'function',
                'valueFunc': () => 'flex',
            },
            {
                'name': 'width',
                'valueType': 'function',
                'valueFunc': () => '100% !important',
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

    isNotEmpty(attributes['gap']) && !isHorizontalStretch && data.push({
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

    isNotEmpty(attributes['gap']) && !isHorizontalStretch && attributes['enableMoreButton'] && data.push({
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

    isNotEmpty(attributes['gap']) && isHorizontalStretch && data.push({
        'type': 'plain',
        'id': 'gap',
        'responsive' : true,
        'properties': [
            {
                'name': 'gap',
                'valueType': 'pattern',
                'pattern' : '{value}px',
                'patternValues' : {
                    'value' : {
                        'type' : 'direct'
                    }
                }
            }
        ],
        'selector': `.editor-styles-wrapper .${elementId}.stretch-layout.horizontal`,
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
