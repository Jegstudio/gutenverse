import { isNotEmpty } from 'gutenverse-core/helper';

const panelCategoryStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['categoryVerticalAlign']) && attributes['postblockType'] === 'type-5' && data.push({
        'type': 'plain',
        'id': 'categoryVerticalAlign',
        'responsive': true,
        'selector': `.${elementId} .guten-postblock .guten-block-container .guten-postblock-content`,
        'properties': [
            {
                'name': 'height',
                'valueType': 'function',
                'functionName': 'postBlockContentAlign',
            }
        ],
    });

    // isNotEmpty(attributes['categoryVerticalAlign']) && attributes['postblockType'] === 'type-5' && attributes['categoryVerticalAlign'] !== 'end' && data.push({
    //     'type': 'plain',
    //     'responsive': true,
    //     'id': 'categoryVerticalAlign',
    //     'selector': `.${elementId} .guten-postblock .guten-block-container .guten-postblock-content`,
    //     'properties': [
    //         {
    //             'name': 'align-self',
    //             'valueType': 'direct',
    //         }
    //     ],
    // });

    isNotEmpty(attributes['categoryColor']) && data.push({
        'type': 'color',
        'id': 'categoryColor',
        'selector': `.${elementId} .guten-postblock .guten-post-category a`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['categoryTypography']) && data.push({
        'type': 'typography',
        'id': 'categoryTypography',
        'selector': `.${elementId} .guten-postblock .guten-post-category a`,
    });

    isNotEmpty(attributes['categoryBackground']) && data.push({
        'type': 'color',
        'id': 'categoryBackground',
        'selector': `.${elementId} .guten-postblock .guten-post-category`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['categoryMargin']) && data.push({
        'type': 'dimension',
        'id': 'categoryMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .guten-postblock .guten-post-category`,
    });

    isNotEmpty(attributes['categoryPadding']) && data.push({
        'type': 'dimension',
        'id': 'categoryPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .guten-postblock .guten-post-category`,
    });

    isNotEmpty(attributes['categoryBorder']) && data.push({
        'type': 'border',
        'id': 'categoryBorder',
        'selector': `.${elementId} .guten-postblock .guten-post-category`,
    });

    isNotEmpty(attributes['categoryBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'categoryBorderResponsive',
        'selector': `.${elementId} .guten-postblock .guten-post-category`,
    });

    isNotEmpty(attributes['categoryShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'categoryShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .guten-postblock .guten-post-category`,
    });

    return data;
};

export default panelCategoryStyle;