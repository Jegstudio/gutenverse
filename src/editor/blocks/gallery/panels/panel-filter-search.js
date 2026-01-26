import { __ } from '@wordpress/i18n';
import { AlertControl, BackgroundControl, BorderControl, BorderResponsiveControl, BoxShadowControl, ColorControl, DimensionControl, HeadingControl, IconSVGControl, RangeControl, SelectControl, SizeControl, TextControl, TypographyControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const filterSearchPanel = (props) => {
    const {
        elementId,
        filterType
    } = props;

    const device = getDeviceType();

    if (filterType !== 'search') return [
        {
            id: 'divider-notice',
            component: AlertControl,
            children: <>
                <span>{__('This Panel Option Only Show If You Choose "Filter & Search" for Filter Type Option')}</span>
            </>
        },
    ];

    return [
        {
            id: 'submenuSplitter0',
            first: true,
            component: HeadingControl,
            label: __('Search Control')
        },
        {
            id: 'searchControlWidth',
            label: __('Search Control Width', 'gutenverse'),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                ['%']: {
                    text: '%',
                    min: 0,
                    max: 100,
                    step: 1
                },
            },
            liveStyle: [
                {
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
                }
            ]
        },
        {
            id: 'fitlerSearchControlWidth',
            label: __('Filter Width', 'gutenverse'),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 500,
                    step: 1
                },
                ['%']: {
                    text: '%',
                    min: 0,
                    max: 100,
                    step: 1
                },
            },
            liveStyle: [
                {
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
                }
            ]
        },
        {
            id: 'fitlerSearchFormWidth',
            label: __('Search Input Width', 'gutenverse'),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 500,
                    step: 1
                },
                ['%']: {
                    text: '%',
                    min: 0,
                    max: 100,
                    step: 1
                },
            },
            liveStyle: [
                {
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
                }
            ]
        },
        {
            id: 'submenuSplitter1',
            component: HeadingControl,
            label: __('Control Tab')
        },
        {
            id: 'filterSearchTypography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: 'filterSearchIcon',
            label: __('Icon', 'gutenverse'),
            component: IconSVGControl,
        },
        {
            id: 'filterSearchIconPosition',
            label: __('Icon Position', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('After'),
                    value: 'after'
                },
                {
                    label: __('Before'),
                    value: 'before'
                },
            ]
        },
        {
            id: 'fitlerSearchIconSpacing',
            label: __('Icon Spacing', 'gutenverse'),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 100,
                    step: 1
                },
                em: {
                    text: 'em',
                    min: 0,
                    max: 10,
                    step: 0.1
                },
            },
            liveStyle: [
                {
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
                },
                {
                    'type': 'unitPoint',
                    'id': 'fitlerSearchIconSpacing',
                    'responsive': true,
                    'selector': `.${elementId}.guten-gallery .search-filter-trigger.icon-position-before i, .${elementId}.guten-gallery .search-filter-trigger.icon-position-before .gutenverse-icon-svg`,
                    'properties': [
                        {
                            'name': 'margin-right',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'fitlerSearchIconSize',
            label: __('Icon Size', 'gutenverse'),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 100,
                    step: 1
                },
                em: {
                    text: 'em',
                    min: 0,
                    max: 10,
                    step: 0.1
                },
            },
            liveStyle: [
                {
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
                },
                {
                    'type': 'unitPoint',
                    'id': 'fitlerSearchIconSize',
                    'responsive': true,
                    'selector': `.${elementId}.guten-gallery .search-filter-trigger svg`,
                    'properties': [
                        {
                            'name': 'font-size',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'filterSearchTextBackground',
            label: __('Background', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            liveStyle: [
                {
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
                }
            ]
        },
        {
            id: 'filterSearchTextColor',
            label: __('Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            liveStyle: [
                {
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
                }
            ]
        },
        {
            id: 'filterSearchBorder',
            show: device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'filterSearchBorder',
                    'selector': `.${elementId}.guten-gallery .search-filters-wrap .filter-wrap button.search-filter-trigger`,
                }
            ]
        },
        {
            id: 'filterSearchBorderResponsive',
            show: device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'filterSearchBorderResponsive',
                    'selector': `.${elementId}.guten-gallery .search-filters-wrap .filter-wrap button.search-filter-trigger`,
                }
            ]
        },
        {
            id: 'filterSearchMargin',
            label: __('Margin', 'gutenverse'),
            component: DimensionControl,
            position: ['top', 'right', 'bottom', 'left'],
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                ['%']: {
                    text: '%',
                    unit: '%'
                },
            },
        },
        {
            id: 'filterSearchBoxShadow',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            liveStyle: [
                {
                    'type': 'boxShadow',
                    'id': 'filterSearchBoxShadow',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId}.guten-gallery .search-filters-wrap .filter-wrap button.search-filter-trigger`,
                }
            ]
        },
        {
            id: 'submenuSplitter',
            component: HeadingControl,
            label: __('Separator')
        },
        {
            id: 'filterSearchSeparatorSize',
            label: __('Separator Size', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            unit: 'px',
            min: 1,
            max: 100,
            step: 1,
            liveStyle: [
                {
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
                }
            ]
        },
        {
            id: 'filterSearchSeparatorColor',
            label: __('SeparatorColor', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            liveStyle: [
                {
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
                }
            ]
        },
        {
            id: 'submenuSplitter2',
            component: HeadingControl,
            label: __('Form')
        },
        {
            id: 'filterSearchFormText',
            label: __('Text Placeholder', 'gutenverse'),
            component: TextControl,
        },
        {
            id: 'filterSearchFormBackground',
            label: __('Background', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            liveStyle: [
                {
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
                }
            ]
        },
        {
            id: 'filterSearchFormTextColor',
            label: __('Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            liveStyle: [
                {
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
                }
            ]
        },
        {
            id: 'filterSearchFormBorder',
            show: device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'filterSearchFormBorder',
                    'selector': `.${elementId}.guten-gallery .search-filters-wrap .guten-gallery-search-box`,
                }
            ]
        },
        {
            id: 'filterSearchFormBorderResponsive',
            show: device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'filterSearchFormBorderResponsive',
                    'selector': `.${elementId}.guten-gallery .search-filters-wrap .guten-gallery-search-box`,
                }
            ]
        },
        {
            id: 'filterSearchFormBoxShadow',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            liveStyle: [
                {
                    'type': 'boxShadow',
                    'id': 'filterSearchFormBoxShadow',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId}.guten-gallery .search-filters-wrap .guten-gallery-search-box`,
                }
            ]
        },
        {
            id: 'submenuSplitter3',
            component: HeadingControl,
            label: __('Dropdown')
        },
        {
            id: 'filterSearchDropdownTextColor',
            label: __('Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            liveStyle: [
                {
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
                }
            ]
        },
        {
            id: 'filterSearchDropdownTextColorHover',
            label: __('Hover Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            liveStyle: [
                {
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
                }
            ]
        },
        {
            id: 'filterSearchDropdownBackground',
            label: __('Background', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'filterSearchDropdownBackground',
                    'selector': `.${elementId}.guten-gallery .search-filters-wrap .filter-wrap ul.search-filter-controls`,
                }
            ]
        },
        {
            id: 'filterSearchDropdownBorder',
            show: device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'filterSearchDropdownBorder',
                    'selector': `.${elementId}.guten-gallery .search-filters-wrap .filter-wrap ul.search-filter-controls`,
                }
            ]
        },
        {
            id: 'filterSearchDropdownBorderResponsive',
            show: device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'filterSearchDropdownBorderResponsive',
                    'selector': `.${elementId}.guten-gallery .search-filters-wrap .filter-wrap ul.search-filter-controls`,
                }
            ]
        },
        {
            id: 'filterSearchDropdownPadding',
            label: __('Padding', 'gutenverse'),
            component: DimensionControl,
            position: ['top', 'right', 'bottom', 'left'],
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                ['%']: {
                    text: '%',
                    unit: '%'
                },
            },
        },
    ];
};