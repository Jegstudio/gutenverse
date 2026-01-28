/* WordPress dependencies */
import { __ } from '@wordpress/i18n';
import { advancePanel, animationPanel, backgroundPanel, borderPanel, conditionPanel, maskPanel, positioningPanel, responsivePanel, transformPanel, LockedProPanel, LockedGalleryPostFormat, LockedVideoPostFormat } from 'gutenverse-core/controls';
import { settingPanel } from './panel-setting';
import { stylePanel } from './panel-style';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';
import { dataPanel } from './panel-data';
import { applyFilters } from '@wordpress/hooks';

export const panelList = () => {
    return [
        {
            title: __('Setting', 'gutenverse'),
            panelArray: settingPanel,
            tabRole: TabSetting
        },
        {
            title: __('Image Data', 'gutenverse'),
            panelArray: dataPanel,
            tabRole: TabSetting
        },
        {
            id: 'gallery-setting',
            title: __('Gallery Setting', 'gutenverse'),
            tabRole: TabSetting,
            pro: true,
            panelArray: (props) => {
                return applyFilters(
                    'gutenverse.post-featured-image.gallery-setting',
                    [{
                        component: LockedGalleryPostFormat,
                    }],
                    props
                );
            },
        },
        {
            id: 'video-setting',
            title: __('Video Setting', 'gutenverse'),
            tabRole: TabSetting,
            pro: true,
            panelArray: (props) => {
                return applyFilters(
                    'gutenverse.post-featured-image.video-setting',
                    [{
                        component: LockedVideoPostFormat,
                    }],
                    props
                );
            },
        },
        {
            title: __('Style', 'gutenverse'),
            initialOpen: false,
            panelArray: stylePanel,
            tabRole: TabStyle
        },
        {
            id: 'gallery-nav-style',
            title: __('Gallery Navigation Style', 'gutenverse'),
            tabRole: TabStyle,
            pro: true,
            panelArray: (props) => {
                return applyFilters(
                    'gutenverse.post-featured-image.gallery-nav-style',
                    [{
                        component: LockedGalleryPostFormat,
                    }],
                    props
                );
            },
        },
        {
            id: 'gallery-dots-style',
            title: __('Gallery Dots Style', 'gutenverse'),
            tabRole: TabStyle,
            pro: true,
            panelArray: (props) => {
                return applyFilters(
                    'gutenverse.post-featured-image.gallery-dots-style',
                    [{
                        component: LockedGalleryPostFormat,
                    }],
                    props
                );
            },
        },
        {
            title: __('Background', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => backgroundPanel({
                ...props,
                styleId: 'post-featured-image-background',
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
                styleId: 'post-featured-image-border',
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
                styleId: 'post-featured-image-animation'
            }),
            tabRole: TabSetting
        },
        {
            title: __('Transform', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => transformPanel({
                ...props,
                selector: `.${props.elementId} img`,
                hoverSelector: `.${props.elementId} img:hover`,
            }),
            pro: true
        },
        {
            title: __('Spacing', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => advancePanel({
                ...props,
                styleId: 'post-featured-image-advance',
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