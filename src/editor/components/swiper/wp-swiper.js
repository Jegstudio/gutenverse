import { cloneElement, isValidElement, Children, useRef, useMemo, forwardRef, useEffect, useCallback, createElement } from '@wordpress/element';
import Swiper from 'swiper';
import { Autoplay, Navigation, Pagination, Zoom, EffectCards, EffectCube, EffectCoverflow, EffectFlip } from 'swiper/modules';
import objectAssign from 'object-assign';

Swiper.use([Autoplay, Navigation, Pagination, Zoom, EffectCards, EffectCube, EffectCoverflow, EffectFlip]);

const WpSwiper = forwardRef((props, externalRef) => {
    const {
        activeSlideKey,
        ContainerEl = 'div',
        children,
        containerClass = 'swiper-container',
        navigation,
        noSwiping,
        pagination,
        parallax,
        parallaxEl,
        WrapperEl = 'div',
        wrapperClass = 'swiper-wrapper',
        rebuildOnUpdate,
        renderScrollbar = ({ scrollbar }) => {
            return scrollbar ? createElement('div', { className: classNames(scrollbar.el) }) : null;
        },
        renderPagination = ({ pagination }) => {
            return pagination ? createElement('div', { className: classNames(pagination.el) }) : null;
        },
        renderPrevButton = ({ navigation }) => {
            return navigation ? createElement('div', { className: classNames(navigation.prevEl) }) : null;
        },
        renderNextButton = ({ navigation }) => {
            return navigation ? createElement('div', { className: classNames(navigation.nextEl) }) : null;
        },
        renderParallax = ({ parallaxEl }) => {
            return parallaxEl ? createElement('div', { className: classNames(parallaxEl.el), 'data-swiper-parallax': parallaxEl.value }) : null;
        },
        rtl,
        scrollbar,
        shouldSwiperUpdate,
        slideClass = 'swiper-slide',
        loop
    } = props;

    const swiperInstanceRef = useRef(null);
    const swiperNodeRef = useRef(null);
    const ref = useForkRef(swiperNodeRef, externalRef);

    const getActiveSlideIndexFromProps = useCallback(() => {
        if (!activeSlideKey) {
            return null;
        }
        let activeSlideId = 0;
        let id = loop ? 1 : 0;
        Children.forEach(children, function (child) {
            if (isValidElement(child)) {
                if (child.key === activeSlideKey) {
                    activeSlideId = id;
                }
                id += 1;
            }
        });
        return activeSlideId;
    }, [activeSlideKey, children, loop]);

    const destroySwiper = useCallback(() => {
        if (swiperInstanceRef.current !== null) {
            swiperInstanceRef.current.destroy(true, true);
            setRef(swiperInstanceRef, null);
        }
    }, []);

    const buildSwiper = useCallback(() => {
        if (swiperNodeRef.current && swiperInstanceRef.current === null) {
            setRef(swiperInstanceRef, new Swiper(swiperNodeRef.current, objectAssign({}, props)));
        }
    }, [props]);

    const renderContent = (e) => {
        if (!isReactElement(e)) {
            return null;
        }
        const slideClassNames = [slideClass, e.props.className];
        if (noSwiping) {
            slideClassNames.push('swiper-no-swiping');
        }
        return cloneElement(e, Object.assign(Object.assign({}, e.props), { className: slideClassNames.join(' ').trim() }));
    };

    useEffect(() => () => destroySwiper(), [destroySwiper]);

    useEffect(() => {
        buildSwiper();
        if (swiperInstanceRef.current !== null) {
            if (rebuildOnUpdate) {
                destroySwiper();
                buildSwiper();
            } else if (shouldSwiperUpdate) {
                swiperInstanceRef.current.update();
            }
            const numSlides = swiperInstanceRef.current.slides.length;
            if (numSlides <= swiperInstanceRef.current.activeIndex) {
                const index = Math.max(numSlides - 1, 0);
                swiperInstanceRef.current.slideTo(index);
            }
            const slideToIndex = getActiveSlideIndexFromProps();
            if (slideToIndex !== null) {
                swiperInstanceRef.current.slideTo(slideToIndex);
            }
        }
    }, [
        destroySwiper,
        getActiveSlideIndexFromProps,
        rebuildOnUpdate,
        shouldSwiperUpdate,
        buildSwiper
    ]);

    if (!children || !ContainerEl || !WrapperEl) {
        return null;
    }

    if (!validateChildren(children)) {
        if (process.env.NODE_ENV !== 'production') {
            console.warn('Children should be react element or an array of react element!!');
        }
        return null;
    }

    return <ContainerEl className={containerClass} ref={ref} dir={rtl && 'rtl'}>
        {parallax && parallaxEl && renderParallax && renderParallax(props)}
        <WrapperEl className={wrapperClass}>
            {Children.map(children, renderContent)}
        </WrapperEl>
        {pagination && <div className="swiper-pagination-wrapper">
            {pagination.el && renderPagination && renderPagination(props)}
        </div>}
        {scrollbar && <div className="swiper-scrollbar-wrapper">
            {scrollbar.el && renderScrollbar && renderScrollbar(props)}
        </div>}
        {navigation && <div className="swiper-navigation-wrapper">
            {navigation.nextEl && renderNextButton && renderNextButton(props)}
            {navigation.prevEl && renderPrevButton && renderPrevButton(props)}
        </div>}
    </ContainerEl>;
});

const useForkRef = (refA, refB) => {
    return useMemo(() => {
        if (refA == null && refB == null) {
            return null;
        }
        return (refValue) => {
            setRef(refA, refValue);
            setRef(refB, refValue);
        };
    }, [refA, refB]);
};

const setRef = (ref, value) => {
    if (typeof ref === 'function') {
        ref(value);
    }
    else if (ref) {
        ref.current = value;
    }
};

const validateChildren = (children) => {
    let isValid = true;
    if (Array.isArray(children)) {
        Children.forEach(children, function (child) {
            if (!isValidElement(child)) {
                isValid = false;
            }
        });
    }
    else {
        isValid = isValidElement(children);
    }
    return isValid;
};

const classNames = function (el) {
    if (typeof el === 'string') {
        return el.split('.').join(' ').trim();
    }
    else if (el instanceof HTMLElement) {
        return el.className;
    }
    return '';
};

const isReactElement = (element) => {
    return isValidElement(element) &&
        (typeof element.type === 'string' ||
            typeof element.type === 'function' ||
            typeof element.type === 'object');
};

export default WpSwiper;