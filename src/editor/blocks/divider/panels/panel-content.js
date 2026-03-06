import { __ } from '@wordpress/i18n';

import { AlignCenter, AlignLeft, AlignRight } from 'gutenverse-core/components';
import { ColorControl, IconSVGControl, IconRadioControl, RangeControl, SelectControl, SizeControl, TypographyControl } from 'gutenverse-core/controls';

export const contentPanel = (props) => {
    const {
        elementId,
        content
    } = props;

    return [
        {
            id: 'content',
            label: __('Add Content', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('None'),
                    value: 'none'
                },
                {
                    label: __('Text'),
                    value: 'text'
                },
                {
                    label: __('Icon'),
                    value: 'icon'
                },
            ],
        },
        {
            id: 'contentAlign',
            label: __(' Content Alignment', 'gutenverse'),
            show: ['text', 'icon'].includes(content),
            component: IconRadioControl,
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
            ]
        },
        {
            id: 'contentColor',
            label: __('Color', 'gutenverse'),
            show: ['text', 'icon'].includes(content),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'contentColor',
                    'selector': `.${elementId} .guten-divider-content span, .${elementId} .guten-divider-content i`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                },
                {
                    'type': 'color',
                    'id': 'contentColor',
                    'selector': `.${elementId} .guten-divider-content svg`,
                    'properties': [
                        {
                            'name': 'fill',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'contentSpacing',
            label: __('Spacing', 'gutenverse'),
            show: ['text', 'icon'].includes(content),
            component: RangeControl,
            allowDeviceControl: true,
            unit: 'px',
            min: 1,
            max: 50,
            step: 1,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'contentSpacing',
                    'responsive': true,
                    'selector': `.${elementId} .guten-divider-content span, .${elementId} .guten-divider-content i, .${elementId} .guten-divider-content svg`,
                    'properties': [
                        {
                            'name': 'margin',
                            'valueType': 'pattern',
                            'pattern': '0 {value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            id: 'typography',
            label: __('Typography', 'gutenverse'),
            show: content === 'text',
            component: TypographyControl,
        },
        {
            id: 'icon',
            label: __('Divider Icon', 'gutenverse'),
            show: content === 'icon',
            component: IconSVGControl,
        },
        {
            id: 'iconSize',
            label: __('Icon Size', 'gutenverse'),
            show: content === 'icon',
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 10,
                    max: 100,
                    step: 1
                },
                em: {
                    text: 'em',
                    min: 0.6,
                    max: 6,
                    step: 0.1
                },
            },
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'iconSize',
                    'selector': `.${elementId} .guten-divider-content i`,
                    'responsive': true,
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
                    'selector': `.${elementId} .guten-divider-content svg`,
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'font-size',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
    ];
};