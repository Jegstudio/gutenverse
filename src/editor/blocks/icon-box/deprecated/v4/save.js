import { compose } from '@wordpress/compose';
import { classnames } from 'gutenverse-core/components';
import { InnerBlocks, RichText } from '@wordpress/block-editor';
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
    } = attributes;

    if (url !== undefined && url !== '') {
        const href = applyFilters(
            'gutenverse.dynamic.generate-url',
            url,
            'dynamicUrl',
            attributes,
            elementId
        );
        return <a className={buttonClass} href={href} target={linkTarget} rel={rel}>
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
        lazyLoad,
        hasInnerBlocks
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
        `icon-position-${iconPosition}`
    );

    const imageLazyLoad = () => {
        if (lazyLoad) {
            return <img src={getImageSrc(image)} alt={imageAltText} loading="lazy" />;
        } else {
            return <img src={getImageSrc(image)} alt={imageAltText} />;
        }
    };
    const iconContent = () => {
        switch (iconType) {
            case 'icon':
                return <div className="icon-box icon-box-header">
                    <div className={`icon style-${iconStyleMode}`}>
                        <i className={icon}></i>
                    </div>
                </div>;
            case 'image':
                return <div className="icon-box icon-box-header">
                    <div className={`icon style-${iconStyleMode} type-image`}>
                        {imageLazyLoad()}
                    </div>
                </div>;
            default:
                return null;
        }
    };
    const ContentBody = () => (
        <div className={`guten-icon-box-wrapper hover-from-${iconBoxOverlayDirection}`}>
            {iconPosition !== 'bottom' && iconContent()}
            {
                (title || description) && <div className="icon-box icon-box-body">
                    {
                        title && title !== '' && <RichText.Content
                            className={'title'}
                            value={title}
                            tagName={titleTag}
                        />
                    }
                    {
                        description && description !== '' && <RichText.Content
                            className="icon-box-description"
                            value={description}
                            tagName="p"
                        />
                    }
                    <InnerBlocks.Content />
                </div>
            }
            {iconPosition === 'bottom' && iconContent()}
            {badgeShow && <div className={`icon-box-badge ${badgePosition}`}>
                <RichText.Content
                    className={'badge-text'}
                    value={badge}
                    tagName={'span'}
                />
            </div>}
            {watermarkShow && <div className="hover-watermark">
                <i className={watermarkIcon}></i>
            </div>}
        </div>
    );
    return (
        <div className={className} {...advanceAnimationData} >
            {hasInnerBlocks ? <ContentBody /> : <WrapAHref {...props}>
                <ContentBody />
            </WrapAHref>}
        </div>
    );
});

export default save;