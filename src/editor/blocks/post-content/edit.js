import { compose } from '@wordpress/compose';
import { useEffect } from '@wordpress/element';
import { withCustomStyle, withPartialRender } from 'gutenverse-core/hoc';
import { classnames } from 'gutenverse-core/components';
import { PanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useRef } from '@wordpress/element';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import {
    InspectorControls,
    useBlockProps,
    RecursionProvider,
    useHasRecursion,
    Warning,
    useInnerBlocksProps,
    __experimentalUseBlockPreview as useBlockPreview,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { PanelTutorial } from 'gutenverse-core/controls';
import { useSettingFallback } from 'gutenverse-core/helper';
import { useSelect } from '@wordpress/data';
import {
    useEntityProp,
    useEntityBlockEditor,
    store as coreStore,
} from '@wordpress/core-data';
import { useMemo } from '@wordpress/element';
import { parse } from '@wordpress/blocks';

const Placeholder = () => {
    return <div className="post-content">
        <p>{__('This will be your post\'s content block, it will display all the blocks in any single post or page.', 'gutenverse')}</p>
        <p>{__('That might be a simple arrangement like consecutive paragraphs in a blog post, or a more elaborate composition that includes image galleries, videos, tables, columns, and any other block types.', 'gutenverse')}</p>
    </div>;
};

const useCanEditEntity = (kind, name, recordId) => {
    return useSelect(
        (select) =>
            select(coreStore).canUser('update', {
                kind,
                name,
                id: recordId,
            }),
        [kind, name, recordId]
    );
};

const EditableContent = ({ context = {} }) => {
    const { postType, postId } = context;

    const [blocks, onInput, onChange] = useEntityBlockEditor(
        'postType',
        postType,
        { id: postId }
    );

    const entityRecord = useSelect(
        (select) => {
            return select(coreStore).getEntityRecord(
                'postType',
                postType,
                postId
            );
        },
        [postType, postId]
    );

    const hasInnerBlocks = !!entityRecord?.content?.raw || blocks?.length;

    const initialInnerBlocks = [['core/paragraph']];

    const props = useInnerBlocksProps(
        useBlockProps({ className: 'entry-content' }),
        {
            value: blocks,
            onInput,
            onChange,
            template: !hasInnerBlocks ? initialInnerBlocks : undefined,
        }
    );
    return <div {...props} />;
}

const ReadOnlyContent = ({
    parentLayout,
    layoutClassNames,
    userCanEdit,
    postType,
    postId,
}) => {
    const [, , content] = useEntityProp(
        'postType',
        postType,
        'content',
        postId
    );
    const blockProps = useBlockProps({ className: layoutClassNames });
    const blocks = useMemo(() => {
        return content?.raw ? parse(content.raw) : [];
    }, [content?.raw]);
    const blockPreviewProps = useBlockPreview({
        blocks,
        props: blockProps,
        layout: parentLayout,
    });

    if (userCanEdit) {
        /*
         * Rendering the block preview using the raw content blocks allows for
         * block support styles to be generated and applied by the editor.
         *
         * The preview using the raw blocks can only be presented to users with
         * edit permissions for the post to prevent potential exposure of private
         * block content.
         */
        return <div {...blockPreviewProps}></div>;
    }

    return content?.protected ? (
        <div {...blockProps}>
            <Warning>{__('This content is password protected.')}</Warning>
        </div>
    ) : (
        <div
            {...blockProps}
            dangerouslySetInnerHTML={{ __html: content?.rendered }}
        ></div>
    );
};

const Content = (props) => {
    const { context: { queryId, postType, postId } = {}, layoutClassNames } =
        props;
    const userCanEdit = useCanEditEntity('postType', postType, postId);
    if (userCanEdit === undefined) {
        return null;
    }

    const isDescendentOfQueryLoop = Number.isFinite(queryId);
    const isEditable = userCanEdit && !isDescendentOfQueryLoop;

    return isEditable ? (
        <EditableContent {...props} />
    ) : (
        <ReadOnlyContent
            parentLayout={props.parentLayout}
            layoutClassNames={layoutClassNames}
            userCanEdit={userCanEdit}
            postType={postType}
            postId={postId}
        />
    );
};

const PostContentBlock = compose(
    withPartialRender,
    withCustomStyle(panelList),
    withCopyElementToolbar()
)((props) => {
    const {
        attributes,
        setElementRef,
        context,
        __unstableLayoutClassNames: layoutClassNames,
        __unstableParentLayout: parentLayout,
    } = props;

    const {
        elementId,
        inheritLayout,
    } = attributes;

    const { postId: contextPostId, postType: contextPostType } = context;
    const hasAlreadyRendered = useHasRecursion(contextPostId);

    const RecursionError = () => {
        const blockProps = useBlockProps();
        return (
            <div {...blockProps}>
                <Warning>
                    {__('Block cannot be rendered inside itself.')}
                </Warning>
            </div>
        );
    };

    if (contextPostId && contextPostType && hasAlreadyRendered) {
        return <RecursionError />;
    }

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const postTitleRef = useRef();
    const layout = useSettingFallback('layout');

    useEffect(() => {
        if (postTitleRef.current) {
            setElementRef(postTitleRef.current);
        }
    }, [postTitleRef]);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-post-content',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: postTitleRef
    });

    return <>
        <InspectorControls>
            <PanelTutorial
                title={__('How Post Content works?', 'gutenverse')}
                list={[
                    {
                        title: __('On Frontend', 'gutenverse'),
                        description: __('Post content data will be fetched automatically based on the current post/loop.', 'gutenverse')
                    },
                    {
                        title: __('Inside Page/Post Editor and Inside Site Editor', 'gutenverse'),
                        description: __('It will load placeholder data.', 'gutenverse')
                    },
                ]}
            />
        </InspectorControls>
        <PanelController panelList={panelList} {...props} />
        {inheritLayout && layout && layout.contentSize && <style>
            {`.${elementId} > .post-content > * { max-width: ${layout.contentSize}; margin-left:auto; margin-right: auto; }`}
        </style>}
        <div {...blockProps}>
            <RecursionProvider uniqueId={contextPostId}>
                {contextPostId && contextPostType ? (
                    <Content
                        context={context}
                        parentLayout={parentLayout}
                        layoutClassNames={layoutClassNames}
                    />
                ) : (
                    <Placeholder layoutClassNames={layoutClassNames} />
                )}
            </RecursionProvider>
        </div>
    </>;
});

export default PostContentBlock;