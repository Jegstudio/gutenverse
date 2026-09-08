import { __ } from '@wordpress/i18n';
import { IconRadioControl, RangeControl } from 'gutenverse-core/controls';
import { AlignCenter, AlignLeft, AlignRight } from 'gutenverse-core/components';

export const contentStyle = (props) => {
    const {
        elementId,
        orientation = 'horizontal',
        layoutMode = 'default',
    } = props;
    const isHorizontalStretch = orientation !== 'vertical' && layoutMode === 'stretch';
    const gapStyle = (property, selector) => ({
        'type': 'plain',
        'id': 'gap',
        'responsive': true,
        'properties': [
            {
                'name': property,
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct'
                    }
                }
            }
        ],
        'selector': selector,
    });
    const gapLiveStyle = isHorizontalStretch ? [
        gapStyle('gap', `.editor-styles-wrapper .${elementId}.stretch-layout.horizontal`),
    ] : [
        gapStyle('margin-left', `.editor-styles-wrapper .${elementId}.horizontal > div:not(:first-of-type), .editor-styles-wrapper .${elementId}.horizontal > .gutenverse-share-more-toggle`),
        gapStyle('row-gap', `.editor-styles-wrapper .${elementId}.has-more-toggle.horizontal`),
        gapStyle('margin-top', `.editor-styles-wrapper .${elementId}.vertical > div:not(:first-of-type), .editor-styles-wrapper .${elementId}.vertical > .gutenverse-share-more-toggle`),
    ];

    return [
        {
            id: 'alignment',
            label: __('Alignment', 'gutenverse'),
            component: IconRadioControl,
            allowDeviceControl: true,
            options: [
                {
                    label: __('Align Left', 'gutenverse'),
                    value: 'flex-start',
                    icon: <AlignLeft />,
                },
                {
                    label: __('Align Center', 'gutenverse'),
                    value: 'center',
                    icon: <AlignCenter />,
                },
                {
                    label: __('Align Right', 'gutenverse'),
                    value: 'flex-end',
                    icon: <AlignRight />,
                },
            ],
        },
        {
            id: 'gap',
            label: __('Social Icon Gap', 'gutenverse'),
            component: RangeControl,
            default: 10,
            min: 1,
            max: 100,
            allowDeviceControl: true,
            unit: 'px',
            liveStyle: gapLiveStyle
        },
    ];
};
