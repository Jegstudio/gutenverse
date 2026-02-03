import { Default, u } from 'gutenverse-core-frontend';

class GutenversePopupBuilder extends Default {
    /* public */
    init() {
        this._elements.map((element) => {
            new GutenversePopupElement({
                element,
                playAnimation: this.playAnimation,
                getAnimationClass: this.getAnimationClass,
            });

            this.playAnimation(u(element).find('.guten-popup-content'));
        });
    }
}

class GutenversePopupElement {
    constructor({ element, playAnimation, getAnimationClass }) {
        this.element = u(element);
        this.popup = this.element.find('.guten-popup');
        this.overlay = this.element.find('.guten-popup-overlay');
        this.closeButton = this.element.find('.guten-popup-close');
        this.closeOverlay = this.element.data('close-overlay');
        this.dontRepeatPopup = this.element.data('hide');
        this.stickyWrapper = this.element.find('.sticky-wrapper');
        this.wrapperId = this.stickyWrapper.data('id');
        this.wrapper = this.element.find('.guten-popup-wrapper');
        this.content = this.element.find('.guten-popup-content');
        this.contentClass = this.content.attr('class');
        this.playAnimation = playAnimation;
        this.getAnimationClass = getAnimationClass;
        this.hasExitAnimation = this.element.data('exit-animation');
        this.exitAnimationDuration = this.element.data('exit-duration');
        this.exitAnimationDelay = this.element.data('exit-delay');
        this.shownOnce = localStorage.getItem(this.dontRepeatPopup);
        this.videoContainer = this.element.find('.guten-popup-video-container');
        this._addCloseClick();
        this._addLoadEvent();
        if (this.dontRepeatPopup === null || this.dontRepeatPopup === undefined) {
            localStorage.removeItem(localStorage.getItem('data-hide'));
        }
        if (this.videoContainer) {
            const container = this.videoContainer;
            this.videoPlayOn = this.element.data('video-play-on');
            this.videoPauseOnClose = this.element.data('video-pause-onclose');
            this.videoResetOnClose = this.element.data('video-reset-onclose');
            this.videoStart = this.element.data('video-start');
            let player = null;
            setTimeout(() => {
                const iframe = container?.find('iframe')?.first();
                if (!iframe) {
                    player = container?.find('video')?.first();
                    return;
                }

                const iframeId = iframe?.id;
                const iframeSrc = iframe?.src.toLowerCase();

                if (window.YT && (iframeSrc.includes('youtube.com') || iframeSrc.includes('youtube.be'))) {
                    player = window.YT.get(iframeId);
                }
            }, 500);
            this.player = () => ({
                playVideo: () => {
                    if (player) {
                        player.playVideo ? player.playVideo() : null;
                        player.play ? player.play() : null;

                    }
                },
                pauseVideo: () => {
                    if (player) {
                        player.pauseVideo ? player.pauseVideo() : null;
                        player.pause ? player.pause() : null;
                    }
                },
                seekTo: (timestamp) => {
                    if (player) {
                        player.seekTo ? player.seekTo(timestamp) : null;
                        if (player.currentTime && player.play) {
                            player.currentTime = timestamp;
                            player.play();
                        }
                    }
                },
            });
        }
        this.content.first().addEventListener('animationend', (e) => {
            e.stopPropagation();
            if (!this.content.hasClass('exit')) {
                // play animation and remove the animation class so it can be played again
                this.content.attr('class', this.contentClass.replaceAll('guten-element-hide', ''));
            } else if (this.hasExitAnimation) {
                this.__hideContainer();
            }
        });
    }

    __hideContainer() {
        this.popup.removeClass('show');
        this.content.removeClass('exit');
        this.popup.addClass('load');
        this.content.attr('class', this.contentClass);
        if (this.videoPauseOnClose === 'true') {
            this.player()?.pauseVideo();
        }
    }

    /* private */
    _showPopup() {
        if (this.dontRepeatPopup !== null) {
            localStorage.setItem('data-hide', this.dontRepeatPopup);
            if (this.shownOnce !== null) return;
        }
        this.playAnimation(this.element.find('.guten-popup-content'));
        this.popup.addClass('show');
        this.playAnimation(this.content);
        if (this.videoContainer) {
            if (this.videoResetOnClose === 'true') {
                this.player()?.seekTo(this.videoStart ? this.videoStart : 0);
            }
            if (this.videoPlayOn === 'first' && this.firstPlaying) {
                return;
            }
            if ((this.videoPlayOn === 'first' || this.videoPlayOn === 'every')) {
                this.player()?.playVideo();
                if (this.videoPlayOn === 'first') {
                    this.firstPlaying = true;
                }
            }
        }
    }

