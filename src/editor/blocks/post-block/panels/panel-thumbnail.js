import { __ } from '@wordpress/i18n';
import { BorderControl, BorderResponsiveControl, BoxShadowControl, DimensionControl, RangeControl, SelectSearchControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { isOnEditor } from 'gutenverse-core/helper';
import { fetchImageSizes } from 'gutenverse-core/requests';

export const thumbnailPanel = ({ elementId }) => {
    const device = getDeviceType();

    const imageSize = isOnEditor() ? fetchImageSizes :
        () => {
            return {
                label: '',
                value: ''
            };
        };

    return [
        {
            id: 'thumbnailSize',
            label: __('Image Size', 'gutenverse'),
            component: SelectSearchControl,
            onSearch: imageSize
        },
        {
            id: 'thumbnailWidth',
            label: __('Width', 'gutenverse'),
            component: RangeControl,
            min: 0,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            unit: '%',
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'thumbnailWidth',
                    'responsive': true,
                    'selector': `.${elementId} .guten-postblock:not(.postblock-type-5) .guten-thumb, .${elementId} .guten-postblock.postblock-type-5 .guten-post`,
                    'properties': [
                        {
                            'name': 'width',
                            'valueType': 'pattern',
                            'pattern': '{value}%; flex-basis: {value}%',
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
            id: 'thumbnailMargin',
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
            }
        },
        {
            id: 'thumbnailPadding',
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
            }
        },
        {
            id: 'thumbnailBorder',
            show: device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'thumbnailBorder',
                    'selector': `.${elementId} .guten-postblock .guten-thumb`,
                }
            ]
        },
        {
            id: 'thumbnailBorderResponsive',
            show: device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'thumbnailBorderResponsive',
                    'selector': `.${elementId} .guten-postblock .guten-thumb`,
                }
            ]
        },
        {
            id: 'thumbnailBoxShadow',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            liveStyle: [
                {
                    'type': 'boxShadow',
                    'id': 'thumbnailBoxShadow',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId} .guten-postblock .guten-thumb`,
                }
            ]
        },
    ];
};