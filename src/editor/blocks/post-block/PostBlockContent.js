import { Fragment } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { useEntityProp, store as coreStore } from '@wordpress/core-data';
import { parseUnicode, renderIcon, dummyText } from 'gutenverse-core/helper';

const PostBlockContent = (props) => {
    const {
        postData = [],
        attributes
    } = props;

    const {
        htmlTag = 'h3',
        categoryEnabled,
        categoryPosition,
        excerptEnabled,
        excerptLength = 20,
        excerptMore,
        readmoreEnabled,
        readmoreIcon,
        readmoreIconType,
        readmoreIconSVG,
        readmoreIconPosition,
        readmoreText,
        commentEnabled,
        commentIcon,
        commentIconType,
        commentIconSVG,
        commentIconPosition,
        metaEnabled,
        metaAuthorEnabled,
        metaAuthorByText,
        metaAuthorIcon,
        metaAuthorIconType,
        metaAuthorIconSVG,
        metaAuthorIconPosition,
        metaDateEnabled,
        metaDateIcon,
        metaDateIconType,
        metaDateIconSVG,
        metaDateIconPosition,
        postblockType,
        contentOrder = [],
        thumbnailSize,
        postType
    } = attributes;

    const formatDate = (post) => {
        if (!post) return '';
        return post.date || '';
    };

    const trimWords = (text, wordCount) => {
        if (!text) return '';
        const words = text.split(/\s+/);
        if (words.length <= wordCount) return text;
        return words.slice(0, wordCount).join(' ');
    };

    const renderMeta = (post) => {
        if (!metaEnabled) return null;

        return (
            <div className="guten-post-meta">
                {metaAuthorEnabled && (
                    <div className={`guten-meta-author icon-position-${metaAuthorIconPosition}`}>
                        {metaAuthorIconPosition === 'before' && renderIcon(metaAuthorIcon, metaAuthorIconType, metaAuthorIconSVG)}
                        <span className="by">{metaAuthorByText}</span>{' '}
                        <a href="#">
                            {post?.author_name || 'gutenverse'}
                        </a>
                        {metaAuthorIconPosition === 'after' && renderIcon(metaAuthorIcon, metaAuthorIconType, metaAuthorIconSVG)}
                    </div>
                )}
                {metaDateEnabled && (
                    <div className={`guten-meta-date icon-position-${metaDateIconPosition}`}>
                        {metaDateIconPosition === 'before' && renderIcon(metaDateIcon, metaDateIconType, metaDateIconSVG)}
                        {formatDate(post)}
                        {metaDateIconPosition === 'after' && renderIcon(metaDateIcon, metaDateIconType, metaDateIconSVG)}
                    </div>
                )}
            </div>
        );
    };

    const renderExcerpt = (post) => {
        if (!excerptEnabled) return null;

        const fullExcerpt = parseUnicode(post?.excerpt) || dummyText(10, 20);
        const trimmedExcerpt = excerptLength > 0 ? trimWords(fullExcerpt, excerptLength) : fullExcerpt;
        const more = excerptMore || '...';

        return (
            <div className="guten-post-excerpt">
                <p>{trimmedExcerpt}{more}</p>
            </div>
        );
    };

    const renderMetaBottom = (post) => {
        if (!readmoreEnabled && !commentEnabled) return null;

        return (
            <div className="guten-post-meta-bottom">
                {readmoreEnabled && (
                    <div className={`guten-meta-readmore icon-position-${readmoreIconPosition}`}>
                        <a href="#" aria-label={`Read more about ${parseUnicode(post?.title)}`} className="guten-readmore">
                            {readmoreIconPosition === 'before' && renderIcon(readmoreIcon, readmoreIconType, readmoreIconSVG)}
                            {readmoreText}
                            {readmoreIconPosition === 'after' && renderIcon(readmoreIcon, readmoreIconType, readmoreIconSVG)}
                        </a>
                    </div>
                )}
                {commentEnabled && (
                    <div className={`guten-meta-comment icon-position-${commentIconPosition}`}>
                        <a href="#" data-href={post?.comment_url || 'dummy-data'}>
                            {commentIconPosition === 'before' && (
                                <>
                                    {renderIcon(commentIcon, commentIconType, commentIconSVG)}
                                    <span>{post?.comment_count || 0}</span>
                                </>
                            )}
                            {commentIconPosition === 'after' && (
                                <>
                                    <span>{post?.comment_count || 0}</span>
                                    {renderIcon(commentIcon, commentIconType, commentIconSVG)}
                                </>
                            )}
                        </a>
                    </div>
                )}
            </div>
        );
    };

    const renderCategory = (post) => {
        if (!categoryEnabled) return null;

        const position = postblockType === 'type-3' ? `position-${categoryPosition}` : '';
        const category = post?.primary_category || { name: 'category', slug: 'category', url: '#' };

        return (
            <div className={`guten-post-category ${position}`}>
                <span>
                    <a href="#" className={`category-${category.slug}`}>
                        {category.name}
                    </a>
                </span>
            </div>
        );
    };

    const renderContent = (post) => {
        let content = [];

        contentOrder.forEach((order, index) => {
            if (order.value === 'title') {
                const HtmlTag = htmlTag;
                content.push(
                    <HtmlTag key={`title-${index}`} className="guten-post-title">
                        <a aria-label={parseUnicode(post?.title)} href="#">
                            {parseUnicode(post?.title) || dummyText(5, 10)}
                        </a>
                    </HtmlTag>
                );
            }

            if (order.value === 'meta') {
                content.push(
                    <Fragment key={`meta-${index}`}>
                        {renderMeta(post)}
                    </Fragment>
                );
            }

            if (order.value === 'excerpt') {
                content.push(
                    <Fragment key={`excerpt-${index}`}>
                        {renderExcerpt(post)}
                    </Fragment>
                );
            }

            if (order.value === 'read') {
                content.push(
                    <Fragment key={`read-${index}`}>
                        {renderMetaBottom(post)}
                    </Fragment>
                );
            }
        });

        return content;
    };


    const renderPost = (post, index) => {
        const postClasses = post?.classes || `guten-post post-${index} post type-post status-publish format-standard has-post-thumbnail hentry category-category tag-tag`;
        const category = renderCategory(post);

        const [featuredImage] = useEntityProp('postType', postType, 'featured_media', post?.id);

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

        const mediaUrl = media?.media_details?.sizes?.[thumbnailSize.value]?.source_url;

        return (
            <article key={post?.id || index} className={postClasses}>
                <div className="guten-thumb">
                    <a aria-label={parseUnicode(post?.title) || ''} href="javascript:void(0);">
                        <div className="thumbnail-container">
                            <img
                                loading="eager"
                                width={post?.thumbnail?.width || 400}
                                height={post?.thumbnail?.height || 400}
                                src={mediaUrl}
                                className="attachment-post-thumbnail size-post-thumbnail wp-post-image"
                                alt={parseUnicode(post?.title) || ''}
                                decoding="async"
                                sizes={`(max-width: ${post?.thumbnail?.width || 400}px) 100vw, ${post?.thumbnail?.width || 400}px`}
                            />
                            <div className="guten-overlay"></div>
                        </div>
                    </a>
                    {postblockType === 'type-3' && category}
                </div>
                <div className="guten-postblock-content">
                    {postblockType !== 'type-3' && category}
                    {renderContent(post)}
                </div>
            </article>
        );
    };

    return (
        <div className="guten-posts guten-ajax-flag">
            {postData.length > 0 ? (
                postData.map((post, index) => renderPost(post, index))
            ) : (
                <div className="guten-empty-posts">No posts found</div>
            )}
        </div>
    );
};

export default PostBlockContent;
