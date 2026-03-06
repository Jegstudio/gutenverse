import { __ } from '@wordpress/i18n';
import { BackgroundControl, BorderResponsiveControl, RangeControl, RepeaterControl, SelectControl, SizeControl, SwitchControl } from 'gutenverse-core/controls';
import { featureListGetBlockStyle } from '../styles/block-style';

export const iconWrapperPanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher,
        featureList
    } = props;
    return [
        {
            id: '__iconWrapperStyleSwitch',
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
            onChange: ({ __iconWrapperStyleSwitch }) => setSwitcher({ ...switcher, iconWrapperStyleSwitch: __iconWrapperStyleSwitch })
        },
        {
            id: 'iconWrapperSize',
            label: __('Size', 'gutenverse'),
            show: switcher.iconWrapperStyleSwitch === 'all' || !switcher.iconWrapperStyleSwitch,
            component: RangeControl,
            min: 10,
            max: 500,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'iconWrapperSize',
                    'responsive': true,
                    'selector': `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item .icon-wrapper .icon`,
                    'properties': [
                        {
                            'name': 'width',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        },
                        {
                            'name': 'height',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ]
                },
                {
                    'type': 'plain',
                    'id': 'iconWrapperSize',
                    'selector': `.${elementId}.guten-feature-list`,
                    'responsive': true,
                    'properties': [
                        {
                            'name': '--icon-size',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            id: 'iconContentSpacing',
            component: SizeControl,
            label: __('Content Spacing', 'gutenverse'),
            allowDeviceControl: true,
            show: switcher.iconWrapperStyleSwitch === 'all' || !switcher.iconWrapperStyleSwitch,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 1000,
                    step: 1,
                    unit: 'px',
                },
                ['%']: {
                    text: '%',
                    min: 1,
                    max: 100,
                    step: 1,
                    unit: '%',
                },
                vh: {
                    text: 'vh',
                    min: 1,
                    max: 100,
                    step: 1,
                    unit: 'vh',
                },
            },
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'iconContentSpacing',
                    'responsive': true,
                    'selector': `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item`,
                    'properties': [
                        {
                            'name': 'gap',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'iconWrapperHorizontalAlignment',
            label: __('Horizontal Align', 'gutenverse'),
            show: switcher.iconWrapperStyleSwitch === 'all' || !switcher.iconWrapperStyleSwitch,
            component: SelectControl,
            options: [
                {
                    label: __('Start'),
                    value: 'start'
                },
                {
                    label: __('Center'),
                    value: 'center'
                },
                {
                    label: __('End'),
                    value: 'end'
                },
            ],
        },
        {
            id: 'iconWrapperVerticalAlignment',
            label: __('Vertical Align', 'gutenverse'),
            show: switcher.iconWrapperStyleSwitch === 'all' || !switcher.iconWrapperStyleSwitch,
            component: SelectControl,
            options: [
                {
                    label: __('Top'),
                    value: 'start'
                },
                {
                    label: __('Middle'),
                    value: 'center'
                },
                {
                    label: __('Bottom'),
                    value: 'end'
                },
            ],
        },
        {
            id: '__allIconWrapperStyleSwitch',
            component: SwitchControl,
            show: switcher.iconWrapperStyleSwitch === 'all' || !switcher.iconWrapperStyleSwitch,
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
            onChange: ({ __allIconWrapperStyleSwitch }) => setSwitcher({ ...switcher, allIconWrapperStyleSwitch: __allIconWrapperStyleSwitch })
        },
        {
            id: 'iconBackground',
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            show: (switcher.iconWrapperStyleSwitch === 'all' || !switcher.iconWrapperStyleSwitch) && (switcher.allIconWrapperStyleSwitch === 'normal' || !switcher.allIconWrapperStyleSwitch),
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'iconBackground',
                    'selector': `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item .icon`,
                }
            ]
        },
        {
            id: 'iconBackgroundHover',
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            show: (switcher.iconWrapperStyleSwitch === 'all' || !switcher.iconWrapperStyleSwitch) && switcher.allIconWrapperStyleSwitch === 'hover',
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'iconBackgroundHover',
                    'selector': `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item:hover .icon`,
                }
            ]
        },
        {
            id: 'iconBorder',
            show: (switcher.iconWrapperStyleSwitch === 'all' || !switcher.iconWrapperStyleSwitch) && (switcher.allIconWrapperStyleSwitch === 'normal' || !switcher.allIconWrapperStyleSwitch),
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'iconBorder',
                    'selector': `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item .icon`,
                }
            ]
        },
        {
            id: 'iconBorderHover',
            show: (switcher.iconWrapperStyleSwitch === 'all' || !switcher.iconWrapperStyleSwitch) && switcher.allIconWrapperStyleSwitch === 'hover',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'iconBorderHover',
                    'selector': `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item:hover .icon`,
                }
            ]
        },
        {
            id: 'featureList',
            component: RepeaterControl,
            titleFormat: '<strong><%= value.title ? value.title : "Feature List" %></strong>',
            isAddNew: false,
            show: switcher.iconWrapperStyleSwitch === 'single',
            options: [
                {
                    id: '__singleIconWrapperStyleSwitch',
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
                    onChange: ({ __singleIconWrapperStyleSwitch }) => setSwitcher({ ...switcher, singleIconWrapperStyleSwitch: __singleIconWrapperStyleSwitch })
                },
                {
                    id: 'iconBackground',
                    component: BackgroundControl,
                    allowDeviceControl: true,
                    options: ['default', 'gradient'],
                    show: () => switcher.singleIconWrapperStyleSwitch === 'normal' || !switcher.singleIconWrapperStyleSwitch,

                },
                {
                    id: 'iconBackgroundHover',
                    component: BackgroundControl,
                    allowDeviceControl: true,
                    options: ['default', 'gradient'],
                    show: () => switcher.singleIconWrapperStyleSwitch === 'hover',

                },
                {
                    id: 'iconBorder',
                    show: () => switcher.singleIconWrapperStyleSwitch === 'normal' || !switcher.singleIconWrapperStyleSwitch,
                    label: __('Border', 'gutenverse'),
                    component: BorderResponsiveControl,
                    allowDeviceControl: true,

                },
                {
                    id: 'iconBorderHover',
                    show: () => switcher.singleIconWrapperStyleSwitch === 'hover',
                    label: __('Border', 'gutenverse'),
                    component: BorderResponsiveControl,
                    allowDeviceControl: true,

                },
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