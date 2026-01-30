
import { classnames } from 'gutenverse-core/components';
import ContentItem from './components/content-item';
import { swiperData } from 'gutenverse-core/helper';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';
import { withMouseMoveEffectScript } from 'gutenverse-core/hoc';
import { compose } from '@wordpress/compose';

const getImageSrc = ( src ) => {
    if( src && src.image ){
        return src.image;
    }else{
        return '';
    }
};

const save = compose(
    withMouseMoveEffectScript
)(({ attributes }) => {

    const {
        elementId,
        testimonialData,
        contentType,
        showNav,
        showArrow,
        showQuote,
        iconQuote,
        quoteOverride,
        contentPosition,
        showRating,
        iconRatingHalf,
        iconRatingFull,
        starPosition
    } = attributes;

    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);
    const className = classnames(
        'guten-element',
        'guten-testimonials',
        elementId,
        animationClass,
        displayClass,
        `style-${contentType}`,
        'quote-override',
    );

    return (
        <div className={className}>
            <div className="testimonials-list">
                <div id={elementId} className="swiper-container" {...swiperData(attributes)}>
                    <div className="swiper-wrapper">
                        {testimonialData.map((data, index) => <div key={index} className="swiper-slide">
                            <ContentItem {...data}
                                contentType={contentType}
                                showQuote={showQuote}
                                iconQuote={iconQuote}
                                quoteOverride={quoteOverride}
                                contentPosition={contentPosition}
                                showRating={showRating}
                                iconRatingFull={iconRatingFull}
                                iconRatingHalf={iconRatingHalf}
                                starPosition={starPosition}
                                frontEnd={true}
                                index={index}
                                src={getImageSrc(data.src)}
                            />
                        </div>)}
                    </div>
                    {showNav && <div className="swiper-pagination" />}
                    {showArrow && <div className="swiper-button-prev" />}
                    {showArrow && <div className="swiper-button-next" />}
                </div>
            </div>
        </div>
    );
});

export default save;