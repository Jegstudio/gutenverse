import { isNotEmpty } from 'gutenverse-core/helper';

const highlightStyle = (props) => {
    const {
        elementId,
        data,
        attributes,
    } = props;

    isNotEmpty(attributes['highlightColor']) && attributes['highlightColorType'] === 'color' && data.push({
        'type': 'color',
        'id': 'highlightColor',
        'selector': `.editor-styles-wrapper .${elementId} .text-content svg path`,
        'properties': [
            {
                'name': 'stroke',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['highlightWidth']) && data.push({
        'type': 'plain',
        'id': 'highlightWidth',
        'selector': `.editor-styles-wrapper .${elementId} .text-content svg path`,
        'properties': [
            {
                'name': 'stroke-width',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['highlightRoundedEdges']) && data.push({
        'type': 'plain',
        'id': 'highlightRoundedEdges',
        'selector': `.editor-styles-wrapper .${elementId} .text-content svg path`,
        'properties': [
            {
                'name': 'stroke-linecap',
                'valueType': 'pattern',
                'pattern': 'round'
            },
            {
                'name': 'stroke-linejoin',
                'valueType': 'pattern',
                'pattern': 'round'
            }
        ]
    });

    if (attributes['highlightInFront']) {
        data.push({
            'type': 'plain',
            'id': 'highlightInFront',
            'selector': `.editor-styles-wrapper .${elementId} .text-content .text-wrapper`,
            'properties': [
                {
                    'name': 'z-index',
                    'valueType': 'pattern',
                    'pattern': '1'
                }
            ]
        });
        data.push({
            'type': 'plain',
            'id': 'highlightInFront',
            'selector': `.editor-styles-wrapper .${elementId} .text-content svg`,
            'properties': [
                {
                    'name': 'z-index',
                    'valueType': 'pattern',
                    'pattern': '2'
                }
            ]
        });
    }

    return data;
};

export default highlightStyle;
