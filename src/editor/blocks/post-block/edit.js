import { compose } from '@wordpress/compose';
import { useEffect, useState, useRef } from '@wordpress/element';
import { withMouseMoveEffect, withPartialRender } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import { classnames, PostSkeleton, u } from 'gutenverse-core/components';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { useAnimationEditor, useDisplayEditor } from 'gutenverse-core/hooks';
import { isOnEditor } from 'gutenverse-core/helper';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { CopyElementToolbar } from 'gutenverse-core/components';
import PostBlockContent from './PostBlockContent';
import PostBlockPagination from './PostBlockPagination';

const PostBlockBlock = compose(
    withPartialRender,
    withMouseMoveEffect
)((props) => {
    const { attributes, clientId, setAttributes } = props;
    const deviceType = getDeviceType();

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
        metaDateType,
        metaDateFormat,
        metaDateFormatCustom,
        postblockType,
        paginationMode,
        paginationLoadmoreText,
        paginationNumberPost,
        paginationPrevNextText,
        paginationPrevText,
        paginationNextText,
        paginationPrevIcon,
        paginationNextIcon,
        paginationIcon,
        paginationIconType,
        paginationIconSVG,
        paginationIconPosition,
        paginationPrevIconType,
        paginationPrevIconSVG,
        paginationNextIconType,
        paginationNextIconSVG,
        thumbnailSize
    } = attributes;

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const [postData, setPostData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const elementRef = useRef();

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);

    useEffect(() => {
        if (numberPost <= 0) {
            setAttributes({
                ...attributes,
                numberPost: 1
            });
        }
    }, [numberPost]);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            if (isOnEditor()) {
                elementId &&
                    apiFetch({
                        path: addQueryArgs(
                            '/gutenverse/v1/get-post-data',
                            {
                                context: 'edit',
                                attributes: {
                                    elementId,
                                    inheritQuery,
                                    postType,
                                    postOffset,
                                    numberPost,
                                    breakpoint,
                                    includePost,
                                    excludePost,
                                    includeCategory,
                                    excludeCategory,
                                    includeAuthor,
                                    includeTag,
                                    excludeTag,
                                    sortBy,
                                    paginationNumberPost,
                                    metaDateType,
                                    metaDateFormat,
                                    metaDateFormatCustom,
                                    editParam: {
                                        page
                                    }
                                },
                            },
                        ),
                    })
                        .then((data) => {
                            setPostData(data.posts || []);
                            setTotalPages(data.total_pages || 1);
                        })
                        .catch(() => {
                            setPostData([]);
                            setTotalPages(1);
                        });
            } else {
                // Generate dummy data for non-editor context
                const dummyPosts = [];
                for (let i = 0; i < numberPost; i++) {
                    dummyPosts.push({
                        id: i,
                        title: `Post ${i + 1}`,
                        url: 'javascript:void(0);',
                        thumbnail: {
                            url: `https://picsum.photos/400/400?random=${i + 1}`,
                            width: 400,
                            height: 400
                        },
                        excerpt: 'Lorem ipsum dolor sit amet...',
                        author_name: 'gutenverse',
                        author_url: 'javascript:void(0);',
                        date_formatted: 'January 1, 2024',
                        date_ago: '3 days ago',
                        comment_count: 0,
                        comment_url: 'javascript:void(0);',
                        primary_category: {
                            name: 'category',
                            slug: 'category',
                            url: 'javascript:void(0);'
                        }
                    });
                }
                setPostData(dummyPosts);
            }
            setLoading(false);

        }, 500);
    }, [
        elementId,
        postType,
        postOffset,
        numberPost,
        breakpoint,
        includePost,
        excludePost,
        includeCategory,
        excludeCategory,
        includeAuthor,
        includeTag,
        excludeTag,
        sortBy,
        paginationNumberPost,
        metaDateType,
        metaDateFormat,
        metaDateFormatCustom,
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
        ref: elementRef,
    });

    const postSkeletonCondition = () => {
        return column[deviceType] ? (
            <PostSkeleton number={column[deviceType]} />
        ) : (
            <PostSkeleton number={1} />
        );
    };

    const breakpointClass = 'type-1' === postblockType || 'type-4' === postblockType ? `break-point-${breakpoint}` : '';
    const postblockTypeClass = `postblock-${postblockType}`;
    const paginationClass = `guten-pagination-${paginationMode}`;

    return (
        <>
            <CopyElementToolbar {...props} />
            <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
            <div {...blockProps}>
                {!loading ? (
                    <div className={`gutenverse guten-postblock ${postblockTypeClass} ${paginationClass} ${breakpointClass} post-element ${elementId}`} data-id={elementId}>
                        <div className="guten-block-container">
                            <PostBlockContent
                                postData={postData}
                                attributes={attributes}
                                isEditor={isOnEditor()}
                            />
                        </div>
                        <PostBlockPagination
                            paginationMode={paginationMode}
                            paginationLoadmoreText={paginationLoadmoreText}
                            paginationPrevNextText={paginationPrevNextText}
                            paginationPrevText={paginationPrevText}
                            paginationNextText={paginationNextText}
                            paginationPrevIcon={paginationPrevIcon}
                            paginationPrevIconType={paginationPrevIconType}
                            paginationPrevIconSVG={paginationPrevIconSVG}
                            paginationNextIcon={paginationNextIcon}
                            paginationNextIconType={paginationNextIconType}
                            paginationNextIconSVG={paginationNextIconSVG}
                            paginationIcon={paginationIcon}
                            paginationIconType={paginationIconType}
                            paginationIconSVG={paginationIconSVG}
                            paginationIconPosition={paginationIconPosition}
                            currentPage={page}
                            totalPages={totalPages}
                            onPageChange={(newPage) => setPage(newPage)}
                        />
                    </div>
                ) : (
                    postSkeletonCondition()
                )}
            </div>
        </>
    );
});

export default PostBlockBlock;
