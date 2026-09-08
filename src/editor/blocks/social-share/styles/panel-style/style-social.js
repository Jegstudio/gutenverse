import { isNotEmpty } from 'gutenverse-core/helper';

const socialStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['layoutMode']) && attributes['layoutMode'] === 'stretch' && data.push({
        'type': 'plain',
        'id': 'layoutMode',
        'selector': `.editor-styles-wrapper .${elementId}.guten-social-share`,
        'properties': [
            {
                'name': 'width',
                'valueType': 'function',
                'valueFunc': () => '100%',
            },
            {
                'name': 'align-items',
                'valueType': 'function',
                'valueFunc': () => 'stretch',
            }
        ],
    });

    isNotEmpty(attributes['alignment']) && data.push({
        'type': 'plain',
        'id': 'alignment',
        'responsive': true,
        'selector': `.editor-styles-wrapper .${elementId}, .editor-styles-wrapper .${elementId}.vertical > div`,
        'properties': [
            {
                'name': 'justify-content',
                'valueType': 'direct',
            },
            {
                'name': 'align-items',
                'valueType': 'direct',
            }
        ],
    });
    isNotEmpty(attributes['alignment']) && data.push({
        'type': 'plain',
        'id': 'alignment',
        'responsive': true,
        'selector': `.editor-styles-wrapper .${elementId}.horizontal`,
        'properties': [
            {
                'name': 'text-align',
                'valueType': 'function',
                'functionName': 'handleAlign'
            }
        ],
    });
    isNotEmpty(attributes['gap']) && data.push({
        'type': 'plain',
        'id': 'gap',
        'responsive' : true,
        'properties': [
            {
                'name': 'margin-left',
                'valueType': 'pattern',
                'pattern' : '{value}px',
                'patternValues' : {
                    'value' : {
                        'type' : 'direct'
                    }
                }
            }
        ],
        'selector': `.editor-styles-wrapper .${elementId}.horizontal > div:not(:first-of-type)`,
    });

    isNotEmpty(attributes['gap']) && data.push({
        'type': 'plain',
        'id': 'gap',
        'responsive' : true,
        'properties': [
            {
                'name': 'margin-top',
                'valueType': 'pattern',
                'pattern' : '{value}px',
                'patternValues' : {
                    'value' : {
                        'type' : 'direct'
                    }
                }
            }
        ],
        'selector': `.editor-styles-wrapper .${elementId}.vertical > div:not(:first-of-type)`,
    });
    return data;
};

export default socialStyle;
