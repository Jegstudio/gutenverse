
import { classnames } from 'gutenverse-core/components';
import { RichText } from '@wordpress/block-editor';
import { getSocialType } from 'gutenverse-core/helper';
import { compose } from '@wordpress/compose';
import { withAnimationAdvanceScript } from 'gutenverse-core/hoc';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';
import { useAnimationAdvanceData } from 'gutenverse-core/hooks';

const save = compose(
    withAnimationAdvanceScript('social-icon'),
)((props) => {
    const {
        attributes
    } = props;

    const {
        elementId,
        icon,
        text,
        url,
        linkTarget,
        rel,
    } = attributes;

    const advanceAnimationData = useAnimationAdvanceData(attributes);
    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);
    const socialType = getSocialType(icon);

    const className = classnames(
        'guten-element',
        'guten-social-icon',
        elementId,
        socialType,
        animationClass,
        displayClass
    );

    return <div className={className} {...advanceAnimationData}>
        <a id={elementId} href={url} target={ linkTarget } rel={ rel }>
            <i className={icon}/>
            <RichText.Content
                value={text}
                tagName="span"
            />
        </a>
    </div>;
});

export default save;