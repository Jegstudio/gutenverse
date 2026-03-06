import { isNotEmpty } from 'gutenverse-core/helper';

const panelLinkStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['linkAlignment']) && data.push({
        'type': 'plain',
        'id': 'linkAlignment',
        'selector': `.${elementId}.guten-portfolio-gallery .portfolio-gallery-container .row-item .row-link-wrapper`,
        'properties': [
            {
                'name': 'justify-content',
                'valueType': 'direct'
            }
        ],
    });
    isNotEmpty(attributes['linkPadding']) && data.push({
        'type': 'dimension',
        'id': 'linkPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.guten-portfolio-gallery .portfolio-gallery-container .row-item .row-link-wrapper a`,
    });
    isNotEmpty(attributes['linkMargin']) && data.push({
        'type': 'dimension',
        'id': 'linkMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.guten-portfolio-gallery .portfolio-gallery-container .row-item .row-link-wrapper a`,
    });
    isNotEmpty(attributes['linkBorder']) && data.push({
        'type': 'borderResponsive',
        'id': 'linkBorder',
        'selector': `.${elementId}.guten-portfolio-gallery .portfolio-gallery-container .row-item .row-link-wrapper a`,
    });

    isNotEmpty(attributes['linkTypography']) && data.push({
        'type': 'typography',
        'id': 'linkTypography',
        'selector': `.${elementId}.guten-portfolio-gallery .portfolio-gallery-container .row-item .row-link-wrapper a`,
    });

    isNotEmpty(attributes['linkIconSpace']) && data.push({
        'type': 'unitPoint',
        'id': 'linkIconSpace',
        'responsive' : true,
        'properties': [
            {
                'name': 'gap',
                'valueType': 'direct',
            }
        ],
        'selector': `.${elementId}.guten-portfolio-gallery .portfolio-gallery-container .row-item .row-link-wrapper a`,
    });

    isNotEmpty(attributes['linkIconSize']) && data.push({
        'type': 'unitPoint',
        'id': 'linkIconSize',
        'responsive' : true,
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'direct',
            }
        ],
        'selector': `.${elementId}.guten-portfolio-gallery .portfolio-gallery-container .row-item .row-link-wrapper a i`,
    });

    isNotEmpty(attributes['linkIconSize']) && data.push({
        'type': 'unitPoint',
        'id': 'linkIconSize',
        'responsive' : true,
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'direct',
            }
        ],
        'selector': `.${elementId}.guten-portfolio-gallery .portfolio-gallery-container .row-item .row-link-wrapper a svg`,
    });

    isNotEmpty(attributes['linkBackground']) && data.push({
        'type': 'background',
        'id': 'linkBackground',
        'selector': `.${elementId}.guten-portfolio-gallery .portfolio-gallery-container .row-item .row-link-wrapper a`,
    });

    isNotEmpty(attributes['linkColor']) && data.push({
        'type': 'color',
        'id': 'linkColor',
        'selector': `.${elementId}.guten-portfolio-gallery .portfolio-gallery-container .row-item .row-link-wrapper a`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['linkIconColor']) && data.push({
        'type': 'color',
        'id': 'linkIconColor',
        'selector': `.${elementId}.guten-portfolio-gallery .portfolio-gallery-container .row-item .row-link-wrapper a i`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['linkIconColor']) && data.push({
        'type': 'color',
        'id': 'linkIconColor',
        'selector': `.${elementId}.guten-portfolio-gallery .portfolio-gallery-container .row-item .row-link-wrapper a svg`,
        'properties': [
            {
                'name': 'fill',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['linkTextShadow']) && data.push({
        'type': 'textShadow',
        'id': 'linkTextShadow',
        'properties': [
            {
                'name': 'text-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.guten-portfolio-gallery .portfolio-gallery-container .row-item .row-link-wrapper a`,
    });

    isNotEmpty(attributes['linkBackgroundHover']) && data.push({
        'type': 'background',
        'id': 'linkBackgroundHover',
        'selector': `.${elementId}.guten-portfolio-gallery .portfolio-gallery-container .row-item .row-link-wrapper a:hover`,
    });

    isNotEmpty(attributes['linkColorHover']) && data.push({
        'type': 'color',
        'id': 'linkColorHover',
        'selector': `.${elementId}.guten-portfolio-gallery .portfolio-gallery-container .row-item .row-link-wrapper a:hover`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['linkIconColorHover']) && data.push({
        'type': 'color',
        'id': 'linkIconColorHover',
        'selector': `.${elementId}.guten-portfolio-gallery .portfolio-gallery-container .row-item .row-link-wrapper a:hover i`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['linkIconColorHover']) && data.push({
        'type': 'color',
        'id': 'linkIconColorHover',
        'selector': `.${elementId}.guten-portfolio-gallery .portfolio-gallery-container .row-item .row-link-wrapper a:hover svg`,
        'properties': [
            {
                'name': 'fill',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['linkTextShadowHover']) && data.push({
        'type': 'textShadow',
        'id': 'linkTextShadowHover',
        'properties': [
            {
                'name': 'text-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.guten-portfolio-gallery .portfolio-gallery-container .row-item .row-link-wrapper a:hover`,
    });
    return data;
};

export default panelLinkStyle;