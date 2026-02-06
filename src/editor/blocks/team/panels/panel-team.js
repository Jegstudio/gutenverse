import { __ } from '@wordpress/i18n';
import { CheckboxControl, ColorControl, HeadingControl, ImageControl, SelectControl, SizeControl, SwitchControl, TextareaControl, TextControl, RangeControl } from 'gutenverse-core/controls';

export const teamPanel = (props) => {
    const {
        showDesc,
        elementId,
        hoverBottom,
        profileType,
        setSwitcher,
        switcher
    } = props;

    return [
        {
            id: 'src',
            label: __('Profile Picture', 'gutenverse'),
            component: ImageControl
        },
        {
            id: 'altType',
            label: __('Alt Type', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: 'None',
                    value: 'none'
                },
                {
                    label: 'Alt from Image',
                    value: 'original'
                },
                {
                    label: 'Custom Alt',
                    value: 'custom'
                },
            ]
        },
        {
            id: 'imageAlt',
            label: __('Image Alt', 'gutenverse'),
            component: TextControl,
        },
        {
            id: 'lazy',
            label: __('Image Load', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    value: false,
                    label: __('Normal Load', 'gutenverse')
                },
                {
                    value: true,
                    label: __('Lazy Load', 'gutenverse')
                },
            ]
        },
        {
            id: 'nameTag',
            label: __('Name HTML tag', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    value: 'h1',
                    label: 'H1'
                },
                {
                    value: 'h2',
                    label: 'H2'
                },
                {
                    value: 'h3',
                    label: 'H3'
                },
                {
                    value: 'h4',
                    label: 'H4'
                },
                {
                    value: 'h5',
                    label: 'H5'
                },
                {
                    value: 'h6',
                    label: 'H6'
                },
                {
                    value: 'div',
                    label: 'Div'
                },
                {
                    value: 'span',
                    label: 'Span'
                },
                {
                    value: 'p',
                    label: 'P'
                },
            ],
        },
        {
            id: 'profileType',
            label: __('Style', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    value: 'default',
                    label: 'Default'
                },
                {
                    value: 'overlay',
                    label: 'Overlay Profile'
                },
                {
                    value: 'hover',
                    label: 'Social Hover'
                },
                {
                    value: 'titleSocialHorizontal',
                    label: 'Title & Social Horizontal'
                },
            ],
        },
        {
            id: 'overlayType',
            show: profileType === 'overlay',
            label: __('Overlay Style', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    value: 'default',
                    label: 'Default'
                },
                {
                    value: 'scale',
                    label: 'Scale'
                },
            ],
        },
        {
            id: 'overlayPosition',
            show: profileType === 'overlay',
            label: __('Overlay Content Position', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    value: 'center',
                    label: 'Center'
                },
                {
                    value: 'bottom',
                    label: 'Bottom'
                }
            ],
        },
        {
            id: 'overlayProfilePosition',
            label: __('Overlay Content Position', '--gctd--'),
            show: profileType === 'overlay',
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
                '%': {
                    text: '%',
                    min: 0,
                    max: 100,
                    step: 1
                }
            },
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'overlayProfilePosition',
                    'responsive': true,
                    'selector': `.${elementId}.guten-team .profile-box .profile-card.card-overlay:hover .profile-body `,
                    'properties': [
                        {
                            'name': 'margin-bottom',
                            'valueType': 'direct',
                        }
                    ]
                }
            ]
        },
        {
            id: 'name',
            label: __('Name', 'gutenverse'),
            component: TextControl
        },
        {
            id: 'job',
            label: __('Job', 'gutenverse'),
            component: TextControl
        },
        {
            id: 'showDesc',
            label: __('Show Description', 'gutenverse'),
            component: CheckboxControl
        },
        {
            id: 'description',
            show: showDesc,
            label: __('Description', 'gutenverse'),
            component: TextareaControl
        },
        {
            id: 'titleSocialSeparator',
            component: HeadingControl,
            label: __('Title Social Settings', 'gutenverse'),
            show: profileType === 'titleSocialHorizontal'
        },
        {
            id: '__titleSocial',
            component: SwitchControl,
            show: profileType === 'titleSocialHorizontal',
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
            onChange: ({ __titleSocial }) => setSwitcher({ ...switcher, titleSocial: __titleSocial })
        },
        {
            id: 'titleSeparatorPosition',
            component: HeadingControl,
            label: __('Title Positions', 'gutenverse'),
            show: profileType === 'titleSocialHorizontal'
        },
        {
            id: 'titleHorizontal',
            label: __('Title Horizontal Orientation', '--gctd--'),
            show: profileType === 'titleSocialHorizontal' && (switcher.titleSocial === 'normal' || !switcher.titleSocial),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: -1000,
                    max: 1000,
                    step: 1,
                    unit: 'px',
                },
                ['%']: {
                    text: '%',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: '%',
                },
                vw: {
                    text: 'vw',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: 'vw',
                },
            },
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'titleHorizontal',
                    'responsive': true,
                    'selector': `.${elementId}.guten-team .profile-box .profile-card.card-title-social-horizontal .profile-title`,
                    'properties': [
                        {
                            'name': 'left',
                            'valueType': 'direct',
                        }
                    ]
                }
            ]
        },
        {
            id: 'titleVertical',
            label: __('Title Vertical Orientation', '--gctd--'),
            show: profileType === 'titleSocialHorizontal' && (switcher.titleSocial === 'normal' || !switcher.titleSocial),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: -1000,
                    max: 1000,
                    step: 1,
                    unit: 'px',
                },
                ['%']: {
                    text: '%',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: '%',
                },
                vh: {
                    text: 'vh',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: 'vh',
                },
            },
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'titleVertical',
                    'responsive': true,
                    'selector': `.${elementId}.guten-team .profile-box .profile-card.card-title-social-horizontal .profile-title`,
                    'properties': [
                        {
                            'name': 'bottom',
                            'valueType': 'direct',
                        }
                    ]
                }
            ]
        },
        {
            id: 'titleOpacity',
            label: __('Title Opacity', 'gutenverse'),
            component: RangeControl,
            show: profileType === 'titleSocialHorizontal' && (switcher.titleSocial === 'normal' || !switcher.titleSocial),
            min: 0.1,
            max: 1,
            step: 0.1,
            isParseFloat: false,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'titleOpacity',
                    'responsive': true,
                    'selector': `.${elementId}.guten-team .profile-box .profile-card.card-title-social-horizontal .profile-title`,
                    'properties': [
                        {
                            'name': 'opacity',
                            'valueType': 'direct',
                        }
                    ]
                }
            ]
        },
        {
            id: 'titleHorizontalHover',
            label: __('Title Horizontal Orientation', '--gctd--'),
            show: profileType === 'titleSocialHorizontal' && (switcher.titleSocial === 'hover'),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: -1000,
                    max: 1000,
                    step: 1,
                    unit: 'px',
                },
                ['%']: {
                    text: '%',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: '%',
                },
                vw: {
                    text: 'vw',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: 'vw',
                },
            },
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'titleHorizontalHover',
                    'responsive': true,
                    'selector': `.${elementId}.guten-team .profile-box .profile-card.card-title-social-horizontal:hover .profile-title`,
                    'properties': [
                        {
                            'name': 'left',
                            'valueType': 'direct',
                        }
                    ]
                }
            ]
        },

        {
            id: 'titleVerticalHover',
            label: __('Title Vertical Orientation', '--gctd--'),
            show: profileType === 'titleSocialHorizontal' && (switcher.titleSocial === 'hover'),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: -1000,
                    max: 1000,
                    step: 1,
                    unit: 'px',
                },
                ['%']: {
                    text: '%',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: '%',
                },
                vh: {
                    text: 'vh',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: 'vh',
                },
            },
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'titleVerticalHover',
                    'responsive': true,
                    'selector': `.${elementId}.guten-team .profile-box .profile-card.card-title-social-horizontal:hover .profile-title`,
                    'properties': [
                        {
                            'name': 'bottom',
                            'valueType': 'direct',
                        }
                    ]
                }
            ]
        },
        {
            id: 'titleOpacityHover',
            label: __('Title Opacity', 'gutenverse'),
            component: RangeControl,
            show: profileType === 'titleSocialHorizontal' && (switcher.titleSocial === 'hover'),
            min: 0.1,
            max: 1,
            step: 0.1,
            isParseFloat: false,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'titleOpacityHover',
                    'responsive': true,
                    'selector': `.${elementId}.guten-team .profile-box .profile-card.card-title-social-horizontal:hover .profile-title`,
                    'properties': [
                        {
                            'name': 'opacity',
                            'valueType': 'direct',
                        }
                    ]
                }
            ]
        },
        {
            id: 'jobSeparatorPosition',
            component: HeadingControl,
            label: __('Job Positions', 'gutenverse'),
            show: profileType === 'titleSocialHorizontal'
        },
        {
            id: 'jobHorizontal',
            label: __('Job Horizontal Orientation', '--gctd--'),
            show: profileType === 'titleSocialHorizontal' && (switcher.titleSocial === 'normal' || !switcher.titleSocial),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: -1000,
                    max: 1000,
                    step: 1,
                    unit: 'px',
                },
                ['%']: {
                    text: '%',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: '%',
                },
                vw: {
                    text: 'vw',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: 'vw',
                },
            },
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'jobHorizontal',
                    'responsive': true,
                    'selector': `.${elementId}.guten-team .profile-box .profile-card.card-title-social-horizontal .profile-sub`,
                    'properties': [
                        {
                            'name': 'right',
                            'valueType': 'direct',
                        }
                    ]
                }
            ]
        },

        {
            id: 'jobVertical',
            label: __('Job Vertical Orientation', '--gctd--'),
            show: profileType === 'titleSocialHorizontal' && (switcher.titleSocial === 'normal' || !switcher.titleSocial),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: -1000,
                    max: 1000,
                    step: 1,
                    unit: 'px',
                },
                ['%']: {
                    text: '%',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: '%',
                },
                vh: {
                    text: 'vh',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: 'vh',
                },
            },
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'jobVertical',
                    'responsive': true,
                    'selector': `.${elementId}.guten-team .profile-box .profile-card.card-title-social-horizontal .profile-sub`,
                    'properties': [
                        {
                            'name': 'top',
                            'valueType': 'direct',
                        }
                    ]
                }
            ]
        },

        {
            id: 'jobOpacity',
            label: __('Job Opacity', 'gutenverse'),
            component: RangeControl,
            show: profileType === 'titleSocialHorizontal' && (switcher.titleSocial === 'normal' || !switcher.titleSocial),
            min: 0.1,
            max: 1,
            step: 0.1,
            isParseFloat: false,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'jobOpacity',
                    'responsive': true,
                    'selector': `.${elementId}.guten-team .profile-box .profile-card.card-title-social-horizontal .profile-sub`,
                    'properties': [
                        {
                            'name': 'opacity',
                            'valueType': 'direct',
                        }
                    ]
                }
            ]
        },
        {
            id: 'jobHorizontalHover',
            label: __('Job Horizontal Orientation', '--gctd--'),
            show: profileType === 'titleSocialHorizontal' && (switcher.titleSocial === 'hover'),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: -1000,
                    max: 1000,
                    step: 1,
                    unit: 'px',
                },
                ['%']: {
                    text: '%',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: '%',
                },
                vw: {
                    text: 'vw',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: 'vw',
                },
            },
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'jobHorizontalHover',
                    'responsive': true,
                    'selector': `.${elementId}.guten-team .profile-box .profile-card.card-title-social-horizontal:hover .profile-sub`,
                    'properties': [
                        {
                            'name': 'right',
                            'valueType': 'direct',
                        }
                    ]
                }
            ]
        },

        {
            id: 'jobVerticalHover',
            label: __('Job Vertical Orientation', '--gctd--'),
            show: profileType === 'titleSocialHorizontal' && (switcher.titleSocial === 'hover'),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: -1000,
                    max: 1000,
                    step: 1,
                    unit: 'px',
                },
                ['%']: {
                    text: '%',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: '%',
                },
                vh: {
                    text: 'vh',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: 'vh',
                },
            },
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'jobVerticalHover',
                    'responsive': true,
                    'selector': `.${elementId}.guten-team .profile-box .profile-card.card-title-social-horizontal:hover .profile-sub`,
                    'properties': [
                        {
                            'name': 'top',
                            'valueType': 'direct',
                        }
                    ]
                }
            ]
        },

        {
            id: 'jobOpacityHover',
            label: __('Job Opacity', 'gutenverse'),
            component: RangeControl,
            show: profileType === 'titleSocialHorizontal' && (switcher.titleSocial === 'hover'),
            min: 0.1,
            max: 1,
            step: 0.1,
            isParseFloat: false,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'jobOpacityHover',
                    'responsive': true,
                    'selector': `.${elementId}.guten-team .profile-box .profile-card.card-title-social-horizontal:hover .profile-sub`,
                    'properties': [
                        {
                            'name': 'opacity',
                            'valueType': 'direct',
                        }
                    ]
                }
            ]
        },
        {
            id: 'descSeparatorPosition',
            component: HeadingControl,
            label: __('Description Positions', 'gutenverse'),
            show: profileType === 'titleSocialHorizontal'
        },
        {
            id: 'descHorizontal',
            label: __('Description Horizontal Orientation', '--gctd--'),
            show: profileType === 'titleSocialHorizontal' && (switcher.titleSocial === 'normal' || !switcher.titleSocial),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: -1000,
                    max: 1000,
                    step: 1,
                    unit: 'px',
                },
                ['%']: {
                    text: '%',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: '%',
                },
                vw: {
                    text: 'vw',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: 'vw',
                },
            },
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'descHorizontal',
                    'responsive': true,
                    'selector': `.${elementId}.guten-team .profile-box .profile-card.card-title-social-horizontal .profile-desc`,
                    'properties': [
                        {
                            'name': 'left',
                            'valueType': 'direct',
                        }
                    ]
                }
            ]
        },
        {
            id: 'descVertical',
            label: __('Description Vertical Orientation', '--gctd--'),
            show: profileType === 'titleSocialHorizontal' && (switcher.titleSocial === 'normal' || !switcher.titleSocial),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: -1000,
                    max: 1000,
                    step: 1,
                    unit: 'px',
                },
                ['%']: {
                    text: '%',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: '%',
                },
                vh: {
                    text: 'vh',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: 'vh',
                },
            },
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'descVertical',
                    'responsive': true,
                    'selector': `.${elementId}.guten-team .profile-box .profile-card.card-title-social-horizontal .profile-desc`,
                    'properties': [
                        {
                            'name': 'top',
                            'valueType': 'direct',
                        }
                    ]
                }
            ]
        },
        {
            id: 'descOpacity',
            label: __('Description Opacity', 'gutenverse'),
            component: RangeControl,
            show: profileType === 'titleSocialHorizontal' && (switcher.titleSocial === 'normal' || !switcher.titleSocial),
            min: 0.1,
            max: 1,
            step: 0.1,
            isParseFloat: false,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'descOpacity',
                    'responsive': true,
                    'selector': `.${elementId}.guten-team .profile-box .profile-card.card-title-social-horizontal .profile-desc`,
                    'properties': [
                        {
                            'name': 'opacity',
                            'valueType': 'direct',
                        }
                    ]
                }
            ]
        },
        {
            id: 'descHorizontalHover',
            label: __('Description Horizontal Orientation', '--gctd--'),
            show: profileType === 'titleSocialHorizontal' && (switcher.titleSocial === 'hover'),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: -1000,
                    max: 1000,
                    step: 1,
                    unit: 'px',
                },
                ['%']: {
                    text: '%',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: '%',
                },
                vw: {
                    text: 'vw',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: 'vw',
                },
            },
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'descHorizontalHover',
                    'responsive': true,
                    'selector': `.${elementId}.guten-team .profile-box .profile-card.card-title-social-horizontal:hover .profile-desc`,
                    'properties': [
                        {
                            'name': 'left',
                            'valueType': 'direct',
                        }
                    ]
                }
            ]
        },

        {
            id: 'descVerticalHover',
            label: __('Description Vertical Orientation', '--gctd--'),
            show: profileType === 'titleSocialHorizontal' && (switcher.titleSocial === 'hover'),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: -1000,
                    max: 1000,
                    step: 1,
                    unit: 'px',
                },
                ['%']: {
                    text: '%',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: '%',
                },
                vh: {
                    text: 'vh',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: 'vh',
                },
            },
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'descVerticalHover',
                    'responsive': true,
                    'selector': `.${elementId}.guten-team .profile-box .profile-card.card-title-social-horizontal:hover .profile-desc`,
                    'properties': [
                        {
                            'name': 'top',
                            'valueType': 'direct',
                        }
                    ]
                }
            ]
        },

        {
            id: 'descOpacityHover',
            label: __('Description Opacity', 'gutenverse'),
            component: RangeControl,
            show: profileType === 'titleSocialHorizontal' && (switcher.titleSocial === 'hover'),
            min: 0.1,
            max: 1,
            step: 0.1,
            isParseFloat: false,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'descOpacityHover',
                    'responsive': true,
                    'selector': `.${elementId}.guten-team .profile-box .profile-card.card-title-social-horizontal:hover .profile-desc`,
                    'properties': [
                        {
                            'name': 'opacity',
                            'valueType': 'direct',
                        }
                    ]
                }
            ]
        },
        {
            id: 'socialSeparatorPosition',
            component: HeadingControl,
            label: __('Social Icons Positions', 'gutenverse'),
            show: profileType === 'titleSocialHorizontal'
        },

        {
            id: 'socialHorizontal',
            label: __('Social Icons Horizontal Orientation', '--gctd--'),
            show: profileType === 'titleSocialHorizontal' && (switcher.titleSocial === 'normal' || !switcher.titleSocial),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: -1000,
                    max: 1000,
                    step: 1,
                    unit: 'px',
                },
                ['%']: {
                    text: '%',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: '%',
                },
                vh: {
                    text: 'vh',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: 'vh',
                },
            },
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'socialHorizontal',
                    'responsive': true,
                    'selector': `.${elementId}.guten-team .profile-box .profile-card.card-title-social-horizontal .socials-wrapper`,
                    'properties': [
                        {
                            'name': 'right',
                            'valueType': 'direct',
                        }
                    ]
                }
            ]
        },

        {
            id: 'socialVertical',
            label: __('Social Icons Vertical Orientation', '--gctd--'),
            show: profileType === 'titleSocialHorizontal' && (switcher.titleSocial === 'normal' || !switcher.titleSocial),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: -1000,
                    max: 1000,
                    step: 1,
                    unit: 'px',
                },
                ['%']: {
                    text: '%',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: '%',
                },
                vh: {
                    text: 'vh',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: 'vh',
                },
            },
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'socialVertical',
                    'responsive': true,
                    'selector': `.${elementId}.guten-team .profile-box .profile-card.card-title-social-horizontal .socials-wrapper`,
                    'properties': [
                        {
                            'name': 'bottom',
                            'valueType': 'direct',
                        }
                    ]
                }
            ]
        },
        {
            id: 'socialOpacity',
            label: __('Social Icons Opacity', 'gutenverse'),
            component: RangeControl,
            show: profileType === 'titleSocialHorizontal' && (switcher.titleSocial === 'normal' || !switcher.titleSocial),
            min: 0.1,
            max: 1,
            step: 0.1,
            isParseFloat: false,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'socialOpacity',
                    'responsive': true,
                    'selector': `.${elementId}.guten-team .profile-box .profile-card.card-title-social-horizontal .socials-wrapper`,
                    'properties': [
                        {
                            'name': 'opacity',
                            'valueType': 'direct',
                        }
                    ]
                }
            ]
        },
        {
            id: 'socialHorizontalHover',
            label: __('Social Icons Horizontal Orientation', '--gctd--'),
            show: profileType === 'titleSocialHorizontal' && (switcher.titleSocial === 'hover'),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: -1000,
                    max: 1000,
                    step: 1,
                    unit: 'px',
                },
                ['%']: {
                    text: '%',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: '%',
                },
                vh: {
                    text: 'vh',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: 'vh',
                },
            },
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'socialHorizontalHover',
                    'responsive': true,
                    'selector': `.${elementId}.guten-team .profile-box .profile-card.card-title-social-horizontal:hover .socials-wrapper`,
                    'properties': [
                        {
                            'name': 'right',
                            'valueType': 'direct',
                        }
                    ]
                }
            ]
        },

        {
            id: 'socialVerticalHover',
            label: __('Social Icons Vertical Orientation', '--gctd--'),
            show: profileType === 'titleSocialHorizontal' && (switcher.titleSocial === 'hover'),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: -1000,
                    max: 1000,
                    step: 1,
                    unit: 'px',
                },
                ['%']: {
                    text: '%',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: '%',
                },
                vh: {
                    text: 'vh',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: 'vh',
                },
            },
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'socialVerticalHover',
                    'responsive': true,
                    'selector': `.${elementId}.guten-team .profile-box .profile-card.card-title-social-horizontal:hover .socials-wrapper`,
                    'properties': [
                        {
                            'name': 'bottom',
                            'valueType': 'direct',
                        }
                    ]
                }
            ]
        },
        {
            id: 'socialOpacityHover',
            label: __('Social Icons Opacity', 'gutenverse'),
            component: RangeControl,
            show: profileType === 'titleSocialHorizontal' && (switcher.titleSocial === 'hover'),
            min: 0.1,
            max: 1,
            step: 0.1,
            isParseFloat: false,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'socialOpacityHover',
                    'responsive': true,
                    'selector': `.${elementId}.guten-team .profile-box .profile-card.card-title-social-horizontal:hover .socials-wrapper`,
                    'properties': [
                        {
                            'name': 'opacity',
                            'valueType': 'direct',
                        }
                    ]
                }
            ]
        },
        {
            id: 'hoverBottom',
            show: ['default', 'hover'].includes(profileType),
            label: __('Enable Hover Border Bottom', 'gutenverse'),
            component: CheckboxControl
        },
        {
            id: 'hoverBottomColor',
            show: hoverBottom && ['default', 'hover'].includes(profileType),
            label: __('Border Bottom Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'hoverBottomColor',
                    'selector': `.${elementId} .border-bottom .animated`,
                    'properties': [
                        {
                            'name': 'background-color',
                            'valueType': 'direct',
                        }
                    ]
                }
            ]
        },
        {
            id: 'hoverBottomHeight',
            show: hoverBottom,
            label: __('Hover Border Bottom Height', 'gutenverse'),
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
                    min: 0.1,
                    max: 10,
                    step: 0.1
                },
            },
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'hoverBottomHeight',
                    'responsive': true,
                    'selector': `.${elementId} .border-bottom, .${elementId} .border-bottom .animated `,
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
            id: 'hoverBottomDirection',
            show: hoverBottom && ['default', 'hover'].includes(profileType),
            label: __('Hover Direction', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    value: 'left',
                    label: 'From Left'
                },
                {
                    value: 'right',
                    label: 'From Right'
                },
            ]
        },
        {
            id: 'showSocial',
            label: __('Show Social Icons', 'gutenverse'),
            component: CheckboxControl
        },
    ];
};