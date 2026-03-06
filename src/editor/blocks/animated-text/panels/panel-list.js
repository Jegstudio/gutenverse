import { __ } from '@wordpress/i18n';
import { advancePanel, backgroundPanel, borderPanel, conditionPanel, maskPanel, mouseMoveEffectPanel, positioningPanel, responsivePanel, textClipPanel, transformPanel } from 'gutenverse-core/controls';
import { settingPanel } from './panel-setting';
import { styleTextAnimatedPanel } from './panel-text-animated-style';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';
import { styleTextNormalPanel } from './panel-text-normal-style';
import { styleHighlightPanel } from './panel-highlighted-style';

export const panelList = () => {
    return [
        {
            title: __('Setting', 'gutenverse'),
            panelArray: settingPanel,
            tabRole: TabSetting
        },
        {
            title: __('Normal Text', 'gutenverse'),
            initialOpen: false,
            panelArray: styleTextNormalPanel,
            tabRole: TabStyle
        },
        {
            title: __('Animated Text', 'gutenverse'),
            initialOpen: false,
            panelArray: styleTextAnimatedPanel,
            tabRole: TabStyle
        },
        {
            title: __('Highlight', 'gutenverse'),
            initialOpen: false,
            panelArray: styleHighlightPanel,
            tabRole: TabStyle,
        },
        {
            title: __('Text Clip', 'gutenverse'),
            initialOpen: false,
            panelAdvance: true,
            panelArray: (props) => {
                const { elementId } = props;
                return textClipPanel({
                    ...props,
                    textClipSelector: `.editor-styles-wrapper .${elementId} .text-content .letter, .editor-styles-wrapper .${elementId} .text-content`,
                    textClipId: 'textClip'
                });
            },
            pro: true,
            tabRole: TabStyle
        },
        {
            title: __('Background', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => backgroundPanel({
                ...props,
                styleId: 'animated-text-background',
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
                styleId: 'animated-text-border',
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
                inBlock: false
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
                styleId: 'animated-text-advance',
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