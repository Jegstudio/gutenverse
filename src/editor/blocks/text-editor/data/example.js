const example = {
    attributes: {
        'elementId': 'guten-preview-text-editor',
        'columns': {
            'Desktop': '3',
            'Tablet': '1',
            'Mobile': '1'
        },
        'gap': {
            'Desktop': {
                'point': '22',
                'unit': 'px'
            }
        },
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
};

export default example;