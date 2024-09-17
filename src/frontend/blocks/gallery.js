import { Default, u } from 'gutenverse-core-frontend';

class GutenverseGallery extends Default {
    /* public */
    init() {
        const $this = this;

        window.onload = function () {
            if ($this._elements.length > 0) {
                const promiseShuffle = import(/* webpackChunkName: "chunk-shufflejs" */'shufflejs');
                const promiseSwiper = import(/* webpackChunkName: "chunk-swiper" */'swiper');
                const promiseSwiperModule = import(/* webpackChunkName: "chunk-swiper-modules" */'swiper/modules');

                Promise.all([promiseShuffle, promiseSwiper, promiseSwiperModule])
                    .then((result) => {
                        const { default: Shuffle } = result[0];
                        const { default: Swiper } = result[1];
                        const { Navigation, Pagination, Zoom } = result[2];

                        Swiper.use([Navigation, Pagination, Zoom]);

                        $this._loadGallery({Shuffle, Swiper});
                    });
            }
        };
    }

    /* private */

    _loadGallery({Shuffle, Swiper}) {
        const $this = this;
        $this._elements.map(element => {
            const promiseImages = u(element).find('.gallery-item-wrap img').nodes.map((img) => 
                new Promise((resolve, reject) => {
                    img.onload = () => {
                        if (img.complete && img.naturalHeight !== 0) {
                            resolve(img);
                        } else {
                            reject(new Error('Image is not completely loaded or has a height of zero.'));
                        }
                    };
                    img.onerror = () => {
                        reject(new Error('Failed to load image.'));
                    };
                    if (img.src) {
                        const src = img.src;
                        img.src = '';
                        img.src = src;
                    }
                })
            );

            Promise.allSettled([...promiseImages])
                .then(() => {
                    $this._addSliderEffect(element, Swiper);
                    $this._addEvents(element, Shuffle);
                });
        });
    }

    _requestFullscreen(popup) {
        if (popup.requestFullscreen) {
            popup.requestFullscreen();
        } else if (popup.webkitRequestFullscreen) {
            popup.webkitRequestFullscreen();
        } else if (popup.mozRequestFullScreen) {
            popup.mozRequestFullScreen();
        } else if (popup.msRequestFullscreen) {
            popup.msRequestFullscreen();
        }
    }

