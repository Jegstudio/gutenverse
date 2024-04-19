import { compose } from '@wordpress/compose';

import { classnames } from 'gutenverse-core/components';
import { useBlockProps } from '@wordpress/block-editor';
import { InnerBlocks } from '@wordpress/block-editor';
import { withAnimationAdvanceScript, withMouseMoveEffectScript } from 'gutenverse-core/hoc';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';
import { useAnimationAdvanceData } from 'gutenverse-core/hooks';
import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

const save = compose(
    withAnimationAdvanceScript('text'),
    withMouseMoveEffectScript
)((props) => {
    const {
        attributes
    } = props;

    const {
        elementId,
        paragraph
    } = attributes;

    const advanceAnimationData = useAnimationAdvanceData(attributes);
    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);

    const className = classnames(
        'guten-element',
        'gutenverse-text',
        elementId,
        animationClass,
        displayClass,
    );
    return (
        <RichText.Content
            tagName={'p'}
            aria-label={__('Text Paragraph', 'gutenverse')}
            value={paragraph}
            {...useBlockProps.save({ className, ...advanceAnimationData })}
        />
    );
});

export default save;