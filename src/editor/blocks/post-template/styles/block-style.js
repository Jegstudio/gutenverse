import { getDeviceType } from 'gutenverse-core/editor-helper';
import { isNotEmpty } from 'gutenverse-core/helper';
import { applyFilters } from '@wordpress/hooks';
import { backgroundStyle } from 'gutenverse-core/controls';

const getBlockStyle = (elementId, attributes) => {
    let data = [];
    const selector = `.guten-flex-container-editor.${elementId}`;
    const device = getDeviceType();

    data = backgroundStyle({
        attributes,
        data,
        backgroundSelector: `.${elementId}:not(.background-animated), .${elementId}.background-animated > .guten-background-animated .animated-layer, .${elementId}.empty-container`,
        backgroundHoverSelector: `.${elementId}:not(.background-animated):hover, .${elementId}.background-animated:hover > .guten-background-animated .animated-layer, .${elementId}.empty-container:hover`,
    });

    const {
        containerLayout
    } = attributes;

    // Container Width (when full width)
    isNotEmpty(attributes['containerLayout']) && isNotEmpty(attributes['containerWidth']) && data.push({
        'type': 'unitPoint',
        'id': 'containerWidth',
        'responsive': true,
        'selector': {
            'Desktop': containerLayout === 'full-width' ? selector : `${selector}`,
            'Tablet': containerLayout === 'full-width' ? selector : `${selector}`,
            'Mobile': containerLayout === 'full-width' ? `.guten-flex-container-editor > div > .guten-inner-container-editor > ${selector}` : `${selector}`,
        },
        'properties': [
            {
                'name': 'width',
                'valueType': 'direct'
            }
        ],
    });

    // Min Height
    isNotEmpty(attributes['minHeight']) && data.push({
        'type': 'unitPoint',
        'id': 'minHeight',
        'responsive': true,
        'selector': selector,
        'properties': [
            {
                'name': 'height',
                'valueType': 'direct'
            }
        ],
    });

    // Flex Direction
    isNotEmpty(attributes['flexDirection']) && data.push({
        'type': 'plain',
        'id': 'flexDirection',
        'responsive': true,
        'selector': `${selector}`,
        'properties': [
            {
                'name': 'flex-direction',
                'valueType': 'direct'
            }
        ],
    });

    // Justify Content
    isNotEmpty(attributes['justifyContent']) && data.push({
        'type': 'plain',
        'id': 'justifyContent',
        'responsive': true,
        'selector': `${selector}`,
        'properties': [
            {
                'name': 'justify-content',
                'valueType': 'direct'
            }
        ],
    });

    // Align Items
    isNotEmpty(attributes['alignItems']) && data.push({
        'type': 'plain',
        'id': 'alignItems',
        'responsive': true,
        'selector': `${selector}`,
        'properties': [
            {
                'name': 'align-items',
                'valueType': 'direct'
            }
        ],
    });

    // Column Gap
    isNotEmpty(attributes['columnGap']) && data.push({
        'type': 'unitPoint',
        'id': 'columnGap',
        'responsive': true,
        'selector': `${selector}`,
        'properties': [
            {
                'name': 'column-gap',
                'valueType': 'direct'
            }
        ],
    });

    // Row Gap
    isNotEmpty(attributes['rowGap']) && data.push({
        'type': 'unitPoint',
        'id': 'rowGap',
        'responsive': true,
        'selector': `${selector}`,
        'properties': [
            {
                'name': 'row-gap',
                'valueType': 'direct'
            }
        ],
    });

    // Flex Wrap
    isNotEmpty(attributes['flexWrap']) && data.push({
        'type': 'plain',
        'id': 'flexWrap',
        'responsive': true,
        'selector': `${selector}`,
        'properties': [
            {
                'name': 'flex-wrap',
                'valueType': 'direct'
            }
        ],
    });

    // Align Content (only when wrap is enabled)
    isNotEmpty(attributes['alignContent']) && isNotEmpty(attributes['flexWrap']) && attributes['flexWrap'][device] === 'wrap' && data.push({
        'type': 'plain',
        'id': 'alignContent',
        'responsive': true,
        'selector': `${selector}`,
        'properties': [
            {
                'name': 'align-content',
                'valueType': 'direct'
            }
        ],
    });

    // Overflow
    isNotEmpty(attributes['overflow']) && data.push({
        'type': 'plain',
        'id': 'overflow',
        'selector': selector,
        'properties': [
            {
                'name': 'overflow',
                'valueType': 'direct'
            }
        ],
    });


    isNotEmpty(attributes['blur']) && data.push({
        'type': 'plain',
        'id': 'blur',
        'responsive': true,
        'selector': `.${elementId}:before`,
        'properties': [
            {
                'name': '-webkit-backdrop-filter',
                'valueType': 'pattern',
                'pattern': 'blur({value}px)',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    },
                }
            },
            {
                'name': 'backdrop-filter',
                'valueType': 'pattern',
                'pattern': 'blur({value}px)',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    },
                }
            }
        ],
    });

    isNotEmpty(attributes['blurHover']) && data.push({
        'type': 'plain',
        'id': 'blurHover',
        'responsive': true,
        'selector': `.${elementId}:hover::before`,
        'properties': [
            {
                'name': '-webkit-backdrop-filter',
                'valueType': 'pattern',
                'pattern': 'blur({value}px)',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    },
                }
            },
            {
                'name': 'backdrop-filter',
                'valueType': 'pattern',
                'pattern': 'blur({value}px)',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    },
                }
            }
        ],
    });

    isNotEmpty(attributes['topDivider']) && data.push({
        'type': 'shapeDivider',
        'id': 'topDivider',
        'selector': `.${elementId} .guten-shape-divider.guten-shape-divider-top svg, .${elementId} .guten-shape-divider.guten-shape-divider-top .guten-shape-fill path`,
    });

    isNotEmpty(attributes['bottomDivider']) && data.push({
        'type': 'shapeDivider',
        'id': 'bottomDivider',
        'selector': `.${elementId} .guten-shape-divider.guten-shape-divider-bottom svg, .${elementId} .guten-shape-divider.guten-shape-divider-bottom .guten-shape-fill path`,
    });

    isNotEmpty(attributes['backgroundOverlay']) && data.push({
        'type': 'background',
        'id': 'backgroundOverlay',
        'selector': `.${elementId} > .guten-background-overlay`,
    });

    isNotEmpty(attributes['backgroundOverlayHover']) && data.push({
        'type': 'background',
        'id': 'backgroundOverlayHover',
        'selector': `.${elementId}:hover > .guten-background-overlay`,
    });

    isNotEmpty(attributes['opacity']) && data.push({
        'type': 'plain',
        'id': 'opacity',
        'selector': `.${elementId} > .guten-background-overlay`,
        'properties': [
            {
                'name': 'opacity',
                'valueType': 'direct',
            }
        ],
    });

    isNotEmpty(attributes['opacityHover']) && data.push({
        'type': 'plain',
        'id': 'opacityHover',
        'selector': `.${elementId}:hover > .guten-background-overlay`,
        'properties': [
            {
                'name': 'opacity',
                'valueType': 'direct',
            }
        ],
    });

    /** Border **/
    isNotEmpty(attributes['border']) && data.push({
        'type': 'border',
        'id': 'border',
        'selector': `${selector}`,
    });

    isNotEmpty(attributes['borderHover']) && data.push({
        'type': 'border',
        'id': 'borderHover',
        'selector': `${selector}:hover`,
    });

    isNotEmpty(attributes['borderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderResponsive',
        'selector': `${selector}`,
    });

    isNotEmpty(attributes['borderResponsiveHover']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderResponsiveHover',
        'selector': `${selector}:hover`,
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
        'selector': `${selector}`,
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
        'selector': `${selector}:hover`,
    });

    /** Mask */
    isNotEmpty(attributes['mask']) && data.push({
        'type': 'mask',
        'id': 'mask',
        'responsive': true,
        'selector': `${selector}`,
    });

    /** Positioning Panel */
    isNotEmpty(attributes['positioningType']) && data.push({
        'type': 'positioning',
        'id': 'positioningType',
        'selector': `${selector}`,
        'skipDeviceType': 'first',
        'attributeType': 'type',
        'multiAttr': {
            'positioningType': attributes['positioningType'],
            'inBlock': attributes['inBlock']
        }
    });
    isNotEmpty(attributes['positioningType']) && isNotEmpty(attributes['positioningWidth']) && data.push({
        'type': 'positioning',
        'id': 'positioningType',
        'selector': `${selector}`,
        'skipDeviceType': 'second',
        'attributeType': 'type',
        'multiAttr': {
            'positioningWidth': attributes['positioningWidth'],
            'positioningType': attributes['positioningType'],
            'inBlock': attributes['inBlock']
        }
    });
    isNotEmpty(attributes['positioningWidth']) && isNotEmpty(attributes['positioningType']) && data.push({
        'type': 'positioning',
        'id': 'positioningWidth',
        'selector': `${selector}`,
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
            'selector': `${selector}`,
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
            'selector': `${selector}`,
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
        'selector': `${selector}`,
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
        'selector': `${selector}`,
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
        'selector': `${selector}`,
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
        'selector': `${selector}`,
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
        'selector': `${selector}`,
        'attributeType': 'custom',
    });

    /** Position Flex Item */

    // Flex Align Self
    isNotEmpty(attributes['flexAlignSelf']) && data.push({
        'type': 'plain',
        'id': 'flexAlignSelf',
        'responsive': true,
        'selector': selector,
        'properties': [
            {
                'name': 'align-self',
                'valueType': 'direct'
            }
        ],
    });

    // Flex Order - responsive handling
    const flexOrder = attributes['flexOrder'];
    const flexCustomOrder = attributes['flexCustomOrder'];
    if (isNotEmpty(flexOrder)) {
        data.push({
            'type': 'plain',
            'id': 'flexOrder',
            'responsive': true,
            'selector': selector,
            'properties': [
                {
                    'name': 'order',
                    'valueType': 'function',
                    'valueFunc': (value) => {
                        if (value === 'start') {
                            return '-9999';
                        }
                        if (value === 'end') {
                            return '9999';
                        }
                        return undefined; // Skip 'custom', let flexCustomOrder handle it
                    }
                }
            ],
        });
        if (isNotEmpty(flexCustomOrder)) {
            data.push({
                'type': 'plain',
                'id': 'flexCustomOrder',
                'responsive': true,
                'selector': selector,
                'properties': [
                    {
                        'name': 'order',
                        'valueType': 'function',
                        'valueFunc': (value, deviceType) => {
                            // Only apply custom order if flexOrder is 'custom' for this device
                            if (flexOrder[deviceType] === 'custom') {
                                return value;
                            }
                            return undefined;
                        }
                    }
                ],
            });
        }
    }

    // Flex Size (grow/shrink) - responsive handling
    const flexSize = attributes['flexSize'];
    const flexSizeGrow = attributes['flexSizeGrow'];
    const flexSizeShrink = attributes['flexSizeShrink'];
    if (isNotEmpty(flexSize)) {
        // Handle grow preset
        data.push({
            'type': 'plain',
            'id': 'flexSize',
            'responsive': true,
            'selector': selector,
            'properties': [
                {
                    'name': 'flex-grow',
                    'valueType': 'function',
                    'valueFunc': (value) => value === 'grow' ? '1' : undefined
                }
            ],
        });
        // Handle shrink preset
        data.push({
            'type': 'plain',
            'id': 'flexSize',
            'responsive': true,
            'selector': selector,
            'properties': [
                {
                    'name': 'flex-shrink',
                    'valueType': 'function',
                    'valueFunc': (value) => value === 'shrink' ? '1' : undefined
                }
            ],
        });
        // Handle custom grow
        if (isNotEmpty(flexSizeGrow)) {
            data.push({
                'type': 'plain',
                'id': 'flexSizeGrow',
                'responsive': true,
                'selector': selector,
                'properties': [
                    {
                        'name': 'flex-grow',
                        'valueType': 'direct'
                    }
                ],
            });
        }
        // Handle custom shrink
        if (isNotEmpty(flexSizeShrink)) {
            data.push({
                'type': 'plain',
                'id': 'flexSizeShrink',
                'responsive': true,
                'selector': selector,
                'properties': [
                    {
                        'name': 'flex-shrink',
                        'valueType': 'direct'
                    }
                ],
            });
        }
    }

    /** End Position Flex Item */

    /** spacing */
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
        'selector': selector,
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
        'selector': `${selector}, .guten-inner-container-editor>${selector}.full-width`,
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
        'selector': selector,
    });

    /** animation */
    isNotEmpty(attributes['animation']) && isNotEmpty(attributes['animation']['delay']) && data.push({
        'type': 'plain',
        'id': 'animation',
        'selector': selector,
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
    });

    isNotEmpty(attributes['typographyHeadingColor']) && data.push({
        'type': 'color',
        'id': 'typographyHeadingColor',
        'selector': `.${elementId} .wp-block-gutenverse-heading`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['typographyTextColor']) && data.push({
        'type': 'color',
        'id': 'typographyTextColor',
        'selector': `.${elementId}`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['typographyLinkColor']) && data.push({
        'type': 'color',
        'id': 'typographyLinkColor',
        'selector': `.${elementId} a`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['typographyLinkHoverColor']) && data.push({
        'type': 'color',
        'id': 'typographyLinkHoverColor',
        'selector': `.${elementId} a:hover`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['typographyTextAlign']) && data.push({
        'type': 'color',
        'id': 'typographyTextAlign',
        'selector': `.${elementId}`,
        'properties': [
            {
                'name': 'text-align',
                'valueType': 'pattern',
                'pattern': '{value}',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    },
                }
            }
        ],
    });


    return [
        ...data,
        ...applyFilters(
            'gutenverse.container.blockStyle',
            [],
            {
                elementId,
                attributes
            }
        )
    ];
};

export default getBlockStyle;
