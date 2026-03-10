
import { __ } from '@wordpress/i18n';

export const HeaderV350 = () => {
    const { gutenverseAssetURL: assetURL } = window['GutenverseDashboard'];

    return (
        <div className="custom-notice-header">
            <img src={`${assetURL}/img/upgrade-notice-3.2.0-bg-hero-notice.webp`} alt="Header Background" />
            <h3 className="upgrade-notice-title">
                {__('Gutenverse', 'gutenverse')}
                &nbsp;
                <span>{__('Version 3.5.0', 'gutenverse')}</span>
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

export const ContentV350 = () => {
    const { gutenverseAssetURL: assetURL } = window['GutenverseDashboard'];

    return (
        <div className="inner-content">
            <h4>
                <img src={`${assetURL}/img/update-notice-3.5.0-icon-notice-container.png`} alt="Container Icon" />
                {__('New Container Block', 'gutenverse')}
            </h4>
            <p>{__('We have introduced a brand-new Container Block that is more flexible, faster, and better for your site’s performance. You can start using the new, lightweight Container for your future designs to enjoy better speed and SEO right out of the box. While we are moving toward this new system, there is no need to worry—your existing layouts using the old "Sections" will continue to work perfectly.', 'gutenverse')}</p>
            <img src={`${assetURL}/img/update-notice-3.5.0-graphic-update-container.png`} alt="New Container Block" />

            <h4>
                <img src={`${assetURL}/img/update-notice-3.5.0-icon-notice-seo.png`} alt="SEO Icon" />
                {__('Better SEO & Accessibility', 'gutenverse')}
            </h4>
            <p>{__('Over the last few versions, we have been consistently improving our blocks to make your website more search-engine friendly and accessible to everyone.', 'gutenverse')}</p>
            <ul>
                <li>{__('Added aria-labels to ensure your site works great for users with screen readers.', 'gutenverse')}</li>
                <li>{__('Improved how images are handled to keep your pages loading quickly, using lazy loading and fetch priority.', 'gutenverse')}</li>
                <li>{__('Refined our code so search engines can easily crawl and understand your content.', 'gutenverse')}</li>
            </ul>
            <img src={`${assetURL}/img/update-notice-3.5.0-graphic-update-seo.png`} alt="Better SEO & Accessibility" />
        </div>
    );
};
