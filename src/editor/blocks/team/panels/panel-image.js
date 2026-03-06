import { __ } from '@wordpress/i18n';
import { BackgroundControl, BorderControl, BorderResponsiveControl, BoxShadowControl, RangeControl, SizeControl, SwitchControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const imagePanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher,
    } = props;

    const device = getDeviceType();

    return [
        {
            id: 'imgWidth',
            label: __('Image Width', 'gutenverse'),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 1000,
                    step: 1,
                    unit: 'px',
                },
                em: {
                    text: 'em',
                    min: 1,
                    max: 100,
                    step: 1,
                    unit: 'em',
                },
                ['%']: {
                    text: '%',
                    min: 1,
                    max: 100,
                    step: 1,
                    unit: '%',
                }
            },
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'imgWidth',
                    'responsive': true,
                    'selector': `.${elementId} .profile-box .profile-card.card-default img,
                    .${elementId} .profile-box .profile-card.card-overlay img,
                    .${elementId} .profile-box .profile-card.card-hover img,
                    .${elementId} .profile-box .profile-card.card-default .profile-header img,
                    .${elementId} .profile-box .profile-card.card-overlay .profile-header img,
                    .${elementId} .profile-box .profile-card.card-hover .profile-header img,
                    .${elementId} .profile-box .profile-card.card-title-social-horizontal img,
                    .${elementId} .profile-box .profile-card.card-title-social-horizontal,
                    .${elementId} .profile-box .profile-card.card-overlay`,
                    'properties': [
                        {
                            'name': 'width',
                            'valueType': 'direct',
                        }
                    ]
                }
            ]
        },
        {
            id: 'imgHeight',
            label: __('Image Height', 'gutenverse'),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 1000,
                    step: 1,
                    unit: 'px',
                },
                em: {
                    text: 'em',
                    min: 1,
                    max: 100,
                    step: 1,
                    unit: 'em',
                },
                ['%']: {
                    text: '%',
                    min: 1,
                    max: 100,
                    step: 1,
                    unit: '%',
                }
            },
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'imgHeight',
                    'responsive': true,
                    'selector': `.${elementId} .profile-box .profile-card.card-default img,
                    .${elementId} .profile-box .profile-card.card-overlay img,
                    .${elementId} .profile-box .profile-card.card-hover img,
                    .${elementId} .profile-box .profile-card.card-default .profile-header img,
                    .${elementId} .profile-box .profile-card.card-overlay .profile-header img,
                    .${elementId} .profile-box .profile-card.card-title-social-horizontal img,
                    .${elementId} .profile-box .profile-card.card-hover .profile-header img`,
                    'properties': [
                        {
                            'name': 'height',
                            'valueType': 'direct',
                        }
                    ]
                }
            ]
        },
        {
            id: 'imgRotate',
            label: __('Image Rotate', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            unit: 'deg',
            min: 1,
            max: 360,
            step: 1,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'imgRotate',
                    'responsive': true,
                    'selector': `.${elementId} .profile-box .profile-card.card-default img,
                    .${elementId} .profile-box .profile-card.card-overlay img,
                    .${elementId} .profile-box .profile-card.card-title-social-horizontal img,
                    .${elementId} .profile-box .profile-card.card-hover img,
                    .${elementId} .profile-box .profile-card.card-default .profile-header img,
                    .${elementId} .profile-box .profile-card.card-overlay .profile-header img,
                    .${elementId} .profile-box .profile-card.card-hover .profile-header img`,
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
                    ]
                }
            ]
        },
        {
            id: 'imgSpacing',
            label: __('Image Spacing', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            unit: 'px',
            min: 0,
            max: 500,
            step: 1,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'imgSpacing',
                    'responsive': true,
                    'selector': `.${elementId} .profile-box .profile-card.card-default .profile-header,
                    .${elementId} .profile-box .profile-card.card-hover .profile-header`,
                    'properties': [
                        {
                            'name': 'margin-bottom',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            id: '__imageHover',
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
            onChange: ({ __imageHover }) => setSwitcher({ ...switcher, imageHover: __imageHover })
        },
        {
            id: 'imageBackground',
            show: !switcher.imageHover || switcher.imageHover === 'normal',
            label: __('Background', 'gutenverse'),
            component: BackgroundControl,
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'imageBackground',
                    'selector': `.${elementId} .profile-box .profile-card img`,
                }
            ]
        },
        {
            id: 'imageBackgroundHover',
            show: switcher.imageHover === 'hover',
            label: __('Background Hover', 'gutenverse'),
            component: BackgroundControl,
            options: ['default', 'gradient'],
        },
        {
            id: 'imageBorder',
            show: (!switcher.imageHover || switcher.imageHover === 'normal') && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'imageBorder',
                    'selector': `.${elementId} .profile-box .profile-card img`,
                }
            ]
        },
        {
            id: 'imageBorderResponsive',
            show: (!switcher.imageHover || switcher.imageHover === 'normal') && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'imageBorderResponsive',
                    'selector': `.${elementId} .profile-box .profile-card img`,
                }
            ]
        },
        {
            id: 'imageBoxShadow',
            show: !switcher.imageHover || switcher.imageHover === 'normal',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            liveStyle: [
                {
                    'type': 'boxShadow',
                    'id': 'imageBoxShadow',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId} .profile-box .profile-card img`,
                }
            ]
        },
        {
            id: 'imageBorderHover',
            show: switcher.imageHover === 'hover' && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
        },
        {
            id: 'imageBorderHoverResponsive',
            show: switcher.imageHover === 'hover' && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
        },
        {
            id: 'imageBoxShadowHover',
            show: switcher.imageHover === 'hover',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
        }
    ];
};