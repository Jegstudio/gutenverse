import { isNotEmpty } from 'gutenverse-core/helper';
import { getDeviceType } from 'gutenverse-core/editor-helper';

const getBlockStyle = (elementId, attributes) => {
    let data = [];
    const device = getDeviceType()
    
    //panel content
    isNotEmpty(attributes['formStyle']) && attributes['formStyle'][device] === '100%' && data.push(
        {
            'type': 'plain',
            'id': 'formStyle',
            'selector': `.${elementId} .gutenverse-search.gutenverse-search-input`,
            'properties': [
                {
                    'name': 'width',
                    'valueType': 'pattern',
                    'pattern': '{value} !important',
                    'patternValues': {
                        'value': {
                            'type': 'direct',
                        },
                    }
                }
            ],
            'responsive': true,
        },
        {
            'type': 'plain',
            'id': 'formStyle',
            'selector': `.${elementId} .search-input-container`,
            'properties': [
                {
                    'name': 'max-width',
                    'valueType': 'pattern',
                    'pattern': 'none !important',
                },
                {
                    'name': 'width',
                    'valueType': 'pattern',
                    'pattern': '{value} !important',
                    'patternValues': {
                        'value': {
                            'type': 'direct',
                        },
                    }
                },
            ],
            'responsive': true,
        },
        {
            'type': 'plain',
            'id': 'formStyle',
            'selector': `.${elementId} .gutenverse-search-form`,
            'properties': [
                {
                    'name': 'align-items',
                    'valueType': 'pattern',
                    'pattern': 'center',
                }
            ],
            'responsive': true,
        },
        {
            'type': 'plain',
            'id': 'formStyle',
            'selector': `.${elementId} .gutenverse-search-form .guten-search-button-wrapper`,
            'properties': [
                {
                    'name': 'width',
                    'valueType': 'pattern',
                    'pattern': '{value} !important',
                    'patternValues': {
                        'value': {
                            'type': 'direct',
                        },
                    }
                }
            ],
            'responsive': true,
        },
    );
    
    isNotEmpty(attributes['inputHeight']) && data.push(
        {
            'type': 'plain',
            'id': 'inputHeight',
            'selector': `.${elementId} .gutenverse-search.gutenverse-search-input, .${elementId} .guten-button-wrapper .guten-button `,
            'properties': [
                {
                    'name': 'height',
                    'valueType': 'pattern',
                    'pattern': '{value}px!important',
                    'patternValues': {
                        'value': {
                            'type': 'direct',
                        },
                    }
                }
            ],
            'responsive': true,
        },
    );
    
    isNotEmpty(attributes['inputWidth']) && data.push(
        {
            'type': '%' !== attributes['inputWidth'][device]['unit'] ? 'unitPoint' : 'plain',
            'id': 'inputWidth',
            'selector': `.${elementId} .gutenverse-search.gutenverse-search-input, .${elementId} .gutenverse-search-form .gutenverse-search-input, .${elementId} .search-input-container .gutenverse-search.gutenverse-search-input`,
            'properties': '%' !== attributes['inputWidth'][device]['unit'] ? 
                [{
                    'name': 'width',
                    'valueType': 'direct',
                    'important': true
                }] :
                [{
                    'name': 'width',
                    'valueType': 'pattern',
                    'pattern': '100% !important',
                }],
            'responsive': true,
        },
        {
            'type': 'unitPoint',
            'id': 'inputWidth',
            'responsive': true,
            'selector': `.${elementId} .search-input-container`,
            'properties': [
                {
                    'name': 'width',
                    'valueType': 'direct'
                }
            ],
        }
    );
    isNotEmpty(attributes['buttonWidth']) && isNotEmpty(attributes['formStyle']) && '100%' !== attributes['formStyle'][device] && data.push(
        {
            'type': 'unitPoint',
            'id': 'buttonWidth',
            'selector': `.${elementId} .gutenverse-search-form .guten-search-button-wrapper`,
            'properties': [{
                'name': 'width',
                'valueType': 'direct',
                'important': true
            }],
            'responsive': true,
        },
    )

    isNotEmpty(attributes['buttonWidth']) && data.push(
        {
            'type': 'plain',
            'id': 'buttonWidth',
            'selector': `.${elementId} .search-input-container`,
            'properties': [
                {
                    'name': 'max-width',
                    'valueType': 'function',
                    'functionName': 'searchButtonContainerWidth',
                }
            ],
            'responsive': true,
        },
    );
    
    isNotEmpty(attributes['alignContent']) && data.push(
        {
            'type': 'plain',
            'id': 'alignContent',
            'selector': `.${elementId} .gutenverse-search-form`,
            'properties': [
                {
                    'name': 'justify-content',
                    'valueType': 'pattern',
                    'pattern': '{value}',
                    'patternValues': {
                        'value': {
                            'type': 'direct',
                        },
                    }
                }
            ],
            'responsive': true,
        },
    );
    isNotEmpty(attributes['alignContent']) && isNotEmpty(attributes['formStyle']) && '100%' === attributes['formStyle'][device] && data.push(
        {
            'type': 'plain',
            'id': 'alignContent',
            'selector': `.${elementId} .search-input-container`,
            'properties': [
                {
                    'name': 'justify-content',
                    'valueType': 'pattern',
                    'pattern': '{value}',
                    'patternValues': {
                        'value': {
                            'type': 'direct',
                        },
                    }
                }
            ],
            'responsive': true,
        },
    );

    //panel input
    isNotEmpty(attributes['inputPadding']) && data.push({
        'type': 'dimension',
        'id': 'inputPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .gutenverse-search.gutenverse-search-input`,
    });

    isNotEmpty(attributes['inputMargin']) && data.push({
        'type': 'dimension',
        'id': 'inputMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .gutenverse-search.gutenverse-search-input`,
    });
    
    isNotEmpty(attributes['placeholderColor']) && data.push({
        'type': 'color',
        'id': 'placeholderColor',
        'responsive': true,
        'selector': `.${elementId} .gutenverse-search-input::placeholder`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });
    
    isNotEmpty(attributes['inputTypography']) && data.push({
        'type': 'typography',
        'id': 'inputTypography',
        'selector': `.${elementId} .gutenverse-search.gutenverse-search-input`,
    });
    
    isNotEmpty(attributes['inputColorNormal']) && data.push({
        'type': 'color',
        'id': 'inputColorNormal',
        'responsive': true,
        'selector': `.${elementId} .gutenverse-search.gutenverse-search-input`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['inputBgColorNormal']) && data.push({
        'type': 'color',
        'id': 'inputBgColorNormal',
        'responsive': true,
        'selector': `.${elementId} .gutenverse-search.gutenverse-search-input`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct'
            }
        ],
    });
    
    isNotEmpty(attributes['inputBorderNormal']) && data.push({
        'type': 'border',
        'id': 'inputBorderNormal',
        'selector': `.${elementId} .gutenverse-search.gutenverse-search-input`,
    });

    isNotEmpty(attributes['inputBorderNormalResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'inputBorderNormalResponsive',
        'selector': `.${elementId} .gutenverse-search.gutenverse-search-input`,
    });
    
    isNotEmpty(attributes['inputColorHover']) && data.push({
        'type': 'color',
        'id': 'inputColorHover',
        'responsive': true,
        'selector': `.${elementId} .gutenverse-search.gutenverse-search-input:hover`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['inputBgColorHover']) && data.push({
        'type': 'color',
        'id': 'inputBgColorHover',
        'responsive': true,
        'selector': `.${elementId} .gutenverse-search.gutenverse-search-input:hover`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct'
            }
        ],
    });
    
    isNotEmpty(attributes['inputBorderHover']) && data.push({
        'type': 'border',
        'id': 'inputBorderHover',
        'selector': `.${elementId} .gutenverse-search.gutenverse-search-input:hover`,
    });

    isNotEmpty(attributes['inputBorderHoverResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'inputBorderHoverResponsive',
        'selector': `.${elementId} .gutenverse-search.gutenverse-search-input:hover`,
    });
    
    isNotEmpty(attributes['inputColorFocus']) && data.push({
        'type': 'color',
        'id': 'inputColorFocus',
        'responsive': true,
        'selector': `.${elementId} .gutenverse-search.gutenverse-search-input:focus`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['inputBgColorFocus']) && data.push({
        'type': 'color',
        'id': 'inputBgColorFocus',
        'responsive': true,
        'selector': `.${elementId} .gutenverse-search.gutenverse-search-input:focus`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct'
            }
        ],
    });
    
    isNotEmpty(attributes['inputBorderFocus']) && data.push(
        {
            'type': 'border',
            'id': 'inputBorderFocus',
            'selector': `.${elementId} .gutenverse-search.gutenverse-search-input:focus`,
        },
        {
            'type': 'plain',
            'id': 'inputBorderFocus',
            'selector': `.${elementId} .gutenverse-search.gutenverse-search-input:focus-visible`,
            'properties':[
                {
                    'name': 'outline',
                    'valueType': 'pattern',
                    'pattern': 'none !important',
                }
            ]
        }
    );

    isNotEmpty(attributes['inputBorderFocusResponsive']) && data.push(
        {
            'type': 'borderResponsive',
            'id': 'inputBorderFocusResponsive',
            'selector': `.${elementId} .gutenverse-search.gutenverse-search-input:focus`,
        },
        {
            'type': 'plain',
            'id': 'inputBorderFocusResponsive',
            'selector': `.${elementId} .gutenverse-search.gutenverse-search-input:focus-visible`,
            'properties':[
                {
                    'name': 'outline',
                    'valueType': 'pattern',
                    'pattern': 'none !important',
                }
            ]
        }
    );
    
    isNotEmpty(attributes['inputAreaBoxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'inputAreaBoxShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .gutenverse-search.gutenverse-search-input, .${elementId} .guten-button-wrapper .guten-button`,
    });

    isNotEmpty(attributes['inputAreaBoxShadowHover']) && data.push({
        'type': 'boxShadow',
        'id': 'inputAreaBoxShadowHover',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .gutenverse-search.gutenverse-search-input:hover, .${elementId} .guten-button-wrapper .guten-button:hover`,
    });

    isNotEmpty(attributes['inputAreaBoxShadowFocus']) && data.push({
        'type': 'boxShadow',
        'id': 'inputAreaBoxShadowFocus',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .gutenverse-search.gutenverse-search-input:hover, .${elementId} .guten-button-wrapper .guten-button:focus`,
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
            'multiAttr': {
                'positioningType': attributes['positioningType'],
                'inBlock': attributes['inBlock']
            }
        },
    );
    isNotEmpty(attributes['positioningType']) && isNotEmpty(attributes['positioningWidth']) && data.push(
        {
            'type': 'positioning',
            'id': 'positioningType',
            'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
            'skipDeviceType': 'second',
            'attributeType': 'type',
            'multiAttr': {
                'positioningWidth': attributes['positioningWidth'],
                'positioningType': attributes['positioningType'],
                'inBlock': attributes['inBlock']
            }
        }
    );
    isNotEmpty(attributes['positioningWidth']) && isNotEmpty(attributes['positioningType']) && data.push({
        'type': 'positioning',
        'id': 'positioningWidth',
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
        'skipDeviceType': 'first',
        'attributeType': 'width',
        'multiAttr': {
            'positioningWidth': attributes['positioningWidth'],
            'positioningType': attributes['positioningType'],
            'inBlock': attributes['inBlock']
        }
    });
    isNotEmpty(attributes['positioningAlign']) && data.push({
        'type': 'plain',
        'id': 'positioningAlign',
        'responsive': true,
        'properties': [
            {
                'name' : 'align-self',
                'valueType' : 'direct'
            }
        ],
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
        'properties': [
            {
                'name' : 'position',
                'valueType' : 'direct'
            }
        ],
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