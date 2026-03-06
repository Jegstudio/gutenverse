const example = {
    attributes: {
        'elementId': 'guten-preview-social-icons',
        'typography': {
            'font': { 'label': 'Average', 'value': 'Average', 'type': 'google' },
            'size': { 'Desktop': { 'point': '16', 'unit': 'px' } }
        },
        'iconSize': { 'Desktop': { 'point': '22', 'unit': 'px' } },
        'gap': { 'Desktop': '10', 'Tablet': '10', 'Mobile': '10' },
        'alignment': { 'Desktop': 'center', 'Tablet': 'center', 'Mobile': 'center' },
        'showText': true,
        'boxShadow': { 'position': 'outline' },
        'boxShadowHover': { 'position': 'outline' },
        'itemPadding': {
            'unit': 'px',
            'dimension': {
                'top': '10',
                'right': '20',
                'bottom': '10',
                'left': '20'
            }
        },
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
    ],
};

export default example;