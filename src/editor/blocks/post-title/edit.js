import { compose } from '@wordpress/compose';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useEntityProp } from '@wordpress/core-data';
import { useRef } from '@wordpress/element';
import { withPartialRender } from 'gutenverse-core/hoc';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { PanelTutorial } from 'gutenverse-core/controls';
import { __ } from '@wordpress/i18n';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';
import { CopyElementToolbar } from 'gutenverse-core/components';
import { parseUnicode } from 'gutenverse-core/helper';

const PostTitleBlock = compose(
    withPartialRender
)((props) => {
    const {
        attributes,
        clientId,
        context: { postId, postType }
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
    const elementRef = useRef();
    const linkTarget = postLinkTarget ? '_blank' : '_self';

    const [ postTitle = 'Post Title' ] = useEntityProp('postType', postType, 'title', postId);
    const [ link ] = useEntityProp( 'postType', postType, 'link', postId );

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-post-title',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: elementRef
    });

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);

    return <>
        <CopyElementToolbar {...props}/>
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
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
        <div  {...blockProps}>
            <HtmlTag>{postLink ? <a href={link} target={linkTarget} rel={postLinkRel} onClick={e => e.preventDefault()}>{parseUnicode(postTitle)}</a> : parseUnicode(postTitle)}</HtmlTag>
        </div>
    </>;
});

export default PostTitleBlock;