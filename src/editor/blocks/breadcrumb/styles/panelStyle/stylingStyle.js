import { isNotEmpty } from 'gutenverse-core/helper';

const stylingStyle = (props) => {

    const {
        elementId,
        attributes,
        data,
    } = props;


    isNotEmpty(attributes['alignment']) && data.push({
        'type': 'plain',
        'id': 'alignment',
        'selector': `.guten-element.${elementId}.guten-breadcrumb`,
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

    isNotEmpty(attributes['typography']) && data.push({
        'id': 'typography',
        'type': 'typography',
        'selector': `.guten-element.${elementId}.guten-breadcrumb .breadcrumb-nav li span`,
    });

    isNotEmpty(attributes['gap']) && data.push({
        'id': 'gap',
        'type': 'plain',
        'properties': [
            {
                'name': 'margin-right',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    }
                }
            },
            {
                'name': 'margin-left',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    }
                }
            }
        ],
        'selector': `.guten-element.${elementId}.guten-breadcrumb .breadcrumb-nav li.separator`,
    });

    isNotEmpty(attributes['linkColor']) && data.push({
        'type': 'color',
        'id': 'linkColor',
        'selector': `.guten-element.${elementId}.guten-breadcrumb .breadcrumb-nav a span.breadcrumb-link`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['linkColorHover']) && data.push({
        'type': 'color',
        'id': 'linkColorHover',
        'selector': `.guten-element.${elementId}.guten-breadcrumb .breadcrumb-nav a span.breadcrumb-link:hover`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['lastTextColor']) && data.push({
        'type': 'color',
        'id': 'lastTextColor',
        'selector': `.guten-element.${elementId}.guten-breadcrumb .breadcrumb-nav span.breadcrumb-text`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['iconColor']) && data.push({
        'type': 'color',
        'id': 'iconColor',
        'selector': `.guten-element.${elementId}.guten-breadcrumb .breadcrumb-nav li.separator`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['iconColor']) && data.push({
        'type': 'color',
        'id': 'iconColor',
        'selector': `.guten-element.${elementId}.guten-breadcrumb .breadcrumb-nav li.separator svg`,
        'properties': [
            {
                'name': 'fill',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['iconSize']) && data.push({
        'id': 'iconSize',
        'type': 'plain',
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    }
                }
            },
        ],
        'selector': `.guten-element.${elementId}.guten-breadcrumb .breadcrumb-nav li.separator i`,
    });

    isNotEmpty(attributes['iconSize']) && data.push({
        'id': 'iconSize',
        'type': 'plain',
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    }
                }
            },
        ],
        'selector': `.guten-element.${elementId}.guten-breadcrumb .breadcrumb-nav li.separator svg`,
    });

    return data;
};

export default stylingStyle;