    _closePopup() {
        if (this.dontRepeatPopup !== null) localStorage.setItem(this.dontRepeatPopup, true);
        this.content.addClass('exit');
        if (!this.hasExitAnimation) {
            this.__hideContainer();
            return;
        }
    }

    _addCloseClick() {
        this.closeButton.on('click', (e) => {
            e.stopPropagation();
            this._closePopup();
        });

        if (this.closeOverlay === 'true') {
            this.overlay.on('click', (e) => {
                e.stopPropagation();
                this._closePopup();
            });

            this.wrapper.on('click', (e) => {
                e.stopPropagation();
                if (!this.content.first().contains(e.target)) {
                    this._closePopup();
                }
            });
        }
    }

    _addLoadEvent() {
        let anchor, waitTime, scrollDistance, scrollOffset, maxClick;
        let countClick = 0;

        const triggerType = this.element.data('trigger');
        const alreadyLoaded = () => this.popup.hasClass('load');

        switch (triggerType) {
            case 'load':
                waitTime = this.element.data('wait');
                waitTime = waitTime ? waitTime : 0;

                if (!alreadyLoaded()) {
                    setTimeout(() => {
                        this._showPopup();
                    }, waitTime);
                }

                break;

            case 'scroll':
                scrollDistance = this.element.data('scroll');
                scrollDistance = scrollDistance ? scrollDistance : 0;

                u(document).on('scroll', () => {
                    scrollOffset = (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0);

                    if (scrollOffset > scrollDistance && !alreadyLoaded()) {
                        this._showPopup();
                    }
                });

                break;

            case 'click':
                anchor = this.element.data('anchor');
                maxClick = this.element.data('max-click');

                anchor = anchor ? anchor : '';
                maxClick = maxClick ? parseInt(maxClick) : undefined;

                u(document)
                    .find(`*[href="#${anchor}"]`)
                    .on('click', (event) => {
                        if (!maxClick || countClick < maxClick) {
                            this._showPopup();
                            countClick += 1;
                        }
                        event.preventDefault();
                    });

                u(document)
                    .find(`#${anchor}`)
                    .on('click', (event) => {
                        if (!maxClick || countClick < maxClick) {
                            this._showPopup();
                            countClick += 1;
                        }
                        event.preventDefault();
                    });

                u(document)
                    .find(`.guten-wrap-helper[onclick^="window.open('#${anchor}'"]`)
                    .on('click', (event) => {
                        if (!maxClick || countClick < maxClick) {
                            this._showPopup();
                            countClick += 1;
                        }
                        event.preventDefault();
                    });

                break;
            case 'hover':
                anchor = this.element.data('anchor');
                maxClick = this.element.data('max-click');

                anchor = anchor ? anchor : '';
                maxClick = maxClick ? parseInt(maxClick) : undefined;

                u(document)
                    .find(`*[href="#${anchor}"]`)
                    .on('mouseover', () => {
                        if (!maxClick || countClick < maxClick) {
                            this._showPopup();
                            countClick += 1;
                        }
                    });

                u(document)
                    .find(`#${anchor}`)
                    .on('mouseover', (event) => {
                        if (!maxClick || countClick < maxClick) {
                            this._showPopup();
                            countClick += 1;
                        }
                        event.preventDefault();
                    });

                u(document)
                    .find(`.guten-wrap-helper[onclick^="window.open('#${anchor}'"]`)
                    .on('mouseover', (event) => {
                        if (!maxClick || countClick < maxClick) {
                            this._showPopup();
                            countClick += 1;
                        }
                        event.preventDefault();
                    });
                break;
            case 'exit':
                u(document.body).on('mouseleave', (e) => {
                    if (0 > e.clientY && !alreadyLoaded()) {
                        this._showPopup();
                    }
                });

                break;
        }
    }
}

const selected = u('.guten-popup-builder');

if (selected) {
    new GutenversePopupBuilder(selected);
}
