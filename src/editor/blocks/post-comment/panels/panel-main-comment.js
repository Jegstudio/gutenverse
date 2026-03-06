import { __ } from '@wordpress/i18n';
import { handleBorderResponsive, handleColor, handleDimension } from 'gutenverse-core/styling';
import { BorderResponsiveControl, ColorControl, DimensionControl, HeadingControl } from 'gutenverse-core/controls';

export const mainCommentPanel = (props) => {
    const {
        elementId
    } = props;

    return [
        {
            id: 'submenuSplitter1',
            component: HeadingControl,
            label: __('Comment Container')
        },
        {
            id: 'mainContainerBgColor',
            label: __('Container Background Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            liveStyle: {
                'type': 'color',
                'id': 'mainContainerBgColor',
                'responsive': true,
                'selector': `.${elementId} .commentlist .comment.depth-1`,
                'properties': [
                    {
                        'name': 'background-color',
                        'valueType': 'direct'
                    }
                ]
            }
        },
        {
            id: 'mainContainerMargin',
            label: __('Container Margin', 'gutenverse'),
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
            id: 'mainContainerPadding',
            label: __('Container Padding', 'gutenverse'),
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
            id: 'mainContainerBorder',
            label: __('Container Border', '--gctd--'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: {
                'type': 'borderResponsive',
                'id': 'mainContainerBorder',
                'selector': `.${elementId} .commentlist .comment.depth-1`,
            }
        },
        {
            id: 'submenuSplitter2',
            component: HeadingControl,
            label: __('Comment Body')
        },
        {
            id: 'mainBgColor',
            label: __('Comment Background Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            liveStyle: {
                'type': 'color',
                'id': 'mainBgColor',
                'responsive': true,
                'selector': `.${elementId} .commentlist .comment.depth-1 > .comment-body`,
                'properties': [
                    {
                        'name': 'background-color',
                        'valueType': 'direct'
                    }
                ]
            }
        },
        {
            id: 'mainMargin',
            label: __('Comment Margin', 'gutenverse'),
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
            id: 'mainPadding',
            label: __('Comment Padding', 'gutenverse'),
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
            id: 'mainBorder',
            label: __('Comment Border', '--gctd--'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: {
                'type': 'borderResponsive',
                'id': 'mainBorder',
                'selector': `.${elementId} .commentlist .comment.depth-1 > .comment-body`,
            }
        },
    ];
};

