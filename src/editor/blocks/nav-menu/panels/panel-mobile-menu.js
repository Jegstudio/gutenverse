import { __ } from '@wordpress/i18n';
import { CheckboxControl, IconSVGControl, ImageSizeControl, SelectControl, TextControl } from 'gutenverse-core/controls';

export const mobileMenuPanel = (props) => {
    const {
        mobileMenuLink,
    } = props;

    return [
        {
            id: 'mobileMenuLogo',
            label: __('Menu Logo', 'gutenverse'),
            component: ImageSizeControl
        },
        {
            id: 'mobileMenuLogoLazyLoad',
            label: __('Set Lazy Load', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'mobileMenuLink',
            label: __('Menu Link', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('Custom URL'),
                    value: 'custom'
                },
                {
                    label: __('Default (Home)'),
                    value: 'home'
                },
            ],
        },
        {
            id: 'mobileMenuURL',
            show: mobileMenuLink === 'custom',
            label: __('Mobile Menu URL', 'gutenverse'),
            component: TextControl,
        },
        {
            id: 'mobileIcon',
            label: __('Mobile Icon', 'gutenverse'),
            component: IconSVGControl,
        },
        {
            id: 'mobileCloseIcon',
            label: __('Close Icon', 'gutenverse'),
            component: IconSVGControl,
        },
        {
            id: 'mobileSubmenuClick',
            label: __('Sub Menu on Text Click', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'mobileCloseOnClick',
            label: __('Close Drawer on Click', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'mobileEnableOverlay',
            label: __('Enable Overlay', 'gutenverse'),
            component: CheckboxControl,
        },
    ];
};