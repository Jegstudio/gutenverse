import { __ } from '@wordpress/i18n';
import { DimensionControl, RangeControl, SelectControl, HeadingControl, SVGRadioControl } from 'gutenverse-core/controls';
import { IconAlignItemsCenter, IconAlignItemsEnd, IconAlignItemsStart, IconAlignItemsStretch} from 'gutenverse-core/icons';

export const mobileMenuStyle = (props) => {
    const {
        elementId,
    } = props;

    return [
        {
            id: 'mobileLogoWidth',
            label: __('Width', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 200,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
            liveStyle:
                [
                    {
                        'type': 'plain',
                        'id': 'mobileLogoWidth',
                        'responsive': true,
                        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-nav-site-title .gutenverse-nav-logo img`,
                        'properties': [
                            {
                                'name': 'width',
                                'valueType': 'pattern',
                                'pattern': '{value}px',
                                'patternValues': {
                                    'value': {
                                        'type': 'direct',
                                    },
                                }
                            }
                        ],
                    }
                ],
        },
        {
            id: 'mobileLogoHeight',
            label: __('Height', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 200,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
            liveStyle:
                [
                    {
                        'type': 'plain',
                        'id': 'mobileLogoHeight',
                        'responsive': true,
                        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu .guten-nav-menu .gutenverse-menu-wrapper .gutenverse-nav-identity-panel .gutenverse-nav-site-title .gutenverse-nav-logo img`,
                        'properties': [
                            {
                                'name': 'height',
                                'valueType': 'pattern',
                                'pattern': '{value}px',
                                'patternValues': {
                                    'value': {
                                        'type': 'direct',
                                    },
                                }
                            }
                        ],
                    }
                ],
        },
        {
            id: 'mobileLogoFit',
            label: __('Logo Fit', 'gutenverse'),
            component: SelectControl,
            allowDeviceControl: true,
            options: [
                {
                    label: __('Cover'),
                    value: 'cover'
                },
                {
                    label: __('Contain'),
                    value: 'contain'
                },
                {
                    label: __('Fill'),
                    value: 'fill'
                },
                {
                    label: __('Scale Down'),
                    value: 'scale-down'
                },
                {
                    label: __('None'),
                    value: 'none'
                },
            ],
        },
        {
            id: 'mobileMenuMargin',
            label: __('Margin', 'gutenverse'),
            component: DimensionControl,
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
            },
        },
        {
            id: 'mobileMenuPadding',
            label: __('Padding', 'gutenverse'),
            component: DimensionControl,
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
            },
        },
        {
            id: 'closeIconHeading',
            component: HeadingControl,
            label: __('Menu Items', 'gutenverse')
        },
        {
            id: 'alignMobileItems',
            label: __('Align Items', 'gutenverse'),
            component: SVGRadioControl,
            options: [
                {
                    tooltips: __('Start', '--gctd--'),
                    value: 'flex-start',
                    svg: <IconAlignItemsStart />
                },
                {
                    tooltips: __('Center', '--gctd--'),
                    value: 'center',
                    svg: <IconAlignItemsCenter />
                },
                {
                    tooltips: __('End', '--gctd--'),
                    value: 'flex-end',
                    svg: <IconAlignItemsEnd />
                },
                {
                    tooltips: __('Stretch', '--gctd--'),
                    value: 'space-around',
                    svg: <IconAlignItemsStretch />
                },
            ],
        },
    ];
};