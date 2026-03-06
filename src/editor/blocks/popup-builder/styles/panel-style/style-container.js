import { isNotEmpty } from 'gutenverse-core/helper';

const panelContainerStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['containerPadding']) && data.push({
        'type': 'dimension',
        'id': 'containerPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.guten-popup-builder .guten-popup .guten-popup-content`,
    });
    isNotEmpty(attributes['containerPadding']) && data.push({
        'type': 'plain',
        'id': 'containerPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'min-height',
                'valueType': 'function',
                'functionName': 'handleContainerPaddingPopup'
            }
        ],
        'selector': `.${elementId}.guten-popup-builder .guten-popup-left .guten-popup-container, .${elementId}.guten-popup-builder .guten-popup-right .guten-popup-container`,
    });

    isNotEmpty(attributes['backgroundColor']) && data.push({
        'type': 'background',
        'id': 'backgroundColor',
        'selector': `.${elementId}.guten-popup-builder .guten-popup .guten-popup-content`,
    });

    isNotEmpty(attributes['containerBorder']) && data.push({
        'type': 'border',
        'id': 'containerBorder',
        'selector': `.${elementId}.guten-popup-builder .guten-popup .guten-popup-content`,
    });

    isNotEmpty(attributes['containerBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'containerBorderResponsive',
        'selector': `.${elementId}.guten-popup-builder .guten-popup .guten-popup-content`,
    });

    isNotEmpty(attributes['containerBoxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'containerBoxShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.guten-popup-builder .guten-popup .guten-popup-content`,
    });
    isNotEmpty(attributes['videoContainerBorder']) && data.push({
        'type': 'border',
        'id': 'videoContainerBorder',
        'selector': `.${elementId}.guten-popup-builder .guten-popup .guten-popup-content .guten-popup-video-container`,
    });
    isNotEmpty(attributes['videoContainerBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'videoContainerBorderResponsive',
        'selector': `.${elementId}.guten-popup-builder .guten-popup .guten-popup-content .guten-popup-video-container`,
    });
    return data;
};

export default panelContainerStyle;