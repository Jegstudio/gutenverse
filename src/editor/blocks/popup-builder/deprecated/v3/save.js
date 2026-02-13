
import { compose } from '@wordpress/compose';
import { InnerBlocks } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';
import { withMouseMoveEffectScript } from 'gutenverse-core/hoc';

const save = compose(
    withMouseMoveEffectScript
)((props) => {
    const { attributes } = props;

    const {
        elementId,
        contentPosition,
        position,
        sideMode,
        closeIcon,
        openTrigger,
        openWaitTime,
        openScrollDistance,
        openAnchor,
        openMaxClick,
        openInterval,
        showCloseButton,
        closePosition,
        closePopupOverlay,
        hideAfterClosed,
        exitAnimation,
        exitAnimationDuration,
        exitAnimationDelay,
    } = attributes;

    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);

    const blockProps = {
        className: classnames(
            'guten-element',
            'guten-popup-builder',
            elementId,
            displayClass,
        ),
        'data-trigger': openTrigger,
        'data-wait': isNaN(openWaitTime) ? undefined : openWaitTime,
        'data-hide': hideAfterClosed ? 'hide-' + elementId : undefined,
        'data-scroll': isNaN(openScrollDistance) ? undefined : openScrollDistance,
        'data-anchor': openAnchor,
        'data-max-click': isNaN(openMaxClick) ? undefined : openMaxClick,
        'data-close-overlay': closePopupOverlay,
        'data-inactive-interval': openInterval ? JSON.stringify(openInterval) : undefined,
        'data-exit-animation': exitAnimation,
        'data-exit-duration': exitAnimationDuration,
        'data-exit-delay': exitAnimationDelay,
    };

    return (
        <div {...blockProps}>
            <div
                className={classnames(
                    'guten-popup',
                    `guten-popup-${position}`,
                    `guten-popup-side-${sideMode}`
                )}
            >
                <div className="guten-popup-overlay"></div>
                {showCloseButton && closePosition === 'overlay' && (
                    <div className="guten-popup-close">
                        <i className={closeIcon}></i>
                    </div>
                )}
                <div
                    className={classnames(
                        'guten-popup-wrapper',
                        `guten-popup-wrapper-${contentPosition}`
                    )}
                >
                    <div
                        className={classnames(
                            'guten-popup-content',
                            animationClass
                        )}
                    >
                        {showCloseButton && closePosition === 'container' && (
                            <div className="guten-popup-close">
                                <i className={closeIcon}></i>
                            </div>
                        )}
                        <div className="guten-popup-container">
                            <InnerBlocks.Content />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default save;
