import { isNotEmpty } from 'gutenverse-core/helper';

const textAnimatedStyle = (props) => {
    const {
        elementId,
        data,
        attributes,
    } = props;

    /**Panel Style */
    isNotEmpty(attributes['textAnimatedColor']) && data.push({
        'type': 'color',
        'id': 'textAnimatedColor',
        'selector': `.editor-styles-wrapper .${elementId} .text-content .text-wrapper`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['textAnimatedColorHover']) && data.push({
        'type': 'color',
        'id': 'textAnimatedColorHover',
        'selector': `.editor-styles-wrapper .${elementId}:hover .text-content .text-wrapper`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    if (isNotEmpty(attributes['animatedColorType']) && attributes['animatedColorType'] === 'gradient') {
        isNotEmpty(attributes['textAnimatedGradient']) && data.push({
            'type': 'plain',
            'id': 'textAnimatedGradient',
            'selector': `.editor-styles-wrapper .${elementId} .text-content .text-wrapper .letter`,
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
                },
            ],
        });

        isNotEmpty(attributes['textAnimatedGradientHover']) && data.push({
            'type': 'plain',
            'id': 'textAnimatedGradientHover',
            'selector': `.editor-styles-wrapper .${elementId}:hover .text-content .text-wrapper .letter`,
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

    isNotEmpty(attributes['textAnimatedTypography']) && data.push({
        'type': 'typography',
        'id': 'textAnimatedTypography',
        'selector': `.editor-styles-wrapper .${elementId} .text-content .text-wrapper`,
    });

    isNotEmpty(attributes['textAnimatedShadow']) && data.push({
        'type': 'textShadow',
        'id': 'textAnimatedShadow',
        'properties': [
            {
                'name': 'text-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .${elementId} .text-content .text-wrapper`,
    });

    isNotEmpty(attributes['textAnimatedStroke']) && data.push({
        'type': 'textStroke',
        'id': 'textAnimatedStroke',
        'selector': `.editor-styles-wrapper .${elementId} .text-content .text-wrapper`,
    });

    return data;
};

export default textAnimatedStyle;