
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';
import classnames from 'classnames';
import { isEmptyValue } from 'gutenverse-core/editor-helper';
import { isAnimationActive, isSticky } from 'gutenverse-core/helper';
import { withAnimationAdvanceScript, withBackgroundEffectScript, withBackgroundSlideshowScript, withCursorEffectScript, withMouseMoveEffectScript, withVideoBackground } from 'gutenverse-core/hoc';
import { useAnimationAdvanceData, useAnimationFrontend, useDisplayFrontend } from 'gutenverse-core/hooks';
import isEmpty from 'lodash/isEmpty';

const save = compose(
    withAnimationAdvanceScript('post-template'),
    withVideoBackground,
    withCursorEffectScript,
    withMouseMoveEffectScript,
    withBackgroundEffectScript,
    withBackgroundSlideshowScript,
)(({ attributes, videoContainer, slideElements }) => {
    const {
        elementId,
        containerLayout,
        backgroundAnimated,
        background,
        backgroundOverlay,
        backgroundOverlayHover,
        cursorEffect,

        // Effects
        backgroundEffect,

        sticky = {},
        stickyShowOn,
        stickyEase,
        stickyPosition,
        stickyDuration,
        topSticky,
        bottomSticky,
    } = attributes;

    const isSlideShow = background?.slideImage?.length > 0;
    const advanceAnimationData = useAnimationAdvanceData(attributes);
    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);
    const isBackgroundEffect = (backgroundEffect !== undefined) && (backgroundEffect?.type !== 'none') && !isEmpty(backgroundEffect);

    const _isSticky = isSticky(sticky);
    const _isBgAnimated = isAnimationActive(backgroundAnimated);
    const dataId = elementId?.split('-')[1];

    const className = classnames(
        'guten-element',
        'guten-post-template',
        'guten-flex-container',
        containerLayout,
        elementId,
        animationClass,
        displayClass,
        {
            'background-animated': _isBgAnimated,
            'guten-background-slideshow': isSlideShow,
            'guten-video-background': background?.backgroundType === 'video' && background?.videoUrl,
            ['guten-cursor-effect']: cursorEffect?.show,
            'guten-background-effect-active': isBackgroundEffect,
            ['guten-sticky']: isSticky(sticky),
            [`sticky-${stickyPosition}`]: isSticky(sticky),
        }
    );

    return (
        <div {...useBlockProps.save({ className, ...advanceAnimationData, id: attributes.anchor })} data-id={dataId}>
            {(_isSticky || _isBgAnimated || isSlideShow) &&
                <div className="guten-data">
                    {_isSticky &&
                        <div data-var={`stickyData${dataId}`} data-value={JSON.stringify({
                            sticky,
                            stickyShowOn,
                            stickyPosition,
                            stickyEase,
                            stickyDuration,
                            topSticky,
                            bottomSticky
                        })} />
                    }
                    {_isBgAnimated &&
                        <div data-var={`bgAnimatedData${dataId}`} data-value={JSON.stringify({
                            ...backgroundAnimated
                        })} />
                    }
                    {isSlideShow &&
                        <div data-var={`backgroundSlideshow${dataId}`} data-value={JSON.stringify({
                            ...background
                        })} />
                    }
                </div>
            }
            {_isBgAnimated && <div className={'guten-background-animated'}><div className={`animated-layer animated-${dataId}`}>
                {isSlideShow && slideElements}
            </div></div>}
            {!_isBgAnimated && isSlideShow && slideElements}
            {isBackgroundEffect && <div className="guten-background-effect"><div className="inner-background-container"></div></div>}
            {videoContainer}
            {
                (!isEmpty(backgroundOverlay) || !isEmpty(backgroundOverlayHover)) && <div className="guten-background-overlay"></div>
            }
            {'boxed' === containerLayout ? <div className="guten-inner-container">
                <InnerBlocks.Content />
            </div> : <InnerBlocks.Content />}
        </div>
    );
});

export default save;
