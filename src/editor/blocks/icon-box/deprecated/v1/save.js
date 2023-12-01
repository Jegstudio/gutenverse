import { compose } from '@wordpress/compose';

import { classnames } from 'gutenverse-core/components';
import { InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor';
import { getImageSrc } from 'gutenverse-core/editor-helper';
import { withAnimationAdvanceScript } from 'gutenverse-core/hoc';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';
import { useAnimationAdvanceData } from 'gutenverse-core/hooks';

const WrapAHref = ({ attributes, children }) => {
    const {
        url,
        linkTarget,
        rel,
        buttonClass = '',
    } = attributes;

    if (url !== undefined && url !== '') {
        return <a className={buttonClass} href={url} target={linkTarget} rel={rel}>
            {children}
        </a>;
    } else {
        return children;
    }
};

const save = compose(
    withAnimationAdvanceScript('icon-box')
)((props) => {
    const {
        attributes
    } = props;

    const {
        elementId,
        title,
        titleTag: TitleTag,
        description,
        image,
        imageAlt,
        icon,
        iconType,
        iconPosition,
        iconStyleMode = 'color',
        watermarkIcon,
        watermarkShow,
        badgeShow,
        badge,
        badgePosition,
        iconBoxOverlayDirection = 'left',
    } = attributes;

    const advanceAnimationData = useAnimationAdvanceData(attributes);
    const imageAltText = imageAlt || null;
    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);

    const className = classnames(
        'guten-element',
        elementId,
        animationClass,
        displayClass,
        'guten-icon-box',
    );

    const iconContent = () => {
        switch (iconType) {
            case 'icon':
                return <div className="icon-box icon-box-header">
                    <div className={`icon style-${iconStyleMode}`}>
                        <WrapAHref {...props}>
                            <i className={icon}></i>
                        </WrapAHref>
                    </div>
                </div>;
            case 'image':
                return <div className="icon-box icon-box-header">
                    <div className={`icon style-${iconStyleMode}`}>
                        <WrapAHref {...props}>
                            <img src={getImageSrc(image)} alt={imageAltText} />
                        </WrapAHref>
                    </div>
                </div>;
            default:
                return null;
        }
    };

    return (
        <div {...useBlockProps.save({ className, ...advanceAnimationData })} >
            <div className={`guten-icon-box-wrapper hover-from-${iconBoxOverlayDirection}`}>
                {iconContent()}
                <div className="icon-box icon-box-body">
                    <WrapAHref {...props}>
                        <TitleTag className="title">{title}</TitleTag>
                    </WrapAHref>
                    <RichText.Content
                        className="icon-box-description"
                        value={description}
                        tagName="p"
                    />
                    <InnerBlocks.Content />
                </div>
                {badgeShow && <div className={`icon-box-badge ${badgePosition}`}>
                    <span className="badge-text">{badge}</span>
                </div>}
                {watermarkShow && <div className="hover-watermark">
                    <i className={watermarkIcon}></i>
                </div>}
            </div>
        </div>
    );
});

export default save;