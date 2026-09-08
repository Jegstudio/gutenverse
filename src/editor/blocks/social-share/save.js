
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { withMouseMoveEffectScript } from 'gutenverse-core/hoc';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';
import { compose } from '@wordpress/compose';

const SaveSocialShare = compose(
    withMouseMoveEffectScript
)(({ attributes }) => {
    const {
        elementId,
        orientation = 'horizontal',
        layoutMode = 'default',
        buttonLayout = 'split',
        enableMoreButton = false,
        visibleButtonCount = 2,
    } = attributes;

    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);

    const className = classnames(
        'guten-element',
        'guten-social-share',
        elementId,
        orientation,
        {
            'stretch-layout': layoutMode === 'stretch',
            'button-layout-solid': buttonLayout === 'solid',
            'has-more-toggle': enableMoreButton,
        },
        animationClass,
        displayClass,
    );

    const moreButton = enableMoreButton && (
        <button
            className="gutenverse-share-more-toggle"
            type="button"
            aria-label="Show more share options"
            aria-expanded="false"
            data-visible-button-count={visibleButtonCount}
        >
            <span className="gutenverse-share-more-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d="M14 8V4l8 8-8 8v-4.1c-5.1.4-8.6 2.2-12 6.1.9-6.5 4.6-12.6 12-14Z" />
                </svg>
            </span>
        </button>
    );

    return <div {...useBlockProps.save({ className })}>
        <InnerBlocks.Content/>
        {moreButton}
    </div>;
});

export default SaveSocialShare;
