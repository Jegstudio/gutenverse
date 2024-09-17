import { compose } from '@wordpress/compose';
import { useEffect, useState } from '@wordpress/element';
import { withCustomStyle, withMouseMoveEffect } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { PanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { RawHTML } from '@wordpress/element';
import { PostListSkeleton, u } from 'gutenverse-core/components';
import { useRef } from '@wordpress/element';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { isOnEditor } from 'gutenverse-core/helper';

const PostListBlock = compose(
    withCustomStyle(panelList),
    withCopyElementToolbar(),
    withMouseMoveEffect
)((props) => {
    const {
        attributes,
        setElementRef
    } = props;

    const {
        elementId,
        inheritQuery,
        postType,
        postOffset,
        numberPost,
        includePost,
        excludePost,
        includeCategory,
        excludeCategory,
        includeAuthor,
        includeTag,
        excludeTag,
        sortBy,
        layout,
        imageEnabled,
        backgroundImageEnabled,
        iconEnabled,
        icon,
        metaEnabled,
        metaDateEnabled,
        metaDateType,
        metaDateFormat,
        metaDateFormatCustom,
        metaDateIcon,
        metaDateIconPosition,
        metaCategoryEnabled,
        metaCategoryIcon,
        metaPosition,
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
    const postListRef = useRef();

    useEffect(() => {
        if (postListRef.current) {
            setElementRef(postListRef.current);
        }
    }, [postListRef]);

    useEffect(() => {
        setPostLoaded(parseInt(numberPost));
    }, [numberPost]);

    useEffect(() => {
        if (postLoaded) {
            u(postListRef.current).find('.guten-block-loadmore').on('click', () => {
                setPostLoaded(postLoaded + parseInt(paginationNumberPost));
            });
            u(postListRef.current)
                .find('.btn-pagination.next:not(.disabled)')
                .on('click', () => {
                    setPage(page + 1);
                });
            u(postListRef.current)
                .find('.btn-pagination.prev:not(.disabled)')
                .on('click', () => {
                    setPage(page - 1);
                });
            u(postListRef.current)
                .find('.btn-pagination')
                .each((el) => {
                    const page = el.getAttribute('data-page');
                    if (page) {
                        u(el).on('click', () => {
                            setPage(parseInt(page, 10));
                        });
                    }
                });
        }
    }, [response]);

    useEffect(() => {
        if (isOnEditor()) {
            setLoading(true);

            elementId && apiFetch({
                path: addQueryArgs('/wp/v2/block-renderer/gutenverse/post-list', {
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
                        includePost,
                        excludePost,
                        includeCategory,
                        excludeCategory,
                        includeAuthor,
                        includeTag,
                        excludeTag,
                        sortBy,
                        imageEnabled,
                        backgroundImageEnabled,
                        iconEnabled,
                        icon,
                        metaEnabled,
                        metaDateEnabled,
                        metaDateType,
                        metaDateFormat,
                        metaDateFormatCustom,
                        metaDateIcon,
                        metaDateIconPosition,
                        metaCategoryEnabled,
                        metaCategoryIcon,
                        metaPosition,
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
                }),
            }).then((data) => {
                setResponse(data.rendered);
            }).catch(() => {
                setResponse('<span>Error</span>');
            }).finally(() => setLoading(false));
        } else {
            let articles = '';
            for (let i = 0; i < numberPost; i++) {
                articles += `<article class="guten-post post-list-item">
                            <a href="javascript:void(0);">
                                <div class="guten-postlist-content"><span class="guten-postlist-title">Post ${i}</span></div>
                            </a>
                        </article>`;
            }
            setResponse(`<div class="gutenverse guten-postlist layout-vertical post-element guten-pagination-disable ${elementId}"
                data-id="${elementId}"></div>
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
        includePost,
        excludePost,
        includeCategory,
        excludeCategory,
        includeAuthor,
        includeTag,
        excludeTag,
        sortBy,
        imageEnabled,
        backgroundImageEnabled,
        iconEnabled,
        icon,
        metaEnabled,
        metaDateEnabled,
        metaDateType,
        metaDateFormat,
        metaDateFormatCustom,
        metaDateIcon,
        metaDateIconPosition,
        metaCategoryEnabled,
        metaCategoryIcon,
        metaPosition,
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
            'guten-post-list',
            'no-margin',
            elementId,
            animationClass,
            displayClass,
            [`layout-${layout}`],
        ),
        ref: postListRef
    });

    return <>
        <PanelController panelList={panelList} {...props} />
        <div  {...blockProps}>
            {!loading ? <RawHTML key="html" className="guten-raw-wrapper">
                {response}
            </RawHTML> : <PostListSkeleton />}
        </div>
    </>;
});

export default PostListBlock;