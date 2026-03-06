
import { classnames } from 'gutenverse-core/components';
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { useAnimationAdvanceData, useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';
import { withAnimationAdvanceScript, withMouseMoveEffectScript } from 'gutenverse-core/hoc';
import { compose } from '@wordpress/compose';
import { applyFilters } from '@wordpress/hooks';
import { renderIcon } from './render-icon';

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
        iconType,
        iconSVG,
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
        animationClass,
    );

    const buttonClass = classnames(
        'guten-button',
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

        return role === 'link' ?
            <a className={buttonClass} href={href} target={linkTarget} aria-label={ariaLabel} rel={rel}>{children}</a> :
            <button className={buttonClass} aria-label={ariaLabel} type="submit">{children}</button>;
    };

    const ButtonTitle = ({ children }) => {
        const title = applyFilters(
            'gutenverse.dynamic.generate-content',
            <RichText.Content value={children} />,
            'dynamicContent',
            attributes,
            elementId
        );

        return (
            <span>{title}</span>
        );
    };

    return (
        <div {...useBlockProps.save({ className, ...advanceAnimationData })}>
            <ButtonElement>
                {showIcon && iconPosition === 'before' && renderIcon(icon, iconType, iconSVG)}
                <ButtonTitle>{content}</ButtonTitle>
                {showIcon && iconPosition === 'after' && renderIcon(icon, iconType, iconSVG)}
            </ButtonElement>
        </div>
    );
});

export default save;