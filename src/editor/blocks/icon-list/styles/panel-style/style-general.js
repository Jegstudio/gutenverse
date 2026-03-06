import { isNotEmpty } from 'gutenverse-core/helper';

const panelGeneralStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['isDivider']) && data.push({
        'type': 'plain',
        'id': 'isDivider',
        'properties': [
            {
                'name': 'border-top-style',
                'valueType': 'pattern',
                'pattern': 'solid'
            }
        ],
        'selector': `.${elementId} > .list-wrapper:not(.inline-icon-list) > .guten-icon-list-item:not(:nth-child(1)) .list-divider`,
    });

    isNotEmpty(attributes['isDivider']) && data.push({
        'type': 'plain',
        'id': 'isDivider',
        'properties': [
            {
                'name': 'border-left-style',
                'valueType': 'pattern',
                'pattern': 'solid'
            }
        ],
        'selector': `.${elementId} > .list-wrapper.inline-icon-list > .guten-icon-list-item:not(:nth-child(1)) .list-divider`,
    });

    isNotEmpty(attributes['displayInline']) && data.push({
        'type': 'plain',
        'id': 'displayInline',
        'selector': `.${elementId} > .list-wrapper.inline-icon-list > .guten-icon-list-item`,
        'properties': [
            {
                'name': 'width',
                'valueType': 'pattern',
                'pattern': 'fit-content'
            },
        ],
    });

    isNotEmpty(attributes['colorDivider']) && data.push({
        'type': 'color',
        'id': 'colorDivider',
        'responsive': true,
        'selector': `.${elementId} > .list-wrapper:not(.inline-icon-list) > .guten-icon-list-item:not(:nth-child(1)) .list-divider`,
        'properties': [
            {
                'name': 'border-color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['spaceDivider']) && !attributes['displayInline'] && data.push({
        'type': 'plain',
        'id': 'spaceDivider',
        'responsive' : true,
        'selector': `.${elementId} > .list-wrapper:not(.inline-icon-list) > .guten-icon-list-item .list-divider`,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'pattern',
                'pattern': '0 {value}px',
                'patternValues' : {
                    'value' : {
                        'type' : 'direct'
                    }
                }
            }
        ]
    });

    isNotEmpty(attributes['colorDivider']) && data.push({
        'type': 'color',
        'id': 'colorDivider',
        'selector': `.${elementId} > .list-wrapper.inline-icon-list > .guten-icon-list-item:not(:nth-child(1)) .list-divider`,
        'responsive': true,
        'properties': [
            {
                'name': 'border-color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['typeDivider']) && isNotEmpty(attributes['isDivider']) && data.push({
        'type': 'plain',
        'id': 'typeDivider',
        'selector': `.${elementId} > .list-wrapper:not(.inline-icon-list) > .guten-icon-list-item:not(:nth-child(1)) .list-divider`,
        'properties': [
            {
                'name': 'border-top-style',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['typeDivider']) && data.push({
        'type': 'plain',
        'id': 'typeDivider',
        'selector': `.${elementId} > .list-wrapper.inline-icon-list > .guten-icon-list-item:not(:nth-child(1)) .list-divider`,
        'properties': [
            {
                'name': 'border-left-style',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['widthDivider']) && data.push({
        'type': 'unitPoint',
        'id': 'widthDivider',
        'responsive': true,
        'selector': `.${elementId}.guten-icon-list > .list-wrapper:not(.inline-icon-list) > .guten-icon-list-item .list-divider`,
        'properties': [
            {
                'name': 'width',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['widthDivider']) && data.push({
        'type': 'unitPoint',
        'id': 'widthDivider',
        'responsive': true,
        'selector': `.${elementId}.guten-icon-list > .list-wrapper.inline-icon-list > .guten-icon-list-item .list-divider`,
        'properties': [
            {
                'name': 'height',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['sizeDivider']) && data.push({
        'type': 'unitPoint',
        'id': 'sizeDivider',
        'responsive': true,
        'selector': `.${elementId} > .list-wrapper:not(.inline-icon-list) > .guten-icon-list-item:not(:nth-child(1)) .list-divider`,
        'properties': [
            {
                'name': 'border-top-width',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['sizeDivider']) && data.push({
        'type': 'unitPoint',
        'id': 'sizeDivider',
        'responsive': true,
        'selector': `.${elementId} > .list-wrapper.inline-icon-list > .guten-icon-list-item:not(:nth-child(1)) .list-divider`,
        'properties': [
            {
                'name': 'border-left-width',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['spaceBetween']) && data.push({
        'type': 'plain',
        'id': 'spaceBetween',
        'responsive': true,
        'properties': [
            {
                'name': 'margin-top',
                'valueType': 'pattern',
                'pattern': 'calc({value}px/2)',
                'patternValues': {
                    'value': {
                        'type': 'direct'
                    }
                }
            }
        ],
        'selector': `.${elementId} > .list-wrapper:not(.inline-icon-list) > li.guten-icon-list-item:not(:first-of-type) > a, .block-editor-block-list__layout .wp-block.${elementId} > .list-wrapper:not(.inline-icon-list) > li.guten-icon-list-item:not(:first-of-type) > a`,
    });

    isNotEmpty(attributes['spaceBetween']) && data.push({
        'type': 'plain',
        'id': 'spaceBetween',
        'responsive': true,
        'properties': [
            {
                'name': 'padding-bottom',
                'valueType': 'pattern',
                'pattern': 'calc({value}px/2)',
                'patternValues': {
                    'value': {
                        'type': 'direct'
                    }
                }
            }
        ],
        'selector': `.${elementId} > .list-wrapper:not(.inline-icon-list) > .guten-icon-list-item:not(:last-child), .block-editor-block-list__layout .wp-block.${elementId} .list-wrapper:not(.inline-icon-list) > .guten-icon-list-item:not(:last-child)`,
    });

    isNotEmpty(attributes['spaceBetween']) && data.push({
        'type': 'plain',
        'id': 'spaceBetween',
        'responsive': true,
        'properties': [
            {
                'name': 'margin-right',
                'valueType': 'pattern',
                'pattern': 'calc({value}px/2)',
                'patternValues': {
                    'value': {
                        'type': 'direct'
                    }
                }
            }
        ],
        'selector': `.${elementId} > .list-wrapper.inline-icon-list .guten-icon-list-item:not(:last-child), .block-editor-block-list__layout .wp-block.${elementId} > .list-wrapper.inline-icon-list > .guten-icon-list-item:not(:last-child)`,
    });
    isNotEmpty(attributes['spaceBetween']) && data.push({
        'type': 'plain',
        'id': 'spaceBetween',
        'responsive': true,
        'properties': [
            {
                'name': 'margin-left',
                'valueType': 'pattern',
                'pattern': 'calc({value}px/2)',
                'patternValues': {
                    'value': {
                        'type': 'direct'
                    }
                }
            }
        ],
        'selector': `.${elementId} > .list-wrapper.inline-icon-list > li.guten-icon-list-item:not(li:first-of-type) > a, .block-editor-block-list__layout .wp-block.${elementId} > .list-wrapper.inline-icon-list > li.guten-icon-list-item:not(li:first-of-type) > a`,
    });

    if (isNotEmpty(attributes['alignList'])) {

        data.push({
            'type': 'plain',
            'id': 'alignList',
            'responsive': true,
            'properties': [
                {
                    'name': 'align-items',
                    'valueType': 'direct',
                },
            ],
            'selector': `.${elementId} > .list-wrapper:not(.inline-icon-list)`,
        });

        data.push({
            'type': 'plain',
            'id': 'alignList',
            'responsive': true,
            'properties': [
                {
                    'name': 'justify-content',
                    'valueType': 'direct',
                },
                {
                    'name': 'text-align',
                    'valueType': 'direct',
                }
            ],
            'selector': `.${elementId} > .list-wrapper.inline-icon-list, .${elementId} > .list-wrapper:not(.inline-icon-list) > .guten-icon-list-item > a`,
        });

        data.push({
            'type': 'plain',
            'id': 'alignList',
            'responsive': true,
            'properties': [
                {
                    'name': 'justify-self',
                    'valueType': 'direct',
                },
            ],
            'selector': `.${elementId} > .list-wrapper.inline-icon-list, .${elementId} > .list-wrapper:not(.inline-icon-list) > .guten-icon-list-item > .list-divider`,
        });
    }

    isNotEmpty(attributes['verticalAlign']) && data.push({
        'type': 'plain',
        'id': 'verticalAlign',
        'properties': [
            {
                'name': 'align-items',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .list-wrapper .guten-icon-list-item a`,
    });


    isNotEmpty(attributes['adjustVerticalAlign']) && attributes['verticalAlign'] === 'flex-start' && data.push({
        'type': 'plain',
        'id': 'adjustVerticalAlign',
        'responsive': true,
        'properties': [
            {
                'name': 'margin-top',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct'
                    }
                }
            }
        ],
        'selector': `.${elementId} .guten-icon-list-item i:before`,
    });

    return data;
};

export default panelGeneralStyle;