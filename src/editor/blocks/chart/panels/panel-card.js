import { __ } from '@wordpress/i18n';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from 'react-feather';
import { TypographyControl, BoxShadowControl, IconRadioControl, BackgroundControl, AlertControl, ColorControl, HeadingControl, DimensionControl, BorderResponsiveControl, TextShadowControl } from 'gutenverse-core/controls';

export const cardPanel = (props) => {
    const {
        elementId,
        enableContent
    } = props;

    const deviceType = getDeviceType();

    return [
        {
            id: 'activate-notice',
            component: AlertControl,
            show: !enableContent[deviceType] || enableContent[deviceType] === undefined,
            children: <>
                <span>{__('Enable content to use these options.', 'gutenverse')}</span>
            </>
        },
        {
            id: 'cardBackground',
            label: __('Card Background', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            show: enableContent[deviceType],
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'cardBackground',
                    'selector': `.${elementId} .chart-content.content-card,
                        .${elementId}.Desktop-noFlip .chart-content.content-card,
                        .${elementId}.Tablet-noFlip .chart-content.content-card,
                        .${elementId}.Mobile-noFlip .chart-content.content-card`,
                }
            ],
        },
        {
            id: 'paddingCard',
            label: __('Card Padding', 'gutenverse'),
            component: DimensionControl,
            position: ['top', 'right', 'bottom', 'left'],
            show: enableContent[deviceType],
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
            id: 'cardBorder',
            label: __('Card Border', 'gutenverse'),
            component: BorderResponsiveControl,
            show: enableContent[deviceType],
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'cardBorder',
                    'responsive': true,
                    'selector': `.${elementId} .chart-content.content-card,
                        .${elementId}.Desktop-noFlip .chart-content.content-card,
                        .${elementId}.Tablet-noFlip .chart-content.content-card,
                        .${elementId}.Mobile-noFlip .chart-content.content-card`,
                }
            ],
        },
        {
            id: 'cardBoxShadow',
            label: __('Card Box Shadow', 'gutenverse'),
            show: enableContent[deviceType],
            component: BoxShadowControl,
            liveStyle: [
                {
                    'type': 'boxShadow',
                    'id': 'boxShadow',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId} .chart-content.content-card,
                        .${elementId}.Desktop-noFlip .chart-content.content-card,
                        .${elementId}.Tablet-noFlip .chart-content.content-card,
                        .${elementId}.Mobile-noFlip .chart-content.content-card`,
                }
            ]
        },
        {
            id: 'chartCardHeadingTitle',
            component: HeadingControl,
            show: enableContent[deviceType],
            label: __('Title', 'gutenverse'),
        },
        {
            id: 'cardTitleAlign',
            label: __('Title Alignment', 'gutenverse'),
            allowDeviceControl: true,
            component: IconRadioControl,
            show: enableContent[deviceType],
            options: [
                {
                    label: __('Align Left', 'gutenverse'),
                    value: 'left',
                    icon: <AlignLeft/>,
                },
                {
                    label: __('Align Center', 'gutenverse'),
                    value: 'center',
                    icon: <AlignCenter/>,
                },
                {
                    label: __('Align Right', 'gutenverse'),
                    value: 'right',
                    icon: <AlignRight/>,
                },
                {
                    label: __('Align Justify', 'gutenverse'),
                    value: 'justify',
                    icon: <AlignJustify/>,
                },
            ],
        },
        {
            id: 'cardTitleColor',
            label: __('Title Color', 'gutenverse'),
            component: ColorControl,
            show: enableContent[deviceType],
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'cardTitleColor',
                    'selector': `.${elementId} .chart-content.content-card .chart-title,
                        .${elementId}.Desktop-noFlip .chart-content.content-card .chart-title,
                        .${elementId}.Tablet-noFlip .chart-content.content-card .chart-title,
                        .${elementId}.Mobile-noFlip .chart-content.content-card .chart-title`,
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
            id: 'cardTitleTypography',
            label: __('Title Typography', 'gutenverse'),
            component: TypographyControl,
            show: enableContent[deviceType],
        },
        {
            id: 'cardTitleTextShadow',
            label: __('Title Text Shadow', 'gutenverse'),
            show: enableContent[deviceType],
            component: TextShadowControl,
            liveStyle: [
                {
                    'type': 'textShadow',
                    'id': 'cardTitleTextShadow',
                    'properties': [
                        {
                            'name': 'text-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId} .chart-content.content-card .chart-title,
                        .${elementId}.Desktop-noFlip .chart-content.content-card .chart-title,
                        .${elementId}.Tablet-noFlip .chart-content.content-card .chart-title,
                        .${elementId}.Mobile-noFlip .chart-content.content-card .chart-title`,
                }
            ]
        },
        {
            id: 'marginCardTitle',
            label: __('Card Title Margin', 'gutenverse'),
            component: DimensionControl,
            position: ['top', 'right', 'bottom', 'left'],
            show: enableContent[deviceType],
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
            id: 'chartCardHeadingdescription',
            component: HeadingControl,
            show: enableContent[deviceType],
            label: __('Description', 'gutenverse'),
        },
        {
            id: 'cardDescriptionAlign',
            label: __('Description Alignment', 'gutenverse'),
            allowDeviceControl: true,
            component: IconRadioControl,
            show: enableContent[deviceType],
            options: [
                {
                    label: __('Align Left', 'gutenverse'),
                    value: 'left',
                    icon: <AlignLeft/>,
                },
                {
                    label: __('Align Center', 'gutenverse'),
                    value: 'center',
                    icon: <AlignCenter/>,
                },
                {
                    label: __('Align Right', 'gutenverse'),
                    value: 'right',
                    icon: <AlignRight/>,
                },
                {
                    label: __('Align Justify', 'gutenverse'),
                    value: 'justify',
                    icon: <AlignJustify/>,
                },
            ],
        },
        {
            id: 'cardDescriptionColor',
            label: __('Description Color', 'gutenverse'),
            show: enableContent[deviceType],
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'cardDescriptionColor',
                    'selector': `.${elementId} .chart-content.content-card .chart-description,
                        .${elementId}.Desktop-noFlip .chart-content.content-card .chart-description,
                        .${elementId}.Tablet-noFlip .chart-content.content-card .chart-description,
                        .${elementId}.Mobile-noFlip .chart-content.content-card .chart-description`,
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
            id: 'cardDescriptionTypography',
            label: __('Description Typography', 'gutenverse'),
            show: enableContent[deviceType],
            component: TypographyControl,
        },
        {
            id: 'cardDescriptionTextShadow',
            label: __('Description Text Shadow', 'gutenverse'),
            show: enableContent[deviceType],
            component: TextShadowControl,
            liveStyle: [
                {
                    'type': 'textShadow',
                    'id': 'cardDescriptionTextShadow',
                    'properties': [
                        {
                            'name': 'text-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId} .chart-content.content-card .chart-description,
                        .${elementId}.Desktop-noFlip .chart-content.content-card .chart-description,
                        .${elementId}.Tablet-noFlip .chart-content.content-card .chart-description,
                        .${elementId}.Mobile-noFlip .chart-content.content-card .chart-description`,
                }
            ]
        },
        {
            id: 'marginCardDescription',
            label: __('Card Description Margin', 'gutenverse'),
            component: DimensionControl,
            position: ['top', 'right', 'bottom', 'left'],
            show: enableContent[deviceType],
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
    ];
};