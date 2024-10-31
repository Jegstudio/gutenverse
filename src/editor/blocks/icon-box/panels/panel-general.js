
import { __ } from '@wordpress/i18n';
import { CheckboxControl, IconControl, IconRadioControl, SelectControl, AlertControl } from 'gutenverse-core/controls';
import { AlignCenter, AlignLeft, AlignRight } from 'gutenverse-core/components';
import { handleAlign } from 'gutenverse-core/styling';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const panelGeneral = (props) => {
    const {
        elementId,
        watermarkShow,
        badgeShow,
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
            component: IconControl,
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
            style: [
                {
                    selector: `.${elementId} .guten-icon-box-wrapper`,
                    allowRender: (value) => (deviceType !== 'Desktop') && (value && value[deviceType] === 'left'),
                    render: () => 'display: flex !important; align-items: flex-start; flex-direction: unset !important;'
                },
                {
                    selector: `.${elementId} .guten-icon-box-wrapper`,
                    allowRender: (value) => (deviceType !== 'Desktop') && (value && value[deviceType] === 'right'),
                    render: () => 'display: flex !important; flex-direction: row-reverse; align-items: unset !important;'
                },
                {
                    selector: `.${elementId} .guten-icon-box-wrapper`,
                    allowRender: (value) => (deviceType !== 'Desktop') && ((value && value[deviceType] === 'top')),
                    render: () => 'display: block !important; flex-direction: unset !important; align-items: unset !important;'
                },
                {
                    selector: `.${elementId} .guten-icon-box-wrapper`,
                    allowRender: (value) => (deviceType !== 'Desktop') && ((value && value[deviceType] === 'bottom')),
                    render: () => 'display: flex !important; flex-direction: column-reverse !important; align-items: unset !important;'
                },
                {
                    selector: `.${elementId} .guten-icon-box-wrapper .icon-box.icon-box-header`,
                    allowRender: (value) => (deviceType !== 'Desktop') && (value && value[deviceType] === 'left'),
                    render: () => 'margin-right: 15px; margin-left: unset !important;'
                },
                {
                    selector: `.${elementId} .guten-icon-box-wrapper .icon-box.icon-box-header`,
                    allowRender: (value) => (deviceType !== 'Desktop') && (value && value[deviceType] === 'right'),
                    render: () => 'margin-left: 15px; margin-right: unset !important;'
                },
                {
                    selector: `.${elementId} .guten-icon-box-wrapper .icon-box.icon-box-header`,
                    allowRender: (value) => (deviceType !== 'Desktop') && ((value && value[deviceType] === 'top') || (value && value[deviceType] === 'bottom')),
                    render: () => 'margin-left: unset !important; margin-right: unset !important;'
                },
            ]
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
            style: [
                {
                    selector: `.${elementId} .guten-icon-box-wrapper`,
                    render: value => `justify-content: ${value};`
                },
                {
                    selector: `.${elementId} .guten-icon-box-wrapper`,
                    render: value => `text-align: ${handleAlign(value)}`
                },
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
        }
    ];
};

