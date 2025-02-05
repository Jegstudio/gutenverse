import { SelectControl } from 'gutenverse-core/controls';
import { __ } from '@wordpress/i18n';
import { RangeControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const panelIcon = (props) => {
    const {
        iconPosition,
        elementId,
        iconSpacing
    } = props;

    const deviceType = getDeviceType();

    return [
        {
            id: 'iconPosition',
            label: __('Icon Position'),
            component: SelectControl,
            options: [
                {
                    label: __('Left', 'gutenverse'),
                    value: 'left'
                },
                {
                    label: __('Right', 'gutenverse'),
                    value: 'right'
                },
            ],
        },
        {
            id: 'iconSpacing',
            label: __('Icon Spacing', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 200,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
        },
    ];
};
