import { compose } from '@wordpress/compose';
import classnames from 'classnames';
import { useBlockProps } from '@wordpress/block-editor';
import GalleryItem from './components/gallery-item';
import { Maximize, Minimize, X, ZoomIn } from 'react-feather';
import { imagePlaceholder } from 'gutenverse-core/config';
import { withAnimationAdvanceScript } from 'gutenverse-core/hoc';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';
import { useAnimationAdvanceData } from 'gutenverse-core/hooks';

const save = compose(
    withAnimationAdvanceScript('gallery'),
)((props) => {
    const {
        attributes
    } = props;

    const {
        elementId,
        images,
        grid,
        showed,
        column,
        filter,
        filterType,
        filterAll,
        filterList,
        enableLoadMore,
        layout,
        enableLoadText,
        enableLoadIcon,
        enableLoadIconPosition,
        filterSearchIcon,
        filterSearchIconPosition,
        filterSearchFormText,
        itemsPerLoad,
        zoomOptions,
    } = attributes;

    const advanceAnimationData = useAnimationAdvanceData(attributes);
    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);

    const className = classnames(
        'guten-element',
        'guten-gallery',
        elementId,
        animationClass,
        displayClass,
        [`layout-${layout}`],
        [`grid-desktop-${column && column['Desktop'] ? column['Desktop'] : 3}`],
        [`grid-tablet-${column && column['Tablet'] ? column['Tablet'] : 2}`],
        [`grid-mobile-${column && column['Mobile'] ? column['Mobile'] : 2}`],
    );

    return (
        <div {...useBlockProps.save({ className, ...advanceAnimationData })} data-grid={grid}>
            <div className="gutenverse-popup-gallery hidden">
                <div className="gallery-header">
                    <div className="left-header">
                        {/* <span>{`${currentIndex}/${images.length}`}</span> */}
                    </div>
                    <div className="right-header">
                        <Maximize className="icon-fullscreen" />
                        <Minimize className="icon-minimize hidden" />
                        <ZoomIn className="icon-zoom" />
                        <X className="icon-close" />
                    </div>
                </div>
                <div className="gallery-body">
                    <div className="images">
                        <div id={elementId} className="swiper-container">
                            <div className="swiper-wrapper">
                                {images.map((image, index) => <div className="swiper-slide image-list" key={index}>
                                    <div className="content-image swiper-zoom-container">
                                        {image && <img className="main-image" src={image.src ? image.src.image : imagePlaceholder} alt={image.title} />}
                                    </div>
                                </div>)}
                            </div>
                            <div className="swiper-button-prev" />
                            <div className="swiper-button-next" />
                        </div>
                    </div>
                </div>
            </div>
            {filter && (
                filterType === 'tab' ? <div className="filter-controls">
                    <ul>
                        <li className={'guten-gallery-control active'}>{filterAll}</li>
                        {filterList && filterList.map((filterItem, index) => {
                            return filterItem.name && <li key={index} className={'guten-gallery-control'} data-filter={filterItem.name}>{filterItem.name}</li>;
                        })}
                    </ul>
                </div> : <div className="search-filters-wrap">
                    <div className="filter-wrap">
                        <button id="search-filter-trigger" className={`search-filter-trigger icon-position-${filterSearchIconPosition}`}>
                            {filterSearchIconPosition === 'before' && <i aria-hidden="true" className={filterSearchIcon}></i>}
                            <span>{filterAll}</span>
                            {filterSearchIconPosition === 'after' && <i aria-hidden="true" className={filterSearchIcon}></i>}
                        </button>
                        <ul className={'search-filter-controls'}>
                            <li className={'guten-gallery-control active'}>{filterAll}</li>
                            {filterList && filterList.map((filterItem, index) => {
                                return filterItem.name && <li key={index} className={'guten-gallery-control'} data-filter={filterItem.name}>{filterItem.name}</li>;
                            })}
                        </ul>
                    </div>
                    <form className="guten-gallery-search-box" id="guten-gallery-search-box" autoComplete="off" onSubmit={(e) => e.preventDefault()}>
                        <input type="text" id="guten-gallery-search-box-input" name="guten-frontend-search" placeholder={filterSearchFormText} />
                    </form>
                </div>
            )}
            <div className="gallery-items" data-loaded={showed} data-more={itemsPerLoad} data-max={images.length}
                {...{
                    ['data-zoom']: zoomOptions && zoomOptions !== 'item' ? zoomOptions : undefined,
                }}
            >
                {images.map((item, index) => <div key={index} className={`gallery-item-wrap ${index >= showed ? 'item-hidden' : ''}`} data-index={index} data-control={item.id}>
                    <GalleryItem galleryItem={item} {...attributes} />
                </div>)}
            </div>
            {enableLoadMore && (showed < images.length) && <div className="load-more-items">
                <div className="guten-gallery-loadmore">
                    <a href="#" className="guten-gallery-load-more">
                        {enableLoadIcon && enableLoadIconPosition === 'before' && <span className="load-more-icon icon-position-before" aria-hidden="true">
                            <i className={enableLoadIcon}></i>
                        </span>}
                        <span className="load-more-text">{enableLoadText}</span>
                        {enableLoadIcon && enableLoadIconPosition === 'after' && <span className="load-more-icon icon-position-after" aria-hidden="true">
                            <i className={enableLoadIcon}></i>
                        </span>}
                    </a>
                </div>
            </div>}
        </div>
    );
});

export default save;