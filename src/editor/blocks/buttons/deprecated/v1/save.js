
import { classnames } from 'gutenverse-core/components';
import { compose } from '@wordpress/compose';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { useAnimationAdvanceData, useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';
import { withAnimationAdvanceScript, withMouseMoveEffectScript } from 'gutenverse-core/hoc';

const save = compose(
    withAnimationAdvanceScript('buttons'),
    withMouseMoveEffectScript
)(({ attributes }) => {
    const {
        elementId,
        orientation,
    } = attributes;

    const advanceAnimationData = useAnimationAdvanceData(attributes);
    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);

    const className = classnames(
        'guten-element',
        'guten-buttons',
        `${orientation}`,
        elementId,
        animationClass,
        displayClass,
    );

    return (
        <div {...useBlockProps.save({ className, ...advanceAnimationData })}>
            <InnerBlocks.Content />
        </div>
    );
});

export default save;