import { isNotEmpty } from 'gutenverse-core/helper';

const textNormalStyle = (props) => {
    const {
        elementId,
        data,
        attributes,
    } = props;

    /**Panel Style */
    isNotEmpty(attributes['textNormalColor']) && data.push({
        'type': 'color',
        'id': 'textNormalColor',
        'selector': `.editor-styles-wrapper .${elementId} .non-animated-text`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['textNormalColorHover']) && data.push({
        'type': 'color',
        'id': 'textNormalColorHover',
        'selector': `.editor-styles-wrapper .${elementId}:hover .non-animated-text`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    if (isNotEmpty(attributes['normalColorType']) && attributes['normalColorType'] === 'gradient') {
        isNotEmpty(attributes['textNormalGradient']) && data.push({
            'type': 'plain',
            'id': 'textNormalGradient',
            'selector': `.editor-styles-wrapper .${elementId} .non-animated-text`,
            'properties': [
                {
                    'name': 'background',
                    'valueType': 'function',
                    'functionName': 'customHandleBackground',
                },
                {
                    'name': 'background-clip',
                    'valueType': 'pattern',
                    'pattern': 'text',
                },
                {
                    'name': '-webkit-text-fill-color',
                    'valueType': 'pattern',
                    'pattern': 'transparent',
                }
            ],
        });

        isNotEmpty(attributes['textNormalGradientHover']) && data.push({
            'type': 'plain',
            'id': 'textNormalGradientHover',
            'selector': `.editor-styles-wrapper .${elementId}:hover .non-animated-text`,
            'properties': [
                {
                    'name': 'background',
                    'valueType': 'function',
                    'functionName': 'customHandleBackground',
                },
                {
                    'name': 'background-clip',
                    'valueType': 'pattern',
                    'pattern': 'text',
                },
                {
                    'name': '-webkit-text-fill-color',
                    'valueType': 'pattern',
                    'pattern': 'transparent',
                }
            ],
        });
    }

    isNotEmpty(attributes['textNormalTypography']) && data.push({
        'type': 'typography',
        'id': 'textNormalTypography',
        'selector': `.editor-styles-wrapper .${elementId} .non-animated-text`,
    });

    isNotEmpty(attributes['textNormalShadow']) && data.push({
        'type': 'textShadow',
        'id': 'textNormalShadow',
        'properties': [
            {
                'name': 'text-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .${elementId} .non-animated-text`,
    });

    isNotEmpty(attributes['textNormalStroke']) && data.push({
        'type': 'textStroke',
        'id': 'textNormalStroke',
        'selector': `.editor-styles-wrapper .${elementId} .non-animated-text`,
    });

    return data;
};

export default textNormalStyle;