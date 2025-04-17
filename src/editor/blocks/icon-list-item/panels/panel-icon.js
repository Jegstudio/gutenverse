import { __ } from '@wordpress/i18n';
import { RangeControl, TextControl } from 'gutenverse-core/controls';

export const panelIcon = (props) => {
    const {
        elementId
    } = props;

    return [
        {
            id: 'iconLineHeight',
            label: __('Icon line height', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            unit: 'px',
            min: 1,
            max: 100,
            step: 1,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'iconLineHeight',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'line-height',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ],
                    'selector': `.${elementId}.guten-icon-list-item i`,
                }
            ]
        },
        {
            id: 'ariaLabel',
            label: __('Aria Label', 'gutenverse'),
            component: TextControl
        }
    ];
};

