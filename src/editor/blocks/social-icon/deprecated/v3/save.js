
import { classnames } from 'gutenverse-core/components';
import { RichText } from '@wordpress/block-editor';
import { getSocialType, renderIcon } from 'gutenverse-core/helper';

const saveV3 = (props) => {
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

    const socialType = getSocialType(icon);
    const iconClass = iconType === 'svg' ? 'svg' : '';

    const className = classnames(
        'guten-element',
        'guten-social-icon',
        elementId,
        socialType,
        iconClass,
    );

    return (
        <div className={className}>
            <a id={elementId} href={url} target={linkTarget} rel={rel} aria-label={ariaLabel}>
                {renderIcon(icon, iconType, iconSVG)}
                {
                    text && <RichText.Content
                        value={text}
                        tagName="span"
                    />
                }
            </a>
        </div>
    );
};

export default saveV3;
