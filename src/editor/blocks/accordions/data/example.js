const example = {
    attributes: {
        'elementId': 'guten-preview-accordions',
        'iconColor': {
            'r': 255,
            'g': 255,
            'b': 255,
            'a': 1
        },
        'iconActiveColor': {
            'r': 255,
            'g': 255,
            'b': 255,
            'a': 1
        },
        'titleTextColor': {
            'r': 255,
            'g': 255,
            'b': 255,
            'a': 1
        },
        'titleTypography': {
            'font': {
                'label': 'Roboto',
                'value': 'Roboto',
                'type': 'google'
            },
            'weight': '600',
            'size': {
                'Desktop': {
                    'point': '16',
                    'unit': 'px'
                }
            }
        },
        'titlePadding': {
            'Desktop': {}
        },
        'contentBackgroundColor': {
            'r': 255,
            'g': 255,
            'b': 255,
            'a': 1
        },
        'contentTextColor': {
            'r': 129,
            'g': 129,
            'b': 165,
            'a': 1
        },
        'contentPadding': {
            'Desktop': {}
        },
        'accordionBorder': {
            'radius': {
                'Desktop': {}
            }
        },
        'titleBorder': {
            'radius': {
                'Desktop': {}
            }
        },
        'contentBorder': {
            'radius': {
                'Desktop': {}
            }
        },
        'background': {
            'type': 'default',
            'color': {
                'r': 94,
                'g': 129,
                'b': 244,
                'a': 1
            }
        },
        'border': {
            'radius': {
                'Desktop': {}
            }
        },
        'margin': {
            'Desktop': {}
        },
        'padding': {
            'Desktop': {}
        }
    },
    innerBlocks: [
        {
            name: 'gutenverse/accordion',
            attributes: {
                'active': true,
                'first': true,
                'title': 'Gutenverse Accordion'
            },
            innerBlocks: [
                {
                    name: 'core/paragraph',
                    attributes: {
                        content: 'Maecenas nec convallis urna, non fermentum lectus. Integer fringilla felis nisl, id sollicitudin mauris consectetur vel. Cras et convallis enim. Nulla tempus tincidunt imperdiet. Donec luctus auctor urna ullamcorper ornare. Mauris vestibulum a odio sit amet dapibus.',
                    },
                },
                {
                    name: 'core/paragraph',
                    attributes: {
                        content: 'In blandit risus accumsan, vulputate nunc sit amet, dignissim dolor. Nullam vehicula molestie fermentum. Etiam arcu urna, pulvinar ut ante a, pellentesque suscipit nulla. Donec vitae accumsan eros.',
                    },
                }
            ]
        },
        {
            name: 'gutenverse/accordion',
            attributes: {
                'title': 'Accordion 2'
            },
            innerBlocks: [
                {
                    name: 'core/paragraph',
                    attributes: {
                        content: 'Maecenas nec convallis urna, non fermentum lectus. Integer fringilla felis nisl, id sollicitudin mauris consectetur vel. Cras et convallis enim. Nulla tempus tincidunt imperdiet. Donec luctus auctor urna ullamcorper ornare. Mauris vestibulum a odio sit amet dapibus.',
                    },
                },
                {
                    name: 'core/paragraph',
                    attributes: {
                        content: 'In blandit risus accumsan, vulputate nunc sit amet, dignissim dolor. Nullam vehicula molestie fermentum. Etiam arcu urna, pulvinar ut ante a, pellentesque suscipit nulla. Donec vitae accumsan eros.',
                    },
                }
            ]
        },
        {
            name: 'gutenverse/accordion',
            attributes: {
                'title': 'Accordion 3'
            },
            innerBlocks: [
                {
                    name: 'core/paragraph',
                    attributes: {
                        content: 'Maecenas nec convallis urna, non fermentum lectus. Integer fringilla felis nisl, id sollicitudin mauris consectetur vel. Cras et convallis enim. Nulla tempus tincidunt imperdiet. Donec luctus auctor urna ullamcorper ornare. Mauris vestibulum a odio sit amet dapibus.',
                    },
                },
                {
                    name: 'core/paragraph',
                    attributes: {
                        content: 'In blandit risus accumsan, vulputate nunc sit amet, dignissim dolor. Nullam vehicula molestie fermentum. Etiam arcu urna, pulvinar ut ante a, pellentesque suscipit nulla. Donec vitae accumsan eros.',
                    },
                }
            ]
        },
    ]
};

export default example;