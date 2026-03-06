const example = {
    attributes: {
        'elementId': 'guten-preview-team',
        'src': {
            'image': 'https://picsum.photos/id/1005/400/400'
        },
        'showDesc': true,
        'profileBorderRadius': { 'Desktop': { 'unit': 'px' } },
        'imageBorder': {
            'type': 'solid',
            'radius': {
                'unit': 'px',
                'dimension': {
                    'top': '4',
                    'right': '4',
                    'bottom': '4',
                    'left': '4'
                }
            },
            'width': {
                'unit': 'px',
                'dimension': {
                    'top': '0',
                    'right': '0',
                    'bottom': '0',
                    'left': '0'
                }
            },
            'color': null
        },
        'imageBoxShadow': { 'position': 'outline' },
        'imageBoxShadowHover': { 'position': 'outline' },
        'imgWidth': {
            'Desktop': {
                'point': '250',
                'unit': 'px'
            }
        },
        'imgHeight': {
            'Desktop': {
                'point': '250',
                'unit': 'px'
            }
        },
        'description': 'Cras vel malesuada eros, non ullamcorper eros. Curabitur sed urna tellus. Nullam mattis orci et dui semper ornare. Proin cursus nisl eu urna tincidunt, nec tincidunt odio volutpat.'
    },
    innerBlocks: [
        {
            name: 'gutenverse/social-icons',
            attributes: {
                'iconSize': { 'Desktop': { 'point': '22', 'unit': 'px' } },
                'gap': { 'Desktop': '10', 'Tablet': '10', 'Mobile': '10' },
                'alignment': { 'Desktop': 'center', 'Tablet': 'center', 'Mobile': 'center' },
                'showText': false,
                'boxShadow': { 'position': 'outline' },
                'boxShadowHover': { 'position': 'outline' },
            },
            innerBlocks: [
                {
                    name: 'gutenverse/social-icon',
                    attributes: {
                        icon: 'fab fa-facebook',
                        text: 'Facebook',
                    },
                },
                {
                    name: 'gutenverse/social-icon',
                    attributes: {
                        icon: 'fab fa-twitter',
                        text: 'Twitter',
                    },
                },
                {
                    name: 'gutenverse/social-icon',
                    attributes: {
                        icon: 'fab fa-instagram',
                        text: 'Instagram',
                    },
                },
            ]
        },
    ]
};

export default example;