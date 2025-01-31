import { compose } from '@wordpress/compose';
import { useEffect } from '@wordpress/element';
import { withCustomStyle, withPartialRender } from 'gutenverse-core/hoc';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { PanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useEntityProp } from '@wordpress/core-data';
import { useRef } from '@wordpress/element';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { PanelTutorial } from 'gutenverse-core/controls';
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import { dispatch } from '@wordpress/data';

const PostTitleBlock = compose(
    withPartialRender,
    withCustomStyle(panelList),
    withCopyElementToolbar()
)((props) => {
    const {
        attributes,
        setElementRef,
        context: { postId, postType },
    } = props;

    const {
        elementId,
        postLink,
        postLinkTarget,
        postLinkRel = 'noreferrer',
        htmlTag: HtmlTag,
    } = attributes;

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const postTitleRef = useRef();
    const linkTarget = postLinkTarget ? '_blank' : '_self';

    const [postTitle = 'Post Title'] = useEntityProp('postType', postType, 'title', postId);
    const [link] = useEntityProp('postType', postType, 'link', postId);

    useEffect(() => {
        postTitleRef.current && setElementRef(postTitleRef.current);
    }, [postTitleRef]);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-post-title',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: postTitleRef
    });

    return <>
        <InspectorControls>
            <PanelTutorial
                title={__('How Post Title works?', 'gutenverse')}
                list={[
                    {
                        title: __('Inside Page Editor, Query Loop Block, and on Frontend', 'gutenverse'),
                        description: __('Title data will be fetched automatically based on the current post/loop.', 'gutenverse')
                    },
                    {
                        title: __('Inside Site Editor', 'gutenverse'),
                        description: __('It will load placeholder data.', 'gutenverse')
                    },
                ]}
            />
        </InspectorControls>
        <PanelController panelList={panelList} {...props} />
        <div  {...blockProps}>
            <HtmlTag>{postLink ? <a href={link} target={linkTarget} rel={postLinkRel} onClick={e => e.preventDefault()}>
                <RichText
                    tagName={'span'}
                    value={postTitle}
                    placeholder={'Add Title'}
                    onChange={(text) => dispatch('core/editor').editPost({ title: text })}
                    multiline={false}
                    withoutInteractiveFormatting
                    identifier="text"
                    allowedFormats={['core/link']}
                />
            </a> :
                <RichText
                    tagName={'span'}
                    value={postTitle}
                    placeholder={'Add Title'}
                    onChange={(text) => dispatch('core/editor').editPost({ title: text })}
                    multiline={false}
                    withoutInteractiveFormatting
                    identifier="text"
                    allowedFormats={['core/link']}
                />
            }</HtmlTag>
        </div>
    </>;
});

export default PostTitleBlock;