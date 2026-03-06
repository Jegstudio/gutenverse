import { isNotEmpty } from 'gutenverse-core/helper';

const panelTextStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['textColor']) && data.push({
        'type': 'color',
        'id': 'textColor',
        'selector': `.${elementId} .guten-icon-list-item .list-text`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['textColorHover']) && data.push({
        'type': 'color',
        'id': 'textColorHover',
        'selector': `.${elementId} .guten-icon-list-item:hover .list-text`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['textIndent']) && data.push({
        'type': 'plain',
        'id': 'textIndent',
        'responsive': true,
        'selector': `.${elementId} .guten-icon-list-item a, .block-editor-block-list__layout .wp-block.${elementId} .guten-icon-list-item a`,
        'properties': [
            {
                'name': 'gap',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct'
                    }
                }
            }
        ]
    });

    isNotEmpty(attributes['textTypography']) && isNotEmpty(attributes['textTypography'].lineHeight) && data.push({
        'type': 'unitPoint',
        'id': 'placeholderUnitPoint', //only to match unit point attributes
        'responsive': true,
        'selector': `.${elementId} .guten-icon-list-item i`,
        'properties': [
            {
                'name': 'line-height',
                'valueType': 'function',
                'functionName' : 'handleUseOtherAttribute'
            }
        ],
        'otherAttribute' : {
            'theAttribute' : attributes['textTypography'].lineHeight,
        },
    });

    isNotEmpty(attributes['textTypography']) && data.push({
        'type': 'typography',
        'id': 'textTypography',
        'selector': `.${elementId} .guten-icon-list-item .list-text`,
    });
    return data;
};

export default panelTextStyle;