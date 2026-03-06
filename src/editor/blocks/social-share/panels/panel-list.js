import { __ } from '@wordpress/i18n';
import { contentStyle } from './panel-style';
import { panelItemStyle } from './panel-item-style';
import { panelItemSpacing } from './panel-spacing';
import {
    advancePanel,
    animationPanel,
    backgroundPanel,
    borderPanel,
    conditionPanel,
    maskPanel,
    mouseMoveEffectPanel,
    positioningPanel,
    responsivePanel,
    transformPanel
} from 'gutenverse-core/controls';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';
import { panelSettings } from './panel-settings';

export const panelList = () => {
    return [
        {
            title: __('Setting', 'gutenverse'),
            panelArray: panelSettings,
            initialOpen: false,
            tabRole: TabSetting
        },
        {
            title: __('Style', 'gutenverse'),
            panelArray: contentStyle,
            initialOpen: true,
            tabRole: TabStyle
        },
        {
            title: __('Item Style', 'gutenverse'),
            panelArray: panelItemStyle,
            initialOpen: false,
            tabRole: TabStyle
        },
        {
            title: __('Item Spacing', 'gutenverse'),
            panelArray: panelItemSpacing,
            initialOpen: false,
            tabRole: TabStyle
        },
        {
            title: __('Background', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => backgroundPanel({
                ...props,
                styleId: 'social-share',
                normalOptions: ['default', 'gradient'],
                hoverOptions: ['default', 'gradient']
            }),
            tabRole: TabStyle
        },
        {
            title: __('Border', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => borderPanel({
                ...props,
                styleId: 'social-share-border'
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
            panelArray: (props) => positioningPanel({
                ...props,
                selector: `.${props.elementId}.guten-element, .${props.elementId}.guten-element.horizontal `
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
            title: __('Animation Effects', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => animationPanel({
                ...props,
                styleId: 'social-share-animation'
            }),
            tabRole: TabSetting
        },
        {
            title: __('Spacing', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => advancePanel({
                ...props,
                styleId: 'social-share-advance',
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