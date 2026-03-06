import { isNotEmpty } from 'gutenverse-core/helper';

const panelFilterSearchStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['searchControlWidth']) && data.push({
        'type': 'unitPoint',
        'id': 'searchControlWidth',
        'responsive': true,
        'selector': `.${elementId}.guten-gallery .search-filters-wrap`,
        'properties': [
            {
                'name': 'width',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['fitlerSearchControlWidth']) && data.push({
        'type': 'unitPoint',
        'id': 'fitlerSearchControlWidth',
        'responsive': true,
        'selector': `.${elementId}.guten-gallery .search-filters-wrap .filter-wrap`,
        'properties': [
            {
                'name': 'flex-basis',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['fitlerSearchFormWidth']) && data.push({
        'type': 'unitPoint',
        'id': 'fitlerSearchFormWidth',
        'responsive': true,
        'selector': `.${elementId}.guten-gallery .search-filters-wrap .guten-gallery-search-box`,
        'properties': [
            {
                'name': 'flex-basis',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['filterSearchTypography']) && data.push({
        'type': 'typography',
        'id': 'filterSearchTypography',
        'selector': `.${elementId}.guten-gallery .search-filters-wrap .filter-wrap span, .${elementId}.guten-gallery .search-filters-wrap .filter-wrap ul.search-filter-controls li, .${elementId}.guten-gallery .search-filters-wrap form.guten-gallery-search-box input[type=text]`,
    });

    isNotEmpty(attributes['fitlerSearchIconSpacing']) && data.push({
        'type': 'unitPoint',
        'id': 'fitlerSearchIconSpacing',
        'responsive': true,
        'selector': `.${elementId}.guten-gallery .search-filter-trigger.icon-position-after i, .${elementId}.guten-gallery .search-filter-trigger.icon-position-after .gutenverse-icon-svg`,
        'properties': [
            {
                'name': 'margin-left',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['fitlerSearchIconSpacing']) && data.push({
        'type': 'unitPoint',
        'id': 'fitlerSearchIconSpacing',
        'responsive': true,
        'selector': `.${elementId}.guten-gallery .search-filter-trigger.icon-position-before i, .${elementId}.guten-gallery .search-filter-trigger.icon-position-after .gutenverse-icon-svg`,
        'properties': [
            {
                'name': 'margin-right',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['fitlerSearchIconSize']) && data.push({
        'type': 'unitPoint',
        'id': 'fitlerSearchIconSize',
        'responsive': true,
        'selector': `.${elementId}.guten-gallery .search-filter-trigger i`,
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['filterSearchTextBackground']) && data.push({
        'type': 'color',
        'id': 'filterSearchTextBackground',
        'responsive': true,
        'selector': `.${elementId}.guten-gallery .search-filters-wrap .filter-wrap button.search-filter-trigger`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['filterSearchTextColor']) && data.push({
        'type': 'color',
        'id': 'filterSearchTextColor',
        'responsive': true,
        'selector': `.${elementId}.guten-gallery .search-filters-wrap .filter-wrap button.search-filter-trigger`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['filterSearchBorder']) && data.push({
        'type': 'border',
        'id': 'filterSearchBorder',
        'selector': `.${elementId}.guten-gallery .search-filters-wrap .filter-wrap button.search-filter-trigger`,
    });

    isNotEmpty(attributes['filterSearchBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'filterSearchBorderResponsive',
        'selector': `.${elementId}.guten-gallery .search-filters-wrap .filter-wrap button.search-filter-trigger`,
    });

    isNotEmpty(attributes['filterSearchMargin']) && data.push({
        'type': 'dimension',
        'id': 'filterSearchMargin',
        'responsive': true,
        'selector': `.${elementId}.guten-gallery .search-filters-wrap .filter-wrap`,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['filterSearchBoxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'filterSearchBoxShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.guten-gallery .search-filters-wrap .filter-wrap button.search-filter-trigger`,
    });

    isNotEmpty(attributes['filterSearchSeparatorSize']) && data.push({
        'type': 'plain',
        'id': 'filterSearchSeparatorSize',
        'responsive': true,
        'selector': `.${elementId}.guten-gallery .search-filters-wrap .filter-wrap button.search-filter-trigger`,
        'properties': [
            {
                'name': 'border-right-width',
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

    isNotEmpty(attributes['filterSearchSeparatorColor']) && data.push({
        'type': 'color',
        'id': 'filterSearchSeparatorColor',
        'responsive': true,
        'selector': `.${elementId}.guten-gallery .search-filters-wrap .filter-wrap button.search-filter-trigger`,
        'properties': [
            {
                'name': 'border-right-color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['filterSearchFormBackground']) && data.push({
        'type': 'color',
        'id': 'filterSearchFormBackground',
        'responsive': true,
        'selector': `.${elementId}.guten-gallery .search-filters-wrap .guten-gallery-search-box`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['filterSearchFormTextColor']) && data.push({
        'type': 'color',
        'responsive': true,
        'id': 'filterSearchFormTextColor',
        'selector': `.${elementId}.guten-gallery .search-filters-wrap form.guten-gallery-search-box input[type=text], .${elementId}.guten-gallery .search-filters-wrap form.guten-gallery-search-box input[type=text]::placeholder`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['filterSearchFormBorder']) && data.push({
        'type': 'border',
        'id': 'filterSearchFormBorder',
        'selector': `.${elementId}.guten-gallery .search-filters-wrap .guten-gallery-search-box`,
    });

    isNotEmpty(attributes['filterSearchFormBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'filterSearchFormBorderResponsive',
        'selector': `.${elementId}.guten-gallery .search-filters-wrap .guten-gallery-search-box`,
    });

    isNotEmpty(attributes['filterSearchFormBoxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'filterSearchFormBoxShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.guten-gallery .search-filters-wrap .guten-gallery-search-box`,
    });

    isNotEmpty(attributes['filterSearchDropdownTextColor']) && data.push({
        'type': 'color',
        'id': 'filterSearchDropdownTextColor',
        'responsive': true,
        'selector': `.${elementId}.guten-gallery .search-filters-wrap .filter-wrap ul.search-filter-controls li`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['filterSearchDropdownTextColorHover']) && data.push({
        'type': 'color',
        'id': 'filterSearchDropdownTextColorHover',
        'responsive': true,
        'selector': `.${elementId}.guten-gallery .search-filters-wrap .filter-wrap ul.search-filter-controls li:hover`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['filterSearchDropdownBackground']) && data.push({
        'type': 'background',
        'id': 'filterSearchDropdownBackground',
        'selector': `.${elementId}.guten-gallery .search-filters-wrap .filter-wrap ul.search-filter-controls`,
    });

    isNotEmpty(attributes['filterSearchDropdownBorder']) && data.push({
        'type': 'border',
        'id': 'filterSearchDropdownBorder',
        'selector': `.${elementId}.guten-gallery .search-filters-wrap .filter-wrap ul.search-filter-controls`,
    });

    isNotEmpty(attributes['filterSearchDropdownBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'filterSearchDropdownBorderResponsive',
        'selector': `.${elementId}.guten-gallery .search-filters-wrap .filter-wrap ul.search-filter-controls`,
    });

    isNotEmpty(attributes['filterSearchDropdownPadding']) && data.push({
        'type': 'dimension',
        'id': 'filterSearchDropdownPadding',
        'responsive': true,
        'selector': `.${elementId}.guten-gallery .search-filters-wrap .filter-wrap ul.search-filter-controls`,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ]
    });

    return data;
};

export default panelFilterSearchStyle;