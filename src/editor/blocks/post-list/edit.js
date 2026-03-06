import { compose } from '@wordpress/compose';
import { useEffect, useState } from '@wordpress/element';
import { withMouseMoveEffect, withPartialRender } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import { classnames, PostListSkeleton, u } from 'gutenverse-core/components';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { useRef } from '@wordpress/element';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { isOnEditor, dummyText } from 'gutenverse-core/helper';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';
import { CopyElementToolbar } from 'gutenverse-core/components';
import PostListContent from './PostListContent';
import PostBlockPagination from '../post-block/PostBlockPagination';

const PostListBlock = compose(
    withPartialRender,
    withMouseMoveEffect
)((props) => {
    const {
        attributes,
        clientId,
        setAttributes
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
        paginationIconType,
        paginationIconSVG,
        paginationIconPosition,
        paginationPrevNextText,
        paginationPrevText,
        paginationNextText,
        paginationPrevIcon,
        paginationPrevIconType,
        paginationPrevIconSVG,
        paginationNextIcon,
        paginationNextIconType,
        paginationNextIconSVG,
        breakpoint
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
                        title: dummyText(5, 10),
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
            'guten-post-list',
            'no-margin',
            elementId,
            animationClass,
            displayClass,
            [`layout-${layout}`],
        ),
        ref: elementRef
    });

    const paginationClass = `guten-pagination-${paginationMode}`;

    return <>
        <CopyElementToolbar {...props}/>
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
        <div  {...blockProps}>
            {!loading ? (
                <div className={`gutenverse guten-postlist layout-${layout} ${paginationClass} post-element ${elementId}`} data-id={elementId}>
                    <div className="guten-block-container">
                        <PostListContent
                            postData={postData}
                            attributes={attributes}
                        />
                    </div>
                    <PostBlockPagination
                        paginationMode={paginationMode}
                        paginationLoadmoreText={paginationLoadmoreText}
                        paginationPrevNextText={paginationPrevNextText}
                        paginationPrevText={paginationPrevText}
                        paginationNextText={paginationNextText}
                        paginationPrevIcon={paginationPrevIcon}
                        paginationNextIcon={paginationNextIcon}
                        paginationIcon={paginationIcon}
                        paginationIconType={paginationIconType}
                        paginationIconSVG={paginationIconSVG}
                        paginationIconPosition={paginationIconPosition}
                        paginationPrevIconType={paginationPrevIconType}
                        paginationPrevIconSVG={paginationPrevIconSVG}
                        paginationNextIconType={paginationNextIconType}
                        paginationNextIconSVG={paginationNextIconSVG}
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={(newPage) => setPage(newPage)}
                    />
                </div>
            ) : (
                <PostListSkeleton />
            )}
        </div>
    </>;
});

export default PostListBlock;