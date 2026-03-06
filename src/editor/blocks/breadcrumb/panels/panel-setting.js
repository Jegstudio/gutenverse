import { __ } from '@wordpress/i18n';
import { CheckboxControl } from 'gutenverse-core/controls';
export const settingPanel = () => {
    return [
        {
            id: 'hideCurrentTitle',
            label: __('Hide Current Page', 'gutenverse'),
            description: __('Enable this option to hide the Post Title (on single post pages) or Product Title (on single product pages). On search, 404, and author pages, the current page title will still be displayed.', 'gutenverse'),
            component: CheckboxControl
        }
    ];
};