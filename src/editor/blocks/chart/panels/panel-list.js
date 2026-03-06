import { __ } from '@wordpress/i18n';
import { advancePanel, animationPanel, backgroundPanel, borderPanel, conditionPanel, maskPanel, mouseMoveEffectPanel, positioningPanel, responsivePanel, transformPanel } from 'gutenverse-core/controls';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';
import { contentPanel } from './panel-content';
import { settingPanel } from './panel-setting';
import { chartItemPanel } from './panel-chart-item';
import { chartPanel } from './panel-chart';
import { cardPanel } from './panel-card';

export const panelList = () => {
    return [
        {
            title: __('Setting', 'gutenverse'),
            initialOpen: true,
            panelArray: settingPanel,
            tabRole: TabSetting
        },
        {
            title: __('Content', 'gutenverse'),
            initialOpen: false,
            panelArray: contentPanel,
            tabRole: TabSetting
        },
        {
            title: __('Chart Item', 'gutenverse'),
            initialOpen: false,
            panelArray: chartItemPanel,
            tabRole: TabSetting
        },
        {
            title: __('Card Style', 'gutenverse'),
            initialOpen: false,
            panelArray: cardPanel,
            tabRole: TabStyle
        },
        {
            title: __('Chart Style', 'gutenverse'),
            initialOpen: false,
            panelArray: chartPanel,
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
    ];
};