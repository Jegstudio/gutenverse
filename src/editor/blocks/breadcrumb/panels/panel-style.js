import { ColorControl, IconSVGControl, IconRadioControl, RangeControl, TypographyControl } from 'gutenverse-core/controls';
import { __ } from '@wordpress/i18n';
import { AlignLeft, AlignCenter, AlignRight } from 'gutenverse-core/components';

export const stylePanel = (props) => {
    const {
        elementId
    } = props;


    return [
        {
            id: 'alignment',
            label: __('Alignment', 'gutenverse'),
            component: IconRadioControl,
            allowDeviceControl: true,
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
            id: 'typography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: 'linkColor',
            label: __('Link Color', 'gutenverse'),
            component: ColorControl,
        },
        {
            id: 'linkColorHover',
            label: __('Link Color Hover', 'gutenverse'),
            component: ColorControl,
        },
        {
            id: 'lastTextColor',
            label: __('Current Page Color', 'gutenverse'),
            component: ColorControl,
        },
        {
            id: 'iconColor',
            component: ColorControl,
            label: __('Icon Color', 'gutenverse'),
        },
        {
            id: 'iconSize',
            label: __('Icon Size', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 100,
            unit: 'px',
            step: 1,
            liveStyle: [
                {
                    'id': 'iconSize',
                    'type': 'plain',
                    'properties': [
                        {
                            'name': 'font-size',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct',
                                }
                            }
                        },
                    ],
                    'selector': `.guten-element.${elementId}.guten-breadcrumb .breadcrumb-nav li.separator i`,
                },
                {
                    'id': 'iconSize',
                    'type': 'plain',
                    'properties': [
                        {
                            'name': 'font-size',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct',
                                }
                            }
                        },
                    ],
                    'selector': `.guten-element.${elementId}.guten-breadcrumb .breadcrumb-nav li.separator svg`,
                }
            ]
        },
        {
            id: 'gap',
            label: __('Gap', 'gutenverse'),
            description: __('Value between arrow and text', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 100,
            unit: 'px',
            step: 1,
            liveStyle: [
                {
                    'id': 'gap',
                    'type': 'plain',
                    'properties': [
                        {
                            'name': 'margin-right',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct',
                                }
                            }
                        },
                        {
                            'name': 'margin-left',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct',
                                }
                            }
                        }
                    ],
                    'selector': `.guten-element.${elementId}.guten-breadcrumb .breadcrumb-nav li.separator`,
                }
            ]
        },
        {
            id: 'separatorIcon',
            label: __('Separator Icon', 'gutenverse'),
            component: IconSVGControl
        },
    ];
};