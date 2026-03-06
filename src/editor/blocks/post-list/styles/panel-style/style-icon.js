import { isNotEmpty } from 'gutenverse-core/helper';

const iconStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['iconAlign']) && data.push({
        'type': 'plain',
        'id': 'iconAlign',
        'responsive': true,
        'selector': `.${elementId} .guten-postlist .guten-post a .icon-list`,
        'properties': [
            {
                'name': 'align-self',
                'valueType': 'direct',
            }
        ],
    });

    isNotEmpty(attributes['iconWidth']) && data.push({
        'type': 'plain',
        'id': 'iconWidth',
        'responsive': true,
        'selector': `.${elementId} .guten-postlist .guten-post a .icon-list`,
        'properties': [
            {
                'name': 'width',
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

    isNotEmpty(attributes['iconHeight']) && data.push({
        'type': 'plain',
        'id': 'iconHeight',
        'responsive': true,
        'selector': `.${elementId} .guten-postlist .guten-post a .icon-list`,
        'properties': [
            {
                'name': 'height',
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

    isNotEmpty(attributes['iconLineHeight']) && data.push({
        'type': 'plain',
        'id': 'iconLineHeight',
        'responsive': true,
        'selector': `.${elementId} .guten-postlist .guten-post a .icon-list`,
        'properties': [
            {
                'name': 'line-height',
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

    isNotEmpty(attributes['iconSize']) && data.push({
        'type': 'plain',
        'id': 'iconSize',
        'responsive': true,
        'selector': `.${elementId} .guten-postlist .guten-post a .icon-list i`,
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

    isNotEmpty(attributes['iconMargin']) && data.push({
        'type': 'dimension',
        'id': 'iconMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .guten-postlist .guten-post a .icon-list`,
    });

    isNotEmpty(attributes['iconRadius']) && data.push({
        'type': 'dimension',
        'id': 'iconRadius',
        'responsive': true,
        'properties': [
            {
                'name': 'border-radius',
                'valueType': 'direct',
                'multiDimension' : false
            }
        ],
        'selector': `.${elementId} .guten-postlist .guten-post a .icon-list i`,
    });

    isNotEmpty(attributes['iconColor']) && data.push({
        'type': 'color',
        'id': 'iconColor',
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct',
            }
        ],
        'selector': `.${elementId} .guten-postlist .guten-post a .icon-list i, .${elementId} .guten-postlist .guten-post a .icon-list .gutenverse-icon-svg`,
    });

    isNotEmpty(attributes['iconHoverColor']) && data.push({
        'type': 'color',
        'id': 'iconHoverColor',
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct',
            }
        ],
        'selector': `.${elementId} .guten-postlist .guten-post:hover a .icon-list i`,
    });

    isNotEmpty(attributes['iconBackground']) && data.push({
        'type': 'background',
        'id': 'iconBackground',
        'selector': `.${elementId} .guten-postlist .guten-post a .icon-list`,
    });
    return data;
};

export default iconStyle;