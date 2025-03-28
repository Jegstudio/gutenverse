import { __ } from '@wordpress/i18n';
import { AlertControl, ColorControl, RangeControl, SelectControl, SizeControl, SwitchControl, TypographyControl } from 'gutenverse-core/controls';
import { handleColor, handleTypography } from 'gutenverse-core/styling';

export const contentPanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher
    } = props;
    return [
        {
            id: 'titleTypography',
            label: __('Title Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item .feature-list-content .feature-list-title`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ]
        },
        {
            id: 'descTypography',
            label: __('Description Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item .feature-list-content .feature-list-desc`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ]
        },
        {
            id: '__colorSwitch',
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
            onChange: ({ __colorSwitch }) => setSwitcher({ ...switcher, colorSwitch: __colorSwitch })
        },
        {
            id: 'titleColor',
            label: __('Title Color', 'gutenverse'),
            component: ColorControl,
            show: switcher.colorSwitch === 'normal' || !switcher.colorSwitch,
            style: [
                {
                    selector: `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item .feature-list-content .feature-list-title`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'descColor',
            label: __('Description Color', 'gutenverse'),
            component: ColorControl,
            show: switcher.colorSwitch === 'normal' || !switcher.colorSwitch,
            style: [
                {
                    selector: `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item .feature-list-content .feature-list-desc`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'titleColorHover',
            label: __('Title Color', 'gutenverse'),
            component: ColorControl,
            show: switcher.colorSwitch === 'hover',
            style: [
                {
                    selector: `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item:hover .feature-list-content .feature-list-title`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'descColorHover',
            label: __('Description Color', 'gutenverse'),
            component: ColorControl,
            show: switcher.colorSwitch === 'hover',
            style: [
                {
                    selector: `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item:hover .feature-list-content .feature-list-desc`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
    ];
};