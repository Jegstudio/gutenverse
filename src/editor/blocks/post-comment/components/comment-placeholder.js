

const CommentPlaceholder = (showForm = true) => {
    return <>
        <div><span>Below is an example view of the post comment if user is not logged in.</span></div>
        <ol className="commentlist">
            <li id="comment-1" className="comment byuser comment-author-admin bypostauthor even thread-even depth-1">
                <article id="div-comment-2" className="comment-body">
                    <footer className="comment-meta">
                        <div className="comment-author vcard">
                            <img alt="" src="http://2.gravatar.com/avatar/89bf62eef95ad7f15f6026f781b35dfa?s=32&amp;d=mm&amp;r=g" srcSet="http://2.gravatar.com/avatar/89bf62eef95ad7f15f6026f781b35dfa?s=64&amp;d=mm&amp;r=g 2x" className="avatar avatar-32 photo" height="32" width="32" loading="lazy" />
                            <b className="fn"><a href="javascript:void(0);" rel="external nofollow ugc" className="url">User</a></b>
                            <span className="says">says:</span>
                        </div>
                        <div className="comment-metadata">
                            <a href="javascript:void(0);">
                                <time dateTime="2022-07-11T05:42:20+00:00">01 January 2022 at 9:00 am</time>
                            </a>
                        </div>
                    </footer>
                    <div className="comment-content">
                        <p>This is my first comment</p>
                    </div>
                    <div className="reply">
                        <a rel="nofollow" className="comment-reply-link" href="javascript:void(0);" data-commentid="2" data-postid="1" data-belowelement="div-comment-2" data-respondelement="respond" data-replyto="Reply to admin" aria-label="Reply to admin">Reply</a>
                    </div>
                </article>
            </li>
        </ol>
        {showForm && <div className="comment-form">
            <div id="respond" className="comment-respond">
                <h3 id="reply-title" className="comment-reply-title">Leave a Reply <small><a rel="nofollow" id="cancel-comment-reply-link" href="javascript:void(0);" style={{display: 'none'}}>Cancel reply</a></small></h3>
                <div>
                    <p className="comment-notes">
                        <span id="email-notes">Your email address will not be published.</span>
                        <span className="required-field-message" aria-hidden="true">Required fields are marked
                            <span className="required" aria-hidden="true">*</span>
                        </span>
                    </p>
                    <p className="comment-form-comment">
                        <label htmlFor="comment">Comment
                            <span className="required" aria-hidden="true">*</span>
                        </label>
                        <textarea id="comment" name="comment" cols="45" rows="8" maxLength="65525" required=""></textarea>
                    </p>
                    <p className="comment-form-author">
                        <label htmlFor="author">Name
                            <span className="required" aria-hidden="true">*</span>
                        </label>
                        <input id="author" name="author" type="text" value="" size="30" maxLength="245" required="" />
                    </p>
                    <p className="comment-form-email">
                        <label htmlFor="email">Email
                            <span className="required" aria-hidden="true">*</span>
                        </label>
                        <input id="email" name="email" type="email" value="" size="30" maxLength="100" aria-describedby="email-notes" required="" />
                    </p>
                    <p className="comment-form-url">
                        <label htmlFor="url">Website</label>
                        <input id="url" name="url" type="url" value="" size="30" maxLength="200" />
                    </p>
                    <p className="comment-form-cookies-consent">
                        <input id="wp-comment-cookies-consent" name="wp-comment-cookies-consent" type="checkbox" value="yes" />
                        <label htmlFor="wp-comment-cookies-consent">Save my name, email, and website in this browser for the next time I comment.</label>
                    </p>
                    <p className="form-submit wp-block-button">
                        <input name="submit" type="submit" id="submit" value="Post Comment" />
                        <input type="hidden" name="comment_post_ID" value="1" id="comment_post_ID" />
                        <input type="hidden" name="comment_parent" id="comment_parent" value="0" />
                    </p>
                </div>
            </div>
        </div>}
    </>;
};

export default CommentPlaceholder;