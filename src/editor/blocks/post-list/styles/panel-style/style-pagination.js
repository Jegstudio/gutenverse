import { isNotEmpty } from 'gutenverse-core/helper';

const paginationStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['paginationTypography']) && data.push({
        'type': 'typography',
        'id': 'paginationTypography',
        'selector': `.${elementId} .guten-postlist .guten-block-pagination .guten-block-loadmore span, .${elementId} .guten-postlist .guten_block_nav .btn-pagination`,
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
        'selector': `.${elementId} .guten-postlist .guten-block-pagination .guten-block-loadmore, .${elementId} .guten-postlist .guten_block_nav .btn-pagination`,
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
        'selector': `.${elementId} .guten-postlist .guten-block-pagination .guten-block-loadmore, .${elementId} .guten-postlist .guten_block_nav .btn-pagination`,
    });

    isNotEmpty(attributes['paginationWidth']) && data.push({
        'type': 'plain',
        'id': 'paginationWidth',
        'responsive': true,
        'selector': `.${elementId} .guten-postlist .guten-block-pagination .guten-block-loadmore, .${elementId} .guten-postlist .guten_block_nav .btn-pagination`,
        'properties': [
            {
                'name': 'width',
                'valueType': 'pattern',
                'pattern' : '{value}%',
                'patternValues' : {
                    'value' : {
                        'type' : 'direct'
                    }
                }
            }
        ],
    });

    isNotEmpty(attributes['paginationIconSpacing']) && data.push({
        'type': 'plain',
        'id': 'paginationIconSpacing',
        'responsive': true,
        'selector': `.${elementId} .guten-postlist .guten-block-pagination .guten-block-loadmore.icon-position-before i, .${elementId} .guten-postlist .guten_block_nav .btn-pagination.prev i, .${elementId} .guten-postlist .guten-block-pagination .guten-block-loadmore.icon-position-before svg, .${elementId} .guten-postlist .guten_block_nav .btn-pagination.prev svg`,
        'properties': [
            {
                'name': 'margin-right',
                'valueType': 'pattern',
                'pattern' : '{value}px',
                'patternValues' : {
                    'value' : {
                        'type' : 'direct'
                    }
                }
            }
        ],
    });

    isNotEmpty(attributes['paginationIconSpacing']) && data.push({
        'type': 'plain',
        'id': 'paginationIconSpacing',
        'responsive': true,
        'selector': `.${elementId} .guten-postlist .guten-block-pagination .guten-block-loadmore.icon-position-after i, .${elementId} .guten-postlist .guten_block_nav .btn-pagination.next i, .${elementId} .guten-postlist .guten-block-pagination .guten-block-loadmore.icon-position-after svg, .${elementId} .guten-postlist .guten_block_nav .btn-pagination.next svg`,
        'properties': [
            {
                'name': 'margin-left',
                'valueType': 'pattern',
                'pattern' : '{value}px',
                'patternValues' : {
                    'value' : {
                        'type' : 'direct'
                    }
                }
            }
        ],
    });

    isNotEmpty(attributes['paginationIconSize']) && data.push({
        'type': 'unitPoint',
        'id': 'paginationIconSize',
        'responsive': true,
        'selector': `.${elementId} .guten-postlist .guten-block-pagination .guten-block-loadmore.icon-position-before i, .${elementId} .guten-postlist .guten_block_nav .btn-pagination.prev i`,
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'direct',
            }
        ],
    });

    isNotEmpty(attributes['paginationIconSize']) && data.push({
        'type': 'unitPoint',
        'id': 'paginationIconSize',
        'responsive': true,
        'selector': `.${elementId} .guten-postlist .guten-block-pagination .guten-block-loadmore.icon-position-before svg, .${elementId} .guten-postlist .guten_block_nav .btn-pagination.prev svg`,
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'direct',
            }
        ],
    });

    isNotEmpty(attributes['paginationIconSize']) && data.push({
        'type': 'unitPoint',
        'id': 'paginationIconSize',
        'responsive': true,
        'selector': `.${elementId} .guten-postlist .guten-block-pagination .guten-block-loadmore.icon-position-after i, .${elementId} .guten-postlist .guten_block_nav .btn-pagination.next i`,
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'direct',
            }
        ],
    });

    isNotEmpty(attributes['paginationIconSize']) && data.push({
        'type': 'unitPoint',
        'id': 'paginationIconSize',
        'responsive': true,
        'selector': `.${elementId} .guten-postlist .guten-block-pagination .guten-block-loadmore.icon-position-after svg, .${elementId} .guten-postlist .guten_block_nav .btn-pagination.next svg`,
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'direct',
            }
        ],
    });

    isNotEmpty(attributes['paginationAlign']) && data.push({
        'type': 'plain',
        'id': 'paginationAlign',
        'responsive': true,
        'selector': `.${elementId} .guten-postlist .guten-block-pagination,  .${elementId} .guten-postlist .guten_block_nav`,
        'properties': [
            {
                'name': 'justify-content',
                'valueType': 'function',
                'functionName' : 'handleAlignReverse'
            }
        ],
    });

    isNotEmpty(attributes['paginationColor']) && data.push({
        'type': 'color',
        'id': 'paginationColor',
        'selector': `.${elementId} .guten-postlist .guten-block-pagination .guten-block-loadmore, .${elementId} .guten-postlist .guten_block_nav .btn-pagination`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct',
            }
        ],
    });

    isNotEmpty(attributes['paginationColor']) && data.push({
        'type': 'color',
        'id': 'paginationColor',
        'selector': `.${elementId} .guten-postlist .guten-block-pagination .guten-block-loadmore svg, .${elementId} .guten-postlist .guten_block_nav .btn-pagination svg`,
        'properties': [
            {
                'name': 'fill',
                'valueType': 'direct',
            }
        ],
    });

    isNotEmpty(attributes['paginationCurrentColor']) && data.push({
        'type': 'color',
        'id': 'paginationCurrentColor',
        'selector': `.${elementId} .guten-postlist .guten_block_nav .btn-pagination.current`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct',
            }
        ],
    });

    isNotEmpty(attributes['paginationCurrentColor']) && data.push({
        'type': 'color',
        'id': 'paginationCurrentColor',
        'selector': `.${elementId} .guten-postlist .guten_block_nav .btn-pagination.current svg`,
        'properties': [
            {
                'name': 'fill',
                'valueType': 'direct',
            }
        ],
    });

    isNotEmpty(attributes['paginationDisabledColor']) && data.push({
        'type': 'color',
        'id': 'paginationDisabledColor',
        'selector': `.${elementId} .guten-postlist .guten_block_nav .btn-pagination.disabled`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct',
            }
        ],
    });

    isNotEmpty(attributes['paginationDisabledColor']) && data.push({
        'type': 'color',
        'id': 'paginationDisabledColor',
        'selector': `.${elementId} .guten-postlist .guten_block_nav .btn-pagination.disabled svg`,
        'properties': [
            {
                'name': 'fill',
                'valueType': 'direct',
            }
        ],
    });

    isNotEmpty(attributes['paginationHoverColor']) && data.push({
        'type': 'color',
        'id': 'paginationHoverColor',
        'selector': `.${elementId} .guten-postlist .guten-block-pagination .guten-block-loadmore:hover, .${elementId} .guten-postlist .guten_block_nav .btn-pagination:not(.disabled):not(.current):hover`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct',
            }
        ],
    });

    isNotEmpty(attributes['paginationHoverColor']) && data.push({
        'type': 'color',
        'id': 'paginationHoverColor',
        'selector': `.${elementId} .guten-postlist .guten-block-pagination .guten-block-loadmore:hover svg, .${elementId} .guten-postlist .guten_block_nav .btn-pagination:not(.disabled):not(.current):hover svg`,
        'properties': [
            {
                'name': 'fill',
                'valueType': 'direct',
            }
        ],
    });

    isNotEmpty(attributes['paginationBackground']) && data.push({
        'type': 'background',
        'id': 'paginationBackground',
        'selector': `.${elementId} .guten-postlist .guten-block-pagination .guten-block-loadmore, .${elementId} .guten-postlist .guten_block_nav .btn-pagination`,
    });

    isNotEmpty(attributes['paginationCurrentBackground']) && data.push({
        'type': 'background',
        'id': 'paginationCurrentBackground',
        'selector': `.${elementId} .guten-postlist .guten_block_nav .btn-pagination.current`,
    });

    isNotEmpty(attributes['paginationDisabledBackground']) && data.push({
        'type': 'background',
        'id': 'paginationDisabledBackground',
        'selector': `.${elementId} .guten-postlist .guten_block_nav .btn-pagination.disabled`,
    });

    isNotEmpty(attributes['paginationHoverBackground']) && data.push({
        'type': 'background',
        'id': 'paginationHoverBackground',
        'selector': `.${elementId} .guten-postlist .guten-block-pagination .guten-block-loadmore:hover, .${elementId} .guten-postlist .guten_block_nav .btn-pagination:not(.disabled):not(.current):hover`,
    });

    isNotEmpty(attributes['paginationBorder']) && data.push({
        'type': 'border',
        'id': 'paginationBorder',
        'selector': `.${elementId} .guten-postlist .guten-block-pagination .guten-block-loadmore, .${elementId} .guten-postlist .guten_block_nav .btn-pagination`,
    });

    isNotEmpty(attributes['paginationBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'paginationBorderResponsive',
        'selector': `.${elementId} .guten-postlist .guten-block-pagination .guten-block-loadmore, .${elementId} .guten-postlist .guten_block_nav .btn-pagination`,
    });

    isNotEmpty(attributes['paginationHoverBorder']) && data.push({
        'type': 'border',
        'id': 'paginationHoverBorder',
        'selector': `.${elementId} .guten-postlist .guten-block-pagination .guten-block-loadmore:hover, .${elementId} .guten-postlist .guten_block_nav .btn-pagination:hover`,
    });

    isNotEmpty(attributes['paginationHoverBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'paginationHoverBorderResponsive',
        'selector': `.${elementId} .guten-postlist .guten-block-pagination .guten-block-loadmore:hover, .${elementId} .guten-postlist .guten_block_nav .btn-pagination:hover`,
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
        'selector': `.${elementId} .guten-postlist .guten-block-pagination .guten-block-loadmore, .${elementId} .guten-postlist .guten_block_nav .btn-pagination`,
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
        'selector': `.${elementId} .guten-postlist .guten-block-pagination .guten-block-loadmore:hover, .${elementId} .guten-postlist .guten_block_nav .btn-pagination:hover`,
    });
    return data;
};

export default paginationStyle;