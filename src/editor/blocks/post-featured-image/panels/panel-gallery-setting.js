import { applyFilters } from '@wordpress/hooks';
import { LockedGalleryPostFormat } from 'gutenverse-core/controls';

export const gallerySettingPanel = (props) => {
    return applyFilters(
        'gutenverse.post-featured-image.gallery-setting',
        [{
            component: LockedGalleryPostFormat,
        }],
        props
    );
};
