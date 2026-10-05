import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';
import { NumberControl, RangeControl, SelectSearchControl, SelectControl, CheckboxControl, TextControl, AlertControl } from 'gutenverse-core/controls';
import { addQueryArgs } from '@wordpress/url';
import { searchAuthor, searchCategory, searchTag } from 'gutenverse-core/requests';
import { isOnEditor } from 'gutenverse-core/helper';

export const settingPanel = ({ postType, inheritQuery }) => {
    const isInheritQueryEnabled = true === inheritQuery || 'true' === inheritQuery;
    const showPostFilters = !isInheritQueryEnabled;

    const path = () => {
        switch (postType) {
            case 'page':
                return '/wp/v2/pages';
            case 'post':
            default:
                return '/wp/v2/posts';
        }
    };

    const searchPosts =  isOnEditor() ? input => new Promise(resolve => {
        apiFetch({
            path: addQueryArgs(path(), {
                search: input,
            }),
        }).then(data => {
            const promiseOptions = data.map(item => {
                return {
                    label: item.title.rendered,
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

    const newSearchAuthor = isOnEditor() ? searchAuthor :
        () => {
            return {
                label: '',
                value: ''
            };
        };

    const newSearchCategory = isOnEditor() ? searchCategory :
        () => {
            return {
                label: '',
                value: ''
            };
        };

    const newSearchTag = isOnEditor() ? searchTag :
        () => {
            return {
                label: '',
                value: ''
            };
        };

    return [
        {
            id: 'inheritQuery',
            label: __('Inherit Query from Template', 'gutenverse'),
            description: __('Frontend will follow the current archive, search, or author template query.', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'inherit-query-notice',
            component: AlertControl,
            type: 'warning',
            show: isInheritQueryEnabled,
            children: <>
                <span>{__('When this block is used inside a Query Template, such as an Archive, Search, or Category template, the post filters are ignored.', 'gutenverse')}</span>
            </>
        },
        {
            id: 'postType',
            label: __('Include Post Type', 'gutenverse'),
            component: SelectControl,
            show: showPostFilters,
            options: [
                {
                    label: __('Page'),
                    value: 'page'
                },
                {
                    label: __('Post'),
                    value: 'post'
                },
            ]
        },
        {
            id: 'noContentText',
            label: __('Text to show if there is no content', 'gutenverse'),
            component: TextControl,
        },
        {
            id: 'numberPost',
            label: __('Number of Post initially showed', 'gutenverse'),
            component: RangeControl,
            show: showPostFilters,
            min: 1,
            max: 30,
            step: 1,
            isParseFloat: false
        },
        {
            id: 'postOffset',
            label: __('Post Offset', 'gutenverse'),
            component: NumberControl,
            show: showPostFilters,
            forceType: 'string'
        },
        {
            id: 'includePost',
            label: __('Include Post', 'gutenverse'),
            component: SelectSearchControl,
            show: showPostFilters,
            isMulti: true,
            onSearch: searchPosts
        },
        {
            id: 'excludeCurrentPost',
            label: __('Exclude Current Post', 'gutenverse'),
            description: __('Exclude current post. Use this for single post template. Only show on frontend.'),
            component: CheckboxControl,
            show: showPostFilters,
        },
        {
            id: 'excludePost',
            label: __('Exclude Post', 'gutenverse'),
            component: SelectSearchControl,
            show: showPostFilters,
            isMulti: true,
            onSearch: searchPosts
        },
        {
            id: 'includeCategory',
            label: __('Include Category', 'gutenverse'),
            component: SelectSearchControl,
            show: showPostFilters,
            isMulti: true,
            onSearch: newSearchCategory
        },
        {
            id: 'excludeCategory',
            label: __('Exclude Category', 'gutenverse'),
            component: SelectSearchControl,
            show: showPostFilters,
            isMulti: true,
            onSearch: newSearchCategory
        },
        {
            id: 'includeAuthor',
            label: __('Include Author', 'gutenverse'),
            component: SelectSearchControl,
            show: showPostFilters,
            isMulti: true,
            onSearch: newSearchAuthor
        },
        {
            id: 'includeTag',
            label: __('Include Tag', 'gutenverse'),
            component: SelectSearchControl,
            show: showPostFilters,
            isMulti: true,
            onSearch: newSearchTag
        },
        {
            id: 'excludeTag',
            label: __('Exclude Tag', 'gutenverse'),
            component: SelectSearchControl,
            show: showPostFilters,
            isMulti: true,
            onSearch: newSearchTag
        },
        {
            id: 'sortBy',
            label: __('Sort By', 'gutenverse'),
            component: SelectControl,
            show: showPostFilters,
            options: [
                {
                    value: 'latest',
                    label: __('Latest', 'gutenverse')
                },
                {
                    value: 'oldest',
                    label: __('Oldest', 'gutenverse')
                },
                {
                    value: 'alphabet_asc',
                    label: __('Alphabet Asc', 'gutenverse')
                },
                {
                    value: 'alphabet_desc',
                    label: __('Alphabet Desc', 'gutenverse')
                },
                {
                    value: 'random',
                    label: __('Random', 'gutenverse')
                },
                {
                    value: 'random_week',
                    label: __('Random Week', 'gutenverse')
                },
                {
                    value: 'random_month',
                    label: __('Random Month', 'gutenverse')
                },
                {
                    value: 'most_comment',
                    label: __('Most Comment', 'gutenverse')
                },
            ]
        },
    ];
};
