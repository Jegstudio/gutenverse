import { Default, u } from 'gutenverse-core-frontend';

class GutenverseGallery extends Default {
    /* public */
    init() {
        const $this = this;

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
    }

    /* private */

    _loadGallery({Shuffle, Swiper}) {
        const $this = this;
        $this._elements.map(element => {
            const promiseImages = u(element).find('.gallery-item-wrap:not(.item-hidden) img').nodes.map((img) =>
                new Promise((resolve) => {
                    if (img.complete && img.naturalHeight !== 0) {
                        resolve(img);
                        return;
                    }

                    img.onload = () => resolve(img);
                    img.onerror = () => resolve(img);

                    if (img.src) {
                        const src = img.src;
                        img.src = '';
                        img.src = src;
                    } else {
                        resolve(img);
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

    _getFilterSearchValue(elementClassNames) {
        const thisElement = u(`.${elementClassNames.split(' ').slice(0, 3).join('.')}`);
        const searchElement = thisElement.find('#guten-gallery-search-box-input');
        let searchValue = '';
        let filterText = '';
        if (searchElement.length > 0) {
            searchValue = searchElement.first().value.toLowerCase();
            filterText = thisElement.find('.search-filter-trigger span').text().toLowerCase();
            if(thisElement.find('.search-filter-trigger').attr('data-flag-all')) {
                filterText = 'all';
            }
        } else {
            const filterElement = thisElement.find('.guten-gallery-control.active');
            const isAll = filterElement.data('flag-all') ?? false;
            if (isAll) {
                filterText = 'all';
            } else {
                filterText = filterElement.text().toLowerCase();
            }
        }
        const filterValue = filterText === 'all' ? '' : filterText;
        return {searchValue, filterValue};
    }

    _addSliderEffect(element, Swiper) {
        const $this = this;
        const thisElement = u(element);
        const elementClassNames = thisElement.nodes[0].className;
        const gallery = thisElement.find('.gallery-items');
        const zoom = gallery.data('zoom');
        const slides = thisElement.find('.swiper-slide').nodes;

        if (zoom === 'disable') return;

        const galleryPopup = thisElement.find('.gutenverse-popup-gallery');
        const galleryItems = thisElement.find('.gallery-item-wrap');
        const sliderContainer = thisElement.find('.swiper-container');
        const popupMinimize = galleryPopup.find('.gallery-header .icon-minimize');
        const popupFullscreen = galleryPopup.find('.gallery-header .icon-fullscreen');
        let swiper = null;

        galleryItems.map(item => {
            const triggerItem = zoom === 'button' ? u(item).find('.gallery-link.zoom') : u(item);

            triggerItem.on('click', () => {
                let activeIndex = u(item).data('index');

                const { searchValue, filterValue } = $this._getFilterSearchValue(elementClassNames);
                let slideLength = 0;
                slides.forEach((slide) => {
                    slide.remove();
                    const controlText = slide.getAttribute('data-filter') ?? '';
                    const titleText = slide.getAttribute('data-title') ?? '';
                    const contentText = slide.getAttribute('data-content') ?? '';
                    const categoryText = slide.getAttribute('data-category') ?? '';
                    const dataIndex = slide.getAttribute('data-index') ?? -1;

                    if ((controlText.toLowerCase()).includes(filterValue) && ((titleText.toLowerCase()).includes(searchValue) || (contentText.toLowerCase()).includes(searchValue) || (categoryText.toLowerCase()).includes(searchValue))) {
                        sliderContainer.find('.swiper-wrapper').append(slide);
                        if (dataIndex === activeIndex) {
                            activeIndex = slideLength;
                        }
                        slideLength++;
                    }

                });

                const nextEl = galleryPopup.find('.swiper-button-next').nodes[0];
                const prevEl = galleryPopup.find('.swiper-button-prev').nodes[0];

                const settings = {
                    initialSlide: parseInt(activeIndex),
                    loop: true,
                    navigation: {
                        nextEl: nextEl,
                        prevEl: prevEl,
                    },
                    zoom: {
                        maxRatio: 2,
                    },
                    spaceBetween: 10,
                    slidesPerView: 1,
                    observer: true,
                    observeParents: true,
                };

                galleryPopup.removeClass('hidden');
                swiper = new Swiper(sliderContainer.nodes[0], settings);

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
            swiper.destroy(true, true);
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
        const $this = this;
        const thisElement = u(element);
        const filterPopup = thisElement.find('.search-filter-controls');
        const elementClassNames = thisElement.nodes[0].className;
        const shuffle = new Shuffle(thisElement.find('.gallery-items').first(), {
            itemSelector: '.gallery-item-wrap',
            sizer: '.gallery-sizer-element',
            speed: 500
        });
        const onSearch = (shuffle, elementClassNames) => {
            const { searchValue, filterValue } = $this._getFilterSearchValue(elementClassNames);
            const isValid = (item) => {
                const element = u(item);
                const controlText = element.data('control');
                const titleText = element.find('.item-title').text();
                const contentText = element.find('.item-content').text();
                const categoryText = element.find('.caption-category span').text();

                return (controlText.toLowerCase()).includes(filterValue) && ((titleText.toLowerCase()).includes(searchValue) || (contentText.toLowerCase()).includes(searchValue) || (categoryText.toLowerCase()).includes(searchValue));
            };

            shuffle && shuffle.filter(item => isValid(item));
        };
        thisElement.find('#guten-gallery-search-box-input').on('change keyup', () => onSearch(shuffle, elementClassNames));
        thisElement.find('.guten-gallery-control').on('click', e => {
            const control = u(e.target);
            const filter = control.data('filter');
            const isFlagAll = control.data('flag-all');
            thisElement.find('#search-filter-trigger span').text(filter ? filter : 'All');
            thisElement.find('#search-filter-trigger').attr('data-flag-all', isFlagAll);
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
            const newItems = [];

            if (total - more <= max) {
                items.map((item, index) => {
                    if (index >= loaded && index < total) {
                        u(item).removeClass('item-hidden');
                        newItems.push(item);
                    }
                });

                const promiseImages = newItems.map(item => {
                    return u(item).find('img').nodes.map(img =>
                        new Promise((resolve) => {
                            if (img.complete && img.naturalHeight !== 0) {
                                resolve(img);
                                return;
                            }
                            img.onload = () => resolve(img);
                            img.onerror = () => resolve(img);
                            if (img.src) {
                                const src = img.src;
                                img.src = '';
                                img.src = src;
                            } else {
                                resolve(img);
                            }
                        })
                    );
                }).flat();

                Promise.allSettled(promiseImages).then(() => {
                    shuffle.update();
                });

                gallery.data('loaded', total);
            }

            total >= max && thisElement.find('.load-more-items').remove();
        });

        thisElement.find('#guten-gallery-search-box').on('submit', e => e.preventDefault());

        thisElement.find('#search-filter-trigger').on('click', () => filterPopup.hasClass('open-controls') ? filterPopup.removeClass('open-controls') : filterPopup.addClass('open-controls'));

    }
}

const selected = u('.guten-gallery');

if (selected) {
    new GutenverseGallery(selected);
}