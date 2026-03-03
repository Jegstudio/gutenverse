import { __ } from '@wordpress/i18n';
import { RangeControl } from 'gutenverse-core/controls';

export const panelSettings = () => {
    return [
        {
            id: 'midSize',
            label: __('Number of links', 'gutenverse'),
            component: RangeControl,
            min: 0,
            max: 5,
            step: 1,
            withInputField: false,
            help: __('Specify how many links can appear before and after the current page number. Links to the first, current and last page are always visible.', 'gutenverse')
        }
    ];
};
