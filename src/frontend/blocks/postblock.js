import { Default, u } from 'gutenverse-core-frontend';
import isEmpty from 'lodash/isEmpty';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';

class GutenversePostblock extends Default {
    /* static attributes */
    static lazy_observer = null;
    /* public */
    init() {
        this._elements.map(element => {
            this._tabItems(element);
            // run lazy observer
            const images = this._detect_lazy_load(element);
            this._run_lazy_observer(images);
        });
    }

    /* private */
    _run_lazy_observer(images = []) {
        if ('IntersectionObserver' in window && !GutenversePostblock.lazy_observer) {
            const observer = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.classList.add('lazyloaded');
                        obs.unobserve(img);
                    }
                });
            }, {
                threshold: 0.5
            });
            GutenversePostblock.lazy_observer = observer;
        }
        images.forEach(img => GutenversePostblock.lazy_observer.observe(img));
    }

    /* private */
    _detect_lazy_load(element) {
        let images = [];
        element.querySelectorAll('img[loading="lazy"]').forEach(img => {
            if (img.complete && img.naturalHeight !== 0) {
                img.classList.add('lazyloaded');
            } else {
                images.push(img);
            }
        });

        return images;
    }

    /* private */
    _loadMore(element, settings) {
        const elementId = element.find('.guten-postblock').data('id');
        const {
            postId,
            inheritQuery,
            postType,
            postOffset,
            numberPost,
            column,
            includePost,
            excludePost,
            includeCategory,
            excludeCategory,
            includeAuthor,
            includeTag,
            excludeTag,
            sortBy,
            htmlTag,
            categoryEnabled,
            categoryPosition,
            excerptEnabled,
            excerptLength,
            excerptMore,
            readmoreEnabled,
            readmoreIcon,
            readmoreIconPosition,
            readmoreText,
            commentEnabled,
            commentIcon,
            commentIconPosition,
            metaEnabled,
            metaAuthorEnabled,
            metaAuthorByText,
            metaAuthorIcon,
            metaAuthorIconPosition,
            metaDateEnabled,
            metaDateType,
            metaDateFormat,
            metaDateFormatCustom,
            metaDateIcon,
            metaDateIconPosition,
            postblockType,
            paginationMode,
            paginationLoadmoreText,
            paginationLoadingText,
            paginationNumberPost,
            paginationScrollLimit,
            paginationIcon,
            paginationIconPosition,
            postItemMargin,
            postItemPadding,
            postItemBorder,
            thumbnailRadius,
            paginationMargin,
            paginationPadding,
            paginationBorder,
            hideDesktop,
            hideTablet,
            hideMobile,
            breakpoint,
            noContentText,
            backgroundHover,
            contentOrder,
            paginationLoadmoreAnimation,
            paginationLoadmoreAnimationSequence,
        } = settings;

        let query = null;
        let qApi = false;

        if (window['GutenverseData'] && !isEmpty(window['GutenverseData']['query'])) {
            query = window['GutenverseData']['query'];
            qApi = true;
        }

        element.find('.guten-block-loadmore').html(`<span>${paginationLoadingText}</span>`);
        setTimeout(() => {
            apiFetch({
                path: 'gutenverse-client/v1/postblock/data',
                method: 'POST',
                data: {
                    attributes: {
                        postItemMargin,
                        postItemPadding,
                        postItemBorder,
                        thumbnailRadius,
                        paginationMargin,
                        paginationPadding,
                        paginationBorder,
                        hideDesktop,
                        hideTablet,
                        hideMobile,
                        breakpoint,
                        noContentText,
                        backgroundHover,
                        elementId,
                        postId,
                        inheritQuery,
                        postType,
                        postOffset,
                        alreadyFetch: parseInt(numberPost),
                        numberPost: parseInt(numberPost) + parseInt(paginationNumberPost),
                        column,
                        includePost,
                        excludePost,
                        includeCategory,
                        excludeCategory,
                        includeAuthor,
                        includeTag,
                        excludeTag,
                        sortBy,
                        htmlTag,
                        categoryEnabled,
                        categoryPosition,
                        excerptEnabled,
                        excerptLength,
                        excerptMore,
                        readmoreEnabled,
                        readmoreIcon,
                        readmoreIconPosition,
                        readmoreText,
                        commentEnabled,
                        commentIcon,
                        commentIconPosition,
                        metaEnabled,
                        metaAuthorEnabled,
                        metaAuthorByText,
                        metaAuthorIcon,
                        metaAuthorIconPosition,
                        metaDateEnabled,
                        metaDateType,
                        metaDateFormat,
                        metaDateFormatCustom,
                        metaDateIcon,
                        metaDateIconPosition,
                        postblockType,
                        paginationMode,
                        paginationLoadmoreText,
                        paginationLoadingText,
                        paginationNumberPost,
                        paginationScrollLimit,
                        paginationIcon,
                        paginationIconPosition,
                        paginationLoadmoreAnimation,
                        paginationLoadmoreAnimationSequence,
                        qApi,
                        query
                    }
                }
            }).then((data) => {
                element.replace(data.rendered);
                element.find('.guten-block-loadmore').text(paginationLoadmoreText);

                if (paginationMode === 'scrollload' && this._shouldItBeLoading(element, settings)) {
                    const newElement = u(`.${elementId}.guten-post-block`);
                    const newSettings = JSON.parse(newElement.find('.guten-postblock').data('settings'));
                    this._loadMore(newElement, newSettings);
                } else {
                    this._tabItems(`.${elementId}.guten-post-block`);
                }
            }).catch(() => { });
        }, 500);
    }

    _shouldItBeLoading(element, settings) {
        const { numberPost, paginationScrollLimit } = settings;
        const button = element.find('.guten-block-loadmore');

        if (element.hasClass('hide-desktop') || element.hasClass('hide-tablet') || element.hasClass('hide-mobile')) {
            return false;
        }

        if (button.length > 0) {
            const position = button.first().getBoundingClientRect();

            if (position.y < (window.screen.height / 2) && position.y > 0) {
                if (parseInt(paginationScrollLimit) >= parseInt(numberPost) || parseInt(paginationScrollLimit) === 0) {
                    return true;
                }
            }
        }

        return false;
    }

    _paginatePosts(element, settings, direction) {
        const elementId = element.find('.guten-postblock').data('id');
        let currentPage = parseInt(element.find('.guten_block_nav').data('page') || 1);
        const postsPerPage = parseInt(settings.numberPost, 10);

        if (isNaN(direction)) {
            if (direction === 'next') {
                currentPage += 1;
            } else if (direction === 'prev') {
                if (currentPage > 1) {
                    currentPage -= 1;
                }
            }
        } else {
            currentPage = direction;
        }

        let query = null;
        let qApi = false;

        if (window['GutenverseData'] && !isEmpty(window['GutenverseData']['query'])) {
            query = window['GutenverseData']['query'];
            qApi = true;
        }

        apiFetch({
            path: 'gutenverse-client/v1/postblock/data',
            method: 'POST',
            data: {
                attributes: {
                    ...settings,
                    paged: currentPage,
                    numberPost: postsPerPage,
                    paginationNumberPost: postsPerPage,
                    qApi,
                    qSearch: query && query['q_search'],
                    qCategory: query && query['q_category_name'],
                    qTag: query && query['q_tag'],
                    qAuthor: query && query['q_author'],
                }
            }
        }).then((data) => {
            element.html(data.rendered);
            this._tabItems(`.${elementId}.guten-post-block`);
        }).catch(() => {
        });
    }

    _tabItems(element) {
        const blockElement = u(element);
        const settings = JSON.parse(blockElement.find('.guten-postblock').data('settings'));
        const { paginationMode } = settings;

        if (paginationMode === 'scrollload') {
            let timeout;
            const scrolling = () => {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    this._shouldItBeLoading(blockElement, settings) && this._loadMore(blockElement, settings);
                }, 500);
            };

            window.removeEventListener('scroll', scrolling);
            window.addEventListener('scroll', scrolling);
        }

        // Only bind AJAX handlers for AJAX pagination modes, not native modes
        if ((paginationMode === 'prevnext' || paginationMode === 'number') && paginationMode !== 'normal-prevnext' && paginationMode !== 'normal-number') {
            const prevButton = blockElement.find('.guten_block_nav .prev');
            const nextButton = blockElement.find('.guten_block_nav .next');

            prevButton.on('click', (event) => {
                event.preventDefault();
                if (!prevButton.hasClass('disabled')) {
                    this._paginatePosts(blockElement, settings, 'prev');
                }
            });

            nextButton.on('click', (event) => {
                event.preventDefault();
                if (!nextButton.hasClass('disabled')) {
                    this._paginatePosts(blockElement, settings, 'next');
                }
            });

            if (paginationMode === 'number') {
                if (paginationMode === 'number') {
                    const numberedButtons = document.querySelectorAll('.guten_block_nav .btn-pagination');
                    numberedButtons.forEach(button => {
                        const page = button.getAttribute('data-page');
                        if (page && !isNaN(page)) {
                            button.addEventListener('click', (event) => {
                                event.preventDefault();
                                this._paginatePosts(blockElement, settings, page);
                            });
                        }
                    });
                }
            }

        }


        blockElement.find('.guten-block-loadmore').on('click', () => {
            this._loadMore(blockElement, settings);
        });
    }
}

const selected = u('.guten-post-block');

if (selected) {
    new GutenversePostblock(selected);
}
