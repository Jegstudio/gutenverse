import { isNotEmpty } from 'gutenverse-core/helper';

const contentStyle = (elementId, attributes, data) => {
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
        'selector': `.guten-social-icon #${elementId} i`,
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
        'selector': `.guten-social-icon #${elementId} svg`,
    });

    isNotEmpty(attributes['typography']) && data.push({
        'type': 'typography',
        'id': 'typography',
        'selector': `.guten-social-icon #${elementId} span`,
    });

    isNotEmpty(attributes['borderRadius']) && data.push({
        'type': 'dimension',
        'id': 'borderRadius',
        'properties': [
            {
                'name': 'border-radius',
                'valueType': 'direct',
                'multiDimension' : false
            }
        ],
        'selector': `.guten-social-icons .guten-social-icon a#${elementId}`,
    });
    return data;
};

export default contentStyle;