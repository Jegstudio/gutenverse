import { __ } from '@wordpress/i18n';
import { advancePanel, animationPanel, backgroundPanel, borderPanel, conditionPanel, maskPanel, mouseMoveEffectPanel, positioningPanel, responsivePanel, transformPanel } from 'gutenverse-core/controls';
import { settingPanel } from './panel-setting';
import { galleryPanel } from './panel-gallery';
import { itemStylePanel } from './panel-item-style';
import { itemHoverPanel } from './panel-item-hover';
import { filterPanel } from './panel-filter';
import { itemCardPanel } from './panel-item-card';
import { thumbnailPanel } from './panel-thumbnail';
import { priceRatingPanel } from './panel-price-rating';
import { categoryPanel } from './panel-category';
import { loadMorePanel } from './panel-load-more';
import { loadMoreStylePanel } from './panel-load-more-style';
import { filterTabPanel } from './panel-filter-tab';
import { filterSearchPanel } from './panel-filter-search';
import { iconPanel } from './panel-icon';
import { advanceAnimationPanel } from 'gutenverse-core/controls';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';
import { lightboxStylePanel } from './panel-lightbox';

export const panelList = () => {
    return [
        {
            title: __('Setting', 'gutenverse'),
            panelArray: settingPanel,
            tabRole: TabSetting
        },
        {
            title: __('Gallery', 'gutenverse'),
            initialOpen: false,
            panelArray: galleryPanel,
            tabRole: TabSetting
        },
        {
            title: __('Filter', 'gutenverse'),
            initialOpen: false,
            panelArray: filterPanel,
            tabRole: TabSetting
        },
        {
            title: __('Load More', 'gutenverse'),
            initialOpen: false,
            panelArray: loadMorePanel,
            tabRole: TabSetting
        },
        {
            title: __('Filter Tab Styling', 'gutenverse'),
            initialOpen: false,
            panelArray: filterTabPanel,
            tabRole: TabStyle
        },
        {
            title: __('Filter & Search Styling', 'gutenverse'),
            initialOpen: false,
            panelArray: filterSearchPanel,
            tabRole: TabStyle
        },
        {
            title: __('Icon Style', 'gutenverse'),
            initialOpen: false,
            panelArray: iconPanel,
            tabRole: TabStyle
        },
        {
            title: __('Item Style', 'gutenverse'),
            initialOpen: false,
            panelArray: itemStylePanel,
            tabRole: TabStyle
        },
        {
            title: __('Item Hover', 'gutenverse'),
            initialOpen: false,
            panelArray: itemHoverPanel,
            tabRole: TabStyle
        },
        {
            title: __('Item Card', 'gutenverse'),
            initialOpen: false,
            panelArray: itemCardPanel,
            tabRole: TabStyle
        },
        {
            title: __('Lightbox Style', 'gutenverse'),
            initialOpen: false,
            panelArray: lightboxStylePanel,
            tabRole: TabStyle
        },
        {
            title: __('Load More Style', 'gutenverse'),
            initialOpen: false,
            panelArray: loadMoreStylePanel,
            tabRole: TabStyle
        },
        {
            title: __('Thumbnail', 'gutenverse'),
            initialOpen: false,
            panelArray: thumbnailPanel,
            tabRole: TabStyle
        },
        {
            title: __('Price & Rating', 'gutenverse'),
            initialOpen: false,
            panelArray: priceRatingPanel,
            tabRole: TabStyle
        },
        {
            title: __('Category', 'gutenverse'),
            initialOpen: false,
            panelArray: categoryPanel,
            tabRole: TabStyle
        },
        {
            title: __('Background', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => backgroundPanel({
                ...props,
                styleId: 'gallery-background',
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
                styleId: 'gallery-border',
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
                styleId: 'gallery-animation'
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
            title: __('Advanced Animation', 'gutenverse'),
            initialOpen: false,
            panelAdvance: true,
            panelArray: (props) => advanceAnimationPanel({
                ...props,
                blockType: 'gallery'
            }),
            pro: true
        },
        {
            title: __('Spacing', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => advancePanel({
                ...props,
                styleId: 'gallery-advance',
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