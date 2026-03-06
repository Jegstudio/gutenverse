
import { classnames } from 'gutenverse-core/components';
import { useBlockProps } from '@wordpress/block-editor';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';
import { withMouseMoveEffectScript } from 'gutenverse-core/hoc';
import { compose } from '@wordpress/compose';

const save = compose(
    withMouseMoveEffectScript
)(({ attributes }) => {
    const {
        elementId,
        style,
        text,
        titleTag: TitleTag,
        loop,
        splitByWord,
        beforeTextAnimated,
        afterTextAnimated,
        textType,
        rotationTexts,
        highlightedStyle,
        highlightGradient,
        highlightColorType,
        highlightColor,
    } = attributes;

    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);

    const className = classnames(
        'guten-element',
        'guten-animated-text',
        elementId,
        animationClass,
        displayClass,
        {
            [`style-${style}`]: style && style !== 'none'
        },
    );

    const animationProps = {
        loop,
        splitByWord,
        style,
        textType,
        text,
        elementId,
        rotationTexts,
        highlightedStyle,
        highlightGradient,
        highlightColorType,
        highlightColor,
        animationDuration: parseInt(attributes.animationDuration),
        displayDuration: parseInt(attributes.displayDuration),
        transitionDuration: parseInt(attributes.transitionDuration),
    };

    return <div {...useBlockProps.save({ className })} data-animation={JSON.stringify(animationProps)}>
        <TitleTag>
            <span className={'non-animated-text before-text'}>{beforeTextAnimated}</span>
            <span className="text-content">
                <span className="text-wrapper">
                    <span className="letter">{text}</span>
                </span>
                <span className="highlighted" />
            </span>
            <span className={'non-animated-text after-text'}>{afterTextAnimated}</span>
        </TitleTag>
    </div>;
});

export default save;