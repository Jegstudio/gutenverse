
import { classnames } from 'gutenverse-core/components';
import { useBlockProps } from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';
import { withAnimationAdvanceScript } from 'gutenverse-core/hoc';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';
import { useAnimationAdvanceData } from 'gutenverse-core/hooks';

const save = compose(
    withAnimationAdvanceScript('advance-carousel'),
)((props) => {
    const {
        attributes
    } = props;

    const {
        elementId
    } = attributes;

    const advanceCarouselData = useAnimationAdvanceData(attributes);
    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);

    const className = classnames(
        'guten-element',
        'guten-advanced-carousel',
        elementId,
        animationClass,
        displayClass,
    );

    return (
        <div {...useBlockProps.save({ className, ...advanceCarouselData })}>
        </div>
    );
});

export default save;