import { compose } from '@wordpress/compose';
import { classnames } from 'gutenverse-core/components';
import ProgressContent from './components/progress-content';
import { withAnimationAdvanceScript, withMouseMoveEffectScript } from 'gutenverse-core/hoc';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';
import { useAnimationAdvanceData } from 'gutenverse-core/hooks';

const save = compose(
    withAnimationAdvanceScript('progress-bar'),
    withMouseMoveEffectScript
)((props) => {
    const {
        attributes
    } = props;

    const {
        elementId,
        style,
    } = attributes;

    const advanceAnimationData = useAnimationAdvanceData(attributes);
    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);

    const className = classnames(
        'guten-element',
        'guten-progress-bar',
        'no-margin',
        elementId,
        animationClass,
        displayClass
    );

    const wrapperClass = classnames(
        'progress-group',
        {
            [`${style}`]: style && style !== 'default'
        },
    );

    return (
        <div className={className} {...advanceAnimationData} id={attributes.anchor || undefined}>
            <div className={wrapperClass}>
                <div className="progress-skill-bar">
                    <ProgressContent {...props} />
                </div>
            </div>
        </div>
    );
});

export default save;