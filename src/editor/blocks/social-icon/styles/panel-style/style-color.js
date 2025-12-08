import { isNotEmpty } from 'gutenverse-core/helper';

const colorStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['iconColor']) && data.push({
        'type': 'color',
        'id': 'iconColor',
        'selector': `.guten-social-icons.fill .guten-social-icon.guten-social-icon-item #${elementId} i, .guten-social-icons.border .guten-social-icon.guten-social-icon-item #${elementId} i, .guten-social-icons.custom .guten-social-icon.guten-social-icon-item #${elementId} i`,
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
        'selector': `.guten-social-icons.border .guten-social-icon.guten-social-icon-item #${elementId}`,
        'properties' : [
            {
                'name' : 'border-color',
                'valueType' : 'direct'
            }
        ]
    });

    isNotEmpty(attributes['textColor']) && data.push({
        'type': 'color',
        'id': 'textColor',
        'selector': `.guten-social-icons .guten-social-icon.guten-social-icon-item #${elementId} span`,
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
        'selector': `.guten-social-icons.fill .guten-social-icon.guten-social-icon-item #${elementId}:hover i, .guten-social-icons.border .guten-social-icon.guten-social-icon-item #${elementId}:hover i, .guten-social-icons.custom .guten-social-icon.guten-social-icon-item #${elementId}:hover i`,
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
        'selector': `.guten-social-icons.border .guten-social-icon.guten-social-icon-item #${elementId}:hover`,
        'properties' : [
            {
                'name' : 'border-color',
                'valueType' : 'direct'
            }
        ]
    });

    isNotEmpty(attributes['hoverTextColor']) && data.push({
        'type': 'color',
        'id': 'hoverTextColor',
        'selector': `.guten-social-icons .guten-social-icon.guten-social-icon-item #${elementId}:hover span`,
        'properties' : [
            {
                'name' : 'color',
                'valueType' : 'direct'
            }
        ]
    });

    // Bg color
    isNotEmpty(attributes['bgColor']) && data.push({
        'type': 'color',
        'id': 'bgColor',
        'selector': `.guten-social-icons.fill .guten-social-icon.guten-social-icon-item #${elementId}, .guten-social-icons.border .guten-social-icon.guten-social-icon-item #${elementId}, .guten-social-icons.custom .guten-social-icon.guten-social-icon-item #${elementId}`,
        'properties' : [
            {
                'name' : 'background-color',
                'valueType' : 'direct'
            }
        ]
    });

    isNotEmpty(attributes['hoverBgColor']) && data.push({
        'type': 'color',
        'id': 'hoverBgColor',
        'selector': `.guten-social-icons.fill .guten-social-icon.guten-social-icon-item #${elementId}:hover, .guten-social-icons.border .guten-social-icon.guten-social-icon-item #${elementId}:hover, .guten-social-icons.custom .guten-social-icon.guten-social-icon-item #${elementId}:hover`,
        'properties' : [
            {
                'name' : 'background-color',
                'valueType' : 'direct'
            }
        ]
    });

    // Bg Gradient
    isNotEmpty(attributes['bgGradient']) && data.push({
        'type': 'background',
        'id': 'bgGradient',
        'selector': `.guten-social-icons.fill .guten-social-icon.guten-social-icon-item #${elementId}, .guten-social-icons.border .guten-social-icon.guten-social-icon-item #${elementId}, .guten-social-icons.custom .guten-social-icon.guten-social-icon-item #${elementId}`,
    });

    isNotEmpty(attributes['hoverBgGradient']) && data.push({
        'type': 'background',
        'id': 'hoverBgGradient',
        'selector': `.guten-social-icons.fill .guten-social-icon.guten-social-icon-item #${elementId}:hover, .guten-social-icons.border .guten-social-icon.guten-social-icon-item #${elementId}:hover, .guten-social-icons.custom .guten-social-icon.guten-social-icon-item #${elementId}:hover`,
    });

    return data;
};

export default colorStyle;