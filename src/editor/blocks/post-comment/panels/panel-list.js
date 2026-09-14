import { __ } from '@wordpress/i18n';
import { advancePanel, animationPanel, backgroundPanel, borderPanel, conditionPanel, maskPanel, positioningPanel, responsivePanel, transformPanel } from 'gutenverse-core/controls';
import { avatarPanel } from './panel-avatar';
import { buttonPanel } from './panel-button';
import { inputPanel } from './panel-input';
import { replyPanel } from './panel-reply';
import { mainCommentPanel } from './panel-main-comment';
import { settingPanel } from './panel-setting';
// import { settingPanelDeprecated } from './panel-setting-deprecated';
import { headingTypographyPanel } from './panel-typography-heading';
import { textTypographyPanel } from './panel-typography-text';
import { linkTypographyPanel } from './panel-typography-link';
import { labelTypographyPanel } from './panel-typography-label';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';

export const panelList = () => {
    return [
        {
            title: __('Setting', 'gutenverse'),
            panelArray: settingPanel,
            tabRole: TabSetting
        },
        /* {
            title: __('Setting (Deprecated)', 'gutenverse'),
            panelArray: settingPanelDeprecated
        }, */
        {
            title: __('Heading Typography', 'gutenverse'),
            panelArray: headingTypographyPanel,
            tabRole: TabStyle
        },
        {
            title: __('Text Typography', 'gutenverse'),
            panelArray: textTypographyPanel,
            tabRole: TabStyle
        },
        {
            title: __('Link Typography', 'gutenverse'),
            panelArray: linkTypographyPanel,
            tabRole: TabStyle
        },
        {
            title: __('Label Typography', 'gutenverse'),
            panelArray: labelTypographyPanel,
            tabRole: TabStyle
        },
        {
            title: __('Comment Inputs', 'gutenverse'),
            panelArray: inputPanel,
            tabRole: TabStyle
        },
        {
            title: __('Comment Main', 'gutenverse'),
            panelArray: mainCommentPanel,
            tabRole: TabStyle
        },
        {
            title: __('Comment Reply', 'gutenverse'),
            panelArray: replyPanel,
            tabRole: TabStyle
        },
        {
            title: __('Avatar', 'gutenverse'),
            panelArray: avatarPanel,
            tabRole: TabStyle
        },
        {
            title: __('Submit Button', 'gutenverse'),
            panelArray: buttonPanel,
            tabRole: TabStyle
        },
        {
            title: __('Background', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => backgroundPanel({
                ...props,
                styleId: 'post-comment-background',
                normalOptions: [ 'default', 'gradient' ],
                hoverOptions: [ 'default', 'gradient' ],
            }),
            tabRole: TabStyle
        },
        {
            title: __('Border', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => borderPanel({
                ...props,
                styleId: 'post-comment-border',
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
                styleId: 'post-comment-animation'
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
            title: __('Spacing', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => advancePanel({
                ...props,
                styleId: 'post-comment-advance',
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