import { __ } from '@wordpress/i18n';
import { BackgroundControl, SelectControl} from 'gutenverse-core/controls';

export const panelOverlay = (props) => {
    const {
        elementId,
    } = props;

    return [
        {
            id: 'iconBoxHoverOverlay',
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'iconBoxHoverOverlay',
                    'selector': `.${elementId}.guten-icon-box .guten-icon-box-wrapper::before`,
                }
            ],
        },
        {
            id: 'iconBoxOverlayDirection',
            label: __('Overlay Direction', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: 'Left',
                    value: 'left'
                },
                {
                    label: 'Right',
                    value: 'right'
                },
                {
                    label: 'Top',
                    value: 'top'
                },
                {
                    label: 'Bottom',
                    value: 'bottom'
                },
                {
                    label: 'Arise',
                    value: 'arise'
                },
            ]
        },
    ];
};

