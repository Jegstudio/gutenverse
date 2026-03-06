const example = {
    attributes: {
        'elementId': 'guten-preview-image-box',
        'image': {
            'media': {
                'imageId': 1,
                'sizes': {
                    'thumbnail': {
                        'height': 150,
                        'width': 150,
                        'url': 'https://picsum.photos/id/1/150/150',
                        'orientation': 'landscape'
                    },
                    'medium': {
                        'height': 300,
                        'width': 200,
                        'url': 'https://picsum.photos/id/1/200/300',
                        'orientation': 'portrait'
                    },
                    'large': {
                        'height': 683,
                        'width': 1024,
                        'url': 'https://picsum.photos/id/1/1024/683',
                        'orientation': 'portrait'
                    },
                    'full': {
                        'url': 'https://picsum.photos/id/1/1024/683',
                        'height': 683,
                        'width': 1024,
                        'orientation': 'portrait'
                    }
                }
            },
            'size': 'full'
        },
        'bodyBackground':{'type':'default','color':{'r':255,'g':255,'b':255,'a':1}}
    },
    innerBlocks: [
        {
            name: 'gutenverse/button',
            attributes: {
                'content': 'Button',
            }
        },
    ]


};

export default example;