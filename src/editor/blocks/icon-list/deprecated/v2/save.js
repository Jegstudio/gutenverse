
import { classnames } from 'gutenverse-core/components';
import { InnerBlocks } from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';
import { withAnimationAdvanceScript, withMouseMoveEffectScript } from 'gutenverse-core/hoc';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';
import { useAnimationAdvanceData } from 'gutenverse-core/hooks';

const save = compose(
    withAnimationAdvanceScript('icon-list'),
    withMouseMoveEffectScript
)((props) => {
    const {
        attributes
    } = props;

    const {
        elementId,
        displayInline,
    } = attributes;

    const advanceAnimationData = useAnimationAdvanceData(attributes);
    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);

    const className = classnames(
        'guten-element',
        'guten-icon-list',
        elementId,
        animationClass,
        displayClass,
    );

    return (
        <div className={className} {...advanceAnimationData}>
            <div className={ ` list-wrapper ${displayInline ? 'inline-icon-list' : ''}`} >
                <InnerBlocks.Content/>
            </div>
        </div>
    );
});

export default save;