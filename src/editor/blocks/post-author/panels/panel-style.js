import { __ } from '@wordpress/i18n';

import { ColorControl, SwitchControl, TextShadowControl, TypographyControl } from 'gutenverse-core/controls';

export const stylePanel = (props) => {
    const {
        elementId,
        authorType,
        switcher,
        setSwitcher
    } = props;


    return [
        {
            id: 'typography',
            show: authorType && authorType !== 'user_image',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: '__styleHover',
            show: authorType && authorType !== 'user_image',
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
        {
            id: 'color',
            show: (!switcher.styleHover || switcher.styleHover === 'normal') && authorType && authorType !== 'user_image',
            label: __('Text color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'color',
                    'selector': `
                                .guten-post-author.${elementId} .author-name a,
                                .guten-post-author.${elementId} .author-name
                                `,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ],
                }
            ],
        },
        {
            id: 'textShadow',
            show: (!switcher.styleHover || switcher.styleHover === 'normal') && authorType && authorType !== 'user_image',
            label: __('Text Shadow', 'gutenverse'),
            component: TextShadowControl,
            liveStyle: [
                {
                    'type': 'textShadow',
                    'id': 'textShadow',
                    'properties': [
                        {
                            'name': 'text-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `
                                .guten-post-author.${elementId} .author-name a,
                                .guten-post-author.${elementId} .author-name
                                `,
                }
            ],
        },
        {
            id: 'colorHover',
            show: switcher.styleHover === 'hover' && authorType && authorType !== 'user_image',
            label: __('Hover Text color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'colorHover',
                    'selector': `
                                .guten-post-author.${elementId}:hover .author-name,
                                .guten-post-author.${elementId}:hover .author-name a`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ],
                }
            ],
        },
        {
            id: 'textShadowHover',
            show: switcher.styleHover === 'hover' && authorType && authorType !== 'user_image',
            label: __('Hover Text Shadow', 'gutenverse'),
            component: TextShadowControl,
            liveStyle: [
                {
                    'type': 'textShadow',
                    'id': 'textShadowHover',
                    'properties': [
                        {
                            'name': 'text-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `
                                .guten-post-author.${elementId}:hover .author-name,
                                .guten-post-author.${elementId}:hover .author-name a`,
                }
            ],
        },
    ];
};

