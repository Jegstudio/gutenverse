import { contentPanel } from './panel-content';
import { __ } from '@wordpress/i18n';
import { contentColor } from './panel-color';
import { animationPanel, borderPanel, conditionPanel, maskPanel, responsivePanel } from 'gutenverse-core/controls';
import { advanceAnimationPanel } from 'gutenverse-core/controls';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';
import { itemDynamicPanel } from './panel-dynamic-content';

export const panelList = () => {
    return [
        {
            title: __('Content', 'gutenverse'),
            panelArray: contentPanel,
            initialOpen: true,
            tabRole: TabSetting
        },
        {
            title: __('Dynamic Item Url', 'gutenverse'),
            panelArray: itemDynamicPanel,
            initialOpen: false,
            tabRole: TabSetting,
            pro: true,
        },
        {
            title: __('Color', 'gutenverse'),
            panelArray: contentColor,
            initialOpen: false,
            tabRole: TabStyle
        },
        {
            title: __('Display', 'gutenverse'),
            initialOpen: false,
            panelArray: responsivePanel,
            tabRole: TabSetting
        },
        {
            title: __('Border', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => borderPanel({
                ...props,
                selector: `#${props.elementId}`,
                styleId: 'social-icon-border'
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
            title: __('Animation Effects', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => animationPanel({
                ...props,
                styleId: 'social-icon-animation'
            }),
            tabRole: TabSetting
        },
        {
            title: __('Advanced Animation', 'gutenverse'),
            initialOpen: false,
            panelAdvance: true,
            panelArray: (props) => advanceAnimationPanel({
                ...props,
                blockType: 'social-icon'
            }),
            pro: true
        },
        {
            title: __('Condition', 'gutenverse'),
            panelArray: conditionPanel,
            initialOpen: false,
            pro: true
        },
    ];
};