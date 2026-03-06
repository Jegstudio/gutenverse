const example = {
    viewportWidth: 800,
    attributes: {
        elementId: 'guten-preview-tabs',
        tabs: [
            {
                tabId: 'tab-a',
                text: 'Gutenverse Tab'
            },
            {
                tabId: 'tab-b',
                text: 'Second Tab'
            },
            {
                tabId: 'tab-c',
                text: 'Third Tab'
            }
        ],
        backgroundColor:{'r':255,'g':255,'b':255,'a':1}
    },
    innerBlocks: [
        {
            name: 'gutenverse/tab',
            attributes: {
                'active': true,
                'first': true,
                'tabId': 'tab-a'
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
            name: 'gutenverse/tab',
            attributes: {
                'tabId': 'tab-b'
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
            name: 'gutenverse/tab',
            attributes: {
                'tabId': 'tab-c'
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