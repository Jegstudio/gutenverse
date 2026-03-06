import { __ } from '@wordpress/i18n';
import { NumberControl, SelectControl } from 'gutenverse-core/controls';

export const exitAnimationPanel = () => {
    return [
        {
            id: 'exitAnimation',
            label: __('Animation', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: 'None',
                    value: ''
                },
                {
                    label: 'Fade Out',
                    value: 'fadeIn'
                },
                {
                    label: 'Fade Out Left',
                    value: 'fadeInLeft'
                },
                {
                    label: 'Fade Out Up',
                    value: 'fadeInDown'
                },
                {
                    label: 'Fade Out Right',
                    value: 'fadeInRight'
                },
                {
                    label: 'Fade Out Down',
                    value: 'fadeInUp'
                },
                {
                    label: 'Slide Out Left',
                    value: 'slideInLeft'
                },
                {
                    label: 'Slide Out Up',
                    value: 'slideInDown'
                },
                {
                    label: 'Slide Out Right',
                    value: 'slideInRight'
                },
                {
                    label: 'Slide Out Down',
                    value: 'slideInUp'
                },
            ],
        },
        {
            id: 'exitAnimationDuration',
            label: __('Duration', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('Normal', '--gctd--'),
                    value: '1000'
                },
                {
                    label: __('Slow', '--gctd--'),
                    value: '2000'
                },
                {
                    label: __('Fast', '--gctd--'),
                    value: '700'
                },
            ]
        },
        {
            id: 'exitAnimationDelay',
            label: __('Delay (ms)', 'gutenverse'),
            component: NumberControl,
            description: __('Input in miliseconds (ms). Later will be converted into second (s)', 'gutenverse'),
            min: 0,
            step: 100
        }
    ];
};
