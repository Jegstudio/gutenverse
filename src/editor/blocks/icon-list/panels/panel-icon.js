import { __ } from '@wordpress/i18n';
import { ColorControl, RangeControl } from 'gutenverse-core/controls';

export const panelIcon = (props) => {
    const {
        elementId
    } = props;

    return [
        {
            id: 'iconColor',
            label: __('Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'iconColor',
                    'selector': `.${elementId} .guten-icon-list-item i`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                },
                {
                    'type': 'color',
                    'id': 'iconColor',
                    'selector': `.${elementId}.guten-icon-list .guten-icon-list-item svg`,
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
            id: 'iconColorHover',
            label: __('Hover Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'iconColorHover',
                    'selector': `.${elementId} .guten-icon-list-item:hover i`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                },
                {
                    'type': 'color',
                    'id': 'iconColorHover',
                    'selector': `.${elementId} .guten-icon-list-item:hover svg`,
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
            id: 'iconSize',
            label: __('Size', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            unit: 'px',
            min: 1,
            max: 100,
            step: 1,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'iconSize',
                    'responsive': true,
                    'selector': `.${elementId} .guten-icon-list-item i, .${elementId}.guten-icon-list .guten-icon-list-item svg`,
                    'properties': [
                        {
                            'name': 'font-size',
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
            ]
        },
    ];
};

