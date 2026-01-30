
import { classnames } from 'gutenverse-core/components';
import { compose } from '@wordpress/compose';
import { withAnimationAdvanceScript, withMouseMoveEffectScript } from 'gutenverse-core/hoc';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';
import { useAnimationAdvanceData } from 'gutenverse-core/hooks';

const save = compose(
    withAnimationAdvanceScript('advance-heading'),
    withMouseMoveEffectScript
)((props) => {
    const {
        attributes
    } = props;
    const {
        elementId,
        titleTag: TitleTag,
        subTag: SubTag,
        text,
        focusText,
        subText,
        showSub,
        showLine,
    } = attributes;
    const advanceAnimationData = useAnimationAdvanceData(attributes);
    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);
    const className = classnames(
        'guten-element',
        'guten-advanced-heading',
        elementId,
        animationClass,
        displayClass,
    );
    return (
        <div className={className} {...advanceAnimationData}>
            {showLine === 'top' && <div className="heading-line top"></div>}
            {showSub === 'top' && <SubTag className="heading-subtitle">{subText}</SubTag>}
            {showSub === 'top' && showLine === 'between' && <div className="heading-line between"></div>}
            <div className={`heading-section ${['top', 'bottom', 'between'].includes(showLine) ? 'outside-line' : ''}`}>
                {showLine === 'before' && <div className="heading-line before"></div>}
                <TitleTag className="heading-title">
                    {text}
                    <span className="heading-focus">{focusText}</span>
                </TitleTag>
                {showLine === 'after' && <div className="heading-line after"></div>}
            </div>
            {showSub === 'bottom' && showLine === 'between' && <div className="heading-line between"></div>}
            {showSub === 'bottom' && <SubTag className="heading-subtitle">{subText}</SubTag>}
            {showLine === 'bottom' && <div className="heading-line bottom"></div>}
        </div>
    );
});

export default save;