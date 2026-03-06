import { isNotEmpty } from 'gutenverse-core/helper';

const panelCloseStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['closeButtonSize']) && data.push({
        'type': 'plain',
        'id': 'closeButtonSize',
        'responsive' : true,
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'pattern',
                'pattern' : '{value}px',
                'patternValues' : {
                    'value' : {
                        'type' : 'direct'
                    }
                }
            }
        ],
        'selector': `.${elementId}.guten-popup-builder .guten-popup-close i`,
    });

    isNotEmpty(attributes['closeButtonSize']) && data.push({
        'type': 'plain',
        'id': 'closeButtonSize',
        'responsive' : true,
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'pattern',
                'pattern' : '{value}px',
                'patternValues' : {
                    'value' : {
                        'type' : 'direct'
                    }
                }
            }
        ],
        'selector': `.${elementId}.guten-popup-builder .guten-popup-close svg`,
    });

    isNotEmpty(attributes['closePositioningLeft']) && data.push({
        'type': 'unitPoint',
        'id': 'closePositioningLeft',
        'responsive' : true,
        'properties': [
            {
                'name': 'left',
                'valueType': 'direct',
            }
        ],
        'selector': `.${elementId}.guten-popup-builder .guten-popup-close`,
    });

    isNotEmpty(attributes['closePositioningBottom']) && data.push({
        'type': 'unitPoint',
        'id': 'closePositioningBottom',
        'responsive' : true,
        'properties': [
            {
                'name': 'bottom',
                'valueType': 'direct',
            }
        ],
        'selector': `.${elementId}.guten-popup-builder .guten-popup-close`,
    });

    isNotEmpty(attributes['closePositioningRight']) && data.push({
        'type': 'unitPoint',
        'id': 'closePositioningRight',
        'responsive' : true,
        'properties': [
            {
                'name': 'right',
                'valueType': 'direct',
            }
        ],
        'selector': `.${elementId}.guten-popup-builder .guten-popup-close`,
    });

    isNotEmpty(attributes['closePositioningTop']) && data.push({
        'type': 'unitPoint',
        'id': 'closePositioningTop',
        'responsive' : true,
        'properties': [
            {
                'name': 'top',
                'valueType': 'direct',
            }
        ],
        'selector': `.${elementId}.guten-popup-builder .guten-popup-close`,
    });

    isNotEmpty(attributes['closePadding']) && data.push({
        'type': 'dimension',
        'id': 'closePadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.guten-popup-builder .guten-popup .guten-popup-close`,
    });

    isNotEmpty(attributes['closeButtonColor']) && data.push({
        'type': 'color',
        'id': 'closeButtonColor',
        'responsive': true,
        'selector': `.${elementId}.guten-popup-builder .guten-popup .guten-popup-close i`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['closeButtonColor']) && data.push({
        'type': 'color',
        'id': 'closeButtonColor',
        'responsive': true,
        'selector': `.${elementId}.guten-popup-builder .guten-popup .guten-popup-close svg`,
        'properties': [
            {
                'name': 'fill',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['closeButtonBgColor']) && data.push({
        'type': 'background',
        'id': 'closeButtonBgColor',
        'selector': `.${elementId}.guten-popup-builder .guten-popup-close`,
    });

    isNotEmpty(attributes['closeBorder']) && data.push({
        'type': 'border',
        'id': 'closeBorder',
        'selector': `.${elementId}.guten-popup-builder .guten-popup .guten-popup-close`,
    });

    isNotEmpty(attributes['closeBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'closeBorderResponsive',
        'selector': `.${elementId}.guten-popup-builder .guten-popup .guten-popup-close`,
    });

    isNotEmpty(attributes['closeBoxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'closeBoxShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.guten-popup-builder .guten-popup .guten-popup-close`,
    });

    isNotEmpty(attributes['closeButtonColorHover']) && data.push({
        'type': 'color',
        'id': 'closeButtonColorHover',
        'responsive': true,
        'selector': `.${elementId}.guten-popup-builder .guten-popup .guten-popup-close:hover i`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['closeButtonColorHover']) && data.push({
        'type': 'color',
        'id': 'closeButtonColorHover',
        'responsive': true,
        'selector': `.${elementId}.guten-popup-builder .guten-popup .guten-popup-close:hover svg`,
        'properties': [
            {
                'name': 'fill',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['closeButtonBgColorHover']) && data.push({
        'type': 'background',
        'id': 'closeButtonBgColorHover',
        'selector': `.${elementId}.guten-popup-builder .guten-popup-close:hover`,
    });

    isNotEmpty(attributes['closeBorderHover']) && data.push({
        'type': 'border',
        'id': 'closeBorderHover',
        'selector': `.${elementId}.guten-popup-builder .guten-popup .guten-popup-close:hover`,
    });

    isNotEmpty(attributes['closeBorderHoverResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'closeBorderHoverResponsive',
        'selector': `.${elementId}.guten-popup-builder .guten-popup .guten-popup-close:hover`,
    });

    isNotEmpty(attributes['closeBoxShadowHover']) && data.push({
        'type': 'boxShadow',
        'id': 'closeBoxShadowHover',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.guten-popup-builder .guten-popup .guten-popup-close:hover`,
    });
    return data;
};

export default panelCloseStyle;