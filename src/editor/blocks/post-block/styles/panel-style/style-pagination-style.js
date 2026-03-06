import { isNotEmpty } from 'gutenverse-core/helper';

const panelPaginationStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['paginationTypography']) && data.push({
        'type': 'typography',
        'id': 'paginationTypography',
        'selector': `.${elementId} .guten-postblock .guten-block-pagination .guten-block-loadmore span, .${elementId} .guten-postblock .guten_block_nav .btn-pagination`,
    });

    isNotEmpty(attributes['paginationMargin']) && data.push({
        'type': 'dimension',
        'id': 'paginationMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .guten-postblock .guten-block-pagination .guten-block-loadmore, .${elementId} .guten-postblock .guten_block_nav .btn-pagination, .${elementId} .guten-postblock .guten_block_nav .pagination-elipsis`,
    });

    isNotEmpty(attributes['paginationPadding']) && data.push({
        'type': 'dimension',
        'id': 'paginationPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .guten-postblock .guten-block-pagination .guten-block-loadmore, .${elementId} .guten-postblock .guten_block_nav .btn-pagination`,
    });

    isNotEmpty(attributes['numberGap']) && data.push({
        'type': 'plain',
        'id': 'numberGap',
        'responsive': true,
        'selector': `.${elementId} .guten-postblock .guten_block_nav`,
        'properties': [
            {
                'name': 'gap',
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

    isNotEmpty(attributes['paginationWidth']) && data.push({
        'type': 'unitPoint',
        'id': 'paginationWidth',
        'responsive': true,
        'selector': `.${elementId} .guten-postblock .guten-block-pagination .guten-block-loadmore, .${elementId} .guten-postblock:not(.guten-pagination-prevnext) .guten_block_nav .btn-pagination:not(.next):not(.prev)`,
        'properties': [
            {
                'name': 'width',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['paginationHeight']) && ('number' === attributes['paginationMode'] || 'normal-number' === attributes['paginationMode']) && data.push({
        'type': 'plain',
        'id': 'paginationHeight',
        'responsive': true,
        'selector': `.${elementId} .guten-postblock.guten-pagination-number .guten_block_nav .btn-pagination:not(.next):not(.prev), .${elementId} .guten-postblock.guten-pagination-normal-number .guten_block_nav .btn-pagination:not(.next):not(.prev)`,
        'properties': [
            {
                'name': 'height',
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

    isNotEmpty(attributes['paginationNavigationWidth']) && data.push({
        'type': 'unitPoint',
        'id': 'paginationNavigationWidth',
        'responsive': true,
        'selector': `.${elementId} .guten-postblock.guten-pagination-prevnext .guten_block_nav .btn-pagination.next, .${elementId} .guten-postblock.guten-pagination-prevnext .guten_block_nav .btn-pagination.prev,
                        .${elementId} .guten-postblock.guten-pagination-number .guten_block_nav .btn-pagination.next, .${elementId} .guten-postblock.guten-pagination-number .guten_block_nav .btn-pagination.prev,
                            .${elementId} .guten-postblock.guten-pagination-normal-number .guten_block_nav .btn-pagination.next, .${elementId} .guten-postblock.guten-pagination-normal-number .guten_block_nav .btn-pagination.prev`,
        'properties': [
            {
                'name': 'width',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['paginationNavigationHeight']) && data.push({
        'type': 'plain',
        'id': 'paginationNavigationHeight',
        'responsive': true,
        'selector': `.${elementId} .guten-postblock.guten-pagination-prevnext .guten_block_nav .btn-pagination.next, .${elementId} .guten-postblock.guten-pagination-prevnext .guten_block_nav .btn-pagination.prev,
                        .${elementId} .guten-postblock.guten-pagination-number .guten_block_nav .btn-pagination.next, .${elementId} .guten-postblock.guten-pagination-number .guten_block_nav .btn-pagination.prev,
                            .${elementId} .guten-postblock.guten-pagination-normal-number .guten_block_nav .btn-pagination.next, .${elementId} .guten-postblock.guten-pagination-normal-number .guten_block_nav .btn-pagination.prev`,
        'properties': [
            {
                'name': 'height',
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

    isNotEmpty(attributes['paginationIconSpacing']) && data.push({
        'type': 'plain',
        'id': 'paginationIconSpacing',
        'responsive': true,
        'selector': `.${elementId} .guten-postblock .guten-block-pagination .guten-block-loadmore.icon-position-before i, .${elementId} .guten-postblock .guten_block_nav .btn-pagination.prev i, .${elementId} .guten-postblock .guten-block-pagination .guten-block-loadmore.icon-position-before svg, .${elementId} .guten-postblock .guten_block_nav .btn-pagination.prev svg`,
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

    isNotEmpty(attributes['paginationIconSpacing']) && data.push({
        'type': 'plain',
        'id': 'paginationIconSpacing',
        'responsive': true,
        'selector': `.${elementId} .guten-postblock .guten-block-pagination .guten-block-loadmore.icon-position-after i, .${elementId} .guten-postblock .guten_block_nav .btn-pagination.next i, .${elementId} .guten-postblock .guten-block-pagination .guten-block-loadmore.icon-position-after svg, .${elementId} .guten-postblock .guten_block_nav .btn-pagination.next svg`,
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

    isNotEmpty(attributes['paginationIconSize']) && data.push({
        'type': 'unitPoint',
        'id': 'paginationIconSize',
        'responsive': true,
        'selector': `.${elementId} .guten-postblock .guten-block-pagination .guten-block-loadmore.icon-position-before i, .${elementId} .guten-postblock .guten_block_nav .btn-pagination.prev i`,
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['paginationIconSize']) && data.push({
        'type': 'unitPoint',
        'id': 'paginationIconSize',
        'responsive': true,
        'selector': `.${elementId} .guten-postblock .guten-block-pagination .guten-block-loadmore.icon-position-after i, .${elementId} .guten-postblock .guten_block_nav .btn-pagination.next i`,
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'direct',
            }
        ]
    });


    isNotEmpty(attributes['paginationIconSize']) && data.push({
        'type': 'unitPoint',
        'id': 'paginationIconSize',
        'responsive': true,
        'selector': `.${elementId} .guten-postblock .guten-block-pagination .guten-block-loadmore.icon-position-before svg, .${elementId} .guten-postblock .guten_block_nav .btn-pagination.prev svg`,
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['paginationIconSize']) && data.push({
        'type': 'unitPoint',
        'id': 'paginationIconSize',
        'responsive': true,
        'selector': `.${elementId} .guten-postblock .guten-block-pagination .guten-block-loadmore.icon-position-after svg, .${elementId} .guten-postblock .guten_block_nav .btn-pagination.next svg`,
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'direct',
            }
        ]
    });


    isNotEmpty(attributes['paginationAlign']) && data.push({
        'type': 'plain',
        'id': 'paginationAlign',
        'responsive': true,
        'selector': `.${elementId} .guten-postblock .guten-block-pagination,  .${elementId} .guten-postblock .guten_block_nav`,
        'properties': [
            {
                'name': 'text-align',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['navigationAlign']) && data.push({
        'type': 'plain',
        'id': 'navigationAlign',
        'responsive': true,
        'selector': `.${elementId} .guten-postblock.guten-pagination-prevnext .guten_block_nav,
                        .${elementId} .guten-postblock.guten-pagination-number .guten_block_nav,
                        .${elementId} .guten-postblock.guten-pagination-normal-prevnext .guten_block_nav,
                        .${elementId} .guten-postblock.guten-pagination-normal-number .guten_block_nav`,
        'properties': [
            {
                'name': 'justify-content',
                'valueType': 'direct',
            }
        ]
    });

    isNotEmpty(attributes['paginationColor']) && data.push({
        'type': 'color',
        'id': 'paginationColor',
        'selector': `.${elementId} .guten-postblock .guten-block-pagination .guten-block-loadmore, .${elementId} .guten-postblock .guten_block_nav .btn-pagination`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['paginationColor']) && data.push({
        'type': 'color',
        'id': 'paginationColor',
        'selector': `.${elementId} .guten-postblock .guten-block-pagination .guten-block-loadmore svg, .${elementId} .guten-postblock .guten_block_nav .btn-pagination svg`,
        'properties': [
            {
                'name': 'fill',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['paginationCurrentColor']) && data.push({
        'type': 'color',
        'id': 'paginationCurrentColor',
        'selector': `.${elementId} .guten-postblock .guten_block_nav .btn-pagination.current`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['paginationCurrentColor']) && data.push({
        'type': 'color',
        'id': 'paginationCurrentColor',
        'selector': `.${elementId} .guten-postblock .guten_block_nav .btn-pagination.current svg`,
        'properties': [
            {
                'name': 'fill',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['paginationDisabledColor']) && data.push({
        'type': 'color',
        'id': 'paginationDisabledColor',
        'selector': `.${elementId} .guten-postblock .guten_block_nav .btn-pagination.disabled`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['paginationDisabledColor']) && data.push({
        'type': 'color',
        'id': 'paginationDisabledColor',
        'selector': `.${elementId} .guten-postblock .guten_block_nav .btn-pagination.disabled svg`,
        'properties': [
            {
                'name': 'fill',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['paginationHoverColor']) && data.push({
        'type': 'color',
        'id': 'paginationHoverColor',
        'selector': `.${elementId} .guten-postblock .guten-block-pagination .guten-block-loadmore:hover, .${elementId} .guten-postblock .guten_block_nav .btn-pagination:not(.disabled):not(.current):hover`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['paginationHoverColor']) && data.push({
        'type': 'color',
        'id': 'paginationHoverColor',
        'selector': `.${elementId} .guten-postblock .guten-block-pagination .guten-block-loadmore:hover svg, .${elementId} .guten-postblock .guten_block_nav .btn-pagination:not(.disabled):not(.current):hover svg`,
        'properties': [
            {
                'name': 'fill',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['paginationBackground']) && data.push({
        'type': 'background',
        'id': 'paginationBackground',
        'selector': `.${elementId} .guten-postblock .guten-block-pagination .guten-block-loadmore, .${elementId} .guten-postblock .guten_block_nav .btn-pagination`,
    });

    isNotEmpty(attributes['paginationCurrentBackground']) && data.push({
        'type': 'background',
        'id': 'paginationCurrentBackground',
        'selector': `.${elementId} .guten-postblock .guten_block_nav .btn-pagination.current`,
    });

    isNotEmpty(attributes['paginationDisabledBackground']) && data.push({
        'type': 'background',
        'id': 'paginationDisabledBackground',
        'selector': `.${elementId} .guten-postblock .guten_block_nav .btn-pagination.disabled`,
    });

    isNotEmpty(attributes['paginationHoverBackground']) && data.push({
        'type': 'background',
        'id': 'paginationHoverBackground',
        'selector': `.${elementId} .guten-postblock .guten-block-pagination .guten-block-loadmore:hover, .${elementId} .guten-postblock .guten_block_nav .btn-pagination:not(.disabled):not(.current):hover`,
    });

    isNotEmpty(attributes['paginationBorder']) && data.push({
        'type': 'border',
        'id': 'paginationBorder',
        'selector': `.${elementId} .guten-postblock .guten-block-pagination .guten-block-loadmore, .${elementId} .guten-postblock .guten_block_nav .btn-pagination`,
    });

    isNotEmpty(attributes['paginationBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'paginationBorderResponsive',
        'selector': `.${elementId} .guten-postblock .guten-block-pagination .guten-block-loadmore, .${elementId} .guten-postblock .guten_block_nav .btn-pagination`,
    });

    isNotEmpty(attributes['paginationHoverBorder']) && data.push({
        'type': 'border',
        'id': 'paginationHoverBorder',
        'selector': `.${elementId} .guten-postblock .guten-block-pagination .guten-block-loadmore:hover, .${elementId} .guten-postblock .guten_block_nav .btn-pagination:hover`,
    });

    isNotEmpty(attributes['paginationHoverBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'paginationHoverBorderResponsive',
        'selector': `.${elementId} .guten-postblock .guten-block-pagination .guten-block-loadmore:hover, .${elementId} .guten-postblock .guten_block_nav .btn-pagination:hover`,
    });

    isNotEmpty(attributes['paginationActiveBorder']) && data.push({
        'type': 'border',
        'id': 'paginationActiveBorder',
        'selector': `.${elementId} .guten-postblock .guten-block-pagination .guten-block-loadmore.current, .${elementId} .guten-postblock .guten_block_nav .btn-pagination.current`,
    });

    isNotEmpty(attributes['paginationActiveBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'paginationActiveBorderResponsive',
        'selector': `.${elementId} .guten-postblock .guten-block-pagination .guten-block-loadmore.current, .${elementId} .guten-postblock .guten_block_nav .btn-pagination.current`,
    });

    isNotEmpty(attributes['paginationShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'paginationShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .guten-postblock .guten-block-pagination .guten-block-loadmore, .${elementId} .guten-postblock .guten_block_nav .btn-pagination`,
    });

    isNotEmpty(attributes['paginationHoverShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'paginationHoverShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .guten-postblock .guten-block-pagination .guten-block-loadmore:hover, .${elementId} .guten-postblock .guten_block_nav .btn-pagination:hover`,
    });

    isNotEmpty(attributes['paginationActiveShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'paginationActiveShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .guten-postblock .guten-block-pagination .guten-block-loadmore.current, .${elementId} .guten-postblock .guten_block_nav .btn-pagination.current`,
    });

    isNotEmpty(attributes['paginationDisabledBorder']) && data.push({
        'type': 'borderResponsive',
        'id': 'paginationDisabledBorder',
        'selector': `.${elementId} .guten-postblock .guten_block_nav .btn-pagination.disabled`,
    });
    isNotEmpty(attributes['paginationDisabledShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'paginationDisabledShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .guten-postblock .guten_block_nav .btn-pagination.disabled`,
    });
    return data;
};

export default panelPaginationStyle;