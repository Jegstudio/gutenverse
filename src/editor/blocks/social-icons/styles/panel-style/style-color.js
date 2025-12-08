import { isNotEmpty } from 'gutenverse-core/helper';

const colorStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['iconColor']) && data.push({
        'type': 'color',
        'id': 'iconColor',
        'selector': `.${elementId}.fill .guten-social-icon a i, .${elementId}.border .guten-social-icon a i, .${elementId}.custom .guten-social-icon a i`,
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
        'selector': `.${elementId}.border .guten-social-icon a`,
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
        'selector': `.${elementId} .guten-social-icon a span`,
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
        'selector': `.${elementId}.fill .guten-social-icon a:hover i, .${elementId}.border .guten-social-icon a:hover i, .${elementId}.custom .guten-social-icon a:hover i`,
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
        'selector': `.${elementId}.border .guten-social-icon a:hover`,
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
        'selector': `.${elementId} .guten-social-icon a:hover span`,
        'properties' : [
            {
                'name' : 'color',
                'valueType' : 'direct'
            }
        ]
    });

    // Bg Color
    isNotEmpty(attributes['bgColor']) && data.push({
        'type': 'color',
        'id': 'bgColor',
        'selector': `.${elementId}.fill .guten-social-icon a, .${elementId}.border .guten-social-icon a, .${elementId}.custom .guten-social-icon a`,
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
        'selector': `.${elementId}.fill .guten-social-icon a:hover, .${elementId}.border .guten-social-icon a:hover, .${elementId}.custom .guten-social-icon a:hover`,
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
        'selector': `.${elementId}.fill .guten-social-icon a, .${elementId}.border .guten-social-icon a, .${elementId}.custom .guten-social-icon a`,
    });
    isNotEmpty(attributes['hoverBgGradient']) && data.push({
        'type': 'background',
        'id': 'hoverBgGradient',
        'selector': `.${elementId}.fill .guten-social-icon a:hover, .${elementId}.border .guten-social-icon a:hover, .${elementId}.custom .guten-social-icon a:hover`,
    });
    return data;
};

export default colorStyle;