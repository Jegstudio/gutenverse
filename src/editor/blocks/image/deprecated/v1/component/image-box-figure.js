import { isEmpty } from 'gutenverse-core/helper';
import { oldImagePlaceholder } from 'gutenverse-core/config';

export const ImageBoxFigure = attributes => {
    const { imgSrc, altType, altOriginal, altCustom, lazyLoad } = attributes;
    const { media = {}, size } = imgSrc || {};
    const { imageId, sizes = {} } = media || {};

    let imageAltText = null;

    switch (altType) {
        case 'original':
            imageAltText = altOriginal;
            break;
        case 'custom':
            imageAltText = altCustom;
            break;
    }
    const imageLazyLoad = () => {
        if (lazyLoad) {
            return <img className="gutenverse-image-box-empty" src={oldImagePlaceholder} alt={imageAltText} loading="lazy" />;
        } else {
            return <img className="gutenverse-image-box-empty" src={oldImagePlaceholder} alt={imageAltText} />;
        }
    };
    // Handle if empty, pick the 'full' size. If 'full' size also not exist, return placeholder image.

    if (isEmpty(sizes)) {
        return imageLazyLoad();
    }

    let imageSrc = sizes[size];

    if (isEmpty(imageSrc)) {
        if (isEmpty(sizes['full'])) {
            return imageLazyLoad();
        }

        imageSrc = sizes['full'];
    }

    if (imageId && imageSrc) {
        if (lazyLoad) {
            return <img className="gutenverse-image-box-filled" src={imageSrc.url} height={imageSrc.height} width={imageSrc.width} alt={imageAltText} loading="lazy" />;
        } else {
            return <img className="gutenverse-image-box-filled" src={imageSrc.url} height={imageSrc.height} width={imageSrc.width} alt={imageAltText} />;
        }
    }

    return imageLazyLoad();
};