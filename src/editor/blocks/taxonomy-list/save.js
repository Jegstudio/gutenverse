
import { classnames } from 'gutenverse-core/components';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';
import { withAnimationAdvanceScript, withMouseMoveEffectScript } from 'gutenverse-core/hoc';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';
import { useAnimationAdvanceData } from 'gutenverse-core/hooks';

const save = compose(
    withAnimationAdvanceScript('taxonomy-list'),
    withMouseMoveEffectScript
)((props) => {
    const {
        attributes
    } = props;

    const {
        elementId,
    } = attributes;

    const advanceAnimationData = useAnimationAdvanceData(attributes);
    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);

    const className = classnames(
        'guten-element',
        'guten-taxonomy-list',
        elementId,
        animationClass,
        displayClass,
    );

    return (
        <div {...useBlockProps.save({ className, ...advanceAnimationData })}>
        </div>
    );
});

export default save;