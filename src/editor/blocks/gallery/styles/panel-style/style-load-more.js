import { isNotEmpty } from 'gutenverse-core/helper';

const panelLoadMoreStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['enableLoadAlign']) && attributes['enableLoadMore'] && data.push({
        'type': 'plain',
        'id': 'enableLoadAlign',
        'selector': `.${elementId}.guten-gallery .load-more-items`,
        'properties': [
            {
                'name': 'justify-content',
                'valueType': 'direct',
            }
        ],
        'responsive': true,
    });

    isNotEmpty(attributes['loadMoreMarginTop']) && data.push({
        'type': 'plain',
        'id': 'loadMoreMarginTop',
        'responsive': true,
        'properties': [
            {
                'name': 'margin-top',
                'valueType' : 'pattern',
                'pattern': '{value}px',
                'patternValues' : {
                    'value' : {
                        'type' : 'direct'
                    }
                }
            }
        ],
        'selector':  `.${elementId}.guten-gallery .load-more-items`,
    });

    isNotEmpty(attributes['loadMoreIconSize']) && data.push({
        'type': 'plain',
        'id': 'loadMoreIconSize',
        'responsive' : true,
        'selector': `.${elementId}.guten-gallery .load-more-items .load-more-icon`,
        'properties' : [
            {
                'name' : 'font-size',
                'valueType' : 'pattern',
                'pattern': '{value}px',
                'patternValues' : {
                    'value' : {
                        'type' : 'direct'
                    }
                }
            }
        ]
    });

    isNotEmpty(attributes['loadMoreIconSize']) && data.push({
        'type': 'plain',
        'id': 'loadMoreIconSize',
        'responsive' : true,
        'selector': `.${elementId}.guten-gallery .load-more-items .load-more-icon svg`,
        'properties' : [
            {
                'name' : 'font-size',
                'valueType' : 'pattern',
                'pattern': '{value}px',
                'patternValues' : {
                    'value' : {
                        'type' : 'direct'
                    }
                }
            }
        ]
    });

    isNotEmpty(attributes['loadMoreIconSpacing']) && data.push({
        'type': 'plain',
        'id': 'loadMoreIconSpacing',
        'responsive' : true,
        'selector': `.${elementId}.guten-gallery .load-more-items .load-more-icon.icon-position-before`,
        'properties' : [
            {
                'name' : 'margin-right',
                'valueType' : 'pattern',
                'pattern': '{value}px',
                'patternValues' : {
                    'value' : {
                        'type' : 'direct'
                    }
                }
            }
        ]
    });

    isNotEmpty(attributes['loadMoreIconSpacing']) && data.push({
        'type': 'plain',
        'id': 'loadMoreIconSpacing',
        'responsive' : true,
        'selector': `.${elementId}.guten-gallery .load-more-items .load-more-icon.icon-position-after`,
        'properties' : [
            {
                'name' : 'margin-left',
                'valueType' : 'pattern',
                'pattern': '{value}px',
                'patternValues' : {
                    'value' : {
                        'type' : 'direct'
                    }
                }
            }
        ]
    });

    isNotEmpty(attributes['loadMoreTypography']) && data.push({
        'type': 'typography',
        'id': 'loadMoreTypography',
        'selector': `.${elementId}.guten-gallery .load-more-items .guten-gallery-load-more`,
    });

    isNotEmpty(attributes['loadMorePadding']) && data.push({
        'type': 'dimension',
        'id': 'loadMorePadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector':  `.${elementId}.guten-gallery .load-more-items .guten-gallery-load-more`,
    });

    isNotEmpty(attributes['loadMoreBoxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'loadMoreBoxShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.guten-gallery .load-more-items .guten-gallery-load-more`,
    });

    isNotEmpty(attributes['loadMoreTextColor']) && data.push({
        'type': 'color',
        'id': 'loadMoreTextColor',
        'responsive': true,
        'selector': `.${elementId}.guten-gallery .load-more-items .guten-gallery-load-more`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['loadMoreTextColor']) && data.push({
        'type': 'color',
        'id': 'loadMoreTextColor',
        'responsive': true,
        'selector': `.${elementId}.guten-gallery .load-more-items .guten-gallery-load-more svg`,
        'properties': [
            {
                'name': 'fill',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['loadMoreTextColorHover']) && data.push({
        'type': 'color',
        'id': 'loadMoreTextColorHover',
        'responsive': true,
        'selector': `.${elementId}.guten-gallery .load-more-items .guten-gallery-load-more:hover`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['loadMoreBackground']) && data.push({
        'type': 'background',
        'id': 'loadMoreBackground',
        'selector': `.${elementId}.guten-gallery .load-more-items .guten-gallery-load-more`,
    });

    isNotEmpty(attributes['loadMoreBackgroundHover']) && data.push({
        'type': 'background',
        'id': 'loadMoreBackgroundHover',
        'selector': `.${elementId}.guten-gallery .load-more-items .guten-gallery-load-more:hover`,
    });

    isNotEmpty(attributes['loadMoreBorder']) && data.push({
        'type': 'border',
        'id': 'loadMoreBorder',
        'selector': `.${elementId}.guten-gallery .load-more-items .guten-gallery-load-more`,
    });

    isNotEmpty(attributes['loadMoreBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'loadMoreBorderResponsive',
        'selector': `.${elementId}.guten-gallery .load-more-items .guten-gallery-load-more`,
    });

    isNotEmpty(attributes['loadMoreBorderHover']) && data.push({
        'type': 'border',
        'id': 'loadMoreBorderHover',
        'selector': `.${elementId}.guten-gallery .load-more-items .guten-gallery-load-more:hover`,
    });

    isNotEmpty(attributes['loadMoreBorderResponsiveHover']) && data.push({
        'type': 'borderResponsive',
        'id': 'loadMoreBorderResponsiveHover',
        'selector': `.${elementId}.guten-gallery .load-more-items .guten-gallery-load-more:hover`,
    });
    return data;
};

export default panelLoadMoreStyle;