import { __ } from '@wordpress/i18n';
import { DimensionControl, NumberControl } from 'gutenverse-core/controls';

export const layoutPanel = () => {

    return [
        {
            id: 'margin',
            label: __('Margin', 'gutenverse'),
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
        },
        {
            id: 'padding',
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
        },
        {
            id: 'zIndex',
            label: __('Z Index', '--gctd--'),
            component: NumberControl,
            allowDeviceControl: true,
            min: 1,
            max: 9999,
            step: 1,
        },
    ];
};
