import { __ } from '@wordpress/i18n';
import { BorderControl, BorderResponsiveControl, BoxShadowControl, ColorControl, DimensionControl, TypographyControl, SelectControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const categoryPanel = (props) => {
    const {
        elementId,
        postblockType
    } = props;

    const device = getDeviceType();

    return [
        {
            id: 'categoryVerticalAlign',
            label: __('Category Vertical Align', 'gutenverse'),
            show: 'type-5' === postblockType,
            component: SelectControl,
            allowDeviceControl: true,
            options: [
                {
                    label: 'Top',
                    value: 'baseline'
                },
                {
                    label: 'Middle',
                    value: 'center'
                },
                {
                    label: 'Bottom',
                    value: 'end'
                },
            ],
        },
        {
            id: 'categoryColor',
            label: __('Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'categoryColor',
                    'selector': `.${elementId} .guten-postblock .guten-post-category a`,
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
            id: 'categoryTypography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: 'categoryBackground',
            label: __('Background', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'categoryBackground',
                    'selector': `.${elementId} .guten-postblock .guten-post-category`,
                    'properties': [
                        {
                            'name' : 'background-color',
                            'valueType' : 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'categoryMargin',
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
            id: 'categoryPadding',
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
            id: 'categoryBorder',
            show: device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'categoryBorder',
                    'selector': `.${elementId} .guten-postblock .guten-post-category`,
                }
            ]
        },
        {
            id: 'categoryBorderResponsive',
            show: device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'categoryBorderResponsive',
                    'selector': `.${elementId} .guten-postblock .guten-post-category`,
                }
            ]
        },
        {
            id: 'categoryShadow',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            liveStyle: [
                {
                    'type': 'boxShadow',
                    'id': 'categoryShadow',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId} .guten-postblock .guten-post-category`,
                }
            ]
        },
    ];
};