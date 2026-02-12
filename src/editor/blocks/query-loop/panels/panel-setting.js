import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';
import { NumberControl, RangeControl, SelectSearchControl, SelectControl, CheckboxControl } from 'gutenverse-core/controls';
import { addQueryArgs } from '@wordpress/url';
import { searchAuthor, searchCategory, searchTag } from 'gutenverse-core/requests';
import { isOnEditor } from 'gutenverse-core/helper';
import { useState, useEffect } from '@wordpress/element';

const searchTerms = (taxonomy) => (input) => new Promise(resolve => {
    const base = taxonomy.rest_base;
    const namespace = taxonomy.rest_namespace || 'wp/v2';
    apiFetch({
        path: addQueryArgs(`/${namespace}/${base}`, {
            search: input,
            per_page: 20
        }),
    }).then(data => {
        resolve(data.map(term => ({
            label: term.name,
            value: term.id
        })));
    }).catch(() => {
        resolve([]);
    });
});

const DynamicTaxonomiesControl = (props) => {
    const { value, onChange, taxonomiesList } = props;

    // Fallback: use setAttributes if onChange is missing.
    // This handles cases where BlockPanelController doesn't inject onChange for custom IDs.
    const updateTaxonomies = (newValue) => {
        if (typeof onChange === 'function') {
            onChange(newValue);
        } else if (props.setAttributes) {
            props.setAttributes({ taxonomies: newValue });
        }
    };

    return (
        <>
            {taxonomiesList.map(tax => (
                <SelectSearchControl
                    key={tax.slug}
                    label={tax.name}
                    description={__(`Filter posts by ${tax.name}`, 'gutenverse')}
                    isMulti={true}
                    value={value?.[tax.slug] || []}
                    onSearch={isOnEditor() ? searchTerms(tax) : () => []}
                    onValueChange={(newTerms) => updateTaxonomies({ ...value, [tax.slug]: newTerms })}
                />
            ))}
        </>
    );
};

export const settingPanel = (props) => {
    // Handle both direct attributes or props with attributes
    const attributes = props.attributes || props;
    const { postType } = attributes;

    const [fetchedTaxonomies, setFetchedTaxonomies] = useState([]);

    useEffect(() => {
        let type = 'post';
        // Handle postType object (label/value) or string
        if (typeof postType === 'object' && postType?.value) {
            type = postType.value;
        } else if (typeof postType === 'string') {
            type = postType;
        }

        apiFetch({
            path: addQueryArgs('/wp/v2/taxonomies', {
                type: type,
                context: 'view'
            })
        }).then(data => {
            setFetchedTaxonomies(Object.values(data));
        }).catch(() => {
            setFetchedTaxonomies([]);
        });
    }, [postType]);

    const searchPosts = isOnEditor() ? (input) => new Promise(resolve => {
        let type = 'post';

        if (typeof postType === 'object' && postType.value) {
            type = postType.value;
        } else if (typeof postType === 'string') {
            type = postType;
        }

        const getPath = () => {
            if (type === 'page') return Promise.resolve('/wp/v2/pages');
            if (type === 'post') return Promise.resolve('/wp/v2/posts');

            return apiFetch({ path: `/wp/v2/types/${type}` })
                .then(typeInfo => {
                    const base = typeInfo.rest_base || type;
                    const namespace = typeInfo.rest_namespace || 'wp/v2';
                    return `/${namespace}/${base}`;
                })
                .catch(() => '/wp/v2/posts');
        };

        getPath().then(endpoint => {
            apiFetch({
                path: addQueryArgs(endpoint, {
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
        });
    }) : () => {
        return {
            label: '',
            value: ''
        };
    };

    const searchPostTypes = isOnEditor() ? (input) => new Promise(resolve => {
        apiFetch({
            path: '/gutenverse/v1/post-types',
        }).then(data => {
            const filtered = data.filter(type => type.label.toLowerCase().includes(input.toLowerCase()) && !['attachment', 'gutenverse-entries'].includes(type.value));
            resolve(filtered);
        }).catch(() => {
            resolve([]);
        });
    }) : () => {
        return {
            label: '',
            value: ''
        };
    };

    const controls = [
        {
            id: 'inheritQuery',
            label: __('Inherit Query from Template', 'gutenverse'),
            description: __('Enable this option to use the default query based on the template. Useful for archive pages like blog, category, tag pages, etc.', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'postType',
            label: __('Post Type', 'gutenverse'),
            component: SelectSearchControl,
            isMulti: false,
            onSearch: searchPostTypes
        },
        {
            id: 'numberPost',
            label: __('Posts Per Page', 'gutenverse'),
            description: __('Number of posts to display', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 30,
            step: 1,
            isParseFloat: false
        },
        {
            id: 'postOffset',
            label: __('Offset', 'gutenverse'),
            description: __('Number of posts to skip', 'gutenverse'),
            component: NumberControl,
        },
        {
            id: 'sortBy',
            label: __('Order By', 'gutenverse'),
            component: SelectControl,
            options: [
                { value: 'latest', label: __('Newest to Oldest', 'gutenverse') },
                { value: 'oldest', label: __('Oldest to Newest', 'gutenverse') },
                { value: 'alphabet_asc', label: __('A → Z', 'gutenverse') },
                { value: 'alphabet_desc', label: __('Z → A', 'gutenverse') },
            ]
        },
        {
            id: 'includePost',
            label: __('Include Posts', 'gutenverse'),
            description: __('Search and select specific posts to include', 'gutenverse'),
            component: SelectSearchControl,
            isMulti: true,
            onSearch: searchPosts
        },
        {
            id: 'excludePost',
            label: __('Exclude Posts', 'gutenverse'),
            description: __('Search and select specific posts to exclude', 'gutenverse'),
            component: SelectSearchControl,
            isMulti: true,
            onSearch: searchPosts
        },
    ];

    if (fetchedTaxonomies.some(t => t.slug === 'category')) {
        controls.push({
            id: 'includeCategory',
            label: __('Categories', 'gutenverse'),
            description: __('Filter posts by category', 'gutenverse'),
            component: SelectSearchControl,
            isMulti: true,
            onSearch: isOnEditor() ? searchCategory : () => []
        });
    }

    if (fetchedTaxonomies.some(t => t.slug === 'post_tag')) {
        controls.push({
            id: 'includeTag',
            label: __('Tags', 'gutenverse'),
            description: __('Filter posts by tag', 'gutenverse'),
            component: SelectSearchControl,
            isMulti: true,
            onSearch: isOnEditor() ? searchTag : () => []
        });
    }

    const customTaxonomies = fetchedTaxonomies.filter(t => t.slug !== 'category' && t.slug !== 'post_tag');

    if (customTaxonomies.length > 0) {
        controls.push({
            id: 'taxonomies',
            component: DynamicTaxonomiesControl,
            taxonomiesList: customTaxonomies
        });
    }

    // Default to showing Author if standard post type, or if we can't determine otherwise.
    controls.push({
        id: 'includeAuthor',
        label: __('Authors', 'gutenverse'),
        description: __('Filter posts by author', 'gutenverse'),
        component: SelectSearchControl,
        isMulti: true,
        onSearch: isOnEditor() ? searchAuthor : () => []
    });

    return controls;
};
