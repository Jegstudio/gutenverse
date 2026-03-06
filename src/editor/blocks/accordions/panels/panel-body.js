import { __ } from '@wordpress/i18n';
import {
    BackgroundControl,
    BorderControl,
    BorderResponsiveControl,
    ColorControl,
    DimensionControl,
    SwitchControl,
    TypographyControl
} from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const panelBody = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher,
    } = props;

    const device = getDeviceType();

    return [
        {
            id: 'contentTypography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: 'contentPadding',
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
        },
        {
            id: 'contentBorder',
            show: device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'selector': `.${elementId} .accordion-item .accordion-content`,
                }
            ]
        },
        {
            id: 'contentBorderResponsive',
            show: device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'responsive': true,
                    'selector': `.${elementId} .accordion-item .accordion-content`,
                }
            ]
        },
        {
            id: '__accordionBodyColor',
            component: SwitchControl,
            options: [
                {
                    value: 'open',
                    label: 'Open'
                },
                {
                    value: 'closed',
                    label: 'Closed'
                },
                {
                    value: 'hover',
                    label: 'Hover'
                }
            ],
            onChange: ({ __accordionBodyColor }) => setSwitcher({ ...switcher, accordionBodyColor: __accordionBodyColor })
        },
        {
            id: 'contentTextColor',
            label: __('Text Color', 'gutenverse'),
            component: ColorControl,
            show: !switcher.accordionBodyColor || switcher.accordionBodyColor === 'open',
            liveStyle: [
                {
                    'id': 'contentTextColor',
                    'type': 'color',
                    'selector': `.${elementId} .accordion-item .accordion-content`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ],
                }
            ]
        },
        {
            id: 'contentBackgroundColor',
            label: __('Background Color', 'gutenverse'),
            component: ColorControl,
            show: !switcher.accordionBodyColor || switcher.accordionBodyColor === 'open',
            liveStyle: [
                {
                    'type': 'color',
                    'selector': `.${elementId} .accordion-item .accordion-content`,
                    'properties': [
                        {
                            'name': 'background-color',
                            'valueType': 'direct'
                        }
                    ],
                }
            ]
        },
        {
            id: 'contentBackgroundGradient',
            show: !switcher.accordionBodyColor || switcher.accordionBodyColor === 'open',
            type: __('Background Gradient', '--gctd--'),
            component: BackgroundControl,
            allowDeviceControl: false,
            options: ['gradient'],
            liveStyle: [
                {
                    'type': 'background',
                    'selector': `.${elementId} .accordion-item .accordion-content`,
                    'responsive': true
                }
            ]
        },
        {
            id: 'contentTextColorClosed',
            label: __('Text Color', 'gutenverse'),
            component: ColorControl,
            show: switcher.accordionBodyColor === 'closed',
        },
        {
            id: 'contentBackgroundColorClosed',
            label: __('Background Color', 'gutenverse'),
            component: ColorControl,
            show: switcher.accordionBodyColor === 'closed',
        },
        {
            id: 'contentTextColorHover',
            label: __('Text Color', 'gutenverse'),
            component: ColorControl,
            show: switcher.accordionBodyColor === 'hover',
        },
        {
            id: 'contentBackgroundColorHover',
            label: __('Background Color', 'gutenverse'),
            component: ColorControl,
            show: switcher.accordionBodyColor === 'hover',
        },
        {
            id: 'contentBackgroundGradientClosed',
            show: switcher.accordionBodyColor === 'closed',
            type: __('Background Gradient', '--gctd--'),
            component: BackgroundControl,
            allowDeviceControl: false,
            options: ['gradient'],
        },
        {
            id: 'contentBackgroundGradientHover',
            show: switcher.accordionBodyColor === 'hover',
            type: __('Background Gradient', '--gctd--'),
            component: BackgroundControl,
            allowDeviceControl: false,
            options: ['gradient'],
        },
    ];
};
