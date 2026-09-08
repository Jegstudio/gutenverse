import { __ } from '@wordpress/i18n';
import { IconRadioControl, RangeControl } from 'gutenverse-core/controls';
import { AlignCenter, AlignLeft, AlignRight } from 'gutenverse-core/components';

export const contentStyle = (props) => {
    const {
        elementId,
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
            id: 'gap',
            label: __('Social Icon Gap', 'gutenverse'),
            component: RangeControl,
            default: 10,
            min: 1,
            max: 100,
            allowDeviceControl: true,
            unit: 'px',
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'gap',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'margin-left',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ],
                    'selector': `.editor-styles-wrapper .${elementId}.horizontal > div:not(:first-of-type), .editor-styles-wrapper .${elementId}.horizontal > .gutenverse-share-more-toggle`,
                },
                {
                    'type': 'plain',
                    'id': 'gap',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'row-gap',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ],
                    'selector': `.editor-styles-wrapper .${elementId}.has-more-toggle.horizontal`,
                },
                {
                    'type': 'plain',
                    'id': 'gap',
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
                    'selector': `.editor-styles-wrapper .${elementId}.vertical > div:not(:first-of-type), .editor-styles-wrapper .${elementId}.vertical > .gutenverse-share-more-toggle`,
                }
            ]
        },
    ];
};
