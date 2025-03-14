import { __ } from '@wordpress/i18n';
import { CheckboxControl, SelectControl, TextControl } from 'gutenverse-core/controls';

export const settingPanel = ({contentType}) => {
    return [
        {
            id: 'taxonomy',
            label: __('Taxonomy', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('Post Category', 'gutenverse'),
                    value: 'category'
                },
                {
                    label: __('Post Tag', 'gutenverse'),
                    value: 'post_tag'
                },
            ],
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