
import { InnerBlocks } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { withAnimationAdvanceScript, withMouseMoveEffectScript } from 'gutenverse-core/hoc';
import { useAnimationAdvanceData, useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';
import { compose } from '@wordpress/compose';

export const save = compose(
    withAnimationAdvanceScript('accordions'),
    withMouseMoveEffectScript
)(({ attributes }) => {
    const {
        elementId,
    } = attributes;

    const advanceAnimationData = useAnimationAdvanceData(attributes);
    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);

    const className = classnames(
        'guten-element',
        'guten-accordions',
        elementId,
        animationClass,
        displayClass,
    );

    return <div className={className} {...advanceAnimationData}>
        <InnerBlocks.Content />
    </div>;
});

export default save;