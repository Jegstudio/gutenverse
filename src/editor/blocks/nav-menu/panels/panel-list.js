import { __ } from '@wordpress/i18n';
import { advancePanel, animationPanel, backgroundPanel, borderPanel, conditionPanel, maskPanel, mouseMoveEffectPanel, positioningPanel, responsivePanel, transformPanel } from 'gutenverse-core/controls';
import { contentPanel } from './panel-content';
import { mobileMenuPanel } from './panel-mobile-menu';
import { menuWrapperPanel } from './panel-menu-wrapper';
import { itemStylePanel } from './panel-item-style';
import { SubmenuItemStyle } from './panel-submenu-style';
import { SubmenuPanelStyle } from './panel-submenu-panel';
import { hamburgerStyle } from './panel-hamburger-style';
import { mobileMenuStyle } from './panel-mobile-style';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';
import { menuPanel } from './panel-menu';
import { overlayPanel } from './panel-overlay';

export const panelList = () => {
    return [
        //tab setting
        {
            title: __('Menu', 'gutenverse'),
            panelArray: menuPanel,
            initialOpen: false,
            tabRole: TabSetting
        },
        {
            title: __('Content', 'gutenverse'),
            panelArray: contentPanel,
            initialOpen: false,
            tabRole: TabSetting
        },
        {
            title: __('Mobile Menu', 'gutenverse'),
            panelArray: mobileMenuPanel,
            initialOpen: false,
            tabRole: TabSetting
        },
        {
            title: __('Display', 'gutenverse'),
            initialOpen: false,
            panelArray: responsivePanel,
            tabRole: TabSetting
        },
        {
            title: __('Positioning', 'gutenverse'),
            initialOpen: false,
            panelArray: positioningPanel,
            tabRole: TabSetting
        },
        {
            title: __('Animation Effects', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => animationPanel({
                ...props,
                styleId: 'nav-menu-animation'
            }),
            tabRole: TabSetting
        },
        {
            title: __('Transform', 'gutenverse'),
            initialOpen: false,
            panelArray: transformPanel,
            pro: true
        },
        {
            title: __('Mouse Move Effect', 'gutenverse'),
            initialOpen: false,
            panelArray: mouseMoveEffectPanel,
            tabRole: TabSetting,
            pro: true,
        },
        {
            title: __('Spacing', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => advancePanel({
                ...props,
                styleId: 'nav-menu-advance',
            }),
            tabRole: TabSetting
        },
        {
            title: __('Condition', 'gutenverse'),
            panelArray: conditionPanel,
            initialOpen: false,
            pro: true
        },

        //tab style
        {
            title: __('Menu Wrapper Style', 'gutenverse'),
            panelArray: menuWrapperPanel,
            initialOpen: false,
            tabRole: TabStyle
        },
        {
            title: __('Item Menu Style', 'gutenverse'),
            panelArray: itemStylePanel,
            initialOpen: false,
            tabRole: TabStyle
        },
        {
            title: __('Submenu Item Style', 'gutenverse'),
            panelArray: SubmenuItemStyle,
            initialOpen: false,
            tabRole: TabStyle
        },
        {
            title: __('Submenu Panel Style', 'gutenverse'),
            panelArray: SubmenuPanelStyle,
            initialOpen: false,
            tabRole: TabStyle
        },
        {
            title: __('Hamburger Style', 'gutenverse'),
            panelArray: hamburgerStyle,
            initialOpen: false,
            tabRole: TabStyle
        },
        {
            title: __('Mobile Menu Style', 'gutenverse'),
            panelArray: mobileMenuStyle,
            initialOpen: false,
            tabRole: TabStyle
        },
        {
            title: __('Overlay Style', 'gutenverse'),
            panelArray: overlayPanel,
            initialOpen: false,
            tabRole: TabStyle
        },
        {
            title: __('Background', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => backgroundPanel({
                ...props,
                styleId: 'nav-menu-background',
                normalOptions: ['default', 'gradient'],
                hoverOptions: ['default', 'gradient'],
            }),
            tabRole: TabStyle
        },
        {
            title: __('Border', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => borderPanel({
                ...props,
                styleId: 'nav-menu-border',
            }),
            tabRole: TabStyle
        },
        {
            title: __('Masking', 'gutenverse'),
            initialOpen: false,
            panelArray: maskPanel,
            tabRole: TabStyle
        },
    ];
};