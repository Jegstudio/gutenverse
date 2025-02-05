import { isNotEmpty } from 'gutenverse-core/helper';

const getBlockStyle = (elementId, attributes) => {
    let data = [];

    isNotEmpty(attributes['textAlign']) && data.push({
        'type': 'plain',
        'id': 'textAlign',
        'selector': `h1.guten-element.${elementId},h2.guten-element.${elementId},h3.guten-element.${elementId},h4.guten-element.${elementId},h5.guten-element.${elementId},h6.guten-element.${elementId}`,
        'property': ['text-align'],
        'responsive': true,
    });

    isNotEmpty(attributes['color']) && data.push({
        'type': 'color',
        'id': 'color',
        'selector': `h1.guten-element.${elementId},h2.guten-element.${elementId},h3.guten-element.${elementId},h4.guten-element.${elementId},h5.guten-element.${elementId},h6.guten-element.${elementId}`,
        'property': ['color'],
    });

    isNotEmpty(attributes['typography']) && data.push({
        'type': 'typography',
        'id': 'typography',
        'selector': `h1.guten-element.${elementId},h2.guten-element.${elementId},h3.guten-element.${elementId},h4.guten-element.${elementId},h5.guten-element.${elementId},h6.guten-element.${elementId}`,
    });

    isNotEmpty(attributes['textShadow']) && data.push({
        'type': 'textShadow',
        'id': 'textShadow',
        'property': ['text-shadow'],
        'selector': `h1.guten-element.${elementId},h2.guten-element.${elementId},h3.guten-element.${elementId},h4.guten-element.${elementId},h5.guten-element.${elementId},h6.guten-element.${elementId}`,
    });

    isNotEmpty(attributes['textStroke']) && data.push({
        'type': 'textStroke',
        'id': 'textStroke',
        'selector': `h1.guten-element.${elementId},h2.guten-element.${elementId},h3.guten-element.${elementId},h4.guten-element.${elementId},h5.guten-element.${elementId},h6.guten-element.${elementId}`,
    });

    isNotEmpty(attributes['overflowWrap']) && data.push({
        'type': 'plain',
        'id': 'overflowWrap',
        'responsive': true,
        'property': ['overflow-wrap', 'word-break'],
        'selector': `h1.guten-element.${elementId},h2.guten-element.${elementId},h3.guten-element.${elementId},h4.guten-element.${elementId},h5.guten-element.${elementId},h6.guten-element.${elementId}`,
    });

    isNotEmpty(attributes['background']) && data.push({
        'type': 'background',
        'id': 'background',
        'selector': `h1.guten-element.${elementId},h2.guten-element.${elementId},h3.guten-element.${elementId},h4.guten-element.${elementId},h5.guten-element.${elementId},h6.guten-element.${elementId}`,
    });

    isNotEmpty(attributes['backgroundHover']) && data.push({
        'type': 'background',
        'id': 'backgroundHover',
        'selector': `h1.guten-element.${elementId}:hover,h2.guten-element.${elementId}:hover,h3.guten-element.${elementId}:hover,h4.guten-element.${elementId}:hover,h5.guten-element.${elementId}:hover,h6.guten-element.${elementId}:hover`,
    });

    isNotEmpty(attributes['border']) && data.push({
        'type': 'border',
        'id': 'border',
        'selector': `h1.guten-element.${elementId},h2.guten-element.${elementId},h3.guten-element.${elementId},h4.guten-element.${elementId},h5.guten-element.${elementId},h6.guten-element.${elementId}`,
    });

    isNotEmpty(attributes['borderHover']) && data.push({
        'type': 'border',
        'id': 'borderHover',
        'selector': `h1.guten-element.${elementId}:hover,h2.guten-element.${elementId}:hover,h3.guten-element.${elementId}:hover,h4.guten-element.${elementId}:hover,h5.guten-element.${elementId}:hover,h6.guten-element.${elementId}:hover`,
    });

    isNotEmpty(attributes['borderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderResponsive',
        'selector': `h1.guten-element.${elementId},h2.guten-element.${elementId},h3.guten-element.${elementId},h4.guten-element.${elementId},h5.guten-element.${elementId},h6.guten-element.${elementId}`,
    });

    isNotEmpty(attributes['borderResponsiveHover']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderResponsiveHover',
        'selector': `h1.guten-element.${elementId}:hover,h2.guten-element.${elementId}:hover,h3.guten-element.${elementId}:hover,h4.guten-element.${elementId}:hover,h5.guten-element.${elementId}:hover,h6.guten-element.${elementId}:hover`,
    });

    isNotEmpty(attributes['boxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'boxShadow',
        'property': ['box-shadow'],
        'selector': `h1.guten-element.${elementId},h2.guten-element.${elementId},h3.guten-element.${elementId},h4.guten-element.${elementId},h5.guten-element.${elementId},h6.guten-element.${elementId}`,
    });

    isNotEmpty(attributes['boxShadowHover']) && data.push({
        'type': 'boxShadow',
        'id': 'boxShadowHover',
        'property': ['box-shadow'],
        'selector': `h1.guten-element.${elementId}:hover,h2.guten-element.${elementId}:hover,h3.guten-element.${elementId}:hover,h4.guten-element.${elementId}:hover,h5.guten-element.${elementId}:hover,h6.guten-element.${elementId}:hover`,
    });

    isNotEmpty(attributes['mask']) && data.push({
        'type': 'mask',
        'id': 'mask',
        'responsive': true,
        'selector': `h1.guten-element.${elementId},h2.guten-element.${elementId},h3.guten-element.${elementId},h4.guten-element.${elementId},h5.guten-element.${elementId},h6.guten-element.${elementId}`,
    });

    isNotEmpty(attributes['padding']) && data.push({
        'type': 'dimension',
        'id': 'padding',
        'responsive': true,
        'property': ['padding'],
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
    });

    isNotEmpty(attributes['margin']) && data.push({
        'type': 'dimension',
        'id': 'margin',
        'responsive': true,
        'property': ['margin'],
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
    });

    isNotEmpty(attributes['zIndex']) && data.push({
        'type': 'plain',
        'id': 'zIndex',
        'responsive': true,
        'property': ['z-index'],
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
    });

    isNotEmpty(attributes['animation']) && isNotEmpty(attributes['animation']['delay']) && data.push({
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
    //Positioning Panel
    isNotEmpty(attributes['positioningType']) && data.push(
        {
            'type': 'positioning',
            'id' : 'positioningType',
            'selector': `.wp-block-gutenverse-heading.${elementId}`,
            'skipDeviceType': 'first',
            'attributeType': 'type',
            'requestAttributes': {
                'isRequested': true,
                'attributeList': [
                    'inBlock'
                ]
            }
        },
        {
            'type': 'positioning',
            'id' : 'positioningType',
            'selector': `.wp-block-gutenverse-heading.${elementId}`,
            'skipDeviceType' : 'second',
            'attributeType': 'type',
            'requestAttributes': {
                'isRequested': true,
                'attributeList': [
                    'positioningWidth',
                    'inBlock'
                ]
            }
        }
    );
    isNotEmpty(attributes['positioningWidth']) && data.push({
        'type': 'positioning',
        'id' : 'positioningWidth',
        'selector': `.wp-block-gutenverse-heading.${elementId}`,
        'skipDeviceType' : 'first',
        'attributeType': 'width',
        'requestAttributes': {
            'isRequested': true,
            'attributeList': [
                'positioningType',
                'inBlock'
            ]
        }
    });
    isNotEmpty(attributes['positioningAlign']) && data.push({
        'type': 'plain',
        'id' : 'positioningAlign',
        'responsive': true,
        'property': ['align-self'],
        'selector': `.wp-block-gutenverse-heading.${elementId}`,
    },
    {
        'type': 'positioning',
        'id' : 'positioningAlign',
        'property': ['vertical-align'],
        'attributeType': 'align',
        'selector': `.wp-block-gutenverse-heading.${elementId}`,
    });
    isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
        'type': 'plain',
        'id' : 'positioningLocation',
        'property': ['position'],
        'selector': `.wp-block-gutenverse-heading.${elementId}`,
    });
    isNotEmpty(attributes['positioningLeft']) && isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
        'type': 'positioning',
        'id' : 'positioningLeft',
        'property': ['left'],
        'responsive': true,
        'selector': `.wp-block-gutenverse-heading.${elementId}`,
        'attributeType': 'custom',
    });
    isNotEmpty(attributes['positioningRight']) && isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
        'type': 'positioning',
        'id' : 'positioningRight',
        'property': ['right'],
        'responsive': true,
        'selector': `.wp-block-gutenverse-heading.${elementId}`,
        'attributeType': 'custom',
    });
    isNotEmpty(attributes['positioningTop']) && isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
        'type': 'positioning',
        'id' : 'positioningTop',
        'property': ['top'],
        'responsive': true,
        'selector': `.wp-block-gutenverse-heading.${elementId}`,
        'attributeType': 'custom',
    });
    isNotEmpty(attributes['positioningBottom']) && isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
        'type': 'positioning',
        'id' : 'positioningBottom',
        'property': ['bottom'],
        'responsive': true,
        'selector': `.wp-block-gutenverse-heading.${elementId}`,
        'attributeType': 'custom',
    });

    return data;
};


export default getBlockStyle;