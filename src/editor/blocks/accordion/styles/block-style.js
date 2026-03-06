import { applyFilters } from '@wordpress/hooks';
import { isNotEmpty } from 'gutenverse-core/helper';

const getBlockStyle = (elementId, attributes) => {
    let data = [];
    isNotEmpty(attributes['contentBackgroundColor']) && data.push({
        'type': 'color',
        'id': 'contentBackgroundColor',
        'selector': `.guten-accordions .${elementId}.accordion-item .accordion-content:first-child`,
        'properties': [
            {
                'name': 'background',
                'valueType': 'direct',
            }
        ],
    });

    isNotEmpty(attributes['contentBackgroundColorClosed']) && data.push({
        'type': 'color',
        'id': 'contentBackgroundColorClosed',
        'selector': `.guten-accordions .${elementId}.accordion-item .accordion-body.closed .accordion-content:first-child`,
        'properties': [
            {
                'name': 'background',
                'valueType': 'direct',
                'important': true,
            }
        ],
    });

    isNotEmpty(attributes['contentBackgroundColorHover']) && data.push({
        'type': 'color',
        'id': 'contentBackgroundColorHover',
        'selector': `.guten-accordions .${elementId}.accordion-item .accordion-body:not(.closed) .accordion-content:first-child:hover`,
        'properties': [
            {
                'name': 'background',
                'valueType': 'direct',
                'important': true,
            }
        ],
    });

    isNotEmpty(attributes['contentTextColor']) && data.push({
        'type': 'color',
        'id': 'contentTextColor',
        'selector': `.${elementId}.accordion-item .accordion-content:first-child`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct',
                'important': true,
            }
        ],
    });

    isNotEmpty(attributes['contentTextColorClosed']) && data.push({
        'type': 'color',
        'id': 'contentTextColorClosed',
        'selector': `.${elementId}.accordion-item .accordion-body.closed .accordion-content:first-child`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct',
                'important': true,
            }
        ],
    });

    isNotEmpty(attributes['contentTextColorHover']) && data.push({
        'type': 'color',
        'id': 'contentTextColorHover',
        'selector': `.${elementId}.accordion-item .accordion-body:not(.closed) .accordion-content:first-child:hover`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct',
                'important': true,
            }
        ],
    });

    isNotEmpty(attributes['contentBackgroundGradient']) && data.push({
        'type': 'background',
        'id': 'contentBackgroundGradient',
        'selector': `.guten-accordions .${elementId}.accordion-item .accordion-content:first-child`,
    });

    isNotEmpty(attributes['contentBackgroundGradientClosed']) && data.push({
        'type': 'background',
        'id': 'contentBackgroundGradientClosed',
        'selector': `.guten-accordions .${elementId}.accordion-item .accordion-body.closed .accordion-content:first-child`,
    });

    isNotEmpty(attributes['contentBackgroundGradientHover']) && data.push({
        'type': 'background',
        'id': 'contentBackgroundGradientHover',
        'selector': `.guten-accordions .${elementId}.accordion-item .accordion-body:not(.closed) .accordion-content:first-child:hover`,
    });

    return [
        ...data,
        ...applyFilters(
            'gutenverse.accordion.blockStyle',
            [],
            {
                elementId,
                attributes
            }
        )
    ];
};


export default getBlockStyle;