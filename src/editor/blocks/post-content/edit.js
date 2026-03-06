import { compose } from '@wordpress/compose';
import { createPortal, useEffect, useMemo, useState } from '@wordpress/element';
import { withPartialRender } from 'gutenverse-core/hoc';
import { classnames, Notice } from 'gutenverse-core/components';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useRef } from '@wordpress/element';
import { useAnimationEditor, useFallbackFunction } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import {
    InspectorControls,
    RecursionProvider as RecursionProviderNew,
    useBlockProps,
    useHasRecursion,
    Warning,
    __experimentalUseBlockPreview as useBlockPreview,
    __experimentalRecursionProvider as RecursionProviderOld,
    store as blockEditorStore
} from '@wordpress/block-editor';
import { select, useDispatch, useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { PanelTutorial } from 'gutenverse-core/controls';
import { isNotEmpty, useSettingFallback, versionCompare } from 'gutenverse-core/helper';
import { useEntityProp, store as coreStore } from '@wordpress/core-data';
import { store as editorStore } from '@wordpress/editor';
import { parse } from '@wordpress/blocks';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';
import { CopyElementToolbar } from 'gutenverse-core/components';


const Placeholder = () => {
    return <div className="post-content">
        <p>{__('This will be your post\'s content block, it will display all the blocks in any single post or page.', 'gutenverse')}</p>
        <p>{__('That might be a simple arrangement like consecutive paragraphs in a blog post, or a more elaborate composition that includes image galleries, videos, tables, columns, and any other block types.', 'gutenverse')}</p>
    </div>;
};

const EditNotice = ({ setEditorWarn }) => {
    const { setRenderingMode } = useDispatch(editorStore);

    const editContent = () => {
        setEditorWarn(false);
        setRenderingMode('post-only');
    };

    const cancelEdit = () => {
        setEditorWarn(false);
    };

    return <Notice
        icon={<svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M5.83268 5.83464C5.83268 3.53297 7.69768 1.66797 9.99935 1.66797C12.301 1.66797 14.166 3.53297 14.166 5.83464V8.33464H14.4993C15.2327 8.33464 15.8327 8.93464 15.8327 9.66797V15.5013C15.8327 16.6013 14.9327 17.5013 13.8327 17.5013H6.16602C5.06602 17.5013 4.16602 16.6013 4.16602 15.5013V9.66797C4.16602 8.93464 4.76602 8.33464 5.49935 8.33464H5.83268V5.83464ZM12.4993 5.83464V8.33464H7.49935V5.83464C7.49935 4.45297 8.61768 3.33464 9.99935 3.33464C11.381 3.33464 12.4993 4.45297 12.4993 5.83464ZM9.99935 10.2096C9.66796 10.2093 9.34634 10.3218 9.08746 10.5287C8.82858 10.7356 8.64787 11.0244 8.5751 11.3477C8.50232 11.671 8.54183 12.0095 8.68711 12.3073C8.83239 12.6051 9.07478 12.8446 9.37435 12.9863V15.0013C9.37435 15.1671 9.4402 15.326 9.55741 15.4432C9.67462 15.5605 9.83359 15.6263 9.99935 15.6263C10.1651 15.6263 10.3241 15.5605 10.4413 15.4432C10.5585 15.326 10.6243 15.1671 10.6243 15.0013V12.9863C10.9239 12.8446 11.1663 12.6051 11.3116 12.3073C11.4569 12.0095 11.4964 11.671 11.4236 11.3477C11.3508 11.0244 11.1701 10.7356 10.9112 10.5287C10.6524 10.3218 10.3307 10.2093 9.99935 10.2096Z" fill="#FFB200" />
        </svg>}
        title={__('Gutenverse Post Content is Locked', '--gctd--')}
        description={__('On "Show Template" mode, the post content cannot be edited. Please switch to Content Editing mode to edit the content.', '--gctd--')}
        buttonText={__('Switch Mode', '--gctd--')}
        onClick={editContent}
        onClose={cancelEdit}
    />;
};

const ReadOnlyContent = ({
    userCanEdit,
    layoutClassNames,
    parentLayout,
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
    const { context: { postType, postId } = {}, layoutClassNames } =
        props;

    const userCanEdit = useSelect(
        (select) =>
            select(coreStore).canUser('update', {
                kind: 'postType',
                name: postType,
                id: postId,
            }),
        [postType, postId]
    );

    if (userCanEdit === undefined) {
        return null;
    }

    return <ReadOnlyContent
        parentLayout={props.parentLayout}
        layoutClassNames={layoutClassNames}
        userCanEdit={userCanEdit}
        postType={postType}
        postId={postId}
    />;
};

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

const PostContentBlock = compose(
    withPartialRender
)((props) => {
    const {
        clientId,
        attributes,
        context,
        __unstableLayoutClassNames: layoutClassNames,
        __unstableParentLayout: parentLayout,
    } = props;
    const [editorWarn, setEditorWarn] = useState(false);
    const { wordpressVersion } = window['GutenverseConfig'];
    const { setBlockEditingMode, unsetBlockEditingMode } = useDispatch(blockEditorStore);

    useEffect(() => {
        if (versionCompare(wordpressVersion, '6.7.0', '>')) {
            const renderingMode = select(editorStore).getRenderingMode();
            if (renderingMode === 'template-locked') {
                setBlockEditingMode(clientId, 'contentOnly');
            }
        }

        return () => {
            unsetBlockEditingMode(clientId);
        };

    }, [clientId, setBlockEditingMode, unsetBlockEditingMode]);

    const {
        elementId,
        inheritLayout,
        inheritDefaultStyle
    } = attributes;

    const isRecursive = (clientId) => {
        const parents = select('core/block-editor').getBlockParents(clientId);
        return parents.includes(clientId);
    };

    const { postId: contextPostId, postType: contextPostType } = context;
    const hasAlreadyRendered = useFallbackFunction(
        useHasRecursion,
        isRecursive,
        [contextPostId],
        [clientId]
    );

    if (contextPostId && contextPostType && hasAlreadyRendered) {
        return <RecursionError />;
    }

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const elementRef = useRef();
    const layout = useSettingFallback('layout');
    const RecursionProvider = isNotEmpty(RecursionProviderNew)? RecursionProviderNew : RecursionProviderOld;

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-post-content',
            elementId,
            animationClass,
            displayClass,
            'is-layout-constrained entry-content'
        ),
        ref: elementRef,
        onClick: () => {
            const renderingMode = select(editorStore).getRenderingMode();
            if (renderingMode === 'template-locked') {
                setEditorWarn(true);
            }
        },
    });

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);

    return <>
        <CopyElementToolbar {...props} />
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
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
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
        {editorWarn && createPortal(<EditNotice setEditorWarn={setEditorWarn} />, document.getElementById('gutenverse-root'))}
    </>;
});

export default PostContentBlock;