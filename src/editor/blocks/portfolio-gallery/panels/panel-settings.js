import { __ } from '@wordpress/i18n';
import { CheckboxControl, IconSVGControl, RangeControl, SelectControl, SizeControl, TextControl } from 'gutenverse-core/controls';

export const settingsPanel = (props) => {
    const {
        elementId,
        showLink,
    } = props;
    return [
        {
            id: 'behavior',
            label: __('Active Behavior', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    value: 'onhover',
                    label: __('On Hover')
                },
                {
                    value: 'onclick',
                    label: __('On Click')
                }
            ]
        },
        {
            id: 'column',
            label: __('Column', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 10,
            step: 1,
            allowDeviceControl: true,
            isParseFloat : true,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'column',
                    'responsive': true,
                    'selector': `.${elementId}.guten-portfolio-gallery .portfolio-gallery-container .content-items .row-item`,
                    'properties': [
                        {
                            'name': 'flex',
                            'valueType': 'pattern',
                            'pattern': 'calc(100% / {value}); max-width: calc(100% / {value})',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ],
                }
            ]
        },
        {
            id: 'rowHeight',
            label: __('Row Height', 'gutenverse'),
            component: SizeControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'rowHeight',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'height',
                            'valueType': 'direct',
                        }
                    ],
                    'selector': `.${elementId}.guten-portfolio-gallery .portfolio-gallery-container .content-items .row-item`,
                }
            ]
        },
        {
            id: 'reversePosition',
            label: __('Reverse Position', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'showLink',
            label: __('Show Link', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'linkText',
            show: showLink,
            label: __('Link Text', 'gutenverse'),
            component: TextControl,
        },
        {
            id: 'linkIcon',
            show: showLink,
            label: __('Link Icon', 'gutenverse'),
            component: IconSVGControl,
        },
        {
            id: 'linkIconPosition',
            show: showLink,
            label: __('Link Icon Position', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    value: 'row-reverse',
                    label: __('Left')
                },
                {
                    value: 'row',
                    label: __('Right')
                }
            ],
        }
    ];
};