import { SelectControl, SizeControl } from 'gutenverse-core/controls';
import { __ } from '@wordpress/i18n';
import { select } from '@wordpress/data';
import isEmpty from 'lodash/isEmpty';

export const contentPanel = (props) => {
    const {
        clientId,
        elementId,
        selector,
        overflow
    } = props;
    const blockName = select('core/block-editor').getBlockName(clientId);
    const checkSelector = !isEmpty(selector) ? selector : `.${elementId}.guten-element`;
    const customSelector = blockName !== 'gutenverse/section' ? checkSelector : `.section-wrapper[data-id="${elementId?.split('-')[1]}"]`;
    return [
        {
            id: 'orientation',
            label: __('Tab Orientation', 'gutenverse'),
            component: (props) => {
                return SelectControl({
                    ...props,
                });
            },
            options: [
                {
                    label: __('Horizontal'),
                    value: 'horizontal'
                },
                {
                    label: __('Vertical'),
                    value: 'vertical'
                },
                {
                    label: __('Horizontal Center Align'),
                    value: 'horizontal-center'
                },
                {
                    label: __('Horizontal Right Align'),
                    value: 'horizontal-right'
                },

            ],
            style: [
                {
                    selector: customSelector,
                    allowRender: value => value,
                    render : value => {
                        if(value === 'horizontal'){
                            return 'display: block;';
                        }else if(value === 'vertical'){
                            return 'display: flex;';
                        }
                    }
                },
                {
                    selector: `${checkSelector} .tab-heading-item` ,
                    allowRender: value => value,
                    render : value => {
                        if(value === 'horizontal-center'){
                            return 'justify-content: center;';
                        }else if(value === 'horizontal-right'){
                            return 'justify-content: end;';
                        }
                    }
                }
            ]
        },
        {
            id: 'overflow',
            label: __('Overflow', 'gutenverse'),
            description: overflow === 'clip'? __('"overflow:clip" May not work on safari', 'gutenverse') : false,
            component: SelectControl,
            options: [
                {
                    label: __('Default'),
                    value: 'visible'
                },
                {
                    label: __('Hidden'),
                    value: 'hidden'
                },
                {
                    label: __('Auto'),
                    value: 'Auto'
                },
                {
                    label: __('Clip'),
                    value: 'clip'
                },

            ],
            style: [
                {
                    selector: `${checkSelector} .tab-body`,
                    allowRender: value => value,
                    render: value => {
                        return `overflow: ${value};`;
                    }
                },
                {
                    selector: `${checkSelector}.guten-tabs`,
                    allowRender: value => value,
                    render: value => {
                        return `overflow: ${value};`;
                    }
                }
            ]
        },
        {
            id: 'clipMargin',
            label: __('Overflow Clip Margin', 'gutenverse'),
            show: overflow === 'clip',
            component: SizeControl,
            description: __('The "clip margin" sets the boundaries where the overflow is hidden.', '--gctd--'),
            units: {
                px: {
                    text: 'px',
                    min: 0,
                    max: 100,
                    step: 1
                }
            },
            allowDeviceControl: true,
            style: [
                {
                    selector: `${checkSelector} .tab-body`,
                    allowRender: () => overflow === 'clip',
                    render: value => `overflow-clip-margin: ${value['point']}px;`
                },
                {
                    selector: `${checkSelector}.guten-tabs`,
                    allowRender: () => overflow === 'clip',
                    render: value => `overflow-clip-margin: ${value['point']}px;`
                }
            ]
        },
    ];
};