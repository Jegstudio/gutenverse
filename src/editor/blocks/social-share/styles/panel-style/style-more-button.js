import { isNotEmpty } from 'gutenverse-core/helper';

const moreButtonStyle = (elementId, attributes, data) => {
    const buttonSelector = `.editor-styles-wrapper .${elementId} .gutenverse-share-more-toggle`;
    const iconSelector = `${buttonSelector} .gutenverse-share-more-icon svg`;

    isNotEmpty(attributes['moreButtonSize']) && data.push({
        type: 'plain',
        id: 'moreButtonSize',
        responsive: true,
        selector: buttonSelector,
        properties: [
            { name: 'width', valueType: 'pattern', pattern: '{value}px', patternValues: { value: { type: 'direct' } } },
            { name: 'height', valueType: 'pattern', pattern: '{value}px', patternValues: { value: { type: 'direct' } } },
            { name: 'min-width', valueType: 'function', valueFunc: () => '0' },
            { name: 'min-height', valueType: 'function', valueFunc: () => '0' }
        ]
    });

    isNotEmpty(attributes['moreButtonIconSize']) && data.push({
        type: 'plain',
        id: 'moreButtonIconSize',
        responsive: true,
        selector: iconSelector,
        properties: [
            { name: 'width', valueType: 'pattern', pattern: '{value}px', patternValues: { value: { type: 'direct' } } },
            { name: 'height', valueType: 'pattern', pattern: '{value}px', patternValues: { value: { type: 'direct' } } }
        ]
    });

    isNotEmpty(attributes['moreButtonIconColor']) && data.push({
        type: 'color',
        id: 'moreButtonIconColor',
        selector: iconSelector,
        properties: [{ name: 'color', valueType: 'direct' }]
    });

    isNotEmpty(attributes['moreButtonIconColorHover']) && data.push({
        type: 'color',
        id: 'moreButtonIconColorHover',
        selector: `${buttonSelector}:hover .gutenverse-share-more-icon svg`,
        properties: [{ name: 'color', valueType: 'direct' }]
    });

    isNotEmpty(attributes['moreButtonBackgroundColor']) && data.push({
        type: 'color',
        id: 'moreButtonBackgroundColor',
        selector: buttonSelector,
        properties: [{ name: 'background-color', valueType: 'direct' }]
    });

    isNotEmpty(attributes['moreButtonBackgroundColorHover']) && data.push({
        type: 'color',
        id: 'moreButtonBackgroundColorHover',
        selector: `${buttonSelector}:hover`,
        properties: [{ name: 'background-color', valueType: 'direct' }]
    });

    isNotEmpty(attributes['moreButtonPadding']) && data.push({
        type: 'dimension',
        id: 'moreButtonPadding',
        responsive: true,
        selector: buttonSelector,
        properties: [{ name: 'padding', valueType: 'direct' }]
    });

    isNotEmpty(attributes['moreButtonBorderRadius']) && data.push({
        type: 'plain',
        id: 'moreButtonBorderRadius',
        responsive: true,
        selector: buttonSelector,
        properties: [{
            name: 'border-radius',
            valueType: 'pattern',
            pattern: '{value}px',
            patternValues: { value: { type: 'direct' } }
        }]
    });

    isNotEmpty(attributes['moreButtonBoxShadow']) && data.push({
        type: 'boxShadow',
        id: 'moreButtonBoxShadow',
        selector: buttonSelector,
        properties: [{ name: 'box-shadow', valueType: 'direct' }]
    });

    isNotEmpty(attributes['moreButtonBoxShadowHover']) && data.push({
        type: 'boxShadow',
        id: 'moreButtonBoxShadowHover',
        selector: `${buttonSelector}:hover`,
        properties: [{ name: 'box-shadow', valueType: 'direct' }]
    });

    return data;
};

export default moreButtonStyle;
