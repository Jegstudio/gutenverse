import { isNotEmpty } from 'gutenverse-core/helper';

const typographyLabelStyle = (elementId, attributes, data) => {

    isNotEmpty(attributes['typographyLabel']) && data.push({
        'type': 'typography',
        'id': 'typographyLabel',
        'selector': `.${elementId} label`,
    });

    isNotEmpty(attributes['colorLabel']) && data.push({
        'type': 'color',
        'id': 'colorLabel',
        'selector': `.${elementId} label`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['colorRequired']) && data.push({
        'type': 'color',
        'id': 'colorRequired',
        'selector': `.${elementId} label span`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['marginLabel']) && data.push({
        'type': 'dimension',
        'id': 'marginLabel',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `
                    .${elementId} label, .${elementId} .comment-form-author label,
                    .${elementId} .comment-form-comment label,
                    .${elementId} .comment-form-email label,
                    .${elementId} .comment-form-url label,
                    .${elementId} .comment-form-cookies-consent input#wp-comment-cookies-consent`,
    });

    return data;
};

export default typographyLabelStyle;