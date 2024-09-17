import { compose } from '@wordpress/compose';
import { useEffect, useState, useRef, RawHTML } from '@wordpress/element';
import {
    withCustomStyle,
    withMouseMoveEffect,
    withCopyElementToolbar,
} from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import { classnames, PostSkeleton, u } from 'gutenverse-core/components';
import { PanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { useAnimationEditor, useDisplayEditor } from 'gutenverse-core/hooks';
import { isOnEditor } from 'gutenverse-core/helper';

const PostBlockBlock = compose(
    withCustomStyle(panelList),
    withCopyElementToolbar(),
    withMouseMoveEffect,
)((props) => {
    const { attributes, deviceType, setElementRef } = props;

    const {
        elementId,
        inheritQuery,
        postType,
        postOffset,
        numberPost,
        column,
        breakpoint,
        includePost,
        excludePost,
        includeCategory,
        excludeCategory,
        includeAuthor,
        includeTag,
        excludeTag,
        sortBy,
        htmlTag,
        categoryEnabled,
        categoryPosition,
        excerptEnabled,
        excerptLength,
        excerptMore,
        readmoreEnabled,
        readmoreIcon,
        readmoreIconPosition,
        readmoreText,
        commentEnabled,
        commentIcon,
        commentIconPosition,
        metaEnabled,
        metaAuthorEnabled,
        metaAuthorByText,
        metaAuthorIcon,
        metaAuthorIconPosition,
        metaDateEnabled,
        metaDateType,
        metaDateFormat,
        metaDateFormatCustom,
        metaDateIcon,
        metaDateIconPosition,
        postblockType,
        paginationMode,
        paginationLoadmoreText,
        paginationLoadingText,
        paginationNumberPost,
        paginationScrollLimit,
        paginationIcon,
        paginationIconPosition,
        paginationPrevNextText,
        paginationPrevText,
        paginationNextText,
        paginationPrevIcon,
        paginationNextIcon,
    } = attributes;

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [postLoaded, setPostLoaded] = useState(0);
    const [page, setPage] = useState(1);
    const postBlockRef = useRef();

    useEffect(() => {
        if (postBlockRef.current) {
            setElementRef(postBlockRef.current);
        }
    }, [postBlockRef]);

    useEffect(() => {
        setPostLoaded(parseInt(numberPost));
    }, [numberPost]);

    useEffect(() => {
        if (postLoaded) {
            u(postBlockRef.current)
                .find('.guten-block-loadmore')
                .on('click', () => {
                    setPostLoaded(postLoaded + parseInt(paginationNumberPost));
                });
            u(postBlockRef.current)
                .find('.btn-pagination.next:not(.disabled)')
                .on('click', () => {
                    setPage(page + 1);
                });
            u(postBlockRef.current)
                .find('.btn-pagination.prev:not(.disabled)')
                .on('click', () => {
                    setPage(page - 1);
                });
            u(postBlockRef.current)
                .find('.btn-pagination')
                .each((el) => {
                    const page = el.getAttribute('data-page');
                    if (page) {
                        u(el).on('click', () => {
                            setPage(parseInt(page, 10)); // Convert the page number to an integer and set the page
                        });
                    }
                });
        }
    }, [response]);

    useEffect(() => {
        if (isOnEditor()) {
            setLoading(true);
            elementId &&
                apiFetch({
                    path: addQueryArgs(
                        '/wp/v2/block-renderer/gutenverse/post-block',
                        {
                            context: 'edit',
                            attributes: {
                                elementId,
                                inheritQuery,
                                postType,
                                postOffset,
                                numberPost: ('prevnext' === paginationMode || 'number' === paginationMode) ? numberPost :
                                    parseInt(postLoaded) === parseInt(numberPost)
                                        ? numberPost
                                        : postLoaded,
                                breakpoint,
                                includePost,
                                excludePost,
                                includeCategory,
                                excludeCategory,
                                includeAuthor,
                                includeTag,
                                excludeTag,
                                sortBy,
                                htmlTag,
                                categoryEnabled,
                                categoryPosition,
                                excerptEnabled,
                                excerptLength,
                                excerptMore,
                                readmoreEnabled,
                                readmoreIcon,
                                readmoreIconPosition,
                                readmoreText,
                                commentEnabled,
                                commentIcon,
                                commentIconPosition,
                                metaEnabled,
                                metaAuthorEnabled,
                                metaAuthorByText,
                                metaAuthorIcon,
                                metaAuthorIconPosition,
                                metaDateEnabled,
                                metaDateType,
                                metaDateFormat,
                                metaDateFormatCustom,
                                metaDateIcon,
                                metaDateIconPosition,
                                postblockType,
                                paginationMode,
                                paginationLoadmoreText,
                                paginationLoadingText,
                                paginationNumberPost: ('prevnext' === paginationMode || 'number' === paginationMode) ? numberPost : paginationNumberPost,
                                paginationScrollLimit,
                                paginationIcon,
                                paginationIconPosition,
                                paginationPrevNextText,
                                paginationPrevText,
                                paginationNextText,
                                paginationPrevIcon,
                                paginationNextIcon,
                                editParam: {
                                    page
                                }
                            },
                        },
                    ),
                })
                    .then((data) => {
                        setResponse(data.rendered);
                    })
                    .catch(() => {
                        setResponse('<span>Error</span>');
                    })
                    .finally(() => setLoading(false));
        } else {
            const { imgDir } = window.GutenverseConfig || {};
            let articles = '';
            for (let i = 0; i < numberPost; i++) {
                articles += `<article
                                class="guten-post post-${i} post type-post status-publish format-standard has-post-thumbnail hentry category-category tag-tag">
                                <div class="guten-thumb"><a href="javascript:void(0);">
                                        <div class="thumbnail-container ">
                                            <img loading="eager" width="400" height="400"
                                                src="${imgDir}/img-placeholder.jpg"
                                                class="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt=""
                                                decoding="async" loading="lazy"
                                                sizes="(max-width: 400px) 100vw, 400px" />
                                            <div class="guten-overlay"></div>
                                        </div>
                                    </a></div>
                                <div class="guten-postblock-content">
                                    <div class="guten-post-category "><span><a href="javascript:void(0);"
                                                class="category-category">category</a></span></div>
                                    <h3 class="guten-post-title"><a href="javascript:void(0);">Post Title ${i + 1}</a>
                                    </h3>
                                    <div class="guten-post-meta">
                                        <div class="guten-meta-author icon-position-before"><i aria-hidden="true"
                                                class="fas fa-user"></i><span class="by">by</span> <a href="javascript:void(0);">gutenverse</a></div>
                                        <div class="guten-meta-date icon-position-before"><i aria-hidden="true"
                                                class="fas fa-clock"></i>January 1, 2024</div>
                                    </div>
                                    <div class="guten-post-excerpt">
                                        <p>Post Excerpt ${i + 1}...</p>
                                    </div>
                                    <div class="guten-post-meta-bottom">
                                        <div class="guten-meta-readmore icon-position-after">
                                            <a href="javascript:void(0);"
                                                class="guten-readmore">Read More<i aria-hidden="true"
                                                    class="fas fa-arrow-right"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </article>`;
            }
            setResponse(`<div class="gutenverse guten-postblock postblock-${postblockType} guten-pagination-prevnext break-point-tablet post-element ${elementId}"
                data-id="${elementId}">
                <div class="guten-block-container">
                    <div class="guten-posts guten-ajax-flag">
                        ${articles}
                    </div>
                </div>
            </div>`);
            setLoading(false);
        }

    }, [
        elementId,
        postType,
        postOffset,
        postLoaded,
        breakpoint,
        includePost,
        excludePost,
        includeCategory,
        excludeCategory,
        includeAuthor,
        includeTag,
        excludeTag,
        sortBy,
        htmlTag,
        categoryEnabled,
        categoryPosition,
        excerptEnabled,
        excerptLength,
        excerptMore,
        readmoreEnabled,
        readmoreIcon,
        readmoreIconPosition,
        readmoreText,
        commentEnabled,
        commentIcon,
        commentIconPosition,
        metaEnabled,
        metaAuthorEnabled,
        metaAuthorByText,
        metaAuthorIcon,
        metaAuthorIconPosition,
        metaDateEnabled,
        metaDateType,
        metaDateFormat,
        metaDateFormatCustom,
        metaDateIcon,
        metaDateIconPosition,
        postblockType,
        paginationMode,
        paginationLoadmoreText,
        paginationLoadingText,
        paginationNumberPost,
        paginationScrollLimit,
        paginationIcon,
        paginationIconPosition,
        paginationPrevNextText,
        paginationPrevText,
        paginationNextText,
        paginationPrevIcon,
        paginationNextIcon,
        page
    ]);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-post-block',
            'no-margin',
            elementId,
            animationClass,
            displayClass,
            deviceType.toLowerCase(),
        ),
        ref: postBlockRef,
    });

    const postSkeletonCondition = () => {
        return column[deviceType] ? (
            <PostSkeleton number={column[deviceType]} />
        ) : (
            <PostSkeleton number={1} />
        );
    };

    return (
        <>
            <PanelController panelList={panelList} {...props} />
            <div {...blockProps}>
                {!loading ? (
                    <RawHTML key="html" className="guten-raw-wrapper">
                        {response}
                    </RawHTML>
                ) : (
                    postSkeletonCondition()
                )}
            </div>
        </>
    );
});

export default PostBlockBlock;
