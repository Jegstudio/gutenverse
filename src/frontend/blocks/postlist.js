import { Default, u, addQueryArgs, apiFetch } from 'gutenverse-core-frontend';
import isEmpty from 'lodash/isEmpty';

class GutenversePostlist extends Default {
    /* public */
    init() {
        this._elements.map(element => {
            this._tabItems(element);
        });
    }

    /* private */
    _loadMore(element, settings) {
        const elementId = element.find('.guten-postlist').data('id');
        const {
            postId,
            inheritQuery,
            postType,
            postOffset,
            numberPost,
            includePost,
            excludePost,
            includeCategory,
            excludeCategory,
            includeAuthor,
            includeTag,
            excludeTag,
            sortBy,
            layout,
            imageEnabled,
            backgroundImageEnabled,
            iconEnabled,
            icon,
            metaEnabled,
            metaDateEnabled,
            metaDateType,
            metaDateFormat,
            metaDateFormatCustom,
            metaDateIcon,
            metaDateIconPosition,
            metaCategoryEnabled,
            metaCategoryIcon,
            metaPosition,
            paginationMode,
            paginationLoadmoreText,
            paginationLoadingText,
            paginationNumberPost,
            paginationScrollLimit,
            paginationIcon,
            paginationIconPosition,
        } = settings;

        let query = null;
        let qApi  = false;

        if (window['GutenverseData'] && !isEmpty(window['GutenverseData']['query'])) {
            query = window['GutenverseData']['query'];
            qApi  = true;
        }

        element.find('.guten-block-loadmore').html(`<span>${paginationLoadingText}</span>`)

        apiFetch({
            path: addQueryArgs('/gutenverse-client/v1/postlist/data', {
                context: 'edit',
                attributes: {
                    elementId,
                    postId,
                    inheritQuery,
                    postType,
                    postOffset,
                    numberPost: parseInt(numberPost) + parseInt(paginationNumberPost),
                    includePost,
                    excludePost,
                    includeCategory,
                    excludeCategory,
                    includeAuthor,
                    includeTag,
                    excludeTag,
                    sortBy,
                    layout,
                    imageEnabled,
                    backgroundImageEnabled,
                    iconEnabled,
                    icon,
                    metaEnabled,
                    metaDateEnabled,
                    metaDateType,
                    metaDateFormat,
                    metaDateFormatCustom,
                    metaDateIcon,
                    metaDateIconPosition,
                    metaCategoryEnabled,
                    metaCategoryIcon,
                    metaPosition,
                    paginationMode,
                    paginationLoadmoreText,
                    paginationLoadingText,
                    paginationNumberPost,
                    paginationScrollLimit,
                    paginationIcon,
                    paginationIconPosition,
                    qApi,
                    qSearch: query && query['q_search'],
                    qCategory: query && query['q_category_name'],
                    qTag: query && query['q_tag'],
                    qAuthor: query && query['q_author'],
                },
            }),
        }).then((data) => {
            element.replace(data.rendered);
            element.find('.guten-block-loadmore').text(paginationLoadmoreText);

            if (paginationMode === 'scrollload' && this._shouldItBeLoading(element, settings)) {
                const newElement = u(`.${elementId}.guten-post-list`);
                const newSettings = JSON.parse(newElement.find('.guten-postlist').data('settings'));
                this._loadMore(newElement, newSettings);
            } else {
                this._tabItems(`.${elementId}.guten-post-list`);
            }
        }).catch(() => {});
    }

    _shouldItBeLoading(element, settings) {
        const { numberPost, paginationScrollLimit } = settings;
        const button = element.find('.guten-block-loadmore');

        if (button.length > 0) {
            const position = button.first().getBoundingClientRect();

            if ( position.y < ( window.screen.height/2 ) ) {
                if (parseInt(paginationScrollLimit) >= parseInt(numberPost) || parseInt(paginationScrollLimit) === 0) {
                    return true;
                }
            }
        }

        return false;
    }

    _paginatePosts(element, settings, direction) {
        const elementId = element.find('.guten-postlist').data('id');
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
            path: addQueryArgs('/gutenverse-client/v1/postlist/data', {
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
                },
            }),
        }).then((data) => {
            element.html(data.rendered);
            this._tabItems(`.${elementId}.guten-post-list`);
        }).catch(() => {
        });
    }


    _tabItems(element) {
        const blockElement = u(element);
        const settings = JSON.parse(blockElement.find('.guten-postlist').data('settings'));
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

        if (paginationMode === 'prevnext' || paginationMode === 'number') {
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

export default GutenversePostlist;
