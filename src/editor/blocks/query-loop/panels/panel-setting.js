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

/**
 * Helper to resolve postType to a string slug.
 * Handles both object ({ label, value }) and string formats.
 */
const resolvePostType = (postType) => {
    if (typeof postType === 'object' && postType?.value) return postType.value;
    if (typeof postType === 'string') return postType;
    return 'post';
};

/**
 * A proper React component that handles all taxonomy-related filter controls.
 * This replaces the old approach where useState/useEffect lived inside the
 * settingPanel function (which is NOT a React component), causing React error #310
 * when switching between TabSetting and TabStyle.
 */
const TaxonomyFilterControls = (props) => {
    const { values, setAttributes } = props;
    const postType = values?.postType;
    const [fetchedTaxonomies, setFetchedTaxonomies] = useState([]);

    useEffect(() => {
        const type = resolvePostType(postType);

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

    const hasCategory = fetchedTaxonomies.some(t => t.slug === 'category');
    const hasTag = fetchedTaxonomies.some(t => t.slug === 'post_tag');
    const customTaxonomies = fetchedTaxonomies.filter(t => t.slug !== 'category' && t.slug !== 'post_tag');

    return (
        <>
            {hasCategory && (
                <SelectSearchControl
                    label={__('Categories', 'gutenverse')}
                    description={__('Filter posts by category', 'gutenverse')}
                    isMulti={true}
                    value={values?.includeCategory || []}
                    onSearch={isOnEditor() ? searchCategory : () => []}
                    onValueChange={(val) => setAttributes({ includeCategory: val })}
                />
            )}
            {hasTag && (
                <SelectSearchControl
                    label={__('Tags', 'gutenverse')}
                    description={__('Filter posts by tag', 'gutenverse')}
                    isMulti={true}
                    value={values?.includeTag || []}
                    onSearch={isOnEditor() ? searchTag : () => []}
                    onValueChange={(val) => setAttributes({ includeTag: val })}
                />
            )}
            {customTaxonomies.map(tax => (
                <SelectSearchControl
                    key={tax.slug}
                    label={tax.name}
                    description={__(`Filter posts by ${tax.name}`, 'gutenverse')}
                    isMulti={true}
                    value={values?.taxonomies?.[tax.slug] || []}
                    onSearch={isOnEditor() ? searchTerms(tax) : () => []}
                    onValueChange={(newTerms) => setAttributes({
                        taxonomies: { ...values?.taxonomies, [tax.slug]: newTerms }
                    })}
                />
            ))}
            <SelectSearchControl
                label={__('Authors', 'gutenverse')}
                description={__('Filter posts by author', 'gutenverse')}
                isMulti={true}
                value={values?.includeAuthor || []}
                onSearch={isOnEditor() ? searchAuthor : () => []}
                onValueChange={(val) => setAttributes({ includeAuthor: val })}
            />
        </>
    );
};

export const settingPanel = (props) => {
    // Handle both direct attributes or props with attributes
    const attributes = props.attributes || props;
    const { postType } = attributes;

    // No React hooks here! This is a plain function, not a React component.
    // Hooks have been moved into TaxonomyFilterControls (a proper React component).

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

    return [
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
        {
            id: 'taxonomyFilters',
            component: TaxonomyFilterControls,
        },
    ];
};
