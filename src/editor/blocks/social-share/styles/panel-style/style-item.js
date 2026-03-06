import { isNotEmpty } from 'gutenverse-core/helper';

const itemStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['typography']) && data.push({
        'type': 'typography',
        'id': 'typography',
        'selector': `.editor-styles-wrapper .${elementId} .gutenverse-share-item .gutenverse-share-text`,
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
        'selector': `.editor-styles-wrapper .${elementId} .gutenverse-share-item svg`,
    });

    isNotEmpty(attributes['iconColor']) && data.push({
        'type': 'color',
        'id': 'iconColor',
        'selector': `.editor-styles-wrapper .${elementId} .gutenverse-share-item .gutenverse-share-icon svg`,
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
        'selector': `.editor-styles-wrapper .${elementId} .gutenverse-share-item .gutenverse-share-icon`,
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
        'selector': `.editor-styles-wrapper .${elementId} .gutenverse-share-item .gutenverse-share-text`,
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
        'selector': `.editor-styles-wrapper .${elementId} .gutenverse-share-item .gutenverse-share-text`,
        'properties' : [
            {
                'name' : 'color',
                'valueType' : 'direct'
            }
        ]
    });

    isNotEmpty(attributes['borderType']) && data.push({
        'type': 'border',
        'id': 'borderType',
        'selector': `.editor-styles-wrapper .${elementId} .gutenverse-share-item`,
    });

    isNotEmpty(attributes['borderTypeResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderTypeResponsive',
        'selector': `.editor-styles-wrapper .${elementId} .gutenverse-share-item`,
    });

    isNotEmpty(attributes['iconColorHover']) && data.push({
        'type': 'color',
        'id': 'iconColorHover',
        'selector': `.editor-styles-wrapper .${elementId} .gutenverse-share-item:hover .gutenverse-share-icon svg`,
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
        'selector': `.editor-styles-wrapper .${elementId} .gutenverse-share-item:hover .gutenverse-share-icon`,
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
        'selector': `.editor-styles-wrapper .${elementId} .gutenverse-share-item:hover .gutenverse-share-text`,
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
        'selector': `.editor-styles-wrapper .${elementId} .gutenverse-share-item:hover .gutenverse-share-text`,
        'properties' : [
            {
                'name' : 'color',
                'valueType' : 'direct'
            }
        ]
    });

    isNotEmpty(attributes['borderTypeHover']) && data.push({
        'type': 'border',
        'id': 'borderTypeHover',
        'selector': `.editor-styles-wrapper .${elementId} .gutenverse-share-item:hover`,
    });

    isNotEmpty(attributes['borderTypeHoverResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderTypeHoverResponsive',
        'selector': `.editor-styles-wrapper .${elementId} .gutenverse-share-item:hover`,
    });
    return data;
};

export default itemStyle;