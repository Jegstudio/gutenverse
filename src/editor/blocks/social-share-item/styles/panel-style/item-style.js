import { isNotEmpty } from 'gutenverse-core/helper';

const itemStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['itemGrow']) && data.push({
        'type': 'plain',
        'id': 'itemGrow',
        'selector': `.editor-styles-wrapper .${elementId}.guten-social-share-item-wrapper, .editor-styles-wrapper #${elementId}.gutenverse-share-item`,
        'properties': [
            {
                'name': 'flex',
                'valueType': 'function',
                'valueFunc': () => '1 1 0',
            },
            {
                'name': 'width',
                'valueType': 'function',
                'valueFunc': () => 'auto',
            }
        ],
    });

    isNotEmpty(attributes['itemGrow']) && data.push({
        'type': 'plain',
        'id': 'itemGrow',
        'selector': `.editor-styles-wrapper #${elementId}.gutenverse-share-item a`,
        'properties': [
            {
                'name': 'width',
                'valueType': 'function',
                'valueFunc': () => '100%',
            }
        ],
    });

    isNotEmpty(attributes['itemWidth']) && data.push({
        'type': 'unitPoint',
        'id': 'itemWidth',
        'responsive' : true,
        'properties': [
            {
                'name': 'width',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper #${elementId}.gutenverse-share-item`,
    });

    isNotEmpty(attributes['itemWidth']) && data.push({
        'type': 'plain',
        'id': 'itemWidth',
        'responsive' : true,
        'properties': [
            {
                'name': 'width',
                'valueType': 'function',
                'valueFunc': () => '100%',
            }
        ],
        'selector': `.editor-styles-wrapper #${elementId}.gutenverse-share-item a`,
    });

    isNotEmpty(attributes['itemWidth']) && data.push({
        'type': 'plain',
        'id': 'itemWidth',
        'responsive' : true,
        'properties': [
            {
                'name': 'flex',
                'valueType': 'function',
                'valueFunc': () => '1 1 auto',
            }
        ],
        'selector': `.editor-styles-wrapper .guten-social-share:not(.button-layout-solid) #${elementId}.gutenverse-share-item .gutenverse-share-text`,
    });

    isNotEmpty(attributes['buttonBackgroundColor']) && data.push({
        'type': 'color',
        'id': 'buttonBackgroundColor',
        'selector': `.editor-styles-wrapper .guten-social-share.button-layout-solid #${elementId}.gutenverse-share-item a`,
        'properties' : [
            {
                'name' : 'background-color',
                'valueType' : 'direct'
            }
        ]
    });

    isNotEmpty(attributes['buttonBackgroundColorHover']) && data.push({
        'type': 'color',
        'id': 'buttonBackgroundColorHover',
        'selector': `.editor-styles-wrapper .guten-social-share.button-layout-solid #${elementId}.gutenverse-share-item:hover a`,
        'properties' : [
            {
                'name' : 'background-color',
                'valueType' : 'direct'
            }
        ]
    });

    isNotEmpty(attributes['typography']) && attributes['showText'] && data.push({
        'type': 'typography',
        'id': 'typography',
        'selector': `.editor-styles-wrapper #${elementId}.gutenverse-share-item .gutenverse-share-text`,
    });

    isNotEmpty(attributes['iconSize']) && data.push({
        'type': 'unitPoint',
        'id': 'iconSize',
        'responsive' : true,
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'direct'
            },
            {
                'name': 'width',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper #${elementId}.gutenverse-share-item svg`,
    });

    isNotEmpty(attributes['iconColor']) && data.push({
        'type': 'color',
        'id': 'iconColor',
        'selector': `.editor-styles-wrapper #${elementId}.gutenverse-share-item .gutenverse-share-icon svg`,
        'properties' : [
            {
                'name' : 'color',
                'valueType' : 'direct'
            }
        ]
    });

    isNotEmpty(attributes['iconBackgroundColor']) && data.push({
        'type': 'color',
        'id': 'iconBackgroundColor',
        'selector': `.editor-styles-wrapper .guten-social-share:not(.button-layout-solid) #${elementId}.gutenverse-share-item .gutenverse-share-icon`,
        'properties' : [
            {
                'name' : 'background-color',
                'valueType' : 'direct'
            }
        ]
    });

    isNotEmpty(attributes['backgroundColor']) && data.push({
        'type': 'color',
        'id': 'backgroundColor',
        'selector': `.editor-styles-wrapper .guten-social-share:not(.button-layout-solid) #${elementId}.gutenverse-share-item .gutenverse-share-text`,
        'properties' : [
            {
                'name' : 'background-color',
                'valueType' : 'direct'
            }
        ]
    });

    isNotEmpty(attributes['textColor']) && data.push({
        'type': 'color',
        'id': 'textColor',
        'selector': `.editor-styles-wrapper #${elementId}.gutenverse-share-item .gutenverse-share-text`,
        'properties' : [
            {
                'name' : 'color',
                'valueType' : 'direct'
            }
        ]
    });

    isNotEmpty(attributes['border']) && data.push({
        'type': 'border',
        'id': 'border',
        'selector': `.editor-styles-wrapper #${elementId}.gutenverse-share-item`,
    });

    isNotEmpty(attributes['borderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderResponsive',
        'selector': `.editor-styles-wrapper #${elementId}.gutenverse-share-item`,
    });

    isNotEmpty(attributes['iconColorHover']) && data.push({
        'type': 'color',
        'id': 'iconColorHover',
        'selector': `.editor-styles-wrapper #${elementId}.gutenverse-share-item:hover .gutenverse-share-icon svg`,
        'properties' : [
            {
                'name' : 'color',
                'valueType' : 'direct'
            }
        ]
    });

    isNotEmpty(attributes['iconBackgroundColorHover']) && data.push({
        'type': 'color',
        'id': 'iconBackgroundColorHover',
        'selector': `.editor-styles-wrapper .guten-social-share:not(.button-layout-solid) #${elementId}.gutenverse-share-item:hover .gutenverse-share-icon`,
        'properties' : [
            {
                'name' : 'background-color',
                'valueType' : 'direct'
            }
        ]
    });

    isNotEmpty(attributes['backgroundColorHover']) && data.push({
        'type': 'color',
        'id': 'backgroundColorHover',
        'selector': `.editor-styles-wrapper .guten-social-share:not(.button-layout-solid) #${elementId}.gutenverse-share-item:hover .gutenverse-share-text`,
        'properties' : [
            {
                'name' : 'background-color',
                'valueType' : 'direct'
            }
        ]
    });

    isNotEmpty(attributes['textColorHover']) && data.push({
        'type': 'color',
        'id': 'textColorHover',
        'selector': `.editor-styles-wrapper #${elementId}.gutenverse-share-item:hover .gutenverse-share-text`,
        'properties' : [
            {
                'name' : 'color',
                'valueType' : 'direct'
            }
        ]
    });

    isNotEmpty(attributes['borderHover']) && data.push({
        'type': 'border',
        'id': 'borderHover',
        'selector': `.editor-styles-wrapper #${elementId}.gutenverse-share-item:hover`,
    });

    isNotEmpty(attributes['borderHoverResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderHoverResponsive',
        'selector': `.editor-styles-wrapper #${elementId}.gutenverse-share-item:hover`,
    });
    return data;
};

export default itemStyle;
