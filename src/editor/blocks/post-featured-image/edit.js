import { compose } from '@wordpress/compose';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useEntityProp, store as coreStore } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import { useRef, useEffect, useState } from '@wordpress/element';
import { withPartialRender } from 'gutenverse-core/hoc';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { imagePlaceholder } from 'gutenverse-core/config';
import { __ } from '@wordpress/i18n';
import { PanelTutorial } from 'gutenverse-core/controls';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';
import { CopyElementToolbar } from 'gutenverse-core/components';

const { gvnewsEssentials = false } = window['GutenverseConfig'] || {};

const PostFeaturedImageBlock = compose(
    withPartialRender
)((props) => {
    const {
        attributes,
        clientId,
        context: { postId, postType }
    } = props;

    const {
        elementId,
        gutenversePreviewBlock = '',
    } = attributes;

    useEffect(() => {
        /* Only change the block preview if gvnewsEssentials is true and not on Post Loop */
        if (!gvnewsEssentials || postId) {
            return;
        }
        if (gutenversePreviewBlock === 'featuredGallery') {
            setBlock(<GalleryContent attributes={attributes} />);
        } else {
            setBlock(<StandardFormat attributes={attributes} postId={postId} postType={postType} />);
        }

    }, [gutenversePreviewBlock]);

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const elementRef = useRef();


    const [block, setBlock] = useState(<StandardFormat attributes={attributes} postId={postId} postType={postType} />);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-post-featured-image',
            'no-margin',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: elementRef
    });



    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);

    return <>
        <CopyElementToolbar {...props} />
        <InspectorControls>
            <PanelTutorial
                title={__('How Post Featured Image works?', 'gutenverse')}
                list={[
                    {
                        title: __('Inside Page Editor, Query Loop Block, and on Frontend', 'gutenverse'),
                        description: __('Image data will be fetched automatically based on the current post/loop.', 'gutenverse')
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
            {block}
        </div>
    </>;
});

const StandardFormat = ({ attributes, postId, postType }) => {

    const {
        postLink,
        placeholderImg,
        imageSize,
    } = attributes;

    const [featuredImage] = useEntityProp('postType', postType, 'featured_media', postId);
    const [link] = useEntityProp('postType', postType, 'link', postId);

    const { media } = useSelect(
        (select) => {
            const { getMedia, getPostType } = select(coreStore);
            return {
                media:
                    featuredImage &&
                    getMedia(featuredImage, {
                        context: 'view',
                    }),
                postType: postType && getPostType(postType),
            };
        },
        [featuredImage, postType]
    );
    const mediaUrl = media?.media_details?.sizes?.[imageSize.value]?.source_url;

    let content = mediaUrl ? <img src={mediaUrl} /> : placeholderImg ? <img src={imagePlaceholder} /> : __('Post Featured Image', 'gutenverse');

    content = postLink && link ? <a href={link} onClick={e => e.preventDefault()}>{content}</a> : content;

    return <>{content}</>;
}

const GalleryContent = ({ attributes }) => {
    const galleryRef = useRef();

    useEffect(() => {
        if (window.gvnewsFeaturedGallery) {
            window.gvnewsFeaturedGallery(galleryRef.current);
        }
    }, []);

    return (
        <div className="gvnews_featured featured-gallery gvnews_owlslider">
            <div className="featured_gallery" ref={galleryRef}>
                {[...Array(5)].map((_, i) => (
                    <a key={i}>
                        <div className="gallery-item">
                            <img src={imagePlaceholder} />
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}


export default PostFeaturedImageBlock;