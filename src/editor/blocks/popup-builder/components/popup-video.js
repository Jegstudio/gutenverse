import { VideoPreviewer } from 'gutenverse-core/components';
import { isEmpty } from 'gutenverse-core/helper';

const VideoContainer = ({ popupVideoSrc, popupVideoStart, popupVideoEnd, popupVideoHideControls, popupVideoLoop, popupVideoMuted, videoRef, playing, elementId }) => {
    return popupVideoSrc ? (
        <VideoPreviewer
            videoRef={videoRef}
            classNames={`guten-video-background popup-video-${elementId}`}
            videoSrc={popupVideoSrc}
            hideControls={popupVideoHideControls}
            width={'100%'}
            height={'100%'}
            playing={playing}
            muted={popupVideoMuted}
            loop={popupVideoLoop}
            start={popupVideoStart}
            end={popupVideoEnd}
            wrapperStyles={['body{height: 100%;}', 'body > div:first-child, body > div:first-child > div:first-child{height: 100%;}']}
        />
    ) : null;
};

const PopupVideoContent = (props) => {
    const { attributes, videoRef, playing, setPlaying } = props;
    return <div className="guten-popup-video-container">
        <figure className="guten-element guten-video">
            {!isEmpty(attributes?.popupVideoSrc) ? <VideoContainer {...attributes} videoRef={videoRef} playing={playing} setPlaying={setPlaying} /> : null}
        </figure>
    </div>;
};
export default PopupVideoContent;