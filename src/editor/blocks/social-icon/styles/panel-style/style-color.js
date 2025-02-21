import { isNotEmpty } from 'gutenverse-core/helper';

const colorStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['iconColor']) && data.push({
        'type': 'color',
        'id': 'iconColor',
        'selector': `.guten-social-icons.fill .guten-social-icon #${elementId} i, .guten-social-icons.border .guten-social-icon #${elementId} i, .guten-social-icons.custom .guten-social-icon #${elementId} i`,
        'properties' : [
            {
                'name' : 'color',
                'valueType' : 'direct'
            }
        ]
    });
    isNotEmpty(attributes['iconColor']) && data.push({
        'type': 'color',
        'id': 'iconColor',
        'selector': `.guten-social-icons.border .guten-social-icon #${elementId}`,
        'properties' : [
            {
                'name' : 'border-color',
                'valueType' : 'direct'
            }
        ]
    });

    isNotEmpty(attributes['bgColor']) && data.push({
        'type': 'color',
        'id': 'bgColor',
        'selector': `.guten-social-icons.fill .guten-social-icon #${elementId}, .guten-social-icons.border .guten-social-icon #${elementId}, .guten-social-icons.custom .guten-social-icon #${elementId}`,
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
        'selector': `.guten-social-icons .guten-social-icon #${elementId} span`,
        'properties' : [
            {
                'name' : 'color',
                'valueType' : 'direct'
            }
        ]
    });

    isNotEmpty(attributes['hoverIconColor']) && data.push({
        'type': 'color',
        'id': 'hoverIconColor',
        'selector': `.guten-social-icons.fill .guten-social-icon #${elementId}:hover i, .guten-social-icons.border .guten-social-icon #${elementId}:hover i, .guten-social-icons.custom .guten-social-icon #${elementId}:hover i`,
        'properties' : [
            {
                'name' : 'color',
                'valueType' : 'direct'
            }
        ]
    });
    isNotEmpty(attributes['hoverIconColor']) && data.push({
        'type': 'color',
        'id': 'hoverIconColor',
        'selector': `.guten-social-icons.border .guten-social-icon #${elementId}:hover`,
        'properties' : [
            {
                'name' : 'border-color',
                'valueType' : 'direct'
            }
        ]
    });

    isNotEmpty(attributes['hoverBgColor']) && data.push({
        'type': 'color',
        'id': 'hoverBgColor',
        'selector': `.guten-social-icons.fill .guten-social-icon #${elementId}:hover, .guten-social-icons.border .guten-social-icon #${elementId}:hover, .guten-social-icons.custom .guten-social-icon #${elementId}:hover`,
        'properties' : [
            {
                'name' : 'background-color',
                'valueType' : 'direct'
            }
        ]
    });

    isNotEmpty(attributes['hoverTextColor']) && data.push({
        'type': 'color',
        'id': 'hoverTextColor',
        'selector': `.guten-social-icons .guten-social-icon #${elementId}:hover span`,
        'properties' : [
            {
                'name' : 'color',
                'valueType' : 'direct'
            }
        ]
    });
    return data;
};

export default colorStyle;