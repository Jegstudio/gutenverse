import { __ } from '@wordpress/i18n';
import { CheckboxControl, IconRadioControl, RangeControl, SizeControl, TextControl, SelectControl } from 'gutenverse-core/controls';
import { AlignCenter, AlignLeft, AlignRight } from 'gutenverse-core/components';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { isNotEmpty } from 'gutenverse-core/helper';

export const contentPanel = props => {
    const {
        elementId,
        formStyle,
        inputWidth
    } = props;

    const device = getDeviceType();

    const inputWidthDevice = inputWidth[device] ? inputWidth[device] : { point : '100', unit : '%' };

    return [
        {
            id: 'inputPlaceholder',
            label: __('Input Placeholder', 'gutenverse'),
            component: TextControl,
        },
        {
            id: 'showButton',
            label: __('Show Button', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'formStyle',
            label: __('Form Style', 'gutenverse'),
            component: SelectControl,
            allowDeviceControl: true,
            options: [
                {
                    label: 'Inline',
                    value: 'fit-content'
                },
                {
                    label: 'Full WIdth',
                    value: '100%'
                },
            ],
        },
        {
            id: 'inputHeight',
            label: __('Height', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            unit: 'px',
            min: 1,
            max: 1000,
            step: 1,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'inputHeight',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'height',
                            'valueType': 'pattern',
                            'pattern': '{value}px !important',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ],
                    'selector': `.${elementId} .gutenverse-search.gutenverse-search-input, .${elementId} .guten-button-wrapper .guten-button `,
                }
            ],
        },
        {
            id: 'inputWidth',
            label: __('Input Width', 'gutenverse'),
            component: SizeControl,
            allowDeviceControl: true,
            min: 1,
            max: 1000,
            step: 1,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 1000,
                    step: 1,
                    unit: 'px',
                },
                ['%']: {
                    text: '%',
                    min: 1,
                    max: 100,
                    step: 1,
                    unit: '%',
                },
                vw: {
                    text: 'vw',
                    min: 1,
                    max: 100,
                    step: 1,
                    unit: 'vw',
                },
            },
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'inputWidth',
                    'responsive': true,
                    'selector': `.${elementId} .search-input-container-outer`,
                    'properties': [
                        {
                            'name': 'width',
                            'valueType': 'direct'
                        }
                    ],
                }
            ]
        },
        {
            id: 'buttonWidth',
            label: __('Button Container Width', 'gutenverse'),
            component: SizeControl,
            allowDeviceControl: true,
            min: 1,
            max: 1000,
            step: 1,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 1000,
                    step: 1,
                    unit: 'px',
                },
                ['%']: {
                    text: '%',
                    min: 1,
                    max: 100,
                    step: 1,
                    unit: '%',
                },
                vw: {
                    text: 'vw',
                    min: 1,
                    max: 100,
                    step: 1,
                    unit: 'vw',
                },
            },
            liveStyle: [
                isNotEmpty(formStyle) && '100%' !== formStyle[device] && {
                    'type': 'unitPoint',
                    'id': 'buttonWidth',
                    'selector': `.${elementId} .gutenverse-search-form .guten-search-button-wrapper`,
                    'properties': [{
                        'name': 'width',
                        'valueType': 'direct',
                        'important': true
                    }],
                    'responsive': true,
                },
                {
                    'type': 'plain',
                    'id': 'buttonWidth',
                    'selector': `.${elementId} .search-input-container-outer`,
                    'properties': [
                        {
                            'name': 'max-width',
                            'valueType': 'function',
                            'functionName': 'searchButtonContainerWidth',
                        }
                    ],
                    'skip_device': ['Mobile'],
                    'responsive': true,
                },
            ]
        },
        {
            id: 'alignContent',
            label: __('Alignment', 'gutenverse'),
            component: IconRadioControl,
            allowDeviceControl: true,
            options: [
                {
                    label: __('Align Left', 'gutenverse'),
                    value: 'flex-start',
                    icon: <AlignLeft/>,
                },
                {
                    label: __('Align Center', 'gutenverse'),
                    value: 'center',
                    icon: <AlignCenter/>,
                },
                {
                    label: __('Align Right', 'gutenverse'),
                    value: 'flex-end',
                    icon: <AlignRight/>,
                },
            ],
        },
    ];
};