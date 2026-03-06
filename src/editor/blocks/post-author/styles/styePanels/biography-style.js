import { isNotEmpty } from 'gutenverse-core/helper';

export const biographyStyle = (elementId, attributes, data) => {

    isNotEmpty(attributes['biographyTypography']) && attributes['authorBio'] && data.push({
        'type': 'typography',
        'id': 'biographyTypography',
        'selector': `.guten-post-author.${elementId} span.author-bio`,
    });

    isNotEmpty(attributes['biographyMargintop']) && attributes['authorBio'] && data.push({
        'type': 'plain',
        'id': 'biographyMargintop',
        'responsive': true,
        'selector': `.guten-post-author.${elementId} span.author-bio`,
        'properties': [
            {
                'name': 'margin-top',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    },
                }
            },
        ],
    });

    isNotEmpty(attributes['biographyColor']) && attributes['authorBio'] && data.push({
        'type': 'color',
        'id': 'biographyColor',
        'selector': `.guten-post-author.${elementId} span.author-bio`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['biographyTextShadow']) && attributes['authorBio'] && data.push({
        'type': 'textShadow',
        'id': 'biographyTextShadow',
        'properties': [
            {
                'name': 'text-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.guten-post-author.${elementId} span.author-bio`,
    });

    isNotEmpty(attributes['biographyColorHover']) && attributes['authorBio'] && data.push({
        'type': 'color',
        'id': 'biographyColorHover',
        'selector': `.guten-post-author.${elementId} span.author-bio:hover`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['biographyTextShadowHover']) && attributes['authorBio'] && data.push({
        'type': 'textShadow',
        'id': 'biographyTextShadowHover',
        'properties': [
            {
                'name': 'text-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.guten-post-author.${elementId} span.author-bio:hover`,
    });

    return data;
};