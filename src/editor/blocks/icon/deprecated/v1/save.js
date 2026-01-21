import { compose } from '@wordpress/compose';
import { classnames } from 'gutenverse-core/components';
import { applyFilters } from '@wordpress/hooks';
import { isEmpty } from 'gutenverse-core/helper';
import { withAnimationAdvanceScript, withMouseMoveEffectScript } from 'gutenverse-core/hoc';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';
import { useAnimationAdvanceData } from 'gutenverse-core/hooks';

const save = compose(
    withAnimationAdvanceScript('icon'),
    withMouseMoveEffectScript
)((props) => {
    const {
        attributes
    } = props;

    const {
        elementId,
        icon,
        url,
        ariaLabel,
        linkTarget,
        rel,
        iconShape,
        iconView,
    } = attributes;

    const advanceAnimationData = useAnimationAdvanceData(attributes);
    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);

    const className = classnames(
        'guten-element',
        elementId,
        'guten-icon',
        animationClass,
        displayClass,
    );

    const wrapperClass = classnames(
        'guten-icon-wrapper',
        iconShape,
        iconView,
    );

    const IconELement = () => {
        const href = applyFilters(
            'gutenverse.dynamic.generate-url',
            url,
            'dynamicUrl',
            attributes,
            elementId
        );

        const iconElement = !isEmpty(url) ?
            <a className={wrapperClass} href={href} target={ linkTarget } rel={ rel } aria-label={ariaLabel}>
                <i className={`${icon}`}/>
            </a> : <a className={wrapperClass} href={'#'}>
                <i className={`${icon}`}/>
            </a>;

        return iconElement;
    };
    return <div className={className} {...advanceAnimationData}>
        <IconELement />
    </div>;
});

export default save;