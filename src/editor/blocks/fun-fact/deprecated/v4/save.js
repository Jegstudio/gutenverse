import { compose } from '@wordpress/compose';

import { classnames } from 'gutenverse-core/components';
import { getImageSrc } from 'gutenverse-core/editor-helper';
import { withAnimationAdvanceScript, withMouseMoveEffectScript } from 'gutenverse-core/hoc';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';
import { useAnimationAdvanceData } from 'gutenverse-core/hooks';

const save = compose(
    withAnimationAdvanceScript('fun-fact'),
    withMouseMoveEffectScript
)((props) => {
    const {
        attributes
    } = props;

    const {
        elementId,
        icon,
        iconType,
        prefix,
        suffix,
        title,
        supper,
        showSupper,
        number,
        safeNumber,
        duration,
        titleTag: TitleTag,
        hoverBottom,
        hoverBottomDirection,
        image,
        imageAlt,
        lazyLoad,
        contentDisplay,
        topIconContent,
        bottomIconContent,
        numberFormat,
    } = attributes;

    const advanceAnimationData = useAnimationAdvanceData(attributes);
    const imageAltText = imageAlt || null;
    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);

    const className = classnames(
        'guten-element',
        elementId,
        animationClass,
        displayClass,
        'guten-fun-fact',
        'align-center',
        'hover-from-left',
    );

    const headerContent = () => {
        switch (iconType) {
            case 'icon':
                return <div className="icon-box">
                    <div className="icon"><i className={icon}></i></div>
                </div>;
            case 'image':
                return <div className="icon-box">
                    <div className="icon"><img src={getImageSrc(image)} alt={imageAltText} {...(lazyLoad && { loading: 'lazy' })} /></div>
                </div>;
            default:
                return null;
        }
    };

    return (
        <div className={className} {...advanceAnimationData}>
            <div className="fun-fact-inner">
                {topIconContent && headerContent()}
                <div className={`content ${contentDisplay}`}>
                    <div className="number-wrapper">
                        <span className="prefix">{`${prefix}`}</span>
                        <span className="number loaded" data-number-format={numberFormat} data-safe={safeNumber} data-number={number} data-duration={duration} data-attributes={JSON.stringify({
                            elementId: elementId,
                            ...attributes
                        })}></span>
                        <span className="suffix">{suffix}</span>
                        {showSupper && <sup className="super">{supper}</sup>}
                    </div>
                    <TitleTag className="title">{title}</TitleTag>
                </div>
                {bottomIconContent && headerContent()}
            </div>
            {hoverBottom && <div className={'border-bottom'}>
                <div className={`animated ${hoverBottomDirection}`}></div>
            </div>}
        </div>
    );
});

export default save;