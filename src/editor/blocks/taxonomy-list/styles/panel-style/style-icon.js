import { isNotEmpty } from 'gutenverse-core/helper';

const iconStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['iconSpace']) && data.push({
        'type': 'unitPoint',
        'id': 'iconSpace',
        'responsive' : true,
        'selector': `.${elementId} .taxonomy-list-wrapper .icon-list`,
        'properties' : [
            {
                'name' : 'margin-right',
                'valueType' : 'direct'
            }
        ]
    });

    isNotEmpty(attributes['iconSize']) && data.push({
        'type': 'unitPoint',
        'id': 'iconSize',
        'responsive' : true,
        'selector': `.${elementId} .taxonomy-list-wrapper .icon-list i`,
        'properties' : [
            {
                'name' : 'font-size',
                'valueType' : 'direct'
            }
        ]
    });

    isNotEmpty(attributes['iconSize']) && data.push({
        'type': 'unitPoint',
        'id': 'iconSize',
        'responsive' : true,
        'selector': `.${elementId} .taxonomy-list-wrapper .icon-list svg`,
        'properties' : [
            {
                'name' : 'font-size',
                'valueType' : 'direct'
            }
        ]
    });

    isNotEmpty(attributes['iconColor']) && data.push({
        'type': 'color',
        'id': 'iconColor',
        'selector': `.${elementId} .taxonomy-list-wrapper .taxonomy-list-item a .icon-list`,
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
        'selector': `.${elementId} .taxonomy-list-wrapper .taxonomy-list-item a .icon-list svg`,
        'properties' : [
            {
                'name' : 'fill',
                'valueType' : 'direct'
            }
        ]
    });

    isNotEmpty(attributes['iconColorHover']) && data.push({
        'type': 'color',
        'id': 'iconColorHover',
        'selector': `.${elementId} .taxonomy-list-wrapper .taxonomy-list-item a:hover .icon-list`,
        'properties' : [
            {
                'name' : 'color',
                'valueType' : 'direct'
            }
        ]
    });

    isNotEmpty(attributes['iconColorHover']) && data.push({
        'type': 'color',
        'id': 'iconColorHover',
        'selector': `.${elementId} .taxonomy-list-wrapper .taxonomy-list-item a:hover .icon-list svg`,
        'properties' : [
            {
                'name' : 'fill',
                'valueType' : 'direct'
            }
        ]
    });
    return data;
};

export default iconStyle;