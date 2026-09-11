import { isNotEmpty } from 'gutenverse-core/helper';

const itemStyle = (elementId, attributes, data) => {
    const parsedPrimaryButtonCount = parseInt(attributes['primaryButtonCount'], 10);
    const primaryButtonCount = Math.max(isNaN(parsedPrimaryButtonCount) ? 2 : parsedPrimaryButtonCount, 0);
    const hasPrimaryButtonCount = primaryButtonCount > 0;
    const isSolidButton = attributes['buttonLayout'] === 'solid';
    const isHorizontalStretch = attributes['orientation'] !== 'vertical' && attributes['layoutMode'] === 'stretch';
    const orderedItemSelectors = hasPrimaryButtonCount ? Array.from({ length: primaryButtonCount }, (value, index) => `.editor-styles-wrapper .${elementId} .guten-social-share-item-wrapper.guten-social-share-item-order-${index + 1}`) : [`.editor-styles-wrapper .${elementId} .guten-social-share-item-wrapper.guten-social-share-item-order-0`];
    const orderedShareItemSelector = orderedItemSelectors.map(selector => `${selector} .gutenverse-share-item`).join(', ');
    const orderedShareItemAnchorSelector = orderedItemSelectors.map(selector => `${selector} .gutenverse-share-item a`).join(', ');
    const orderedShareItemTextSelector = orderedItemSelectors.map(selector => selector.replace(`.editor-styles-wrapper .${elementId}`, `.editor-styles-wrapper .${elementId}:not(.button-layout-solid)`) + ' .gutenverse-share-text').join(', ');

    isNotEmpty(attributes['primaryButtonWidth']) && hasPrimaryButtonCount && !isHorizontalStretch && data.push({
        'type': 'unitPoint',
        'id': 'primaryButtonWidth',
        'responsive' : true,
        'properties': [
            {
                'name': 'width',
                'valueType': 'direct'
            }
        ],
        'selector': orderedShareItemSelector,
    });

    isNotEmpty(attributes['primaryButtonWidth']) && hasPrimaryButtonCount && !isHorizontalStretch && data.push({
        'type': 'plain',
        'id': 'primaryButtonWidth',
        'responsive' : true,
        'properties': [
            {
                'name': 'width',
                'valueType': 'function',
                'valueFunc': () => '100%',
            }
        ],
        'selector': orderedShareItemAnchorSelector,
    });

    isNotEmpty(attributes['primaryButtonWidth']) && hasPrimaryButtonCount && !isSolidButton && !isHorizontalStretch && data.push({
        'type': 'plain',
        'id': 'primaryButtonWidth',
        'responsive' : true,
        'properties': [
            {
                'name': 'flex',
                'valueType': 'function',
                'valueFunc': () => '1 1 auto',
            }
        ],
        'selector': orderedShareItemTextSelector,
    });

    isNotEmpty(attributes['buttonHeight']) && data.push({
        'type': 'plain',
        'id': 'buttonHeight',
        'responsive': true,
        'selector': `.editor-styles-wrapper .${elementId} .gutenverse-share-item a, .editor-styles-wrapper .${elementId} .gutenverse-share-more-toggle`,
        'properties': [
            {
                'name': 'height',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct'
                    }
                }
            }
        ],
    });

    isNotEmpty(attributes['buttonHeight']) && data.push({
        'type': 'plain',
        'id': 'buttonHeight',
        'responsive': true,
        'selector': `.editor-styles-wrapper .${elementId} .gutenverse-share-more-toggle`,
        'properties': [
            {
                'name': 'width',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct'
                    }
                }
            }
        ],
    });

    isNotEmpty(attributes['buttonContentAlign']) && isSolidButton && data.push({
        'type': 'plain',
        'id': 'buttonContentAlign',
        'responsive': true,
        'selector': `.editor-styles-wrapper .${elementId} .gutenverse-share-item a`,
        'properties': [
            {
                'name': 'justify-content',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['buttonIconGap']) && isSolidButton && data.push({
        'type': 'plain',
        'id': 'buttonIconGap',
        'responsive': true,
        'selector': `.editor-styles-wrapper .${elementId} .gutenverse-share-item.has-text .gutenverse-share-icon`,
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
        ],
    });

    isNotEmpty(attributes['buttonBackgroundColor']) && isSolidButton && data.push({
        'type': 'color',
        'id': 'buttonBackgroundColor',
        'selector': `.editor-styles-wrapper .${elementId} .gutenverse-share-item a`,
        'properties' : [
            {
                'name' : 'background-color',
                'valueType' : 'direct'
            }
        ]
    });

    isNotEmpty(attributes['buttonBackgroundColorHover']) && isSolidButton && data.push({
        'type': 'color',
        'id': 'buttonBackgroundColorHover',
        'selector': `.editor-styles-wrapper .${elementId} .gutenverse-share-item:hover a`,
        'properties' : [
            {
                'name' : 'background-color',
                'valueType' : 'direct'
            }
        ]
    });

    isNotEmpty(attributes['typography']) && data.push({
        'type': 'typography',
        'id': 'typography',
        'selector': `.editor-styles-wrapper .${elementId} .gutenverse-share-item .gutenverse-share-text`,
    });

    isNotEmpty(attributes['iconSize']) && data.push({
        'type': 'unitPoint',
        'id': 'iconSize',
        'responsive' : true,
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'direct'
            },
            {
                'name': 'width',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .${elementId} .gutenverse-share-item svg`,
    });

    isNotEmpty(attributes['iconColor']) && data.push({
        'type': 'color',
        'id': 'iconColor',
        'selector': `.editor-styles-wrapper .${elementId} .gutenverse-share-item .gutenverse-share-icon svg`,
        'properties' : [
            {
                'name' : 'color',
                'valueType' : 'direct'
            }
        ]
    });

    isNotEmpty(attributes['iconBackgroundColor']) && !isSolidButton && data.push({
        'type': 'color',
        'id': 'iconBackgroundColor',
        'selector': `.editor-styles-wrapper .${elementId} .gutenverse-share-item .gutenverse-share-icon`,
        'properties' : [
            {
                'name' : 'background-color',
                'valueType' : 'direct'
            }
        ]
    });

    isNotEmpty(attributes['backgroundColor']) && !isSolidButton && data.push({
        'type': 'color',
        'id': 'backgroundColor',
        'selector': `.editor-styles-wrapper .${elementId} .gutenverse-share-item .gutenverse-share-text`,
        'properties' : [
            {
                'name' : 'background-color',
                'valueType' : 'direct'
            }
        ]
    });

    isNotEmpty(attributes['textColor']) && data.push({
        'type': 'color',
        'id': 'textColor',
        'selector': `.editor-styles-wrapper .${elementId} .gutenverse-share-item .gutenverse-share-text`,
        'properties' : [
            {
                'name' : 'color',
                'valueType' : 'direct'
            }
        ]
    });

    isNotEmpty(attributes['borderType']) && data.push({
        'type': 'border',
        'id': 'borderType',
        'selector': `.editor-styles-wrapper .${elementId} .gutenverse-share-item, .editor-styles-wrapper .${elementId} .gutenverse-share-more-toggle`,
    });

    isNotEmpty(attributes['borderTypeResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderTypeResponsive',
        'selector': `.editor-styles-wrapper .${elementId} .gutenverse-share-item, .editor-styles-wrapper .${elementId} .gutenverse-share-more-toggle`,
    });

    isNotEmpty(attributes['iconColorHover']) && data.push({
        'type': 'color',
        'id': 'iconColorHover',
        'selector': `.editor-styles-wrapper .${elementId} .gutenverse-share-item:hover .gutenverse-share-icon svg`,
        'properties' : [
            {
                'name' : 'color',
                'valueType' : 'direct'
            }
        ]
    });

    isNotEmpty(attributes['iconBackgroundColorHover']) && !isSolidButton && data.push({
        'type': 'color',
        'id': 'iconBackgroundColorHover',
        'selector': `.editor-styles-wrapper .${elementId} .gutenverse-share-item:hover .gutenverse-share-icon`,
        'properties' : [
            {
                'name' : 'background-color',
                'valueType' : 'direct'
            }
        ]
    });

    isNotEmpty(attributes['backgroundColorHover']) && !isSolidButton && data.push({
        'type': 'color',
        'id': 'backgroundColorHover',
        'selector': `.editor-styles-wrapper .${elementId} .gutenverse-share-item:hover .gutenverse-share-text`,
        'properties' : [
            {
                'name' : 'background-color',
                'valueType' : 'direct'
            }
        ]
    });

    isNotEmpty(attributes['textColorHover']) && data.push({
        'type': 'color',
        'id': 'textColorHover',
        'selector': `.editor-styles-wrapper .${elementId} .gutenverse-share-item:hover .gutenverse-share-text`,
        'properties' : [
            {
                'name' : 'color',
                'valueType' : 'direct'
            }
        ]
    });

    isNotEmpty(attributes['borderTypeHover']) && data.push({
        'type': 'border',
        'id': 'borderTypeHover',
        'selector': `.editor-styles-wrapper .${elementId} .gutenverse-share-item:hover, .editor-styles-wrapper .${elementId} .gutenverse-share-more-toggle:hover`,
    });

    isNotEmpty(attributes['borderTypeHoverResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderTypeHoverResponsive',
        'selector': `.editor-styles-wrapper .${elementId} .gutenverse-share-item:hover, .editor-styles-wrapper .${elementId} .gutenverse-share-more-toggle:hover`,
    });
    return data;
};

export default itemStyle;
