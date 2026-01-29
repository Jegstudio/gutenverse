
import { classnames } from 'gutenverse-core/components';
import { compose } from '@wordpress/compose';
import { InnerBlocks } from '@wordpress/block-editor';
import { useAnimationAdvanceData, useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';
import { withAnimationAdvanceScript, withMouseMoveEffectScript } from 'gutenverse-core/hoc';

const save = compose(
    withAnimationAdvanceScript('countdown'),
    withMouseMoveEffectScript,
)(({ attributes }) => {
    const {
        elementId,
        showDays,
        labelDays,
        showHours,
        labelHours,
        showMinutes,
        labelMinutes,
        showSeconds,
        labelSeconds,
        dueDate,
        showDivider,
        dividerType,
        labelPosition,
        expiredAction,
        expiredUrl,
    } = attributes;

    const advanceAnimationData = useAnimationAdvanceData(attributes);
    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);

    const className = classnames(
        'guten-element',
        'guten-countdown',
        elementId,
        animationClass,
        displayClass,
    );

    return <div className={className} {...advanceAnimationData} data-duedate={JSON.stringify(dueDate)} data-expired={JSON.stringify({action: expiredAction, url: expiredUrl })}>
        <div className="guten-countdown-wrapper">
            {showDays && <>
                <div className="time-container days-wrapper">
                    { ( labelDays && (labelPosition === 'left' || labelPosition === 'top' ) ) && <div className="countdown-label">{labelDays}</div> }
                    <div className="countdown-value">0</div>
                    { ( labelDays && (labelPosition === 'right' || labelPosition === 'bottom' ) ) && <div className="countdown-label">{labelDays}</div> }
                </div>
                {showDivider && <div className="countdown-divider">{dividerType}</div>}
            </>}
            {showHours && <>
                <div className="time-container hours-wrapper">
                    { ( labelHours && (labelPosition === 'left' || labelPosition === 'top' ) ) && <div className="countdown-label">{labelHours}</div> }
                    <div className="countdown-value">0</div>
                    { ( labelHours && (labelPosition === 'right' || labelPosition === 'bottom' ) ) && <div className="countdown-label">{labelHours}</div> }
                </div>
                {showDivider && <div className="countdown-divider">{dividerType}</div>}
            </>}
            {showMinutes && <>
                <div className="time-container minutes-wrapper">
                    { ( labelMinutes && (labelPosition === 'left' || labelPosition === 'top' ) ) && <div className="countdown-label">{labelMinutes}</div> }
                    <div className="countdown-value">0</div>
                    { ( labelMinutes && (labelPosition === 'right' || labelPosition === 'bottom' ) ) && <div className="countdown-label">{labelMinutes}</div> }
                </div>
                {(showDivider && showSeconds) && <div className="countdown-divider">{dividerType}</div>}
            </>}
            {showSeconds && <div className="time-container seconds-wrapper">
                { ( labelSeconds && (labelPosition === 'left' || labelPosition === 'top' ) ) && <div className="countdown-label">{labelSeconds}</div> }
                <div className="countdown-value">0</div>
                { ( labelSeconds && (labelPosition === 'right' || labelPosition === 'bottom' ) ) && <div className="countdown-label">{labelSeconds}</div> }
            </div>}
        </div>
        {
            expiredAction === 'section' && <div className="countdown-expired-wrapper">
                <InnerBlocks.Content/>
            </div>
        }
    </div>;
});

export default save;