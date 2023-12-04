import { __ } from '@wordpress/i18n';
import { contentPanel } from './panel-content';
import { contentStyle } from './panel-style';
import { advancePanel, animationPanel, borderPanel, maskPanel, positioningPanel, responsivePanel, transformPanel } from 'gutenverse-core/controls';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';

export const panelList = () => {
    return [
        {
            title: __('Content', 'gutenverse'),
            panelArray: contentPanel,
            initialOpen: true,
            tabRole: TabSetting
        },
        {
            title: __('Style', 'gutenverse'),
            panelArray: contentStyle,
            initialOpen: false,
            tabRole: TabStyle
        },
        {
            title: __('Border', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => borderPanel({
                ...props,
                styleId: 'tab-border'
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
            panelArray: (props) => {
                return positioningPanel({
                    ...props,
                    inBlock : props.orientation !== 'vertical',
                    options: [
                        {
                            value: 'default',
                            label: 'Default'
                        },
                        {
                            value: 'full',
                            label: 'Full Width (100%)'
                        },
                        {
                            value: 'custom',
                            label: 'Custom'
                        }
                    ]
                });
            },
            tabRole: TabSetting
        },
        {
            title: __('Animation Effects', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => animationPanel({
                ...props,
                styleId: 'tab-animation'
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
                styleId: 'tab-advance',
            }),
            tabRole: TabSetting
        }
    ];
};
