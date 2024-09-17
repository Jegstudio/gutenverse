import { __ } from '@wordpress/i18n';
import { advancePanel, animationPanel, backgroundPanel, borderPanel, conditionPanel, maskPanel, mouseMoveEffectPanel, positioningPanel, responsivePanel, transformPanel } from 'gutenverse-core/controls';
import { contentPanel } from './panel-content';
import { contentListPanel } from './panel-content-list';
import { iconPanel } from './panel-icon';
import { imagePanel } from './panel-image';
import { metaPanel } from './panel-meta';
import { paginationPanel } from './panel-pagination';
import { paginationStylePanel } from './panel-pagination-style';
import { settingPanel } from './panel-setting';
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
            title: __('Content Style', 'gutenverse'),
            initialOpen: false,
            panelArray: contentListPanel,
            tabRole: TabStyle
        },
        {
            title: __('Title', 'gutenverse'),
            initialOpen: false,
            panelArray: titlePanel,
            tabRole: TabStyle
        },
        {
            title: __('Icon', 'gutenverse'),
            initialOpen: false,
            panelArray: iconPanel,
            tabRole: TabStyle
        },
        {
            title: __('Featured Image', 'gutenverse'),
            initialOpen: false,
            panelArray: imagePanel,
            tabRole: TabStyle
        },
        {
            title: __('Meta', 'gutenverse'),
            initialOpen: false,
            panelArray: metaPanel,
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
                styleId: 'post-list-background',
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
                styleId: 'post-list-border',
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
                styleId: 'post-list-animation'
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
                styleId: 'post-list-advance',
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