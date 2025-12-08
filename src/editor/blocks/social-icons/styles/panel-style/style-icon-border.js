import { isNotEmpty } from 'gutenverse-core/helper';

const iconBorderStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['iconBorder']) && data.push({
        'type': 'border',
        'id': 'iconBorder',
        'selector': `.${elementId} .guten-social-icon a`,
    });

    isNotEmpty(attributes['iconBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'iconBorderResponsive',
        'selector': `.${elementId} .guten-social-icon a`,
    });

    isNotEmpty(attributes['iconBorderHover']) && data.push({
        'type': 'border',
        'id': 'iconBorderHover',
        'selector': `.${elementId} .guten-social-icon:hover a`,
    });

    isNotEmpty(attributes['iconBorderHoverResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'iconBorderHoverResponsive',
        'selector': `.${elementId} .guten-social-icon:hover a`,
    });

    isNotEmpty(attributes['iconBoxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'iconBoxShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector':  `.${elementId} .guten-social-icon a`,
    });

    isNotEmpty(attributes['iconBoxShadowHover']) && data.push({
        'type': 'boxShadow',
        'id': 'iconBoxShadowHover',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .guten-social-icon:hover a`,
    });
    return data;
};

export default iconBorderStyle;