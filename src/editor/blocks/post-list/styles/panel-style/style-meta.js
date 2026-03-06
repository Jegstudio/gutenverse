import { isNotEmpty } from 'gutenverse-core/helper';

const metaStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['metaAlign']) && data.push({
        'type': 'plain',
        'id': 'metaAlign',
        'responsive': true,
        'selector': `.${elementId} .guten-postlist .guten-post a .meta-lists`,
        'properties': [
            {
                'name': 'text-align',
                'valueType': 'direct',
            }
        ],
    });

    isNotEmpty(attributes['metaTypography']) && data.push({
        'type': 'typography',
        'id': 'metaTypography',
        'selector': `.${elementId} .guten-postlist .guten-post a .meta-lists, 
                    .${elementId} .guten-postlist .guten-post a .meta-lists span`,
    });

    isNotEmpty(attributes['metaIconSize']) && data.push({
        'type': 'plain',
        'id': 'metaIconSize',
        'responsive': true,
        'selector': `.${elementId} .guten-postlist .guten-post a .meta-lists i`,
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'pattern',
                'pattern' : '{value}px',
                'patternValues' : {
                    'value' : {
                        'type' : 'direct'
                    }
                }
            }
        ],
    });

    isNotEmpty(attributes['metaIconSize']) && data.push({
        'type': 'plain',
        'id': 'metaIconSize',
        'responsive': true,
        'selector': `.${elementId} .guten-postlist .guten-post a .meta-lists svg`,
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'pattern',
                'pattern' : '{value}px',
                'patternValues' : {
                    'value' : {
                        'type' : 'direct'
                    }
                }
            }
        ],
    });

    isNotEmpty(attributes['metaIconSpacing']) && data.push({
        'type': 'plain',
        'id': 'metaIconSpacing',
        'responsive': true,
        'selector': `.${elementId} .guten-postlist .guten-post a .meta-lists i`,
        'properties': [
            {
                'name': 'margin-right',
                'valueType': 'pattern',
                'pattern' : '{value}px',
                'patternValues' : {
                    'value' : {
                        'type' : 'direct'
                    }
                }
            }
        ],
    });

    isNotEmpty(attributes['metaIconSpacing']) && data.push({
        'type': 'plain',
        'id': 'metaIconSpacing',
        'responsive': true,
        'selector': `.${elementId} .guten-postlist .guten-post a .meta-lists svg`,
        'properties': [
            {
                'name': 'margin-right',
                'valueType': 'pattern',
                'pattern' : '{value}px',
                'patternValues' : {
                    'value' : {
                        'type' : 'direct'
                    }
                }
            }
        ],
    });

    isNotEmpty(attributes['metaMargin']) && data.push({
        'type': 'dimension',
        'id': 'metaMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .guten-postlist .guten-post a .meta-lists span`,
    });

    isNotEmpty(attributes['metaPadding']) && data.push({
        'type': 'dimension',
        'id': 'metaPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .guten-postlist .guten-post a .meta-lists span`,
    });

    isNotEmpty(attributes['metaColor']) && data.push({
        'type': 'color',
        'id': 'metaColor',
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct',
            }
        ],
        'selector': `.${elementId} .guten-postlist .guten-post a .meta-lists span`,
    });

    isNotEmpty(attributes['metaColor']) && data.push({
        'type': 'color',
        'id': 'metaColor',
        'properties': [
            {
                'name': 'fill',
                'valueType': 'direct',
            }
        ],
        'selector': `.${elementId} .guten-postlist .guten-post a .meta-lists svg`,
    });

    isNotEmpty(attributes['metaColorHover']) && data.push({
        'type': 'color',
        'id': 'metaColorHover',
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct',
            }
        ],
        'selector': `.${elementId} .guten-postlist .guten-post:hover a .meta-lists span`,
    });

    isNotEmpty(attributes['metaColorHover']) && data.push({
        'type': 'color',
        'id': 'metaColorHover',
        'properties': [
            {
                'name': 'fill',
                'valueType': 'direct',
            }
        ],
        'selector': `.${elementId} .guten-postlist .guten-post:hover a .meta-lists svg`,
    });

    isNotEmpty(attributes['metaBackground']) && data.push({
        'type': 'background',
        'id': 'metaBackground',
        'selector': `.${elementId} .guten-postlist .guten-post a .meta-lists span`,
    });

    isNotEmpty(attributes['metaHoverBackground']) && data.push({
        'type': 'background',
        'id': 'metaHoverBackground',
        'selector': `.${elementId} .guten-postlist .guten-post:hover a .meta-lists span`,
    });

    isNotEmpty(attributes['metaBorder']) && data.push({
        'type': 'border',
        'id': 'metaBorder',
        'selector': `.${elementId} .guten-postlist .guten-post a .meta-lists span`,
    });

    isNotEmpty(attributes['metaBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'metaBorderResponsive',
        'selector': `.${elementId} .guten-postlist .guten-post a .meta-lists span`,
    });

    isNotEmpty(attributes['metaHoverBorder']) && data.push({
        'type': 'border',
        'id': 'metaHoverBorder',
        'selector': `.${elementId} .guten-postlist .guten-post:hover a .meta-lists span`,
    });

    isNotEmpty(attributes['metaHoverBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'metaHoverBorderResponsive',
        'selector': `.${elementId} .guten-postlist .guten-post:hover a .meta-lists span`,
    });
    return data;
};

export default metaStyle;