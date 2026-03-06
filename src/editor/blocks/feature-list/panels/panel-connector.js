import { __ } from '@wordpress/i18n';
import { AlertControl, ColorControl, RangeControl, SelectControl } from 'gutenverse-core/controls';

export const connectorPanel = (props) => {
    const {
        elementId,
        showConnector
    } = props;
    return [
        {
            id: 'connector-notice',
            component: AlertControl,
            children: <>
                <span>{__('This Panel Option Only Show If You Turn On "Show Connector" Option')}</span>
            </>
        },
        {
            id: 'connectorStyle',
            label: __('Connector Style', 'gutenverse'),
            show: showConnector,
            component: SelectControl,
            options: [
                {
                    label: __('Default/Solid'),
                    value: 'solid'
                },
                {
                    label: __('Dotted'),
                    value: 'dotted'
                },
                {
                    label: __('Dashed'),
                    value: 'dashed'
                },
                {
                    label: __('Double'),
                    value: 'double'
                },
            ],
        },
        {
            id: 'connectorColor',
            label: __('Connector Color', 'gutenverse'),
            component: ColorControl,
            show: showConnector,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'connectorColor',
                    'selector': `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item .connector-top, .${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item .connector-bottom`,
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
            id: 'connectorWidth',
            label: __('Connector Width', 'gutenverse'),
            component: RangeControl,
            show: showConnector,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'connectorWidth',
                    'responsive': true,
                    'selector': `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item .connector-top, .${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item .connector-bottom`,
                    'properties': [
                        {
                            'name': 'border-width',
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
                    'id': 'connectorWidth',
                    'selector': `.${elementId}.guten-feature-list`,
                    'responsive': true,
                    'properties': [
                        {
                            'name': '--connector-width',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ]
                }
            ]
        }
    ];
};