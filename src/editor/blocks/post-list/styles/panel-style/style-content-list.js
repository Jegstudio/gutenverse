import { isNotEmpty } from 'gutenverse-core/helper';

const contentListStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['contentAlign']) && data.push({
        'type': 'plain',
        'id': 'contentAlign',
        'responsive': true,
        'selector': `.${elementId} .guten-postlist .guten-post`,
        'properties': [
            {
                'name': 'text-align',
                'valueType': 'direct',
            }
        ],
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
        'selector': `.${elementId} .guten-postlist .guten-post a`,
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
        'selector': `.${elementId} .guten-postlist .guten-post a`,
    });

    isNotEmpty(attributes['contentWidth']) && data.push({
        'type': 'unitPoint',
        'id': 'contentWidth',
        'responsive': true,
        'properties': [
            {
                'name': 'width',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .guten-postlist .guten-post a`,
    });

    isNotEmpty(attributes['contentBackground']) && data.push({
        'type': 'background',
        'id': 'contentBackground',
        'selector': `.${elementId} .guten-postlist .guten-post a`,
    });

    isNotEmpty(attributes['contentHoverBackground']) && data.push({
        'type': 'background',
        'id': 'contentHoverBackground',
        'selector': `.${elementId} .guten-postlist .guten-post:hover a`,
    });

    isNotEmpty(attributes['contentBorder']) && data.push({
        'type': 'border',
        'id': 'contentBorder',
        'selector': `.${elementId} .guten-postlist .guten-post a`,
    });

    isNotEmpty(attributes['contentBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'contentBorderResponsive',
        'selector': `.${elementId} .guten-postlist .guten-post a`,
    });

    isNotEmpty(attributes['contentHoverBorder']) && data.push({
        'type': 'border',
        'id': 'contentHoverBorder',
        'selector': `.${elementId} .guten-postlist .guten-post:hover a`,
    });

    isNotEmpty(attributes['contentHoverBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'contentHoverBorderResponsive',
        'selector': `.${elementId} .guten-postlist .guten-post:hover a`,
    });

    isNotEmpty(attributes['contentShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'contentShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .guten-postlist .guten-post a`,
    });

    isNotEmpty(attributes['contentHoverShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'contentHoverShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .guten-postlist .guten-post:hover a`,
    });
    return data;
};

export default contentListStyle;