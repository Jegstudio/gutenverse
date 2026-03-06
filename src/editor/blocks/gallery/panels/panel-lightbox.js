import { __ } from '@wordpress/i18n';
import { AlertControl, ColorControl, DimensionControl, RepeaterControl, SwitchControl, TypographyControl } from 'gutenverse-core/controls';

export const lightboxStylePanel = ( { switcher, setSwitcher } ) => {

    return [
        {
            id: '__lightboxItemStyleSwitch',
            component: SwitchControl,
            options: [
                {
                    value: 'all',
                    label: 'All'
                },
                {
                    value: 'single',
                    label: 'Single'
                }
            ],
            onChange: ({ __lightboxItemStyleSwitch }) => setSwitcher({ ...switcher, lightboxItemStyleSwitch: __lightboxItemStyleSwitch })
        },
        {
            id: 'itemLightboxTextMargin',
            label: __('Desc Margin', '--gctd--'),
            component: DimensionControl,
            show: (switcher.lightboxItemStyleSwitch === 'all' || !switcher.lightboxItemStyleSwitch),
            allowDeviceControl: true,
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                ['%']: {
                    text: '%',
                    unit: '%'
                },
                rem: {
                    text: 'rem',
                    unit: 'rem'
                },
            },
        },
        {
            id: 'itemLightboxTextPadding',
            label: __('Desc Padding', '--gctd--'),
            component: DimensionControl,
            show: (switcher.lightboxItemStyleSwitch === 'all' || !switcher.lightboxItemStyleSwitch),
            allowDeviceControl: true,
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                ['%']: {
                    text: '%',
                    unit: '%'
                },
                rem: {
                    text: 'rem',
                    unit: 'rem'
                },
            },
        },
        {
            id: 'itemLightboxTitleTypography',
            label: __('Desc Title Typography', 'gutenverse'),
            component: TypographyControl,
            show: (switcher.lightboxItemStyleSwitch === 'all' || !switcher.lightboxItemStyleSwitch),
        },
        {
            id: 'itemLightboxTitleColor',
            label: __('Desc Title Color', 'gutenverse'),
            component: ColorControl,
            show: (switcher.lightboxItemStyleSwitch === 'all' || !switcher.lightboxItemStyleSwitch),
        },
        {
            id: 'itemLightboxDescriptionTypography',
            label: __('Desc Content Typography', 'gutenverse'),
            component: TypographyControl,
            show: (switcher.lightboxItemStyleSwitch === 'all' || !switcher.lightboxItemStyleSwitch),
        },
        {
            id: 'itemLightboxDescriptionColor',
            label: __('Desc Content Color', 'gutenverse'),
            component: ColorControl,
            show: (switcher.lightboxItemStyleSwitch === 'all' || !switcher.lightboxItemStyleSwitch),
        },
        {
            id: 'images',
            component: RepeaterControl,
            titleFormat: '<strong><%= value.title ? value.title : "Gallery Item" %></strong>',
            isAddNew: false,
            show: switcher.lightboxItemStyleSwitch === 'single',
            options: [
                {
                    id: 'divider-notice',
                    component: AlertControl,
                    children: <>
                        <span>{__('This Panel Option Only Show If You Enable "Lightbox Description"')}</span>
                    </>,
                    show: (item) => {
                        return !item?.lightboxDescription;
                    }
                },
                {
                    id: 'itemLightboxTextMargin',
                    label: __('Desc Margin', '--gctd--'),
                    component: DimensionControl,
                    allowDeviceControl: true,
                    show: (item) => {
                        return item?.lightboxDescription;
                    },
                    position: ['top', 'right', 'bottom', 'left'],
                    units: {
                        px: {
                            text: 'px',
                            unit: 'px'
                        },
                        em: {
                            text: 'em',
                            unit: 'em'
                        },
                        ['%']: {
                            text: '%',
                            unit: '%'
                        },
                        rem: {
                            text: 'rem',
                            unit: 'rem'
                        },
                    },
                },
                {
                    id: 'itemLightboxTextPadding',
                    label: __('Desc Padding', '--gctd--'),
                    component: DimensionControl,
                    show: (item) => {
                        return item?.lightboxDescription;
                    },
                    allowDeviceControl: true,
                    position: ['top', 'right', 'bottom', 'left'],
                    units: {
                        px: {
                            text: 'px',
                            unit: 'px'
                        },
                        em: {
                            text: 'em',
                            unit: 'em'
                        },
                        ['%']: {
                            text: '%',
                            unit: '%'
                        },
                        rem: {
                            text: 'rem',
                            unit: 'rem'
                        },
                    },
                },
                {
                    id: 'itemLightboxTitleTypography',
                    label: __('Desc Title Typo', 'gutenverse'),
                    component: TypographyControl,
                    show: (item) => {
                        return item?.lightboxDescription;
                    }
                },
                {
                    id: 'itemLightboxTitleColor',
                    label: __('Desc Title Color', 'gutenverse'),
                    component: ColorControl,
                    show: (item) => {
                        return item?.lightboxDescription;
                    }
                },
                {
                    id: 'itemLightboxDescriptionTypography',
                    label: __('Desc Content Typo', 'gutenverse'),
                    component: TypographyControl,
                    show: (item) => {
                        return item?.lightboxDescription;
                    }
                },
                {
                    id: 'itemLightboxDescriptionColor',
                    label: __('Desc Content Color', 'gutenverse'),
                    component: ColorControl,
                    show: (item) => {
                        return item?.lightboxDescription;
                    }
                },
            ],
        },
    ];
};
