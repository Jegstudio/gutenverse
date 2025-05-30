import { __ } from '@wordpress/i18n';
import { BorderResponsiveControl, IconRadioControl, SelectControl } from 'gutenverse-core/controls';
import { BorderControl, ColorControl, DimensionControl, SwitchControl, TypographyControl, BackgroundControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import isEmpty from 'lodash/isEmpty';
import { AlignCenter, AlignLeft, AlignRight } from 'gutenverse-core/components';

export const panelTitle = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher,
        setAttributes,
        titleBackgroundActiveColor,
        titleBackgroundColor,
        titleBackground,
        titleActiveBackground,
    } = props;

    if (!isEmpty(titleBackgroundColor) && isEmpty(titleBackground)) {
        setAttributes({ titleBackground: { color: titleBackgroundColor, type: 'default' } });
    }
    if (!isEmpty(titleBackgroundActiveColor) && isEmpty(titleActiveBackground)) {
        setAttributes({ titleActiveBackground: { color: titleBackgroundActiveColor, type: 'default' } });
    }

    const device = getDeviceType();

    return [
        {
            id: 'titleAlign',
            label: __('Title Alignment', 'gutenverse'),
            component: IconRadioControl,
            allowDeviceControl: true,
            options: [
                {
                    label: __('Align Left', 'gutenverse'),
                    value: 'left',
                    icon: <AlignLeft />,
                },
                {
                    label: __('Align Center', 'gutenverse'),
                    value: 'center',
                    icon: <AlignCenter />,
                },
                {
                    label: __('Align Right', 'gutenverse'),
                    value: 'right',
                    icon: <AlignRight />,
                },
            ]
        },
        {
            id: 'titleTag',
            label: __('Title Tag', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('H1'),
                    value: 'h1'
                },
                {
                    label: __('H2'),
                    value: 'h2'
                },
                {
                    label: __('H3'),
                    value: 'h3'
                },
                {
                    label: __('H4'),
                    value: 'h4'
                },
                {
                    label: __('H5'),
                    value: 'h5'
                },
                {
                    label: __('H6'),
                    value: 'h6'
                },
                {
                    label: __('SPAN'),
                    value: 'span'
                },
            ],
        },
        {
            id: 'titleTypography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: 'titlePadding',
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
            id: '__accTitleActive',
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
            onChange: ({ __accTitleActive }) => setSwitcher({ ...switcher, accTitle: __accTitleActive })
        },
        {
            id: 'titleTextColor',
            show: !switcher.accTitle || switcher.accTitle === 'normal',
            label: __('Text Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'id': 'titleTextColor',
                    'type': 'color',
                    'selector': `.${elementId} .accordion-item .accordion-text`,
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
            id: 'titleBackgroundColor',
            show: false,
            label: __('Background Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'id': 'titleBackgroundColor',
                    'type': 'color',
                    'selector': `.${elementId} .accordion-item .accordion-text`,
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
            id: 'titleBackground',
            show: !switcher.accTitle || switcher.accTitle === 'normal',
            label: __('Background', 'gutenverse'),
            component: BackgroundControl,
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'titleBackground',
                    'selector': `.${elementId} .accordion-item .accordion-heading`,
                }
            ]
        },
        {
            id: 'titleBorder',
            show: (!switcher.accTitle || switcher.accTitle === 'normal') && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'id': 'titleBorder',
                    'type': 'border',
                    'selector': `.${elementId} .accordion-item .accordion-text`,
                }
            ]
        },
        {
            id: 'titleBorderResponsive',
            show: (!switcher.accTitle || switcher.accTitle === 'normal') && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'id': 'titleBorderResponsive',
                    'type': 'borderResponsive',
                    'responsive': true,
                    'selector': `.${elementId} .accordion-item .accordion-text`,
                }
            ]
        },
        {
            id: 'titleActiveColor',
            show: switcher.accTitle === 'active',
            label: __('Text Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'id': 'titleActiveColor',
                    'type': 'color',
                    'selector': `.${elementId} .accordion-item.active .accordion-text`,
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
            id: 'titleBackgroundActiveColor',
            show: false,
            label: __('Background Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'id': 'titleBackgroundActiveColor',
                    'type': 'color',
                    'selector': `.${elementId} .accordion-item.active .accordion-text`,
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
            id: 'titleActiveBackground',
            show: switcher.accTitle === 'active',
            label: __('Active Background', 'gutenverse'),
            component: BackgroundControl,
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'titleActiveBackground',
                    'selector': `.${elementId} .accordion-item.active .accordion-heading`,
                }
            ]
        },
        {
            id: 'titleBorderActive',
            show: switcher.accTitle === 'active' && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'id': 'titleBorderActive',
                    'type': 'border',
                    'selector': `.${elementId} .accordion-item.active .accordion-text`,
                }
            ]
        },
        {
            id: 'titleBorderActiveResponsive',
            show: switcher.accTitle === 'active' && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'id': 'titleBorderActiveResponsive',
                    'type': 'borderResponsive',
                    'responsive': true,
                    'selector': `.${elementId} .accordion-item.active .accordion-text`,
                }
            ]
        },
    ];
};
