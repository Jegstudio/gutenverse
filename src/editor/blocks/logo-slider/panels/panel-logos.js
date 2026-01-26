import { __ } from '@wordpress/i18n';
import { ImageControl, RepeaterControl, SelectControl, TextControl } from 'gutenverse-core/controls';
import { getDefaultImageLoadRepeater } from "../../../helper";

export const logosPanel = () => {
    return [
        {
            id: 'logos',
            label: __('Client Logos', 'gutenverse'),
            component: RepeaterControl,
            titleFormat: '<strong><%= value.title%></strong>',
            options: [
                {
                    id: 'title',
                    label: __('Title', 'gutenverse'),
                    component: TextControl,
                },
                {
                    id: 'src',
                    label: __('Client Logo', 'gutenverse'),
                    component: ImageControl,
                },
                {
                    id: 'hoverSrc',
                    label: __('Hover Logo', 'gutenverse'),
                    component: ImageControl,
                    description: __('If the Hover Logo is empty, the Client Logo will be used as a placeholder. Hovering options will still apply.', 'gutenverse'),
                },
                {
                    id: 'imageLoad',
                    label: __('Image Load', 'gutenverse'),
                    component: SelectControl,
                    defaultValue: getDefaultImageLoadRepeater,
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
                {
                    id: 'link',
                    label: __('Link', 'gutenverse'),
                    component: TextControl
                }
            ],
        },
    ];
};