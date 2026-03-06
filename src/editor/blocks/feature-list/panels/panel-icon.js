import { __ } from '@wordpress/i18n';
import { ColorControl, RepeaterControl, SizeControl, SwitchControl } from 'gutenverse-core/controls';
import { featureListGetBlockStyle } from '../styles/block-style';

export const iconPanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher,
        featureList
    } = props;
    return [
        {
            id: '__iconStyleSwitch',
            component: SwitchControl,
            options: [
                {
                    value: 'all',
                    label: 'All'
                },
                {
                    value: 'single',
                    label: 'Single'
                }
            ],
            onChange: ({ __iconStyleSwitch }) => setSwitcher({ ...switcher, iconStyleSwitch: __iconStyleSwitch })
        },
        {
            id: 'iconSize',
            component: SizeControl,
            label: __('Size', 'gutenverse'),
            show: (switcher.iconStyleSwitch === 'all' || !switcher.iconStyleSwitch),
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'iconSize',
                    'responsive': true,
                    'selector': `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item .icon i`,
                    'properties': [
                        {
                            'name': 'font-size',
                            'valueType': 'direct'
                        }
                    ]
                },
                {
                    'type': 'unitPoint',
                    'id': 'iconSize',
                    'responsive': true,
                    'selector': `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item .icon img`,
                    'properties': [
                        {
                            'name': 'font-size',
                            'valueType': 'direct'
                        }
                    ]
                },
                {
                    'type': 'unitPoint',
                    'id': 'iconSize',
                    'responsive': true,
                    'selector': `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item .icon svg`,
                    'properties': [
                        {
                            'name': 'font-size',
                            'valueType': 'direct'
                        }
                    ]
                },
            ]
        },
        {
            id: '__allIconStyleSwitch',
            component: SwitchControl,
            show: switcher.iconStyleSwitch === 'all' || !switcher.iconStyleSwitch,
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
            onChange: ({ __allIconStyleSwitch }) => setSwitcher({ ...switcher, allIconStyleSwitch: __allIconStyleSwitch })
        },
        {
            id: 'iconColor',
            label: __('Icon Color', 'gutenverse'),
            component: ColorControl,
            show: (switcher.iconStyleSwitch === 'all' || !switcher.iconStyleSwitch) && (switcher.allIconStyleSwitch === 'normal' || !switcher.allIconStyleSwitch),
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'iconColor',
                    'selector': `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item .icon i`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                },
                {
                    'type': 'color',
                    'id': 'iconColor',
                    'selector': `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item .icon svg`,
                    'properties': [
                        {
                            'name': 'fill',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'iconColorHover',
            label: __('Icon Color', 'gutenverse'),
            component: ColorControl,
            show: (switcher.iconStyleSwitch === 'all' || !switcher.iconStyleSwitch) && switcher.allIconStyleSwitch === 'hover',
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'iconColorHover',
                    'selector': `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item:hover .icon i`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                },
                {
                    'type': 'color',
                    'id': 'iconColorHover',
                    'selector': `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item:hover .icon svg`,
                    'properties': [
                        {
                            'name': 'fill',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'featureList',
            component: RepeaterControl,
            titleFormat: '<strong><%= value.title ? value.title : "Feature List" %></strong>',
            isAddNew: false,
            show: switcher.iconStyleSwitch === 'single',
            options: [
                {
                    id: 'iconSize',
                    component: SizeControl,
                    label: __('Size', 'gutenverse'),
                    allowDeviceControl: true,
                },
                {
                    id: '__singleIconStyleSwitch',
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
                    onChange: ({ __singleIconStyleSwitch }) => setSwitcher({ ...switcher, singleIconStyleSwitch: __singleIconStyleSwitch })
                },
                {
                    id: 'iconColor',
                    label: __('Icon Color', 'gutenverse'),
                    component: ColorControl,
                    show: () => switcher.singleIconStyleSwitch === 'normal' || !switcher.singleIconStyleSwitch,
                },
                {
                    id: 'iconColorHover',
                    label: __('Icon Color', 'gutenverse'),
                    component: ColorControl,
                    show: () => switcher.singleIconStyleSwitch === 'hover',

                }
            ],
            liveStyle : [
                {
                    'type': 'repeater',
                    'id': 'featureList',
                    'repeaterOpt': featureListGetBlockStyle(elementId, featureList)
                }
            ]
        },
    ];
};