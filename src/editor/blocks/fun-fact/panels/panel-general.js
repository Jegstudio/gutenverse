
import { __ } from '@wordpress/i18n';
import { CheckboxControl, ColorControl, IconRadioControl, SelectControl } from 'gutenverse-core/controls';
import { AlignCenter, AlignLeft, AlignRight } from 'gutenverse-core/components';

export const generalPanel = (props) => {
    const {
        elementId,
        hoverBottom,
    } = props;

    return [
        {
            id: 'alignButtons',
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
            id: 'iconPosition',
            label: __('Icon Position', 'gutenverse'),
            component: SelectControl,
            allowDeviceControl: true,
            options: [
                {
                    value: 'top',
                    label: 'Top'
                },
                {
                    value: 'left',
                    label: 'Left'
                },
                {
                    value: 'right',
                    label: 'Right'
                },
                {
                    value: 'bottom',
                    label: 'Bottom'
                },
            ]
        },
        {
            id: 'titleTag',
            label: __('Title HTML Tag', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    value: 'h1',
                    label: 'H1'
                },
                {
                    value: 'h2',
                    label: 'H2'
                },
                {
                    value: 'h3',
                    label: 'H3'
                },
                {
                    value: 'h4',
                    label: 'H4'
                },
                {
                    value: 'h5',
                    label: 'H5'
                },
                {
                    value: 'h6',
                    label: 'H6'
                },
                {
                    value: 'div',
                    label: 'Div'
                },
                {
                    value: 'span',
                    label: 'Span'
                },
                {
                    value: 'p',
                    label: 'P'
                },
            ],
        },
        {
            id: 'hoverBottom',
            label: __('Enable Hover Border Bottom', 'gutenverse'),
            component: CheckboxControl
        },
        {
            id: 'hoverBottomColor',
            show: hoverBottom,
            label: __('Border Bottom Color', 'gutenverse'),
            component: ColorControl,
            liveStyle : [
                {
                    'type': 'color',
                    'id': 'hoverBottomColor',
                    'selector': `.${elementId}.guten-fun-fact .border-bottom .animated`,
                    'properties': [
                        {
                            'name': 'background-color',
                            'valueType': 'direct',
                        }
                    ]
                }
            ]
        },
        {
            id: 'hoverBottomDirection',
            show: hoverBottom,
            label: __('Hover Direction', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    value: 'left',
                    label: 'From Left'
                },
                {
                    value: 'right',
                    label: 'From Right'
                },
            ]
        },
    ];
};