    _exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }

    _addSliderEffect(element, Swiper) {
        const $this = this;
        const thisElement = u(element);
        const gallery = thisElement.find('.gallery-items');
        const zoom = gallery.data('zoom');

        if (zoom === 'disable') return;

        const galleryPopup = thisElement.find('.gutenverse-popup-gallery');
        const galleryItems = thisElement.find('.gallery-item-wrap');
        const sliderContainer = thisElement.find('.swiper-container');
        const popupMinimize = galleryPopup.find('.gallery-header .icon-minimize');
        const popupFullscreen = galleryPopup.find('.gallery-header .icon-fullscreen');
        const id = sliderContainer.attr('id');
        let swiper = null;

        galleryItems.map(item => {
            const triggerItem = zoom === 'button' ? u(item).find('.gallery-link.zoom') : u(item);

            triggerItem.on('click', () => {
                const activeIndex = u(item).data('index');

                const settings = {
                    initialSlide: parseInt(activeIndex),
                    loop: true,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    zoom: {
                        maxRatio: 2,
                    },
                    spaceBetween: 10,
                    slidesPerView: 1,
                    observer: true,
                    observeParents: true,
                };

                swiper = new Swiper(`.${id} .swiper-container`, settings);

                galleryPopup.hasClass('hidden') ? galleryPopup.removeClass('hidden') : galleryPopup.addClass('hidden');
            });
        });

        galleryPopup.find('.gallery-header .icon-zoom').on('click', () => {
            const activeSlider = galleryPopup.find('.swiper-slide.swiper-slide-active');

            if (!swiper) {
                return;
            }

            if (activeSlider.hasClass('zoomed')) {
                swiper.zoom.out();
                activeSlider.removeClass('zoomed');
            } else {
                swiper.zoom.in();
                activeSlider.addClass('zoomed');
                activeSlider.siblings().removeClass('zoomed');
            }
        });

        galleryPopup.find('.gallery-header .icon-close').on('click', () => {
            const activeSlider = galleryPopup.find('.swiper-slide.swiper-slide-active');
            galleryPopup.addClass('hidden');
            popupFullscreen.hasClass('hidden') && $this._exitFullscreen();
            popupFullscreen.removeClass('hidden');
            popupMinimize.addClass('hidden');
            swiper.zoom.out();
            activeSlider.removeClass('zoomed');
        });

        popupFullscreen.on('click', () => {
            popupFullscreen.addClass('hidden');
            popupMinimize.removeClass('hidden');
            $this._requestFullscreen(galleryPopup.first());
        });

        popupMinimize.on('click', () => {
            popupFullscreen.removeClass('hidden');
            popupMinimize.addClass('hidden');
            $this._exitFullscreen();
        });
    }

    _addEvents(element, Shuffle) {
        const thisElement = u(element);
        const filterPopup = thisElement.find('.search-filter-controls');
        const elementClassNames = thisElement.nodes[0].className;
        const shuffle = new Shuffle(thisElement.find('.gallery-items').first(), {
            itemSelector: '.gallery-item-wrap',
            sizer: '.gallery-sizer-element',
            speed: 500
        });
        const onSearch = (shuffle, elementClassNames) => {
            const thisElement = u(`.${elementClassNames.split(' ').slice(0, 3).join('.')}`);
            const searchElement = thisElement.find('#guten-gallery-search-box-input');
            let searchValue = '';
            let filterText = '';
            if (searchElement.length > 0) {
                searchValue = searchElement.first().value.toLowerCase();
                filterText = thisElement.find('.search-filter-trigger span').text().toLowerCase();
            } else {
                const filterElement = thisElement.find('.guten-gallery-control.active');
                filterText = filterElement.text().toLowerCase();
            }
            const filterValue = filterText === 'all' ? '' : filterText;
            const isValid = (item) => {
                const element = u(item);
                const controlText = element.data('control');
                const titleText = element.find('.item-title').text();
                const contentText = element.find('.item-content').text();
                const categoryText = element.find('.caption-category span').text();

                return (controlText.toLowerCase()).includes(filterValue) && ((titleText.toLowerCase()).includes(searchValue) || (contentText.toLowerCase()).includes(searchValue) || (categoryText.toLowerCase()).includes(searchValue));
            };

            shuffle && shuffle.filter(item => isValid(item));
        }
        thisElement.find('#guten-gallery-search-box-input').on('change keyup', e => onSearch(shuffle, elementClassNames));
        thisElement.find('.guten-gallery-control').on('click', e => {
            const filter = u(e.target).data('filter');
            thisElement.find('#search-filter-trigger span').text(filter ? filter : 'All');
            u(e.target).addClass('active');
            u(e.target).siblings().removeClass('active');
            onSearch(shuffle, elementClassNames);
        });

        thisElement.find('.guten-gallery-load-more').on('click', (e) => {
            e.preventDefault();
            const gallery = thisElement.find('.gallery-items');
            const loaded = parseInt(gallery.data('loaded'));
            let more = parseInt(gallery.data('more'));
            if( !more ){
                more = 2;
            }
            const max = parseInt(gallery.data('max'));
            const total = loaded + more;
            const items = gallery.find('.gallery-item-wrap');
            if (total - more <= max) {
                items.map((item, index) => {
                    if (index >= loaded && index < total) {
                        u(item).removeClass('item-hidden');
                        shuffle.update();
                    }
                });

                gallery.data('loaded', total);
            }

            total >= max && thisElement.find('.load-more-items').remove();
        });

        thisElement.find('#guten-gallery-search-box').on('submit', e => e.preventDefault());

        thisElement.find('#search-filter-trigger').on('click', () => filterPopup.hasClass('open-controls') ? filterPopup.removeClass('open-controls') : filterPopup.addClass('open-controls'));

    }
}

export default GutenverseGallery;