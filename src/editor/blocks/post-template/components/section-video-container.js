import { getDeviceType } from 'gutenverse-core/editor-helper';
import { VideoPreviewer } from 'gutenverse-core/components';
import { useRef, useEffect, useState } from '@wordpress/element';

const SectionVideoContainer = ({ attributes }) => {
    const { background = {} } = attributes;
    const {
        type,
        videoLink,
        videoPlayOnMobile = false,
        videoPlayOnce,
        videoStartTime = 0,
        videoEndTime = 0
    } = background;

    const deviceType = getDeviceType();
    const wrapperRef = useRef(null);
    const [innerSize, setInnerSize] = useState({ width: '100%', height: '100%' });

    const calculateSize = () => {
        if (wrapperRef.current) {
            const wrapper = wrapperRef.current;
            const wrapperWidth = wrapper.offsetWidth;
            const wrapperHeight = wrapper.offsetHeight;

            const height = Math.floor(wrapperWidth * 0.56);
            const width = Math.floor(wrapperHeight / 0.56);

            if (height > wrapperHeight) {
                setInnerSize({ width: `${wrapperWidth}px`, height: `${height}px` });
            } else {
                setInnerSize({ width: `${width}px`, height: `${wrapperHeight}px` });
            }
        }
    };

    useEffect(() => {
        // Calculate size on mount
        const timer = setTimeout(() => {
            calculateSize();
        }, 100);

        // Use ResizeObserver to detect parent container resize
        let resizeObserver;
        if (wrapperRef.current) {
            resizeObserver = new ResizeObserver(() => {
                calculateSize();
            });
            resizeObserver.observe(wrapperRef.current);
        }

        return () => {
            clearTimeout(timer);
            if (resizeObserver && wrapperRef.current) {
                resizeObserver.unobserve(wrapperRef.current);
                resizeObserver.disconnect();
            }
        };
    }, [videoLink]);

    const wrapperStyle = {
        zIndex: 0,
        top: 0,
        left: 0,
        position: 'absolute',
        overflow: 'hidden',
        pointerEvents: 'none',
        opacity: 1,
        width: '100%',
        height: '100%'
    };

    const playerConfig = {
        youtube: {
            playerVars: {
                showinfo: 0,
                start: parseInt(videoStartTime),
                end: parseInt(videoEndTime),
            },
        }
    };

    // If device is mobile and video is not set to play, return null
    if (deviceType === 'Mobile' && !videoPlayOnMobile) {
        return null;
    }

    // If there is no video type or no valid link, return null
    if (type !== 'video' || !videoLink) {
        return null;
    }
    return (
        <VideoPreviewer
            videoRef={wrapperRef}
            classNames="guten-video-bg-wrapper"
            videoSrc={videoLink}
            hideControls={true}
            width={innerSize.width}
            height={innerSize.height}
            playing={true}
            muted={true}
            loop={!videoPlayOnce}
            config={playerConfig}
            styles={wrapperStyle}
            wrapperStyles={[
                `
                    body{
                        width: 100%;
                        height: 100%;
                        overflow: hidden;
                    }
                    body > div {
                        width: ${innerSize.width};
                        height: ${innerSize.height};
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                    }
                    body > div > div {
                        height: 100%;
                    }
                `
            ]}
        />
    );
};

export default SectionVideoContainer;
