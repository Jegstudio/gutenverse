
import { classnames } from 'gutenverse-core/components';
import { RichText } from '@wordpress/block-editor';
import { getSocialType, renderIcon } from 'gutenverse-core/helper';
import { compose } from '@wordpress/compose';
import { withAnimationAdvanceScript } from 'gutenverse-core/hoc';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';
import { useAnimationAdvanceData } from 'gutenverse-core/hooks';
import { applyFilters } from '@wordpress/hooks';

const save = compose(
    withAnimationAdvanceScript('social-icon'),
)((props) => {
    const {
        attributes
    } = props;

    const {
        elementId,
        icon,
        iconType,
        iconSVG,
        text,
        url,
        linkTarget,
        rel,
        ariaLabel
    } = attributes;

    const advanceAnimationData = useAnimationAdvanceData(attributes);
    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);
    const socialType = getSocialType(icon);
    const iconClass = iconType === 'svg' ? 'svg' : '';

    const className = classnames(
        'guten-element',
        'guten-social-icon',
        elementId,
        socialType,
        iconClass,
        animationClass,
        displayClass,
    );

    const href = applyFilters(
        'gutenverse.dynamic.generate-url',
        url,
        'dynamicUrl',
        attributes,
        elementId
    );

    return <div className={className} {...advanceAnimationData}>
        <a id={elementId} href={href} target={linkTarget} rel={rel} aria-label={ariaLabel}>
            {renderIcon(icon, iconType, iconSVG)}
            {
                text && <RichText.Content
                    value={text}
                    tagName="span"
                />
            }
        </a>
    </div>;
});

export default save;
