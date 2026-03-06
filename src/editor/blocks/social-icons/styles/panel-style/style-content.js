import { isNotEmpty } from 'gutenverse-core/helper';

const contentStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['alignment']) && data.push({
        'type': 'plain',
        'id': 'alignment',
        'responsive': true,
        'selector': `.${elementId}`,
        'properties': [
            {
                'name': 'justify-content',
                'valueType': 'direct',
            }
        ],
    });
    isNotEmpty(attributes['alignment']) && data.push({
        'type': 'plain',
        'id': 'alignment',
        'responsive': true,
        'selector': `.${elementId} .guten-social-icon`,
        'properties': [
            {
                'name': 'text-align',
                'valueType': 'function',
                'functionName' : 'handleAlign'
            }
        ],
    });
    isNotEmpty(attributes['iconSize']) && data.push({
        'type': 'unitPoint',
        'id': 'iconSize',
        'responsive' : true,
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .guten-social-icon a i`,
    });

    isNotEmpty(attributes['iconSize']) && data.push({
        'type': 'unitPoint',
        'id': 'iconSize',
        'responsive' : true,
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .guten-social-icon a svg`,
    });

    isNotEmpty(attributes['typography']) && data.push({
        'type': 'typography',
        'id': 'typography',
        'selector': `.${elementId} .guten-social-icon span`,
    });

    return data;
};

export default contentStyle;