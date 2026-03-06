

import { RichText } from '@wordpress/block-editor';

const ContentItem = (data) => {
    let {
        src,
        name,
        lazy,
        description,
        comment,
        rating,
        contentType,
        showQuote,
        iconQuote,
        quoteOverride,
        contentPosition,
        showRating,
        iconRatingFull,
        iconRatingHalf,
        starPosition,
        frontEnd,
        setAttributes,
        index,
        testimonialData
    } = data;

    const overrideQuote = quoteOverride ? 'quote-override' : '';

    const contentRichText = (value, tag, className, identifier, index) => {
        if(frontEnd){
            return <RichText.Content
                className={className}
                tagName={tag}
                value={value}
            />;
        }else{
            return <RichText
                className={className}
                tagName={tag}
                value={value}
                onChange={value => {
                    const testimoniData = [...testimonialData];
                    testimoniData[index][identifier]= value;
                    setAttributes({ testimonialData : testimoniData});
                }}
            />;
        }
    };
    const content = () => {
        const commentContent = <div className="comment-content">{contentRichText(comment, 'p', 'profile-comment','comment', index )}</div>;
        const starRating = showRating && <>
            {Array.from({ length: rating }, (i) => <li key={i}><i className={iconRatingFull}></i></li>)}
            {parseFloat(rating) !== Math.floor(rating) ? <li><i className={iconRatingHalf}></i></li> : null}
        </>;

        switch (contentType) {
            case 1:
                return <div className="testimonial-slider hover-from-left testimonial-content" >
                    <div className="comment-bio">
                        <div className="profile-image">
                            {lazy ? <img loading="lazy" src={src} alt={name} data-image-placeholder={ !src && 'gutenverse-image-placeholder' } /> : <img src={src} alt={name} data-image-placeholder={ !src && 'gutenverse-image-placeholder' }/>}
                        </div>
                        <ul className="rating-stars">{starRating}</ul>
                        <span className="profile-info">
                            {contentRichText(name, 'strong', 'profile-name','name', index )}
                            {contentRichText(description, 'p', 'profile-des','description', index )}
                        </span>
                    </div>
                    <div className="comment-content">
                        {showQuote && <div className={`${overrideQuote} icon-content`}>
                            <i aria-hidden="true" className={`${iconQuote}`}></i>
                        </div>}
                        {contentRichText(comment, 'p', 'profile-comment','comment', index )}
                    </div>
                </div>;
            case 2:
                return <div className="testimonial-content" >
                    {(starPosition === undefined || starPosition === 'above-image') && <div className="comment-header"><ul className="rating-stars">{starRating}</ul></div>}
                    {contentPosition !== undefined && contentPosition === 'above-image' && commentContent}
                    <div className="comment-bio">
                        <div className="bio-details">
                            <div className="profile-image">
                                {lazy ? <img loading="lazy" src={src} alt={name} data-image-placeholder={ !src && 'gutenverse-image-placeholder' }/> : <img src={src} alt={name} data-image-placeholder={ !src && 'gutenverse-image-placeholder' } />}
                            </div>
                            <span className="profile-info">
                                {contentRichText(name, 'strong', 'profile-name','name', index )}
                                {contentRichText(description, 'p', 'profile-des','description', index )}
                            </span>
                        </div>
                        {showQuote && <div className={`${overrideQuote} icon-content`}><i aria-hidden="true" className={`${iconQuote}`}></i></div>}
                    </div>
                    {(contentPosition === undefined || contentPosition === 'below-image') && commentContent}
                    {starPosition !== undefined && starPosition === 'below-image' && <div className="comment-header"><ul className="rating-stars">{starRating}</ul></div>}
                </div>;
            case 3:
                return <div className="testimonial-content" >
                    {showQuote && <div className={`${overrideQuote} icon-content`}><i aria-hidden="true" className={`${iconQuote}`}></i></div>}
                    {contentPosition !== undefined && contentPosition === 'above-image' && commentContent}
                    {starPosition !== undefined && starPosition === 'above-image' && <ul className="rating-stars">{starRating}</ul>}
                    <div className="comment-bio">
                        <div className="bio-details">
                            <div className="profile-image">
                                {lazy ? <img loading="lazy" src={src} alt={name} data-image-placeholder={ !src && 'gutenverse-image-placeholder' }/> : <img src={src} alt={name} data-image-placeholder={ !src && 'gutenverse-image-placeholder' }/>}
                            </div>
                        </div>
                    </div>
                    {(starPosition === undefined || starPosition === 'below-image') && <ul className="rating-stars">{starRating}</ul>}
                    {(contentPosition === undefined || contentPosition === 'below-image') && commentContent}
                    <span className="profile-info">
                        {contentRichText(name, 'strong', 'profile-name','name', index )}
                        {contentRichText(description, 'p', 'profile-des','description', index )}
                    </span>
                </div>;
            case 4:
                return <div className="testimonial-content" >
                    {showQuote && <div className={`${overrideQuote} icon-content`}><i aria-hidden="true" className={`${iconQuote}`}></i></div>}
                    {contentPosition !== undefined && contentPosition === 'above-image' && commentContent}
                    <div className="comment-bio">
                        <div className="bio-details">
                            {starPosition !== undefined && starPosition === 'above-image' && <ul className="rating-stars">{starRating}</ul>}
                            <div className="profile-image">
                                {lazy ? <img loading="lazy" src={src} alt={name} data-image-placeholder={ !src && 'gutenverse-image-placeholder' }/> : <img src={src} alt={name} data-image-placeholder={ !src && 'gutenverse-image-placeholder' }/>}
                            </div>
                            {(starPosition === undefined || starPosition === 'below-image') && <ul className="rating-stars">{starRating}</ul>}
                            <span className="profile-info">
                                {contentRichText(name, 'strong', 'profile-name','name', index )}
                                {contentRichText(description, 'p', 'profile-des','description', index )}
                            </span>
                        </div>
                    </div>
                    {(contentPosition === undefined || contentPosition === 'below-image') && commentContent}
                </div>;
        }
    };

    return <div className="guten-testimonial-item">
        <div className="testimonial-box hover-from-left">{content()}</div>
    </div>;
};

export default ContentItem;