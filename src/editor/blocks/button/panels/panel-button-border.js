import { __ } from '@wordpress/i18n';
import { BorderControl, BorderResponsiveControl, BoxShadowControl, SwitchControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const buttonBorderPanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher,
        hoverWithParent,
        parentSelector,
    } = props;

    const device = getDeviceType();

    return [
        {
            id: '__buttonBorderHover',
            component: SwitchControl,
            options: [
                {
                    value: 'normal',
                    label: 'Normal'
                },
                {
                    value: 'hover',
                    label: 'Hover'
                }
            ],
            onChange: ({ __buttonBorderHover }) => setSwitcher({ ...switcher, buttonBorder: __buttonBorderHover })
        },
        {
            id: 'buttonBorder',
            show: (!switcher.buttonBorder || switcher.buttonBorder === 'normal') && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'buttonBorder',
                    'selector': `.editor-styles-wrapper .${elementId}.guten-button-wrapper .guten-button`,
                }
            ],
        },
        {
            id: 'buttonBorderResponsive',
            show: (!switcher.buttonBorder || switcher.buttonBorder === 'normal') && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'buttonBorderResponsive',
                    'responsive': true,
                    'selector': `.editor-styles-wrapper .${elementId}.guten-button-wrapper .guten-button`,
                }
            ],
        },
        {
            id: 'buttonBorderHover',
            show: switcher.buttonBorder === 'hover' && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'buttonBorderHover',
                    'selector': hoverWithParent ? parentSelector + ` .${elementId}.guten-button-wrapper .guten-button` : `.editor-styles-wrapper .${elementId}.guten-button-wrapper .guten-button:hover`,
                }
            ],
        },
        {
            id: 'buttonBorderHoverResponsive',
            show: switcher.buttonBorder === 'hover' && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'buttonBorderHoverResponsive',
                    'responsive': true,
                    'selector': hoverWithParent ? parentSelector + ` .${elementId}.guten-button-wrapper .guten-button` : `.editor-styles-wrapper .${elementId}.guten-button-wrapper .guten-button:hover`,
                }
            ],
        },
        {
            id: 'buttonBoxShadow',
            show: !switcher.buttonBorder || switcher.buttonBorder === 'normal',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            liveStyle: [
                {
                    'type': 'boxShadow',
                    'id': 'buttonBoxShadow',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.editor-styles-wrapper .${elementId}.guten-button-wrapper .guten-button`,
                }
            ]
        },
        {
            id: 'buttonBoxShadowHover',
            show: switcher.buttonBorder === 'hover',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            liveStyle: [
                {
                    'type': 'boxShadow',
                    'id': 'buttonBoxShadowHover',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': hoverWithParent ? parentSelector + ` .${elementId}.guten-button-wrapper .guten-button` : `.editor-styles-wrapper .${elementId}.guten-button-wrapper .guten-button:hover`,
                }
            ],
        }
    ];
};