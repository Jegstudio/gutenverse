import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useRef } from '@wordpress/element';
import { useState } from '@wordpress/element';
import { RichText, useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { Button, classnames } from 'gutenverse-core/components';
import { __ } from '@wordpress/i18n';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';
import { CopyElementToolbar } from 'gutenverse-core/components';
import PopupVideoContent from './components/popup-video';
import { renderIcon } from 'gutenverse-core/helper';

const PopupBuilder = (props) => {
    const {
        attributes,
        setAttributes,
        clientId
    } = props;
    const {
        elementId,
        position,
        contentPosition,
        sideMode,
        closePopupOverlay,
        showCloseButton,
        closeIcon,
        closeIconType,
        closeIconSVG,
        closePosition,
        exitAnimation,
        popupType,
        popupVideoPlayOn,
        popupVideoStart,
        popupVideoPauseOnClose,
        popupVideoResetOnClose,
        popupVideoSrc,
    } = attributes;

    const [show, setShow] = useState(false);
    const [exit, setExit] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [firstPlaying, setFirstPlaying] = useState(true);
    const [videoSrc, setVideoSrc] = useState(popupVideoSrc);

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const elementRef = useRef();
    const containerRef = useRef();
    const deviceType = getDeviceType();

    const videoRef = useRef();

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);
    const innerBlocksProps = useInnerBlocksProps({
        className: classnames('guten-popup-container')
    }, {
        template: [
            ['gutenverse/popup-container', {
                position: 'above',
            }],
            ['gutenverse/popup-container', {
                position: 'bottom',
            }],
        ],
        allowedBlocks: ['gutenverse/popup-container'],
        renderAppender: false,
    });

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-popup-builder',
            `guten-popup-${deviceType}`,
            elementId,
            displayClass,
        ),
        ref: elementRef,
        'data-close-overlay': closePopupOverlay
    });

    const sendToPlayer = (command) => {
        const iframe = videoRef.current?.querySelector('iframe');
        const innerIframe = iframe.contentDocument.querySelector('iframe');
        if (innerIframe && innerIframe.contentWindow) {
            innerIframe.contentWindow.postMessage(command, '*');
        }
    };

    const toggleShow = () => {
        setShow((show) => !show);
        if (popupVideoResetOnClose && videoRef.current) {
            // videoRef.current.seekTo(popupVideoStart);
            const message = JSON.stringify({
                event: 'command',
                func: 'seekTo',
                args: [popupVideoStart, true],
            });
            sendToPlayer(message);
        }
        if (popupVideoPlayOn === 'first' && !firstPlaying) {
            return;
        }
        if (popupVideoPlayOn === 'first' || popupVideoPlayOn === 'every') {
            setPlaying(true);
            const message = JSON.stringify({
                event: 'command',
                func: 'playVideo',
                args: []
            });
            sendToPlayer(message);
            if (popupVideoPlayOn === 'first') {
                setFirstPlaying(false);
            }
        }
    };
    const hideContainer = () => {
        setShow(false);
        setExit(false);
        if (popupVideoPauseOnClose) {
            setPlaying(false);
            const message = JSON.stringify({
                event: 'command',
                func: 'pauseVideo',
                args: []
            });
            sendToPlayer(message);
        }
    };
    const hidePopup = () => {
        setExit(true);
        if (!exitAnimation) {
            hideContainer();
        }
    };

    const overlayClicked = () => { closePopupOverlay ? hidePopup() : null; };

    const hideClickContainer = (e) => {
        if (containerRef.current && !containerRef.current.contains(e.target)
            && !(e.target.closest('#gutenverse-root'))
            && !(e.target.closest('.components-popover'))
            && !(e.target.closest('.interface-interface-skeleton__sidebar'))) {
            overlayClicked();
        }
    };

    const selectVideoSrc = () => {
        return <div className="guten-video">
            <div className="video-url-wrapper">
                <RichText
                    className={'video-url'}
                    tagName={'span'}
                    aria-label={__('Video URL', 'gutenverse')}
                    placeholder={__('Type/Paste Video URL Here', 'gutenverse')}
                    value={videoSrc}
                    onChange={setVideoSrc}
                    withoutInteractiveFormatting
                />
                <Button isPrimary onClick={() => setAttributes({ popupVideoSrc: videoSrc })}>{__('Render Video')}</Button>
            </div>
        </div>;
    };

    const renderContent = () => {
        switch (popupType) {
            case 'youtube':
                return popupVideoSrc ? <PopupVideoContent playing={playing} setPlaying={setPlaying} attributes={attributes} videoRef={videoRef} /> : selectVideoSrc();
            default:
                return <div {...innerBlocksProps} />;
        }
    };

    const animationEndHandler = (e) => {
        e.stopPropagation();
        if (exit) {
            hideContainer();
        }
    };

    return <>
        <CopyElementToolbar {...props} />
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
        <div {...blockProps}>
            <div className="guten-popup-holder" onClick={toggleShow}>
                <h1>{__('Popup Builder', 'gutenverse')}</h1>
                <span>{__('This block doesn\'t render on frontend. Click to show popup.', 'gutenverse')}</span>
            </div>
            {<div className={classnames(
                {
                    'show': show
                },
                'guten-popup',
                `guten-popup-${position}`,
                `guten-popup-side-${sideMode}`,
            )}>
                <div className="guten-popup-overlay" onClick={overlayClicked}></div>
                {showCloseButton && closePosition === 'overlay' && <div className="guten-popup-close" onClick={hidePopup}>
                    {renderIcon(closeIcon, closeIconType, closeIconSVG)}
                </div>}
                <div onClick={hideClickContainer} className={classnames(
                    'guten-popup-wrapper',
                    `guten-popup-wrapper-${contentPosition}`,
                )}>
                    <div ref={containerRef} onAnimationEnd={animationEndHandler} className={classnames(
                        'guten-popup-content',
                        animationClass,
                        exit ? 'exit' : '',
                        !animationClass.animated && exitAnimation ? 'animated' : ''
                    )}>
                        {showCloseButton && closePosition === 'container' && <div className="guten-popup-close" onClick={hidePopup}>
                            {renderIcon(closeIcon, closeIconType, closeIconSVG)}
                        </div>}
                        {renderContent()}
                    </div>
                </div>
            </div>}
        </div>
    </>;
};

export default PopupBuilder;