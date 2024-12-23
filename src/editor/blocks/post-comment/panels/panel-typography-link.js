import { __ } from '@wordpress/i18n';
import { handleColor, handleDimension, handleTypography } from 'gutenverse-core/styling';
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
            style: [
                {
                    selector: `.${elementId} .comment-form a`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ],
        },
        {
            id: 'colorLink',
            label: __('Link Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .comment-form a`,
                    render: value => handleColor(value, 'color')
                }
            ]
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
            style: [
                {
                    selector: `.${elementId} .comment-form a`,
                    render: value => handleDimension(value, 'margin')
                }
            ]
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
            style: [
                {
                    selector: `.${elementId} .commentlist b.fn a.url`,
                    hasChild: true,
                    render: (value, id) => handleTypography(value, props, id)
                }
            ],
        },
        {
            id: 'userNameColor',
            label: __('User Name Color', 'gutenverse'),
            show: !switcher.linkType || switcher.linkType === 'userName',
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .commentlist b.fn a.url`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        // {
        //     id: 'userNameMargin',
        //     label: __('User Name Margin', 'gutenverse'),
        //     show: !switcher.linkType || switcher.linkType === 'userName',
        //     component: DimensionControl,
        //     position: ['top', 'right', 'bottom', 'left'],
        //     allowDeviceControl: true,
        //     units: {
        //         px: {
        //             text: 'px',
        //             unit: 'px'
        //         },
        //         em: {
        //             text: 'em',
        //             unit: 'em'
        //         },
        //         percent: {
        //             text: '%',
        //             unit: '%'
        //         },
        //         rem: {
        //             text: 'rem',
        //             unit: 'rem'
        //         },
        //     },
        //     style: [
        //         {
        //             selector: `.${elementId} .commentlist b.fn a.url`,
        //             render: value => handleDimension(value, 'margin')
        //         }
        //     ]
        // },
        {
            id: 'dateTypography',
            label: __('Date Typography', 'gutenverse'),
            show: switcher.linkType === 'date',
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} .commentlist .comment-metadata a time`,
                    hasChild: true,
                    render: (value, id) => handleTypography(value, props, id)
                }
            ],
        },
        {
            id: 'dateColor',
            label: __('Date Color', 'gutenverse'),
            show: switcher.linkType === 'date',
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .commentlist .comment-metadata a time`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        // {
        //     id: 'dateMargin',
        //     label: __('Date Margin', 'gutenverse'),
        //     show: switcher.linkType === 'date',
        //     component: DimensionControl,
        //     position: ['top', 'right', 'bottom', 'left'],
        //     allowDeviceControl: true,
        //     units: {
        //         px: {
        //             text: 'px',
        //             unit: 'px'
        //         },
        //         em: {
        //             text: 'em',
        //             unit: 'em'
        //         },
        //         percent: {
        //             text: '%',
        //             unit: '%'
        //         },
        //         rem: {
        //             text: 'rem',
        //             unit: 'rem'
        //         },
        //     },
        //     style: [
        //         {
        //             selector: `.${elementId} .commentlist .comment-metadata a time`,
        //             render: value => handleDimension(value, 'margin')
        //         }
        //     ]
        // },
        {
            id: 'replyLinkTypography',
            label: __('Reply Typography', 'gutenverse'),
            show: switcher.linkType === 'reply',
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} .commentlist .reply .comment-reply-link`,
                    hasChild: true,
                    render: (value, id) => handleTypography(value, props, id)
                }
            ],
        },
        {
            id: 'replyLinkColor',
            label: __('Reply Color', 'gutenverse'),
            show: switcher.linkType === 'reply',
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .commentlist .reply .comment-reply-link`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        // {
        //     id: 'replyLinkMargin',
        //     label: __('Reply Margin', 'gutenverse'),
        //     show: switcher.linkType === 'reply',
        //     component: DimensionControl,
        //     position: ['top', 'right', 'bottom', 'left'],
        //     allowDeviceControl: true,
        //     units: {
        //         px: {
        //             text: 'px',
        //             unit: 'px'
        //         },
        //         em: {
        //             text: 'em',
        //             unit: 'em'
        //         },
        //         percent: {
        //             text: '%',
        //             unit: '%'
        //         },
        //         rem: {
        //             text: 'rem',
        //             unit: 'rem'
        //         },
        //     },
        //     style: [
        //         {
        //             selector: `.${elementId} .commentlist .reply .comment-reply-link`,
        //             render: value => handleDimension(value, 'margin')
        //         }
        //     ]
        // },
    ];
};

