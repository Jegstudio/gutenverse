import { getBlockType, registerBlockType } from '@wordpress/blocks';
import { isBlockActive } from 'gutenverse-core/helper';
import { updateBlockList } from 'gutenverse-core/editor-helper';
import { addFilter } from '@wordpress/hooks';
import { IconAdvanceButtonSVG, IconAdvanceTabsSVG, IconImageMarqueeSVG, IconLottieSVG, IconMegaMenuSVG, IconPostCarouselSVG, IconTextMarqueSVG } from '../assets/icon';
import { plainGeneratorFunction } from './components/styling/generate-css';


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
                tier: ['professional', 'personal'],
                min_tier: 'professional'
            },
            {
                name: 'gutenverse/mega-menu',
                title: 'Mega Menu',
                category: 'gutenverse-element',
                icon: <IconMegaMenuSVG />,
                pro: true,
                locked: true,
                tier: ['professional', 'personal'],
                min_tier: 'professional'
            },
            {
                name: 'gutenverse/advance-button',
                title: 'Advance Button',
                category: 'gutenverse-element',
                icon: <IconAdvanceButtonSVG />,
                pro: true,
                locked: true,
                tier: ['basic', 'professional', 'personal'],
                min_tier: 'basic'
            },
            {
                name: 'gutenverse-pro/advance-tabs',
                title: 'Advance Tabs',
                category: 'gutenverse-element',
                icon: <IconAdvanceTabsSVG />,
                pro: true,
                locked: true,
                tier: ['basic', 'professional', 'personal'],
                min_tier: 'basic'
            },
            {
                name: 'gutenverse/text-marque',
                title: 'Text Marque',
                category: 'gutenverse-element',
                icon: <IconTextMarqueSVG />,
                pro: true,
                locked: true,
                tier: ['professional', 'personal'],
                min_tier: 'professional'
            },
            {
                name: 'gutenverse/image-marque',
                title: 'Image Marque',
                category: 'gutenverse-element',
                icon: <IconImageMarqueeSVG />,
                pro: true,
                locked: true,
                tier: ['professional', 'personal'],
                min_tier: 'professional'
            },
            {
                name: 'gutenverse/post-carousel',
                title: 'Post Carousel',
                category: 'gutenverse-post',
                icon: <IconPostCarouselSVG />,
                pro: true,
                locked: true,
                tier: ['professional', 'personal'],
                min_tier: 'professional'
            },
            ...list,
        ];
    }
);

addFilter(
    'gutenverse-css-generator-plain-function',
    'gutenverse/css/generator/plain/function',
    (value, props) => plainGeneratorFunction(value, props)
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
