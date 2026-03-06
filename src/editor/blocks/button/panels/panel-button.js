import { __ } from '@wordpress/i18n';

import { AlignCenter, AlignLeft, AlignRight } from 'gutenverse-core/components';
import { CheckboxControl, DimensionControl, IconRadioControl, RangeControl, SelectControl, SizeControl, TextControl, IconSVGControl } from 'gutenverse-core/controls';
import { isNotEmpty } from 'gutenverse-core/helper';

export const buttonPanel = (props) => {
    const {
        elementId,
        showIcon,
        icon,
        iconType,
        iconSVG,
        iconPosition,
        iconSpacing,
        role,
    } = props;

    return [
        {
            id: 'alignButton',
            label: __('Button Alignment', 'gutenverse'),
            component: IconRadioControl,
            allowDeviceControl: true,
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
            ],
        },
        {
            id: 'role',
            label: __('Button Role'),
            component: SelectControl,
            options: [
                {
                    label: __('Link (Default)', 'gutenverse'),
                    value: 'link'
                },
                {
                    label: __('Submit', 'gutenverse'),
                    value: 'submit'
                },
            ]
        },
        {
            id: 'ariaLabel',
            label: __('Aria Label', 'gutenverse'),
            component: TextControl,
        },
        {
            id: 'buttonType',
            label: __('Button Type'),
            component: SelectControl,
            options: [
                {
                    label: __('Default', 'gutenverse'),
                    value: 'default'
                },
                {
                    label: __('Info', 'gutenverse'),
                    value: 'info'
                },
                {
                    label: __('Success', 'gutenverse'),
                    value: 'success'
                },
                {
                    label: __('Warning', 'gutenverse'),
                    value: 'warning'
                },
                {
                    label: __('Danger', 'gutenverse'),
                    value: 'danger'
                },
            ]
        },
        {
            id: 'buttonSize',
            label: __('Button Size'),
            component: SelectControl,
            options: [
                {
                    label: __('Extra Small', 'gutenverse'),
                    value: 'xs'
                },
                {
                    label: __('Small', 'gutenverse'),
                    value: 'sm'
                },
                {
                    label: __('Medium', 'gutenverse'),
                    value: 'md'
                },
                {
                    label: __('Large', 'gutenverse'),
                    value: 'lg'
                },
                {
                    label: __('Extra Large', 'gutenverse'),
                    value: 'xl'
                },
            ]
        },
        {
            id: 'buttonWidth',
            label: __('Set Width', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            unit: '%',
            min: 0,
            max: 100,
            step: 1,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'buttonWidth',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'width',
                            'valueType': 'pattern',
                            'pattern': '{value}%',
                            'patternValues': {
                                'value': {
                                    'type': 'direct',
                                    'key': 'buttonWidth',
                                },
                            }
                        }
                    ],
                    'selector': `.editor-styles-wrapper .${elementId}.guten-button-wrapper .guten-button`,
                }
            ],
        },
        {
            id: 'buttonHeight',
            label: __('Set Height', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            unit: 'px',
            min: 1,
            max: 1000,
            step: 1,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'buttonHeight',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'height',
                            'valueType': 'pattern',
                            'pattern': '{value}px !important',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ],
                    'selector': `.editor-styles-wrapper .${elementId}.guten-button-wrapper .guten-button`,
                }
            ],
        },
        {
            id: 'showIcon',
            label: __('Show Icon', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'icon',
            label: __('Icon', 'gutenverse'),
            component: IconSVGControl,
            show: showIcon,
        },
        {
            id: 'iconPosition',
            label: __('Icon Position'),
            show: showIcon,
            component: SelectControl,
            options: [
                {
                    label: __('Before', 'gutenverse'),
                    value: 'before'
                },
                {
                    label: __('After', 'gutenverse'),
                    value: 'after'
                },
            ],
        },
        {
            id: 'iconSpacing',
            label: __('Icon Spacing', 'gutenverse'),
            show: showIcon,
            component: RangeControl,
            allowDeviceControl: true,
            unit: 'px',
            min: 0,
            max: 50,
            step: 1,
            liveStyle: [
                isNotEmpty(iconPosition) && isNotEmpty(iconSpacing) &&  {
                    'type': 'plain',
                    'id': 'iconSpacing',
                    'responsive': true,
                    'selector': `.editor-styles-wrapper .${elementId}.guten-button-wrapper .guten-button i, .editor-styles-wrapper .${elementId}.guten-button-wrapper .guten-button svg`,
                    'properties': [
                        {
                            'name': iconPosition === 'after' ? 'margin-left' : 'margin-right',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct',
                                },
                            }
                        }
                    ],
                }
            ]
        },
        {
            id: 'iconSize',
            label: __('Icon Size', 'gutenverse'),
            component: SizeControl,
            allowDeviceControl: true,
            show: showIcon,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 100,
                    step: 1
                },
                em: {
                    text: 'em',
                    min: 0.1,
                    max: 3,
                    step: 0.1
                },
            },
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'iconSize',
                    'responsive': true,
                    'selector': `.editor-styles-wrapper .${elementId}.guten-button-wrapper .guten-button i`,
                    'properties': [
                        {
                            'name': 'font-size',
                            'valueType': 'direct'
                        }
                    ]
                },
                {
                    'type': 'unitPoint',
                    'id': 'iconSize',
                    'responsive': true,
                    'selector': `.editor-styles-wrapper .${elementId}.guten-button-wrapper .guten-button svg`,
                    'properties': [
                        {
                            'name': 'font-size',
                            'valueType': 'direct'
                        }
                    ]
                },
            ],
        },
        {
            id: 'paddingButton',
            label: __('Button Padding', 'gutenverse'),
            component: DimensionControl,
            allowDeviceControl: true,
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                ['%']: {
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
            id: 'iconLineHeight',
            label: __('Remove Icon Line Height', 'gutenverse'),
            component: CheckboxControl,
        },
    ];
};