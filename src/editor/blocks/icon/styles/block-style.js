import { isNotEmpty } from 'gutenverse-core/helper';
import { applyFilters } from '@wordpress/hooks';
import { backgroundStyle } from 'gutenverse-core/controls';

const getBlockStyle = (elementId, attributes) => {
    let data = [];
    data = backgroundStyle({ attributes, data, elementId });

    //tooltip
    isNotEmpty(attributes['tooltip']) && attributes['tooltip']['enable'] && data.push({
        'type': 'tooltip',
        'id': 'tooltip',
        'selector': `.guten-tooltip-${elementId}.guten-tooltip`,
    });
    //panel icon
    isNotEmpty(attributes['iconAlign']) && data.push({
        'type': 'plain',
        'id': 'iconAlign',
        'responsive': true,
        'selector': `.${elementId}`,
        'properties': [
            {
                'name': 'text-align',
                'valueType': 'direct',
            },
        ],
    });

    isNotEmpty(attributes['iconSize']) && data.push({
        'type': 'unitPoint',
        'id': 'iconSize',
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} i`,
        'responsive': true
    });

    isNotEmpty(attributes['iconPadding']) && data.push({
        'type': 'plain',
        'id': 'iconPadding',
        'responsive': true,
        'selector': `.${elementId} .guten-icon-wrapper`,
        'properties': [
            {
                'name': 'padding',
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

    isNotEmpty(attributes['iconRotate']) && data.push({
        'type': 'plain',
        'id': 'iconRotate',
        'responsive': true,
        'selector': `.${elementId} .guten-icon-wrapper i`,
        'properties': [
            {
                'name': 'transform',
                'valueType': 'pattern',
                'pattern': 'rotate({value}deg)',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    },
                }
            }
        ],
    });

    isNotEmpty(attributes['iconShape']) && isNotEmpty(attributes['iconBorderWidth']) && attributes['iconView'] === 'framed' && attributes['iconShape'] === 'custom' && data.push(
        {
            'type': 'dimension',
            'id': 'iconShape',
            'properties': [
                {
                    'name': 'border-width',
                    'valueType': 'direct',
                    'multiDimension': false,
                    'minimumValue': 2,
                }
            ],
            'selector': `.${elementId} .guten-icon-wrapper`,
        }
    );

    isNotEmpty(attributes['iconShape']) && isNotEmpty(attributes['iconBorderRadius']) && attributes['iconShape'] === 'custom' && data.push(
        {
            'type': 'dimension',
            'id': 'iconShape',
            'properties': [
                {
                    'name': 'border-radius',
                    'valueType': 'direct',
                    'multiDimension': false,
                }
            ],
            'selector': `.${elementId} .guten-icon-wrapper`,
        }
    );

    isNotEmpty(attributes['iconBorderWidth']) && attributes['iconView'] === 'framed' && attributes['iconShape'] === 'custom' && data.push({
        'type': 'dimension',
        'id': 'margin',
        'properties': [
            {
                'name': 'border-width',
                'valueType': 'direct',
                'multiDimension': false,
                'minimumValue': 2,
            }
        ],
        'selector': `.${elementId} .guten-icon-wrapper`,
    });

    isNotEmpty(attributes['iconBorderRadius']) && attributes['iconShape'] === 'custom' && data.push({
        'type': 'dimension',
        'id': 'iconBorderRadius',
        'properties': [
            {
                'name': 'border-radius',
                'valueType': 'direct',
                'multiDimension': false,
            }
        ],
        'selector': `.${elementId} .guten-icon-wrapper`,
    });

    //panel color
    isNotEmpty(attributes['iconColorOne']) && data.push(
        {
            'type': 'color',
            'id': 'iconColorOne',
            'selector': `.${elementId} .guten-icon-wrapper.framed i`,
            'properties': [
                {
                    'name': 'color',
                    'valueType': 'direct'
                }
            ],
        },
        {
            'type': 'color',
            'id': 'iconColorOne',
            'selector': `.${elementId} .guten-icon-wrapper.framed`,
            'properties': [
                {
                    'name': 'border-color',
                    'valueType': 'direct'
                }
            ],
        },
        {
            'type': 'color',
            'id': 'iconColorOne',
            'selector': `.${elementId} .guten-icon-wrapper.stacked`,
            'properties': [
                {
                    'name': 'background-color',
                    'valueType': 'direct'
                }
            ],
        },
    );

    isNotEmpty(attributes['iconColorTwo']) && data.push(
        {
            'type': 'color',
            'id': 'iconColorTwo',
            'selector': `.${elementId} .guten-icon-wrapper.stacked i`,
            'properties': [
                {
                    'name': 'color',
                    'valueType': 'direct'
                }
            ],
        },
        {
            'type': 'color',
            'id': 'iconColorTwo',
            'selector': `.${elementId} .guten-icon-wrapper.framed`,
            'properties': [
                {
                    'name': 'background-color',
                    'valueType': 'direct'
                }
            ],
        },
    );

    isNotEmpty(attributes['iconColorHoverOne']) && data.push(
        {
            'type': 'color',
            'id': 'iconColorHoverOne',
            'selector': `.${elementId} .guten-icon-wrapper.framed:hover i`,
            'properties': [
                {
                    'name': 'color',
                    'valueType': 'direct'
                }
            ],
        },
        {
            'type': 'color',
            'id': 'iconColorHoverOne',
            'selector': `.${elementId} .guten-icon-wrapper.framed:hover`,
            'properties': [
                {
                    'name': 'border-color',
                    'valueType': 'direct'
                }
            ],
        },
        {
            'type': 'color',
            'id': 'iconColorHoverOne',
            'selector': `.${elementId} .guten-icon-wrapper.stacked:hover`,
            'properties': [
                {
                    'name': 'background-color',
                    'valueType': 'direct'
                }
            ],
        },
    );

    isNotEmpty(attributes['iconColorHoverTwo']) && data.push(
        {
            'type': 'color',
            'id': 'iconColorHoverTwo',
            'selector': `.${elementId} .guten-icon-wrapper.stacked:hover i`,
            'properties': [
                {
                    'name': 'color',
                    'valueType': 'direct'
                }
            ],
        },
        {
            'type': 'color',
            'id': 'iconColorHoverTwo',
            'selector': `.${elementId} .guten-icon-wrapper.framed:hover`,
            'properties': [
                {
                    'name': 'background-color',
                    'valueType': 'direct'
                }
            ],
        },
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
    return [
        ...data,
        ...applyFilters(
            'gutenverse.icon.blockStyle',
            [],
            {
                elementId,
                attributes
            }
        )
    ];
};


export default getBlockStyle;