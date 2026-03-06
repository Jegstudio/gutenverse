import { isNotEmpty } from 'gutenverse-core/helper';

const panelTitleStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['titleMargin']) && data.push({
        'type': 'dimension',
        'id': 'titleMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.gutenverse-image-box .inner-container .image-box-body .body-title`,
    });

    isNotEmpty(attributes['titleTypography']) && data.push({
        'type': 'typography',
        'id': 'titleTypography',
        'selector': `.${elementId}.gutenverse-image-box .inner-container .image-box-body .body-title`,
    });

    isNotEmpty(attributes['titleIconSize']) && data.push({
        'type': 'plain',
        'id': 'titleIconSize',
        'responsive': true,
        'selector': `.${elementId}.gutenverse-image-box .inner-container .image-box-body .body-title i`,
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct'
                    }
                }
            }
        ]
    });

    isNotEmpty(attributes['titleIconSize']) && data.push({
        'type': 'plain',
        'id': 'titleIconSize',
        'responsive': true,
        'selector': `.${elementId}.gutenverse-image-box .inner-container .image-box-body .body-title svg`,
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct'
                    }
                }
            }
        ]
    });

    isNotEmpty(attributes['titleIconSpacing']) && data.push({
        'type': 'plain',
        'id': 'titleIconSpacing',
        'responsive': true,
        'selector': `.${elementId}.gutenverse-image-box .inner-container .image-box-body .body-title.icon-position-before i, .${elementId}.gutenverse-image-box .inner-container .image-box-body .body-title.icon-position-before .gutenverse-icon-svg`,
        'properties': [
            {
                'name': 'margin-right',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct'
                    }
                }
            }
        ]
    });

    isNotEmpty(attributes['titleIconSpacing']) && data.push({
        'type': 'plain',
        'id': 'titleIconSpacing',
        'responsive': true,
        'selector': `.${elementId}.gutenverse-image-box .inner-container .image-box-body .body-title.icon-position-after i, .${elementId}.gutenverse-image-box .inner-container .image-box-body .body-title.icon-position-after .gutenverse-icon-svg`,
        'properties': [
            {
                'name': 'margin-left',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct'
                    }
                }
            }
        ]
    });

    isNotEmpty(attributes['titleNormalColor']) && data.push({
        'type': 'color',
        'id': 'titleNormalColor',
        'selector': `.${elementId}.gutenverse-image-box .inner-container .image-box-body .body-title, .${elementId}.gutenverse-image-box .image-box-body .body-title a`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['titleNormalIconColor']) && data.push({
        'type': 'color',
        'id': 'titleNormalIconColor',
        'selector': `.${elementId}.gutenverse-image-box .inner-container .image-box-body .body-title i`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['titleNormalIconColor']) && data.push({
        'type': 'color',
        'id': 'titleNormalIconColor',
        'selector': `.${elementId}.gutenverse-image-box .inner-container .image-box-body .body-title svg`,
        'properties': [
            {
                'name': 'fill',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['titleHoverColor']) && data.push({
        'type': 'color',
        'id': 'titleHoverColor',
        'selector': `.${elementId}.gutenverse-image-box:hover .inner-container .image-box-body .body-title, .${elementId}.gutenverse-image-box:hover .image-box-body .body-title a`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['titleHoverIconColor']) && data.push({
        'type': 'color',
        'id': 'titleHoverIconColor',
        'selector': `.${elementId}.gutenverse-image-box:hover .inner-container .image-box-body .body-title i`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['titleHoverIconColor']) && data.push({
        'type': 'color',
        'id': 'titleHoverIconColor',
        'selector': `.${elementId}.gutenverse-image-box:hover .inner-container .image-box-body .body-title svg`,
        'properties': [
            {
                'name': 'fill',
                'valueType': 'direct'
            }
        ]
    });

    return data;
};

export default panelTitleStyle;