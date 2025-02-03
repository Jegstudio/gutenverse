import { getBlockType, registerBlockType, getBlockTypes } from '@wordpress/blocks';
import { isBlockActive } from 'gutenverse-core/helper';
import { updateBlockList } from 'gutenverse-core/editor-helper';
import { addFilter } from '@wordpress/hooks';
import { IconLottieSVG, IconMegaMenuSVG } from '../assets/icon';


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

const storedStyles = {};
let debounceTimeout = null;

export const updateIframeStyles = (id, cssText, isFirstRun) => {
    if (!id) return;
    if (cssText) {
        storedStyles[id] = cssText;
    } else {
        delete storedStyles[id];
    }
    if (isFirstRun) {
        console.log('Initial Style Load');
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
            injectEditorStyle();
        }, 300);
    } else {
        injectEditorStyle();
    }

};

const injectEditorStyle = () => {
    const iframeElements = document.getElementsByName('editor-canvas');
    if (iframeElements.length === 0) return;

    const iframeElement = iframeElements[0];
    const iframeDoc = iframeElement.contentDocument || iframeElement.contentWindow.document;
    if (!iframeDoc) return;

    let styleTag = iframeDoc.getElementById('gutenverse-dynamic-style');
    if (!styleTag) {
        styleTag = iframeDoc.createElement('style');
        styleTag.id = 'gutenverse-dynamic-style';
        iframeDoc.head.appendChild(styleTag);
    }
    styleTag.innerHTML = Object.entries(storedStyles)
        .map(([id, css]) => `/* ${id} */\n${css}`)
        .join('\n');

    console.log('Updated iframe styles');
}
