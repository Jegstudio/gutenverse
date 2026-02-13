import { AlertControl, RangeControl, SwitchControl } from 'gutenverse-core/controls';
import { __ } from '@wordpress/i18n';

export const blurPanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher
    } = props;

    return [{
        id: 'blur-notice',
        component: AlertControl,
        children: <>
            <span>{__('This option will blur background and anything behind this element')}</span>
        </>
    },
    {
        id: '__blurHover',
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
        onChange: ({ __blurHover }) => setSwitcher({ ...switcher, state: __blurHover })
    },
    {
        id: 'blur',
        label: __('Blur', '--gctd--'),
        show: !switcher.state || switcher.state === 'normal',
        component: RangeControl,
        min: 0,
        max: 100,
        allowDeviceControl: true,
        liveStyle: [
            {
                'type': 'plain',
                'id': 'blur',
                'responsive': true,
                'selector': `.${elementId}:before`,
                'properties': [
                    {
                        'name': '-webkit-backdrop-filter',
                        'valueType': 'pattern',
                        'pattern': 'blur({value}px)',
                        'patternValues': {
                            'value': {
                                'type': 'direct',
                            },
                        }
                    },
                    {
                        'name': 'backdrop-filter',
                        'valueType': 'pattern',
                        'pattern': 'blur({value}px)',
                        'patternValues': {
                            'value': {
                                'type': 'direct',
                            },
                        }
                    }
                ],
            }
        ]
    },
    {
        id: 'blurHover',
        label: __('Blur Hover', '--gctd--'),
        show: switcher.state === 'hover',
        component: RangeControl,
        min: 0,
        max: 100,
        allowDeviceControl: true,
        liveStyle: [
            {
                'type': 'plain',
                'id': 'blurHover',
                'responsive': true,
                'selector': `.${elementId}:hover::before`,
                'properties': [
                    {
                        'name': '-webkit-backdrop-filter',
                        'valueType': 'pattern',
                        'pattern': 'blur({value}px)',
                        'patternValues': {
                            'value': {
                                'type': 'direct',
                            },
                        }
                    },
                    {
                        'name': 'backdrop-filter',
                        'valueType': 'pattern',
                        'pattern': 'blur({value}px)',
                        'patternValues': {
                            'value': {
                                'type': 'direct',
                            },
                        }
                    }
                ],
            }
        ]
    }];
};