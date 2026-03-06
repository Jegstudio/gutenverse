import { isNotEmpty } from 'gutenverse-core/helper';

const panelIconStyle = (elementId, attributes, data) => {

    isNotEmpty(attributes['iconColor']) && data.push({
        'type': 'color',
        'id': 'iconColor',
        'selector': `.${elementId} .guten-icon-list-item i`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['iconColor']) && data.push({
        'type': 'color',
        'id': 'iconColor',
        'selector': `.${elementId}.guten-icon-list .guten-icon-list-item svg`,
        'properties': [
            {
                'name': 'fill',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['iconColorHover']) && data.push({
        'type': 'color',
        'id': 'iconColorHover',
        'selector': `.${elementId} .guten-icon-list-item:hover i`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['iconColorHover']) && data.push({
        'type': 'color',
        'id': 'iconColorHover',
        'selector': `.${elementId}.guten-icon-list .guten-icon-list-item:hover svg`,
        'properties': [
            {
                'name': 'fill',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['iconSize']) && data.push({
        'type': 'plain',
        'id': 'iconSize',
        'responsive': true,
        'selector': `.${elementId} .guten-icon-list-item i`,
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct'
                    }
                }
            },
        ]
    });

    isNotEmpty(attributes['iconSize']) && data.push({
        'type': 'plain',
        'id': 'iconSize',
        'responsive': true,
        'selector': `.${elementId}.guten-icon-list .guten-icon-list-item svg`,
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct'
                    }
                }
            },
        ]
    });

    return data;
};

export default panelIconStyle;