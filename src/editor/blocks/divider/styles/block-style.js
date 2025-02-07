import { isNotEmpty } from 'gutenverse-core/helper';
const getBlockStyle = (elementId, attributes) => {
    let data = [];

    isNotEmpty(attributes['contentColor']) && data.push({
        'type': 'color',
        'id': 'contentColor',
        'selector': `.${elementId} .guten-divider-content span, .${elementId} .guten-divider-content i`,
        'properties': [
            {
                'name' : 'color',
                'valueType' : 'direct'
            }
        ]
    });

    isNotEmpty(attributes['contentSpacing']) && data.push({
        'type': 'plain',
        'id': 'contentSpacing',
        'responsive': true,
        'selector': `.${elementId} .guten-divider-content span, .${elementId} .guten-divider-content i`,
        'properties': [
            {
                'name' : 'margin',
                'valueType' : 'pattern',
                'pattern' : '0 {value}px',
                'patternValues' : {
                    'value' : {
                        'type' : 'direct'
                    }
                }
            }
        ]
    });

    isNotEmpty(attributes['typography']) && data.push({
        'type': 'typography',
        'id': 'typography',
        'selector': `.${elementId} .guten-divider-content span`,
    });

    isNotEmpty(attributes['iconSize']) && data.push({
        'type': 'unitPoint',
        'id': 'iconSize',
        'selector': `.${elementId} .guten-divider-content i`,
        'responsive' : true,
        'properties' : [
            {
                'name' : 'font-size',
                'valueType' : 'direct'
            }
        ]
    });

    /**Panel Divider */
    isNotEmpty(attributes['width']) && data.push({
        'type': 'plain',
        'id': 'width',
        'selector': `.${elementId} .guten-divider-wrapper`,
        'responsive': true,
        'properties': [
            {
                'name' : 'width',
                'valueType' : 'pattern',
                'pattern' : '{value}%',
                'patternValues' : {
                    'value' : {
                        'type' : 'direct'
                    }
                }
            }
        ]
    });

    isNotEmpty(attributes['size']) && data.push({
        'type': 'plain',
        'id': 'size',
        'selector': `.${elementId} .guten-divider-style`,
        'responsive': true,
        'properties': [
            {
                'name' : '--divider-pattern-height',
                'valueType' : 'pattern',
                'pattern' : '{value}px',
                'patternValues' : {
                    'value' : {
                        'type' : 'direct'
                    }
                }
            }
        ]
    });

    isNotEmpty(attributes['size']) && data.push({
        'type': 'plain',
        'id': 'size',
        'selector': `.${elementId} .guten-divider-line`,
        'responsive': true,
        'properties': [
            {
                'name' : 'border-width',
                'valueType' : 'pattern',
                'pattern' : '{value}px',
                'patternValues' : {
                    'value' : {
                        'type' : 'direct'
                    }
                }
            }
        ]
    });

    isNotEmpty(attributes['gap']) && data.push({
        'type': 'plain',
        'id': 'gap',
        'selector': `.${elementId} .guten-divider-wrapper`,
        'responsive': true,
        'properties': [
            {
                'name' : 'padding',
                'valueType' : 'pattern',
                'pattern' : '{value}px 0',
                'patternValues' : {
                    'value' : {
                        'type' : 'direct'
                    }
                }
            }
        ]
    });

    isNotEmpty(attributes['dividerColor']) && data.push({
        'type': 'color',
        'id': 'dividerColor',
        'selector': `.${elementId} .guten-divider-line`,
        'properties': [
            {
                'name' : 'border-color',
                'valueType' : 'direct',
            }
        ]
    });

    isNotEmpty(attributes['dividerColor']) && data.push({
        'type': 'color',
        'id': 'dividerColor',
        'selector': `.${elementId} .guten-divider-style`,
        'properties': [
            {
                'name' : 'background-color',
                'valueType' : 'direct',
            }
        ]
    });

    isNotEmpty(attributes['dividerAlign']) && data.push({
        'type': 'plain',
        'id': 'dividerAlign',
        'selector': `.${elementId}.wp-block-gutenverse-divider`,
        'responsive' : true,
        'properties': [
            {
                'name' : 'justify-content',
                'valueType' : 'direct',
            }
        ]
    });

    /**Panel List */
    isNotEmpty(attributes['background']) && data.push({
        'type': 'background',
        'id': 'background',
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
    });

    isNotEmpty(attributes['backgroundHover']) && data.push({
        'type': 'background',
        'id': 'backgroundHover',
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}:hover`,
    });

    isNotEmpty(attributes['border']) && data.push({
        'type': 'border',
        'id': 'border',
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
    });

    isNotEmpty(attributes['borderHover']) && data.push({
        'type': 'border',
        'id': 'borderHover',
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}:hover`,
    });

    isNotEmpty(attributes['borderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderResponsive',
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
    });

    isNotEmpty(attributes['borderResponsiveHover']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderResponsiveHover',
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}:hover`,
    });

    isNotEmpty(attributes['boxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'boxShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
    });

    isNotEmpty(attributes['boxShadowHover']) && data.push({
        'type': 'boxShadow',
        'id': 'boxShadowHover',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}:hover`,
    });

    isNotEmpty(attributes['mask']) && data.push({
        'type': 'mask',
        'id': 'mask',
        'responsive': true,
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
    });

    isNotEmpty(attributes['padding']) && data.push({
        'type': 'dimension',
        'id': 'padding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
    });

    isNotEmpty(attributes['margin']) && data.push({
        'type': 'dimension',
        'id': 'margin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
    });

    isNotEmpty(attributes['zIndex']) && data.push({
        'type': 'plain',
        'id': 'zIndex',
        'responsive': true,
        'properties': [
            {
                'name': 'z-index',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
    });

    isNotEmpty(attributes['animation']) && isNotEmpty(attributes['animation']['delay']) && data.push({
        'type': 'plain',
        'id': 'animation',
        'properties': [
            {
                'name': 'animation-delay',
                'valueType': 'pattern',
                'pattern': '{value}ms',
                'patternValues': {
                    'value': {
                        'type': 'attribute',
                        'key': 'delay',
                    },

                }
            }
        ],
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
    });

    //Positioning Panel
    isNotEmpty(attributes['positioningType']) && data.push(
        {
            'type': 'positioning',
            'id': 'positioningType',
            'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
            'skipDeviceType': 'first',
            'attributeType': 'type',
            'requestAttributes': [
                'inBlock'
            ]
        },
        {
            'type': 'positioning',
            'id': 'positioningType',
            'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
            'skipDeviceType': 'second',
            'attributeType': 'type',
            'requestAttributes': [
                'positioningWidth',
                'inBlock'
            ]
        }
    );
    isNotEmpty(attributes['positioningWidth']) && data.push({
        'type': 'positioning',
        'id': 'positioningWidth',
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
        'skipDeviceType': 'first',
        'attributeType': 'width',
        'requestAttributes': [
            'positioningType',
            'inBlock'
        ]
    });
    isNotEmpty(attributes['positioningAlign']) && data.push({
        'type': 'plain',
        'id': 'positioningAlign',
        'responsive': true,
        'property': ['align-self'],
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
    },
    {
        'type': 'positioning',
        'id': 'positioningAlign',
        'property': ['vertical-align'],
        'attributeType': 'align',
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
    });
    isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
        'type': 'plain',
        'id': 'positioningLocation',
        'property': ['position'],
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
    });
    isNotEmpty(attributes['positioningLeft']) && isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
        'type': 'positioning',
        'id': 'positioningLeft',
        'property': ['left'],
        'responsive': true,
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
        'attributeType': 'custom',
    });
    isNotEmpty(attributes['positioningRight']) && isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
        'type': 'positioning',
        'id': 'positioningRight',
        'property': ['right'],
        'responsive': true,
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
        'attributeType': 'custom',
    });
    isNotEmpty(attributes['positioningTop']) && isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
        'type': 'positioning',
        'id': 'positioningTop',
        'property': ['top'],
        'responsive': true,
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
        'attributeType': 'custom',
    });
    isNotEmpty(attributes['positioningBottom']) && isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
        'type': 'positioning',
        'id': 'positioningBottom',
        'property': ['bottom'],
        'responsive': true,
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
        'attributeType': 'custom',
    });

    return data;
};

export default getBlockStyle;