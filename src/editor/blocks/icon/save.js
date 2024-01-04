import { compose } from '@wordpress/compose';
import { useBlockProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { isEmpty } from 'lodash';
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

    return <div {...useBlockProps.save({ className, ...advanceAnimationData })}>
        {!isEmpty(url) ? <a className={wrapperClass} href={url} target={ linkTarget } rel={ rel } aria-label={ariaLabel}>
            <i className={`${icon}`}/>
        </a> : <span className={wrapperClass}>
            <i className={`${icon}`}/>
        </span>}
    </div>;
});

export default save;