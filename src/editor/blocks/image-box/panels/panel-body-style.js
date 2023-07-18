import { __ } from '@wordpress/i18n';
import { BackgroundControl, BorderControl, BoxShadowControl, DimensionControl } from 'gutenverse-core-editor/controls';
import { allowRenderBoxShadow, handleBackground, handleBorder, handleDimension } from 'gutenverse-core/styling';
import { handleBoxShadow } from 'gutenverse-core/styling';

export const panelBodyStyle = props => {
    const {
        elementId,
    } = props;

    return [
        {
            id: 'bodyBackground',
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId} .image-box-body .body-inner`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'containerBorder',
            label: __('Border Type', 'gutenverse'),
            component: BorderControl,
            style: [
                {
                    selector: `.${elementId} .image-box-body .body-inner`,
                    hasChild: true,
                    render: value => handleBorder(value)
                }
            ]
        },
        {
            id: 'containerPadding',
            label: __('Padding', 'gutenverse'),
            component: DimensionControl,
            allowDeviceControl: true,
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                ['%']: {
                    text: '%',
                    unit: '%'
                },
                rem: {
                    text: 'rem',
                    unit: 'rem'
                },
            },
            style: [
                {
                    selector: `.${elementId} .image-box-body .body-inner`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: 'containerBoxShadow',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.${elementId} .image-box-body .body-inner`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        }
    ];
};