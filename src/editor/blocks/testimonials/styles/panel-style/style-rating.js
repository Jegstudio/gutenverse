import { isNotEmpty } from 'gutenverse-core/helper';

const ratingStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['ratingAlignment']) && data.push({
        'type': 'plain',
        'id': 'ratingAlignment',
        'responsive': true,
        'selector': `.${elementId}.style-1 ul.rating-stars, 
                    .${elementId}.style-2 ul.rating-stars, 
                    .${elementId}.style-3 ul.rating-stars, 
                    .${elementId}.style-4 ul.rating-stars`,
        'properties': [
            {
                'name': 'justify-content',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['ratingColor']) && data.push({
        'type': 'color',
        'id': 'ratingColor',
        'selector': `.${elementId}.style-1 .guten-testimonial-item ul.rating-stars li, 
                    .${elementId}.style-2 .guten-testimonial-item ul.rating-stars li, 
                    .${elementId}.style-3 .guten-testimonial-item ul.rating-stars li, 
                    .${elementId}.style-4 .guten-testimonial-item ul.rating-stars li`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['ratingColor']) && data.push({
        'type': 'color',
        'id': 'ratingColor',
        'selector': `.${elementId}.style-1 .guten-testimonial-item ul.rating-stars li svg, 
                    .${elementId}.style-2 .guten-testimonial-item ul.rating-stars li svg, 
                    .${elementId}.style-3 .guten-testimonial-item ul.rating-stars li svg, 
                    .${elementId}.style-4 .guten-testimonial-item ul.rating-stars li svg`,
        'properties': [
            {
                'name': 'fill',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['ratingColorHover']) && data.push({
        'type': 'color',
        'id': 'ratingColorHover',
        'selector': `.${elementId}.style-1 .guten-testimonial-item:hover ul.rating-stars li, 
                                .${elementId}.style-2 .guten-testimonial-item:hover ul.rating-stars li, 
                                .${elementId}.style-3 .guten-testimonial-item:hover ul.rating-stars li, 
                                .${elementId}.style-4 .guten-testimonial-item:hover ul.rating-stars li`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['ratingColorHover']) && data.push({
        'type': 'color',
        'id': 'ratingColorHover',
        'selector': `.${elementId}.style-1 .guten-testimonial-item:hover ul.rating-stars li svg, 
                                .${elementId}.style-2 .guten-testimonial-item:hover ul.rating-stars li svg, 
                                .${elementId}.style-3 .guten-testimonial-item:hover ul.rating-stars li svg, 
                                .${elementId}.style-4 .guten-testimonial-item:hover ul.rating-stars li svg`,
        'properties': [
            {
                'name': 'fill',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['ratingIconSize']) && data.push({
        'type': 'plain',
        'id': 'ratingIconSize',
        'responsive': true,
        'selector': `.${elementId} .guten-testimonial-item ul.rating-stars li i`,
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'pattern',
                'pattern' : '{value}px',
                'patternValues' : {
                    'value' : {
                        'type' : 'direct'
                    }
                }
            }
        ]
    });

    isNotEmpty(attributes['ratingIconSize']) && data.push({
        'type': 'plain',
        'id': 'ratingIconSize',
        'responsive': true,
        'selector': `.${elementId} .guten-testimonial-item ul.rating-stars li .gutenverse-icon-svg svg`,
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'pattern',
                'pattern' : '{value}px',
                'patternValues' : {
                    'value' : {
                        'type' : 'direct'
                    }
                }
            }
        ]
    });

    isNotEmpty(attributes['ratingIconGap']) && data.push({
        'type': 'plain',
        'id': 'ratingIconGap',
        'responsive': true,
        'selector': `.${elementId}.style-1 ul.rating-stars, 
                    .${elementId}.style-2 ul.rating-stars, 
                    .${elementId}.style-3 ul.rating-stars, 
                    .${elementId}.style-4 ul.rating-stars`,
        'properties': [
            {
                'name': 'gap',
                'valueType': 'pattern',
                'pattern' : '{value}px',
                'patternValues' : {
                    'value' : {
                        'type' : 'direct'
                    }
                }
            }
        ]
    });

    isNotEmpty(attributes['ratingMargin']) && data.push({
        'type': 'dimension',
        'id': 'ratingMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.style-1 ul.rating-stars, 
                    .${elementId}.style-2 ul.rating-stars, 
                    .${elementId}.style-3 ul.rating-stars, 
                    .${elementId}.style-4 ul.rating-stars,
                    .${elementId}.style-1 .comment-header ul.rating-stars, 
                    .${elementId}.style-2 .comment-header ul.rating-stars, 
                    .${elementId}.style-3 .comment-header ul.rating-stars, 
                    .${elementId}.style-4 .comment-header ul.rating-stars`,
    });
    return data;
};

export default ratingStyle;