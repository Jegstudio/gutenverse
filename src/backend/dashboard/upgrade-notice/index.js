
import { addFilter } from '@wordpress/hooks';
import { HeaderV340, ContentV340 } from './version/v3-4-0';

export const loadUpgradeNotice = () => {
    addFilter(
        'gutenverse.dashboard.notice.header',
        'gutenverse/dashboard/notice/header',
        (header, plugin, version) => {
            if (plugin === 'gutenverse') {
                switch (version) {
                    case '3.4.0':
                        header = <HeaderV340 />;
                        break;
                }
            }

            return header;
        },
        9
    );

    addFilter(
        'gutenverse.dashboard.notice.content',
        'gutenverse/dashboard/notice/content',
        (content, plugin, version) => {
            if (plugin === 'gutenverse') {
                switch (version) {
                    case '3.4.0':
                        content = <ContentV340 />;
                        break;
                }
            }

            return content;
        }
    );
};