
import { __ } from '@wordpress/i18n';
import { CheckboxControl, RangeControl, SelectControl, SelectSearchControl } from 'gutenverse-core/controls';
import { addQueryArgs } from '@wordpress/url';
import apiFetch from '@wordpress/api-fetch';
import { isOnEditor } from 'gutenverse-core/helper';

export const settingPanel = ({showCount, layout, taxonomyType}) => {
    const searchCategory =  isOnEditor() ? input => new Promise(resolve => {
        apiFetch({
            path: addQueryArgs('/wp/v2/categories', {
                search: input,
            }),
        }).then(data => {
            const promiseOptions = data.map(item => {
                return {
                    label: item.name,
                    value: item.id
                };
            });

            resolve(promiseOptions);
        }).catch(() => {
            resolve([]);
        });
    }) : () => {
        return {
            label: '',
            value: ''
        };
    };

    const searchTags =  isOnEditor() ? input => new Promise(resolve => {
        apiFetch({
            path: addQueryArgs('/wp/v2/tags', {
                search: input,
            }),
        }).then(data => {
            const promiseOptions = data.map(item => {
                return {
                    label: item.name,
                    value: item.id
                };
            });

            resolve(promiseOptions);
        }).catch(() => {
            resolve([]);
        });
    }) : () => {
        return {
            label: '',
            value: ''
        };
    };

    const searchTaxonomy =  isOnEditor() ? input => new Promise(resolve => {
        apiFetch({
            path: addQueryArgs('/wp/v2/taxonomies', {
                search: input,
            }),
        }).then(data => {
            const promiseOptions = Object.keys(data).map(item => {
                return {
                    label: data[item].name,
                    value: data[item].slug
                };
            });
            resolve(promiseOptions);
        }).catch(() => {
            resolve([]);
        });
    }) : () => {
        return {
            label: '',
            value: ''
        };
    };

    return [
        {
            id: 'taxonomyType',
            label: __('Taxonomy Type', 'gutenverse'),
            component: SelectSearchControl,
            isMulti: false,
            onSearch: searchTaxonomy
        },
        {
            id: 'qty',
            label: __('Number of Taxonomy List', 'gutenverse'),
            component : RangeControl,
            min: 1,
            max: 100,
            isParseFloat: true
        },
        {
            id: 'sortType',
            label: __('Sort Type', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('Ascending', 'gutenverse'),
                    value: 'ASC'
                },
                {
                    label: __('Descending', 'gutenverse'),
                    value: 'DESC'
                },
            ],
        },
        {
            id: 'sortBy',
            label: __('Sort By', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('Post Count', 'gutenverse'),
                    value: 'count'
                },
                {
                    label: __('Name', 'gutenverse'),
                    value: 'name'
                },
            ],
        },
        {
            id: 'hideEmpty',
            label: __('Hide Empty', 'gutenverse'),
            description: __('When enabled, categories or tags with no posts will not be displayed in the list.', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'includedCategory',
            show: taxonomyType?.value === 'category',
            label: __('Included Categories', 'gutenverse'),
            component: SelectSearchControl,
            isMulti: true,
            onSearch: searchCategory
        },
        {
            id: 'includedTags',
            show: taxonomyType?.value === 'post_tag',
            label: __('Included Tags', 'gutenverse'),
            component: SelectSearchControl,
            isMulti: true,
            onSearch: searchTags
        },
        {
            id: 'layout',
            label: __('Layout', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('Vertical', 'gutenverse'),
                    value: 'column'
                },
                {
                    label: __('Horizontal', 'gutenverse'),
                    value: 'row'
                },
            ],
        },
        {
            id: 'columnCount',
            show: layout === 'column',
            label: __('Column', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 10,
            step: 1,
            allowDeviceControl: true,
        },
        {
            id: 'showIcon',
            label: __('Show Icon', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'showDivider',
            label: __('Show Divider', 'gutenverse'),
            component: CheckboxControl
        },
        {
            id: 'showCount',
            label: __('Show Count', 'gutenverse'),
            component: CheckboxControl
        },
        {
            id: 'countBracket',
            show: showCount,
            label: __('Count Bracket', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('None', 'gutenverse'),
                    value: 'none'
                },
                {
                    label: __('Parentheses ()', 'gutenverse'),
                    value: 'parentheses'
                },
                {
                    label: __('Braces {}', 'gutenverse'),
                    value: 'braces'
                },
                {
                    label: __('Square []', 'gutenverse'),
                    value: 'square'
                },
                {
                    label: __('Angle brackets <>', 'gutenverse'),
                    value: 'angle'
                },
                {
                    label: __('Double quotes ""', 'gutenverse'),
                    value: 'double-quotes'
                },
                {
                    label: __('Single quotes \'\'', 'gutenverse'),
                    value: 'single-quotes'
                },
            ],
        },
    ];
};
