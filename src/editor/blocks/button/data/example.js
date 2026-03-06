const example = {
    attributes: {
        'elementId': 'guten-preview-button',
        'content': 'Gutenverse Button',
        'alignButton': {
            'Desktop': 'center'
        },
        'paddingButton': {
            'Desktop': {
                'unit': 'px',
                'dimension': {
                    'top': '20',
                    'bottom': '20',
                    'right': '40',
                    'left': '40'
                }
            }
        },
        'buttonBackground': {
            'type': 'gradient',
            'gradientColor': [
                {
                    'color': 'rgb(94, 129, 244)',
                    'active': true,
                    'opacity': 1,
                    'id': 1,
                    'offset': '0.000'
                },
                {
                    'color': 'rgb(126, 32, 207)',
                    'active': false,
                    'id': 2,
                    'offset': '1.000'
                }
            ],
            'gradientType': 'linear',
            'gradientAngle': 95
        },
        'buttonBorder': {
            'radius': {
                'Desktop': {
                    'unit': 'px',
                    'dimension': {
                        'top': '50',
                        'right': '50',
                        'bottom': '50',
                        'left': '50'
                    }
                }
            }
        },
        'showIcon': true,
        'icon': 'fas fa-arrow-right',
        'iconPosition': 'after',
        'iconSpacing': '10',
        'iconSize': {
            'point': '15',
            'unit': 'px'
        },
        'color': {
            'r': 255,
            'g': 255,
            'b': 255,
            'a': 1
        },
        'iconColor': {
            'r': 255,
            'g': 255,
            'b': 255,
            'a': 1
        },
        'typography': {
            'font': {
                'label': 'Roboto',
                'value': 'Roboto',
                'type': 'google'
            },
            'size': {
                'Desktop': {
                    'point': '16',
                    'unit': 'px'
                }
            },
            'weight': '500'
        }
    }
};

export default example;