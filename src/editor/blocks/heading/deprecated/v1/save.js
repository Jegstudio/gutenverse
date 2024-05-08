/* External dependencies */

import { classnames } from 'gutenverse-core/components';

/* WordPress dependencies */
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';

/* Gutenverse dependencies */
import { withAnimationAdvanceScript, withMouseMoveEffectScript } from 'gutenverse-core/hoc';
import { useAnimationFrontend, useDisplayFrontend, useAnimationAdvanceData } from 'gutenverse-core/hooks';

const save = compose(
    withAnimationAdvanceScript('heading'),
    withMouseMoveEffectScript
)((props) => {
    const {
        attributes
    } = props;

    const {
        elementId,
        content,
        type,
    } = attributes;

    const advanceAnimationData = useAnimationAdvanceData(attributes);
    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);

    const TagName = 'h' + type;
    const className = classnames(
        'guten-element',
        elementId,
        animationClass,
        displayClass,
    );

    const blockProps = useBlockProps.save({
        className: className,
        ...advanceAnimationData
    });

    return (
        <TagName {...blockProps}>
            <RichText.Content value={content} />
        </TagName>
    );
});

export default save;