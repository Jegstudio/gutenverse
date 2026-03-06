import { __ } from '@wordpress/i18n';
import { advancePanel, animationPanel, backgroundPanel, borderPanel, conditionPanel, maskPanel, mouseMoveEffectPanel, positioningPanel, responsivePanel, tooltipPanel, tooltipStylePanel, transformPanel } from 'gutenverse-core/controls';
import { advanceAnimationPanel } from 'gutenverse-core/controls';
import { contentColor } from './panel-color';
import { iconPanel } from './panel-icon';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';
import { dynamicContentPanel } from './panel-dynamic-content';

export const panelList = () => {
    return [
        //tab setting
        {
            title: __('Animation Effects', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => animationPanel({
                ...props,
                styleId: 'heading-animation'
            }),
            tabRole: TabSetting
        },
        // tooltipPanel ? {
        //     title: __('Tooltip', 'gutenverse'),
        //     initialOpen: false,
        //     panelArray: tooltipPanel,
        //     tabRole: TabSetting,
        //     pro: true
        // } : {},
        {
            title: __('Mouse Move Effect', 'gutenverse'),
            initialOpen: false,
            panelArray: mouseMoveEffectPanel,
            tabRole: TabSetting,
            pro: true,
        },
        {
            title: __('Dynamic Data', 'gutenverse'),
            panelArray: dynamicContentPanel,
            initialOpen: false,
            tabRole: TabSetting,
            pro: true,
        },
        {
            title: __('Advanced Animation', 'gutenverse'),
            initialOpen: false,
            panelAdvance: true,
            panelArray: (props) => advanceAnimationPanel({
                ...props,
                blockType: 'icon'
            }),
            pro: true
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
            title: __('Transform', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => transformPanel({
                ...props,
                selector: `.${props.elementId} .guten-icon-wrapper`,
                hoverSelector: `.${props.elementId} .guten-icon-wrapper:hover`,
            }),
            pro: true
        },
        {
            title: __('Spacing', 'gutenverse'),
            initialOpen: false,
            panelArray: advancePanel,
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
            title: __('Icon', 'gutenverse'),
            panelArray: iconPanel,
            tabRole: TabStyle
        },
        {
            title: __('Icon Color', 'gutenverse'),
            initialOpen: false,
            panelArray: contentColor,
            tabRole: TabStyle
        },
        // {
        //     title: __('Tooltip Style', 'gutenverse'),
        //     initialOpen: false,
        //     panelArray: tooltipStylePanel,
        //     tabRole: TabStyle,
        //     pro: true
        // },
        {
            title: __('Background', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => backgroundPanel({
                ...props,
                styleId: 'heading-background',
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
                styleId: 'heading-border'
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