import { compose } from '@wordpress/compose';
import { withMouseMoveEffect, withPartialRender } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import WPSwiper from '../../components/swiper/wp-swiper';
import ContentItem from './components/content-item';
import { swiperSettings } from '../../components/swiper/helper';
import { useRef } from '@wordpress/element';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { dispatch } from '@wordpress/data';
import { getImageSrc } from 'gutenverse-core/editor-helper';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';
import { CopyElementToolbar } from 'gutenverse-core/components';

const TestimonialsBlock = compose(
    withPartialRender,
    withMouseMoveEffect
)((props) => {

    const {
        selectBlock
    } = dispatch('core/block-editor');

    const {
        clientId,
        attributes,
        setAttributes
    } = props;

    const {
        elementId,
        testimonialData,
        contentType,
        showQuote,
        iconQuote,
        iconQuoteType,
        iconQuoteSVG,
        quoteOverride,
        contentPosition,
        showRating,
        showClientImage,
        iconRatingHalf,
        iconRatingHalfType,
        iconRatingHalfSVG,
        iconRatingFull,
        iconRatingFullType,
        iconRatingFullSVG,
        starPosition,
    } = attributes;

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const elementRef = useRef();

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-testimonials',
            'no-margin',
            elementId,
            animationClass,
            displayClass,
            `style-${contentType}`,
            'quote-override',
        ),
        ref: elementRef
    });

    const focusBlock = () => {
        selectBlock(clientId);
    };

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);

    return <>
        <CopyElementToolbar {...props} />
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
        <div {...blockProps}>
            <div className="testimonials-list" onClick={focusBlock}>
                <WPSwiper
                    {...swiperSettings(attributes)}
                    shouldSwiperUpdate={true}
                    rebuildOnUpdate={true}>
                    {testimonialData.map((data, index) => <div key={index} >
                        <ContentItem {...data}
                            contentType={contentType}
                            showQuote={showQuote}
                            iconQuote={iconQuote}
                            iconQuoteType={iconQuoteType}
                            iconQuoteSVG={iconQuoteSVG}
                            quoteOverride={quoteOverride}
                            contentPosition={contentPosition}
                            showRating={showRating}
                            showClientImage={showClientImage}
                            iconRatingFull={iconRatingFull}
                            iconRatingFullType={iconRatingFullType}
                            iconRatingFullSVG={iconRatingFullSVG}
                            iconRatingHalf={iconRatingHalf}
                            iconRatingHalfType={iconRatingHalfType}
                            iconRatingHalfSVG={iconRatingHalfSVG}
                            starPosition={starPosition}
                            frontEnd={false}
                            setAttributes={setAttributes}
                            index={index}
                            testimonialData={testimonialData}
                            src={getImageSrc(data.src)}
                            imgDetail={data.src}
                        />
                    </div>)}
                </WPSwiper>
            </div>
        </div>
    </>;
});

export default TestimonialsBlock;