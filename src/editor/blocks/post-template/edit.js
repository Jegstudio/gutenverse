import {
    __experimentalUseBlockPreview as useBlockPreview,
    useBlockProps,
    useInnerBlocksProps,
    BlockContextProvider,
    store as blockEditorStore,
} from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';
import { useSelect } from '@wordpress/data';
import { useEntityProp } from '@wordpress/core-data';
import { memo, useEffect, useMemo, useRef, useState } from '@wordpress/element';
import classnames from 'classnames';
import { BlockPanelController } from 'gutenverse-core/controls';
import { determineLocation, isAnimationActive, isSticky, theDeviceType } from 'gutenverse-core/helper';
import { withAnimationAdvanceV2, withAnimationBackgroundV2, withAnimationStickyV2, withBackgroundEffect, withBackgroundSlideshow, withCursorEffect, withMouseMoveEffect, withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { useAnimationEditor, useDisplayEditor } from 'gutenverse-core/hooks';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';
import isEmpty from 'lodash/isEmpty';
import { Spinner } from '@wordpress/components';
import { panelList } from './panels/panel-list';

const TEMPLATE = [
    ['gutenverse/container', {}, [
        ['gutenverse/post-featured-image'],
        ['gutenverse/post-title'],
        ['gutenverse/post-excerpt']
    ]]
];

/**
 * Renders the active (editable) post item with full useInnerBlocksProps.
 */
function PostTemplateInnerBlocks() {
    const innerBlocksProps = useInnerBlocksProps(
        { className: 'guten-post-item' },
        { template: TEMPLATE, __unstableDisableLayoutClassNames: true }
    );
    return <div {...innerBlocksProps} />;
}

/**
 * Wraps a post item to fetch its meta via useEntityProp and pass
 * a complete blockContext (postType, postId, meta) to children.
 */
function PostItemWithMeta({ post, children }) {
    const [meta] = useEntityProp('postType', post.type, 'meta', post.id);

    const blockContext = useMemo(() => ({
        postType: post.type,
        postId: post.id,
        meta,
    }), [post.type, post.id, meta]);

    return children(blockContext);
}

/**
 * Renders an inactive (read-only) post item via useBlockPreview.
 * Clicking on it makes this post the active one.
 * When this post IS the active one, it's hidden (display:none)
 * to avoid flicker when switching — the cached preview is instantly
 * shown when switching away from this post.
 */
function PostTemplateBlockPreview({ blocks, blockContextId, isHidden, setActiveBlockContextId }) {
    const blockPreviewProps = useBlockPreview({
        blocks,
        props: {
            className: 'guten-post-item',
        },
    });

    const handleOnClick = () => {
        setActiveBlockContextId(blockContextId);
    };

    const style = {
        display: isHidden ? 'none' : undefined,
    };

    return (
        <div
            {...blockPreviewProps}
            tabIndex={0}
            role="button"
            onClick={handleOnClick}
            onKeyPress={handleOnClick}
            style={style}
        />
    );
}

const MemoizedPostTemplateBlockPreview = memo(PostTemplateBlockPreview);

const PostTemplateBlock = compose(
    withPartialRender,
    withPassRef,
    withAnimationStickyV2(),
    withAnimationAdvanceV2('post-template'),
    withAnimationBackgroundV2(),
    withMouseMoveEffect,
    withBackgroundSlideshow,
    withBackgroundEffect('post-template'),
    withCursorEffect,
)((props) => {
    const {
        clientId,
        context,
        attributes,
        setAttributes,
        setBlockRef,
        slideElement,
    } = props;

    const {
        elementId,
        containerLayout,
        backgroundAnimated = {},
        background,
        cursorEffect,
        backgroundEffect,
        sticky = {},
        stickyPosition,
    } = attributes;

    const [activeBlockContextId, setActiveBlockContextId] = useState();
    const [transientState, setTransientState] = useState({});

    const { 'gutenverse/queryPosts': posts, 'gutenverse/isResolving': isResolving } = context;

    const elementRef = useRef();
    const deviceType = useSelect(() => theDeviceType(determineLocation()), []);

    // Get inner blocks (the template structure) for use in read-only previews
    const blocks = useSelect(
        (selectFn) => selectFn(blockEditorStore).getBlocks(clientId),
        [clientId]
    );

    // Generate element ID and apply dynamic styles at the top level
    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);

    useEffect(() => {
        if (elementRef) {
            setBlockRef(elementRef);
        }
    }, [elementRef]);

    // Default elementId if missing
    useEffect(() => {
        if (!attributes.elementId) {
            setAttributes({ elementId: `guten-${clientId}` });
        }
    }, [clientId, attributes.elementId]);

    const displayClass = useDisplayEditor(attributes);
    const animationClass = useAnimationEditor(attributes);
    const isBackgroundEffect = (backgroundEffect !== undefined) && (backgroundEffect?.type !== 'none') && !isEmpty(backgroundEffect);

    const classes = classnames(
        'guten-element',
        'guten-post-template',
        'guten-flex-container-editor',
        containerLayout,
        elementId,
        animationClass,
        displayClass,
        {
            'background-animated': isAnimationActive(backgroundAnimated),
            'guten-video-background': background?.backgroundType === 'video' && background?.videoUrl,
            'guten-background-slideshow': background?.backgroundType === 'slide' && background?.slideImage?.length > 0,
            'guten-cursor-effect': cursorEffect?.show,
            'guten-background-effect-active': isBackgroundEffect,
            ['guten-sticky']: isSticky(sticky),
            [`sticky-${stickyPosition}`]: isSticky(sticky),
        }
    );

    const blockProps = useBlockProps({
        className: classes,
        ref: elementRef,
        'data-id': elementId ? elementId.split('-')[1] : '',
    });

    if (posts === undefined && isResolving === undefined) {
        return <div className="guten-post-template-error">Post Template must be used inside a Query Loop</div>;
    }

    if (isResolving) {
        return (
            <>
                <BlockPanelController props={{ ...props, transientState, setTransientState }} panelList={panelList} elementRef={elementRef} />
                <div {...blockProps}>
                    <Spinner />
                </div>
            </>
        );
    }

    if (!posts || !posts.length) {
        return (
            <>
                <BlockPanelController props={{ ...props, transientState, setTransientState }} panelList={panelList} elementRef={elementRef} />
                <div {...blockProps}>
                    <p>No posts found.</p>
                </div>
            </>
        );
    }

    // To avoid flicker when switching active post contexts, a preview is rendered
    // for each post, but the preview for the active post is hidden.
    // This ensures that when it is displayed again, the cached rendering of the
    // block preview is used, instead of having to re-render the preview from scratch.
    return <>
        <BlockPanelController props={{ ...props, transientState, setTransientState }} panelList={panelList} elementRef={elementRef} />
        <div {...blockProps}>
            {/* Backgrounds & Effects */}
            {isBackgroundEffect && <div className="guten-background-effect"><div className="inner-background-container"></div></div>}

            {/* Slideshow */}
            {!isAnimationActive(backgroundAnimated) && background?.slideImage?.length > 0 && slideElement}

            {/* Animated Background */}
            {isAnimationActive(backgroundAnimated) &&
                <div className={'guten-background-animated'}>
                    <div className={`animated-layer animated-${elementId ? elementId.split('-')[1] : ''}`}>
                        {background?.slideImage?.length > 0 && slideElement}
                    </div>
                </div>
            }

            {/* Overlay */}
            {!isEmpty(attributes.backgroundOverlay) && <div className="guten-background-overlay" />}

            {/* Post Items: active post is editable, others are read-only previews */}
            {posts.map((post) => {
                const isActive = post.id === (activeBlockContextId || posts[0]?.id);
                return (
                    <PostItemWithMeta key={post.id} post={post} isActive={isActive}>
                        {(blockContext) => (
                            <BlockContextProvider value={blockContext}>
                                {isActive && <PostTemplateInnerBlocks />}
                                <MemoizedPostTemplateBlockPreview
                                    blocks={blocks}
                                    blockContextId={post.id}
                                    isHidden={isActive}
                                    setActiveBlockContextId={setActiveBlockContextId}
                                />
                            </BlockContextProvider>
                        )}
                    </PostItemWithMeta>
                );
            })}
        </div>
    </>;
});

export default PostTemplateBlock;
