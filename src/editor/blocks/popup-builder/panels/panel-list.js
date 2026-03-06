import { __ } from '@wordpress/i18n';
import { animationPanel, conditionPanel, maskPanel, mouseMoveEffectPanel, transformPanel, responsivePanel } from 'gutenverse-core/controls';
import { popupPanel } from './panel-popup';
import { overlayPanel } from './panel-overlay';
import { closePanel } from './panel-close';
import { containerPanel } from './panel-container';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';
import { exitAnimationPanel } from './panel-exit-animation';

export const panelList = () => {
    return [
        {
            title: __('Popup', 'gutenverse'),
            panelArray: popupPanel,
            tabRole: TabSetting
        },{
            title: __('Container', 'gutenverse'),
            panelArray: containerPanel,
            tabRole: TabStyle
        },
        {
            title: __('Overlay', 'gutenverse'),
            panelArray: overlayPanel,
            tabRole: TabStyle
        },
        {
            title: __('Close', 'gutenverse'),
            panelArray: closePanel,
            tabRole: TabSetting
        },
        {
            title: __('Display', 'gutenverse'),
            initialOpen: false,
            panelArray: responsivePanel,
            tabRole: TabSetting
        },
        {
            title: __('Animation Effects', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => animationPanel({
                ...props,
                styleId: 'popup-builder-animation'
            }),
            tabRole: TabSetting
        },
        {
            title: __('Animation Exit', 'gutenverse'),
            initialOpen: false,
            panelArray: exitAnimationPanel,
            tabRole: TabSetting
        },
        {
            title: __('Transform', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => transformPanel({
                ...props,
                selector: `.${props.elementId} .guten-popup-content`,
                hoverSelector: `.${props.elementId} .guten-popup-content:hover`,
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
            title: __('Masking', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => maskPanel({
                ...props,
                selector: `.${props.elementId} .guten-popup-content`,
            }),
            tabRole: TabStyle
        },
        {
            title: __('Condition', 'gutenverse'),
            panelArray: conditionPanel,
            initialOpen: false,
            pro: true
        },
    ];
};