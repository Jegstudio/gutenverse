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
        sliderEffect
    } = attributes;

    let settings = {};

    if ('card' === sliderEffect) {
        settings.effect = 'cards';
        settings.grabCursor = true;
    }

    if ('cube' === sliderEffect) {
        settings.effect = 'cube';
        settings.grabCursor = true;
        settings.cubeEffect = {
            shadow: true,
            slideShadows: true,
            shadowOffset: 20,
            shadowScale: 0.94,
        };
        settings.pagination = true;
    }

    if ('coverflow' === sliderEffect) {
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
    }

    if ('flip' === sliderEffect) {
        settings.effect = 'flip';
        settings.grabCursor = true;
        settings.pagination = true;
    }

    if ('normal' === sliderEffect) { }

    return settings;
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
        sliderType,
        overflowHideContainer
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

    const carouselItems = (items) => {
        const carouselImage = (item, index) => {
            return <div className={classnames('carousel-content', 'carousel-image', `carousel-slide-${index}`)}>
                {item.text}
            </div>;
        };

        const carouselText = (item, index) => {
            return <div className={classnames('carousel-content', 'carousel-text', `carousel-slide-${index}`)}>
                {item.text}
            </div>;
        };

        return items.map((item, index) => {
            return <div className="carousel-item" key={index}>
                {sliderType === 'text' && carouselText(item, index)}
                {sliderType === 'image' && carouselImage(item, index)}
            </div>;
        });
    };

    return <>
        <PanelController panelList={panelList} {...props} />
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