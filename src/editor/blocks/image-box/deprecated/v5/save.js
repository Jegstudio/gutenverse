import { compose } from '@wordpress/compose';
import { classnames } from 'gutenverse-core/components';
import { InnerBlocks, RichText } from '@wordpress/block-editor';
import { imagePlaceholder } from 'gutenverse-core/config';
import { withAnimationAdvanceScript, withMouseMoveEffectScript } from 'gutenverse-core/hoc';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';
import { useAnimationAdvanceData } from 'gutenverse-core/hooks';
import { applyFilters } from '@wordpress/hooks';
import { renderIcon } from 'gutenverse-core/helper';
import { isEmpty } from 'gutenverse-core/helper';

const WrapAHref = ({ attributes, children }) => {
    const {
        url,
        linkTarget,
        rel,
        buttonClass = '',
        ariaLabel,
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
        return <a className={buttonClass} href={href} target={linkTarget} aria-label={ariaLabel} rel={rel}>
            {children}
        </a>;
    } else {
        return children;
    }
};

const save = compose(
    withAnimationAdvanceScript('image-box'),
    withMouseMoveEffectScript
)((props) => {
    const {
        attributes
    } = props;

    const {
        elementId,
        contentStyle,
        titleTag: TitleTag,
        title,
        titleIconPosition,
        description,
        titleIcon,
        titleIconType,
        titleIconSVG,
        hoverBottom,
        hoverBottomDirection,
        includeButton,
    } = attributes;

    const advanceAnimationData = useAnimationAdvanceData(attributes);
    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);

    const className = classnames(
        elementId,
        animationClass,
        displayClass,
        'guten-image-box',
        'guten-element',
        `style-${contentStyle}`,
    );

    const ContentBody = () => (
        <div className="inner-container">
            <div className="image-box-header">
                <WrapAHref {...props}>
                    <ImageBoxFigure {...attributes} />
                </WrapAHref>
            </div>
            <div className="image-box-body">
                {
                    <div className="body-inner">
                        {
                            title && <WrapAHref {...props}>
                                <TitleTag className={classnames(
                                    'body-title',
                                    `icon-position-${titleIconPosition}`
                                )}>
                                    {titleIconPosition === 'before' && <span className="image-box-icon icon-position-before">
                                        {renderIcon(titleIcon, titleIconType, titleIconSVG)}
                                    </span>}
                                    <RichText.Content
                                        value={title}
                                        tagName="span"
                                    />
                                    {titleIconPosition === 'after' && <span className="image-box-icon icon-position-after">
                                        {renderIcon(titleIcon, titleIconType, titleIconSVG)}
                                    </span>}
                                </TitleTag>
                            </WrapAHref>
                        }
                        {
                            description && <WrapAHref {...props}>
                                <RichText.Content
                                    className="body-description"
                                    value={description}
                                    tagName="p"
                                />
                            </WrapAHref>
                        }
                        {includeButton && <InnerBlocks.Content />}
                        {hoverBottom && <div className={'border-bottom'}>
                            <div className={`animated ${hoverBottomDirection}`}></div>
                        </div>}
                    </div>
                }
            </div>
        </div>
    );

    return (
        <div className={className} {...advanceAnimationData}>
            <ContentBody />
        </div>
    );
});

const ImageBoxFigure = attributes => {
    const { image, imageAlt, altType, altOriginal, lazyLoad } = attributes;
    const { media = {}, size } = image || {};
    const { imageId, sizes = {} } = media || {};

    let imageAltText = imageAlt || null;

    switch (altType) {
        case 'original':
            imageAltText = altOriginal;
            break;
        case 'custom':
            imageAltText = imageAlt;
            break;
    }

    // Handle if empty, pick the 'full' size. If 'full' size also not exist, return placeholder image.
    const imageLazyLoad = () => <img className="gutenverse-image-box-empty" src={imagePlaceholder} alt={imageAltText} {...(lazyLoad && { loading: 'lazy' })} />;

    if (isEmpty(sizes)) {
        return imageLazyLoad();
    }

    let imageSrc = sizes[size];

    if (isEmpty(imageSrc)) {
        if (isEmpty(sizes['full'])) {
            return imageLazyLoad();
        }

        imageSrc = sizes['full'];
    }

    if (imageId && imageSrc) {
        return <img className="gutenverse-image-box-filled" src={imageSrc.url} height={imageSrc.height} width={imageSrc.width} alt={imageAltText} {...(lazyLoad && { loading: 'lazy' })} />;
    }

    return imageLazyLoad();
};

export default save;