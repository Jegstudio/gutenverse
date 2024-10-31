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
            style: [
                {
                    selector: `.editor-styles-wrapper .${elementId}, .editor-styles-wrapper .${elementId}.vertical > div`,
                    render: value => `justify-content: ${value};`
                },
                {
                    selector: `.editor-styles-wrapper .${elementId}, .editor-styles-wrapper .${elementId}.vertical > div`,
                    render: value => `align-items: ${value};`
                },
                {
                    selector: `.editor-styles-wrapper .${elementId}.horizontal`,
                    render: (value) => {
                        if ('flex-start' === value) {
                            return 'text-align: left;';
                        } else if ('center' === value) {
                            return 'text-align: center;';
                        } else if ('center' === value) {
                            return 'text-align: right;';
                        }
                    }
                },
            ]
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
            style: [
                {
                    selector: `.editor-styles-wrapper .${elementId}.horizontal > div:not(:first-of-type)`,
                    render: value => `margin-left: ${value}px;`
                },
                {
                    selector: `.editor-styles-wrapper .${elementId}.vertical > div:not(:first-of-type)`,
                    render: value => `margin-top: ${value}px;`
                }
            ]
        },
    ];
};