import { __ } from '@wordpress/i18n';
import { ColorControl, DimensionControl, TypographyControl, CheckboxControl } from 'gutenverse-core/controls';

export const excerptPanel = (props) => {
    const {
        elementId,
        excerptInline
    } = props;

    return [
        {
            id: 'excerptMargin',
            label: __('Margin', 'gutenverse'),
            component: DimensionControl,
            position: ['top', 'right', 'bottom', 'left'],
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                percent: {
                    text: '%',
                    unit: '%'
                },
            },
        },
        {
            id: 'excerptColor',
            label: __('Text color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'excerptColor',
                    'selector': `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-post-excerpt p`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ],
                }
            ]
        },
        {
            id: 'excerptTypography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl
        },
        {
            id: 'excerptInline',
            label: __('Set Inline Excerpt', 'gutenverse'),
            component: CheckboxControl,
            allowDeviceControl: true,
            deviceValues: excerptInline,
            usePreviousDeviceValue: true,
            usePreviousDevice: true,
        },
    ];
};