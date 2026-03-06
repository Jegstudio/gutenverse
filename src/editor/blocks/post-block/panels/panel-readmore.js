import { __ } from '@wordpress/i18n';
import { AlignCenter, AlignLeft, AlignRight } from 'gutenverse-core/components';
import { BackgroundControl, BorderControl, BorderResponsiveControl, BoxShadowControl, ColorControl, DimensionControl, IconRadioControl, RangeControl, SizeControl, SwitchControl, TypographyControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const readmorePanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher,
    } = props;

    const device = getDeviceType();

    return [
        {
            id: 'readmoreTypography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: 'readmoreMargin',
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
        },
        {
            id: 'readmorePadding',
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
            id: 'readmoreSpacing',
            label: __('Spacing', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'readmoreSpacing',
                    'responsive': true,
                    'selector': `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore.icon-position-before .guten-readmore i`,
                    'properties': [
                        {
                            'name': 'margin-right',
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
                    'id': 'readmoreSpacing',
                    'responsive': true,
                    'selector': `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore.icon-position-after .guten-readmore i`,
                    'properties': [
                        {
                            'name': 'margin-left',
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
            id: 'readmoreIconSize',
            label: __('Icon Size', 'gutenverse'),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 100,
                    step: 1
                },
                em: {
                    text: 'em',
                    min: 0.1,
                    max: 3,
                    step: 0.1
                },
            },
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'readmoreIconSize',
                    'responsive': true,
                    'selector': `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore .guten-readmore i`,
                    'properties': [
                        {
                            'name': 'font-size',
                            'valueType': 'direct',
                        }
                    ]
                },
                {
                    'type': 'unitPoint',
                    'id': 'readmoreIconSize',
                    'responsive': true,
                    'selector': `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore .guten-readmore svg`,
                    'properties': [
                        {
                            'name': 'font-size',
                            'valueType': 'direct',
                        }
                    ]
                }
            ]
        },
        {
            id: 'readmoreWidth',
            label: __('Width', 'gutenverse'),
            component: SizeControl,
            min: 1,
            max: 500,
            step: 1,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 500,
                    step: 1
                },
                ['%']: {
                    text: '%',
                    min: 1,
                    max: 100,
                    step: 1
                },
            },
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'readmoreWidth',
                    'responsive': true,
                    'selector': `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore .guten-readmore`,
                    'properties': [
                        {
                            'name': 'width',
                            'valueType': 'direct',
                        }
                    ]
                }
            ]
        },
        {
            id: 'readmoreAlign',
            label: __('Alignment', 'gutenverse'),
            component: IconRadioControl,
            allowDeviceControl: true,
            options: [
                {
                    label: __('Align Left', 'gutenverse'),
                    value: 'start',
                    icon: <AlignLeft />,
                },
                {
                    label: __('Align Center', 'gutenverse'),
                    value: 'center',
                    icon: <AlignCenter />,
                },
                {
                    label: __('Align Right', 'gutenverse'),
                    value: 'end',
                    icon: <AlignRight />,
                },
            ],
        },
        {
            id: '__readmoreHover',
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
            onChange: ({ __readmoreHover }) => setSwitcher({ ...switcher, readmoreHover: __readmoreHover })
        },
        {
            id: 'readmoreColor',
            show: !switcher.readmoreHover || switcher.readmoreHover === 'normal',
            label: __('Normal color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'readmoreColor',
                    'selector': `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore a`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ],
                },
                {
                    'type': 'color',
                    'id': 'readmoreColor',
                    'selector': `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore svg`,
                    'properties': [
                        {
                            'name': 'fill',
                            'valueType': 'direct'
                        }
                    ],
                }
            ]
        },
        {
            id: 'readmoreHoverColor',
            show: switcher.readmoreHover === 'hover',
            label: __('Hover color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'readmoreHoverColor',
                    'selector': `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore:hover a`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ],
                },
                {
                    'type': 'color',
                    'id': 'readmoreHoverColor',
                    'selector': `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore:hover svg`,
                    'properties': [
                        {
                            'name': 'fill',
                            'valueType': 'direct'
                        }
                    ],
                }
            ]
        },
        {
            id: 'readmoreBackground',
            show: !switcher.readmoreHover || switcher.readmoreHover === 'normal',
            label: __('Background', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'readmoreBackground',
                    'selector': `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore a`,
                }
            ]
        },
        {
            id: 'readmoreHoverBackground',
            show: switcher.readmoreHover === 'hover',
            label: __('Hover Background', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'readmoreHoverBackground',
                    'selector': `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore:hover a`,
                }
            ]
        },
        {
            id: 'readmoreBorder',
            show: (!switcher.readmoreHover || switcher.readmoreHover === 'normal') && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'readmoreBorder',
                    'selector': `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore a`,
                }
            ]
        },
        {
            id: 'readmoreBorderResponsive',
            show: (!switcher.readmoreHover || switcher.readmoreHover === 'normal') && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'readmoreBorderResponsive',
                    'selector': `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore a`,
                }
            ]
        },
        {
            id: 'readmoreHoverBorder',
            show: switcher.readmoreHover === 'hover' && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'readmoreHoverBorder',
                    'selector': `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore:hover a`,
                }
            ]
        },
        {
            id: 'readmoreHoverBorderResponsive',
            show: switcher.readmoreHover === 'hover' && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'readmoreHoverBorderResponsive',
                    'selector': `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore:hover a`,
                }
            ]
        },
        {
            id: 'readmoreShadow',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            show: !switcher.readmoreHover || switcher.readmoreHover === 'normal',
            liveStyle: [
                {
                    'type': 'boxShadow',
                    'id': 'readmoreShadow',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore a`,
                }
            ]
        },
        {
            id: 'readmoreHoverShadow',
            label: __('Hover Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            show: switcher.readmoreHover === 'hover',
            liveStyle: [
                {
                    'type': 'boxShadow',
                    'id': 'readmoreHoverShadow',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore:hover a`,
                }
            ]
        },
    ];
};