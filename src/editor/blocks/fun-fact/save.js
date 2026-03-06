import { compose } from '@wordpress/compose';

import { classnames } from 'gutenverse-core/components';
import { useBlockProps } from '@wordpress/block-editor';
import { getImageSrc } from 'gutenverse-core/editor-helper';
import { withAnimationAdvanceScript, withMouseMoveEffectScript } from 'gutenverse-core/hoc';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';
import { useAnimationAdvanceData } from 'gutenverse-core/hooks';
import { renderIcon } from 'gutenverse-core/helper';

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
        iconSVG,
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
        contentDisplay,
        topIconContent,
        bottomIconContent,
        numberFormat,
        numberRightSpace,
        imageLoad = '',
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
            case 'svg':
                return <div className="icon-box">
                    <div className="icon">{renderIcon(icon, iconType, iconSVG)}</div>
                </div>;
            case 'image':
                return <div className="icon-box">
                    <div className="icon"><img src={getImageSrc(image)} alt={imageAltText} {...('lazy' === imageLoad && { loading: 'lazy' })} /></div>
                </div>;
            default:
                return null;
        }
    };

    return (
        <div {...useBlockProps.save({ className, ...advanceAnimationData })}>
            <div className="fun-fact-inner">
                {topIconContent && headerContent()}
                <div className={`content ${contentDisplay}`}>
                    <div className="number-wrapper">
                        <span className="prefix">{`${prefix}`}</span>
                        <span className="number loaded" data-number-format={numberFormat} data-safe={safeNumber} data-number={number} data-duration={duration} data-number-spaces={JSON.stringify(numberRightSpace)}></span>
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