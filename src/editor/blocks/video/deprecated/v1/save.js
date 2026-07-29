import { classnames } from 'gutenverse-core/components';
import { compose } from '@wordpress/compose';
import { withAnimationAdvanceScript, withMouseMoveEffectScript } from 'gutenverse-core/hoc';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';
import { useAnimationAdvanceData } from 'gutenverse-core/hooks';

const save = compose(
    withAnimationAdvanceScript('video'),
    withMouseMoveEffectScript
)((props) => {
    const {
        attributes
    } = props;

    const {
        elementId,
        videoType,
        videoSrc,
        start,
        end,
        hideControls,
        captionType,
        captionOriginal,
        captionCustom,
        playing,
        muted,
        loop,
        width,
        height,
    } = attributes;

    const advanceAnimationData = useAnimationAdvanceData(attributes);
    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);

    const className = classnames(
        'guten-element',
        'guten-video',
        elementId,
        animationClass,
        displayClass,
    );

    const style = {};
    const config = {
        youtube: {
            playerVars: {
                start,
                end
            }
        }
    };

    const dataProperties = JSON.stringify({
        url: videoSrc,
        class: 'guten-video-background',
        width: width && width['Desktop'] ? `${width['Desktop']}%` : '100%',
        height: height && height['Desktop'] ? `${height['Desktop']}px` : '500px',
        playing: playing,
        muted: muted,
        loop: loop,
        controls: !hideControls,
        playsinline: true,
        style,
        config
    });

    const videoRender = () => {
        switch (videoType) {
            case 'externalLink':
                return <div className="guten-video-wrapper" data-property={dataProperties}></div>;
            default:
                return <video controls={!hideControls} src={videoSrc} autoPlay={playing} muted={muted} loop={loop} />;
        }
    };

    const caption = () => {
        switch (captionType) {
            case 'original':
                return <span className="guten-caption">{captionOriginal}</span>;
            case 'custom':
                return <span className="guten-caption">{captionCustom}</span>;
            default:
                return null;
        }
    };

    return (
        <figure className={className} {...advanceAnimationData}>
            {videoSrc ? videoRender() : null}
            {videoSrc ? caption() : null}
        </figure>
    );
});

export default save;