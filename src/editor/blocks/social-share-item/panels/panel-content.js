import { __ } from '@wordpress/i18n';
import { CheckboxControl, TextControl, SelectControl } from 'gutenverse-core/controls';

export const panelContent = (props) => {
    const {
        showText,
        type
    } = props;

    return [
        {
            id: 'showText',
            label: __('Show Share Text', 'gutenverse'),
            description: __('Display custom text beside icon', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'text',
            show: showText,
            label: __('Share Text', 'gutenverse'),
            component: TextControl,
        },
        {
            id: 'selectedIcon',
            show: 'twitter' === type,
            label: __('Version', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('Twitter Bird', 'gutenverse'),
                    value: 'twitter'
                },
                {
                    label: __('Twitter X', 'gutenverse'),
                    value: 'x-twitter'
                },
            ],
        },
    ];
};