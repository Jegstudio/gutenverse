
import classnames from 'classnames';
import { useBlockProps } from '@wordpress/block-editor';
import ContentItem from './components/content-item';
import { swiperData } from 'gutenverse-core/helper';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';

const save = ({ attributes }) => {
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
        iconRatingFull
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
        <div {...useBlockProps.save({ className })}>
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
};

export default save;