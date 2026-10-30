import { __ } from '@wordpress/i18n';
import { BoxShadowControl, ColorControl, DimensionControl, RangeControl } from 'gutenverse-core/controls';

export const moreButtonStylePanel = (props) => {
    const { elementId } = props;
    const buttonSelector = `.editor-styles-wrapper .${elementId} .gutenverse-share-more-toggle`;
    const iconSelector = `${buttonSelector} .gutenverse-share-more-icon svg`;

    return [
        {
            id: 'moreButtonSize',
            label: __('Button Size', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 200,
            step: 1,
            unit: 'px',
            allowDeviceControl: true,
            liveStyle: [
                {
                    type: 'plain',
                    id: 'moreButtonSize',
                    responsive: true,
                    selector: buttonSelector,
                    properties: [
                        {
                            name: 'width',
                            valueType: 'pattern',
                            pattern: '{value}px',
                            patternValues: { value: { type: 'direct' } }
                        },
                        {
                            name: 'height',
                            valueType: 'pattern',
                            pattern: '{value}px',
                            patternValues: { value: { type: 'direct' } }
                        },
                        {
                            name: 'min-width',
                            valueType: 'function',
                            valueFunc: () => '0'
                        },
                        {
                            name: 'min-height',
                            valueType: 'function',
                            valueFunc: () => '0'
                        }
                    ]
                }
            ]
        },
        {
            id: 'moreButtonIconSize',
            label: __('Icon Size', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 100,
            step: 1,
            unit: 'px',
            allowDeviceControl: true,
            liveStyle: [
                {
                    type: 'plain',
                    id: 'moreButtonIconSize',
                    responsive: true,
                    selector: iconSelector,
                    properties: [
                        {
                            name: 'width',
                            valueType: 'pattern',
                            pattern: '{value}px',
                            patternValues: { value: { type: 'direct' } }
                        },
                        {
                            name: 'height',
                            valueType: 'pattern',
                            pattern: '{value}px',
                            patternValues: { value: { type: 'direct' } }
                        }
                    ]
                }
            ]
        },
        {
            id: 'moreButtonIconColor',
            label: __('Icon Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    type: 'color',
                    id: 'moreButtonIconColor',
                    selector: iconSelector,
                    properties: [{ name: 'color', valueType: 'direct' }]
                }
            ]
        },
        {
            id: 'moreButtonIconColorHover',
            label: __('Icon Hover Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    type: 'color',
                    id: 'moreButtonIconColorHover',
                    selector: `${buttonSelector}:hover .gutenverse-share-more-icon svg, ${buttonSelector}:focus .gutenverse-share-more-icon svg`,
                    properties: [{ name: 'color', valueType: 'direct' }]
                }
            ]
        },
        {
            id: 'moreButtonBackgroundColor',
            label: __('Background Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    type: 'color',
                    id: 'moreButtonBackgroundColor',
                    selector: `${buttonSelector}, ${buttonSelector}:focus`,
                    properties: [{ name: 'background-color', valueType: 'direct' }]
                }
            ]
        },
        {
            id: 'moreButtonBackgroundColorHover',
            label: __('Background Hover Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    type: 'color',
                    id: 'moreButtonBackgroundColorHover',
                    selector: `${buttonSelector}:hover, ${buttonSelector}:focus`,
                    properties: [{ name: 'background-color', valueType: 'direct' }]
                }
            ]
        },
        {
            id: 'moreButtonPadding',
            label: __('Padding', 'gutenverse'),
            component: DimensionControl,
            position: ['top', 'right', 'bottom', 'left'],
            allowDeviceControl: true,
            units: {
                px: { text: 'px', unit: 'px' },
                em: { text: 'em', unit: 'em' },
                percent: { text: '%', unit: '%' }
            },
            liveStyle: [
                {
                    type: 'dimension',
                    id: 'moreButtonPadding',
                    responsive: true,
                    selector: buttonSelector,
                    properties: [{ name: 'padding', valueType: 'direct' }]
                }
            ]
        },
        {
            id: 'moreButtonBorderRadius',
            label: __('Border Radius', 'gutenverse'),
            component: RangeControl,
            min: 0,
            max: 100,
            step: 1,
            unit: 'px',
            allowDeviceControl: true,
            liveStyle: [
                {
                    type: 'plain',
                    id: 'moreButtonBorderRadius',
                    responsive: true,
                    selector: buttonSelector,
                    properties: [{
                        name: 'border-radius',
                        valueType: 'pattern',
                        pattern: '{value}px',
                        patternValues: { value: { type: 'direct' } }
                    }]
                }
            ]
        },
        {
            id: 'moreButtonBoxShadow',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            liveStyle: [
                {
                    type: 'boxShadow',
                    id: 'moreButtonBoxShadow',
                    selector: buttonSelector,
                    properties: [{ name: 'box-shadow', valueType: 'direct' }]
                }
            ]
        },
        {
            id: 'moreButtonBoxShadowHover',
            label: __('Box Shadow Hover', 'gutenverse'),
            component: BoxShadowControl,
            liveStyle: [
                {
                    type: 'boxShadow',
                    id: 'moreButtonBoxShadowHover',
                    selector: `${buttonSelector}:hover`,
                    properties: [{ name: 'box-shadow', valueType: 'direct' }]
                }
            ]
        }
    ];
};
