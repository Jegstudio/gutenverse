import { isNotEmpty } from 'gutenverse-core/helper';
import { applyFilters } from '@wordpress/hooks';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { backgroundStyle } from 'gutenverse-core/controls';

const getBlockStyle = (elementId, attributes) => {
    let data = [];
    data = backgroundStyle({ attributes, data, elementId });
    const device = getDeviceType();
    //panel general
    isNotEmpty(attributes['iconPositionResponsive']) && device !== 'Desktop' && attributes['iconPositionResponsive'][device] === 'left' && data.push(
        {
            'type': 'plain',
            'id': 'iconPositionResponsive',
            'selector': `.guten-icon-box.${elementId} .guten-icon-box-wrapper`,
            'responsive': true,
            'properties': [
                {
                    'name': 'display',
                    'valueType': 'pattern',
                    'pattern': 'flex !important; align-items: flex-start; flex-direction: unset !important;',
                }
            ],
        },
    );

    isNotEmpty(attributes['iconPositionResponsive']) && device !== 'Desktop' && attributes['iconPositionResponsive'][device] === 'right' && data.push(
        {
            'type': 'plain',
            'id': 'iconPositionResponsive',
            'selector': `.guten-icon-box.${elementId} .guten-icon-box-wrapper`,
            'responsive': true,
            'properties': [
                {
                    'name': 'display',
                    'valueType': 'pattern',
                    'pattern': 'flex !important; flex-direction: row-reverse; align-items: unset !important;',
                }
            ],
        }
    );

    isNotEmpty(attributes['iconPositionResponsive']) && device !== 'Desktop' && attributes['iconPositionResponsive'][device] === 'top' && data.push({
        'type': 'plain',
        'id': 'iconPositionResponsive',
        'selector': `.guten-icon-box.${elementId} .guten-icon-box-wrapper`,
        'responsive': true,
        'properties': [
            {
                'name': 'display',
                'valueType': 'pattern',
                'pattern': 'block !important; flex-direction: unset !important; align-items: unset !important;',
            }
        ],
    });

    isNotEmpty(attributes['iconPositionResponsive']) && device !== 'Desktop' && attributes['iconPositionResponsive'][device] === 'bottom' && data.push({
        'type': 'plain',
        'id': 'iconPositionResponsive',
        'selector': `.guten-icon-box.${elementId} .guten-icon-box-wrapper`,
        'responsive': true,
        'properties': [
            {
                'name': 'display',
                'valueType': 'pattern',
                'pattern': 'flex !important; flex-direction: column-reverse !important; align-items: unset !important;',
            }
        ],
    });

    isNotEmpty(attributes['iconPositionResponsive']) && device !== 'Desktop' && attributes['iconPositionResponsive'][device] === 'left' && data.push({
        'type': 'plain',
        'id': 'iconPositionResponsive',
        'selector': `.guten-icon-box.${elementId} .guten-icon-box-wrapper .icon-box.icon-box-header`,
        'responsive': true,
        'properties': [
            {
                'name': 'margin-right',
                'valueType': 'pattern',
                'pattern': '15px; margin-left: unset !important;',
            }
        ],
    });

    isNotEmpty(attributes['iconPositionResponsive']) && device !== 'Desktop' && attributes['iconPositionResponsive'][device] === 'right' && data.push({
        'type': 'plain',
        'id': 'iconPositionResponsive',
        'selector': `.guten-icon-box.${elementId} .guten-icon-box-wrapper .icon-box.icon-box-header`,
        'responsive': true,
        'properties': [
            {
                'name': 'margin-left',
                'valueType': 'pattern',
                'pattern': '15px; margin-right: unset !important;',
            }
        ],
    });

    isNotEmpty(attributes['iconPositionResponsive']) && device !== 'Desktop' && attributes['iconPositionResponsive'][device] === 'top' && attributes['iconPositionResponsive'][device] === 'bottom' && data.push({
        'type': 'plain',
        'id': 'iconPositionResponsive',
        'selector': `.guten-icon-box.${elementId} .guten-icon-box-wrapper .icon-box.icon-box-header`,
        'responsive': true,
        'properties': [
            {
                'name': 'margin-left',
                'valueType': 'pattern',
                'pattern': 'unset !important; margin-right: unset !important;',
            }
        ],
    });

    isNotEmpty(attributes['align']) && data.push({
        'type': 'plain',
        'id': 'align',
        'selector': `.guten-icon-box.${elementId} .guten-icon-box-wrapper`,
        'properties': [
            {
                'name': 'justify-content',
                'valueType': 'direct',
            },
            {
                'name': 'text-align',
                'valueType': 'function',
                'functionName': 'handleAlign',
            }
        ],
        'responsive': true,
    });

    isNotEmpty(attributes['heightControl']) && attributes['heightControl'] === 'fit' && data.push({
        'type': 'plain',
        'id': 'heightControl',
        'selector': `.guten-icon-box.${elementId}`,
        'properties': [
            {
                'name': 'height',
                'valueType': 'pattern',
                'pattern': '100%',
            }
        ],
    });

    isNotEmpty(attributes['heightControl']) && attributes['heightControl'] === 'fit' && data.push({
        'type': 'plain',
        'id': 'heightControl',
        'selector': `.guten-icon-box.${elementId} .guten-icon-box-wrapper`,
        'properties': [
            {
                'name': 'height',
                'valueType': 'pattern',
                'pattern': '100%',
            }
        ],
    });

    isNotEmpty(attributes['heightControl']) && attributes['heightControl'] === 'min' && data.push({
        'type': 'unitPoint',
        'id': 'height',
        'responsive': true,
        'selector': `.guten-icon-box.${elementId} .guten-icon-box-wrapper`,
        'properties': [
            {
                'name': 'min-height',
                'valueType': 'direct'
            }
        ],
    });

    //panel icon

    isNotEmpty(attributes['iconType']) && attributes['iconType'] === 'icon' && data.push({
        'type': 'plain',
        'id': 'iconType',
        'selector': `.${elementId}.guten-icon-box .guten-icon-box-wrapper .icon-box-header.icon-box .icon i`,
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                        'key': 'iconSize',
                    },

                }
            }
        ],
        'multiAttr': { 'iconSize': attributes['iconSize'][device] }
    });

    isNotEmpty(attributes['iconType']) && attributes['iconType'] === 'svg' && data.push({
        'type': 'plain',
        'id': 'iconType',
        'selector': `.${elementId}.guten-icon-box .guten-icon-box-wrapper .icon-box-header.icon-box .icon svg`,
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                        'key': 'iconSize',
                    },

                }
            }
        ],
        'multiAttr': { 'iconSize': attributes['iconSize'][device] }
    });

    isNotEmpty(attributes['iconType']) && attributes['iconType'] === 'image' && data.push(
        {
            'type': 'plain',
            'id': 'iconType',
            'selector': `.${elementId}.guten-icon-box .guten-icon-box-wrapper .icon-box .icon `,
            'properties': [
                {
                    'name': 'width',
                    'valueType': 'pattern',
                    'pattern': '{value}px',
                    'patternValues': {
                        'value': {
                            'type': 'direct',
                            'key': 'imageWidth',
                        },

                    }
                }
            ],
            'multiAttr': { 'imageWidth': attributes['imageWidth'] }
        },
        {
            'type': 'plain',
            'id': 'iconType',
            'selector': `.${elementId}.guten-icon-box .guten-icon-box-wrapper .icon-box .icon `,
            'properties': [
                {
                    'name': 'height',
                    'valueType': 'pattern',
                    'pattern': '{value}px',
                    'patternValues': {
                        'value': {
                            'type': 'direct',
                            'key': 'imageHeight',
                        },

                    }
                }
            ],
            'multiAttr': { 'imageHeight': attributes['imageHeight'] }
        }
    );

    isNotEmpty(attributes['iconSize']) && isNotEmpty(attributes['iconType']) && attributes['iconType'] === 'icon' && data.push({
        'type': 'plain',
        'id': 'iconSize',
        'responsive': true,
        'selector': `.${elementId}.guten-icon-box .guten-icon-box-wrapper .icon-box-header.icon-box .icon i`,
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    },

                }
            }
        ],
    });

    isNotEmpty(attributes['iconSize']) && isNotEmpty(attributes['iconType']) && attributes['iconType'] === 'svg' && data.push({
        'type': 'plain',
        'id': 'iconSize',
        'responsive': true,
        'selector': `.${elementId}.guten-icon-box .guten-icon-box-wrapper .icon-box-header.icon-box .icon svg`,
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    },

                }
            }
        ],
    });

    isNotEmpty(attributes['imageFit']) && isNotEmpty(attributes['iconType']) && attributes['iconType'] === 'image' && data.push({
        'type': 'plain',
        'id': 'imageFit',
        'selector': `.${elementId}.guten-icon-box .guten-icon-box-wrapper .icon-box .icon img`,
        'properties': [
            {
                'name': 'object-fit',
                'valueType': 'direct',
            }
        ],
    });

    isNotEmpty(attributes['imageWidthResponsive']) && isNotEmpty(attributes['iconType']) && attributes['iconType'] === 'image' && data.push({
        'type': 'plain',
        'id': 'imageWidthResponsive',
        'responsive': true,
        'selector': `.${elementId}.guten-icon-box .guten-icon-box-wrapper .icon-box-header.icon-box .icon`,
        'properties': [
            {
                'name': 'width',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    },

                }
            }
        ],
    });

    isNotEmpty(attributes['imageHeightResponsive']) && isNotEmpty(attributes['iconType']) && attributes['iconType'] === 'image' && data.push({
        'type': 'plain',
        'id': 'imageHeightResponsive',
        'responsive': true,
        'selector': `.${elementId}.guten-icon-box .guten-icon-box-wrapper .icon-box-header.icon-box .icon`,
        'properties': [
            {
                'name': 'height',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    },

                }
            }
        ],
    });

    isNotEmpty(attributes['imageWidth']) && isNotEmpty(attributes['iconType']) && device === 'Desktop' && attributes['iconType'] === 'image' && data.push({
        'type': 'plain',
        'id': 'imageWidth',
        'selector': `.${elementId}.guten-icon-box .guten-icon-box-wrapper .icon-box-header.icon-box .icon`,
        'properties': [
            {
                'name': 'width',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    },

                }
            }
        ],
    });

    isNotEmpty(attributes['imageHeight']) && isNotEmpty(attributes['iconType']) && device === 'Desktop' && attributes['iconType'] === 'image' && data.push({
        'type': 'plain',
        'id': 'imageHeight',
        'selector': `.${elementId}.guten-icon-box .guten-icon-box-wrapper .icon-box-header.icon-box .icon`,
        'properties': [
            {
                'name': 'height',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    },

                }
            }
        ],
    });

    //panel icon box
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
        'selector': `.guten-icon-box.${elementId} .guten-icon-box-wrapper`,
    });

    isNotEmpty(attributes['containerPaddingHover']) && data.push({
        'type': 'dimension',
        'id': 'containerPaddingHover',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.guten-icon-box.${elementId}:hover .guten-icon-box-wrapper`,
    });

    isNotEmpty(attributes['containerBackground']) && data.push({
        'type': 'background',
        'id': 'containerBackground',
        'selector': `.guten-icon-box.${elementId} .guten-icon-box-wrapper`,
    });

    isNotEmpty(attributes['containerBackgroundHover']) && data.push({
        'type': 'background',
        'id': 'containerBackgroundHover',
        'selector': `.${elementId}:hover .guten-icon-box-wrapper`,
    });

    isNotEmpty(attributes['containerBorder']) && data.push({
        'type': 'border',
        'id': 'containerBorder',
        'selector': `.guten-icon-box.${elementId} .guten-icon-box-wrapper`,
    });

    isNotEmpty(attributes['containerBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'containerBorderResponsive',
        'selector': `.guten-icon-box.${elementId} .guten-icon-box-wrapper`,
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
        'selector': `.guten-icon-box.${elementId} .guten-icon-box-wrapper`,
    });

    isNotEmpty(attributes['containerBorderHover']) && data.push({
        'type': 'border',
        'id': 'containerBorderHover',
        'selector': `.${elementId}:hover .guten-icon-box-wrapper`,
    });

    isNotEmpty(attributes['containerBorderHoverResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'containerBorderHoverResponsive',
        'selector': `.${elementId}:hover .guten-icon-box-wrapper`,
    });

    isNotEmpty(attributes['containerBoxShadowHover']) && data.push({
        'type': 'boxShadow',
        'id': 'containerBoxShadowHover',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.guten-icon-box.${elementId}:hover .guten-icon-box-wrapper`,
    });

    //panel icon style
    isNotEmpty(attributes['iconColor']) && data.push({
        'type': 'color',
        'id': 'iconColor',
        'selector': `.guten-icon-box.${elementId} .icon-box.icon-box-header .icon i`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['iconColor']) && data.push({
        'type': 'color',
        'id': 'iconColor',
        'selector': `.guten-icon-box.${elementId} .icon-box.icon-box-header .icon svg`,
        'properties': [
            {
                'name': 'fill',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['iconHoverColor']) && data.push({
        'type': 'color',
        'id': 'iconHoverColor',
        'selector': `.guten-icon-box.${elementId}:hover .icon-box.icon-box-header .icon i`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['iconHoverColor']) && data.push({
        'type': 'color',
        'id': 'iconHoverColor',
        'selector': `.guten-icon-box.${elementId}:hover .icon-box.icon-box-header .icon svg`,
        'properties': [
            {
                'name': 'fill',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['iconBgColor']) && data.push({
        'type': 'color',
        'id': 'iconBgColor',
        'selector': `.guten-icon-box.${elementId} .icon-box.icon-box-header .icon`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['iconHoverBgColor']) && data.push({
        'type': 'color',
        'id': 'iconHoverBgColor',
        'selector': `.guten-icon-box.${elementId}:hover .icon-box.icon-box-header .icon`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['iconGradient']) && data.push({
        'type': 'plain',
        'id': 'iconGradient',
        'properties': [
            {
                'name': 'background-image',
                'valueType': 'function',
                'functionName': 'customHandleBackground'
            }
        ],
        'selector': `.guten-icon-box.${elementId} .icon-box.icon-box-header .icon .icon-style-gradient`,
    });

    isNotEmpty(attributes['iconGradient']) && data.push({
        'type': 'plain',
        'id': 'iconGradient',
        'properties': [
            {
                'name': 'fill',
                'valueType': 'pattern',
                'pattern': `url(#iconGradient-${elementId})`
            }
        ],
        'selector': `.guten-icon-box.${elementId} .icon-box.icon-box-header .icon .gutenverse-icon-svg svg`,
    });

    isNotEmpty(attributes['iconGradientHover']) && data.push({
        'type': 'plain',
        'id': 'iconGradientHover',
        'properties': [
            {
                'name': 'fill',
                'valueType': 'pattern',
                'pattern': `url(#iconGradientHover-${elementId})`
            }
        ],
        'selector': `.guten-icon-box.${elementId}:hover .icon-box.icon-box-header .icon .gutenverse-icon-svg svg`,
    });

    isNotEmpty(attributes['iconGradientHover']) && data.push({
        'type': 'plain',
        'id': 'iconGradientHover',
        'properties': [
            {
                'name': 'background-image',
                'valueType': 'function',
                'functionName': 'customHandleBackground'
            }
        ],
        'selector': `.guten-icon-box.${elementId}:hover .icon-box.icon-box-header .icon .icon-style-gradient`,
    });

    //
    isNotEmpty(attributes['iconBgGradient']) && data.push({
        'type': 'plain',
        'id': 'iconBgGradient',
        'properties': [
            {
                'name': 'background-image',
                'valueType': 'function',
                'functionName': 'customHandleBackground'
            }
        ],
        'selector': `.guten-icon-box.${elementId} .icon-box.icon-box-header .icon.bg-style-gradient`,
    });

    isNotEmpty(attributes['iconBgGradientHover']) && data.push({
        'type': 'plain',
        'id': 'iconBgGradientHover',
        'properties': [
            {
                'name': 'background-image',
                'valueType': 'function',
                'functionName': 'customHandleBackground'
            }
        ],
        'selector': `.guten-icon-box.${elementId}:hover .icon-box.icon-box-header .icon.bg-style-gradient`,
    });

    isNotEmpty(attributes['iconBorder']) && data.push({
        'type': 'border',
        'id': 'iconBorder',
        'selector': `.guten-icon-box.${elementId} .icon-box.icon-box-header .icon `,
    });

    isNotEmpty(attributes['iconBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'iconBorderResponsive',
        'selector': `.guten-icon-box.${elementId} .icon-box.icon-box-header .icon`,
    });

    isNotEmpty(attributes['iconBoxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'iconBoxShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.guten-icon-box.${elementId} .icon-box.icon-box-header .icon`,
    });

    isNotEmpty(attributes['iconBorderHover']) && data.push({
        'type': 'border',
        'id': 'iconBorderHover',
        'selector': `.guten-icon-box.${elementId}:hover .icon-box.icon-box-header .icon`,
    });

    isNotEmpty(attributes['iconBorderHoverResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'iconBorderHoverResponsive',
        'selector': `.guten-icon-box.${elementId}:hover .icon-box.icon-box-header .icon`,
    });

    isNotEmpty(attributes['iconBoxShadowHover']) && data.push({
        'type': 'boxShadow',
        'id': 'iconBoxShadowHover',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.guten-icon-box.${elementId}:hover .icon-box.icon-box-header .icon`,
    });

    isNotEmpty(attributes['iconPadding']) && data.push({
        'type': 'dimension',
        'id': 'iconPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.guten-icon-box.${elementId} .icon-box.icon-box-header .icon`,
    });

    isNotEmpty(attributes['iconMargin']) && data.push({
        'type': 'dimension',
        'id': 'iconMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.guten-icon-box.${elementId} .icon-box.icon-box-header .icon`,
    });

    isNotEmpty(attributes['iconRotate']) && data.push({
        'type': 'plain',
        'id': 'iconRotate',
        'responsive': true,
        'selector': `.guten-icon-box.${elementId} .icon-box.icon-box-header .icon`,
        'properties': [
            {
                'name': 'transform',
                'valueType': 'pattern',
                'pattern': 'rotate({value}deg)',
                'patternValues': {
                    'value': {
                        'type': 'direct'
                    }
                }
            }
        ]
    });

    //panel content style
    isNotEmpty(attributes['titlePadding']) && data.push({
        'type': 'dimension',
        'id': 'titlePadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.guten-icon-box.${elementId} .icon-box.icon-box-body .title`,
    });

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
        'selector': `.guten-icon-box.${elementId} .icon-box.icon-box-body .title`,
    });

    isNotEmpty(attributes['titleColor']) && data.push({
        'type': 'color',
        'id': 'titleColor',
        'selector': `.guten-icon-box.${elementId} .icon-box.icon-box-body .title`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['titleHoverColor']) && data.push({
        'type': 'color',
        'id': 'titleHoverColor',
        'selector': `.guten-icon-box.${elementId}:hover .icon-box.icon-box-body .title`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['titleTypography']) && data.push({
        'type': 'typography',
        'id': 'titleTypography',
        'selector': `.guten-icon-box.${elementId} .icon-box.icon-box-body .title`,
    });

    isNotEmpty(attributes['descMargin']) && data.push({
        'type': 'dimension',
        'id': 'descMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.guten-icon-box.${elementId} .icon-box.icon-box-body .icon-box-description`,
    });

    isNotEmpty(attributes['descColor']) && data.push({
        'type': 'color',
        'id': 'descColor',
        'selector': `.guten-icon-box.${elementId} .icon-box.icon-box-body .icon-box-description`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['descHoverColor']) && data.push({
        'type': 'color',
        'id': 'descHoverColor',
        'selector': `.guten-icon-box.${elementId}:hover .icon-box.icon-box-body .icon-box-description`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['descTypography']) && data.push({
        'type': 'typography',
        'id': 'descTypography',
        'selector': `.guten-icon-box.${elementId} .icon-box.icon-box-body .icon-box-description`,
    });

    isNotEmpty(attributes['watermarkColor']) && data.push({
        'type': 'color',
        'id': 'watermarkColor',
        'selector': `.guten-icon-box.${elementId} .hover-watermark i`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['watermarkColor']) && data.push({
        'type': 'color',
        'id': 'watermarkColor',
        'selector': `.guten-icon-box.${elementId} .hover-watermark svg`,
        'properties': [
            {
                'name': 'fill',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['watermarkSize']) && data.push({
        'type': 'plain',
        'id': 'watermarkSize',
        'responsive': true,
        'selector': `.guten-icon-box.${elementId} .hover-watermark i`,
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    },

                }
            }
        ],
    });

    isNotEmpty(attributes['watermarkSize']) && data.push({
        'type': 'plain',
        'id': 'watermarkSize',
        'responsive': true,
        'selector': `.guten-icon-box.${elementId} .hover-watermark svg`,
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    },

                }
            }
        ],
    });

    //panel badge style

    isNotEmpty(attributes['badgeTextColor']) && data.push({
        'type': 'color',
        'id': 'badgeTextColor',
        'selector': `.guten-icon-box.${elementId} .icon-box-badge .badge-text`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['badgePadding']) && data.push({
        'type': 'dimension',
        'id': 'badgePadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.guten-icon-box.${elementId} .icon-box-badge .badge-text`,
    });

    isNotEmpty(attributes['badgeMargin']) && data.push({
        'type': 'dimension',
        'id': 'badgeMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.guten-icon-box.${elementId} .icon-box-badge .badge-text`,
    });

    isNotEmpty(attributes['badgeRadius']) && data.push({
        'type': 'dimension',
        'id': 'badgeRadius',
        'responsive': true,
        'properties': [
            {
                'name': 'border-radius',
                'valueType': 'direct',
                'multiDimension': false
            }
        ],
        'selector': `.guten-icon-box.${elementId} .icon-box-badge .badge-text`,
    });

    isNotEmpty(attributes['badgeBackground']) && data.push({
        'type': 'background',
        'id': 'badgeBackground',
        'selector': `.guten-icon-box.${elementId} .icon-box-badge .badge-text`,
    });

    isNotEmpty(attributes['badgeTypography']) && data.push({
        'type': 'typography',
        'id': 'badgeTypography',
        'selector': `.guten-icon-box.${elementId} .icon-box-badge .badge-text`,
    });

    isNotEmpty(attributes['badgeShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'badgeShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.guten-icon-box.${elementId} .icon-box-badge .badge-text`,
    });

    //panel overlay
    isNotEmpty(attributes['iconBoxOverlay']) && data.push({
        'type': 'background',
        'id': 'iconBoxOverlay',
        'selector': `.${elementId}.guten-icon-box .guten-icon-box-wrapper::before`,
    });

    isNotEmpty(attributes['iconBoxHoverOverlay']) && data.push({
        'type': 'background',
        'id': 'iconBoxHoverOverlay',
        'selector': `.${elementId}.guten-icon-box .guten-icon-box-wrapper::before`,
    });

    isNotEmpty(attributes['iconBoxHoverOverlay']) && undefined !== attributes['iconBoxHoverOverlay'] && data.push(
        {
            'type': 'plain',
            'id': 'iconBoxHoverOverlay',
            'properties': [
                {
                    'name': 'overflow',
                    'valueType': 'pattern',
                    'pattern': 'hidden',
                }
            ],
            'selector': `.${elementId}.guten-icon-box .guten-icon-box-wrapper`,
        }
    );

    isNotEmpty(attributes['iconBoxOverlay']) && undefined !== attributes['iconBoxOverlay'] && data.push(
        {
            'type': 'plain',
            'id': 'iconBoxOverlay',
            'properties': [
                {
                    'name': 'overflow',
                    'valueType': 'pattern',
                    'pattern': 'hidden',
                }
            ],
            'selector': `.${elementId}.guten-icon-box .guten-icon-box-wrapper`,
        }
    );

    (isNotEmpty(attributes['watermarkShow']) && attributes['watermarkShow']) && data.push(
        {
            'type': 'plain',
            'id': 'watermarkShow',
            'properties': [
                {
                    'name': 'overflow',
                    'valueType': 'pattern',
                    'pattern': 'hidden',
                }
            ],
            'selector': `.${elementId}.guten-icon-box .guten-icon-box-wrapper`,
        }
    );

    /**Panel List */

    isNotEmpty(attributes['border']) && data.push({
        'type': 'border',
        'id': 'border',
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}.guten-element`,
    });

    isNotEmpty(attributes['borderHover']) && data.push({
        'type': 'border',
        'id': 'borderHover',
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}.guten-element:hover`,
    });

    isNotEmpty(attributes['borderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderResponsive',
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}.guten-element`,
    });

    isNotEmpty(attributes['borderResponsiveHover']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderResponsiveHover',
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}.guten-element:hover`,
    });

    isNotEmpty(attributes['boxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'boxShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}.guten-element`,
    });

    isNotEmpty(attributes['boxShadowHover']) && data.push({
        'type': 'boxShadow',
        'id': 'boxShadowHover',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}.guten-element:hover`,
    });

    isNotEmpty(attributes['mask']) && data.push({
        'type': 'mask',
        'id': 'mask',
        'responsive': true,
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}.guten-element`,
    });

    isNotEmpty(attributes['padding']) && data.push({
        'type': 'dimension',
        'id': 'padding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}.guten-element`,
    });

    isNotEmpty(attributes['margin']) && data.push({
        'type': 'dimension',
        'id': 'margin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}.guten-element`,
    });

    isNotEmpty(attributes['zIndex']) && data.push({
        'type': 'plain',
        'id': 'zIndex',
        'responsive': true,
        'properties': [
            {
                'name': 'z-index',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}.guten-element`,
    });

    isNotEmpty(attributes['animation']) && isNotEmpty(attributes['animation']['delay']) && data.push({
        'type': 'plain',
        'id': 'animation',
        'properties': [
            {
                'name': 'animation-delay',
                'valueType': 'pattern',
                'pattern': '{value}ms',
                'patternValues': {
                    'value': {
                        'type': 'attribute',
                        'key': 'delay',
                    },

                }
            }
        ],
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}.guten-element`,
    });

    //Positioning Panel
    isNotEmpty(attributes['positioningType']) && data.push(
        {
            'type': 'positioning',
            'id': 'positioningType',
            'selector': `.${elementId}.guten-element`,
            'skipDeviceType': 'first',
            'attributeType': 'type',
            'multiAttr': {
                'positioningType': attributes['positioningType'],
                'inBlock': attributes['inBlock']
            }
        },
    );
    isNotEmpty(attributes['positioningType']) && isNotEmpty(attributes['positioningWidth']) && data.push(
        {
            'type': 'positioning',
            'id': 'positioningType',
            'selector': `.${elementId}.guten-element`,
            'skipDeviceType': 'second',
            'attributeType': 'type',
            'multiAttr': {
                'positioningWidth': attributes['positioningWidth'],
                'positioningType': attributes['positioningType'],
                'inBlock': attributes['inBlock']
            }
        }
    );
    isNotEmpty(attributes['positioningWidth']) && isNotEmpty(attributes['positioningType']) && data.push({
        'type': 'positioning',
        'id': 'positioningWidth',
        'selector': `.${elementId}.guten-element`,
        'skipDeviceType': 'first',
        'attributeType': 'width',
        'multiAttr': {
            'positioningWidth': attributes['positioningWidth'],
            'positioningType': attributes['positioningType'],
            'inBlock': attributes['inBlock']
        }
    });
    isNotEmpty(attributes['positioningAlign']) && data.push(
        {
            'type': 'plain',
            'id': 'positioningAlign',
            'responsive': true,
            'properties': [
                {
                    'name': 'align-self',
                    'valueType': 'direct'
                }
            ],
            'selector': `.${elementId}.guten-element`,
        },
        {
            'type': 'positioning',
            'id': 'positioningAlign',
            'properties': [
                {
                    'name': 'vertical-align',
                    'valueType': 'direct'
                }
            ],
            'attributeType': 'align',
            'selector': `.${elementId}.guten-element`,
        }
    );
    isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
        'type': 'plain',
        'id': 'positioningLocation',
        'properties': [
            {
                'name': 'position',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.guten-element`,
    });
    isNotEmpty(attributes['positioningLeft']) && isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
        'type': 'positioning',
        'id': 'positioningLeft',
        'properties': [
            {
                'name': 'left',
                'valueType': 'direct'
            }
        ],
        'responsive': true,
        'selector': `.${elementId}.guten-element`,
        'attributeType': 'custom',
    });
    isNotEmpty(attributes['positioningRight']) && isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
        'type': 'positioning',
        'id': 'positioningRight',
        'properties': [
            {
                'name': 'right',
                'valueType': 'direct'
            }
        ],
        'responsive': true,
        'selector': `.${elementId}.guten-element`,
        'attributeType': 'custom',
    });
    isNotEmpty(attributes['positioningTop']) && isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
        'type': 'positioning',
        'id': 'positioningTop',
        'properties': [
            {
                'name': 'top',
                'valueType': 'direct'
            }
        ],
        'responsive': true,
        'selector': `.${elementId}.guten-element`,
        'attributeType': 'custom',
    });
    isNotEmpty(attributes['positioningBottom']) && isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
        'type': 'positioning',
        'id': 'positioningBottom',
        'properties': [
            {
                'name': 'bottom',
                'valueType': 'direct'
            }
        ],
        'responsive': true,
        'selector': `.${elementId}.guten-element`,
        'attributeType': 'custom',
    });


    /** Position Flex Item */
    const selector = `.${elementId}.guten-element`;

    // Flex Align Self
    isNotEmpty(attributes['flexAlignSelf']) && data.push({
        'type': 'plain',
        'id': 'flexAlignSelf',
        'responsive': true,
        'selector': selector,
        'properties': [
            {
                'name': 'align-self',
                'valueType': 'direct'
            }
        ],
    });

    // Flex Order - responsive handling
    const flexOrder = attributes['flexOrder'];
    const flexCustomOrder = attributes['flexCustomOrder'];
    if (isNotEmpty(flexOrder)) {
        data.push({
            'type': 'plain',
            'id': 'flexOrder',
            'responsive': true,
            'selector': selector,
            'properties': [
                {
                    'name': 'order',
                    'valueType': 'function',
                    'valueFunc': (value) => {
                        if (value === 'start') {
                            return '-9999';
                        }
                        if (value === 'end') {
                            return '9999';
                        }
                        return undefined; // Skip 'custom', let flexCustomOrder handle it
                    }
                }
            ],
        });
        if (isNotEmpty(flexCustomOrder)) {
            data.push({
                'type': 'plain',
                'id': 'flexCustomOrder',
                'responsive': true,
                'selector': selector,
                'properties': [
                    {
                        'name': 'order',
                        'valueType': 'function',
                        'valueFunc': (value, deviceType) => {
                            // Only apply custom order if flexOrder is 'custom' for this device
                            if (flexOrder[deviceType] === 'custom') {
                                return value;
                            }
                            return undefined;
                        }
                    }
                ],
            });
        }
    }

    // Flex Size (grow/shrink) - responsive handling
    const flexSize = attributes['flexSize'];
    const flexSizeGrow = attributes['flexSizeGrow'];
    const flexSizeShrink = attributes['flexSizeShrink'];
    if (isNotEmpty(flexSize)) {
        // Handle grow preset
        data.push({
            'type': 'plain',
            'id': 'flexSize',
            'responsive': true,
            'selector': selector,
            'properties': [
                {
                    'name': 'flex-grow',
                    'valueType': 'function',
                    'valueFunc': (value) => value === 'grow' ? '1' : undefined
                }
            ],
        });
        // Handle shrink preset
        data.push({
            'type': 'plain',
            'id': 'flexSize',
            'responsive': true,
            'selector': selector,
            'properties': [
                {
                    'name': 'flex-shrink',
                    'valueType': 'function',
                    'valueFunc': (value) => value === 'shrink' ? '1' : undefined
                }
            ],
        });
        // Handle custom grow
        if (isNotEmpty(flexSizeGrow)) {
            data.push({
                'type': 'plain',
                'id': 'flexSizeGrow',
                'responsive': true,
                'selector': selector,
                'properties': [
                    {
                        'name': 'flex-grow',
                        'valueType': 'direct'
                    }
                ],
            });
        }
        // Handle custom shrink
        if (isNotEmpty(flexSizeShrink)) {
            data.push({
                'type': 'plain',
                'id': 'flexSizeShrink',
                'responsive': true,
                'selector': selector,
                'properties': [
                    {
                        'name': 'flex-shrink',
                        'valueType': 'direct'
                    }
                ],
            });
        }
    }

    /** End Position Flex Item */
    return [
        ...data,
        ...applyFilters(
            'gutenverse.icon-box.blockStyle',
            [],
            {
                elementId,
                attributes
            }
        )
    ];
};


export default getBlockStyle;