import { compose } from '@wordpress/compose';
import { useEffect, useState } from '@wordpress/element';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { store as coreStore } from '@wordpress/core-data';
import { store as editorStore } from '@wordpress/editor';
import { useSelect } from '@wordpress/data';
import { useRef } from '@wordpress/element';
import { withPartialRender } from 'gutenverse-core/hoc';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { __ } from '@wordpress/i18n';
import { PanelTutorial } from 'gutenverse-core/controls';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';
import { CopyElementToolbar } from 'gutenverse-core/components';
import { isNotEmpty } from 'gutenverse-core/helper';

const PostAuthorBlock = compose(
    withPartialRender
)((props) => {
    const {
        attributes,
        clientId,
        context: { postId, postType }
    } = props;

    const {
        elementId,
        authorType,
        htmlTag: HtmlTag,
        authorAvatar,
        authorLink,
        authorLinkTarget,
        authorLinkRel,
        authorBio,
    } = attributes;

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const elementRef = useRef();
    const linkTarget = authorLinkTarget ? '_blank' : '_self';
    const [authorName, setAuthorName] = useState('Post Author');
    const [authorDescription, setAuthorDescription] = useState('Hi, I’m the author. This is just my dummy biography.');

    const authorDetails = useSelect(
        (select) => {
            const { getEditedEntityRecord, getUser, getCurrentUser } = select(coreStore);
            const { getCurrentPostType } = select(editorStore);

            if (getCurrentPostType() === 'post') {
                const _authorId = getEditedEntityRecord(
                    'postType',
                    postType,
                    postId
                )?.author;

                return _authorId ? getUser(_authorId) : null;
            } else {
                return getCurrentUser();
            }
        },
        [postType, postId]
    );

    useEffect(() => {
        if (!isNotEmpty(authorDetails)) {
            return;
        }
        switch (authorType) {
            case 'first_name':
                setAuthorName(authorDetails['first_name']);
                break;
            case 'last_name':
                setAuthorName(authorDetails['last_name']);
                break;
            case 'first_last':
                setAuthorName(`${authorDetails['first_name']} ${authorDetails['last_name']}`);
                break;
            case 'last_first':
                setAuthorName(`${authorDetails['last_name']} ${authorDetails['first_name']}`);
                break;
            case 'nick_name':
                setAuthorName(authorDetails['nickname']);
                break;
            case 'display_name':
                setAuthorName(authorDetails['name']);
                break;
            case 'user_name':
                setAuthorName(authorDetails['username']);
                break;
            case 'none':
                setAuthorName('');
                break;
            default:
                break;
        }
        if (authorBio) {
            setAuthorDescription(authorDetails['description']);
        }
    }, [authorType, authorDetails, authorBio]);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-post-author',
            'no-margin',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: elementRef
    });

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, { ...attributes, inBlock: false }, getBlockStyle, elementRef);

    return <>
        <CopyElementToolbar {...props} />
        <InspectorControls>
            <PanelTutorial
                title={__('How Post Author works?', 'gutenverse')}
                list={[
                    {
                        title: __('Inside Page Editor, Query Loop Block, and on Frontend', 'gutenverse'),
                        description: __('Author data will be fetched automatically based on the current post/loop.', 'gutenverse')
                    },
                    {
                        title: __('Inside Site Editor', 'gutenverse'),
                        description: __('It will load placeholder data.', 'gutenverse')
                    },
                ]}
            />
        </InspectorControls>
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
        <div {...blockProps}>
            {isNotEmpty(authorDetails) && authorAvatar && (
                <img
                    className="avatar photo"
                    width="48"
                    src={authorDetails['avatar_urls']['48']}
                    alt={authorDetails['name']}
                />
            )}
            <div className="right-content">
                <HtmlTag className="author-name">
                    {isNotEmpty(authorDetails) && authorLink ? (
                        <a href={authorDetails['link']} target={linkTarget} rel={authorLinkRel} onClick={e => e.preventDefault()}>
                            {authorName}
                        </a>
                    ) : (
                        authorName
                    )}
                </HtmlTag>
                {isNotEmpty(authorDetails) && authorBio && (
                    <span className="author-bio">{authorDescription}</span>
                )}
            </div>
        </div>

    </>;
});

export default PostAuthorBlock;