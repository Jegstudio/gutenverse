import { __ } from '@wordpress/i18n';
import { ColorControl, DimensionControl, TypographyControl, SwitchControl, HeadingControl } from 'gutenverse-core/controls';

export const linkTypographyPanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher
    } = props;

    return [
        {
            id: 'linkHeader1',
            component: HeadingControl,
            label: __('Form Comment Link', 'gutenverse')
        },
        {
            id: 'typographyLink',
            label: __('Link Typography', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: 'colorLink',
            label: __('Link Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: {
                'type': 'color',
                'id': 'colorLink',
                'selector': `.${elementId} .comment-form a`,
                'properties': [
                    {
                        'name': 'color',
                        'valueType': 'direct'
                    }
                ]
            }
        },
        {
            id: 'marginLink',
            label: __('Link Margin', 'gutenverse'),
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
                rem: {
                    text: 'rem',
                    unit: 'rem'
                },
            },
        },
        {
            id: 'linkHeader2',
            component: HeadingControl,
            label: __('List Comment Link', 'gutenverse')
        },
        {
            id: '__linkType',
            component: SwitchControl,
            options: [
                {
                    value: 'userName',
                    label: 'User'
                },
                {
                    value: 'date',
                    label: 'Date'
                },
                {
                    value: 'reply',
                    label: 'Reply'
                }
            ],
            onChange: ({ __linkType }) => setSwitcher({ ...switcher, linkType: __linkType })
        },
        {
            id: 'userNameTypography',
            label: __('User Name Typography', 'gutenverse'),
            show: !switcher.linkType || switcher.linkType === 'userName',
            component: TypographyControl,
        },
        {
            id: 'userNameColor',
            label: __('User Name Color', 'gutenverse'),
            show: !switcher.linkType || switcher.linkType === 'userName',
            component: ColorControl,
            liveStyle: {
                'type': 'color',
                'id': 'userNameColor',
                'selector': `.${elementId} .commentlist b.fn a.url`,
                'properties': [
                    {
                        'name': 'color',
                        'valueType': 'direct'
                    }
                ]
            }
        },
        {
            id: 'dateTypography',
            label: __('Date Typography', 'gutenverse'),
            show: switcher.linkType === 'date',
            component: TypographyControl,
        },
        {
            id: 'dateColor',
            label: __('Date Color', 'gutenverse'),
            show: switcher.linkType === 'date',
            component: ColorControl,
            liveStyle: {
                'type': 'color',
                'id': 'dateColor',
                'selector': `.${elementId} .commentlist .comment-metadata a time`,
                'properties': [
                    {
                        'name': 'color',
                        'valueType': 'direct'
                    }
                ]
            }
        },
        {
            id: 'replyLinkTypography',
            label: __('Reply Typography', 'gutenverse'),
            show: switcher.linkType === 'reply',
            component: TypographyControl,
        },
        {
            id: 'replyLinkColor',
            label: __('Reply Color', 'gutenverse'),
            show: switcher.linkType === 'reply',
            component: ColorControl,
            liveStyle: {
                'type': 'color',
                'id': 'replyLinkColor',
                'selector': `.${elementId} .commentlist .reply .comment-reply-link`,
                'properties': [
                    {
                        'name': 'color',
                        'valueType': 'direct'
                    }
                ]
            }
        },
    ];
};

