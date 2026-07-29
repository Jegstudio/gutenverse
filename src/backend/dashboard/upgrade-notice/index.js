
import { addFilter } from '@wordpress/hooks';
import { HeaderV350, ContentV350 } from './version/v3-5-0';

export const loadUpgradeNotice = () => {
    addFilter(
        'gutenverse.dashboard.notice.header',
        'gutenverse/dashboard/notice/header',
        (header, plugin, version) => {
            if (plugin === 'gutenverse') {
                switch (version) {
                    case '3.5.0':
                        header = <HeaderV350 />;
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
                    case '3.5.0':
                        content = <ContentV350 />;
                        break;
                }
            }

            return content;
        }
    );
};