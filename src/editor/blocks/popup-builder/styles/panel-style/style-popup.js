import { isNotEmpty } from 'gutenverse-core/helper';

const panelPopupStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['width']) && data.push({
        'type': 'unitPoint',
        'id': 'width',
        'responsive' : true,
        'properties': [
            {
                'name': 'width',
                'valueType': 'direct',
            }
        ],
        'selector': `.guten-popup-builder.${elementId} .guten-popup .guten-popup-content`,
    });

    isNotEmpty(attributes['maxHeight']) && attributes['position'] === 'center' && data.push({
        'type': 'unitPoint',
        'id': 'maxHeight',
        'responsive' : true,
        'properties': [
            {
                'name': 'max-height',
                'valueType': 'direct',
            }
        ],
        'selector': `.${elementId} .guten-popup-center .guten-popup-content`,
    });

    isNotEmpty(attributes['popupVideoWidth']) && data.push({
        'type': 'unitPoint',
        'id': 'popupVideoWidth',
        'responsive' : true,
        'properties': [
            {
                'name': 'width',
                'valueType': 'direct',
            },
        ],
        'selector': `.${elementId}.guten-popup-builder .guten-popup .guten-popup-content .guten-popup-video-container .guten-video`,
    });

    isNotEmpty(attributes['popupVideoHeight']) && data.push({
        'type': 'unitPoint',
        'id': 'popupVideoHeight',
        'responsive' : true,
        'properties': [
            {
                'name': 'height',
                'valueType': 'direct',
            },
        ],
        'selector': `.${elementId}.guten-popup-builder .guten-popup .guten-popup-content .guten-popup-video-container .guten-video`,
    });

    isNotEmpty(attributes['popupVideoContainerFixedHeight']) && data.push({
        'type': 'unitPoint',
        'id': 'popupVideoContainerFixedHeight',
        'responsive' : true,
        'properties': [
            {
                'name': 'height',
                'valueType': 'direct',
            },
        ],
        'selector': `.${elementId}.guten-popup-builder .guten-popup .guten-popup-content .guten-popup-video-container`,
    });

    isNotEmpty(attributes['videoContainerContentHorizontalAlign']) && data.push({
        'type': 'plain',
        'id': 'videoContainerContentHorizontalAlign',
        'responsive' : true,
        'properties': [
            {
                'name': 'justify-content',
                'valueType': 'pattern',
                'pattern': '{value}',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    },
                }
            },
        ],
        'selector': `.${elementId}.guten-popup-builder .guten-popup .guten-popup-content .guten-popup-video-container`,
    });

    isNotEmpty(attributes['videoContainerContentVerticalAlign']) && data.push({
        'type': 'plain',
        'id': 'videoContainerContentVerticalAlign',
        'responsive' : true,
        'properties': [
            {
                'name': 'align-items',
                'valueType': 'pattern',
                'pattern': '{value}',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    },
                }
            },
        ],
        'selector': `.${elementId}.guten-popup-builder .guten-popup .guten-popup-content .guten-popup-video-container`,
    });

    return data;
};

export default panelPopupStyle;