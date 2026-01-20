import { compose } from '@wordpress/compose';
import { classnames } from 'gutenverse-core/components';
import { InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor';
import { svgAtob, renderIcon, renderGradientElement } from 'gutenverse-core/helper';
import { getImageSrc } from 'gutenverse-core/editor-helper';
import { withAnimationAdvanceScript, withMouseMoveEffectScript } from 'gutenverse-core/hoc';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';
import { useAnimationAdvanceData } from 'gutenverse-core/hooks';
import { applyFilters } from '@wordpress/hooks';

const WrapAHref = ({ attributes, children }) => {
    const {
        url,
        linkTarget,
        rel,
        buttonClass = '',
        elementId,
        anchorAriaLabel
    } = attributes;

    if (url !== undefined && url !== '') {
        const href = applyFilters(
            'gutenverse.dynamic.generate-url',
            url,
            'dynamicUrl',
            attributes,
            elementId
        );
        const ariaLabelContent = anchorAriaLabel ? anchorAriaLabel : null;
        return <a aria-label={ariaLabelContent} className={buttonClass} href={href} target={linkTarget} rel={rel}>
            {children}
        </a>;
    } else {
        return children;
    }
};

const save = compose(
    withAnimationAdvanceScript('icon-box'),
    withMouseMoveEffectScript
)((props) => {
    const {
        attributes
    } = props;

    const {
        elementId,
        title,
        titleTag,
        description,
        image,
        imageAlt,
        altType,
        icon,
        iconSVG,
        iconType,
        iconPosition,
        iconStyleMode = 'color',
        watermarkIcon,
        watermarkIconType,
        watermarkIconSVG,
        watermarkShow,
        badgeShow,
        badge,
        badgePosition,
        iconBoxOverlayDirection = 'left',
        lazyLoad,
        showTitle,
        showDesc,
        iconGradient,
        iconGradientHover
    } = attributes;

    const advanceAnimationData = useAnimationAdvanceData(attributes);
    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);
    let imageAltText = imageAlt || null;

    switch (altType) {
        case 'original':
            imageAltText = image.altOriginal;
            break;
        case 'custom':
            imageAltText = imageAlt;
            break;
    }

    const className = classnames(
        'guten-element',
        elementId,
        animationClass,
        displayClass,
        'guten-icon-box',
        `icon-position-${iconPosition}`
    );

    const imageLazyLoad = () => {
        const height = image?.height;
        const width = image?.width;

        return <img src={getImageSrc(image)} alt={imageAltText} {...(lazyLoad && { loading: 'lazy' })} {...(height && { height })} {...(width && { width })} />;
    };

    const iconContent = () => {
        switch (iconType) {
            case 'icon':
                return <div className="icon-box icon-box-header">
                    <div className={`icon bg-style-${iconStyleMode}`}>
                        <i className={`${icon} icon-style-${iconStyleMode}`}></i>
                    </div>
                </div>;
            case 'svg':
                return <div className="icon-box icon-box-header">
                    <div className={`icon bg-style-${iconStyleMode}`}>
                        <div
                            className="gutenverse-icon-svg"
                            dangerouslySetInnerHTML={{ __html: svgAtob(iconSVG) }}
                        />
                        {(iconGradient || iconGradientHover) && (
                            <svg style={{ width: '0', height: '0', position: 'absolute' }} aria-hidden="true" focusable="false">
                                <defs>
                                    {iconGradient && renderGradientElement(iconGradient, `iconGradient-${elementId}`)}
                                    {iconGradientHover && renderGradientElement(iconGradientHover, `iconGradientHover-${elementId}`)}
                                </defs>
                            </svg>
                        )}
                    </div>
                </div>;
            case 'image':
                return <div className="icon-box icon-box-header">
                    <div className={`icon bg-style-${iconStyleMode} type-image`}>
                        {imageLazyLoad()}
                    </div>
                </div>;
            default:
                return null;
        }
    };
    const ContentBody = () => (
        <div className={`guten-icon-box-wrapper hover-from-${iconBoxOverlayDirection}`}>
            {iconPosition !== 'bottom' && <WrapAHref {...props}>{iconContent()}</WrapAHref>}
            {
                (title || description) && <div className="icon-box icon-box-body">
                    {
                        showTitle && title && title !== '' && <WrapAHref {...props}>
                            <RichText.Content
                                className={'title'}
                                value={title}
                                tagName={titleTag}
                            />
                        </WrapAHref>
                    }
                    {
                        showDesc && description && description !== '' && <WrapAHref {...props}>
                            <RichText.Content
                                className="icon-box-description"
                                value={description}
                                tagName="p"
                            />
                        </WrapAHref>
                    }
                    <InnerBlocks.Content />
                </div>
            }
            {iconPosition === 'bottom' && <WrapAHref {...props}>{iconContent()}</WrapAHref>}
            {badgeShow && <WrapAHref {...props}>
                <div className={`icon-box-badge ${badgePosition}`}>
                    <RichText.Content
                        className={'badge-text'}
                        value={badge}
                        tagName={'span'}
                    />
                </div>
            </WrapAHref>}
            {watermarkShow && <WrapAHref {...props}>
                <div className="hover-watermark">
                    {renderIcon(watermarkIcon, watermarkIconType, watermarkIconSVG)}
                </div>
            </WrapAHref>}
        </div>
    );
    return (
        <div className={className} {...advanceAnimationData}>
            <ContentBody />
        </div>
    );
});

export default save;