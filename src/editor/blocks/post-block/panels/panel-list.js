import { __ } from '@wordpress/i18n';
import { advancePanel, animationPanel, backgroundPanel, borderPanel, conditionPanel, maskPanel, mouseMoveEffectPanel, positioningPanel, responsivePanel, transformPanel } from 'gutenverse-core/controls';
import { categoryPanel } from './panel-category';
import { commentPanel } from './panel-comment';
import { contentPanel } from './panel-content';
import { contentContainerPanel } from './panel-content-container';
import { excerptPanel } from './panel-excerpt';
import { paginationPanel } from './panel-pagination';
import { paginationStylePanel } from './panel-pagination-style';
import { postItemPanel } from './panel-post-item';
import { postmetaPanel } from './panel-postmeta';
import { readmorePanel } from './panel-readmore';
import { settingPanel } from './panel-setting';
import { thumbnailPanel } from './panel-thumbnail';
import { thumbnailContainerPanel } from './panel-thumbnail-container';
import { thumbnailPanelOverlay } from './panel-thumbnail-overlay';
import { titlePanel } from './panel-title';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';

export const panelList = () => {
    return [
        {
            title: __('Setting', 'gutenverse'),
            panelArray: settingPanel,
            tabRole: TabSetting
        },
        {
            title: __('Content Setting', 'gutenverse'),
            initialOpen: false,
            panelArray: contentPanel,
            tabRole: TabSetting
        },
        {
            title: __('Pagination', 'gutenverse'),
            initialOpen: false,
            panelArray: paginationPanel,
            tabRole: TabSetting
        },
        {
            title: __('Post Item', 'gutenverse'),
            initialOpen: false,
            panelArray: postItemPanel,
            tabRole: TabStyle
        },
        {
            title: __('Thumbnail', 'gutenverse'),
            initialOpen: false,
            panelArray: thumbnailPanel,
            tabRole: TabStyle
        },
        {
            title: __('Thumbnail Overlay', 'gutenverse'),
            initialOpen: false,
            panelArray: thumbnailPanelOverlay,
            tabRole: TabStyle
        },
        {
            title: __('Thumbnail Container', 'gutenverse'),
            initialOpen: false,
            panelArray: thumbnailContainerPanel,
            tabRole: TabStyle
        },
        {
            title: __('Content Container', 'gutenverse'),
            initialOpen: false,
            panelArray: contentContainerPanel,
            tabRole: TabStyle
        },
        {
            title: __('Category', 'gutenverse'),
            initialOpen: false,
            panelArray: categoryPanel,
            tabRole: TabStyle
        },
        {
            title: __('Title', 'gutenverse'),
            initialOpen: false,
            panelArray: titlePanel,
            tabRole: TabStyle
        },
        {
            title: __('Excerpt', 'gutenverse'),
            initialOpen: false,
            panelArray: excerptPanel,
            tabRole: TabStyle
        },
        {
            title: __('Read More', 'gutenverse'),
            initialOpen: false,
            panelArray: readmorePanel,
            tabRole: TabStyle
        },
        {
            title: __('Comment', 'gutenverse'),
            initialOpen: false,
            panelArray: commentPanel,
            tabRole: TabStyle
        },
        {
            title: __('Post Meta', 'gutenverse'),
            initialOpen: false,
            panelArray: postmetaPanel,
            tabRole: TabStyle
        },
        {
            title: __('Pagination Style', 'gutenverse'),
            initialOpen: false,
            panelArray: paginationStylePanel,
            tabRole: TabStyle
        },
        {
            title: __('Background', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => backgroundPanel({
                ...props,
                styleId: 'post-block-background',
                normalOptions: [ 'default', 'gradient' ],
                hoverOptions: [ 'default', 'gradient' ],
                normalSelector: `.${props.elementId}.guten-element`,
                hoverSelector: `.${props.elementId}.guten-element:hover`,
            }),
            tabRole: TabStyle
        },
        {
            title: __('Border', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => borderPanel({
                ...props,
                selector: `.${props.elementId}.guten-element`,
                styleId: 'post-block-border',
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
                styleId: 'post-block-animation'
            }),
            tabRole: TabSetting
        },
        {
            title: __('Transform', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => transformPanel({
                ...props,
                selector: `.${props.elementId} .guten-posts`,
                hoverSelector: `.${props.elementId} .guten-posts:hover`,
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
            title: __('Spacing', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => advancePanel({
                ...props,
                selector: `.editor-styles-wrapper .is-root-container .${props.elementId}.guten-element`,
                styleId: 'post-block-advance',
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