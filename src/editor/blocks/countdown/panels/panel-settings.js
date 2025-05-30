
import { __ } from '@wordpress/i18n';
import { CheckboxControl, ColorControl, DateTimeControl, RangeControl, SelectControl, TextControl } from 'gutenverse-core/controls';

export const settingPanel = (props) => {
    const {
        showDivider,
        elementId
    } = props;
    return [
        {
            id: 'dueDate',
            label: __('Due Date', 'gutenverse'),
            component: DateTimeControl,
            enableTime: true,
            minDate: 'today',
            dateFormat: 'j F Y H:i',
        },
        {
            id: 'showDays',
            label: __('Show Days', 'gutenverse'),
            component: CheckboxControl
        },
        {
            id: 'labelDays',
            label: __('Label for Days', 'gutenverse'),
            component: TextControl
        },
        {
            id: 'showHours',
            label: __('Show Hours', 'gutenverse'),
            component: CheckboxControl
        },
        {
            id: 'labelHours',
            label: __('Label for Hours', 'gutenverse'),
            component: TextControl
        },
        {
            id: 'showMinutes',
            label: __('Show Minutes', 'gutenverse'),
            component: CheckboxControl
        },
        {
            id: 'labelMinutes',
            label: __('Label for Minutes', 'gutenverse'),
            component: TextControl
        },
        {
            id: 'showSeconds',
            label: __('Show Seconds', 'gutenverse'),
            component: CheckboxControl
        },
        {
            id: 'labelSeconds',
            label: __('Label for Seconds', 'gutenverse'),
            component: TextControl
        },
        {
            id: 'showDivider',
            label: __('Show Separator', 'gutenverse'),
            component: CheckboxControl
        },
        {
            id: 'dividerType',
            label: __('Separator Type', 'gutenverse'),
            component: SelectControl,
            show: showDivider,
            options: [
                {
                    label: __('None', 'gutenverse'),
                    value: '',
                },
                {
                    label: __('Solid', 'gutenverse'),
                    value: '|',
                },
                {
                    label: __('Colon', 'gutenverse'),
                    value: ':',
                },
            ],
        },
        {
            id: 'dividerColor',
            label: __('Divider color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'dividerColor',
                    'selector': `.guten-element.guten-countdown.${elementId} .countdown-divider`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'dividerSize',
            label: __('Set Divider Size', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            unit: 'px',
            min: 0,
            max: 100,
            step: 1,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'dividerSize',
                    'selector': `.guten-element.guten-countdown.${elementId} .countdown-divider`,
                    'responsive': true,
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
                }
            ]
        },
    ];
};