
import { classnames } from 'gutenverse-core/components';
import { useBlockProps } from '@wordpress/block-editor';
import { swiperData } from 'gutenverse-core/helper';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';
import { withMouseMoveEffectScript } from 'gutenverse-core/hoc';
import { compose } from '@wordpress/compose';
import { logoHoverLazyLoad, logoNormalLazyLoad } from './edit';

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
        <div {...useBlockProps.save({ className })}>
            <div className="client-list">
                <div id={elementId} className="swiper-container" {...swiperData(attributes)}>
                    <div className="swiper-wrapper">
                        {logos.map((logo, index) => {
                            return <div className="image-list swiper-slide" key={index}>
                                {
                                    logo.link ? <a aria-label={logo.title} href={logo.link} className="content-image">
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

export default save;