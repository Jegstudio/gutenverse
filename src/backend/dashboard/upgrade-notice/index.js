
import { addFilter } from '@wordpress/hooks';
import { HeaderV400, ContentV400 } from './version/v4-0-0';

export const loadUpgradeNotice = () => {
    addFilter(
        'gutenverse.dashboard.notice.header',
        'gutenverse/dashboard/notice/header',
        (header, plugin, version) => {
            if (plugin === 'gutenverse') {
                switch (version) {
                    case '4.0.0':
                        header = <HeaderV400 />;
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
                    case '4.0.0':
                        content = <ContentV400 />;
                        break;
                }
            }

            return content;
        }
    );
};
