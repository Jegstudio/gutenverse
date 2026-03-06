import { __ } from '@wordpress/i18n';
import { ColorControl, SwitchControl, TypographyControl } from 'gutenverse-core/controls';

export const stylePanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher,
        hoverWithParent,
        parentSelector
    } = props;

    return [
        {
            id: '__styleHover',
            component: SwitchControl,
            options: [
                {
                    value: 'normal',
                    label: 'Normal'
                },
                {
                    value: 'hover',
                    label: 'Hover'
                }
            ],
            onChange: ({ __styleHover }) => setSwitcher({ ...switcher, styleHover: __styleHover })
        },
        // Normal
        {
            id: 'color',
            show: !switcher.styleHover || switcher.styleHover === 'normal',
            label: __('Text Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'color',
                    'selector': `.editor-styles-wrapper .${elementId}.guten-button-wrapper .guten-button span`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                }
            ],
        },
        {
            id: 'iconColor',
            show: !switcher.styleHover || switcher.styleHover === 'normal',
            label: __('Icon Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'iconColor',
                    'selector': `.editor-styles-wrapper .${elementId}.guten-button-wrapper .guten-button i`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                }
            ],
        },
        // Hover
        {
            id: 'hoverTextColor',
            show: switcher.styleHover === 'hover',
            label: __('Hover Text Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'hoverTextColor',
                    'selector': hoverWithParent ? parentSelector + ` .${elementId}.guten-button-wrapper .guten-button span` :
                        `.editor-styles-wrapper .${elementId}.guten-button-wrapper .guten-button:hover span`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                }
            ],
        },
        {
            id: 'hoverIconColor',
            show: switcher.styleHover === 'hover',
            label: __('Hover Icon Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'hoverTextColor',
                    'selector': hoverWithParent ? parentSelector + ` .${elementId}.guten-button-wrapper .guten-button i` :
                        `.editor-styles-wrapper .${elementId}.guten-button-wrapper .guten-button:hover i`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                }
            ],
        },
        {
            id: 'typography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
        },
    ];
};