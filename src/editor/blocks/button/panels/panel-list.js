import { __ } from '@wordpress/i18n';
import { advanceAnimationPanel, advancePanel, animationPanel, backgroundPanel, borderPanel, conditionPanel, maskPanel, mouseMoveEffectPanel, positioningPanel, responsivePanel, transformPanel } from 'gutenverse-core/controls';
import { buttonPanel } from './panel-button';
import { stylePanel } from './panel-style';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';
import { buttonBackgroundPanel } from './panel-button-background';
import { buttonBorderPanel } from './panel-button-border';
import { dynamicContentPanel } from './panel-dynamic-content';

export const panelList = () => {
    return [
        {
            title: __('Button', 'gutenverse'),
            panelArray: buttonPanel,
            tabRole: TabSetting
        },
        {
            title: __('Style', 'gutenverse'),
            panelArray: stylePanel,
            initialOpen: false,
            tabRole: TabStyle
        },
        {
            title: __('Dynamic Data', 'gutenverse'),
            panelArray: dynamicContentPanel,
            initialOpen: false,
            tabRole: TabSetting,
            pro: true,
        },
        {
            title: __('Button Background', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => buttonBackgroundPanel({
                ...props,
                styleId: 'button-background',
                normalOptions: ['default', 'gradient'],
                hoverOptions: ['default', 'gradient'],
            }),
            tabRole: TabStyle
        },
        {
            title: __('Button Border', 'gutenverse'),
            initialOpen: false,
            panelArray: buttonBorderPanel,
            tabRole: TabStyle
        },
        {
            title: __('Background', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => backgroundPanel({
                ...props,
                styleId: 'element-background',
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
                styleId: 'element-border',
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
            panelArray: (props) => transformPanel({
                ...props,
                selector: `.${props.elementId} .guten-button`,
                hoverSelector: `.${props.elementId} .guten-button:hover`,
            }),
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
                styleId: 'element-animation',
                selector: `.${props.elementId} .guten-button`
            }),
            tabRole: TabSetting
        },
        {
            title: __('Advanced Animation', 'gutenverse'),
            initialOpen: false,
            panelAdvance: true,
            panelArray: (props) => advanceAnimationPanel({
                ...props,
                blockType: 'column'
            }),
            pro: true,
        },
        {
            title: __('Spacing', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => advancePanel({
                ...props,
                styleId: 'element-advance',
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