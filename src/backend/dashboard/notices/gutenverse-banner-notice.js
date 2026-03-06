import { __ } from '@wordpress/i18n';

export const GutenverseBannerNotice = () => {

    return <>
        <div className="gutenverse-banner-notice">
            <h3>{__('Enjoy Using Gutenverse?', 'gutenverse')}</h3>
            <p>{__('Hi! It’s been a while since you used Gutenverse, if Gutenverse has helped your site, we’d love it if you left us a rating — Thanks a lot!', 'gutenverse')}</p>
            <div className="gutenverse-notice-action">
                <a href="https://wordpress.org/support/plugin/gutenverse/reviews/#new-post" target="_blank" rel="noreferrer" className="gutenverse-notice-action-button">
                    {__('Yes, You deserve ★★★★★', 'gutenverse')}
                </a>
            </div>
        </div>
    </>;
};