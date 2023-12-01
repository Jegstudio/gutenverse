import { BackgroundControl, BorderControl, BoxShadowControl, DimensionControl, RangeControl } from 'gutenverse-core/controls';
import { __ } from '@wordpress/i18n';
import { ColorControl, IconControl, SwitchControl } from 'gutenverse-core/controls';
import { allowRenderBoxShadow, handleBackground, handleBorderV2, handleBoxShadow, handleColor, handleDimension } from 'gutenverse-core/styling';

export const panelIconStyle = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher
    } = props;

    return [
        {
            id: 'iconMargin',
            label: __('Margin', 'gutenverse'),
            component: DimensionControl,
            position: ['top', 'right', 'bottom', 'left'],
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                percent: {
                    text: '%',
                    unit: '%'
                },
            },
            style: [
                {
                    selector: `.${elementId} .accordion-item .accordion-icon`,
                    render: value => handleDimension(value, 'margin')
                }
            ],
        },
        {
            id: 'iconPadding',
            label: __('Padding', 'gutenverse'),
            component: DimensionControl,
            position: ['top', 'right', 'bottom', 'left'],
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                percent: {
                    text: '%',
                    unit: '%'
                },
            },
            style: [
                {
                    selector: `.${elementId} .accordion-item .accordion-icon`,
                    render: value => handleDimension(value, 'padding')
                }
            ],
        },
        {
            id: '__accIconActive',
            component: SwitchControl,
            options: [
                {
                    value: 'normal',
                    label: 'Normal'
                },
                {
                    value: 'active',
                    label: 'Active'
                }
            ],
            onChange: ({ __accIconActive }) => setSwitcher({ ...switcher, accIcon: __accIconActive })
        },
        {
            id: 'iconSize',
            label: __('Icon Size', 'gutenverse'),
            component: RangeControl,
            show: !switcher.accIcon || switcher.accIcon === 'normal',
            min: 1,
            max: 200,
            step: 1,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .accordion-item .accordion-icon`,
                    render: value => `font-size: ${value}px;`
                }
            ],
        },
        {
            id: 'iconClosed',
            show: !switcher.accIcon || switcher.accIcon === 'normal',
            label: __('Normal Icon', 'gutenverse'),
            component: IconControl,
        },
        {
            id: 'iconColor',
            show: !switcher.accIcon || switcher.accIcon === 'normal',
            label: __('Normal Icon Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .accordion-item .accordion-icon i`,
                    render: value => handleColor(value, 'color')
                }
            ],
        },
        {
            id: 'iconBackground',
            show: !switcher.accIcon || switcher.accIcon === 'normal',
            label: __('Background', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId} .accordion-item .accordion-icon`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'iconBorder_v2',
            show: !switcher.accIcon || switcher.accIcon === 'normal',
            label: __('Border Type', 'gutenverse'),
            component: BorderControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .accordion-item .accordion-icon`,
                    render: value => handleBorderV2(value)
                }
            ]
        },
        {
            id: 'iconBoxShadow',
            show: !switcher.accIcon || switcher.accIcon === 'normal',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.${elementId} .accordion-item .accordion-icon`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        },
        {
            id: 'iconActiveSize',
            label: __('Icon Active Size', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 200,
            step: 1,
            allowDeviceControl: true,
            show: switcher.accIcon === 'active',
            style: [
                {
                    selector: `.${elementId} .accordion-item.active .accordion-icon`,
                    render: value => `font-size: ${value}px;`
                }
            ],
        },
        {
            id: 'iconOpen',
            show: switcher.accIcon === 'active',
            label: __('Active Icon', 'gutenverse'),
            component: IconControl,
        },
        {
            id: 'iconActiveColor',
            show: switcher.accIcon === 'active',
            label: __('Active Icon Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .accordion-item.active .accordion-icon i`,
                    render: value => handleColor(value, 'color')
                }
            ],
        },
        {
            id: 'iconActiveBackground',
            show: switcher.accIcon === 'active',
            label: __('Active Background', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId} .accordion-item.active .accordion-icon`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'iconActiveBorder_v2',
            show: switcher.accIcon === 'active',
            label: __('Border Type', 'gutenverse'),
            component: BorderControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .accordion-item.active .accordion-icon`,
                    render: value => handleBorderV2(value)
                }
            ]
        },
        {
            id: 'iconActiveBoxShadow',
            show: switcher.accIcon === 'active',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.${elementId} .accordion-item.active .accordion-icon`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        },
    ];
};