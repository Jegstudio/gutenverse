import { isNotEmpty } from 'gutenverse-core/helper';
import { applyFilters } from '@wordpress/hooks';
import { backgroundStyle } from 'gutenverse-core/controls';

const getBlockStyle = (elementId, attributes) => {
    let data = [];
    data = backgroundStyle({ attributes, data, elementId });

    //panel style
    isNotEmpty(attributes['alignment']) && data.push({
        'type': 'plain',
        'id': 'alignment',
        'responsive': true,
        'selector': `.${elementId}`,
        'properties': [
            {
                'name': 'justify-content',
                'valueType': 'direct',
            }
        ],
    });

    isNotEmpty(attributes['size']) && data.push({
        'type': 'unitPoint',
        'id': 'size',
        'responsive': true,
        'selector': `.${elementId} img`,
        'properties': [
            {
                'name': 'width',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['opacity']) && data.push({
        'type': 'plain',
        'id': 'opacity',
        'selector': `.${elementId} img`,
        'responsive': true,
        'properties': [
            {
                'name': 'opacity',
                'valueType': 'pattern',
                'pattern': 'calc({value}/100)',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    },

                }
            }
        ],
    });

    isNotEmpty(attributes['rotate']) && data.push({
        'type': 'plain',
        'id': 'rotate',
        'selector': `.${elementId} img`,
        'responsive': true,
        'properties': [
            {
                'name': 'transform',
                'valueType': 'pattern',
                'pattern': 'rotate({value}deg)',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    },

                }
            }
        ],
    });

    isNotEmpty(attributes['imageRatio']) && data.push({
        'type': 'plain',
        'id': 'imageRatio',
        'selector': `.${elementId} img`,
        'responsive': true,
        'properties': [
            {
                'name': 'aspect-ratio',
                'valueType': 'function',
                'functionName': 'handleImageRatio'
            }
        ],
    });

    if ('custom' === attributes['imageRatio']) {
        isNotEmpty(attributes['imageRatioCustom']) && data.push({
            'type': 'plain',
            'id': 'imageRatioCustom',
            'selector': `.${elementId} img`,
            'responsive': true,
            'properties': [
                {
                    'name': 'aspect-ratio',
                    'valueType': 'function',
                    'functionName': 'handleImageRatio'
                }
            ],
        });
    }


    isNotEmpty(attributes['imageFit']) && data.push({
        'type': 'plain',
        'id': 'imageFit',
        'selector': `.${elementId} img`,
        'responsive': true,
        'properties': [
            {
                'name': 'object-fit',
                'valueType': 'function',
                'functionName': 'handleDefaultValue'
            }
        ],
    });

    isNotEmpty(attributes['imagePosition']) && data.push({
        'type': 'plain',
        'id': 'imagePosition',
        'selector': `.${elementId} img`,
        'responsive': true,
        'properties': [
            {
                'name': 'object-position',
                'valueType': 'function',
                'functionName': 'handleDefaultValue'
            }
        ],
    });

    isNotEmpty(attributes['imageBorder']) && data.push({
        'type': 'border',
        'id': 'imageBorder',
        'selector': `.${elementId} img`,
    });

    isNotEmpty(attributes['imageBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'imageBorderResponsive',
        'selector': `.${elementId} img`,
    });

    isNotEmpty(attributes['imageBoxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'imageBoxShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} img`,
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

    /** Position Flex Item */
    const selector = `.${elementId}.guten-element`;

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
    return [
        ...data,
        ...applyFilters(
            'gutenverse.post-featured-image.blockStyle',
            [],
            {
                elementId,
                attributes
            }
        )
    ];
};


export default getBlockStyle;