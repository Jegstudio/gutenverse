import { renderIcon } from 'gutenverse-core/helper';

const PostBlockPagination = (props) => {
    const {
        paginationMode,
        paginationLoadmoreText,
        paginationIcon,
        paginationIconType,
        paginationIconSVG,
        paginationIconPosition,
        paginationPrevNextText,
        paginationPrevText,
        paginationNextText,
        paginationPrevIcon,
        paginationPrevIconType,
        paginationPrevIconSVG,
        paginationNextIcon,
        paginationNextIconType,
        paginationNextIconSVG,
        currentPage = 1,
        totalPages = 1
    } = props;

    if (!paginationMode || paginationMode === 'disable') {
        return null;
    }

    const renderLoadMore = () => {
        const iconHtml = renderIcon(paginationIcon, paginationIconType, paginationIconSVG);
        return (
            <div className="guten-block-pagination guten-align">
                <div className={`guten-block-loadmore icon-position-${paginationIconPosition || 'before'}`}>
                    <span data-load="Load More" data-loading="Loading...">
                        {paginationIconPosition === 'before' && iconHtml}
                        {paginationLoadmoreText}
                        {paginationIconPosition === 'after' && iconHtml}
                    </span>
                </div>
            </div>
        );
    };

    const renderPrevNext = () => {
        return (
            <div className="guten_block_nav additional_class" data-page={currentPage}>
                <a
                    href="#"
                    data-href="#"
                    className={`btn-pagination prev ${currentPage === 1 ? 'disabled' : ''}`}
                    title="Prev"
                >
                    {renderIcon(paginationPrevIcon, paginationPrevIconType, paginationPrevIconSVG)}{' '}
                    {paginationPrevNextText ? paginationPrevText : ''}
                </a>
                <a
                    href="#"
                    data-href="#"
                    className={`btn-pagination next ${currentPage >= totalPages ? 'disabled' : ''}`}
                    title="Next"
                >
                    {paginationPrevNextText ? paginationNextText : ''}{' '}
                    {renderIcon(paginationNextIcon, paginationNextIconType, paginationNextIconSVG)}
                </a>
            </div>
        );
    };

    const renderNumber = () => {
        const pages = [];
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, currentPage + 2);

        // Show first page
        if (startPage > 1) {
            pages.push(
                <a
                    key="page-1"
                    href="#"
                    data-href="#"
                    className="btn-pagination"
                    data-page="1"
                >
                    1
                </a>
            );
            if (startPage > 2) {
                pages.push(<span key="dots-start">...</span>);
            }
        }

        // Show page numbers
        for (let i = startPage; i <= endPage; i++) {
            if (i === currentPage) {
                pages.push(
                    <span key={`page-${i}`} className="btn-pagination current">
                        {i}
                    </span>
                );
            } else {
                pages.push(
                    <a
                        key={`page-${i}`}
                        href="#"
                        data-href="#"
                        className="btn-pagination"
                        data-page={i}
                    >
                        {i}
                    </a>
                );
            }
        }

        // Show last page
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pages.push(<span key="dots-end">...</span>);
            }
            pages.push(
                <a
                    key={`page-${totalPages}`}
                    href="#"
                    data-href="#"
                    className="btn-pagination"
                    data-page={totalPages}
                >
                    {totalPages}
                </a>
            );
        }

        return (
            <div className="guten_block_nav" data-page={currentPage}>
                <a
                    href="#"
                    data-href="#"
                    className={`btn-pagination prev ${currentPage === 1 ? 'disabled' : ''}`}
                    title="Prev"
                >
                    {renderIcon(paginationPrevIcon, paginationPrevIconType, paginationPrevIconSVG)}{' '}
                    {paginationPrevNextText ? paginationPrevText : ''}
                </a>
                {pages}
                <a
                    href="#"
                    data-href="#"
                    className={`btn-pagination next ${currentPage >= totalPages ? 'disabled' : ''}`}
                    title="Next"
                >
                    {paginationPrevNextText ? paginationNextText : ''}{' '}
                    {renderIcon(paginationNextIcon, paginationNextIconType, paginationNextIconSVG)}
                </a>
            </div>
        );
    };

    switch (paginationMode) {
        case 'loadmore':
        case 'scrollload':
            return renderLoadMore();
        case 'prevnext':
        case 'normal-prevnext':
            return renderPrevNext();
        case 'number':
        case 'normal-number':
            return renderNumber();
        default:
            return null;
    }
};

export default PostBlockPagination;
