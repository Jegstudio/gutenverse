import { __ } from '@wordpress/i18n';
import { AlertControl, BorderControl, BorderResponsiveControl, BoxShadowControl, RangeControl, SizeControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const avatarStylePanel = (props) => {
    const {
        elementId,
        authorAvatar,
    } = props;

    const device = getDeviceType();
    if (!authorAvatar) {
        return [
            {
                id: 'sticky-notice',
                component: AlertControl,
                children: <>
                    <span>{__('Avatar disabled. The Avatar panel will be hidden.')}</span>
                </>
            },
        ];
    }
    return [
        {
            id: 'size',
            show: authorAvatar,
            label: __('Size', 'gutenverse'),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 1000,
                    step: 1
                },
                em: {
                    text: 'em',
                    min: 1,
                    max: 100,
                    step: 0.1
                },
                ['%']: {
                    text: '%',
                    min: 1,
                    max: 100,
                    step: 1
                },
            },
            liveStyle: [
                authorAvatar && {
                    'type': 'unitPoint',
                    'id': 'size',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'width',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId} img`,
                }
            ],
        },
        {
            id: 'avatarGap',
            show: authorAvatar,
            label: __('Gap', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            unit: 'px',
            min: 1,
            max: 100,
            step: 1,
            liveStyle: [
                authorAvatar && {
                    'type': 'plain',
                    'id': 'avatarGap',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'margin-right',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ],
                    'selector': `.${elementId} img`,
                }
            ],
        },
        {
            id: 'opacity',
            show: authorAvatar,
            label: __('Opacity', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            min: 1,
            max: 100,
            step: 1,
            liveStyle: [
                authorAvatar && {
                    'type': 'plain',
                    'id': 'opacity',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'opacity',
                            'valueType': 'pattern',
                            'pattern': 'calc({value}/100)',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ],
                    'selector': `.${elementId} img`,
                }
            ],
        },
        {
            id: 'rotate',
            show: authorAvatar,
            label: __('Rotate', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            unit: 'deg',
            min: 0,
            max: 360,
            step: 1,
            liveStyle: [
                authorAvatar && {
                    'type': 'plain',
                    'id': 'rotate',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'transform',
                            'valueType': 'pattern',
                            'pattern': 'rotate({value}deg)',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ],
                    'selector': `.${elementId} img`,
                }
            ],
        },
        {
            id: 'authorBorder',
            show: authorAvatar && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                authorAvatar && {
                    'type': 'border',
                    'id': 'authorBorder',
                    'selector': `.${elementId} img`,
                }
            ],
        },
        {
            id: 'authorBorderResponsive',
            show: authorAvatar && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                authorAvatar && {
                    'type': 'borderResponsive',
                    'id': 'authorBorderResponsive',
                    'selector': `.${elementId} img`,
                }
            ],
        },
        {
            id: 'authorBoxShadow',
            show: authorAvatar,
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            liveStyle: [
                authorAvatar && {
                    'type': 'boxShadow',
                    'id': 'authorBoxShadow',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId} img`,
                }
            ],
        }
    ];
};