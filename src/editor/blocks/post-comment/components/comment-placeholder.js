const CommentPlaceholder = (props) => {
    const {
        showForm = true,
        enableSuffix = true,
        suffixMain = 'says:',
        suffixReply = 'relplied:',
        titleText = ' Comments On ',
        enableCommentTitle = true,
        enableCommentCount,
        enablePostTitle
    } = props;

    return <>
        <div className="guten-comment-example-warning"><span>Below is an example view of the post comment if user is not logged in.</span></div>
        {enableCommentTitle && <div className="guten-post-comment-title comment-title">
            <p className="title-text">
                {enableCommentCount && <span className="comment-count">1</span>}
                {titleText}
                {enablePostTitle && <span className="comment-post-title">`&quot;`Post Title`&quot;`</span>}
            </p>
        </div>}
        <ol className="commentlist">
            <li id="comment-1" className="comment byuser comment-author-admin bypostauthor even thread-even depth-1">
                <article id="div-comment-2" className="comment-body">
                    <footer className="comment-meta">
                        <div className="comment-author vcard">
                            <img src="https://secure.gravatar.com/avatar/436d1f5d097f14a6dd6f3bcf25f65a56?s=32&amp;d=mm&amp;r=g" srcSet="https://secure.gravatar.com/avatar/436d1f5d097f14a6dd6f3bcf25f65a56?s=64&amp;d=mm&amp;r=g 2x" className="avatar avatar-32 photo" height="32" width="32" loading="lazy" decoding="async" />
                            <b className="fn"><a href="#" onClick={e => e.preventDefault()} rel="external nofollow ugc" className="url">User</a></b>
                            {enableSuffix && <span className="says"> {suffixMain}</span>}
                        </div>
                        <div className="comment-metadata">
                            <a href="#" onClick={e => e.preventDefault()}>
                                <time dateTime="2022-07-11T05:42:20+00:00">01 January 2022 at 9:00 am</time>
                            </a>
                        </div>
                    </footer>
                    <div className="comment-content">
                        <p>This is my first comment</p>
                    </div>
                    <div className="reply">
                        <a rel="nofollow" className="comment-reply-link" href="#" onClick={e => e.preventDefault()} data-commentid="2" data-postid="1" data-belowelement="div-comment-2" data-respondelement="respond" data-replyto="Reply to admin" aria-label="Reply to admin">Reply</a>
                    </div>
                </article>
                <ul className="children">
                    <li id="comment-40" className="comment byuser comment-author-user bypostauthor odd alt depth-2">
                        <article id="div-comment-40" className="comment-body">
                            <footer className="comment-meta">
                                <div className="comment-author vcard">
                                    <img src="https://secure.gravatar.com/avatar/436d1f5d097f14a6dd6f3bcf25f65a56?s=32&amp;d=mm&amp;r=g" srcSet="https://secure.gravatar.com/avatar/436d1f5d097f14a6dd6f3bcf25f65a56?s=64&amp;d=mm&amp;r=g 2x" className="avatar avatar-32 photo" height="32" width="32" loading="lazy" decoding="async" />
                                    <b className="fn"><a href="#" onClick={e => e.preventDefault()} className="url" rel="ugc">User</a></b>
                                    {enableSuffix && <span className="says"> {suffixReply}</span>}
                                </div>

                                <div className="comment-metadata">
                                    <a href="#" onClick={e => e.preventDefault()}>
                                        <time dateTime="2024-09-20T02:20:38+00:00">01 January 2022 at 10:00 am</time>
                                    </a>
                                </div>
                            </footer>

                            <div className="comment-content">
                                <p>this is my replay</p>
                            </div>

                            <div className="reply">
                                <a rel="nofollow" className="comment-reply-link" href="#comment-40" data-commentid="40" data-postid="2175" data-belowelement="div-comment-40" data-respondelement="respond" data-replyto="Reply to user" aria-label="Reply to user">Reply</a>
                            </div>
                        </article>
                    </li>
                </ul>
            </li>
        </ol>
        {showForm && <div className="comment-form">
            <div id="respond" className="comment-respond">
                <h3 id="reply-title" className="comment-reply-title">Leave a Reply <small><a rel="nofollow" id="cancel-comment-reply-link" href="#" onClick={e => e.preventDefault()} style={{display: 'none'}}>Cancel reply</a></small></h3>
                <div>
                    <p className="comment-notes">
                        <span id="email-notes">Your email address will not be published.</span>
                        <span className="required-field-message" aria-hidden="true">Required fields are marked
                            <span className="required" aria-hidden="true">*</span>
                        </span>
                    </p>
                    <p className="logged-in-as">
                        Logged in as admin. <a href="#" onClick={e => e.preventDefault()}>Edit your profile</a>. <a href="#" onClick={e => e.preventDefault()}>Log out?</a>
                        <span className="required-field-message">Required fields are marked <span className="required">*</span></span>
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
                        <input id="author" name="author" type="text" defaultValue="" size="30" maxLength="245" required="" />
                    </p>
                    <p className="comment-form-email">
                        <label htmlFor="email">Email
                            <span className="required" aria-hidden="true">*</span>
                        </label>
                        <input id="email" name="email" type="email" defaultValue="" size="30" maxLength="100" aria-describedby="email-notes" required="" />
                    </p>
                    <p className="comment-form-url">
                        <label htmlFor="url">Website</label>
                        <input id="url" name="url" type="url" defaultValue="" size="30" maxLength="200" />
                    </p>
                    <p className="comment-form-cookies-consent">
                        <input id="wp-comment-cookies-consent" name="wp-comment-cookies-consent" type="checkbox" defaultValue="yes" />
                        <label htmlFor="wp-comment-cookies-consent">Save my name, email, and website in this browser for the next time I comment.</label>
                    </p>
                    <p className="form-submit wp-block-button">
                        <input name="submit" type="submit" id="submit" value="Post Comment" />
                        <input type="hidden" name="comment_post_ID" defaultValue="1" id="comment_post_ID" />
                        <input type="hidden" name="comment_parent" id="comment_parent" defaultValue="0" />
                    </p>
                </div>
            </div>
        </div>}
    </>;
};

export default CommentPlaceholder;