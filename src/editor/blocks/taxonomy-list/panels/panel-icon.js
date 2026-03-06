
import { __ } from '@wordpress/i18n';
import { AlertControl, ColorControl, IconSVGControl, SizeControl, SwitchControl } from 'gutenverse-core/controls';

export const iconPanel = (props) => {
    const {
        elementId,
        showIcon,
        switcher,
        setSwitcher
    } = props;

    return [
        {
            id: 'icon-notice',
            component: AlertControl,
            children: <>
                <span>{__('This Panel Option Only Show If You Turn On "Show Icon" Option')}</span>
            </>
        },
        {
            id: 'icon',
            show: showIcon,
            label: __('Icon', 'gutenverse'),
            component: IconSVGControl
        },
        {
            id: 'iconSpace',
            component: SizeControl,
            show: showIcon,
            label: __('Icon Space', 'gutenverse'),
            allowDeviceControl: true,
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
                    'id': 'iconSpace',
                    'responsive': true,
                    'selector': `.${elementId} .taxonomy-list-wrapper .icon-list`,
                    'properties': [
                        {
                            'name': 'margin-right',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'iconSize',
            component: SizeControl,
            show: showIcon,
            label: __('Icon Size', 'gutenverse'),
            allowDeviceControl: true,
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
                    'id': 'iconSize',
                    'responsive': true,
                    'selector': `.${elementId} .taxonomy-list-wrapper .icon-list i`,
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
                    'selector': `.${elementId} .taxonomy-list-wrapper .icon-list svg`,
                    'properties': [
                        {
                            'name': 'font-size',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: '__iconSwitch',
            component: SwitchControl,
            show: showIcon,
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
            onChange: ({ __iconSwitch }) => setSwitcher({ ...switcher, iconSwitch: __iconSwitch })
        },
        {
            id: 'iconColor',
            label: __('Icon Color', 'gutenverse'),
            component: ColorControl,
            show: (!switcher.iconSwitch || switcher.iconSwitch === 'normal') && showIcon,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'iconColor',
                    'selector': `.${elementId} .taxonomy-list-wrapper .taxonomy-list-item a .icon-list`,
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
                    'selector': `.${elementId} .taxonomy-list-wrapper .taxonomy-list-item a .icon-list svg`,
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
            show: switcher.iconSwitch === 'hover' && showIcon,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'iconColorHover',
                    'selector': `.${elementId} .taxonomy-list-wrapper .taxonomy-list-item a:hover .icon-list`,
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
                    'selector': `.${elementId} .taxonomy-list-wrapper .taxonomy-list-item a:hover .icon-list svg`,
                    'properties': [
                        {
                            'name': 'fill',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
    ];
};
