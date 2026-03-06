
import { __ } from '@wordpress/i18n';

export const HeaderV340 = () => {
    const { gutenverseAssetURL: assetURL } = window['GutenverseDashboard'];

    return (
        <div className="custom-notice-header">
            <img src={`${assetURL}/img/upgrade-notice-3.2.0-bg-hero-notice.webp`} />
            <h3 className="upgrade-notice-title">
                {__('Gutenverse', 'gutenverse')}
                &nbsp;
                <span>{__('Version 3.4.0', 'gutenverse')}</span>
                <svg width="30" height="32" viewBox="0 0 30 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.887 21.774c2.28-6.758 4.13-8.606 10.887-10.887C15.016 8.607 13.168 6.757 10.887 0 8.607 6.757 6.757 8.606 0 10.887c6.757 2.28 8.606 4.13 10.887 10.887z" fill="url(#170g7q8f6a)" />
                    <path d="M23.371 20.121c-1.244 3.687-2.253 4.695-5.94 5.94 3.687 1.244 4.696 2.252 5.94 5.939 1.244-3.687 2.253-4.695 5.94-5.94-3.687-1.244-4.696-2.252-5.94-5.939z" fill="url(#whjndz5ptb)" />
                    <defs>
                        <linearGradient id="170g7q8f6a" x1="2.844" y1="-8.404" x2="32.507" y2="36.419" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#65DCF5" />
                            <stop offset="1" stopColor="#65DCF5" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="whjndz5ptb" x1="18.983" y1="15.537" x2="35.165" y2="39.989" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#65DCF5" />
                            <stop offset="1" stopColor="#65DCF5" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                </svg>
            </h3>
        </div>
    );
};

export const ContentV340 = () => {
    const { gutenverseAssetURL: assetURL } = window['GutenverseDashboard'];

    return (
        <div className="inner-content">
            <div className="intro-section">
                <img className="hero-image" src={`${assetURL}/img/update-notice-3.4.0-notice-hero-speed.png`} alt="Performance Improvements" />
                <h2>{__('Performance Improvements & Optimizations', 'gutenverse')}</h2>
                <p>{__('This update brings several performance-focused improvements, including SVG icon support, optimized CSS and JavaScript loading, improved pagination for SEO, and a more efficient styling cache mechanism.', 'gutenverse')}</p>
            </div>

            <div className="feature-section image-left">
                <div className="feature-image">
                    <img src={`${assetURL}/img/update-notice-3.4.0-notice-svg.png`} alt="SVG Icons" />
                </div>
                <div className="feature-text">
                    <h3>{__('SVG Icons', 'gutenverse')}</h3>
                    <p>{__("We've been working on making Gutenverse even better and one of the improvements is giving you the option to use SVG icons instead of webfonts. This update helps deliver faster initial page loads, eliminates unused icons and extra bloat, and improves SEO through stronger Core Web Vitals.", 'gutenverse')}</p>
                </div>
            </div>

            <div className="feature-section image-right">
                <div className="feature-text">
                    <h3>{__('CSS & JS Optimization', 'gutenverse')}</h3>
                    <p>{__('CSS and JavaScript files now load only when the related block or feature is used. This significantly reduces rendered code, resulting in faster loading times and better overall performance scores.', 'gutenverse')}</p>
                </div>
                <div className="feature-image">
                    <img src={`${assetURL}/img/update-notice-3.4.0-notice-css.png`} alt="CSS & JS Optimization" />
                </div>
            </div>

            <div className="feature-section image-left">
                <div className="feature-image">
                    <img src={`${assetURL}/img/update-notice-3.4.0-notice-pagination.png`} alt="Post Block Pagination For SEO" />
                </div>
                <div className="feature-text">
                    <h3>{__('Post Block Pagination For SEO', 'gutenverse')}</h3>
                    <p>{__('Post block pagination has been optimized with a cleaner structure and improved underlying code, helping paginated content be crawled and indexed more effectively by search engines.', 'gutenverse')}</p>
                </div>
            </div>

            <div className="feature-section image-right">
                <div className="feature-text">
                    <h3>{__('Improve Styling Cache Mechanism', 'gutenverse')}</h3>
                    <p>{__('This has been improved to ensure styles load instantly on subsequent visits. By reducing repeated style generation and unnecessary processing, pages feel smoother and more responsive, helping improve the user experience and strengthen Core Web Vitals scores.', 'gutenverse')}</p>
                </div>
                <div className="feature-image">
                    <img src={`${assetURL}/img/update-notice-3.4.0-notice-cache.png`} alt="Styling Cache Mechanism" />
                </div>
            </div>
        </div>
    );
};

