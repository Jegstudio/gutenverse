import { __ } from '@wordpress/i18n';

export const HeaderV400 = () => {
    const { gutenverseAssetURL: assetURL } = window['GutenverseDashboard'];

    return (
        <div className="custom-notice-header">
            <img src={`${assetURL}/img/upgrade-notice-3.2.0-bg-hero-notice.webp`} alt="Header Background" />
            <h3 className="upgrade-notice-title">
                {__('Gutenverse', 'gutenverse')}
                &nbsp;
                <span>{__('Version 4.0.0', 'gutenverse')}</span>
                <svg width="30" height="32" viewBox="0 0 30 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.887 21.774c2.28-6.758 4.13-8.606 10.887-10.887C15.016 8.607 13.168 6.757 10.887 0 8.607 6.757 6.757 8.606 0 10.887c6.757 2.28 8.606 4.13 10.887 10.887z" fill="url(#v400-main)" />
                    <path d="M23.371 20.121c-1.244 3.687-2.253 4.695-5.94 5.94 3.687 1.244 4.696 2.252 5.94 5.939 1.244-3.687 2.253-4.695 5.94-5.94-3.687-1.244-4.696-2.252-5.94-5.939z" fill="url(#v400-small)" />
                    <defs>
                        <linearGradient id="v400-main" x1="2.844" y1="-8.404" x2="32.507" y2="36.419" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#65DCF5" />
                            <stop offset="1" stopColor="#65DCF5" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="v400-small" x1="18.983" y1="15.537" x2="35.165" y2="39.989" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#65DCF5" />
                            <stop offset="1" stopColor="#65DCF5" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                </svg>
            </h3>
        </div>
    );
};

export const ContentV400 = () => {
    return (
        <div className="inner-content">
            <h4>{__('Faster Frontend Experience', 'gutenverse')}</h4>
            <p>{__('Gutenverse 4.0.0 improves asset loading, frontend cache handling, and mobile background behavior to help pages load more efficiently.', 'gutenverse')}</p>

            <h4>{__('Better Icon Loading', 'gutenverse')}</h4>
            <p>{__('Icons can now be converted to optimized SVG output, reducing dependency on frontend icon font loading.', 'gutenverse')}</p>

            <h4>{__('Cleaner Rendering And Dashboard Updates', 'gutenverse')}</h4>
            <p>{__('This release also improves featured image background rendering, post query handling, dashboard plugin notices, and several editor controls.', 'gutenverse')}</p>
        </div>
    );
};
