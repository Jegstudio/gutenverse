import { compose } from '@wordpress/compose';
import { useEffect, useRef, useState } from '@wordpress/element';
import { withCustomStyle } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { PanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { withAnimationAdvance } from 'gutenverse-core/hoc';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { Swiper } from '../../components/swiper';
import { dispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { imagePlaceholder } from 'gutenverse-core/config';
import { getImageSrc } from 'gutenverse-core/editor-helper';
import { gutenverseRoot } from 'gutenverse-core/helper';
import { createPortal } from 'react-dom';
import GalleryPopup from '../gallery/components/gallery-popup';

const slideCard = () => {
    let settings = {};
    settings.effect = 'cards';
    settings.grabCursor = true;
    return settings;
};

const slideCube = () => {
    let settings = {};
    settings.effect = 'cube';
    settings.grabCursor = true;
    settings.cubeEffect = {
        shadow: true,
        slideShadows: true,
        shadowOffset: 20,
        shadowScale: 0.94,
    };
    settings.pagination = true;
    return settings;
};

const slideCoverflow = () => {
    let settings = {};
    settings.effect = 'coverflow';
    settings.grabCursor = true;
    settings.slidesPerView = 'auto';
    settings.coverflowEffect = {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    };
    settings.pagination = true;
    return settings;
};

const slideFlip = () => {
    let settings = {};
    settings.effect = 'flip';
    settings.grabCursor = true;
    settings.pagination = true;
    return settings;
};

const slideNormal = () => { };

const swiperSettings = (attributes) => {
    const {
        sliderEffect
    } = attributes;

    let settings = {};

    switch (sliderEffect) {
        case 'card':
            settings = {
                ...settings,
                ...slideCard()
            };
            break;
        case 'cube':
            settings = {
                ...settings,
                ...slideCube()
            };
            break;
        case 'coverflow':
            settings = {
                ...settings,
                ...slideCoverflow()
            };
            break;
        case 'flip':
            settings = {
                ...settings,
                ...slideFlip()
            };
            break;
        case 'normal':
            settings = {
                ...settings,
                ...slideNormal()
            };
    }

    return settings;
};

const getImageSrcSize = (image) => {
    const { media, size } = image;
    if (media) {
        const { sizes } = media;
        if (sizes[size]) {
            const { url } = sizes[size];
            return url;
        }
    }

    return imagePlaceholder;
};

const AdvancedCarousel = compose(
    withCustomStyle(panelList),
    withAnimationAdvance('advance-carousel'),
    withCopyElementToolbar()
)((props) => {
    const {
        selectBlock
    } = dispatch('core/block-editor');

    const {
        clientId,
        attributes,
        setElementRef
    } = props;

    const {
        elementId,
        items,
        sliderStyle,
        overflowHideContainer,
        allowPopup
    } = attributes;

    const advCarouselRef = useRef();
    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const [showPopup, setShowPop] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [popupImage, setPopupImage] = useState([]);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-advanced-carousel',
            `guten-style-${sliderStyle}`,
            elementId,
            animationClass,
            displayClass,
        ),
        ref: advCarouselRef
    });

    useEffect(() => {
        let data = [];
        items.map(item => {
            const { image, imagePopup, imageDescription } = item;
            const src = getImageSrc(imagePopup);

            data = [
                ...data,
                {
                    src: {
                        image: src
                    },
                    title: imageDescription
                }
            ];
        });

        setPopupImage(data);
    }, [items]);

    useEffect(() => {
        if (advCarouselRef.current) {
            setElementRef(advCarouselRef.current);
        }
    }, [advCarouselRef]);

    const focusBlock = () => {
        selectBlock(clientId);
    };

    const style1 = (item, index) => {
        return <div className={classnames('carousel-content', 'carousel-image', `carousel-slide-${index}`)}>
            {item.text}
        </div>;
    };

    const openCarousel = (e, index) => {
        e.preventDefault();
        setShowPop(true);
        setActiveIndex(index);
    };

    const style2 = (item, index) => {
        const { image, imagePopup } = item;
        return <div className={classnames('carousel-content', 'carousel-text', `carousel-slide-${index}`)}>
            {allowPopup && <a className="carousel-popup" href={getImageSrc(imagePopup)} onClick={(e) => openCarousel(e, index)}>
                <span className="carousel-popup-wrapper"><i className="fas fa-plus" aria-hidden="true"></i></span>
            </a>}
            {image && <img className="main-image" src={getImageSrcSize(image)} alt={image.title} />}
        </div>;
    };

    const carouselItems = (items) => {
        return items ? items.map((item, index) => {
            return <div className="carousel-item" key={index}>
                {sliderStyle === '1' && style1(item, index)}
                {sliderStyle === '2' && style2(item, index)}
            </div>;
        }) : <div className="empty-carousel">
            {__('Empty Carousel', 'gutenverse')}
        </div>;
    };

    return <>
        <PanelController panelList={panelList} {...props} />
        {showPopup && createPortal(<GalleryPopup
            activeIndex={activeIndex}
            {...attributes}
            onClose={() => setShowPop(false)}
            images={popupImage}
        />, gutenverseRoot)}
        <div  {...blockProps}>
            <div className={classnames('advanced-carousel', {
                'container-overflow-hidden': overflowHideContainer,
            })} onClick={focusBlock}>
                <Swiper
                    {...swiperSettings(attributes)}
                    shouldSwiperUpdate={true}
                    rebuildOnUpdate={true}>
                    {carouselItems(items)}
                </Swiper>
            </div>
        </div>
    </>;
});

export default AdvancedCarousel;