import { compose } from '@wordpress/compose';
import { classnames } from 'gutenverse-core/components';
import StarIcons from './components/star-icons';
import { withAnimationAdvanceScript, withMouseMoveEffectScript } from 'gutenverse-core/hoc';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';
import { useAnimationAdvanceData } from 'gutenverse-core/hooks';

const save = compose(
    withAnimationAdvanceScript('star-rating'),
    withMouseMoveEffectScript
)((props) => {
    const {
        attributes
    } = props;

    const {
        elementId,
        title,
    } = attributes;

    const advanceAnimationData = useAnimationAdvanceData(attributes);
    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);

    const className = classnames(
        'guten-element',
        'guten-star-rating',
        elementId,
        animationClass,
        displayClass,
    );

    return (
        <div className={className} {...advanceAnimationData}>
            <div className="rating-wrapper">
                <span className="rating-title">{title}</span>
                <StarIcons {...attributes}/>
            </div>
        </div>
    );
});

export default save;