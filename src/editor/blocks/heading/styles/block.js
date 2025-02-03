import { isEmpty } from 'gutenverse-core/helper';

const getBlockStyle = (elementId, attributes) => {
    let data = [];

    !isEmpty(attributes['textAlign']) && data.push({
        'type': 'plain',
        'id': 'textAlign',
        'selector': `.${elementId}`,
        'property': ['text-align'],
        'responsive': true,
    });

    !isEmpty(attributes['color']) && data.push({
        'type': 'color',
        'id': 'color',
        'selector': `h1.guten-element.${elementId},h2.guten-element.${elementId},h3.guten-element.${elementId},h4.guten-element.${elementId},h5.guten-element.${elementId},h6.guten-element.${elementId}`,
        'property': ['color'],
    });

    !isEmpty(attributes['typography']) && data.push({
        'type': 'typography',
        'id': 'typography',
        'selector': `h1.guten-element.${elementId},h2.guten-element.${elementId},h3.guten-element.${elementId},h4.guten-element.${elementId},h5.guten-element.${elementId},h6.guten-element.${elementId}`,
    });

    !isEmpty(attributes['textShadow']) && data.push({
        'type': 'textShadow',
        'id': 'textShadow',
        'property': ['text-shadow'],
        'selector': `h1.guten-element.${elementId},h2.guten-element.${elementId},h3.guten-element.${elementId},h4.guten-element.${elementId},h5.guten-element.${elementId},h6.guten-element.${elementId}`,
    });

    !isEmpty(attributes['textStroke']) && data.push({
        'type': 'textStroke',
        'id': 'textStroke',
        'selector': `h1.guten-element.${elementId},h2.guten-element.${elementId},h3.guten-element.${elementId},h4.guten-element.${elementId},h5.guten-element.${elementId},h6.guten-element.${elementId}`,
    });

    !isEmpty(attributes['overflowWrap']) && data.push({
        'type': 'plain',
        'id': 'overflowWrap',
        'responsive': true,
        'property': ['overflow-wrap', 'word-break'],
        'selector': `h1.guten-element.${elementId},h2.guten-element.${elementId},h3.guten-element.${elementId},h4.guten-element.${elementId},h5.guten-element.${elementId},h6.guten-element.${elementId}`,
    });

    !isEmpty(attributes['background']) && data.push({
        'type': 'background',
        'id': 'background',
        'selector': `h1.guten-element.${elementId},h2.guten-element.${elementId},h3.guten-element.${elementId},h4.guten-element.${elementId},h5.guten-element.${elementId},h6.guten-element.${elementId}`,
    });

    !isEmpty(attributes['backgroundHover']) && data.push({
        'type': 'background',
        'id': 'backgroundHover',
        'selector': `h1.guten-element.${elementId}:hover,h2.guten-element.${elementId}:hover,h3.guten-element.${elementId}:hover,h4.guten-element.${elementId}:hover,h5.guten-element.${elementId}:hover,h6.guten-element.${elementId}:hover`,
    });

    !isEmpty(attributes['border']) && data.push({
        'type': 'border',
        'id': 'border',
        'selector': `h1.guten-element.${elementId},h2.guten-element.${elementId},h3.guten-element.${elementId},h4.guten-element.${elementId},h5.guten-element.${elementId},h6.guten-element.${elementId}`,
    });

    !isEmpty(attributes['borderHover']) && data.push({
        'type': 'border',
        'id': 'borderHover',
        'selector': `h1.guten-element.${elementId}:hover,h2.guten-element.${elementId}:hover,h3.guten-element.${elementId}:hover,h4.guten-element.${elementId}:hover,h5.guten-element.${elementId}:hover,h6.guten-element.${elementId}:hover`,
    });

    !isEmpty(attributes['borderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderResponsive',
        'selector': `h1.guten-element.${elementId},h2.guten-element.${elementId},h3.guten-element.${elementId},h4.guten-element.${elementId},h5.guten-element.${elementId},h6.guten-element.${elementId}`,
    });

    !isEmpty(attributes['borderResponsiveHover']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderResponsiveHover',
        'selector': `h1.guten-element.${elementId}:hover,h2.guten-element.${elementId}:hover,h3.guten-element.${elementId}:hover,h4.guten-element.${elementId}:hover,h5.guten-element.${elementId}:hover,h6.guten-element.${elementId}:hover`,
    });

    !isEmpty(attributes['boxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'boxShadow',
        'property': ['box-shadow'],
        'selector': `h1.guten-element.${elementId},h2.guten-element.${elementId},h3.guten-element.${elementId},h4.guten-element.${elementId},h5.guten-element.${elementId},h6.guten-element.${elementId}`,
    });

    !isEmpty(attributes['boxShadowHover']) && data.push({
        'type': 'boxShadow',
        'id': 'boxShadowHover',
        'property': ['box-shadow'],
        'selector': `h1.guten-element.${elementId}:hover,h2.guten-element.${elementId}:hover,h3.guten-element.${elementId}:hover,h4.guten-element.${elementId}:hover,h5.guten-element.${elementId}:hover,h6.guten-element.${elementId}:hover`,
    });

    !isEmpty(attributes['mask']) && data.push({
        'type': 'mask',
        'id': 'mask',
        'responsive': true,
        'selector': `h1.guten-element.${elementId},h2.guten-element.${elementId},h3.guten-element.${elementId},h4.guten-element.${elementId},h5.guten-element.${elementId},h6.guten-element.${elementId}`,
    });

    !isEmpty(attributes['padding']) && data.push({
        'type': 'dimension',
        'id': 'padding',
        'responsive': true,
        'property': ['padding'],
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
    });

    !isEmpty(attributes['margin']) && data.push({
        'type': 'dimension',
        'id': 'margin',
        'responsive': true,
        'property': ['margin'],
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
    });

    !isEmpty(attributes['zIndex']) && data.push({
        'type': 'plain',
        'id': 'zIndex',
        'responsive': true,
        'property': ['z-index'],
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
    });

    !isEmpty(attributes['animation']) && !isEmpty(attributes['animation']['delay']) && data.push({
        'type': 'plain',
        'id' : 'animation',
        'property': ['animation-delay'],
        'selector': `.${elementId}`,
        'valueCSS' : '{value}ms',
        'values' : {
            'value' : {
                'type' : 'attribute',
                'key'  : 'delay'
            }
        }
    });

    return data;
};


export default getBlockStyle;