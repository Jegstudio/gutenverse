
import { getImageSrc } from 'gutenverse-core/editor-helper';

const GalleryItem = (attributes) => {
    const {
        galleryItem,
        layout,
        hover,
        zoomIcon,
        linkIcon,
        onZoom = () => {},
        zoomOptions = 'item'
    } = attributes;

    const hoverClass = () => {
        switch (hover) {
            case 'slide-up':
            case 'fade-in':
            case 'zoom-in':
                return `animated ${hover}`;
            default:
                return '';
        }
    };

    const ratingItems = (rating) => {
        let arr = [];
        let j = 0;
        for (let i = 0; i < rating * 2; i++) {
            if (i%2 === 0) {
                arr.push(1);
                j++;
            } else {
                arr[j-1]++;
            }
        }

        return arr.map((item, key) => item === 2 ? <li key={key}><i className="fas fa-star"></i></li> : <li key={key}><i className="fas fa-star-half"></i></li>);
    };
    const imageCondition = () => {
        if(galleryItem.lazyLoad){
            return <img src={getImageSrc(galleryItem.src)} alt={galleryItem.title} loading="lazy"/>;
        }else{
            return <img src={getImageSrc(galleryItem.src)} alt={galleryItem.title}/>;
        }
    };

    return layout === 'overlay' ? <div className="grid-item">
        <div className="thumbnail-wrap">
            {imageCondition()}
            <div className={`caption-wrap style-overlay overlay-overlay ${hoverClass()}`} onClick={zoomOptions === 'item' && onZoom}>
                {!galleryItem.disableLightbox && <>
                    <div className="item-hover-bg"></div>
                    <div className="item-caption-over">
                        <h5 className="item-title">{galleryItem.title}</h5>
                        <div className="item-content">{galleryItem.content}</div>
                        <div className="item-buttons">
                            {(zoomOptions !== 'disable' && zoomIcon) && <div className="gallery-link zoom">
                                <span className="item-icon-inner" onClick={onZoom}>
                                    <i className={zoomIcon} aria-hidden="true"></i>
                                </span>
                            </div>}
                            {(!galleryItem.disableLink && linkIcon) && <a href={galleryItem.link ? galleryItem.link : ''} className="gallery-link link" onClick={e => e.preventDefault()}>
                                <span className="item-icon-inner">
                                    <i className={linkIcon} aria-hidden="true"></i>
                                </span>
                            </a>}
                        </div>
                    </div>
                    <div className="caption-head">
                        {galleryItem.showPrice && <div className="item-price">{galleryItem.price}</div>}
                        {galleryItem.showRating && <div className="item-rating">
                            {ratingItems(galleryItem.ratingNumber)}
                            <span>{galleryItem.ratingNumber}</span>
                        </div>}
                    </div>
                    {(galleryItem.showCategory && galleryItem.printLabelCategory) && <div className="caption-category">
                        <span>{galleryItem.category}</span>
                    </div>}
                </>}
            </div>
        </div>
    </div> : <div className="grid-item">
        <div className="thumbnail-wrap">
            {imageCondition()}
            <div className={`caption-wrap search-hover-bg style-overlay ${hoverClass()}`}>
                {!galleryItem.disableLightbox && <>
                    <div className="item-hover-bg"></div>
                    <div className="caption-head">
                        {galleryItem.showPrice && <div className="item-price">{galleryItem.price}</div>}
                        {galleryItem.showRating && <div className="item-rating">
                            {ratingItems(galleryItem.ratingNumber)}
                            <span>{galleryItem.ratingNumber}</span>
                        </div>}
                    </div>
                    <div className="caption-button">
                        <div className="item-buttons">
                            {(zoomOptions !== 'disable' && zoomIcon ) && <div className="gallery-link zoom">
                                <span className="item-icon-inner" onClick={onZoom}>
                                    <i className={zoomIcon} aria-hidden="true"></i>
                                </span>
                            </div>}
                            {(!galleryItem.disableLink && linkIcon ) && <a href={galleryItem.link ? galleryItem.link : ''} className="gallery-link link">
                                <span className="item-icon-inner">
                                    <i className={linkIcon} aria-hidden="true"></i>
                                </span>
                            </a>}
                        </div>
                    </div>
                    {galleryItem.showCategory && <div className="caption-category">
                        <span>{galleryItem.category}</span>
                    </div>}
                </>}
            </div>
        </div>
        <div className="caption-wrap style-card">
            <div className="item-caption-over">
                <h5 className="item-title">{galleryItem.title}</h5>
                <div className="item-content">
                    <p>{galleryItem.content}</p>
                </div>
            </div>
        </div>
    </div>;
};

export default GalleryItem;