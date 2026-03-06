import { __ } from '@wordpress/i18n';
import { advancePanel, animationPanel, backgroundPanel, borderPanel, conditionPanel, maskPanel, mouseMoveEffectPanel, positioningPanel, responsivePanel, transformPanel } from 'gutenverse-core/controls';
import { advanceAnimationPanel } from 'gutenverse-core/controls';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';
import { settingsPanel } from './panel-settings';
import { connectorPanel } from './panel-connector';
import { iconPanel } from './panel-icon';
import { contentPanel } from './panel-content';
import { iconWrapperPanel } from './panel-icon-wrapper';
import { numberPanel } from './panel-number';

export const panelList = () => {
    return [
        {
            title: __('Setting', 'gutenverse'),
            initialOpen: true,
            panelArray: settingsPanel,
            tabRole: TabSetting
        },
        {
            title: __('Connector Style', 'gutenverse'),
            initialOpen: true,
            panelArray: connectorPanel,
            tabRole: TabStyle
        },
        {
            title: __('Icon Wrapper Style', 'gutenverse'),
            initialOpen: false,
            panelArray: iconWrapperPanel,
            tabRole: TabStyle
        },
        {
            title: __('Icon/Image Style', 'gutenverse'),
            initialOpen: false,
            panelArray: iconPanel,
            tabRole: TabStyle
        },
        {
            title: __('Number Style', 'gutenverse'),
            initialOpen: false,
            panelArray: numberPanel,
            tabRole: TabStyle
        },
        {
            title: __('Content Style', 'gutenverse'),
            initialOpen: false,
            panelArray: contentPanel,
            tabRole: TabStyle
        },
        {
            title: __('Background', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => backgroundPanel({
                ...props,
                styleId: 'icon-box-background',
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
                styleId: 'icon-box-border',
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
                styleId: 'icon-box-animation'
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
            title: __('Advanced Animation', 'gutenverse'),
            initialOpen: false,
            panelAdvance: true,
            panelArray: (props) => advanceAnimationPanel({
                ...props,
                blockType: 'icon-box'
            }),
            pro: true
        },
        {
            title: __('Spacing', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => advancePanel({
                ...props,
                styleId: 'icon-box-advance',
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