import { addFilter } from '@wordpress/hooks';
import { loadUpgradeNotice } from './upgrade-notice';
import { GutenverseBannerNotice } from './notices/gutenverse-banner-notice';
import { GutenverseUpgradeNotice } from './notices/gutenverse-upgrade-notice';
import { GutenversePageContentNotice } from './notices/gutenverse-page-content-notice';
import { GutenverseFormEntriesNotice } from './notices/gutenverse-form-entries-notice';

loadUpgradeNotice();

addFilter(
    'gutenverse.notification.list',
    'gutenverse/notification/list',
    (list) => {
        const { assetURL, noticeActions } = window['GutenverseDashboard'];
        const notice = {
            id: 'gutenverse-notice-banner',
            show: noticeActions['gutenverse-notice-banner']?.show,
            content: <div className="gutenverse-notification">
                <div className="gutenverse-notification-icon">
                    <img src={`${assetURL}/icon/icon-notice-gutenverse.svg`} />
                </div>
                <div className="gutenverse-notification-inner">
                    <GutenverseBannerNotice data={noticeActions['gutenverse-notice-banner']} />
                </div>
            </div>
        };

        return [
            ...list,
            notice
        ];
    }
);

addFilter(
    'gutenverse.notification.list',
    'gutenverse/notification/list',
    (list) => {
        const { noticeActions } = window['GutenverseDashboard'];
        const notice = {
            id: 'gutenverse-upgrade-notice',
            show: noticeActions['gutenverse-upgrade-notice']?.show,
            content: <div className="gutenverse-notification">
                <div className="gutenverse-notification-icon">
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="1" y="1" width="24" height="24" rx="12" fill="#FEF0C7" />
                        <rect x="1" y="1" width="24" height="24" rx="12" stroke="#FFB200" />
                        <path d="M13.398 8.07918C13.2423 7.7835 12.7581 7.7835 12.6024 8.07918L8.55262 15.7651C8.51616 15.834 8.49809 15.9112 8.50016 15.9892C8.50223 16.0672 8.52437 16.1433 8.56443 16.2102C8.60449 16.277 8.6611 16.3323 8.72874 16.3706C8.79638 16.4089 8.87275 16.429 8.9504 16.4288H17.05C17.1276 16.429 17.2039 16.409 17.2715 16.3707C17.3391 16.3324 17.3957 16.2771 17.4357 16.2103C17.4757 16.1435 17.4978 16.0674 17.4998 15.9895C17.5019 15.9116 17.4838 15.8344 17.4473 15.7656L13.398 8.07918ZM13.4502 15.0725H12.5502V14.1683H13.4502V15.0725ZM12.5502 13.264V11.0035H13.4502L13.4506 13.264H12.5502Z" fill="#FFB200" />
                    </svg>

                </div>
                <div className="gutenverse-notification-inner">
                    <GutenverseUpgradeNotice data={noticeActions['gutenverse-upgrade-notice']} />
                </div>
            </div>
        };

        return [
            ...list,
            notice
        ];
    }
);

addFilter(
    'gutenverse.notification.list',
    'gutenverse/notification/list',
    (list) => {
        const { noticeActions } = window['GutenverseDashboard'];
        const notice = {
            id: 'gutenverse-page-content-notice',
            show: noticeActions['gutenverse-page-content-notice']?.show,
            content: <div className="gutenverse-notification">
                <div className="gutenverse-notification-icon">
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="1" y="1" width="24" height="24" rx="12" fill="#FEF0C7" />
                        <rect x="1" y="1" width="24" height="24" rx="12" stroke="#FFB200" />
                        <path d="M13.398 8.07918C13.2423 7.7835 12.7581 7.7835 12.6024 8.07918L8.55262 15.7651C8.51616 15.834 8.49809 15.9112 8.50016 15.9892C8.50223 16.0672 8.52437 16.1433 8.56443 16.2102C8.60449 16.277 8.6611 16.3323 8.72874 16.3706C8.79638 16.4089 8.87275 16.429 8.9504 16.4288H17.05C17.1276 16.429 17.2039 16.409 17.2715 16.3707C17.3391 16.3324 17.3957 16.2771 17.4357 16.2103C17.4757 16.1435 17.4978 16.0674 17.4998 15.9895C17.5019 15.9116 17.4838 15.8344 17.4473 15.7656L13.398 8.07918ZM13.4502 15.0725H12.5502V14.1683H13.4502V15.0725ZM12.5502 13.264V11.0035H13.4502L13.4506 13.264H12.5502Z" fill="#FFB200" />
                    </svg>

                </div>
                <div className="gutenverse-notification-inner">
                    <GutenversePageContentNotice data={noticeActions['gutenverse-page-content-notice']} />
                </div>
            </div>
        };

        return [
            ...list,
            notice
        ];
    }
);



addFilter(
    'gutenverse.notification.list',
    'gutenverse/notification/list',
    (list) => {
        const { noticeActions } = window['GutenverseDashboard'];
        const notice = {
            id: 'gutenverse-form-entries-notice',
            show: noticeActions['gutenverse-form-entries-notice']?.show,
            content: <div className="gutenverse-notification">
                <div className="gutenverse-notification-icon">
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="1" y="1" width="24" height="24" rx="12" fill="#FEF0C7" />
                        <rect x="1" y="1" width="24" height="24" rx="12" stroke="#FFB200" />
                        <path d="M13.398 8.07918C13.2423 7.7835 12.7581 7.7835 12.6024 8.07918L8.55262 15.7651C8.51616 15.834 8.49809 15.9112 8.50016 15.9892C8.50223 16.0672 8.52437 16.1433 8.56443 16.2102C8.60449 16.277 8.6611 16.3323 8.72874 16.3706C8.79638 16.4089 8.87275 16.429 8.9504 16.4288H17.05C17.1276 16.429 17.2039 16.409 17.2715 16.3707C17.3391 16.3324 17.3957 16.2771 17.4357 16.2103C17.4757 16.1435 17.4978 16.0674 17.4998 15.9895C17.5019 15.9116 17.4838 15.8344 17.4473 15.7656L13.398 8.07918ZM13.4502 15.0725H12.5502V14.1683H13.4502V15.0725ZM12.5502 13.264V11.0035H13.4502L13.4506 13.264H12.5502Z" fill="#FFB200" />
                    </svg>

                </div>
                <div className="gutenverse-notification-inner">
                    <GutenverseFormEntriesNotice data={noticeActions['gutenverse-form-entries-notice']} />
                </div>
            </div>
        };

        return [
            ...list,
            notice
        ];
    }
);

