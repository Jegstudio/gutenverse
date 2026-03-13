/* External dependencies */
import { classnames } from 'gutenverse-core/components';

/* WordPress dependencies */
import { useBlockProps } from '@wordpress/block-editor';
import { useAnimationFrontend, useAnimationAdvanceData, useDisplayFrontend } from 'gutenverse-core/hooks';

const save = ({ attributes })=> {
    const {
        elementId,
    } = attributes;

    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);
    const advanceAnimationData = useAnimationAdvanceData(attributes);

    const className = classnames(
        'guten-element',
        'guten-image',
        elementId,
        animationClass,
        displayClass
    );

    return (
        <div {...useBlockProps.save({ className, ...advanceAnimationData })}>
            {/* Block content */}
        </div>
    );
};

export default save;