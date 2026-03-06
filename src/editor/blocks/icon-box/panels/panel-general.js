
import { __ } from '@wordpress/i18n';
import { CheckboxControl, IconSVGControl, IconRadioControl, SelectControl, AlertControl, SizeControl, TextControl } from 'gutenverse-core/controls';
import { AlignCenter, AlignLeft, AlignRight } from 'gutenverse-core/components';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const panelGeneral = (props) => {
    const {
        elementId,
        watermarkShow,
        badgeShow,
        heightControl,
        url
    } = props;
    const deviceType = getDeviceType();

    return [
        {
            id: 'childNotice',
            component: AlertControl,
            children: <>
                <span>{__('If you include a button within this block, the body link feature will be disabled. This is because you cannot have a link inside another link.')}</span>
            </>
        },
        {
            id: 'hoverWithParent',
            label: __('Button Hover With Card', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'watermarkShow',
            label: __('Enable Hover Watermark?', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'watermarkIcon',
            show: watermarkShow,
            label: __('Hover Watermark Icon', 'gutenverse'),
            component: IconSVGControl
        },
        {
            id: 'iconPosition',
            label: __('Icon Position', 'gutenverse'),
            show: deviceType === 'Desktop',
            component: SelectControl,
            showDeviceControlOnly: true,
            options: [
                {
                    value: 'top',
                    label: 'Top'
                },
                {
                    value: 'left',
                    label: 'Left'
                },
                {
                    value: 'right',
                    label: 'Right'
                },
                {
                    value: 'bottom',
                    label: 'Bottom'
                },
            ]
        },
        {
            id: 'iconPositionResponsive',
            label: __('Icon Position', 'gutenverse'),
            show: deviceType !== 'Desktop',
            component: SelectControl,
            allowDeviceControl: true,
            options: [
                {
                    value: 'top',
                    label: 'Top'
                },
                {
                    value: 'left',
                    label: 'Left'
                },
                {
                    value: 'right',
                    label: 'Right'
                },
                {
                    value: 'bottom',
                    label: 'Bottom'
                }
            ],
        },
        {
            id: 'align',
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
            id: 'heightControl',
            label: __('Icon Box Height', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('Default', 'gutenverse'),
                    value: 'default'
                },
                {
                    label: __('Minimum Height', 'gutenverse'),
                    value: 'min'
                },
                {
                    label: __('Fit Screen', 'gutenverse'),
                    value: 'fit'
                },
            ],
        },
        {
            id: 'height',
            label: __('Minimum Height', 'gutenverse'),
            show: heightControl === 'min',
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 58,
                    max: 1440,
                    step: 1
                },
                vh: {
                    text: 'vh',
                    min: 5,
                    max: 100,
                    step: 1
                },
                vw: {
                    text: 'vw',
                    min: 5,
                    max: 100,
                    step: 1
                },
            },
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'height',
                    'responsive': true,
                    'selector': `.guten-icon-box.${elementId} .guten-icon-box-wrapper`,
                    'properties': [
                        {
                            'name': 'min-height',
                            'valueType': 'direct'
                        }
                    ],
                }
            ]
        },
        {
            id: 'titleTag',
            label: __('Title HTML Tag', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('H1'),
                    value: 'h1'
                },
                {
                    label: __('H2'),
                    value: 'h2'
                },
                {
                    label: __('H3'),
                    value: 'h3'
                },
                {
                    label: __('H4'),
                    value: 'h4'
                },
                {
                    label: __('H5'),
                    value: 'h5'
                },
                {
                    label: __('H6'),
                    value: 'h6'
                },
                {
                    label: __('SPAN'),
                    value: 'span'
                },
            ],
        },
        {
            id: 'showTitle',
            label: __('Show Title', 'gutenverse'),
            component: CheckboxControl
        },
        {
            id: 'showDesc',
            label: __('Show Description', 'gutenverse'),
            component: CheckboxControl
        },
        {
            id: 'badgeShow',
            label: __('Show Badge', 'gutenverse'),
            component: CheckboxControl
        },
        {
            id: 'badgePosition',
            show: badgeShow,
            label: __('Badge Position', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: 'Top Left',
                    value: 'topleft'
                },
                {
                    label: 'Top Center',
                    value: 'topcenter'
                },
                {
                    label: 'Top Right',
                    value: 'topright'
                },
                {
                    label: 'Bottom Left',
                    value: 'bottomleft'
                },
                {
                    label: 'Bottom Center',
                    value: 'bottomcenter'
                },
                {
                    label: 'Bottom Right',
                    value: 'bottomright'
                },
            ]
        },
        {
            id: 'anchorAriaLabel',
            label: __('Aria Label', 'gutenverse'),
            component: TextControl,
            show: url !== undefined && url !== ''
        }
    ];
};

