import { isNotEmpty } from 'gutenverse-core/helper';

const typographyTextStyle = (elementId, attributes, data) => {

    isNotEmpty(attributes['typographyText']) && data.push({
        'type': 'typography',
        'id': 'typographyText',
        'selector': `.${elementId} .comment-form p`,
    });

    isNotEmpty(attributes['colorText']) && data.push({
        'type': 'color',
        'id': 'colorText',
        'selector': `.${elementId} .comment-form p`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['marginText']) && data.push({
        'type': 'dimension',
        'id': 'marginText',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .comment-form p`,
    });

    isNotEmpty(attributes['typographyTextList']) && data.push({
        'type': 'typography',
        'id': 'typographyTextList',
        'selector': `.${elementId} .commentlist .comment p`,
    });

    isNotEmpty(attributes['colorTextList']) && data.push({
        'type': 'color',
        'id': 'colorTextList',
        'selector': `.${elementId} .commentlist p`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['marginTextList']) && data.push({
        'type': 'dimension',
        'id': 'marginTextList',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .commentlist .comment p`,
    });

    isNotEmpty(attributes['suffixTypography']) && data.push({
        'type': 'typography',
        'id': 'suffixTypography',
        'selector': `.${elementId} span.says`,
    });

    isNotEmpty(attributes['suffixColor']) && data.push({
        'type': 'color',
        'id': 'suffixColor',
        'selector': `.${elementId} span.says`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['suffixMargin']) && data.push({
        'type': 'dimension',
        'id': 'suffixMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} span.says`,
    });

    return data;
};

export default typographyTextStyle;