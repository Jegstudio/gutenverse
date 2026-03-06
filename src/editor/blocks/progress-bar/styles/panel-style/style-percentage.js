import { isNotEmpty } from 'gutenverse-core/helper';

const percentageStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['percentBgColor']) && data.push({
        'type': 'color',
        'id': 'percentBgColor',
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct',
            }
        ],
        'selector': `.${elementId} .progress-group[class*="tooltip-"] .progress-skill-bar .skill-bar .skill-track .number-percentage-wrapper,
                    .${elementId} .progress-group.ribbon .progress-skill-bar .skill-bar .skill-track .number-percentage-wrapper,
                    .${elementId} .progress-group.switch .progress-skill-bar .skill-bar .skill-track:before,
                    .${elementId} .progress-group[class*="tooltip-"]:not(.tooltip-style) .progress-skill-bar .skill-bar .skill-track .number-percentage-wrapper:before`,
    });

    isNotEmpty(attributes['percentBgColor']) && data.push({
        'type': 'color',
        'id': 'percentBgColor',
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct',
            }
        ],
        'selector': `.${elementId} .progress-group.tooltip-style .progress-skill-bar .skill-bar .skill-track .number-percentage-wrapper:before`
    });

    isNotEmpty(attributes['percentBgColor']) && data.push({
        'type': 'color',
        'id': 'percentBgColor',
        'properties': [
            {
                'name': 'border-right-color',
                'valueType': 'direct',
            },
            {
                'name': 'border-bottom-color',
                'valueType': 'direct',
            },
        ],
        'selector': `.${elementId} .progress-group.ribbon .progress-skill-bar .skill-bar .skill-track .number-percentage-wrapper:before`
    });

    isNotEmpty(attributes['percentColor']) && data.push({
        'type': 'color',
        'id': 'percentColor',
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct',
            }
        ],
        'selector': `.${elementId} .progress-group .progress-skill-bar .number-percentage, .${elementId} .progress-group .number-percentage`
    });

    isNotEmpty(attributes['percentTypography']) && data.push({
        'type': 'typography',
        'id': 'percentTypography',
        'selector': `.${elementId} .progress-group .progress-skill-bar .number-percentage, .${elementId} .progress-group .number-percentage`,
    });

    isNotEmpty(attributes['percentTextShadow']) && data.push({
        'type': 'textShadow',
        'id': 'percentTextShadow',
        'properties': [
            {
                'name': 'text-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .progress-group .progress-skill-bar .number-percentage, .${elementId} .progress-group .number-percentage`,
    });

    if(isNotEmpty(attributes['style']) && 'switch' === attributes['style']) {
        isNotEmpty(attributes['percentSwitchBorder']) && data.push({
            'type': 'border',
            'id': 'percentSwitchBorder',
            'selector': `.${elementId} .progress-group.switch .progress-skill-bar .skill-bar .skill-track:before`,
        });
        isNotEmpty(attributes['percentSwitchBoxShadow']) && data.push({
            'type': 'boxShadow',
            'id': 'percentSwitchBoxShadow',
            'properties': [
                {
                    'name': 'box-shadow',
                    'valueType': 'direct'
                }
            ],
            'selector': `.${elementId} .progress-group.switch .progress-skill-bar .skill-bar .skill-track:before`,
        });
        isNotEmpty(attributes['percentSwitchSize']) && data.push({
            'type': 'unitPoint',
            'id': 'percentSwitchSize',
            'properties': [
                {
                    'name': 'width',
                    'valueType': 'direct'
                },
                {
                    'name': 'height',
                    'valueType': 'direct'
                }
            ],
            'selector': `.${elementId} .progress-group.switch .progress-skill-bar .skill-bar .skill-track:before`,
        });
    }

    return data;
};

export default percentageStyle;