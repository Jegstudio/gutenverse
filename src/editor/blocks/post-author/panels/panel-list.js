/* WordPress dependencies */
import { __ } from '@wordpress/i18n';
import { advancePanel, animationPanel, backgroundPanel, borderPanel, conditionPanel, maskPanel, positioningPanel, responsivePanel, transformPanel } from 'gutenverse-core/controls';
import { settingPanel } from './panel-setting';
// import { settingPanelDeprecated } from './panel-setting-deprecated';
import { stylePanel } from './panel-style';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';
import { avatarStylePanel } from './panel-avatar-style.';
import { biographyStylePanel } from './panel-biography-style';

export const panelList = () => {
    return [
        {
            title: __('Setting', 'gutenverse'),
            panelArray: settingPanel,
            tabRole: TabSetting
        },
        /* {
            title: __('Setting (Deprecated)', 'gutenverse'),
            panelArray: settingPanelDeprecated
        }, */
        {
            title: __('Name Style', 'gutenverse'),
            initialOpen: false,
            panelArray: stylePanel,
            tabRole: TabStyle
        },
        {
            title: __('Biography Style', 'gutenverse'),
            initialOpen: false,
            panelArray: biographyStylePanel,
            tabRole: TabStyle
        },
        {
            title: __('Avatar Style', 'gutenverse'),
            initialOpen: false,
            panelArray: avatarStylePanel,
            tabRole: TabStyle
        },
        {
            title: __('Background', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => backgroundPanel({
                ...props,
                styleId: 'post-author-background',
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
                styleId: 'post-author-border',
            }),
            tabRole: TabStyle
        },
        {
            title: __('Masking', 'gutenverse'),
            initialOpen: false,
            panelArray: maskPanel,
            tabRole: TabStyle
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
            panelArray: value => positioningPanel({ ...value, inBlock: false }),
            tabRole: TabSetting
        },
        {
            title: __('Animation Effects', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => animationPanel({
                ...props,
                styleId: 'post-author-animation'
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
            title: __('Spacing', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => advancePanel({
                ...props,
                styleId: 'post-author-advance',
            }),
            tabRole: TabSetting
        },
        {
            title: __('Condition', 'gutenverse'),
            panelArray: conditionPanel,
            initialOpen: false,
            pro: true
        },
    ];
};