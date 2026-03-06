import { __ } from '@wordpress/i18n';
import { RangeControl, SelectControl, BackgroundControl, AlertControl } from 'gutenverse-core/controls';

export const overlayPanel = (props) => {
    const {
        elementId,
        mobileEnableOverlay,
    } = props;

    return [
        {
            id: 'activate-notice',
            component: AlertControl,
            show: !mobileEnableOverlay,
            children: <>
                <span>{__('You need to enable the overlay first in the "Mobile Menu" panel to use this setting!', 'gutenverse')}</span>
            </>
        },
        {
            id: 'overlayBackground',
            component: BackgroundControl,
            label: __('Overlay Background', 'gutenverse'),
            show: mobileEnableOverlay,
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'id': 'overlayBackground',
                    'type': 'background',
                    'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu.tablet-breakpoint .guten-nav-menu .guten-nav-overlay`,
                }
            ],
        },
        {
            id: 'overlayOpacity',
            label: __('Overlay Opacity', 'gutenverse'),
            show: mobileEnableOverlay,
            component: RangeControl,
            min: 0,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            liveStyle:
                [
                    {
                        'type': 'plain',
                        'id': 'overlayOpacity',
                        'responsive': true,
                        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu.tablet-breakpoint .guten-nav-menu .guten-nav-overlay`,
                        'properties': [
                            {
                                'name': 'opacity',
                                'valueType': 'pattern',
                                'pattern': 'calc({value}/100)',
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
            id: 'overlayPointer',
            label: __('Overlay Pointer Event', 'gutenverse'),
            show: mobileEnableOverlay,
            component: SelectControl,
            options: [
                {
                    label: __('None'),
                    value: 'none'
                },
                {
                    label: __('Auto'),
                    value: 'auto'
                },
            ],
        },
        {
            id: 'blur-notice',
            component: AlertControl,
            show: mobileEnableOverlay,
            children: <>
                <span>{__('This option will blur background and anything behind this element', 'gutenverse')}</span>
            </>
        },
        {
            id: 'overlayBlur',
            label: __('Overlay Blur', 'gutenverse'),
            show: mobileEnableOverlay,
            component: RangeControl,
            min: 0,
            max: 100,
            allowDeviceControl: true,
            liveStyle:
                [
                    {
                        'type': 'plain',
                        'id': 'overlayBlur',
                        'responsive': true,
                        'selector': `.${elementId}.guten-element.wp-block-gutenverse-nav-menu.tablet-breakpoint .guten-nav-menu .guten-nav-overlay`,
                        'properties': [
                            {
                                'name': '-webkit-backdrop-filter',
                                'valueType': 'pattern',
                                'pattern': 'blur({value}px)',
                                'patternValues': {
                                    'value': {
                                        'type': 'direct',
                                    },
                                }
                            },
                            {
                                'name': 'backdrop-filter',
                                'valueType': 'pattern',
                                'pattern': 'blur({value}px)',
                                'patternValues': {
                                    'value': {
                                        'type': 'direct',
                                    },
                                }
                            }
                        ],
                    }
                ],
        }
    ];
};