
import { classnames } from 'gutenverse-core/components';
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { useAnimationAdvanceData, useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';
import { withAnimationAdvanceScript, withMouseMoveEffectScript } from 'gutenverse-core/hoc';
import { compose } from '@wordpress/compose';
import { applyFilters } from '@wordpress/hooks';

const save = compose(
    withAnimationAdvanceScript('buttons'),
    withMouseMoveEffectScript
)(({ attributes }) => {
    const {
        elementId,
        content,
        url = '#',
        linkTarget,
        rel,
        buttonType,
        buttonSize,
        showIcon,
        icon,
        iconPosition,
        role,
        ariaLabel
    } = attributes;

    const advanceAnimationData = useAnimationAdvanceData(attributes);
    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);

    const className = classnames(
        'guten-element',
        'guten-button-wrapper',
        elementId,
        displayClass,
    );

    const buttonClass = classnames(
        'guten-button',
        animationClass,
        {
            [`guten-button-${buttonType}`]: buttonType && buttonType !== 'default',
            [`guten-button-${buttonSize}`]: buttonSize,
        }
    );

    const ButtonElement = ({ children }) => {
        const href = applyFilters(
            'gutenverse.dynamic.generate-url',
            url,
            'dynamicUrl',
            attributes,
            elementId
        );

        const title = applyFilters(
            'gutenverse.dynamic.generate-content',
            children,
            'dynamicContent',
            attributes,
            elementId
        );

        return role === 'link' ?
            <a className={buttonClass} href={href} target={linkTarget} aria-label={ariaLabel} rel={rel}>{title}</a> :
            <button className={buttonClass} type="submit">{title}</button>;
    };

    return (
        <div {...useBlockProps.save({ className, ...advanceAnimationData })}>
            <ButtonElement>
                {showIcon && iconPosition === 'before' && <i className={`fa-lg ${icon}`} />}
                <span>
                    <RichText.Content value={content} />
                </span>
                {showIcon && iconPosition === 'after' && <i className={`fa-lg ${icon}`} />}
            </ButtonElement>
        </div>
    );
});

export default save;