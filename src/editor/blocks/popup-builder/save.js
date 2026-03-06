
import { compose } from '@wordpress/compose';
import { InnerBlocks } from '@wordpress/block-editor';
import { useBlockProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';
import { withMouseMoveEffectScript } from 'gutenverse-core/hoc';
import { renderIcon } from 'gutenverse-core/helper';
import isEmpty from 'lodash/isEmpty';

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
        closeIconType,
        closeIconSVG,
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
        popupType,
        popupVideoSrc,
        popupVideoPlayOn,
        popupVideoStart,
        popupVideoEnd,
        popupVideoPauseOnClose,
        popupVideoResetOnClose,
        popupVideoHideControls,
        popupVideoMuted,
        popupVideoLoop
    } = attributes;

    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);

    const blockProps = useBlockProps.save({
        className: classnames(
            'guten-element',
            'guten-popup-builder',
            elementId,
            displayClass,
        ),
        'data-trigger': openTrigger,
        'data-wait': isNaN(openWaitTime) || isEmpty(openWaitTime) ? undefined : openWaitTime,
        'data-hide': hideAfterClosed ? 'hide-' + elementId : undefined,
        'data-scroll': isNaN(openScrollDistance) || isEmpty(openScrollDistance) ? undefined : openScrollDistance,
        'data-anchor': openAnchor,
        'data-max-click': isNaN(openMaxClick) || isEmpty(openMaxClick) ? undefined : openMaxClick,
        'data-close-overlay': closePopupOverlay,
        'data-inactive-interval': openInterval ? JSON.stringify(openInterval) : undefined,
        'data-exit-animation': exitAnimation,
        'data-exit-duration': exitAnimationDuration,
        'data-exit-delay': exitAnimationDelay,
        'data-video-pause-onclose': popupVideoPauseOnClose,
        'data-video-reset-onclose': popupVideoResetOnClose,
        'data-video-play-on': popupVideoPlayOn,
        'data-video-start': popupVideoStart,
    });

    const renderContent = () => {
        switch(popupType) {
            case 'youtube':
                const className = classnames(
                    'guten-element',
                    'guten-video',
                    elementId,
                );
                const style = {};
                const config = {
                    youtube: {
                        playerVars: {
                            start: popupVideoStart,
                            end: popupVideoEnd,
                        }
                    }
                };

                const dataProperties = JSON.stringify({
                    url: popupVideoSrc,
                    class: 'guten-video-background',
                    width: '100%',
                    height: '100%',
                    playing: false,
                    muted: popupVideoMuted,
                    loop: popupVideoLoop,
                    controls: !popupVideoHideControls,
                    playsinline: true,
                    style,
                    config
                });

                return <div className="guten-popup-video-container">
                    <figure {...useBlockProps.save({ className })}>
                        {popupVideoSrc ? <div className="guten-video-wrapper" data-property={dataProperties}></div> : null}
                    </figure>
                </div>;
            default:
                return <div className="guten-popup-container">
                    <InnerBlocks.Content />
                </div>;
        }
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
                        {renderIcon(closeIcon, closeIconType, closeIconSVG)}
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
                                {renderIcon(closeIcon, closeIconType, closeIconSVG)}
                            </div>
                        )}
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
});

export default save;
