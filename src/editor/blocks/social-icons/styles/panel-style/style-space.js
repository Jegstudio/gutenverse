import { isNotEmpty } from 'gutenverse-core/helper';

const spaceStyle = (elementId, attributes, data) => {
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
        'selector': `.${elementId}.horizontal > div:not(:first-child)`,
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
        'selector': `.${elementId}.vertical > div:not(:first-child)`,
    });

    isNotEmpty(attributes['itemPadding']) && data.push({
        'type': 'dimension',
        'id': 'itemPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.guten-social-icons.${elementId} .guten-social-icon a`,
    });
    return data;
};

export default spaceStyle;