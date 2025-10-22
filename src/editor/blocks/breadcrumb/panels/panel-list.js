import { __ } from '@wordpress/i18n';
import {
    backgroundPanel,
    borderPanel,
    conditionPanel,
    TabSetting,
    TabStyle,
} from 'gutenverse-core/controls';
import { settingPanel } from './panel-setting';
import { stylePanel } from './panel-style';
import { layoutPanel } from './panel-layout';

export const panelList = () => {
    return [
        {
            title: __('Setting', 'gutenverse'),
            initialOpen: false,
            panelArray: settingPanel,
            tabRole: TabSetting,
        },
        {
            title: __('Style', 'gutenverse'),
            initialOpen: false,
            panelArray: stylePanel,
            tabRole: TabStyle,
        },
        {
            title: __('Spacing', 'gutenverse'),
            initialOpen: false,
            panelArray: layoutPanel,
            tabRole: TabSetting
        },
        {
            title: __('Background', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => backgroundPanel({
                ...props,
                styleId: 'post-breadcumb-background',
                normalOptions: ['default', 'gradient'],
                hoverOptions: ['default', 'gradient'],
                normalSelector: `.${props.elementId}.guten-element.guten-breadcrumb`,
                hoverSelector: `.${props.elementId}.guten-element.guten-breadcrumb:hover`
            }),
            tabRole: TabStyle,
        },
        {
            title: __('Border', 'gutenverse'),
            initialOpen: false,
            panelArray: borderPanel,
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