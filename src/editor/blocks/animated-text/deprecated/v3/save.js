
import { classnames } from 'gutenverse-core/components';
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
        splitByWord
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

    const loadAnimatedText = () => {
        switch (style) {
            case 'jump':
            case 'bend':
            case 'drop':
            case 'flip':
            case 'pop':
                return <TitleTag className="text-content">
                    <span className="text-wrapper">
                        <span className="letters">{text}</span>
                    </span>
                </TitleTag>;
            default:
                return <TitleTag className="text-content">{text}</TitleTag>;
        }
    };

    return (
        <div className={className} data-animation={style} data-loop={loop} data-wordsplit={splitByWord}>
            {loadAnimatedText()}
        </div>
    );
});

export default save;