const example = {
    attributes: {
        'elementId': 'guten-preview-icon-list',
        'spaceBetween': {
            'Desktop': '19'
        },
        'alignList': {
            'Desktop': 'center'
        },
        'iconColor': {
            'r': 94,
            'g': 129,
            'b': 244,
            'a': 1
        },
        'textIndent': {
            'Desktop': '12'
        }
    },
    innerBlocks: [
        {
            name: 'gutenverse/icon-list-item',
            attributes: {
                icon: 'fas fa-check',
                text: 'Lorem ipsum dolor sit amet.',
            },
        },
        {
            name: 'gutenverse/icon-list-item',
            attributes: {
                icon: 'fas fa-check-circle',
                text: 'Pellentesque vestibulum quam nisl.',
            },
        },
        {
            name: 'gutenverse/icon-list-item',
            attributes: {
                icon: 'far fa-circle',
                text: 'Morbi eleifend fringilla massa.',
            },
        },
    ]
};

export default example;