import { __ } from '@wordpress/i18n';

import { AlignCenter, AlignLeft, AlignRight } from 'gutenverse-core/components';
import { CheckboxControl, IconSVGControl, IconRadioControl, ImageRadioControl, RangeControl, SelectControl, SelectSortableControl, TextControl } from 'gutenverse-core/controls';
import { getDefaultImageLoad } from "../../../helper";

export const contentPanel = (props) => {


    const {
        elementId,
        postblockType,
        categoryEnabled,
        excerptEnabled,
        readmoreEnabled,
        commentEnabled,
        metaEnabled,
        metaAuthorEnabled,
        metaDateEnabled,
        metaDateFormat,
        imageLoad,
        lazyLoad
    } = props;
    const defaultImageLoad = getDefaultImageLoad(imageLoad, lazyLoad);

    const {
        gutenverseImgDir
    } = window['GutenverseConfig'];

    const searchOrder = input => new Promise(resolve => {
        const options = [
            {
                label: __('Title'),
                value: 'title'
            },
            {
                label: __('Meta'),
                value: 'meta'
            },
            {
                label: __('Excerpt'),
                value: 'excerpt'
            },
            {
                label: __('Read More'),
                value: 'read'
            },
        ];
        resolve(options.filter(el => el.value.toLowerCase().includes(input.toLowerCase())));
    });

    return [
        {
            id: 'postblockType',
            label: __('Block Type', 'gutenverse'),
            component: ImageRadioControl,
            options: [
                {
                    image: <img src={`${gutenverseImgDir}/post-block-1.png`} />,
                    value: 'type-1'
                },
                {
                    image: <img src={`${gutenverseImgDir}/post-block-2.png`} />,
                    value: 'type-2'
                },
                {
                    image: <img src={`${gutenverseImgDir}/post-block-3.png`} />,
                    value: 'type-3'
                },
                {
                    image: <img src={`${gutenverseImgDir}/post-block-4.png`} />,
                    value: 'type-4'
                },
                {
                    image: <img src={`${gutenverseImgDir}/post-block-5.png`} />,
                    value: 'type-5'
                },
            ],
        },
        {
            id: 'contentOrder',
            label: __('Content Order', 'gutenverse'),
            component: SelectSortableControl,
            isMulti: true,
            onSearch: searchOrder
        },
        {
            id: 'column',
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
                    'selector': `.${elementId} .guten-postblock .guten-posts`,
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
                    ]
                }
            ]
        },
        {
            id: 'breakpoint',
            show: ['type-1', 'type-4'].includes(postblockType),
            label: __('Responsive Breakpoint', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('Tablet'),
                    value: 'tablet'
                },
                {
                    label: __('Mobile'),
                    value: 'mobile'
                },
                {
                    label: __('No Responsive'),
                    value: 'no-responsive'
                },
            ],
        },
        {
            id: 'htmlTag',
            label: __('Title HTML Tag', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('H1'),
                    value: 'h1'
                },
                {
                    label: __('H2'),
                    value: 'h2'
                },
                {
                    label: __('H3'),
                    value: 'h3'
                },
                {
                    label: __('H4'),
                    value: 'h4'
                },
                {
                    label: __('H5'),
                    value: 'h5'
                },
                {
                    label: __('H6'),
                    value: 'h6'
                },
                {
                    label: __('P'),
                    value: 'p'
                },
            ],
        },
        {
            id: 'categoryEnabled',
            label: __('Enable Category', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'categoryPosition',
            show: postblockType === 'type-3' && categoryEnabled,
            label: __('Category Position', 'gutenverse'),
            component: IconRadioControl,
            options: [
                {
                    label: __('Align Left', 'gutenverse'),
                    value: 'left',
                    icon: <AlignLeft />,
                },
                {
                    label: __('Align Center', 'gutenverse'),
                    value: 'center',
                    icon: <AlignCenter />,
                },
                {
                    label: __('Align Right', 'gutenverse'),
                    value: 'right',
                    icon: <AlignRight />,
                },
            ],
        },
        {
            id: 'excerptEnabled',
            label: __('Enable Excerpt', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'excerptLength',
            show: excerptEnabled,
            label: __('Excerpt Length', 'gutenverse'),
            component: RangeControl,
            min: 0,
            max: 200,
            step: 1,
            isParseFloat: false,
        },
        {
            id: 'excerptMore',
            show: excerptEnabled,
            label: __('Excerpt\'s End', 'gutenverse'),
            component: TextControl,
        },
        {
            id: 'readmoreEnabled',
            label: __('Enable Read More', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'readmoreIcon',
            show: readmoreEnabled,
            component: IconSVGControl,
        },
        {
            id: 'readmoreIconPosition',
            show: readmoreEnabled,
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
            id: 'readmoreText',
            show: readmoreEnabled,
            component: TextControl
        },
        {
            id: 'commentEnabled',
            label: __('Enable Comment', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'commentIcon',
            show: commentEnabled,
            component: IconSVGControl,
        },
        {
            id: 'commentIconPosition',
            show: commentEnabled,
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
            id: 'metaEnabled',
            label: __('Enable Post Meta', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'metaAuthorEnabled',
            show: metaEnabled,
            label: __('Enable Post Author Meta', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'metaAuthorByText',
            show: metaEnabled && metaAuthorEnabled,
            label: __('Meta Author Preposition', 'gutenverse'),
            component: TextControl,
        },
        {
            id: 'metaAuthorIcon',
            show: metaEnabled && metaAuthorEnabled,
            component: IconSVGControl
        },
        {
            id: 'metaAuthorIconPosition',
            show: metaEnabled && metaAuthorEnabled,
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
            id: 'metaDateEnabled',
            show: metaEnabled,
            label: __('Enable Post Date Meta', 'gutenverse'),
            component: CheckboxControl,
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
            component: IconSVGControl
        },
        {
            id: 'metaDateIconPosition',
            show: metaEnabled && metaDateEnabled,
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
            ],
        },
    ];
};