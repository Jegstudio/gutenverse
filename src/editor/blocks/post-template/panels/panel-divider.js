import { DividerControl, SwitchControl } from 'gutenverse-core/controls';

export const dividerPanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher
    } = props;

    return [
        {
            id: '__shapeLocation',
            component: SwitchControl,
            options: [
                {
                    value: 'top',
                    label: 'Top'
                },
                {
                    value: 'bottom',
                    label: 'Bottom'
                }
            ],
            onChange: ({ __shapeLocation }) => setSwitcher({ ...switcher, location: __shapeLocation })
        },
        {
            id: 'topDivider',
            show: !switcher.location || switcher.location === 'top',
            component: DividerControl,
            liveStyle: [
                {
                    'type': 'shapeDivider',
                    'id': 'topDivider',
                    'selector': `${elementId} .guten-shape-divider.guten-shape-divider-top svg, ${elementId} .guten-shape-divider.guten-shape-divider-top .guten-shape-fill path`,
                }
            ]
        },
        {
            id: 'bottomDivider',
            show: switcher.location === 'bottom',
            component: DividerControl,
            liveStyle: [
                {
                    'type': 'shapeDivider',
                    'id': 'bottomDivider',
                    'selector': `${elementId} .guten-shape-divider.guten-shape-divider-bottom svg, ${elementId} .guten-shape-divider.guten-shape-divider-bottom .guten-shape-fill path`,
                }
            ]
        },
    ];
};