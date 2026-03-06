import { __ } from '@wordpress/i18n';
import { CheckboxControl, ColorControl, GradientControl, RangeControl, SelectControl } from 'gutenverse-core/controls';

export const styleHighlightPanel = (props) => {
    const {
        elementId,
        highlightColorType,
    } = props;

    return [
        {
            id: 'highlightColorType',
            label: __('Color Type'),
            component: SelectControl,
            options: [
                {
                    label: __('Color', 'gutenverse'),
                    value: 'color',
                },
                {
                    label: __('Gradient', 'gutenverse'),
                    value: 'gradient',
                },
            ]
        },
        {
            id: 'highlightColor',
            show: highlightColorType === 'color',
            label: __('Highlight color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'highlightColor',
                    'selector': `.editor-styles-wrapper .${elementId} .text-content svg path`,
                    'properties': [
                        {
                            'name': 'stroke',
                            'valueType': 'direct'
                        }
                    ],
                }
            ]
        },
        {
            id: 'highlightGradient',
            show: highlightColorType === 'gradient',
            label: __('Highlight Gradient', 'gutenverse'),
            component: GradientControl,
        },
        {
            id: 'highlightWidth',
            label: __('Highlight Width', 'gutenverse'),
            component: RangeControl,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'highlightWidth',
                    'selector': `.editor-styles-wrapper .${elementId} .text-content svg path`,
                    'properties': [
                        {
                            'name': 'stroke-width',
                            'valueType': 'direct'
                        }
                    ],
                }
            ],
        },
        {
            id: 'highlightRoundedEdges',
            label: __('Rounded Edges'),
            component: CheckboxControl,
        },
        {
            id: 'highlightInFront',
            label: __('Bring to Front'),
            component: CheckboxControl,
        },
    ];
};

