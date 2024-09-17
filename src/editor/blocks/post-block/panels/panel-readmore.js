import { __ } from '@wordpress/i18n';
import { AlignCenter, AlignLeft, AlignRight } from 'gutenverse-core/components';
import { BackgroundControl, BorderControl, BorderResponsiveControl, BoxShadowControl, ColorControl, DimensionControl, IconRadioControl, RangeControl, SizeControl, SwitchControl, TypographyControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { allowRenderBoxShadow, handleBackground, handleBorder, handleBorderResponsive, handleBoxShadow, handleColor, handleDimension, handleTypography, handleUnitPoint } from 'gutenverse-core/styling';


export const readmorePanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher,
    } = props;

    const device = getDeviceType();

    return [
        {
            id: 'readmoreTypography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-readmore`,
                    hasChild: true,
                    render: (value, id) => handleTypography(value, props, id)
                }
            ]
        },
        {
            id: 'readmoreMargin',
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
            style: [
                {
                    selector: `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-readmore`,
                    render: value => handleDimension(value, 'margin')
                }
            ]
        },
        {
            id: 'readmorePadding',
            label: __('Padding', 'gutenverse'),
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
            style: [
                {
                    selector: `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-readmore`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: 'readmoreSpacing',
            label: __('Spacing', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
            style: [
                {
                    selector: `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore.icon-position-before .guten-readmore i`,
                    render: value => `margin-right: ${value}px;`
                },
                {
                    selector: `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore.icon-position-after .guten-readmore i`,
                    render: value => `margin-left: ${value}px;`
                }
            ],
        },
        {
            id: 'readmoreIconSize',
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
            style: [
                {
                    selector: `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore .guten-readmore i`,
                    render: value => handleUnitPoint(value, 'font-size')
                }
            ]
        },
        {
            id: 'readmoreWidth',
            label: __('Width', 'gutenverse'),
            component: SizeControl,
            min: 1,
            max: 500,
            step: 1,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 500,
                    step: 1
                },
                ['%']: {
                    text: '%',
                    min: 1,
                    max: 100,
                    step: 1
                },
            },
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore .guten-readmore`,
                    render: value => handleUnitPoint(value, 'width')
                },
            ],
        },
        {
            id: 'readmoreAlign',
            label: __('Alignment', 'gutenverse'),
            component: IconRadioControl,
            allowDeviceControl: true,
            options: [
                {
                    label: __('Align Left', 'gutenverse'),
                    value: 'start',
                    icon: <AlignLeft />,
                },
                {
                    label: __('Align Center', 'gutenverse'),
                    value: 'center',
                    icon: <AlignCenter />,
                },
                {
                    label: __('Align Right', 'gutenverse'),
                    value: 'end',
                    icon: <AlignRight />,
                },
            ],
            style: [
                {
                    selector: `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore .guten-readmore`,
                    render: value => `justify-content: ${value};`
                }
            ]
        },
        {
            id: '__readmoreHover',
            component: SwitchControl,
            options: [
                {
                    value: 'normal',
                    label: 'Normal'
                },
                {
                    value: 'hover',
                    label: 'Hover'
                }
            ],
            onChange: ({ __readmoreHover }) => setSwitcher({ ...switcher, readmoreHover: __readmoreHover })
        },
        {
            id: 'readmoreColor',
            show: !switcher.readmoreHover || switcher.readmoreHover === 'normal',
            label: __('Normal color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore a`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'readmoreHoverColor',
            show: switcher.readmoreHover === 'hover',
            label: __('Hover color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore:hover a`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'readmoreBackground',
            show: !switcher.readmoreHover || switcher.readmoreHover === 'normal',
            label: __('Background', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore a`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'readmoreHoverBackground',
            show: switcher.readmoreHover === 'hover',
            label: __('Hover Background', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore:hover a`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'readmoreBorder',
            show: (!switcher.readmoreHover || switcher.readmoreHover === 'normal') && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            style: [
                {
                    selector: `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore a`,
                    hasChild: true,
                    render: value => handleBorder(value)
                }
            ]
        },
        {
            id: 'readmoreBorderResponsive',
            show: (!switcher.readmoreHover || switcher.readmoreHover === 'normal') && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore a`,
                    allowRender: () => device !== 'Desktop',
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
        {
            id: 'readmoreHoverBorder',
            show: switcher.readmoreHover === 'hover' && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            style: [
                {
                    selector: `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore:hover a`,
                    hasChild: true,
                    render: value => handleBorder(value)
                }
            ]
        },
        {
            id: 'readmoreHoverBorderResponsive',
            show: switcher.readmoreHover === 'hover' && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore:hover a`,
                    allowRender: () => device !== 'Desktop',
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
        {
            id: 'readmoreShadow',
            label: __('Hover Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore a`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        },
        {
            id: 'readmoreHoverShadow',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.${elementId} .guten-postblock .guten-post .guten-postblock-content .guten-meta-readmore:hover a`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        },
    ];
};