import { isNotEmpty } from 'gutenverse-core/helper';

const contentStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['columns']) && data.push({
        'type': 'plain',
        'id': 'columns',
        'responsive': true,
        'selector': `.${elementId}`,
        'properties': [
            {
                'name': 'columns',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['textIndent']) && data.push({
        'type': 'unitPoint',
        'id': 'textIndent',
        'responsive': true,
        'selector': `.${elementId}:not(.dropcap) p, .${elementId}.dropcap p:not(:first-child)`,
        'properties': [
            {
                'name': 'text-indent',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['gap']) && data.push({
        'type': 'unitPoint',
        'id': 'gap',
        'responsive': true,
        'selector': `.${elementId}`,
        'properties': [
            {
                'name': 'column-gap',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['alignment']) && data.push({
        'type': 'plain',
        'id': 'alignment',
        'responsive': true,
        'selector': `.${elementId}`,
        'properties': [
            {
                'name': 'text-align',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['textColor']) && data.push({
        'type': 'color',
        'id': 'textColor',
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}`,
    });

    isNotEmpty(attributes['typography']) && data.push({
        'type': 'typography',
        'id': 'typography',
        'selector': `.${elementId}`,
    });

    isNotEmpty(attributes['linkColor']) && data.push({
        'type': 'color',
        'id': 'linkColor',
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} a`,
    });

    isNotEmpty(attributes['linkTypography']) && data.push({
        'type': 'typography',
        'id': 'linkTypography',
        'selector': `.${elementId} a`,
    });

    isNotEmpty(attributes['linkColorHover']) && data.push({
        'type': 'color',
        'id': 'linkColorHover',
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} a:hover`,
    });

    isNotEmpty(attributes['linkTypographyHover']) && data.push({
        'type': 'typography',
        'id': 'linkTypographyHover',
        'selector': `.${elementId} a:hover`,
    });
    return data;
};

export default contentStyle;