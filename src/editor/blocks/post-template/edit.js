import { memo, useMemo, useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import {
    useBlockProps,
    useInnerBlocksProps,
    store as blockEditorStore,
    __experimentalUseBlockPreview as useBlockPreview,
    BlockContextProvider
} from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { Spinner } from '@wordpress/components';

const TEMPLATE = [
    ['gutenverse/container', {}, [
        ['gutenverse/post-featured-image'],
        ['gutenverse/post-title'],
        ['gutenverse/post-excerpt']
    ]]
];

// The inner blocks component for the active/editable post
function PostTemplateInnerBlocks() {
    const innerBlocksProps = useInnerBlocksProps(
        { className: 'wp-block-post' },
        { template: TEMPLATE, __unstableDisableLayoutClassNames: true }
    );
    return <div {...innerBlocksProps} />;
}

// Memoized preview for non-active posts
function PostTemplateBlockPreview({ blocks, blockContextId, isHidden, setActiveBlockContextId }) {
    const blockPreviewProps = useBlockPreview({
        blocks,
        props: {
            className: 'wp-block-post',
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

const PostItem = memo(({ post, blocks, isActive, onSelect }) => {
    const blockContext = useMemo(() => ({
        postType: post.type,
        postId: post.id,
    }), [post.type, post.id]);

    const handleSelect = () => onSelect(blockContext.postId);

    return (
        <BlockContextProvider value={blockContext}>
            {isActive ? (
                <PostTemplateInnerBlocks />
            ) : (
                <MemoizedPostTemplateBlockPreview
                    blocks={blocks}
                    blockContextId={blockContext.postId}
                    setActiveBlockContextId={handleSelect}
                    isHidden={false}
                />
            )}
        </BlockContextProvider>
    );
});

export default function Edit({ clientId, context }) {
    const [activeBlockContextId, setActiveBlockContextId] = useState();

    // Consume posts from Query Loop context
    const { 'gutenverse/queryPosts': posts, 'gutenverse/isResolving': isResolving } = context;

    // We also need inner blocks to render the preview
    const { blocks } = useSelect((select) => {
        return {
            blocks: select(blockEditorStore).getBlocks(clientId)
        };
    }, [clientId]);

    const blockProps = useBlockProps({
        className: classnames('guten-post-template')
    });

    // Fallback if used outside Query Loop
    if (posts === undefined && isResolving === undefined) {
        return <div className="guten-post-template-error">Post Template must be used inside a Query Loop</div>;
    }

    if (isResolving) {
        return (
            <div {...blockProps}>
                <Spinner />
            </div>
        );
    }

    if (!posts || !posts.length) {
        return (
            <div {...blockProps}>
                <p>No posts found.</p>
            </div>
        );
    }

    return (
        <div {...blockProps}>
            {posts.map((post) => (
                <PostItem
                    key={post.id}
                    post={post}
                    blocks={blocks}
                    isActive={post.id === (activeBlockContextId || posts[0]?.id)}
                    onSelect={setActiveBlockContextId}
                />
            ))}
        </div>
    );
}
