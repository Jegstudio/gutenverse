import { isNotEmpty } from 'gutenverse-core/helper';

const panelIconStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['iconWrapperMargin']) && data.push({
        'type': 'dimension',
        'id': 'iconWrapperMargin',
        'responsive': true,
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .item-buttons`,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['iconBg']) && data.push({
        'type': 'color',
        'id': 'iconBg',
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-button .item-buttons .gallery-link span, .${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .item-caption-over .item-buttons .gallery-link span`,
        'properties' : [
            {
                'name': 'background',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['iconColor']) && data.push({
        'type': 'color',
        'id': 'iconColor',
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-button .item-buttons .gallery-link span, .${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .item-caption-over .item-buttons .gallery-link span`,
        'properties' : [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['iconColor']) && data.push({
        'type': 'color',
        'id': 'iconColor',
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-button .item-buttons .gallery-link span svg, .${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .item-caption-over .item-buttons .gallery-link span svg`,
        'properties' : [
            {
                'name': 'fill',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['iconSize']) && data.push({
        'type': 'plain',
        'id': 'iconSize',
        'responsive' : true,
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-button .item-buttons .gallery-link span, .${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .item-caption-over .item-buttons .gallery-link span`,
        'properties' : [
            {
                'name': 'font-size',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value' : {
                        'type' : 'direct'
                    }
                }
            }
        ]
    });

    isNotEmpty(attributes['iconSize']) && data.push({
        'type': 'plain',
        'id': 'iconSize',
        'responsive' : true,
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-button .item-buttons .gallery-link span svg, .${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .item-caption-over .item-buttons .gallery-link span svg`,
        'properties' : [
            {
                'name': 'font-size',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value' : {
                        'type' : 'direct'
                    }
                }
            }
        ]
    });

    if(attributes['selectionIconPadding'] === 'custom'){
        isNotEmpty(attributes['zoomIconPadding']) && data.push({
            'type': 'dimension',
            'id': 'zoomIconPadding',
            'responsive': true,
            'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-button .item-buttons .gallery-link.zoom span, .${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .item-caption-over .item-buttons .gallery-link.zoom span`,
            'properties': [
                {
                    'name': 'padding',
                    'valueType': 'direct'
                }
            ]
        });

        isNotEmpty(attributes['linkIconPadding']) && data.push({
            'type': 'dimension',
            'id': 'linkIconPadding',
            'responsive': true,
            'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-button .item-buttons .gallery-link.link span, .${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .item-caption-over .item-buttons .gallery-link.link span`,
            'properties': [
                {
                    'name': 'padding',
                    'valueType': 'direct'
                }
            ]
        });
    }else if(attributes['selectionIconPadding'] === 'all'){
        isNotEmpty(attributes['iconPadding']) && data.push({
            'type': 'dimension',
            'id': 'iconPadding',
            'responsive': true,
            'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-button .item-buttons .gallery-link span, .${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .item-caption-over .item-buttons .gallery-link span`,
            'properties': [
                {
                    'name': 'padding',
                    'valueType': 'direct'
                }
            ]
        });
    }

    isNotEmpty(attributes['iconBorder']) && data.push({
        'type': 'border',
        'id': 'iconBorder',
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-button .item-buttons .gallery-link span, .${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .item-caption-over .item-buttons .gallery-link span`,
    });

    isNotEmpty(attributes['iconBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'iconBorderResponsive',
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-button .item-buttons .gallery-link span, .${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .item-caption-over .item-buttons .gallery-link span`,
    });

    isNotEmpty(attributes['iconTextGap']) && data.push({
        'type': 'plain',
        'id': 'iconTextGap',
        'responsive' : true,
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .gallery-link.with-text`,
        'properties' : [
            {
                'name': 'gap',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value' : {
                        'type' : 'direct'
                    }
                }
            }
        ]
    });

    isNotEmpty(attributes['iconTextPosition']) && data.push({
        'type': 'plain',
        'id': 'iconTextPosition',
        'responsive' : true,
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .gallery-link.with-text`,
        'properties' : [
            {
                'name': 'flex-direction',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['textZoomTypography']) && data.push({
        'type': 'typography',
        'id': 'textZoomTypography',
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .gallery-link.with-text.zoom .item-icon-text`,
    });

    isNotEmpty(attributes['textZoomColor']) && data.push({
        'type': 'color',
        'id': 'textZoomColor',
        'responsive' : true,
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .gallery-link.with-text.zoom .item-icon-text`,
        'properties' : [
            {
                'name': 'color',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['textZoomBackground']) && data.push({
        'type': 'background',
        'id': 'textZoomBackground',
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .gallery-link.with-text.zoom .item-icon-text`,
    });

    isNotEmpty(attributes['textZoomBorder']) && data.push({
        'type': 'borderResponsive',
        'id': 'textZoomBorder',
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .gallery-link.with-text.zoom .item-icon-text`,
    });

    isNotEmpty(attributes['textZoomMargin']) && data.push({
        'type': 'dimension',
        'id': 'textZoomMargin',
        'responsive' : true,
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .gallery-link.with-text.zoom .item-icon-text`,
        'properties' : [
            {
                'name': 'margin',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['textZoomPadding']) && data.push({
        'type': 'dimension',
        'id': 'textZoomPadding',
        'responsive' : true,
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .gallery-link.with-text.zoom .item-icon-text`,
        'properties' : [
            {
                'name': 'padding',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['textLinkTypography']) && data.push({
        'type': 'typography',
        'id': 'textLinkTypography',
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .gallery-link.with-text.link .item-icon-text`,
    });

    isNotEmpty(attributes['textLinkColor']) && data.push({
        'type': 'color',
        'id': 'textLinkColor',
        'responsive' : true,
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .gallery-link.with-text.link .item-icon-text`,
        'properties' : [
            {
                'name': 'color',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['textLinkBackground']) && data.push({
        'type': 'background',
        'id': 'textLinkBackground',
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .gallery-link.with-text.link .item-icon-text`,
    });

    isNotEmpty(attributes['textLinkBorder']) && data.push({
        'type': 'borderResponsive',
        'id': 'textLinkBorder',
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .gallery-link.with-text.link .item-icon-text`,
    });

    isNotEmpty(attributes['textLinkMargin']) && data.push({
        'type': 'dimension',
        'id': 'textLinkMargin',
        'responsive' : true,
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .gallery-link.with-text.link .item-icon-text`,
        'properties' : [
            {
                'name': 'margin',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['textLinkPadding']) && data.push({
        'type': 'dimension',
        'id': 'textLinkPadding',
        'responsive' : true,
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .gallery-link.with-text.link .item-icon-text`,
        'properties' : [
            {
                'name': 'padding',
                'valueType': 'direct',
            }
        ]
    });

    return data;
};

export default panelIconStyle;