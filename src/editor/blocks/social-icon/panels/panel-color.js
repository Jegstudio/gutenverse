import { __ } from '@wordpress/i18n';
import { ColorControl, SwitchControl } from 'gutenverse-core/controls';

export const contentColor = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher
    } = props;

    return [
        {
            id: '__socialIconHover',
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
            onChange: ({ __socialIconHover }) => setSwitcher({ ...switcher, socialIconHover: __socialIconHover })
        },
        {
            id: 'iconColor',
            show: !switcher.socialIconHover || switcher.socialIconHover === 'normal',
            label: __('Icon Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'iconColor',
                    'selector': `.guten-social-icons.fill .guten-social-icon #${elementId} i, .guten-social-icons.border .guten-social-icon #${elementId} i, .guten-social-icons.custom .guten-social-icon #${elementId} i`,
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
                    'selector': `.guten-social-icons.border .guten-social-icon #${elementId}`,
                    'properties': [
                        {
                            'name': 'border-color',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'bgColor',
            show: !switcher.socialIconHover || switcher.socialIconHover === 'normal',
            label: __('Background Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'bgColor',
                    'selector': `.guten-social-icons.fill .guten-social-icon #${elementId}, .guten-social-icons.border .guten-social-icon #${elementId}, .guten-social-icons.custom .guten-social-icon #${elementId}`,
                    'properties': [
                        {
                            'name': 'background-color',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'textColor',
            show: !switcher.socialIconHover || switcher.socialIconHover === 'normal',
            label: __('Text Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'textColor',
                    'selector': `.guten-social-icons .guten-social-icon #${elementId} span`,
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
            id: 'hoverIconColor',
            show: switcher.socialIconHover === 'hover',
            label: __('Hover Icon Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'hoverIconColor',
                    'selector': `.guten-social-icons.fill .guten-social-icon #${elementId}:hover i, .guten-social-icons.border .guten-social-icon #${elementId}:hover i, .guten-social-icons.custom .guten-social-icon #${elementId}:hover i`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                },
                {
                    'type': 'color',
                    'id': 'hoverIconColor',
                    'selector': `.guten-social-icons.border .guten-social-icon #${elementId}:hover`,
                    'properties': [
                        {
                            'name': 'border-color',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'hoverBgColor',
            show: switcher.socialIconHover === 'hover',
            label: __('Hover Background Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'hoverBgColor',
                    'selector': `.guten-social-icons.fill .guten-social-icon #${elementId}:hover, .guten-social-icons.border .guten-social-icon #${elementId}:hover, .guten-social-icons.custom .guten-social-icon #${elementId}:hover`,
                    'properties': [
                        {
                            'name': 'background-color',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'hoverTextColor',
            show: switcher.socialIconHover === 'hover',
            label: __('Hover Text Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'hoverTextColor',
                    'selector': `.guten-social-icons .guten-social-icon #${elementId}:hover span`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
    ];
};