import { __ } from '@wordpress/i18n';
import { advancePanel, animationPanel, backgroundPanel, borderPanel, responsivePanel, positioningPanel, textClipPanel, advanceAnimationPanel, transformPanel, maskPanel } from 'gutenverse-core/controls';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';

export const panelList = () => {
    return [
        {
            title: __('Main Title Text Clip', 'gutenverse'),
            initialOpen: false,
            panelAdvance: true,
            panelArray: (props) => {
                const { elementId } = props;
                return textClipPanel({
                    ...props,
                    textClipSelector: `.editor-styles-wrapper .${elementId} .heading-title`,
                    textClipId: 'mainTextClip'
                });
            },
            pro: true,
            tabRole: TabStyle
        },
        {
            title: __('Focus Title Text Clip', 'gutenverse'),
            initialOpen: false,
            panelAdvance: true,
            panelArray: (props) => {
                const { elementId } = props;
                return textClipPanel({
                    ...props,
                    textClipSelector: `.editor-styles-wrapper .${elementId} .heading-focus`,
                    textClipId: 'focusTextClip'
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
                styleId: 'advanced-heading-background',
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
                styleId: 'advanced-heading-border',
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
                styleId: 'advanced-heading-animation'
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
            title: __('Advanced Animation', 'gutenverse'),
            initialOpen: false,
            panelAdvance: true,
            panelArray: (props) => advanceAnimationPanel({
                ...props,
                blockType: 'advance-heading'
            }),
            pro: true
        },
        {
            title: __('Spacing', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => advancePanel({
                ...props,
                styleId: 'advanced-heading-advance',
            }),
            tabRole: TabSetting
        }
    ];
};