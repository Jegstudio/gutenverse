
import { __ } from '@wordpress/i18n';
import { AlignCenter, AlignLeft, AlignRight } from 'gutenverse-core/components';
import { CheckboxControl, ColorControl, IconRadioControl, RangeControl, SelectControl, SizeControl } from 'gutenverse-core/controls';
import { handleAlign, handleColor } from 'gutenverse-core/styling';

export const panelGeneral = (props) => {
    const {
        elementId,
        isDivider,
    } = props;

    return [
        {
            id: 'displayInline',
            label: __('Display Inline', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'isDivider',
            label: __('Divider', 'gutenverse'),
            component: CheckboxControl,
            style: [
                {
                    selector: `.${elementId}:not(.inline-icon-list) .guten-icon-list-item:not(:nth-child(2))`,
                    allowRender : value => value,
                    render: () => 'border-top-style : solid;'
                },
                {
                    selector: `.${elementId}.inline-icon-list .guten-icon-list-item:not(:nth-child(2))`,
                    allowRender : value => value,
                    render: () => 'border-left-style : solid;'
                },
            ]
        },
        {
            id: 'colorDivider',
            label: __('Color Divider', 'gutenverse'),
            show: isDivider,
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId}:not(.inline-icon-list) .guten-icon-list-item:not(:nth-child(2))`,
                    render: value => handleColor(value, 'border-color')
                },
                {
                    selector: `.${elementId}.inline-icon-list .guten-icon-list-item:not(:nth-child(2))`,
                    render: value => handleColor(value, 'border-color')
                },
            ]
        },
        {
            id: 'typeDivider',
            label: __('Type Divider', 'gutenverse'),
            show: isDivider,
            component: SelectControl,
            options:[
                {
                    label: __('Solid', 'gutenverse'),
                    value: 'solid'
                },
                {
                    label: __('Double', 'gutenverse'),
                    value: 'double'
                },
                {
                    label: __('Dotted', 'gutenverse'),
                    value: 'dotted'
                },
                {
                    label: __('Dashed', 'gutenverse'),
                    value: 'dashed'
                },
            ],
            style: [
                {
                    selector: `.${elementId}:not(.inline-icon-list) .guten-icon-list-item:not(:nth-child(2))`,
                    allowRender : value => value,
                    render: value => `border-top-style : ${value};`
                },
                {
                    selector: `.${elementId}.inline-icon-list .guten-icon-list-item:not(:nth-child(2))`,
                    allowRender : value => value,
                    render: value => `border-left-style : ${value};`
                },
            ]
        },
        {
            id: 'widthDivider',
            label: __('Width Divider', 'gutenverse'),
            show: isDivider,
            component: SizeControl,
            style: [
                {
                    selector: `.${elementId}:not(.inline-icon-list) .guten-icon-list-item:not(:nth-child(2))`,
                    render: value => `width : ${value.point}${value.unit};`
                },
                {
                    selector: `.${elementId}.inline-icon-list .guten-icon-list-item:not(:nth-child(2))`,
                    render: value => `width : ${value.point}${value.unit};`
                },
            ]
        },
        {
            id: 'sizeDivider',
            label: __('Size Divider', 'gutenverse'),
            show: isDivider,
            component: SizeControl,
            style: [
                {
                    selector: `.${elementId}:not(.inline-icon-list) .guten-icon-list-item:not(:nth-child(2))`,
                    render: value => `border-top-width : ${value.point}${value.unit};`
                },
                {
                    selector: `.${elementId}.inline-icon-list .guten-icon-list-item:not(:nth-child(2))`,
                    render: value => `border-left-width : ${value.point}${value.unit};`
                },
            ]
        },
        {
            id: 'spaceBetween',
            label: __('Space Between', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            min: 1,
            max: 100,
            step: 1,
            style: [
                {
                    selector: `.${elementId}:not(.inline-icon-list) li.guten-icon-list-item:not(li:first-of-type) > a,
                    .block-editor-block-list__layout .wp-block.${elementId}:not(.inline-icon-list) li.guten-icon-list-item:not(li:first-of-type) > a`,
                    render: value => `margin-top: calc(${value}px/2);`
                },
                {
                    selector: `.${elementId}:not(.inline-icon-list) .guten-icon-list-item:not(:last-child),
                    .block-editor-block-list__layout .wp-block.${elementId}:not(.inline-icon-list) .guten-icon-list-item:not(:last-child)`,
                    render: value => `padding-bottom: calc(${value}px/2);`
                },
                {
                    selector: `.${elementId}.inline-icon-list .guten-icon-list-item:not(:last-child),
                    .block-editor-block-list__layout .wp-block.${elementId}.inline-icon-list .guten-icon-list-item:not(:last-child)`,
                    render: value => `margin-right: calc(${value}px/2);`
                },
                {
                    selector: `.${elementId}.inline-icon-list li.guten-icon-list-item:not(li:first-of-type) > a,
                    .block-editor-block-list__layout .wp-block.${elementId}.inline-icon-list li.guten-icon-list-item:not(li:first-of-type) > a`,
                    render: value => `margin-left: calc(${value}px/2);`
                }
            ]
        },
        {
            id: 'alignList',
            label: __('Text Alignment', 'gutenverse'),
            allowDeviceControl: true,
            component: IconRadioControl,
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
            style: [
                {
                    selector: `.${elementId}:not(.inline-icon-list)`,
                    render: value => `text-align: ${handleAlign(value)};`
                },
                {
                    selector: `.${elementId}.inline-icon-list, .${elementId}:not(.inline-icon-list) .guten-icon-list-item a`,
                    render: value => `justify-content: ${value};`
                },
            ]
        },
        {
            id: 'verticalAlign',
            label: __('Vertical Align'),
            component: SelectControl,
            options: [
                {
                    label: __('Top', 'gutenverse'),
                    value: 'flex-start'
                },
                {
                    label: __('Center', 'gutenverse'),
                    value: 'center'
                },
                {
                    label: __('Bottom', 'gutenverse'),
                    value: 'flex-end'
                },
            ],
            style: [
                {
                    selector: `.${elementId} a`,
                    render: (value) => `align-items: ${value};`
                },
            ],
        },
    ];
};

