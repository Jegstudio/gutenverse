import { __ } from '@wordpress/i18n';

import { AlignCenter, AlignLeft, AlignRight } from 'gutenverse-core/components';
import { BackgroundControl, BorderControl, BorderResponsiveControl, ColorControl, DimensionControl, IconRadioControl, RangeControl, SwitchControl, TypographyControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const metaPanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher
    } = props;

    const device = getDeviceType();

    return [
        {
            id: 'metaAlign',
            label: __('Alignment', 'gutenverse'),
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
            ],
        },
        {
            id: 'metaTypography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: 'metaIconSize',
            label: __('Icon Size', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            unit: 'px',
            min: 1,
            max: 100,
            step: 1,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'metaIconSize',
                    'responsive': true,
                    'selector': `.${elementId} .guten-postlist .guten-post a .meta-lists i`,
                    'properties': [
                        {
                            'name': 'font-size',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ],
                },
                {
                    'type': 'plain',
                    'id': 'metaIconSize',
                    'responsive': true,
                    'selector': `.${elementId} .guten-postlist .guten-post a .meta-lists svg`,
                    'properties': [
                        {
                            'name': 'font-size',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ],
                }
            ]
        },
        {
            id: 'metaIconSpacing',
            label: __('Icon Spacing', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            unit: 'px',
            min: 1,
            max: 100,
            step: 1,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'metaIconSpacing',
                    'responsive': true,
                    'selector': `.${elementId} .guten-postlist .guten-post a .meta-lists i`,
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
                    ],
                },
                {
                    'type': 'plain',
                    'id': 'metaIconSpacing',
                    'responsive': true,
                    'selector': `.${elementId} .guten-postlist .guten-post a .meta-lists svg`,
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
                    ],
                }
            ]
        },
        {
            id: 'metaMargin',
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
            id: 'metaPadding',
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
            id: '__metaHover',
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
            onChange: ({ __metaHover }) => setSwitcher({ ...switcher, metaHover: __metaHover })
        },
        {
            id: 'metaColor',
            show: !switcher.metaHover || switcher.metaHover === 'normal',
            label: __('Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'metaColor',
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct',
                        }
                    ],
                    'selector': `.${elementId} .guten-postlist .guten-post a .meta-lists span`,
                },
                {
                    'type': 'color',
                    'id': 'metaColor',
                    'properties': [
                        {
                            'name': 'fill',
                            'valueType': 'direct',
                        }
                    ],
                    'selector': `.${elementId} .guten-postlist .guten-post a .meta-lists svg`,
                }
            ]
        },
        {
            id: 'metaColorHover',
            show: switcher.metaHover === 'hover',
            label: __('Hover Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'metaColorHover',
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct',
                        }
                    ],
                    'selector': `.${elementId} .guten-postlist .guten-post:hover a .meta-lists span`,
                },
                {
                    'type': 'color',
                    'id': 'metaColorHover',
                    'properties': [
                        {
                            'name': 'fill',
                            'valueType': 'direct',
                        }
                    ],
                    'selector': `.${elementId} .guten-postlist .guten-post:hover a .meta-lists svg`,
                }
            ]
        },
        {
            id: 'metaBackground',
            show: !switcher.metaHover || switcher.metaHover === 'normal',
            label: __('Background', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'metaBackground',
                    'selector': `.${elementId} .guten-postlist .guten-post a .meta-lists span`,
                }
            ]
        },
        {
            id: 'metaHoverBackground',
            show: switcher.metaHover === 'hover',
            label: __('Hover Background', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'metaHoverBackground',
                    'selector': `.${elementId} .guten-postlist .guten-post:hover a .meta-lists span`,
                }
            ]
        },
        {
            id: 'metaBorder',
            show: (!switcher.metaHover || switcher.metaHover === 'normal') && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'metaBorder',
                    'selector': `.${elementId} .guten-postlist .guten-post a .meta-lists span`,
                }
            ]
        },
        {
            id: 'metaBorderResponsive',
            show: (!switcher.metaHover || switcher.metaHover === 'normal') && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'metaBorderResponsive',
                    'selector': `.${elementId} .guten-postlist .guten-post a .meta-lists span`,
                }
            ]
        },
        {
            id: 'metaHoverBorder',
            show: switcher.metaHover === 'hover' && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'metaHoverBorder',
                    'selector': `.${elementId} .guten-postlist .guten-post:hover a .meta-lists span`,
                }
            ]
        },
        {
            id: 'metaHoverBorderResponsive',
            show: switcher.metaHover === 'hover' && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'metaHoverBorderResponsive',
                    'selector': `.${elementId} .guten-postlist .guten-post:hover a .meta-lists span`,
                }
            ]
        },
    ];
};