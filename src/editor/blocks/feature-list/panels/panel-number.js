import { __ } from '@wordpress/i18n';
import { ColorControl, RepeaterControl, SwitchControl, TypographyControl } from 'gutenverse-core/controls';
import { featureListGetBlockStyle } from '../styles/block-style';

export const numberPanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher,
        featureList
    } = props;

    return [
        {
            id: '__numberStyleSwitch',
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
            onChange: ({ __numberStyleSwitch }) => setSwitcher({ ...switcher, numberStyleSwitch: __numberStyleSwitch })
        },
        {
            id: 'numberTypography',
            component: TypographyControl,
            label: __('Typography', 'gutenverse'),
            show: (switcher.numberStyleSwitch === 'all' || !switcher.numberStyleSwitch),
        },
        {
            id: '__allNumberStyleSwitch',
            component: SwitchControl,
            show: switcher.numberStyleSwitch === 'all' || !switcher.numberStyleSwitch,
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
            onChange: ({ __allNumberStyleSwitch }) => setSwitcher({ ...switcher, allNumberStyleSwitch: __allNumberStyleSwitch })
        },
        {
            id: 'numberColor',
            label: __('Color', 'gutenverse'),
            component: ColorControl,
            show: (switcher.numberStyleSwitch === 'all' || !switcher.numberStyleSwitch) && (switcher.allNumberStyleSwitch === 'normal' || !switcher.allNumberStyleSwitch),
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'numberColor',
                    'selector': `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item .icon .icon-number`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'numberColorHover',
            label: __('Color', 'gutenverse'),
            component: ColorControl,
            show: (switcher.numberStyleSwitch === 'all' || !switcher.numberStyleSwitch) && switcher.allNumberStyleSwitch === 'hover',
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'numberColorHover',
                    'selector': `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item:hover .icon .icon-number`,
                    'properties': [
                        {
                            'name': 'color',
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
            show: switcher.numberStyleSwitch === 'single',
            options: [
                {
                    id: 'numberTypography',
                    component: TypographyControl,
                    label: __('Typography', 'gutenverse'),
                },
                {
                    id: '__singleNumberStyleSwitch',
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
                    onChange: ({ __singleNumberStyleSwitch }) => setSwitcher({ ...switcher, singleNumberStyleSwitch: __singleNumberStyleSwitch })
                },
                {
                    id: 'numberColor',
                    label: __('Color', 'gutenverse'),
                    component: ColorControl,
                    show: () => switcher.singleNumberStyleSwitch === 'normal' || !switcher.singleNumberStyleSwitch,
                },
                {
                    id: 'numberColorHover',
                    label: __('Color', 'gutenverse'),
                    component: ColorControl,
                    show: () => switcher.singleNumberStyleSwitch === 'hover',
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