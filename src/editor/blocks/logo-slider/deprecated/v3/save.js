
import { classnames } from 'gutenverse-core/components';
import { getImageSrc } from 'gutenverse-core/editor-helper';
import { swiperData } from 'gutenverse-core/helper';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';
import { withMouseMoveEffectScript } from 'gutenverse-core/hoc';
import { compose } from '@wordpress/compose';
import { isEmpty } from 'gutenverse-core/helper';

const save = compose(
    withMouseMoveEffectScript
)(({ attributes }) => {
    const {
        elementId,
        logos,
        showNav,
        showArrow,
        arrowPosition,
    } = attributes;

    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);

    const className = classnames(
        'guten-element',
        'guten-client-logo',
        'grid-desktop-3',
        elementId,
        animationClass,
        displayClass,
        {
            [`arrow-${arrowPosition}`]: arrowPosition
        }
    );
    return (
        <div className={className}>
            <div className="client-list">
                <div id={elementId} className="swiper-container" {...swiperData(attributes)}>
                    <div className="swiper-wrapper">
                        {logos.map((logo, index) => {
                            return <div className="image-list swiper-slide" key={index}>
                                {
                                    logo.link ? <a href={logo.link} className="content-image">
                                        {logo && logoNormalLazyLoad(logo)}
                                        {logo && logoHoverLazyLoad(logo)}
                                    </a> : <div className="content-image">
                                        {logo && logoNormalLazyLoad(logo)}
                                        {logo && logoHoverLazyLoad(logo)}
                                    </div>
                                }
                            </div>;
                        })}
                    </div>
                    {showNav && <div className="swiper-pagination" />}
                    {showArrow && <div className="swiper-button-prev" />}
                    {showArrow && <div className="swiper-button-next" />}
                </div>
            </div>
        </div>
    );
});

const logoNormalLazyLoad = (logo) => {
    return <img className="main-image" src={getImageSrc(logo.src)} alt={logo.title} {...(logo.lazyLoad && { loading: 'lazy' })} width={logo.src?.width} height={logo.src?.height} />;
};

const logoHoverLazyLoad = (logo) => {
    const hoverSrc = !isEmpty(logo.hoverSrc) ? getImageSrc(logo.hoverSrc) : getImageSrc(logo.src);
    const width = !isEmpty(logo.hoverSrc) ? logo.hoverSrc?.width : logo.src?.width;
    const height = !isEmpty(logo.hoverSrc) ? logo.hoverSrc?.height : logo.src?.height;
    return <img className="hover-image" src={hoverSrc} alt={logo.title} {...(logo.lazyLoad && { loading: 'lazy' })} width={width} height={height} />;
};

export default save;