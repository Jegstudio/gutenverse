import { __ } from '@wordpress/i18n';
import { CheckboxControl, DimensionControl, IconSVGControl, SizeControl, TextControl, TypographyControl } from 'gutenverse-core/controls';

export const contentPanel = (props) => {
    const {
        elementId,
        forceHideText,
        addStyle,
        removeStyle
    } = props;

    return [
        {
            id: 'icon',
            label: __('Icon', 'gutenverse'),
            component: IconSVGControl,
        },
        {
            id: 'iconSize',
            label: __('Icon Size', 'gutenverse'),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 100,
                    step: 1
                },
                em: {
                    text: 'em',
                    min: 0.1,
                    max: 3,
                    step: 0.1
                },
            },
            liveStyle : [
                {
                    'type': 'unitPoint',
                    'id': 'iconSize',
                    'responsive' : true,
                    'properties': [
                        {
                            'name': 'font-size',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.guten-social-icon #${elementId} i`,
                },
                {
                    'type': 'unitPoint',
                    'id': 'iconSize',
                    'responsive' : true,
                    'properties': [
                        {
                            'name': 'font-size',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.guten-social-icon #${elementId} svg`,
                }
            ]
        },
        {
            id: 'forceHideText',
            label: __('Force hide text', 'gutenverse'),
            component: CheckboxControl,
            onChange: values => {
                if(values.forceHideText) {
                    const classes = `.guten-social-icon #${elementId} span`;
                    const hideStyle = `${classes} { display: none; }`;

                    addStyle(
                        'forceHideText',
                        hideStyle
                    );
                } else {
                    removeStyle('forceHideText');
                }
            }
        },
        {
            id: 'typography',
            label: __('Typography', 'gutenverse'),
            show: !forceHideText,
            component: TypographyControl,
        },
        {
            id: 'borderRadius',
            label: __('Border Radius', 'gutenverse'),
            component: DimensionControl,
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                '%': {
                    text: '%',
                    unit: '%'
                },
            },
        },
        {
            id: 'ariaLabel',
            label: __('Aria Label', 'gutenverse'),
            component: TextControl
        }
    ];
};