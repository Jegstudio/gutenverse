import { applyFilters } from '@wordpress/hooks';
import { LockedVideoPostFormat } from 'gutenverse-core/controls';

export const videoSettingPanel = (props) => {
    return applyFilters(
        'gutenverse.post-featured-image.video-setting',
        [{
            component: LockedVideoPostFormat,
        }],
        props
    );
};
