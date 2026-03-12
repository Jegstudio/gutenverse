
import { classnames } from 'gutenverse-core/components';
import { InnerBlocks } from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';
import { withAnimationAdvanceScript, withMouseMoveEffectScript } from 'gutenverse-core/hoc';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';
import { useAnimationAdvanceData } from 'gutenverse-core/hooks';

const saveV1 = compose(
    withAnimationAdvanceScript('social-icons'),
    withMouseMoveEffectScript
)((props) => {
    const {
        attributes
    } = props;

    const {
        elementId,
        showText,
        shape,
        color,
        orientation,
    } = attributes;

    const advanceAnimationData = useAnimationAdvanceData(attributes);
    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);

    const className = classnames(
        'guten-element',
        'guten-social-icons',
        elementId,
        shape,
        orientation,
        color,
        animationClass,
        displayClass,
        {
            'show-text': showText,
        },
    );

    return <div className={className} {...advanceAnimationData}>
        <InnerBlocks.Content/>
    </div>;
});

export default saveV1;
