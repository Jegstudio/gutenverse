import { __ } from '@wordpress/i18n';
import { advancePanel, animationPanel, backgroundPanel, borderPanel, positioningPanel, responsivePanel, advanceAnimationPanel, transformPanel, maskPanel, childStylePanel, textClipPanel, mouseMoveEffectPanel, conditionPanel, dynamicContentPanel, textStrokePanel } from 'gutenverse-core/controls';
import { contentPanel } from './panel-content';
import { stylePanel } from './panel-style';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';

export const panelList = () => {
    return [
        // Settings Tab
        {
            title: __('Content', 'gutenverse'),
            panelArray: contentPanel,
            tabRole: TabSetting
        },
        {
            title: __('Dynamic Data', 'gutenverse'),
            panelArray: (props) => {
                return dynamicContentPanel({
                    ...props,
                    blockType: 'text',
                    arrOfTextChilds : ['dynamicDataList']
                });
            },
            initialOpen: false,
            tabRole: TabSetting,
            pro: true,
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
                styleId: 'heading-animation'
            }),
            tabRole: TabSetting
        },
        // Stylings Tab
        {
            title: __('Style', 'gutenverse'),
            panelArray: stylePanel,
            initialOpen: false,
            tabRole: TabStyle
        },
        {
            title: __('Background', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => backgroundPanel({
                ...props,
                normalOptions: ['default', 'gradient'],
                hoverOptions: ['default', 'gradient']
            }),
            tabRole: TabStyle
        },
        {
            title: __('Border', 'gutenverse'),
            initialOpen: false,
            panelArray: borderPanel,
            tabRole: TabStyle
        },
        {
            title: __('Masking', 'gutenverse'),
            initialOpen: false,
            panelArray: maskPanel,
            tabRole: TabStyle
        },
        {
            title: __('Text Clip', 'gutenverse'),
            initialOpen: false,
            panelAdvance: true,
            panelArray: (props) => {
                const { elementId } = props;
                return textClipPanel({
                    ...props,
                    textClipSelector: `.${elementId}`,
                    textClipId: 'textClip'
                });
            },
            pro: true,
            tabRole: TabStyle
        },
        {
            title: __('Highlight Style', 'gutenverse'),
            panelArray: (props) => childStylePanel({
                ...props,
                arrOfTextChilds : ['textChilds']
            }),
            initialOpen: false,
            tabRole: TabStyle,
            pro: true
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
            title: __('Advance Animation', 'gutenverse'),
            initialOpen: false,
            panelAdvance: true,
            panelArray: (props) => advanceAnimationPanel({
                ...props,
                blockType: 'heading'
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
    ];
};