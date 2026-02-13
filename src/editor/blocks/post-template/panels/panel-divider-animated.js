import { LockedProDividerControl } from 'gutenverse-core/controls';
import { applyFilters } from '@wordpress/hooks';

export const dividerPanelAnimated = (props) => {
    return applyFilters(
        'gutenverse.container.divider-animated.options',
        [{
            component: LockedProDividerControl,
        }],
        props
    );
};