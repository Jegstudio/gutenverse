
import { __ } from '@wordpress/i18n';

export const HeaderV320 = () => {
    const { gutenverseAssetURL: assetURL } = window['GutenverseDashboard'];

    return (
        <div className="custom-notice-header">
            <img src={`${assetURL}/img/upgrade-notice-3.2.0-bg-hero-notice.webp`} />
            <h3 className="upgrade-notice-title">
                {__('Gutenverse', 'gutenverse')}
                &nbsp;
                <span>{__('Version 3.2.0', 'gutenverse')}</span>
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

export const ContentV320 = () => {
    const { gutenverseAssetURL: assetURL } = window['GutenverseDashboard'];

    return (
        <>
            <div className="inner-content">
                <h4>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="32" height="32" fill="url(#paint0_linear_25291_10409)" />
                        <path d="M10.6663 23.3337C10.2997 23.3337 9.9859 23.2032 9.72501 22.9423C9.46412 22.6814 9.33345 22.3674 9.33301 22.0003V12.667H10.6663V22.0003H17.9997V23.3337H10.6663ZM13.333 20.667C12.9663 20.667 12.6526 20.5365 12.3917 20.2757C12.1308 20.0148 12.0001 19.7008 11.9997 19.3337V10.0003C11.9997 9.63366 12.1303 9.31988 12.3917 9.05899C12.653 8.7981 12.9668 8.66744 13.333 8.66699H17.9997L21.9997 12.667V19.3337C21.9997 19.7003 21.8692 20.0143 21.6083 20.2757C21.3475 20.537 21.0335 20.6674 20.6663 20.667H13.333ZM17.333 13.3337H20.6663L17.333 10.0003V13.3337Z" fill="white" />
                        <defs>
                            <linearGradient id="paint0_linear_25291_10409" x1="-12.2857" y1="-6.57143" x2="60.2857" y2="66.5714" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#4569FF" />
                                <stop offset="0.16" stopColor="#4C82FD" />
                                <stop offset="0.55" stopColor="#5BB7F8" />
                                <stop offset="0.84" stopColor="#64D8F5" />
                                <stop offset="1" stopColor="#68E4F4" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {__('Unibiz: The Official Theme for Gutenverse is here!', 'gutenverse')}
                </h4>
                <p>{__('Discover the official, beautifully designed theme that perfectly complements and unlocks the full potential of the Full Site Editing. It provides the foundational style and structure you need, ensuring a seamless, high-performance experience right out of the box.', 'gutenverse')}</p>
                <img className="image-1" src={assetURL + '/img/upgrade-notice-3.2.0-graphic-theme-unibiz.webp'}></img>

                <h4>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="32" height="32" fill="url(#paint0_linear_25291_10415)" />
                        <path d="M20.3534 18.213C20.3786 18.1506 20.4219 18.0971 20.4777 18.0595C20.5336 18.0219 20.5994 18.0018 20.6667 18.0018C20.734 18.0018 20.7998 18.0219 20.8556 18.0595C20.9115 18.0971 20.9548 18.1506 20.98 18.213L21.1494 18.6197C21.4323 19.3097 21.9692 19.865 22.6494 20.171L23.128 20.3843C23.1892 20.4127 23.241 20.4579 23.2774 20.5147C23.3137 20.5715 23.333 20.6376 23.333 20.705C23.333 20.7724 23.3137 20.8385 23.2774 20.8953C23.241 20.9521 23.1892 20.9974 23.128 21.0257L22.6214 21.251C21.9583 21.5486 21.4307 22.0837 21.1427 22.751L20.978 23.1283C20.9524 23.1898 20.9092 23.2423 20.8538 23.2792C20.7984 23.3161 20.7333 23.3358 20.6667 23.3358C20.6001 23.3358 20.535 23.3161 20.4796 23.2792C20.4242 23.2423 20.381 23.1898 20.3554 23.1283L20.1914 22.7517C19.9031 22.0839 19.3751 21.5485 18.7114 21.251L18.2047 21.0257C18.1433 20.9974 18.0913 20.9522 18.0548 20.8953C18.0184 20.8384 17.999 20.7722 17.999 20.7047C17.999 20.6371 18.0184 20.571 18.0548 20.5141C18.0913 20.4572 18.1433 20.4119 18.2047 20.3837L18.6834 20.1703C19.3635 19.8648 19.9006 19.31 20.184 18.6203L20.3534 18.213ZM21.334 9.33301C21.7014 9.33301 21.9994 9.63701 21.9994 9.99434V16.8943C21.2284 16.622 20.3925 16.5926 19.6042 16.8099C18.816 17.0272 18.1133 17.4808 17.5907 18.1097C17.0682 18.7386 16.7509 19.5125 16.6816 20.3272C16.6124 21.1419 16.7945 21.9583 17.2034 22.6663H10.662C10.5744 22.6657 10.4878 22.6479 10.4071 22.6137C10.3264 22.5796 10.2532 22.53 10.1917 22.4675C10.1303 22.4051 10.0817 22.3312 10.0488 22.25C10.0159 22.1688 9.99932 22.0819 10 21.9943V13.9997H14C14.1768 13.9997 14.3464 13.9294 14.4714 13.8044C14.5965 13.6794 14.6667 13.5098 14.6667 13.333V9.33301H21.334ZM13.3334 12.6663H10L13.3334 9.33501V12.6663Z" fill="white" />
                        <defs>
                            <linearGradient id="paint0_linear_25291_10415" x1="-12.2857" y1="-6.57143" x2="60.2857" y2="66.5714" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#4569FF" />
                                <stop offset="0.16" stopColor="#4C82FD" />
                                <stop offset="0.55" stopColor="#5BB7F8" />
                                <stop offset="0.84" stopColor="#64D8F5" />
                                <stop offset="1" stopColor="#68E4F4" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {__('50+ Stunning Demo Sites with Once Click Full Import', 'gutenverse')}
                </h4>
                <p>{__('Jumpstart your web development with an expansive library of over 50+ professional, pre-designed demo websites. Use our powerful one-click import feature to instantly load an entire site, including all pages, content, and settings, saving you countless hours of setup time.', 'gutenverse')}</p>
                <img className="image-1" src={assetURL + '/img/upgrade-notice-3.2.0-graphic-import-demo.webp'}></img>

                <h4>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="32" height="32" fill="url(#paint0_linear_25291_10418)" />
                        <path d="M15 18.1818H10L17 8V13.8182H22L15 24V18.1818Z" fill="white" />
                        <defs>
                            <linearGradient id="paint0_linear_25291_10418" x1="-12.2857" y1="-6.57143" x2="60.2857" y2="66.5714" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#4569FF" />
                                <stop offset="0.16" stopColor="#4C82FD" />
                                <stop offset="0.55" stopColor="#5BB7F8" />
                                <stop offset="0.84" stopColor="#64D8F5" />
                                <stop offset="1" stopColor="#68E4F4" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {__('2x Faster Site Performance', 'gutenverse')}
                </h4>
                <p>{__('Experience lightning-fast loading speeds, thanks to a deeply optimized and lightweight code structure. This theme is engineered for speed, delivering up to 2x faster site performance compared to standard themes.', 'gutenverse')}</p>
                <img className="image-1" src={assetURL + '/img/upgrade-notice-3.2.0-graphic-faster-performance.webp'}></img>
            </div>
        </>
    );
};

