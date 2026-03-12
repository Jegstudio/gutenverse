import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { withAnimationAdvanceScript, withMouseMoveEffectScript } from 'gutenverse-core/hoc';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';
import { useAnimationAdvanceData } from 'gutenverse-core/hooks';
import { compose } from '@wordpress/compose';

const save = compose(
    withAnimationAdvanceScript('team'),
    withMouseMoveEffectScript
)((props) => {
    const { attributes } = props;
    const { elementId } = attributes;

    const advanceAnimationData = useAnimationAdvanceData(attributes);
    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);

    const className = classnames(
        'guten-element',
        'guten-team',
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