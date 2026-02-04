import { isNotEmpty } from 'gutenverse-core/helper';
import { applyFilters } from '@wordpress/hooks';
import { backgroundStyle } from 'gutenverse-core/controls';
const getBlockStyle = (elementId, attributes) => {
    let data = [];
    data = backgroundStyle({ attributes, data, elementId });

    /**Panel Content Style */
    isNotEmpty(attributes['prefixColor']) && data.push({
        'type': 'color',
        'id': 'prefixColor',
        'responsive': true,
        'selector': `.${elementId}.guten-fun-fact .fun-fact-inner .content .number-wrapper .prefix`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['suffixColor']) && data.push({
        'type': 'color',
        'id': 'suffixColor',
        'responsive': true,
        'selector': `.${elementId}.guten-fun-fact .fun-fact-inner .content .number-wrapper .suffix`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['numberColor']) && data.push({
        'type': 'color',
        'id': 'numberColor',
        'responsive': true,
        'selector': `.${elementId}.guten-fun-fact .fun-fact-inner .content .number-wrapper`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['titleColor']) && data.push({
        'type': 'color',
        'id': 'titleColor',
        'responsive': true,
        'selector': `.${elementId}.guten-fun-fact .fun-fact-inner .content .title`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['titleTypography']) && data.push({
        'type': 'typography',
        'id': 'titleTypography',
        'selector': `.${elementId}.guten-fun-fact .fun-fact-inner .content .title`,
    });

    isNotEmpty(attributes['titleBottomSpace']) && data.push({
        'type': 'plain',
        'id': 'titleBottomSpace',
        'responsive': true,
        'selector': `.${elementId}.guten-fun-fact .fun-fact-inner .content .title `,
        'properties': [
            {
                'name': 'margin-bottom',
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

    isNotEmpty(attributes['numberTypography']) && data.push({
        'type': 'typography',
        'id': 'numberTypography',
        'selector': `.${elementId}.guten-fun-fact .fun-fact-inner .content .number-wrapper`,
    });

    isNotEmpty(attributes['numberBottomSpace']) && data.push({
        'type': 'plain',
        'id': 'numberBottomSpace',
        'responsive': true,
        'selector': `.${elementId}.guten-fun-fact .fun-fact-inner .content .number-wrapper `,
        'properties': [
            {
                'name': 'margin-bottom',
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

    isNotEmpty(attributes['prefixTypography']) && data.push({
        'type': 'typography',
        'id': 'prefixTypography',
        'selector': `.${elementId}.guten-fun-fact .fun-fact-inner .content .number-wrapper .prefix`,
    });

    isNotEmpty(attributes['suffixTypography']) && data.push({
        'type': 'typography',
        'id': 'suffixTypography',
        'selector': `.${elementId}.guten-fun-fact .fun-fact-inner .content .number-wrapper .suffix`,
    });

    isNotEmpty(attributes['numberRightSpace']) && data.push({
        'type': 'plain',
        'id': 'numberRightSpace',
        'responsive': true,
        'selector': `.${elementId} .fun-fact-inner .content .number-wrapper .number.loaded`,
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
        ]
    });

    isNotEmpty(attributes['contentPadding']) && data.push({
        'type': 'dimension',
        'id': 'contentPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.guten-fun-fact .fun-fact-inner .content`,
    });

    /**Panel General */
    isNotEmpty(attributes['alignButtons']) && data.push({
        'type': 'plain',
        'id': 'alignButtons',
        'responsive': true,
        'selector': `.${elementId}.guten-fun-fact`,
        'properties': [
            {
                'name': 'text-align',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['hoverBottomColor']) && attributes['hoverBottom'] && data.push({
        'type': 'color',
        'id': 'hoverBottomColor',
        'selector': `.${elementId}.guten-fun-fact .border-bottom .animated`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct',
            }
        ]
    });

    /**Panel Icon Style */

    isNotEmpty(attributes['iconSize']) && data.push({
        'type': 'plain',
        'id': 'iconSize',
        'responsive': true,
        'selector': `.${elementId}.guten-fun-fact .fun-fact-inner .icon `,
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

    isNotEmpty(attributes['iconSize']) && data.push({
        'type': 'plain',
        'id': 'iconSize',
        'responsive': true,
        'selector': `.${elementId}.guten-fun-fact .fun-fact-inner .icon svg`,
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

    isNotEmpty(attributes['iconRotate']) && data.push({
        'type': 'plain',
        'id': 'iconRotate',
        'responsive': true,
        'selector': `.${elementId}.guten-fun-fact .fun-fact-inner .icon `,
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

    isNotEmpty(attributes['iconMargin']) && data.push({
        'type': 'dimension',
        'id': 'iconMargin',
        'responsive': true,
        'selector': `.${elementId}.guten-fun-fact .fun-fact-inner .icon `,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['iconPadding']) && data.push({
        'type': 'dimension',
        'id': 'iconPadding',
        'responsive': true,
        'selector': `.${elementId}.guten-fun-fact .fun-fact-inner .icon `,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['iconColor']) && data.push({
        'type': 'color',
        'id': 'iconColor',
        'responsive': true,
        'selector': `.${elementId}.guten-fun-fact .fun-fact-inner .icon`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['iconColor']) && data.push({
        'type': 'color',
        'id': 'iconColor',
        'responsive': true,
        'selector': `.${elementId}.guten-fun-fact .fun-fact-inner .icon svg`,
        'properties': [
            {
                'name': 'fill',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['iconBgColor']) && data.push({
        'type': 'color',
        'id': 'iconBgColor',
        'responsive': true,
        'selector': `.${elementId}.guten-fun-fact .fun-fact-inner .icon`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['iconBorder']) && data.push({
        'type': 'border',
        'id': 'iconBorder',
        'selector': `.${elementId} .fun-fact-inner .icon`,
    });

    isNotEmpty(attributes['iconBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'iconBorderResponsive',
        'selector': `.${elementId} .fun-fact-inner .icon`,
    });

    isNotEmpty(attributes['iconColorHover']) && data.push({
        'type': 'color',
        'id': 'iconColorHover',
        'responsive': true,
        'selector': `.${elementId}.guten-fun-fact .fun-fact-inner:hover .icon`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['iconColorHover']) && data.push({
        'type': 'color',
        'id': 'iconColorHover',
        'responsive': true,
        'selector': `.${elementId}.guten-fun-fact .fun-fact-inner:hover .icon svg`,
        'properties': [
            {
                'name': 'fill',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['iconBgColorHover']) && data.push({
        'type': 'color',
        'id': 'iconBgColorHover',
        'responsive': true,
        'selector': `.${elementId}.guten-fun-fact .fun-fact-inner:hover .icon`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['iconBorderHover']) && data.push({
        'type': 'border',
        'id': 'iconBorderHover',
        'selector': `.${elementId} .fun-fact-inner:hover .icon`,
    });

    isNotEmpty(attributes['iconBorderHoverResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'iconBorderHoverResponsive',
        'selector': `.${elementId} .fun-fact-inner:hover .icon`,
    });

    /**Panel Icon */
    isNotEmpty(attributes['iconType']) && attributes['iconType'] === 'image' && (isNotEmpty(attributes['imageSize']) || isNotEmpty(attributes['imageSizeResponsive'])) && data.push({
        'type': 'plain',
        'id': 'iconType',
        'responsive': attributes['imageSizeResponsive'] ? true : false,
        'selector': `.${elementId}.guten-fun-fact .fun-fact-inner .icon img`,
        'properties': [
            {
                'name': 'width',
                'valueType': 'pattern',
                'pattern': '{value}px; height: {value}px; object-fit: cover;',
                'patternValues': {
                    'value': {
                        'type': 'direct'
                    }
                }
            }
        ],
        'multiAttr': {
            'imageSize': attributes['imageSizeResponsive'] ? { 'Desktop': attributes['imageSize'], ...attributes['imageSizeResponsive'] } : attributes['imageSize']
        }
    });

    /**Panel Super */
    isNotEmpty(attributes['superColor']) && data.push({
        'type': 'color',
        'id': 'superColor',
        'selector': `.${elementId}.guten-fun-fact .fun-fact-inner .content .number-wrapper .super`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['superTypography']) && data.push({
        'type': 'typography',
        'id': 'superTypography',
        'selector': `.${elementId}.guten-fun-fact .fun-fact-inner .content .number-wrapper .super`,
    });

    isNotEmpty(attributes['superTop']) && data.push({
        'type': 'plain',
        'id': 'superTop',
        'responsive': true,
        'selector': `.${elementId}.guten-fun-fact .fun-fact-inner .content .number-wrapper .super`,
        'properties': [
            {
                'name': 'top',
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

    isNotEmpty(attributes['superSpace']) && data.push({
        'type': 'plain',
        'id': 'superSpace',
        'responsive': true,
        'selector': `.${elementId}.guten-fun-fact .fun-fact-inner .content .number-wrapper .super`,
        'properties': [
            {
                'name': 'left',
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

    isNotEmpty(attributes['superAlign']) && data.push({
        'type': 'plain',
        'id': 'superAlign',
        'responsive': true,
        'selector': `.${elementId}.guten-fun-fact .fun-fact-inner .content .number-wrapper .super`,
        'properties': [
            {
                'name': 'vertical-align',
                'valueType': 'direct'
            }
        ]
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
    return [
        ...data,
        ...applyFilters(
            'gutenverse.fun-fact.blockStyle',
            [],
            {
                elementId,
                attributes
            }
        )
    ];
};

export default getBlockStyle;