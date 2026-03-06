import { TabSetting, TabStyle, childStylePanel, dynamicContentPanel } from 'gutenverse-core/controls';
import { __ } from '@wordpress/i18n';
import { panelBody } from './panel-body';


export const panelList = () => {
    return [
        {
            title: __('Dynamic Data', 'gutenverse'),
            panelArray: (props) => {
                return dynamicContentPanel({
                    ...props,
                    blockType: 'text',
                    arrOfTextChilds : ['dynamicDataList']
                });
            },
            initialOpen: false,
            tabRole: TabSetting,
            pro: true,
        },
        {
            title: __('Body', 'gutenverse'),
            panelArray: panelBody,
            tabRole: TabStyle,
            initialOpen: true,
            pro: false
        },
        {
            title: __('Highlight Style', 'gutenverse'),
            panelArray: (props) => childStylePanel({
                ...props,
                arrOfTextChilds : ['titleChilds']
            }),
            tabRole: TabStyle,
            pro: true
        },
    ];
};
