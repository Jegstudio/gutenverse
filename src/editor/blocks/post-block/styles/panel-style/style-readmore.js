import { isNotEmpty } from 'gutenverse-core/helper';

const readmoreStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['readmoreTypography']) && data.push({
        'type': 'typography',
        'id': 'readmoreTypography',
        'selector': `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-readmore`,
    });

    isNotEmpty(attributes['readmoreMargin']) && data.push({
        'type': 'dimension',
        'id': 'readmoreMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore`,
    });

    isNotEmpty(attributes['readmorePadding']) && data.push({
        'type': 'dimension',
        'id': 'readmorePadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-readmore`,
    });

    isNotEmpty(attributes['readmoreSpacing']) && data.push({
        'type': 'plain',
        'id': 'readmoreSpacing',
        'responsive' : true,
        'selector': `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore.icon-position-before .guten-readmore i, .${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore.icon-position-before .guten-readmore .gutenverse-icon-svg`,
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

    isNotEmpty(attributes['readmoreSpacing']) && data.push({
        'type': 'plain',
        'id': 'readmoreSpacing',
        'responsive' : true,
        'selector': `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore.icon-position-after .guten-readmore i, .${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore.icon-position-after .guten-readmore .gutenverse-icon-svg`,
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

    isNotEmpty(attributes['readmoreIconSize']) && data.push({
        'type': 'unitPoint',
        'id': 'readmoreIconSize',
        'responsive' : true,
        'selector': `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore .guten-readmore i`,
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['readmoreIconSize']) && data.push({
        'type': 'unitPoint',
        'id': 'readmoreIconSize',
        'responsive' : true,
        'selector': `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore .guten-readmore svg`,
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['readmoreWidth']) && data.push({
        'type': 'unitPoint',
        'id': 'readmoreWidth',
        'responsive' : true,
        'selector': `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore .guten-readmore`,
        'properties': [
            {
                'name': 'width',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['readmoreAlign']) && data.push({
        'type': 'plain',
        'id': 'readmoreAlign',
        'responsive' : true,
        'selector': `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore .guten-readmore`,
        'properties': [
            {
                'name': 'justify-content',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['readmoreColor']) && data.push({
        'type': 'color',
        'id': 'readmoreColor',
        'selector': `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore a`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['readmoreColor']) && data.push({
        'type': 'color',
        'id': 'readmoreColor',
        'selector': `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore svg`,
        'properties': [
            {
                'name': 'fill',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['readmoreHoverColor']) && data.push({
        'type': 'color',
        'id': 'readmoreHoverColor',
        'selector': `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore:hover a`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['readmoreHoverColor']) && data.push({
        'type': 'color',
        'id': 'readmoreHoverColor',
        'selector': `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore:hover svg`,
        'properties': [
            {
                'name': 'fill',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['readmoreBackground']) && data.push({
        'type': 'background',
        'id': 'readmoreBackground',
        'selector': `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore a`,
    });

    isNotEmpty(attributes['readmoreHoverBackground']) && data.push({
        'type': 'background',
        'id': 'readmoreHoverBackground',
        'selector': `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore:hover a`,
    });

    isNotEmpty(attributes['readmoreBorder']) && data.push({
        'type': 'border',
        'id': 'readmoreBorder',
        'selector': `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore a`,
    });

    isNotEmpty(attributes['readmoreBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'readmoreBorderResponsive',
        'selector': `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore a`,
    });

    isNotEmpty(attributes['readmoreHoverBorder']) && data.push({
        'type': 'border',
        'id': 'readmoreHoverBorder',
        'selector': `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore:hover a`,
    });

    isNotEmpty(attributes['readmoreHoverBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'readmoreHoverBorderResponsive',
        'selector': `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore:hover a`,
    });

    isNotEmpty(attributes['readmoreShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'readmoreShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore a`,
    });

    isNotEmpty(attributes['readmoreHoverShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'readmoreHoverShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore:hover a`,
    });
    return data;
};

export default readmoreStyle;