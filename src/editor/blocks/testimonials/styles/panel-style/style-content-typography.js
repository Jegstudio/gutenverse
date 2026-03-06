import { isNotEmpty } from 'gutenverse-core/helper';

const contentTypographyStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['nameTypography']) && data.push({
        'type': 'typography',
        'id': 'nameTypography',
        'selector':  `.${elementId} .guten-testimonial-item .testimonial-box .profile-info .profile-name`,
    });

    isNotEmpty(attributes['designationTypography']) && data.push({
        'type': 'typography',
        'id': 'designationTypography',
        'selector':  `.${elementId} .guten-testimonial-item .testimonial-box .profile-info .profile-des`,
    });

    isNotEmpty(attributes['designationSpacing']) && data.push({
        'type': 'plain',
        'id': 'designationSpacing',
        'responsive': true,
        'selector': `.${elementId} .guten-testimonial-item .testimonial-box .profile-info .profile-des`,
        'properties': [
            {
                'name': 'margin-top',
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

    isNotEmpty(attributes['descriptionTypography']) && data.push({
        'type': 'typography',
        'id': 'descriptionTypography',
        'selector':  `.${elementId} .guten-testimonial-item .testimonial-box .comment-content p`,
    });

    isNotEmpty(attributes['descriptionMargin']) && data.push({
        'type': 'dimension',
        'id': 'descriptionMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.guten-testimonials .swiper-container .guten-testimonial-item .testimonial-box .comment-content p`,
    });

    isNotEmpty(attributes['quoteSize']) && data.push({
        'type': 'plain',
        'id': 'quoteSize',
        'responsive': true,
        'selector': `.${elementId} .guten-testimonial-item .testimonial-box .icon-content i`,
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

    isNotEmpty(attributes['quoteSize']) && data.push({
        'type': 'plain',
        'id': 'quoteSize',
        'responsive': true,
        'selector': `.${elementId} .guten-testimonial-item .testimonial-box .icon-content svg`,
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

    isNotEmpty(attributes['quotePositionTop']) && data.push({
        'type': 'plain',
        'id': 'quotePositionTop',
        'responsive': true,
        'selector': `.${elementId}.guten-testimonials .swiper-container .guten-testimonial-item .testimonial-box .icon-content.quote-override`,
        'properties': [
            {
                'name': 'top',
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

    isNotEmpty(attributes['quotePositionLeft']) && data.push({
        'type': 'plain',
        'id': 'quotePositionLeft',
        'responsive': true,
        'selector': `.${elementId}.guten-testimonials .swiper-container .guten-testimonial-item .testimonial-box .icon-content.quote-override`,
        'properties': [
            {
                'name': 'left',
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

    isNotEmpty(attributes['nameNormalColor']) && data.push({
        'type': 'color',
        'id': 'nameNormalColor',
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.guten-testimonials .swiper-container .guten-testimonial-item .testimonial-box .profile-info .profile-name`,
    });

    isNotEmpty(attributes['nameHoverColor']) && data.push({
        'type': 'color',
        'id': 'nameHoverColor',
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.guten-testimonials .swiper-container .guten-testimonial-item:hover .testimonial-box .profile-info .profile-name`,
    });

    isNotEmpty(attributes['designationNormalColor']) && data.push({
        'type': 'color',
        'id': 'designationNormalColor',
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
        'selector':  `.${elementId}.guten-testimonials .swiper-container .guten-testimonial-item .testimonial-box .profile-info .profile-des`,
    });

    isNotEmpty(attributes['designationHoverColor']) && data.push({
        'type': 'color',
        'id': 'designationHoverColor',
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
        'selector':  `.${elementId}.guten-testimonials .swiper-container .guten-testimonial-item:hover .testimonial-box .profile-info .profile-des`,
    });

    isNotEmpty(attributes['descriptionNormalColor']) && data.push({
        'type': 'color',
        'id': 'descriptionNormalColor',
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
        'selector':  `.${elementId}.guten-testimonials .swiper-container .guten-testimonial-item .testimonial-box .comment-content p`,
    });

    isNotEmpty(attributes['descriptionHoverColor']) && data.push({
        'type': 'color',
        'id': 'descriptionHoverColor',
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
        'selector':  `.${elementId}.guten-testimonials .swiper-container .guten-testimonial-item:hover .testimonial-box .comment-content p`,
    });

    isNotEmpty(attributes['quoteNormalColor']) && data.push({
        'type': 'color',
        'id': 'quoteNormalColor',
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
        'selector':  `.${elementId} .guten-testimonial-item .testimonial-box .icon-content i`,
    });

    isNotEmpty(attributes['quoteNormalColor']) && data.push({
        'type': 'color',
        'id': 'quoteNormalColor',
        'properties': [
            {
                'name': 'fill',
                'valueType': 'direct'
            }
        ],
        'selector':  `.${elementId} .guten-testimonial-item .testimonial-box .icon-content svg`,
    });

    isNotEmpty(attributes['quoteHoverColor']) && data.push({
        'type': 'color',
        'id': 'quoteHoverColor',
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
        'selector':  `.${elementId} .guten-testimonial-item:hover .testimonial-box .icon-content i`,
    });

    isNotEmpty(attributes['quoteHoverColor']) && data.push({
        'type': 'color',
        'id': 'quoteHoverColor',
        'properties': [
            {
                'name': 'fill',
                'valueType': 'direct'
            }
        ],
        'selector':  `.${elementId} .guten-testimonial-item:hover .testimonial-box .icon-content svg`,
    });
    return data;
};

export default contentTypographyStyle;