import { isNotEmpty } from 'gutenverse-core/helper';
import { applyFilters } from '@wordpress/hooks';

const getBlockStyle = (elementId, attributes) => {
    let data = [];

    //panel content
    isNotEmpty(attributes['contentType']) && data.push({
        'type': 'plain',
        'id': 'contentType',
        'selector': `.${elementId} .guten-chart-wrapper, .${elementId}.Mobile-noFlip .guten-chart-wrapper, .${elementId}.Desktop-noFlip .guten-chart-wrapper, .${elementId}.Tablet-noFlip .guten-chart-wrapper`,
        'properties': [
            {
                'name': 'flex-direction',
                'valueType': 'direct'
            }
        ],
        'responsive': true,
    });

    if (isNotEmpty(attributes['contentOrder'])) {
        let orders = attributes['contentOrder'].split(',');

        if (orders.length !== 3) {
            orders = [1, 2, 3];
        }

        data.push(
            {
                'type': 'plain',
                'id': 'contentOrder',
                'selector': `.${elementId} .chart-content .chart-title`,
                'properties': [
                    {
                        'name': 'order',
                        'valueType': 'static',
                        'staticValue': `${orders[0]}`,
                    }
                ],
            },
            {
                'type': 'plain',
                'id': 'contentOrder',
                'selector': `.${elementId} .chart-content .chart-inside`,
                'properties': [
                    {
                        'name': 'order',
                        'valueType': 'static',
                        'staticValue': `${orders[1]}`,
                    }
                ],
            },
            {
                'type': 'plain',
                'id': 'contentOrder',
                'selector': `.${elementId} .chart-content .chart-description`,
                'properties': [
                    {
                        'name': 'order',
                        'valueType': 'static',
                        'staticValue': `${orders[2]}`,
                    }
                ],
            },
        );
    }

    //panel card
    isNotEmpty(attributes['cardBackground']) && data.push({
        'type': 'background',
        'id': 'cardBackground',
        'selector': `.${elementId} .chart-content.content-card,
            .${elementId}.Desktop-noFlip .chart-content.content-card,
            .${elementId}.Tablet-noFlip .chart-content.content-card,
            .${elementId}.Mobile-noFlip .chart-content.content-card`,
    });

    isNotEmpty(attributes['paddingCard']) && data.push({
        'type': 'dimension',
        'id': 'paddingCard',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .chart-content.content-card,
            .${elementId}.Desktop-noFlip .chart-content.content-card,
            .${elementId}.Tablet-noFlip .chart-content.content-card,
            .${elementId}.Mobile-noFlip .chart-content.content-card`,
    });

    isNotEmpty(attributes['cardBorder']) && data.push({
        'type': 'borderResponsive',
        'id': 'cardBorder',
        'responsive': true,
        'selector': `.${elementId} .chart-content.content-card,
            .${elementId}.Desktop-noFlip .chart-content.content-card,
            .${elementId}.Tablet-noFlip .chart-content.content-card,
            .${elementId}.Mobile-noFlip .chart-content.content-card`,
    });

    isNotEmpty(attributes['cardBoxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'cardBoxShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .chart-content.content-card,
                .${elementId}.Desktop-noFlip .chart-content.content-card,
                .${elementId}.Tablet-noFlip .chart-content.content-card,
                .${elementId}.Mobile-noFlip .chart-content.content-card`,
    });

    isNotEmpty(attributes['cardTitleAlign']) && data.push({
        'type': 'plain',
        'id': 'cardTitleAlign',
        'selector': `.${elementId} .chart-content.content-card .chart-title,
            .${elementId}.Desktop-noFlip .chart-content.content-card .chart-title,
            .${elementId}.Tablet-noFlip .chart-content.content-card .chart-title,
            .${elementId}.Mobile-noFlip .chart-content.content-card .chart-title`,
        'properties': [
            {
                'name': 'text-align',
                'valueType': 'direct'
            }
        ],
        'responsive': true,
    });

    isNotEmpty(attributes['cardTitleColor']) && data.push({
        'type': 'color',
        'id': 'cardTitleColor',
        'selector': `.${elementId} .chart-content.content-card .chart-title,
            .${elementId}.Desktop-noFlip .chart-content.content-card .chart-title,
            .${elementId}.Tablet-noFlip .chart-content.content-card .chart-title,
            .${elementId}.Mobile-noFlip .chart-content.content-card .chart-title`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['cardTitleTypography']) && data.push({
        'type': 'typography',
        'id': 'cardTitleTypography',
        'selector': `.${elementId} .chart-content.content-card .chart-title,
            .${elementId}.Desktop-noFlip .chart-content.content-card .chart-title,
            .${elementId}.Tablet-noFlip .chart-content.content-card .chart-title,
            .${elementId}.Mobile-noFlip .chart-content.content-card .chart-title`,
    });

    isNotEmpty(attributes['cardTitleTextShadow']) && data.push({
        'type': 'textShadow',
        'id': 'cardTitleTextShadow',
        'properties': [
            {
                'name': 'text-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .chart-content.content-card .chart-title,
            .${elementId}.Desktop-noFlip .chart-content.content-card .chart-title,
            .${elementId}.Tablet-noFlip .chart-content.content-card .chart-title,
            .${elementId}.Mobile-noFlip .chart-content.content-card .chart-title`,
    });

    isNotEmpty(attributes['marginCardTitle']) && data.push({
        'type': 'dimension',
        'id': 'marginCardTitle',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .chart-content.content-card .chart-title,
            .${elementId}.Desktop-noFlip .chart-content.content-card .chart-title,
            .${elementId}.Tablet-noFlip .chart-content.content-card .chart-title,
            .${elementId}.Mobile-noFlip .chart-content.content-card .chart-title`,
    });

    isNotEmpty(attributes['cardDescriptionTypography']) && data.push({
        'type': 'typography',
        'id': 'cardDescriptionTypography',
        'selector': `.${elementId} .chart-content.content-card .chart-description,
            .${elementId}.Desktop-noFlip .chart-content.content-card .chart-description,
            .${elementId}.Tablet-noFlip .chart-content.content-card .chart-description,
            .${elementId}.Mobile-noFlip .chart-content.content-card .chart-description`,
    });

    isNotEmpty(attributes['cardDescriptionTextShadow']) && data.push({
        'type': 'textShadow',
        'id': 'cardDescriptionTextShadow',
        'properties': [
            {
                'name': 'text-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .chart-content.content-card .chart-description,
            .${elementId}.Desktop-noFlip .chart-content.content-card .chart-description,
            .${elementId}.Tablet-noFlip .chart-content.content-card .chart-description,
            .${elementId}.Mobile-noFlip .chart-content.content-card .chart-description`,
    });

    isNotEmpty(attributes['marginCardDescription']) && data.push({
        'type': 'dimension',
        'id': 'marginCardDescription',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .chart-content.content-card .chart-description,
            .${elementId}.Desktop-noFlip .chart-content.content-card .chart-description,
            .${elementId}.Tablet-noFlip .chart-content.content-card .chart-description,
            .${elementId}.Mobile-noFlip .chart-content.content-card .chart-description`,
    });

    isNotEmpty(attributes['cardDescriptionAlign']) && data.push({
        'type': 'plain',
        'id': 'cardDescriptionAlign',
        'selector': `.${elementId} .chart-content.content-card .chart-description,
            .${elementId}.Desktop-noFlip .chart-content.content-card .chart-description,
            .${elementId}.Tablet-noFlip .chart-content.content-card .chart-description,
            .${elementId}.Mobile-noFlip .chart-content.content-card .chart-description`,
        'properties': [
            {
                'name': 'text-align',
                'valueType': 'direct'
            }
        ],
        'responsive': true,
    });

    isNotEmpty(attributes['cardDescriptionColor']) && data.push({
        'type': 'color',
        'id': 'cardDescriptionColor',
        'selector': `.${elementId} .chart-content.content-card .chart-description,
            .${elementId}.Desktop-noFlip .chart-content.content-card .chart-description,
            .${elementId}.Tablet-noFlip .chart-content.content-card .chart-description,
            .${elementId}.Mobile-noFlip .chart-content.content-card .chart-description`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    //panel chart
    isNotEmpty(attributes['chartContentAlign']) && data.push({
        'type': 'plain',
        'id': 'chartContentAlign',
        'selector': `.${elementId} .chart-content.content-chart`,
        'properties': [
            {
                'name': 'align-items',
                'valueType': 'direct'
            }
        ],
        'responsive': true,
    });

    isNotEmpty(attributes['chartContainerSize']) && data.push({
        'type': 'plain',
        'id': 'chartContainerSize',
        'responsive': true,
        'properties': [
            {
                'name': 'width',
                'valueType': 'pattern',
                'pattern': '{value}% !important',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                        'key': 'chartContainerSize',
                    },

                }
            }
        ],
        'selector': `.${elementId} .chart-content.content-chart`,
    });

    isNotEmpty(attributes['chartSize']) && data.push({
        'type': 'plain',
        'id': 'chartSize',
        'responsive': true,
        'properties': [
            {
                'name': 'width',
                'valueType': 'pattern',
                'pattern': '{value}px !important; height: {value}px !important',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                        'key': 'chartSize',
                    },
                }
            }
        ],
        'selector': `.${elementId} canvas`,
    });

    isNotEmpty(attributes['chartSize']) && data.push({
        'type': 'plain',
        'id': 'chartSize',
        'responsive': true,
        'properties': [
            {
                'name': 'width',
                'valueType': 'pattern',
                'pattern': '{value}px !important',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                        'key': 'chartSize',
                    },
                }
            }
        ],
        'selector': `.${elementId} .chart-inside.type-doughnut, .${elementId} .chart-container`,
    });

    isNotEmpty(attributes['indicatorColor']) && data.push({
        'type': 'color',
        'id': 'indicatorColor',
        'selector': `.${elementId} .chart-content .chart-inside > *`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['indicatorIconSize']) && data.push({
        'type': 'unitPoint',
        'id': 'indicatorIconSize',
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .${elementId} .chart-content .chart-inside > i`,
        'responsive': true
    });

    isNotEmpty(attributes['indicatorIconSize']) && data.push({
        'type': 'unitPoint',
        'id': 'indicatorIconSize',
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .${elementId} .chart-content .chart-inside svg`,
        'responsive': true
    });

    isNotEmpty(attributes['indicatorTypography']) && data.push({
        'type': 'typography',
        'id': 'indicatorTypography',
        'selector': `.${elementId} .chart-content .chart-inside > *`,
    });

    /**Panel List */
    isNotEmpty(attributes['background']) && data.push({
        'type': 'background',
        'id': 'background',
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}.guten-element`,
    });

    isNotEmpty(attributes['backgroundHover']) && data.push({
        'type': 'background',
        'id': 'backgroundHover',
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}.guten-element:hover`,
    });

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
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}.guten-element`,
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
            'gutenverse.button.blockStyle',
            [],
            {
                elementId,
                attributes
            }
        )
    ];
};


export default getBlockStyle;