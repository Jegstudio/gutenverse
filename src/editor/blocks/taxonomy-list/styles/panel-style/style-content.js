import { isNotEmpty } from 'gutenverse-core/helper';
import { getDeviceType } from 'gutenverse-core/editor-helper';

const contentStyle = (elementId, attributes, data) => {

    const deviceType = getDeviceType();

    isNotEmpty(attributes['contentAlignment']) && data.push({
        'type': 'plain',
        'id': 'contentAlignment',
        'responsive': true,
        'selector': `.${elementId} .taxonomy-list-item`,
        'properties': [
            {
                'name': 'justify-content',
                'valueType': 'direct',
            }
        ],
    });

    if ( isNotEmpty(attributes['layout']) && attributes['layout'] !== 'column' ) {
        isNotEmpty(attributes['contentSpacing']) && data.push({
            'type': 'unitPoint',
            'id': 'contentSpacing',
            'responsive': true,
            'selector': `.${elementId} .taxonomy-list-wrapper`,
            'properties': [
                {
                    'name': 'row-gap',
                    'valueType': 'pattern',
                    'pattern': '{value}',
                    'patternValues': {
                        'value': {
                            'type': 'direct'
                        }
                    }
                }
            ],
        });
    } else {
        // Vertical
        isNotEmpty(attributes['contentSpacing']) && data.push({
            'type': 'unitPoint',
            'id': 'contentSpacing',
            'responsive': true,
            'selector': `.${elementId} .taxonomy-list-wrapper`,
            'properties': [
                {
                    'name': 'row-gap',
                    'valueType': 'pattern',
                    'pattern': 'calc({value}/2)',
                    'patternValues': {
                        'value': {
                            'type': 'direct'
                        }
                    }
                }
            ],
        },
        {
            'type': 'unitPoint',
            'id': 'contentSpacing',
            'responsive': true,
            'selector': `.${elementId} .taxonomy-list-item:not(:first-child)`,
            'properties': [
                {
                    'name': 'padding-top',
                    'valueType': 'pattern',
                    'pattern': 'calc({value}/2)',
                    'patternValues': {
                        'value': {
                            'type': 'direct'
                        }
                    }
                }
            ],
        });
    }

    // Horizontal
    isNotEmpty(attributes['contentSpacingHorizontal']) && attributes['layout'] !== 'column' && data.push({
        'type': 'unitPoint',
        'id': 'contentSpacingHorizontal',
        'responsive': true,
        'selector': `.${elementId} .taxonomy-list-wrapper`,
        'properties': [
            {
                'name': 'column-gap',
                'valueType': 'pattern',
                'pattern':'calc({value}/2)',
                'patternValues': {
                    'value': {
                        'type': 'direct'
                    }
                }
            }
        ],
    },
    {
        'type': 'unitPoint',
        'id': 'contentSpacingHorizontal',
        'responsive': true,
        'selector': `.${elementId} .taxonomy-list-item:not(:first-child)`,
        'properties': [
            {
                'name': 'padding-left',
                'valueType': 'pattern',
                'pattern':'calc({value}/2)',
                'patternValues': {
                    'value': {
                        'type': 'direct'
                    }
                }
            }
        ],
    });

    isNotEmpty(attributes['itemWidth']) && isNotEmpty(attributes['itemWidth'][deviceType]) && attributes['itemWidth'][deviceType] !== 'custom' && attributes['layout'] === 'row' && data.push({
        'type': 'plain',
        'id': 'itemWidth',
        'responsive': true,
        'properties': [
            {
                'name': 'width',
                'valueType': 'direct',
            }
        ],
        'selector': `.${elementId} .taxonomy-list-wrapper .taxonomy-list-item`,
    });

    isNotEmpty(attributes['customItemWidth']) && isNotEmpty(attributes['itemWidth']) && isNotEmpty(attributes['itemWidth'][deviceType]) && attributes['itemWidth'][deviceType] === 'custom' && attributes['layout'] === 'row' && data.push({
        'type': 'unitPoint',
        'id': 'customItemWidth',
        'responsive': true,
        'properties': [
            {
                'name': 'width',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .taxonomy-list-wrapper .taxonomy-list-item`,
    });

    isNotEmpty(attributes['contentTypography']) && data.push({
        'type': 'typography',
        'id': 'contentTypography',
        'selector': `.${elementId} .taxonomy-list-wrapper .taxonomy-list-item a .taxonomy-list-content`,
    });

    isNotEmpty(attributes['contentColor']) && data.push({
        'type': 'color',
        'id': 'contentColor',
        'selector': `.${elementId} .taxonomy-list-wrapper .taxonomy-list-item a`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['contentBgColor']) && data.push({
        'type': 'color',
        'id': 'contentBgColor',
        'selector': `.${elementId} .taxonomy-list-wrapper .taxonomy-list-item a`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['contentColorHover']) && data.push({
        'type': 'color',
        'id': 'contentColorHover',
        'selector': `.${elementId} .taxonomy-list-wrapper .taxonomy-list-item a:hover`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['contentBgColorHover']) && data.push({
        'type': 'color',
        'id': 'contentBgColorHover',
        'selector': `.${elementId} .taxonomy-list-wrapper .taxonomy-list-item a:hover`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['contentBorder']) && data.push({
        'type': 'border',
        'id': 'contentBorder',
        'selector': `.${elementId} .taxonomy-list-wrapper .taxonomy-list-item a`,
    });

    isNotEmpty(attributes['contentBorderHover']) && data.push({
        'type': 'border',
        'id': 'contentBorderHover',
        'selector': `.${elementId} .taxonomy-list-wrapper .taxonomy-list-item a:hover`,
    });

    isNotEmpty(attributes['contentBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'contentBorderResponsive',
        'selector': `.${elementId} .taxonomy-list-wrapper .taxonomy-list-item a`,
    });

    isNotEmpty(attributes['contentBorderHoverResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'contentBorderHoverResponsive',
        'selector': `.${elementId} .taxonomy-list-wrapper .taxonomy-list-item a:hover`,
    });

    isNotEmpty(attributes['contentMargin']) && data.push({
        'type': 'dimension',
        'id': 'contentMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .taxonomy-list-wrapper .taxonomy-list-item a`
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
        'selector': `.${elementId} .taxonomy-list-wrapper .taxonomy-list-item a`
    }); 

    isNotEmpty(attributes['countTypography']) && data.push({
        'type': 'typography',
        'id': 'countTypography',
        'selector': `.${elementId} .taxonomy-list-wrapper .taxonomy-list-item span.taxonomy-list-count.guten-taxonomy`,
    });

    isNotEmpty(attributes['countColor']) && data.push({
        'type': 'color',
        'id': 'countColor',
        'selector': `.${elementId} .taxonomy-list-wrapper .taxonomy-list-item span.taxonomy-list-count.guten-taxonomy`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['countJustify']) && ( attributes['countJustify'][deviceType] === 'space-around' || attributes['countJustify'][deviceType] === 'space-between' ) && data.push({
        'type': 'plain',
        'responsive': true,
        'id': 'countJustify',
        'selector': `.${elementId} .taxonomy-list-wrapper .taxonomy-list-item`,
        'properties': [
            {
                'name': 'justify-content',
                'valueType': 'direct',
            }
        ],
    });

    isNotEmpty(attributes['countSpacing']) && isNotEmpty(attributes['countJustify']) && attributes['countJustify'][deviceType] === 'custom' && data.push({
        'type': 'unitPoint',
        'id': 'countSpacing',
        'responsive': true,
        'selector': `.${elementId} .taxonomy-list-wrapper .taxonomy-list-item`,
        'properties': [
            {
                'name': 'gap',
                'valueType': 'pattern',
                'pattern': '{value}',
                'patternValues': {
                    'value': {
                        'type': 'direct'
                    }
                }
            }
        ],
    });

    return data;
};

export default contentStyle;