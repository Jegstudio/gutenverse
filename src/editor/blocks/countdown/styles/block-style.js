import { isNotEmpty } from 'gutenverse-core/helper';
import { applyFilters } from '@wordpress/hooks';
import { backgroundStyle } from 'gutenverse-core/controls';

const getBlockStyle = (elementId, attributes) => {
    let data = [];
    data = backgroundStyle({ attributes, data, elementId });

    /**Panel Content Style */
    isNotEmpty(attributes['column']) && data.push({
        'type': 'plain',
        'id': 'column',
        'selector': `.editor-styles-wrapper .${elementId}.guten-countdown .guten-countdown-wrapper .item-flex`,
        'responsive': true,
        'properties': [
            {
                'name': 'flex',
                'valueType': 'pattern',
                'pattern': '0 0 calc( 100% / {value} ); max-width: calc( (100% / {value}))',
                'patternValues': {
                    'value': {
                        'type': 'direct'
                    }
                }
            }
        ]
    });

    isNotEmpty(attributes['rowGap']) && data.push({
        'type': 'plain',
        'id': 'rowGap',
        'selector': `.editor-styles-wrapper .${elementId}.guten-countdown .guten-countdown-wrapper`,
        'responsive': true,
        'properties': [
            {
                'name': 'row-gap',
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


    isNotEmpty(attributes['labelPosition']) && data.push({
        'type': 'plain',
        'id': 'labelPosition',
        'selector': `.editor-styles-wrapper .${elementId}.guten-countdown .time-container`,
        'properties': [
            {
                'name': 'flex-direction',
                'valueType': 'pattern',
                'pattern': 'top' === attributes['labelPosition'] || 'bottom' === attributes['labelPosition'] ? 'column' : 'row',
            }
        ]
    });

    isNotEmpty(attributes['labelSpacing']) && data.push({
        'type': 'plain',
        'id': 'labelSpacing',
        'selector': `.editor-styles-wrapper .${elementId}.guten-countdown .time-container`,
        'responsive': true,
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

    /**Panel Setting */
    isNotEmpty(attributes['dividerColor']) && data.push({
        'type': 'color',
        'id': 'dividerColor',
        'selector': `.guten-element.guten-countdown.${elementId} .countdown-divider`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['dividerSize']) && data.push({
        'type': 'plain',
        'id': 'dividerSize',
        'selector': `.guten-element.guten-countdown.${elementId} .countdown-divider`,
        'responsive': true,
        'properties': [
            {
                'name': 'font-size',
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

    /**Panel Time Style */
    attributes['oneForAll'] && isNotEmpty(attributes['oneForAllDigitColor']) && data.push({
        'type': 'color',
        'id': 'oneForAllDigitColor',
        'selector': `.guten-element.guten-countdown.${elementId} .time-container .countdown-value`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    attributes['oneForAll'] && isNotEmpty(attributes['oneForAllDigitTypography']) && data.push({
        'type': 'typography',
        'id': 'oneForAllDigitTypography',
        'selector': `.guten-element.guten-countdown.${elementId} .time-container .countdown-value`,
    });

    attributes['oneForAll'] && isNotEmpty(attributes['oneForAllLabelColor']) && data.push({
        'type': 'color',
        'id': 'oneForAllLabelColor',
        'selector': `.guten-element.guten-countdown.${elementId} .time-container .countdown-label`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    attributes['oneForAll'] && isNotEmpty(attributes['oneForAllLabelTypography']) && data.push({
        'type': 'typography',
        'id': 'oneForAllLabelTypography',
        'selector': `.guten-element.guten-countdown.${elementId} .time-container .countdown-label`,
    });

    attributes['oneForAll'] && isNotEmpty(attributes['oneForAllBackground']) && data.push({
        'type': 'background',
        'id': 'oneForAllBackground',
        'selector': `.guten-element.guten-countdown.${elementId} .time-container`,
    });

    attributes['oneForAll'] && isNotEmpty(attributes['oneForAllBackgroundHover']) && data.push({
        'type': 'background',
        'id': 'oneForAllBackgroundHover',
        'selector': `.guten-element.guten-countdown.${elementId} .time-container:hover`,
    });

    attributes['oneForAll'] && isNotEmpty(attributes['oneForAllBorder']) && data.push({
        'type': 'borderResponsive',
        'id': 'oneForAllBorder',
        'selector': `.guten-element.guten-countdown.${elementId} .time-container`,
    });

    attributes['oneForAll'] && isNotEmpty(attributes['oneForAllBorderHover']) && data.push({
        'type': 'borderResponsive',
        'id': 'oneForAllBorderHover',
        'selector': `.guten-element.guten-countdown.${elementId} .time-container`,
    });

    attributes['oneForAll'] && isNotEmpty(attributes['oneForAllBoxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'oneForAllBoxShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .${elementId}.guten-countdown .time-container`,
    });

    attributes['oneForAll'] && isNotEmpty(attributes['oneForAllBoxShadowHover']) && data.push({
        'type': 'boxShadow',
        'id': 'oneForAllBoxShadowHover',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.guten-element.guten-countdown.${elementId} .time-container:hover`,
    });

    attributes['oneForAll'] && isNotEmpty(attributes['oneForAllPadding']) && data.push({
        'type': 'dimension',
        'id': 'oneForAllPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.guten-element.guten-countdown.${elementId} .time-container`,
    });

    attributes['oneForAll'] && isNotEmpty(attributes['oneForAllMargin']) && data.push({
        'type': 'dimension',
        'id': 'oneForAllMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.guten-element.guten-countdown.${elementId} .time-container`,
    });

    attributes['oneForAll'] && isNotEmpty(attributes['oneForAllWidth']) && data.push({
        'type': 'unitPoint',
        'id': 'oneForAllWidth',
        'responsive': true,
        'properties': [
            {
                'name': 'width',
                'valueType': 'direct'
            }
        ],
        'selector': `.guten-element.guten-countdown.${elementId} .time-container`,
    });

    attributes['oneForAll'] && isNotEmpty(attributes['oneForAllHeight']) && data.push({
        'type': 'plain',
        'id': 'oneForAllHeight',
        'responsive': true,
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
        ],
        'selector': `.guten-element.guten-countdown.${elementId} .time-container`,
    });

    attributes['oneForAll'] && isNotEmpty(attributes['oneForAllVerticalAlign']) && data.push({
        'type': 'plain',
        'id': 'oneForAllVerticalAlign',
        'properties': [
            {
                'name': 'top' === attributes['labelPosition'] || 'bottom' === attributes['labelPosition'] ? 'justify-content' : 'align-items',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .${elementId}.guten-countdown .time-container`,
    });

    attributes['oneForAll'] && isNotEmpty(attributes['oneForAllHorizontalAlign']) && data.push({
        'type': 'plain',
        'id': 'oneForAllHorizontalAlign',
        'properties': [
            {
                'name': 'top' === attributes['labelPosition'] || 'bottom' === attributes['labelPosition'] ? 'align-items' : 'justify-content',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .${elementId}.guten-countdown .time-container`,
    });

    !attributes['oneForAll'] && isNotEmpty(attributes['daysDigitColor']) && data.push({
        'type': 'color',
        'id': 'daysDigitColor',
        'selector': `.guten-element.guten-countdown.${elementId} .days-wrapper .countdown-value`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    !attributes['oneForAll'] && isNotEmpty(attributes['daysDigitTypography']) && data.push({
        'type': 'typography',
        'id': 'daysDigitTypography',
        'selector': `.guten-element.guten-countdown.${elementId} .days-wrapper .countdown-value`,
    });

    !attributes['oneForAll'] && isNotEmpty(attributes['daysLabelColor']) && data.push({
        'type': 'color',
        'id': 'daysLabelColor',
        'selector': `.guten-element.guten-countdown.${elementId} .days-wrapper .countdown-label`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    !attributes['oneForAll'] && isNotEmpty(attributes['daysLabelTypography']) && data.push({
        'type': 'typography',
        'id': 'daysLabelTypography',
        'selector': `.guten-element.guten-countdown.${elementId} .days-wrapper .countdown-label`,
    });

    !attributes['oneForAll'] && isNotEmpty(attributes['daysBackground']) && data.push({
        'type': 'background',
        'id': 'daysBackground',
        'selector': `.guten-element.guten-countdown.${elementId} .days-wrapper`,
    });

    !attributes['oneForAll'] && isNotEmpty(attributes['daysBackgroundHover']) && data.push({
        'type': 'background',
        'id': 'daysBackgroundHover',
        'selector': `.guten-element.guten-countdown.${elementId} .days-wrapper:hover`,
    });

    !attributes['oneForAll'] && isNotEmpty(attributes['daysBorder']) && data.push({
        'type': 'borderResponsive',
        'id': 'daysBorder',
        'selector': `.guten-element.guten-countdown.${elementId} .days-wrapper`,
    });

    !attributes['oneForAll'] && isNotEmpty(attributes['daysBorderHover']) && data.push({
        'type': 'borderResponsive',
        'id': 'daysBorderHover',
        'selector': `.guten-element.guten-countdown.${elementId} .days-wrapper`,
    });

    !attributes['oneForAll'] && isNotEmpty(attributes['daysBoxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'daysBoxShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .${elementId}.guten-countdown .days-wrapper`,
    });

    !attributes['oneForAll'] && isNotEmpty(attributes['daysBoxShadowHover']) && data.push({
        'type': 'boxShadow',
        'id': 'daysBoxShadowHover',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.guten-element.guten-countdown.${elementId} .days-wrapper:hover`,
    });

    !attributes['oneForAll'] && isNotEmpty(attributes['daysPadding']) && data.push({
        'type': 'dimension',
        'id': 'daysPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.guten-element.guten-countdown.${elementId} .days-wrapper`,
    });

    !attributes['oneForAll'] && isNotEmpty(attributes['daysMargin']) && data.push({
        'type': 'dimension',
        'id': 'daysMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.guten-element.guten-countdown.${elementId} .days-wrapper`,
    });

    !attributes['oneForAll'] && isNotEmpty(attributes['daysWidth']) && data.push({
        'type': 'unitPoint',
        'id': 'daysWidth',
        'responsive': true,
        'properties': [
            {
                'name': 'width',
                'valueType': 'direct'
            }
        ],
        'selector': `.guten-element.guten-countdown.${elementId} .days-wrapper`,
    });

    !attributes['oneForAll'] && isNotEmpty(attributes['daysHeight']) && data.push({
        'type': 'plain',
        'id': 'daysHeight',
        'responsive': true,
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
        ],
        'selector': `.guten-element.guten-countdown.${elementId} .days-wrapper`,
    });

    !attributes['oneForAll'] && isNotEmpty(attributes['daysVerticalAlign']) && data.push({
        'type': 'plain',
        'id': 'daysVerticalAlign',
        'properties': [
            {
                'name': 'top' === attributes['labelPosition'] || 'bottom' === attributes['labelPosition'] ? 'justify-content' : 'align-items',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .${elementId}.guten-countdown .days-wrapper`,
    });

    !attributes['oneForAll'] && isNotEmpty(attributes['daysHorizontalAlign']) && data.push({
        'type': 'plain',
        'id': 'daysHorizontalAlign',
        'properties': [
            {
                'name': 'top' === attributes['labelPosition'] || 'bottom' === attributes['labelPosition'] ? 'align-items' : 'justify-content',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .${elementId}.guten-countdown .days-wrapper`,
    });

    !attributes['oneForAll'] && isNotEmpty(attributes['hoursDigitColor']) && data.push({
        'type': 'color',
        'id': 'hoursDigitColor',
        'selector': `.guten-element.guten-countdown.${elementId} .hours-wrapper .countdown-value`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    !attributes['oneForAll'] && isNotEmpty(attributes['hoursDigitTypography']) && data.push({
        'type': 'typography',
        'id': 'hoursDigitTypography',
        'selector': `.guten-element.guten-countdown.${elementId} .hours-wrapper .countdown-value`,
    });

    !attributes['oneForAll'] && isNotEmpty(attributes['hoursLabelColor']) && data.push({
        'type': 'color',
        'id': 'hoursLabelColor',
        'selector': `.guten-element.guten-countdown.${elementId} .hours-wrapper .countdown-label`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    !attributes['oneForAll'] && isNotEmpty(attributes['hoursLabelTypography']) && data.push({
        'type': 'typography',
        'id': 'hoursLabelTypography',
        'selector': `.guten-element.guten-countdown.${elementId} .hours-wrapper .countdown-label`,
    });

    !attributes['oneForAll'] && isNotEmpty(attributes['hoursBackground']) && data.push({
        'type': 'background',
        'id': 'hoursBackground',
        'selector': `.guten-element.guten-countdown.${elementId} .hours-wrapper`,
    });

    !attributes['oneForAll'] && isNotEmpty(attributes['hoursBackgroundHover']) && data.push({
        'type': 'background',
        'id': 'hoursBackgroundHover',
        'selector': `.guten-element.guten-countdown.${elementId} .hours-wrapper:hover`,
    });

    !attributes['oneForAll'] && isNotEmpty(attributes['hoursBorder']) && data.push({
        'type': 'borderResponsive',
        'id': 'hoursBorder',
        'selector': `.guten-element.guten-countdown.${elementId} .hours-wrapper`,
    });

    !attributes['oneForAll'] && isNotEmpty(attributes['hoursBorderHover']) && data.push({
        'type': 'borderResponsive',
        'id': 'hoursBorderHover',
        'selector': `.guten-element.guten-countdown.${elementId} .hours-wrapper`,
    });

    !attributes['oneForAll'] && isNotEmpty(attributes['hoursBoxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'hoursBoxShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .${elementId}.guten-countdown .hours-wrapper`,
    });

    !attributes['oneForAll'] && isNotEmpty(attributes['hoursBoxShadowHover']) && data.push({
        'type': 'boxShadow',
        'id': 'hoursBoxShadowHover',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.guten-element.guten-countdown.${elementId} .hours-wrapper:hover`,
    });

    !attributes['oneForAll'] && isNotEmpty(attributes['hoursPadding']) && data.push({
        'type': 'dimension',
        'id': 'hoursPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.guten-element.guten-countdown.${elementId} .hours-wrapper`,
    });

    !attributes['oneForAll'] && isNotEmpty(attributes['hoursMargin']) && data.push({
        'type': 'dimension',
        'id': 'hoursMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.guten-element.guten-countdown.${elementId} .hours-wrapper`,
    });

    !attributes['oneForAll'] && isNotEmpty(attributes['hoursWidth']) && data.push({
        'type': 'unitPoint',
        'id': 'hoursWidth',
        'responsive': true,
        'properties': [
            {
                'name': 'width',
                'valueType': 'direct'
            }
        ],
        'selector': `.guten-element.guten-countdown.${elementId} .hours-wrapper`,
    });

    !attributes['oneForAll'] && isNotEmpty(attributes['hoursHeight']) && data.push({
        'type': 'plain',
        'id': 'hoursHeight',
        'responsive': true,
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
        ],
        'selector': `.guten-element.guten-countdown.${elementId} .hours-wrapper`,
    });

    !attributes['oneForAll'] && isNotEmpty(attributes['hoursVerticalAlign']) && data.push({
        'type': 'plain',
        'id': 'hoursVerticalAlign',
        'properties': [
            {
                'name': 'top' === attributes['labelPosition'] || 'bottom' === attributes['labelPosition'] ? 'justify-content' : 'align-items',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .${elementId}.guten-countdown .hours-wrapper`,
    });

    !attributes['oneForAll'] && isNotEmpty(attributes['hoursHorizontalAlign']) && data.push({
        'type': 'plain',
        'id': 'hoursHorizontalAlign',
        'properties': [
            {
                'name': 'top' === attributes['labelPosition'] || 'bottom' === attributes['labelPosition'] ? 'align-items' : 'justify-content',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .${elementId}.guten-countdown .hours-wrapper`,
    });

    !attributes['oneForAll'] && isNotEmpty(attributes['minutesDigitColor']) && data.push({
        'type': 'color',
        'id': 'minutesDigitColor',
        'selector': `.guten-element.guten-countdown.${elementId} .minutes-wrapper .countdown-value`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    !attributes['oneForAll'] && isNotEmpty(attributes['minutesDigitTypography']) && data.push({
        'type': 'typography',
        'id': 'minutesDigitTypography',
        'selector': `.guten-element.guten-countdown.${elementId} .minutes-wrapper .countdown-value`,
    });

    !attributes['oneForAll'] && isNotEmpty(attributes['minutesLabelColor']) && data.push({
        'type': 'color',
        'id': 'minutesLabelColor',
        'selector': `.guten-element.guten-countdown.${elementId} .minutes-wrapper .countdown-label`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    !attributes['oneForAll'] && isNotEmpty(attributes['minutesLabelTypography']) && data.push({
        'type': 'typography',
        'id': 'minutesLabelTypography',
        'selector': `.guten-element.guten-countdown.${elementId} .minutes-wrapper .countdown-label`,
    });

    !attributes['oneForAll'] && isNotEmpty(attributes['minutesBackground']) && data.push({
        'type': 'background',
        'id': 'minutesBackground',
        'selector': `.guten-element.guten-countdown.${elementId} .minutes-wrapper`,
    });

    !attributes['oneForAll'] && isNotEmpty(attributes['minutesBackgroundHover']) && data.push({
        'type': 'background',
        'id': 'minutesBackgroundHover',
        'selector': `.guten-element.guten-countdown.${elementId} .minutes-wrapper:hover`,
    });

    !attributes['oneForAll'] && isNotEmpty(attributes['minutesBorder']) && data.push({
        'type': 'borderResponsive',
        'id': 'minutesBorder',
        'selector': `.guten-element.guten-countdown.${elementId} .minutes-wrapper`,
    });

    !attributes['oneForAll'] && isNotEmpty(attributes['minutesBorderHover']) && data.push({
        'type': 'borderResponsive',
        'id': 'minutesBorderHover',
        'selector': `.guten-element.guten-countdown.${elementId} .minutes-wrapper`,
    });

    !attributes['oneForAll'] && isNotEmpty(attributes['minutesBoxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'minutesBoxShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .${elementId}.guten-countdown .minutes-wrapper`,
    });

    !attributes['oneForAll'] && isNotEmpty(attributes['minutesBoxShadowHover']) && data.push({
        'type': 'boxShadow',
        'id': 'minutesBoxShadowHover',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.guten-element.guten-countdown.${elementId} .minutes-wrapper:hover`,
    });

    !attributes['oneForAll'] && isNotEmpty(attributes['minutesPadding']) && data.push({
        'type': 'dimension',
        'id': 'minutesPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.guten-element.guten-countdown.${elementId} .minutes-wrapper`,
    });

    !attributes['oneForAll'] && isNotEmpty(attributes['minutesMargin']) && data.push({
        'type': 'dimension',
        'id': 'minutesMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.guten-element.guten-countdown.${elementId} .minutes-wrapper`,
    });

    !attributes['oneForAll'] && isNotEmpty(attributes['minutesWidth']) && data.push({
        'type': 'unitPoint',
        'id': 'minutesWidth',
        'responsive': true,
        'properties': [
            {
                'name': 'width',
                'valueType': 'direct'
            }
        ],
        'selector': `.guten-element.guten-countdown.${elementId} .minutes-wrapper`,
    });

    !attributes['oneForAll'] && isNotEmpty(attributes['minutesHeight']) && data.push({
        'type': 'plain',
        'id': 'minutesHeight',
        'responsive': true,
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
        ],
        'selector': `.guten-element.guten-countdown.${elementId} .minutes-wrapper`,
    });

    !attributes['oneForAll'] && isNotEmpty(attributes['minutesVerticalAlign']) && data.push({
        'type': 'plain',
        'id': 'minutesVerticalAlign',
        'properties': [
            {
                'name': 'top' === attributes['labelPosition'] || 'bottom' === attributes['labelPosition'] ? 'justify-content' : 'align-items',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .${elementId}.guten-countdown .minutes-wrapper`,
    });

    !attributes['oneForAll'] && isNotEmpty(attributes['minutesHorizontalAlign']) && data.push({
        'type': 'plain',
        'id': 'minutesHorizontalAlign',
        'properties': [
            {
                'name': 'top' === attributes['labelPosition'] || 'bottom' === attributes['labelPosition'] ? 'align-items' : 'justify-content',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .${elementId}.guten-countdown .minutes-wrapper`,
    });

    !attributes['oneForAll'] && isNotEmpty(attributes['secondsDigitColor']) && data.push({
        'type': 'color',
        'id': 'secondsDigitColor',
        'selector': `.guten-element.guten-countdown.${elementId} .seconds-wrapper .countdown-value`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    !attributes['oneForAll'] && isNotEmpty(attributes['secondsDigitTypography']) && data.push({
        'type': 'typography',
        'id': 'secondsDigitTypography',
        'selector': `.guten-element.guten-countdown.${elementId} .seconds-wrapper .countdown-value`,
    });

    !attributes['oneForAll'] && isNotEmpty(attributes['secondsLabelColor']) && data.push({
        'type': 'color',
        'id': 'secondsLabelColor',
        'selector': `.guten-element.guten-countdown.${elementId} .seconds-wrapper .countdown-label`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    !attributes['oneForAll'] && isNotEmpty(attributes['secondsLabelTypography']) && data.push({
        'type': 'typography',
        'id': 'secondsLabelTypography',
        'selector': `.guten-element.guten-countdown.${elementId} .seconds-wrapper .countdown-label`,
    });

    !attributes['oneForAll'] && isNotEmpty(attributes['secondsBackground']) && data.push({
        'type': 'background',
        'id': 'secondsBackground',
        'selector': `.guten-element.guten-countdown.${elementId} .seconds-wrapper`,
    });

    !attributes['oneForAll'] && isNotEmpty(attributes['secondsBackgroundHover']) && data.push({
        'type': 'background',
        'id': 'secondsBackgroundHover',
        'selector': `.guten-element.guten-countdown.${elementId} .seconds-wrapper:hover`,
    });

    !attributes['oneForAll'] && isNotEmpty(attributes['secondsBorder']) && data.push({
        'type': 'borderResponsive',
        'id': 'secondsBorder',
        'selector': `.guten-element.guten-countdown.${elementId} .seconds-wrapper`,
    });

    !attributes['oneForAll'] && isNotEmpty(attributes['secondsBorderHover']) && data.push({
        'type': 'borderResponsive',
        'id': 'secondsBorderHover',
        'selector': `.guten-element.guten-countdown.${elementId} .seconds-wrapper`,
    });

    !attributes['oneForAll'] && isNotEmpty(attributes['secondsBoxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'secondsBoxShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .${elementId}.guten-countdown .seconds-wrapper`,
    });

    !attributes['oneForAll'] && isNotEmpty(attributes['secondsBoxShadowHover']) && data.push({
        'type': 'boxShadow',
        'id': 'secondsBoxShadowHover',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.guten-element.guten-countdown.${elementId} .seconds-wrapper:hover`,
    });

    !attributes['oneForAll'] && isNotEmpty(attributes['secondsPadding']) && data.push({
        'type': 'dimension',
        'id': 'secondsPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.guten-element.guten-countdown.${elementId} .seconds-wrapper`,
    });

    !attributes['oneForAll'] && isNotEmpty(attributes['secondsMargin']) && data.push({
        'type': 'dimension',
        'id': 'secondsMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.guten-element.guten-countdown.${elementId} .seconds-wrapper`,
    });

    !attributes['oneForAll'] && isNotEmpty(attributes['secondsWidth']) && data.push({
        'type': 'unitPoint',
        'id': 'secondsWidth',
        'responsive': true,
        'properties': [
            {
                'name': 'width',
                'valueType': 'direct'
            }
        ],
        'selector': `.guten-element.guten-countdown.${elementId} .seconds-wrapper`,
    });

    !attributes['oneForAll'] && isNotEmpty(attributes['secondsHeight']) && data.push({
        'type': 'plain',
        'id': 'secondsHeight',
        'responsive': true,
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
        ],
        'selector': `.guten-element.guten-countdown.${elementId} .seconds-wrapper`,
    });

    !attributes['oneForAll'] && isNotEmpty(attributes['secondsVerticalAlign']) && data.push({
        'type': 'plain',
        'id': 'secondsVerticalAlign',
        'properties': [
            {
                'name': 'top' === attributes['labelPosition'] || 'bottom' === attributes['labelPosition'] ? 'justify-content' : 'align-items',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .${elementId}.guten-countdown .seconds-wrapper`,
    });

    !attributes['oneForAll'] && isNotEmpty(attributes['secondsHorizontalAlign']) && data.push({
        'type': 'plain',
        'id': 'secondsHorizontalAlign',
        'properties': [
            {
                'name': 'top' === attributes['labelPosition'] || 'bottom' === attributes['labelPosition'] ? 'align-items' : 'justify-content',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .${elementId}.guten-countdown .seconds-wrapper`,
    });

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
            'gutenverse.countdown.blockStyle',
            [],
            {
                elementId,
                attributes
            }
        )
    ];
};

export default getBlockStyle;