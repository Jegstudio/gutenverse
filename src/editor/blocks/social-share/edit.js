
import { compose } from '@wordpress/compose';
import { withMouseMoveEffect, withPartialRender } from 'gutenverse-core/hoc';
import {
    useInnerBlocksProps,
    useBlockProps
} from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { panelList } from './panels/panel-list';
import { BlockPanelController } from 'gutenverse-core/controls';
import { useRef } from '@wordpress/element';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';
import { CopyElementToolbar } from 'gutenverse-core/components';

const SocialShare = compose(
    withPartialRender,
    withMouseMoveEffect
)(props => {
    const {
        attributes,
        clientId
    } = props;

    const {
        elementId,
        orientation = 'horizontal',
        layoutMode = 'default',
        buttonLayout = 'split',
        enableMoreButton = false,
        visibleButtonCount = 2,
        shape,
        color,
        showText,
    } = attributes;
    const isHorizontalStretch = orientation !== 'vertical' && layoutMode === 'stretch';

    const elementRef = useRef();
    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-social-share',
            'no-margin',
            elementId,
            shape,
            orientation,
            {
                'stretch-layout': isHorizontalStretch,
                'button-layout-solid': buttonLayout === 'solid',
                'has-more-toggle': enableMoreButton,
            },
            color,
            animationClass,
            displayClass,
            {
                'show-text': showText,
            }),
        ref: elementRef
    });

    const innerBlocksProps = useInnerBlocksProps(blockProps, {
        template: [
            ['gutenverse/social-share-facebook']
        ],
        allowedBlocks: [
            'gutenverse/social-share-facebook',
            'gutenverse/social-share-twitter',
            'gutenverse/social-share-pinterest',
            'gutenverse/social-share-stumbleupon',
            'gutenverse/social-share-linkedin',
            'gutenverse/social-share-reddit',
            'gutenverse/social-share-tumblr',
            'gutenverse/social-share-vk',
            'gutenverse/social-share-whatsapp',
            'gutenverse/social-share-telegram',
            'gutenverse/social-share-wechat',
            'gutenverse/social-share-line',
            'gutenverse/social-share-email',
            'gutenverse/social-share-chatgpt',
            'gutenverse/social-share-perflexity',
        ],
        orientation,
        __experimentalAppenderTagName: 'div',
    });

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);

    const moreButton = enableMoreButton && (
        <button
            className="gutenverse-share-more-toggle gutenverse-share-more-toggle-editor"
            type="button"
            aria-hidden="true"
            tabIndex={-1}
            data-visible-button-count={visibleButtonCount}
        >
            <span className="gutenverse-share-more-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d="M14 8V4l8 8-8 8v-4.1c-5.1.4-8.6 2.2-12 6.1.9-6.5 4.6-12.6 12-14Z" />
                </svg>
            </span>
        </button>
    );

    return <>
        <CopyElementToolbar {...props}/>
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
        <div {...innerBlocksProps}>
            {innerBlocksProps.children}
            {moreButton}
        </div>
    </>;
});

export default SocialShare;
