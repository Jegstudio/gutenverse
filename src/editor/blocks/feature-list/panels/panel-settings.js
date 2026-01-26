import { __ } from '@wordpress/i18n';
import { CheckboxControl, IconControl, ImageControl, NumberControl, RangeControl, RepeaterControl, SelectControl, SVGControl, TextareaControl, TextControl } from 'gutenverse-core/controls';
import { getDefaultImageLoadRepeater } from "../../../helper";

export const settingsPanel = (props) => {
    const {
        elementId,
    } = props;
    return [
        {
            id: 'featureList',
            component: RepeaterControl,
            titleFormat: '<strong><%= value.title ? value.title : "Feature List" %></strong>',
            repeaterDefault: {
                type: 'icon',
            },
            options: [
                {
                    id: 'title',
                    label: __('Title', 'gutenverse'),
                    component: TextControl,
                },
                {
                    id: 'content',
                    label: __('Content', 'gutenverse'),
                    component: TextareaControl,
                },
                {
                    id: 'link',
                    label: __('Link', 'gutenverse'),
                    component: TextControl
                },
                {
                    id: 'type',
                    label: __('Icon Type', 'gutenverse'),
                    component: SelectControl,
                    options: [
                        {
                            value: 'icon',
                            label: 'Icon'
                        },
                        {
                            value: 'svg',
                            label: 'SVG'
                        },
                        {
                            value: 'image',
                            label: 'Image'
                        },
                        {
                            value: 'number',
                            label: 'Number'
                        },
                    ],
                },
                {
                    id: 'image',
                    label: __('Image', 'gutenverse'),
                    show: value => value.type === 'image',
                    component: ImageControl,
                },
                {
                    id: 'imageLoad',
                    label: __('Image Load', 'gutenverse'),
                    show: value => value.type === 'image',
                    component: SelectControl,
                    defaultValue: getDefaultImageLoadRepeater,
                    options: [
                        {
                            label: __('Normal Load', 'gutenverse'),
                            value: 'eager'
                        },
                        {
                            label: __('Lazy Load', 'gutenverse'),
                            value: 'lazy'
                        },
                    ],
                },
                {
                    id: 'icon',
                    label: __('Icon', 'gutenverse'),
                    show: value => value.type === 'icon',
                    component: IconControl,
                },
                {
                    id: 'svg',
                    label: __('SVG', 'gutenverse'),
                    show: value => value.type === 'svg',
                    component: SVGControl,
                },
                {
                    id: 'number',
                    label: __('Number', 'gutenverse'),
                    show: value => value.type === 'number',
                    component: NumberControl,
                },
            ],
        },
        {
            id: 'iconWrapperShape',
            label: __('Icon Wrapper Shape', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    value: 'square',
                    label: 'Square'
                },
                {
                    value: 'rhombus',
                    label: 'Rhombus'
                },
            ],
        },
        {
            id: 'iconPosition',
            label: __('Icon Wrapper Shape', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    value: 'left',
                    label: 'Left'
                },
                {
                    value: 'right',
                    label: 'Right'
                },
            ],
        },
        {
            id: 'showConnector',
            label: __('Show Connector', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'listSpace',
            component: RangeControl,
            label: __('List Space', 'gutenverse'),
            allowDeviceControl: true,
            unit: 'px',
            min: 1,
            max: 100,
            step: 1,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'listSpace',
                    'selector': `.${elementId}.guten-feature-list`,
                    'responsive': true,
                    'properties': [
                        {
                            'name': '--space-between',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ]
                },
                {
                    'type': 'plain',
                    'id': 'listSpace',
                    'responsive': true,
                    'selector': `.${elementId}.guten-feature-list .feature-list-wrapper`,
                    'properties': [
                        {
                            'name': 'gap',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        },
                    ]
                }
            ]
        },
    ];
};