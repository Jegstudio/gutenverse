
import { __ } from '@wordpress/i18n';
import { AlignCenter, AlignLeft, AlignRight } from 'gutenverse-core/components';
import { CheckboxControl, ColorControl, IconSVGControl, IconRadioControl, SelectControl, SizeControl } from 'gutenverse-core/controls';

export const panelBody = props => {
    const {
        elementId,
        hoverBottom,
        titleIcon,
    } = props;

    return [
        {
            id: 'titleTag',
            label: __('Title Tag', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('H1'),
                    value: 'h1'
                },
                {
                    label: __('H2'),
                    value: 'h2'
                },
                {
                    label: __('H3'),
                    value: 'h3'
                },
                {
                    label: __('H4'),
                    value: 'h4'
                },
                {
                    label: __('H5'),
                    value: 'h5'
                },
                {
                    label: __('H6'),
                    value: 'h6'
                },
            ],
        },
        {
            id: 'titleIcon',
            label: __('Title Icon', 'gutenverse'),
            component: IconSVGControl,
        },
        {
            id: 'titleIconPosition',
            show: titleIcon !== undefined && titleIcon !== '',
            label: __('Title Icon Position', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('Before'),
                    value: 'before'
                },
                {
                    label: __('After'),
                    value: 'after'
                },
            ],
        },
        {
            id: 'bodyAlignment',
            label: __('Body Alignment', 'gutenverse'),
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
            id: 'hoverBottom',
            label: __('Enable Hover Border Bottom', 'gutenverse'),
            component: CheckboxControl
        },
        {
            id: 'hoverBottomColor',
            show: hoverBottom,
            label: __('Border Bottom Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'hoverBottomColor',
                    'selector': `.${elementId}.gutenverse-image-box .inner-container .border-bottom .animated`,
                    'properties': [
                        {
                            'name': 'background-color',
                            'valueType': 'direct'
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
        {
            id: 'hoverBottomHeight',
            show: hoverBottom,
            label: __('Hover Border Bottom Height', 'gutenverse'),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 1000,
                    step: 1
                },
                em: {
                    text: 'em',
                    min: 0.1,
                    max: 10,
                    step: 0.1
                },
            },
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'hoverBottomHeight',
                    'responsive': true,
                    'selector': `.${elementId}.gutenverse-image-box .border-bottom, .${elementId}.gutenverse-image-box .border-bottom .animated `,
                    'properties': [
                        {
                            'name': 'height',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        }

    ];
};


