import { __ } from '@wordpress/i18n';
import { useMemo } from '@wordpress/element';
import { CheckboxControl, SelectControl, TextControl } from 'gutenverse-core/controls';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

export const settingPanel = (props) => {
    const { context, contentType } = props;

    const taxonomies = useSelect(
        (select) => {
            const { getTaxonomies } = select(coreStore);
            return getTaxonomies({ per_page: -1 });
        },
        []
    );

    const allTaxonomies = useMemo(() => {
        if (!taxonomies) {
            return [];
        }

        return taxonomies
            .filter((tax) => tax.types && tax.types.includes(context?.postType || 'post'))
            .map((tax) => ({ label: tax.name, value: tax.slug }));
    }, [taxonomies, context?.postType]);

    return [
        {
            id: 'taxonomy',
            label: __('Taxonomy', 'gutenverse'),
            description: __('Search and select a taxonomy.', 'gutenverse'),
            component: SelectControl,
            options: allTaxonomies,
        },
        {
            id: 'contentType',
            label: __('Content Type', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('One Line', 'gutenverse'),
                    value: 'string'
                },
                {
                    label: __('Block', 'gutenverse'),
                    value: 'block'
                },
            ],
        },
        {
            id: 'inlineDisplay',
            label: __('Display Content Inline', 'gutenverse'),
            show: contentType === 'block',
            component: CheckboxControl,
        },
        {
            id: 'separator',
            label: __('Separator', 'gutenverse'),
            show: contentType === 'string',
            component: TextControl
        },
        {
            id: 'htmlTag',
            label: __('HTML Tag', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('H1'),
                    value: 'h1'
                },
                {
                    label: __('H2'),
                    value: 'h2'
                },
                {
                    label: __('H3'),
                    value: 'h3'
                },
                {
                    label: __('H4'),
                    value: 'h4'
                },
                {
                    label: __('H5'),
                    value: 'h5'
                },
                {
                    label: __('H6'),
                    value: 'h6'
                },
                {
                    label: __('P'),
                    value: 'p'
                },
            ],
        },
        {
            id: 'linkTo',
            label: __('Link To', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('None'),
                    value: 'none'
                },
                {
                    label: __('Terms'),
                    value: 'term'
                },
            ],
        },
    ];
};