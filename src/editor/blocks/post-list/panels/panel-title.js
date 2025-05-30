import { __ } from '@wordpress/i18n';
import { ColorControl, DimensionControl, SwitchControl, TypographyControl } from 'gutenverse-core/controls';

export const titlePanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher
    } = props;

    return [
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
            id: '__titleHover',
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
            onChange: ({ __titleHover }) => setSwitcher({ ...switcher, titleHover: __titleHover })
        },
        {
            id: 'titleColor',
            show: !switcher.titleHover || switcher.titleHover === 'normal',
            label: __('Text color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'titleColor',
                    'selector': `.${elementId} .guten-postlist .guten-post .guten-postlist-title`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct',
                        }
                    ],
                }
            ]
        },
        {
            id: 'titleTypography',
            show: !switcher.titleHover || switcher.titleHover === 'normal',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: 'titleColorHover',
            show: switcher.titleHover === 'hover',
            label: __('Hover Text color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'titleColorHover',
                    'selector': `.${elementId} .guten-postlist .guten-post:hover .guten-postlist-title`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct',
                        }
                    ],
                }
            ]
        },
        {
            id: 'titleTypographyHover',
            show: switcher.titleHover === 'hover',
            label: __('Hover Typography', 'gutenverse'),
            component: TypographyControl,
        },
    ];
};