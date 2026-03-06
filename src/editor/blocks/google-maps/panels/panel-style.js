import { __ } from '@wordpress/i18n';
import { ImageFilterControl, SwitchControl } from 'gutenverse-core/controls';
import { isEmptyString } from 'gutenverse-core/helper';

export const panelStyle = (props) => {
    const { 
        switcher,
        setSwitcher,
    } = props;

    return [
        {
            id: '__mapHover',
            component: SwitchControl,
            options: [
                {
                    value: 'normal',
                    label: 'Normal'
                },
                {
                    value: 'hover',
                    label: 'Hover'
                }
            ],
            onChange: ({ __mapHover }) => setSwitcher({ ...switcher, mapType: __mapHover })
        },
        {
            id: 'mapFilter',
            show: !switcher.mapType || switcher.mapType === 'normal',
            label: __('Map Filter', 'gutenverse'),
            component: ImageFilterControl,
        },
        {
            id: 'mapFilterHover',
            show: switcher.mapType === 'hover',
            label: __('Map Hover Filter', 'gutenverse'),
            component: ImageFilterControl,
        },
    ];
};