import { __ } from '@wordpress/i18n';
import { handleBorderResponsive, handleColor, handleDimension } from 'gutenverse-core/styling';
import { BorderResponsiveControl, ColorControl, DimensionControl } from 'gutenverse-core/controls';

export const replyPanel = (props) => {
    const {
        elementId
    } = props;

    return [
        {
            id: 'replyBgColor',
            label: __('Reply Background Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            liveStyle: {
                'type': 'color',
                'id': 'replyBgColor',
                'responsive': true,
                'selector': `.${elementId} .commentlist .comment .children`,
                'properties': [
                    {
                        'name': 'background-color',
                        'valueType': 'direct'
                    }
                ]
            }
        },
        {
            id: 'replyMargin',
            label: __('Reply Margin', 'gutenverse'),
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
            id: 'replyPadding',
            label: __('Reply Padding', 'gutenverse'),
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
            id: 'replyBorder',
            label: __('Reply Border', '--gctd--'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: {
                'type': 'borderResponsive',
                'id': 'replyBorder',
                'responsive': true,
                'selector': `.${elementId} .commentlist .comment .children`,
            }
        },
    ];
};

