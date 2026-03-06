const example = {
    attributes: {
        'alignButtons': {
            'Desktop': 'center'
        },
        'backgroundHover': {},
    },
    innerBlocks: [
        {
            name: 'gutenverse/button',
            attributes: {
                'elementId': 'guten-preview-buttons',
                'content': 'Gutenverse Button 1',
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
                    'type': 'default',
                    'color': {
                        'r': 94,
                        'g': 129,
                        'b': 244,
                        'a': 1
                    },
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
                    'gradientAngle': 65
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
                'color': {
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
                    'weight': '500'
                }
            }
        },
        {
            name: 'gutenverse/button',
            attributes: {
                'elementId': 'guten-preview-buttons-2',
                'content': 'Gutenverse Button 2',
                'alignButton': {
                    'Desktop': 'center'
                },
                'paddingButton': {
                    'Desktop': {
                        'unit': 'px',
                        'dimension': {
                            'top': '20',
                            'right': '40',
                            'bottom': '20',
                            'left': '40'
                        }
                    }
                },
                'buttonBackground': {
                    'type': 'default',
                    'color': {
                        'r': 19,
                        'g': 41,
                        'b': 120,
                        'a': 1
                    }
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
                    'weight': '500'
                }
            }
        },
    ]
};

export default example;