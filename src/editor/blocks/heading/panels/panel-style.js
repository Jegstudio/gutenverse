/* WordPress dependencies */
import { __ } from '@wordpress/i18n';

/* Gutenverse dependencies */
import { handleColor, handleTypography, allowRenderTextShadow, handleTextShadow, handleTextStroke } from 'gutenverse-core/styling';
import { ColorControl, TextShadowControl, TextStrokeControl, TypographyControl, CheckboxControl } from 'gutenverse-core/controls';

export const stylePanel = (props) => {
    const {
        elementId,
        overflowWrap,
    } = props;

    return [
        {
            id: 'color',
            label: __('Text color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `h1.guten-element.${elementId},h2.guten-element.${elementId},h3.guten-element.${elementId},h4.guten-element.${elementId},h5.guten-element.${elementId},h6.guten-element.${elementId}`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'typography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `h1.guten-element.${elementId},h2.guten-element.${elementId},h3.guten-element.${elementId},h4.guten-element.${elementId},h5.guten-element.${elementId},h6.guten-element.${elementId}`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ]
        },
        {
            id: 'textShadow',
            label: __('Text Shadow', 'gutenverse'),
            component: TextShadowControl,
            style: [
                {
                    selector: `h1.guten-element.${elementId},h2.guten-element.${elementId},h3.guten-element.${elementId},h4.guten-element.${elementId},h5.guten-element.${elementId},h6.guten-element.${elementId}`,
                    allowRender: (value) => allowRenderTextShadow(value),
                    render: value => handleTextShadow(value)
                }
            ]
        },
        {
            id: 'textStroke',
            label: __('Text Stroke', 'gutenverse'),
            component: TextStrokeControl,
            style: [
                {
                    selector: `h1.guten-element.${elementId},h2.guten-element.${elementId},h3.guten-element.${elementId},h4.guten-element.${elementId},h5.guten-element.${elementId},h6.guten-element.${elementId}`,
                    hasChild: true,
                    render: value => handleTextStroke(value)
                }
            ]
        },
        {
            id: 'overflowWrap',
            label: __('Do Not Break Word', '--gctd--'),
            description: __('When word length longer than container, do not break them to a new line.', 'gutenverse'),
            allowDeviceControl: true,
            component: CheckboxControl,
            value: overflowWrap,
            deviceValues: overflowWrap,
            style: [
                {
                    selector: `h1.guten-element.${elementId},h2.guten-element.${elementId},h3.guten-element.${elementId},h4.guten-element.${elementId},h5.guten-element.${elementId},h6.guten-element.${elementId}`,
                    render: (value) => {
                        if (value){
                            return 'overflow-wrap: normal; word-break: normal;';
                        } else {
                            return 'overflow-wrap: break-word;';
                        }
                    }
                },
            ]
        },
    ];
};

