import { Default, u, load } from 'gutenverse-core-frontend';

class GutenverseVideo extends Default {
    /* public */
    init() {
        const elements = this._elements;
        const { framework_asset: path, framework_version } = window.GutenverseFrontendConfig;
        if (elements.length > 0) {
            load(path + 'js/ReactPlayer.standalone.js?ver=' + framework_version, (err) => {
                if (!err) {
                    elements.map(element => {
                        this._renderVideo(element);
                    });
                }

                window.addEventListener('resize', () => {
                    elements.map(element => {
                        this._calculateSize(element);
                    });
                }, true);
            });
        }
    }

    _calculateSize(element) {
        const wrapper = u(element).find('.guten-video-bg-wrapper');
        if (wrapper.length) {
            const inner = u(element).find('.guten-video-bg-wrapper > div');
            const wrapperSize = u(wrapper).size();

            const height = Math.floor(wrapperSize.width * 0.56);
            const width = Math.floor(wrapperSize.height / 0.56);

            if (height > wrapperSize.height) {
                inner.attr('style', `width: ${wrapperSize.width}px; height: ${height}px`);
            } else {
                inner.attr('style', `width: ${width}px; height: ${wrapperSize.height}px`);
            }
        }
    }

    /* private */
    _renderVideo(element) {
        const data = u(element).data('property');
        const videoData = data ? JSON.parse(data) : null;

        if (videoData && typeof videoData === 'object') {
            renderReactPlayer(element, videoData); // eslint-disable-line  

            setTimeout(() => {
                this._calculateSize(element);
                u(element).find('.guten-video-bg-wrapper').addClass('loaded');
            }, 1);
        }
    }
}

const selected = u('.guten-video-wrapper');

if (selected) {
    new GutenverseVideo(selected);
}