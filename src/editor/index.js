import { getBlockType, registerBlockType, getBlockTypes } from '@wordpress/blocks';
import { isBlockActive } from 'gutenverse-core/helper';
import { updateBlockList } from 'gutenverse-core/editor-helper';
import { addFilter } from '@wordpress/hooks';
import { IconLottieSVG, IconMegaMenuSVG } from '../assets/icon';
import { select } from '@wordpress/data';


addFilter(
    'gutenverse.blocklist.locked',
    'gutenverse/blocklist/locked',
    (list) => {

        return [
            {
                name: 'gutenverse/lottie',
                title: 'Lottie',
                category: 'gutenverse-element',
                icon: <IconLottieSVG />,
                pro: true,
                locked: true,
            },
            {
                name: 'gutenverse/mega-menu',
                title: 'Mega Menu',
                category: 'gutenverse-element',
                icon: <IconMegaMenuSVG />,
                pro: true,
                locked: true,
            },
            {
                name: 'gutenverse/advance-button',
                title: 'Advance Button',
                category: 'gutenverse-element',
                icon: <IconMegaMenuSVG />,
                pro: true,
                locked: true,
            },
            {
                name: 'gutenverse-pro/advance-tabs',
                title: 'Advance Tabs',
                category: 'gutenverse-element',
                icon: <IconMegaMenuSVG />,
                pro: true,
                locked: true,
            },
            {
                name: 'gutenverse/text-marque',
                title: 'Text Marque',
                category: 'gutenverse-element',
                icon: <IconMegaMenuSVG />,
                pro: true,
                locked: true,
            },
            {
                name: 'gutenverse/image-marque',
                title: 'Image Marque',
                category: 'gutenverse-element',
                icon: <IconMegaMenuSVG />,
                pro: true,
                locked: true,
            },
            ...list,
        ];
    }
);

const registerBlocks = () => {
    const general = require.context('./blocks', true, /index\.js$/);
    const socials = require.context('./blocks/social-share-item', true, /social-share-.+\.js$/);
    const blocks = [general, socials];

    blocks.forEach(block => {
        block.keys().forEach(key => {
            const { settings, metadata, name } = block(key);

            name && updateBlockList({ name, settings, metadata });

            if (window?.GutenverseConfig && name && !getBlockType(name) && isBlockActive(name)) {
                registerBlockType(name, {
                    ...settings,
                    ...metadata
                });
            }
        });
    });
};


(() => {
    registerBlocks();
})();

/**
 * Improve this:
 * 1. There is no iframe in page editor
 * 2. Don't use set timeout
 */
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const blockStyles = select('gutenverse/blockstyle').getStyle();
        const iframeElements = document.getElementsByName('editor-canvas');   
        if (iframeElements.length > 0) {
            const iframeElement = iframeElements[0];
            const iframeDoc = iframeElement.contentDocument || iframeElement.contentWindow.document;
            if(blockStyles.length > 0){
                let styleContent = '';

                blockStyles.forEach(block => {
                    styleContent += block.style + ' ';
                });

                const styleTag = iframeDoc.createElement('style');
                styleTag.innerHTML = styleContent;

                const head = iframeDoc.head || iframeDoc.getElementsByTagName('head')[0];
                head.appendChild(styleTag);
            }
        }
    }, 500);
});
