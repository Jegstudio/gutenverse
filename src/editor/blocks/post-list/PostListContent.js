
import { renderIcon, dummyText, parseUnicode } from 'gutenverse-core/helper';

const PostListContent = (props) => {
    const {
        postData = [],
        attributes
    } = props;

    const {
        imageEnabled,
        backgroundImageEnabled,
        iconEnabled,
        icon,
        iconType,
        iconSVG,
        metaEnabled,
        metaDateEnabled,
        metaDateIcon,
        metaDateIconType,
        metaDateIconSVG,
        metaDateIconPosition,
        metaCategoryEnabled,
        metaCategoryIcon,
        metaCategoryIconType,
        metaCategoryIconSVG,
        metaPosition,
    } = attributes;

    const formatDate = (post) => {
        if (!post) return '';
        return post.date || '';
    };

    const renderMeta = (post) => {
        if (!metaEnabled) return null;
        const category = post?.primary_category || { name: 'category', slug: 'category', url: '#' };

        return (
            <div className="meta-lists">
                {metaDateEnabled && (
                    <>
                        <span className="meta-date">
                            <div className="guten-meta-date">
                                {metaDateIconPosition === 'before' && renderIcon(metaDateIcon, metaDateIconType, metaDateIconSVG)}
                                {' '}
                                {formatDate(post)}
                                {' '}
                                {metaDateIconPosition === 'after' && renderIcon(metaDateIcon, metaDateIconType, metaDateIconSVG)}
                            </div>
                        </span>
                        {' '}
                    </>
                )}
                {metaCategoryEnabled && (
                    <span className="meta-category">
                        {renderIcon(metaCategoryIcon, metaCategoryIconType, metaCategoryIconSVG)} {category.name}
                    </span>
                )}
            </div>
        );
    };

    const renderPost = (post, index) => {
        const bgStyle = backgroundImageEnabled ? { backgroundImage: `url(${post?.thumbnail?.url || `https://picsum.photos/400/400?random=${index + 1}`})` } : {};

        let thumbnail = null;
        if (imageEnabled) {
            thumbnail = (
                <img
                    loading="eager"
                    width="400"
                    height="400"
                    src={post?.thumbnail?.url || `https://picsum.photos/400/400?random=${index + 1}`}
                    className="attachment-post-thumbnail size-post-thumbnail wp-post-image"
                    alt=""
                    decoding="async"
                />
            );
        } else if (iconEnabled) {
            thumbnail = (
                <span className="icon-list">
                    {renderIcon(icon, iconType, iconSVG)}
                </span>
            );
        }

        return (
            <article key={post?.id || index} className="guten-post post-list-item">
                <a href="javascript:void(0);" style={bgStyle}>
                    {thumbnail}
                    <div className="guten-postlist-content">
                        {metaPosition === 'top' && renderMeta(post)}
                        <span className="guten-postlist-title">{parseUnicode(post?.title) || dummyText(5, 10)}</span>
                        {metaPosition === 'bottom' && renderMeta(post)}
                    </div>
                </a>
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

export default PostListContent;
