import { compose } from '@wordpress/compose';
import { useEffect, useRef, useState } from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { gutenverseRoot, renderIcon } from 'gutenverse-core/helper';
import { createPortal } from 'react-dom';
import GalleryPopup from './components/gallery-popup';
import GalleryItem from './components/gallery-item';
import { u } from 'gutenverse-core/components';
import Shuffle from 'shufflejs';
import { withAnimationAdvanceV2, withMouseMoveEffect, withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { useAnimationEditor, useDisplayEditor } from 'gutenverse-core/hooks';
import { useDynamicScript, useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { CopyElementToolbar } from 'gutenverse-core/components';
import { getImageLoadValue } from '../../helper';

const GalleryBlock = compose(
    withPartialRender,
    withPassRef,
    withAnimationAdvanceV2('gallery'),
    withMouseMoveEffect
)((props) => {
    const {
        attributes,
        clientId,
        setBlockRef,
        setAttributes
    } = props;

    const {
        elementId,
        images,
        showed,
        column,
        grid,
        height,
        layout,
        filter,
        filterType,
        filterAll,
        filterList,
        enableLoadMore,
        itemsPerLoad,
        enableLoadText,
        enableLoadIcon,
        enableLoadIconType,
        enableLoadIconSVG,
        enableLoadIconPosition,
        filterSearchIcon,
        filterSearchIconType,
        filterSearchIconSVG,
        filterSearchIconPosition,
        filterSearchFormText,
        titleHeadingType = 'h5'
    } = attributes;

    /* set image load attribute from calculating the lazyload attribute and dashboard image load attribut on first load block on editor */
    useEffect(() => {
        let newImages = [];
        let changes = 0;
        images.forEach((image) => {
            const { lazyLoad = false, imageLoad = '' } = image;
            if ('' === imageLoad) {
                changes++;
                newImages.push({
                    ...image,
                    imageLoad: getImageLoadValue('', lazyLoad)
                });
            } else {
                newImages.push(image);
            }
        });
        if (changes > 0) {
            setAttributes({ images: newImages });
        }
    }, [images]);

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const [showPopup, setShowPop] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [showFilter, setShowFilter] = useState(false);
    const [currentFilter, setCurrentFilter] = useState('All');
    const [currentSearch, setCurrentSearch] = useState('');
    const [showedItems, setShowedItems] = useState(showed);
    const elementRef = useRef(null);
    const shuffleInstance = useRef(null);
    const observerRef = useRef(null);
    const sizerRef = useRef(null);
    const deviceType = getDeviceType();

    const [liveAttr, setLiveAttr] = useState({
        showed,
        showedItems,
        grid,
        height,
        column,
        layout
    });

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);
    useDynamicScript(elementRef);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-gallery',
            'no-margin',
            elementId,
            animationClass,
            displayClass,
            deviceType.toLowerCase(),
            [`layout-${layout}`],
            [`grid-desktop-${column && column['Desktop'] ? column['Desktop'] : 3}`],
            [`grid-tablet-${column && column['Tablet'] ? column['Tablet'] : 2}`],
            [`grid-mobile-${column && column['Mobile'] ? column['Mobile'] : 2}`],
        ),
        ref: elementRef
    });

    const onSearch = (value) => {
        const searchValue = value.toLowerCase();
        setCurrentSearch(searchValue);

        const isValid = (item) => {
            const element = u(item);
            const controlText = element.data('control');
            const titleText = element.find('.item-title').text();
            const contentText = element.find('.item-content').text();
            const categoryText = element.find('.caption-category span').text();
            const filterName = currentFilter === 'All' ? '' : currentFilter.toLowerCase();
            return (controlText.toLowerCase()).includes(filterName) && ((titleText.toLowerCase()).includes(searchValue) || (contentText.toLowerCase()).includes(searchValue) || (categoryText.toLowerCase()).includes(searchValue));
        };

        shuffleInstance.current && shuffleInstance.current.filter(item => isValid(item));
    };

    const onFilter = (value) => {
        const searchValue = value.toLowerCase();
        const isValidFilter = (item) => {
            const element = u(item);
            const controlText = element.data('control');
            return (controlText.toLowerCase()).includes(searchValue);
        };

        shuffleInstance.current && shuffleInstance.current.filter(item => isValidFilter(item));
    };

    const changeFilter = (filterName) => {
        setCurrentFilter(filterName);
        filterName === 'All' ? onFilter('') : onFilter(filterName);
    };

    // Initialize Shuffle.js
    const initializeShuffle = () => {
        if (shuffleInstance.current) {
            shuffleInstance.current.update();
        } else {
            shuffleInstance.current = new Shuffle(elementRef.current.querySelector('.gallery-items'), {
                itemSelector: `.${elementId} .gallery-item-wrap`,
                sizer: `.${elementId} .gallery-sizer-element`,
                speed: 500
            });
        }
    };

    // Wait for images to load
    const waitForImages = (images) => Promise.all(
        images.map((img) =>
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
        )
    );

    // Observe changes in image sizes
    const observeResizeGalleryItems = () => {
        if (elementRef.current) {
            const items = Array.from(elementRef.current.querySelectorAll('.gallery-item-wrap'));
            if (observerRef.current) observerRef.current.disconnect();
            observerRef.current = new ResizeObserver(() => {
                initializeShuffle();
            });
            items.forEach((item) => {
                observerRef.current.observe(item);
            });
        }
    };

    //liveAttribute disini belum untuk showedItem
    useEffect(() => {
        setShowedItems(showed);
    }, [showed]);

    useEffect(() => {
        setLiveAttr({
            ...liveAttr,
            showedItems
        });
    }, [showedItems]);

    useEffect(() => {
        if (elementRef.current && elementId) {
            // Ensure images are loaded first, then observe changes
            const images = Array.from(elementRef.current.querySelectorAll('img'));
            waitForImages(images).then(observeResizeGalleryItems);
        }
        return () => {
            shuffleInstance.current?.destroy();
            observerRef.current?.disconnect();
            shuffleInstance.current = null;
            observerRef.current = null;
        };
    }, [liveAttr, elementId]);

    useEffect(() => {
        if (elementRef) {
            setBlockRef(elementRef);
        }
    }, [elementRef]);

    return <>
        <CopyElementToolbar {...props} />
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} liveAttr={liveAttr} setLiveAttr={setLiveAttr} />
        {showPopup && createPortal(<GalleryPopup titleHeadingType={titleHeadingType} elementId={elementId} currentSearch={currentSearch} currentFilter={currentFilter} activeIndex={activeIndex} {...attributes} onClose={() => setShowPop(false)} />, gutenverseRoot)}
        <div  {...blockProps} data-grid={grid}>
            {filter && (
                filterType === 'tab' ? <div className="filter-controls">
                    <ul>
                        <li className={`guten-gallery-control ${'All' === currentFilter ? 'active' : ''}`} data-flag-all={true} data-filter={filterAll} onClick={() => changeFilter('All')}>{filterAll}</li>
                        {filterList && filterList.map((filterItem, index) => {
                            return filterItem.name && <li key={index} className={`guten-gallery-control ${filterItem.name === currentFilter ? 'active' : ''}`} data-filter={filterItem.name} onClick={() => changeFilter(filterItem.name)}>{filterItem.name}</li>;
                        })}
                    </ul>
                </div> : <div className="search-filters-wrap">
                    <div className="filter-wrap">
                        <button id="search-filter-trigger" data-flag-all={currentFilter === 'All'} className={`search-filter-trigger icon-position-${filterSearchIconPosition}`} onClick={() => setShowFilter(!showFilter)}>
                            {filterSearchIconPosition === 'before' && renderIcon(filterSearchIcon, filterSearchIconType, filterSearchIconSVG)}
                            <span>{currentFilter === 'All' ? filterAll : currentFilter}</span>
                            {filterSearchIconPosition === 'after' && renderIcon(filterSearchIcon, filterSearchIconType, filterSearchIconSVG)}
                        </button>
                        <ul className={`search-filter-controls ${showFilter ? 'open-controls' : ''}`}>
                            <li className={`guten-gallery-control ${'All' === currentFilter ? 'active' : ''}`} data-flag-all={true} data-filter={filterAll} onClick={() => changeFilter('All')}>{filterAll}</li>
                            {filterList && filterList.map((filterItem, index) => {
                                return filterItem.name && <li key={index} className={`guten-gallery-control ${filterItem.name === currentFilter ? 'active' : ''}`} data-filter={filterItem.name} onClick={() => changeFilter(filterItem.name)}>{filterItem.name}</li>;
                            })}
                        </ul>
                    </div>
                    <form className="guten-gallery-search-box" id="guten-gallery-search-box" autoComplete="off" onSubmit={(e) => e.preventDefault()}>
                        <input type="text" id="guten-gallery-search-box-input" name="guten-frontend-search" placeholder={filterSearchFormText} onChange={(e) => onSearch(e.target.value)} />
                    </form>
                </div>
            )}
            <div className="gallery-items">
                {images.map((item, index) => {
                    const onZoom = () => {
                        setShowPop(true);
                        setActiveIndex(index);
                    };

                    return <div key={index} className={`gallery-item-wrap ${index >= showedItems ? 'item-hidden' : ''}`} data-control={item.id}>
                        <GalleryItem galleryItem={item} onZoom={onZoom} {...attributes} />
                    </div>;
                })}
            </div>
            <div className="gallery-sizer-element" ref={sizerRef}></div>
            {enableLoadMore && (showedItems < images.length) && <div className="load-more-items">
                <div className="guten-gallery-loadmore">
                    <a aria-label="Load more" href="#" className="guten-gallery-load-more" onClick={(e) => {
                        e.preventDefault();
                        setShowedItems(parseInt(showedItems) + parseInt(itemsPerLoad));
                    }}>
                        {enableLoadIcon && enableLoadIconPosition === 'before' && <span className="load-more-icon icon-position-before" aria-hidden="true">
                            {renderIcon(enableLoadIcon, enableLoadIconType, enableLoadIconSVG)}
                        </span>}
                        <span className="load-more-text">{enableLoadText}</span>
                        {enableLoadIcon && enableLoadIconPosition === 'after' && <span className="load-more-icon icon-position-after" aria-hidden="true">
                            {renderIcon(enableLoadIcon, enableLoadIconType, enableLoadIconSVG)}
                        </span>}
                    </a>
                </div>
            </div>}
        </div>
    </>;
});

export default GalleryBlock;