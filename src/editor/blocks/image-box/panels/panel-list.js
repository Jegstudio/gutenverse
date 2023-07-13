import { __ } from '@wordpress/i18n';
import { advancePanel, animationPanel, backgroundPanel, borderPanel, positioningPanel, responsivePanel } from 'gutenverse-core-editor/controls';
import { panelImage } from './panel-image';
import { panelBody } from './panel-body';
import { panelImageStyle } from './panel-image-style';
import { panelBodyStyle } from './panel-body-style';
import { panelTitleStyle } from './panel-title-style';
import { panelDescriptionStyle } from './panel-description-style';
import { panelFloating } from './panel-floating';
// import { advanceAnimationPanel } from 'gutenverse-core-editor/controls';
import { TabSetting, TabStyle } from 'gutenverse-core-editor/controls';

export const panelList = () => {
    return [
        {
            title: __('Image', 'gutenverse'),
            panelArray: panelImage,
            initialOpen: false,
            tabRole: TabSetting
        },
        {
            title: __('Body', 'gutenverse'),
            panelArray: panelBody,
            initialOpen: false,
            tabRole: TabSetting
        },
        {
            title: __('Image Style', 'gutenverse'),
            panelArray: panelImageStyle,
            initialOpen: false,
            tabRole: TabStyle
        },
        {
            title: __('Body Style', 'gutenverse'),
            panelArray: panelBodyStyle,
            initialOpen: false,
            tabRole: TabStyle
        },
        {
            title: __('Title Style', 'gutenverse'),
            panelArray: panelTitleStyle,
            initialOpen: false,
            tabRole: TabStyle
        },
        {
            title: __('Description Style', 'gutenverse'),
            panelArray: panelDescriptionStyle,
            initialOpen: false,
            tabRole: TabStyle
        },
        {
            title: __('Floating', 'gutenverse'),
            panelArray: panelFloating,
            initialOpen: false,
            tabRole: TabStyle
        },
        {
            title: __('Background', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => backgroundPanel({
                ...props,
                styleId: 'image-box-background',
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
                styleId: 'image-box-border',
            }),
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
                styleId: 'image-box-animation'
            }),
            tabRole: TabSetting
        },
        // {
        //     title: __('Advance Animation', 'gutenverse'),
        //     initialOpen: false,
        //     panelAdvance: true,
        //     panelArray: (props) => advanceAnimationPanel({
        //         ...props,
        //         blockType: 'image-box'
        //     }),
        //     pro: true
        // },
        {
            title: __('Spacing', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => advancePanel({
                ...props,
                styleId: 'image-box-advance',
            }),
            tabRole: TabSetting
        }
    ];
};