import { __ } from '@wordpress/i18n';
import menuControl from '../control/menu-control';
import { TextControl } from 'gutenverse-core/controls';

export const menuPanel = () => {
    return [
        {
            id: 'menuId',
            label: __('Menu', 'gutenverse'),
            component: menuControl
        },
        {
            id: 'menuAriaLabel',
            label: __('Aria Label', 'gutenverse'),
            component: TextControl
        }
    ];
};