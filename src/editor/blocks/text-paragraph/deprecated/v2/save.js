import { compose } from '@wordpress/compose';

import { classnames } from 'gutenverse-core/components';
import { withAnimationAdvanceScript, withMouseMoveEffectScript } from 'gutenverse-core/hoc';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';
import { useAnimationAdvanceData } from 'gutenverse-core/hooks';
import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

const save = compose(
    withAnimationAdvanceScript('text-paragraph'),
    withMouseMoveEffectScript
)((props) => {
    const {
        attributes
    } = props;

    const {
        elementId,
        paragraph,
        legacyClassName
    } = attributes;

    const advanceAnimationData = useAnimationAdvanceData(attributes);
    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);

    const className = legacyClassName || classnames(
        'guten-element',
        'gutenverse-text',
        elementId,
        animationClass,
        displayClass,
    );

    return (
        <p aria-label={__('Text Paragraph', 'gutenverse')} className={className} {...advanceAnimationData}>
            <RichText.Content value={paragraph} />
        </p>
    );
});

export default save;
