
import { __ } from '@wordpress/i18n';
import { AlignCenter, AlignLeft, AlignRight } from 'gutenverse-core/components';
import { CheckboxControl, ColorControl, IconRadioControl, RangeControl, SelectControl, SizeControl } from 'gutenverse-core/controls';

export const panelGeneral = (props) => {
    const {
        elementId,
        isDivider,
        displayInline,
        verticalAlign
    } = props;

    return [
        {
            id: 'displayInline',
            label: __('Display Inline', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'isDivider',
            label: __('Divider', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'spaceDivider',
            label: __('Divider Horizontal Spacer', 'gutenverse'),
            show: isDivider && !displayInline,
            component: RangeControl,
            allowDeviceControl: true,
            min: 1,
            max: 100,
            step: 1,
            unit: 'px',
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'spaceDivider',
                    'responsive' : true,
                    'selector': `.${elementId} > .list-wrapper:not(.inline-icon-list) > .guten-icon-list-item .list-divider`,
                    'properties': [
                        {
                            'name': 'margin',
                            'valueType': 'pattern',
                            'pattern': '0 {value}px',
                            'patternValues' : {
                                'value' : {
                                    'type' : 'direct'
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            id: 'colorDivider',
            label: __('Color Divider', 'gutenverse'),
            show: isDivider,
            component: ColorControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'colorDivider',
                    'responsive': true,
                    'selector': `.${elementId} > .list-wrapper:not(.inline-icon-list) > .guten-icon-list-item:not(:nth-child(1)) .list-divider`,
                    'properties': [
                        {
                            'name': 'border-color',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'typeDivider',
            label: __('Type Divider', 'gutenverse'),
            show: isDivider,
            component: SelectControl,
            options: [
                {
                    label: __('Solid', 'gutenverse'),
                    value: 'solid'
                },
                {
                    label: __('Double', 'gutenverse'),
                    value: 'double'
                },
                {
                    label: __('Dotted', 'gutenverse'),
                    value: 'dotted'
                },
                {
                    label: __('Dashed', 'gutenverse'),
                    value: 'dashed'
                },
            ],
        },
        {
            id: 'widthDivider',
            label: displayInline ? __('Height Divider', 'gutenverse') : __('Width Divider', 'gutenverse'),
            show: isDivider,
            component: SizeControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'widthDivider',
                    'responsive': true,
                    'selector': `.${elementId}.guten-icon-list > .list-wrapper:not(.inline-icon-list) > .guten-icon-list-item .list-divider`,
                    'properties': [
                        {
                            'name': 'width',
                            'valueType': 'direct'
                        }
                    ]
                },
                {
                    'type': 'unitPoint',
                    'id': 'widthDivider',
                    'responsive': true,
                    'selector': `.${elementId}.guten-icon-list > .list-wrapper.inline-icon-list > .guten-icon-list-item .list-divider`,
                    'properties': [
                        {
                            'name': 'height',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'sizeDivider',
            label: __('Size Divider', 'gutenverse'),
            show: isDivider,
            component: SizeControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'sizeDivider',
                    'responsive': true,
                    'selector': `.${elementId} > .list-wrapper:not(.inline-icon-list) > .guten-icon-list-item:not(:nth-child(1)) .list-divider`,
                    'properties': [
                        {
                            'name': 'border-top-width',
                            'valueType': 'direct'
                        }
                    ]
                },
                {
                    'type': 'unitPoint',
                    'id': 'sizeDivider',
                    'responsive': true,
                    'selector': `.${elementId} > .list-wrapper.inline-icon-list > .guten-icon-list-item:not(:nth-child(1)) .list-divider`,
                    'properties': [
                        {
                            'name': 'border-left-width',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'spaceBetween',
            label: __('Space Between', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            min: 1,
            max: 100,
            step: 1,
            unit: 'px',
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'spaceBetween',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'margin-top',
                            'valueType': 'pattern',
                            'pattern': 'calc({value}px/2)',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ],
                    'selector': `.${elementId} > .list-wrapper:not(.inline-icon-list) > li.guten-icon-list-item:not(:first-of-type) > a, .block-editor-block-list__layout .wp-block.${elementId} > .list-wrapper:not(.inline-icon-list) > li.guten-icon-list-item:not(:first-of-type) > a`,
                },
                {
                    'type': 'plain',
                    'id': 'spaceBetween',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'padding-bottom',
                            'valueType': 'pattern',
                            'pattern': 'calc({value}px/2)',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ],
                    'selector': `.${elementId} > .list-wrapper:not(.inline-icon-list) > .guten-icon-list-item:not(:last-child), .block-editor-block-list__layout .wp-block.${elementId} .list-wrapper:not(.inline-icon-list) > .guten-icon-list-item:not(:last-child)`,

                },
                {
                    'type': 'plain',
                    'id': 'spaceBetween',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'margin-right',
                            'valueType': 'pattern',
                            'pattern': 'calc({value}px/2)',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ],
                    'selector': `.${elementId} > .list-wrapper.inline-icon-list .guten-icon-list-item:not(:last-child), .block-editor-block-list__layout .wp-block.${elementId} > .list-wrapper.inline-icon-list > .guten-icon-list-item:not(:last-child)`,

                },
                {
                    'type': 'plain',
                    'id': 'spaceBetween',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'margin-left',
                            'valueType': 'pattern',
                            'pattern': 'calc({value}px/2)',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ],
                    'selector': `.${elementId} > .list-wrapper.inline-icon-list > li.guten-icon-list-item:not(li:first-of-type) > a, .block-editor-block-list__layout .wp-block.${elementId} > .list-wrapper.inline-icon-list > li.guten-icon-list-item:not(li:first-of-type) > a`,

                }
            ]
        },
        {
            id: 'alignList',
            label: __('Text Alignment', 'gutenverse'),
            allowDeviceControl: true,
            component: IconRadioControl,
            options: [
                {
                    label: __('Align Left', 'gutenverse'),
                    value: 'flex-start',
                    icon: <AlignLeft />,
                },
                {
                    label: __('Align Center', 'gutenverse'),
                    value: 'center',
                    icon: <AlignCenter />,
                },
                {
                    label: __('Align Right', 'gutenverse'),
                    value: 'flex-end',
                    icon: <AlignRight />,
                },
            ],
        },
        {
            id: 'verticalAlign',
            label: __('Vertical Align'),
            component: SelectControl,
            options: [
                {
                    label: __('Top', 'gutenverse'),
                    value: 'flex-start'
                },
                {
                    label: __('Center', 'gutenverse'),
                    value: 'center'
                },
                {
                    label: __('Bottom', 'gutenverse'),
                    value: 'flex-end'
                },
            ],
        },
        {
            id: 'adjustVerticalAlign',
            label: __('Adjust Vertical Align', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            show: verticalAlign === 'flex-start',
            min: -15,
            max: 15,
            step: 1,
            unit: 'px',
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'adjustVerticalAlign',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'margin-top',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ],
                    'selector': `.${elementId} .guten-icon-list-item i:before`,
                },
            ]
        },
    ];
};

