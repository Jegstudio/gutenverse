
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { withMouseMoveEffectScript } from 'gutenverse-core/hoc';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';
import { compose } from '@wordpress/compose';

const SaveSocialShare = compose(
    withMouseMoveEffectScript
)(({ attributes }) => {
    const {
        elementId,
        orientation = 'horizontal',
        layoutMode = 'default',
        buttonLayout = 'split',
    } = attributes;

    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);

    const className = classnames(
        'guten-element',
        'guten-social-share',
        elementId,
        orientation,
        {
            'stretch-layout': layoutMode === 'stretch',
            'button-layout-solid': buttonLayout === 'solid',
        },
        animationClass,
        displayClass,
    );


    return <div {...useBlockProps.save({ className })}>
        <InnerBlocks.Content/>
    </div>;
});

export default SaveSocialShare;
