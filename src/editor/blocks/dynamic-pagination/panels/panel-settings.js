import { __ } from '@wordpress/i18n';
import { CheckboxControl, SelectControl } from 'gutenverse-core/controls';

export const panelSettings = (props) => {
    const { paginationArrow } = props;
    return [
        {
            id: 'paginationArrow',
            label: __('Pagination arrow', 'gutenverse'),
            component: SelectControl,
            options: [
                { label: __('None', 'gutenverse'), value: 'none' },
                { label: __('Arrow', 'gutenverse'), value: 'arrow' },
                { label: __('Chevron', 'gutenverse'), value: 'chevron' },
            ]
        },
        {
            id: 'showLabel',
            label: __('Show text', 'gutenverse'),
            component: CheckboxControl,
            show: paginationArrow !== 'none',
        }
    ];
};
