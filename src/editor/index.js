import { getBlockType, registerBlockType } from '@wordpress/blocks';
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
