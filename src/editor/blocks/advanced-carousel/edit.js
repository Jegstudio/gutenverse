import { compose } from '@wordpress/compose';
import { useEffect, useRef } from '@wordpress/element';
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

const swiperSettings = (attributes) => {
    const {
        initialSlide,
        spacing,
        itemShowed,
        loop,
        showNav,
        showArrow,
        zoom,
        zoomRatio,
        autoplay,
        autoplayTimeout
    } = attributes;

    return {
    };
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
    } = attributes;

    const advCarouselRef = useRef();
    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-advanced-carousel',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: advCarouselRef
    });

    useEffect(() => {
        if (advCarouselRef.current) {
            setElementRef(advCarouselRef.current);
        }
    }, [advCarouselRef]);

    const focusBlock = () => {
        selectBlock(clientId);
    };

    return <>
        <PanelController panelList={panelList} {...props} />
        <div  {...blockProps}>
            <div className="advanced-carousel" onClick={focusBlock}>
                <Swiper
                    {...swiperSettings(attributes)}
                    shouldSwiperUpdate={true}
                    rebuildOnUpdate={true}>
                    <div>Swiper Slider</div>
                    <div>Swiper Slider</div>
                    <div>Swiper Slider</div>
                </Swiper>
            </div>
        </div>
    </>;
});

export default AdvancedCarousel;