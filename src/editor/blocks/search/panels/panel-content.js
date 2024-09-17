import { __ } from '@wordpress/i18n';
import { CheckboxControl, IconRadioControl, RangeControl, SizeControl, TextControl, SelectControl } from 'gutenverse-core/controls';
import { AlignCenter, AlignLeft, AlignRight } from 'gutenverse-core/components';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const contentPanel = props => {
    const {
        elementId
    } = props;

    const device = getDeviceType();

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
            style: [
                {
                    selector: `.${elementId} .gutenverse-search-form .guten-search-button-wrapper, .${elementId} .gutenverse-search-form .guten-search-button-wrapper .guten-button-wrapper .guten-button`,
                    render: value => `width: ${value}`
                },
                {
                    selector: `.${elementId} .gutenverse-search-form .guten-search-button-wrapper, .${elementId} .gutenverse-search-form .gutenverse-search-input`,
                    allowRender: value => '100%' === value[device],
                    render: value => `width: ${value} !important`
                }
            ]
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
            style: [
                {
                    selector: `.${elementId} .gutenverse-search.gutenverse-search-input, .${elementId} .guten-button-wrapper .guten-button `,
                    render: value => `height: ${value}px!important;`
                }
            ]
        },
        {
            id: 'inputWidth',
            label: __('Width', 'gutenverse'),
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
            style: [
                {
                    selector: `.${elementId} .gutenverse-search.gutenverse-search-input`,
                    render: value => `width: ${value.point}${value.unit}!important;`
                }
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
            style: [
                {
                    selector: `.${elementId} .gutenverse-search-form`,
                    render: value => `justify-content: ${value};`
                }
            ]
        },
    ];
};