
import { __ } from '@wordpress/i18n';
import { CheckboxControl, IconSVGControl, RangeControl, SelectControl, TextControl } from 'gutenverse-core/controls';
import { getDefaultImageLoad } from "../../../helper";

export const contentPanel = (props) => {
    const {
        elementId,
        layout,
        iconEnabled,
        metaEnabled,
        metaDateEnabled,
        metaCategoryEnabled,
        metaDateFormat,
        imageLoad,
        lazyLoad
    } = props;
    const defaultImageLoad = getDefaultImageLoad(imageLoad, lazyLoad);

    return [
        {
            id: 'layout',
            label: __('Layout', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('Vertical', 'gutenverse'),
                    value: 'vertical'
                },
                {
                    label: __('Horizontal', 'gutenverse'),
                    value: 'horizontal'
                },
            ]
        },
        {
            id: 'column',
            show: layout === 'horizontal',
            label: __('Column', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            min: 1,
            max: 3,
            step: 1,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'column',
                    'responsive': true,
                    'selector': `.${elementId} .guten-posts`,
                    'properties': [
                        {
                            'name': 'grid-template-columns',
                            'valueType': 'pattern',
                            'pattern': 'repeat({value}, minmax(0, 1fr))',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ],
                }
            ]
        },
        {
            id: 'columnGap',
            show: layout === 'horizontal',
            label: __('Column Gap', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            unit: 'px',
            min: 1,
            max: 200,
            step: 1,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'columnGap',
                    'responsive': true,
                    'selector': `.${elementId} .guten-posts`,
                    'properties': [
                        {
                            'name': 'grid-column-gap',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ],
                }
            ]
        },
        {
            id: 'imageEnabled',
            label: __('Show Featured Image', 'gutenverse'),
            component: CheckboxControl
        },
        {
            id: 'backgroundImageEnabled',
            label: __('Background Featured Image', 'gutenverse'),
            component: CheckboxControl
        },
        {
            id: 'iconEnabled',
            label: __('Show Icon', 'gutenverse'),
            component: CheckboxControl
        },
        {
            id: 'icon',
            show: iconEnabled,
            label: __('Icon', 'gutenverse'),
            component: IconSVGControl
        },
        {
            id: 'metaEnabled',
            label: __('Show Meta', 'gutenverse'),
            component: CheckboxControl
        },
        {
            id: 'metaDateEnabled',
            show: metaEnabled,
            label: __('Show Meta Date', 'gutenverse'),
            component: CheckboxControl
        },
        {
            id: 'metaDateType',
            show: metaEnabled && metaDateEnabled,
            label: __('Date Type', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('Published Date', 'gutenverse'),
                    value: 'published'
                },
                {
                    label: __('Modified Date', 'gutenverse'),
                    value: 'modified'
                },
                {
                    label: __('Both Dates', 'gutenverse'),
                    value: 'both'
                },
            ],
        },
        {
            id: 'metaDateFormat',
            show: metaEnabled && metaDateEnabled,
            label: __('Date Format', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('Relative Date/Time Format (ago)', 'gutenverse'),
                    value: 'ago'
                },
                {
                    label: __('Wordpress Default Format', 'gutenverse'),
                    value: 'default'
                },
                {
                    label: __('Custom Format', 'gutenverse'),
                    value: 'custom'
                },
            ],
        },
        {
            id: 'metaDateFormatCustom',
            show: metaEnabled && metaDateEnabled && metaDateFormat === 'custom',
            label: __('Custom Format', 'gutenverse'),
            component: TextControl,
        },
        {
            id: 'metaDateIcon',
            show: metaEnabled && metaDateEnabled,
            label: __('Date Icon', 'gutenverse'),
            component: IconSVGControl
        },
        {
            id: 'metaDateIconPosition',
            show: metaEnabled && metaDateEnabled,
            label: __('Icon Position', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('Before'),
                    value: 'before'
                },
                {
                    label: __('After'),
                    value: 'after'
                }
            ]
        },
        {
            id: 'metaCategoryEnabled',
            show: metaEnabled,
            label: __('Show Meta Category', 'gutenverse'),
            component: CheckboxControl
        },
        {
            id: 'metaCategoryIcon',
            show: metaEnabled && metaCategoryEnabled,
            label: __('Category Icon', 'gutenverse'),
            component: IconSVGControl
        },
        {
            id: 'metaPosition',
            show: metaEnabled,
            label: __('Meta Position', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('Top', 'gutenverse'),
                    value: 'top'
                },
                {
                    label: __('Bottom', 'gutenverse'),
                    value: 'bottom'
                }
            ]
        },
        {
            id: 'imageLoad',
            label: __('Image Load', 'gutenverse'),
            component: SelectControl,
            defaultValue: defaultImageLoad,
            options: [
                {
                    label: __('Normal Load', 'gutenverse'),
                    value: 'eager'
                },
                {
                    label: __('Lazy Load', 'gutenverse'),
                    value: 'lazy'
                },
            ]
        }
    ];
};
