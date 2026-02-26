import { isNotEmpty } from 'gutenverse-core/helper';
import { applyFilters } from '@wordpress/hooks';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { backgroundStyle } from 'gutenverse-core/controls';

const getBlockStyle = (elementId, attributes) => {
    let data = [];
    data = backgroundStyle({ attributes, data, elementId });
    const device = getDeviceType();

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

    isNotEmpty(attributes['inputWidth']) && isNotEmpty(attributes['inputWidth'][device]) && data.push(
        {
            'type': 'unitPoint',
            'id': 'inputWidth',
            'responsive': true,
            'selector': `.${elementId} .search-input-container-outer`,
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
    );

    isNotEmpty(attributes['buttonWidth']) && data.push(
        {
            'type': 'plain',
            'id': 'buttonWidth',
            'selector': `.${elementId} .search-input-container-outer`,
            'properties': [
                {
                    'name': 'max-width',
                    'valueType': 'function',
                    'functionName': 'searchButtonContainerWidth',
                }
            ],
            'skip_device': ['Mobile'],
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
        'selector': `.${elementId} .search-input-container-outer .search-input-container .gutenverse-search.gutenverse-search-input`,
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
        'selector': `.${elementId} .search-input-container-outer`,
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

    /** Selector  .search-input-container*/
    isNotEmpty(attributes['inputColorNormal']) && data.push({
        'type': 'color',
        'id': 'inputColorNormal',
        'responsive': true,
        'selector': `.${elementId} .search-input-container-outer .search-input-container .gutenverse-search.gutenverse-search-input`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['inputColorNormal']) && data.push({
        'type': 'color',
        'id': 'inputColorNormal',
        'responsive': true,
        'selector': `.${elementId} .gutenverse-search-form .search-input-container-outer .search-input-container  input:autofill`,
        'properties': [
            {
                'name': '-webkit-text-fill-color',
                'valueType': 'direct',
                'important': true
            }
        ],
    });

    isNotEmpty(attributes['inputBgColorNormal']) && data.push({
        'type': 'color',
        'id': 'inputBgColorNormal',
        'responsive': true,
        'selector': `.${elementId} .search-input-container-outer .search-input-container .gutenverse-search.gutenverse-search-input`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['inputBgColorNormal']) && data.push(
        {
            'type': 'plain',
            'id': 'inputBgColorNormal',
            'selector': `.${elementId} .gutenverse-search-form .search-input-container-outer .search-input-container  input:autofill`,
            'properties': [
                {
                    'name': 'box-shadow',
                    'valueType': 'function',
                    'functionName': 'handleInputAutofillBackgroundColor',
                },
            ],
            'responsive': true,
        },
    );

    isNotEmpty(attributes['inputBorderNormal']) && data.push({
        'type': 'border',
        'id': 'inputBorderNormal',
        'selector': `.${elementId} .search-input-container-outer .search-input-container .gutenverse-search.gutenverse-search-input`,
    });

    isNotEmpty(attributes['inputBorderNormalResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'inputBorderNormalResponsive',
        'selector': `.${elementId} .search-input-container-outer .search-input-container .gutenverse-search.gutenverse-search-input`,
    });

    isNotEmpty(attributes['inputColorHover']) && data.push({
        'type': 'color',
        'id': 'inputColorHover',
        'responsive': true,
        'selector': `.${elementId} .search-input-container-outer .search-input-container .gutenverse-search.gutenverse-search-input:hover`,
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
        'selector': `.${elementId} .search-input-container-outer .search-input-container .gutenverse-search.gutenverse-search-input:hover`,
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
        'selector': `.${elementId} .search-input-container-outer .search-input-container .gutenverse-search.gutenverse-search-input:hover`,
    });

    isNotEmpty(attributes['inputBorderHoverResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'inputBorderHoverResponsive',
        'selector': `.${elementId} .search-input-container-outer .search-input-container .gutenverse-search.gutenverse-search-input:hover`,
    });

    isNotEmpty(attributes['inputColorFocus']) && data.push({
        'type': 'color',
        'id': 'inputColorFocus',
        'responsive': true,
        'selector': `.${elementId} .search-input-container-outer .search-input-container .gutenverse-search.gutenverse-search-input:focus`,
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
        'selector': `.${elementId} .search-input-container-outer .search-input-container .gutenverse-search.gutenverse-search-input:focus`,
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
            'selector': `.${elementId} .search-input-container-outer .search-input-container .gutenverse-search.gutenverse-search-input:focus`,
        },
        {
            'type': 'plain',
            'id': 'inputBorderFocus',
            'selector': `.${elementId} .search-input-container-outer .search-input-container .gutenverse-search.gutenverse-search-input:focus-visible`,
            'properties': [
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
            'selector': `.${elementId} .search-input-container-outer .search-input-container .gutenverse-search.gutenverse-search-input:focus`,
        },
        {
            'type': 'plain',
            'id': 'inputBorderFocusResponsive',
            'selector': `.${elementId} .search-input-container-outer .search-input-container .gutenverse-search.gutenverse-search-input:focus-visible`,
            'properties': [
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
        'selector': `.${elementId} .search-input-container-outer .search-input-container .gutenverse-search.gutenverse-search-input, .${elementId} .guten-button-wrapper .guten-button`,
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
        'selector': `.${elementId} .search-input-container-outer .search-input-container .gutenverse-search.gutenverse-search-input:hover, .${elementId} .guten-button-wrapper .guten-button:hover`,
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
        'selector': `.${elementId} .search-input-container-outer .search-input-container .gutenverse-search.gutenverse-search-input:hover, .${elementId} .guten-button-wrapper .guten-button:focus`,
    });

    /**Panel List */

    isNotEmpty(attributes['border']) && data.push({
        'type': 'border',
        'id': 'border',
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}.guten-element`,
    });

    isNotEmpty(attributes['borderHover']) && data.push({
        'type': 'border',
        'id': 'borderHover',
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}.guten-element:hover`,
    });

    isNotEmpty(attributes['borderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderResponsive',
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}.guten-element`,
    });

    isNotEmpty(attributes['borderResponsiveHover']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderResponsiveHover',
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}.guten-element:hover`,
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
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}.guten-element`,
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
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}.guten-element:hover`,
    });

    isNotEmpty(attributes['mask']) && data.push({
        'type': 'mask',
        'id': 'mask',
        'responsive': true,
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}.guten-element`,
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
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}.guten-element`,
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
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}.guten-element`,
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
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}.guten-element`,
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
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}.guten-element`,
    });

    //Positioning Panel
    isNotEmpty(attributes['positioningType']) && data.push(
        {
            'type': 'positioning',
            'id': 'positioningType',
            'selector': `.${elementId}.guten-element`,
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
            'selector': `.${elementId}.guten-element`,
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
        'selector': `.${elementId}.guten-element`,
        'skipDeviceType': 'first',
        'attributeType': 'width',
        'multiAttr': {
            'positioningWidth': attributes['positioningWidth'],
            'positioningType': attributes['positioningType'],
            'inBlock': attributes['inBlock']
        }
    });
    isNotEmpty(attributes['positioningAlign']) && data.push(
        {
            'type': 'plain',
            'id': 'positioningAlign',
            'responsive': true,
            'properties': [
                {
                    'name': 'align-self',
                    'valueType': 'direct'
                }
            ],
            'selector': `.${elementId}.guten-element`,
        },
        {
            'type': 'positioning',
            'id': 'positioningAlign',
            'properties': [
                {
                    'name': 'vertical-align',
                    'valueType': 'direct'
                }
            ],
            'attributeType': 'align',
            'selector': `.${elementId}.guten-element`,
        }
    );
    isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
        'type': 'plain',
        'id': 'positioningLocation',
        'properties': [
            {
                'name': 'position',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.guten-element`,
    });
    isNotEmpty(attributes['positioningLeft']) && isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
        'type': 'positioning',
        'id': 'positioningLeft',
        'properties': [
            {
                'name': 'left',
                'valueType': 'direct'
            }
        ],
        'responsive': true,
        'selector': `.${elementId}.guten-element`,
        'attributeType': 'custom',
    });
    isNotEmpty(attributes['positioningRight']) && isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
        'type': 'positioning',
        'id': 'positioningRight',
        'properties': [
            {
                'name': 'right',
                'valueType': 'direct'
            }
        ],
        'responsive': true,
        'selector': `.${elementId}.guten-element`,
        'attributeType': 'custom',
    });
    isNotEmpty(attributes['positioningTop']) && isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
        'type': 'positioning',
        'id': 'positioningTop',
        'properties': [
            {
                'name': 'top',
                'valueType': 'direct'
            }
        ],
        'responsive': true,
        'selector': `.${elementId}.guten-element`,
        'attributeType': 'custom',
    });
    isNotEmpty(attributes['positioningBottom']) && isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
        'type': 'positioning',
        'id': 'positioningBottom',
        'properties': [
            {
                'name': 'bottom',
                'valueType': 'direct'
            }
        ],
        'responsive': true,
        'selector': `.${elementId}.guten-element`,
        'attributeType': 'custom',
    });

    /* Close Icon Style */
    isNotEmpty(attributes['closeIconSize']) && data.push({
        'type': 'plain',
        'id': 'closeIconSize',
        'responsive': true,
        'selector': `.${elementId} .gutenverse-search-form .search-input-container .close-icon`,
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

    isNotEmpty(attributes['closeIconSize']) && data.push({
        'type': 'plain',
        'id': 'closeIconSize',
        'responsive': true,
        'selector': `.${elementId} .gutenverse-search-form .search-input-container .close-icon svg`,
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

    isNotEmpty(attributes['closeIconRotate']) && data.push({
        'type': 'plain',
        'id': 'closeIconRotate',
        'responsive': true,
        'selector': `.${elementId} .gutenverse-search-form .search-input-container .close-icon `,
        'properties': [
            {
                'name': 'transform',
                'valueType': 'pattern',
                'pattern': 'rotate({value}deg)',
                'patternValues': {
                    'value': {
                        'type': 'direct'
                    }
                }
            }
        ]
    });
    isNotEmpty(attributes['closeIconMargin']) && data.push({
        'type': 'dimension',
        'id': 'closeIconMargin',
        'responsive': true,
        'selector': `.${elementId} .gutenverse-search-form .search-input-container .close-icon `,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct',
            }
        ]
    });
    isNotEmpty(attributes['closeIconPadding']) && data.push({
        'type': 'dimension',
        'id': 'closeIconPadding',
        'responsive': true,
        'selector': `.${elementId} .gutenverse-search-form .search-input-container .close-icon `,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ]
    });
    isNotEmpty(attributes['closeIconColor']) && data.push({
        'type': 'color',
        'id': 'closeIconColor',
        'responsive': true,
        'selector': `.${elementId} .gutenverse-search-form .search-input-container .close-icon`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['closeIconColor']) && data.push({
        'type': 'color',
        'id': 'closeIconColor',
        'responsive': true,
        'selector': `.${elementId} .gutenverse-search-form .search-input-container .close-icon svg`,
        'properties': [
            {
                'name': 'fill',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['closeIconColorHover']) && data.push({
        'type': 'color',
        'id': 'closeIconColorHover',
        'responsive': true,
        'selector': `.${elementId} .gutenverse-search-form .search-input-container:hover .close-icon`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['closeIconColorHover']) && data.push({
        'type': 'color',
        'id': 'closeIconColorHover',
        'responsive': true,
        'selector': `.${elementId} .gutenverse-search-form .search-input-container:hover .close-icon svg`,
        'properties': [
            {
                'name': 'fill',
                'valueType': 'direct',
            }
        ]
    });

    return [
        ...data,
        ...applyFilters(
            'gutenverse.search.blockStyle',
            [],
            {
                elementId,
                attributes
            }
        )
    ];
};


export default getBlockStyle;