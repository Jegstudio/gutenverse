import { compose } from '@wordpress/compose';

import { classnames } from 'gutenverse-core/components';
import { InnerBlocks, RichText } from '@wordpress/block-editor';
import { withAnimationAdvanceScript, withMouseMoveEffectScript } from 'gutenverse-core/hoc';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';
import { useAnimationAdvanceData } from 'gutenverse-core/hooks';
import { applyFilters } from '@wordpress/hooks';
import { isEmpty } from 'gutenverse-core/helper';
import { imagePlaceholder } from 'gutenverse-core/config';

const ImageBoxFigure = attributes => {
    const { image, imageAlt, lazyLoad } = attributes;
    const { media = {}, size } = image || {};
    const { imageId, sizes = {} } = media || {};

    const imageAltText = imageAlt || null;

    // Handle if empty, pick the 'full' size. If 'full' size also not exist, return placeholder image.
    const imageLazyLoad = () => {
        if (lazyLoad) {
            return <img className="gutenverse-image-box-empty" src={imagePlaceholder} alt={imageAltText} loading="lazy" />;
        } else {
            return <img className="gutenverse-image-box-empty" src={imagePlaceholder} alt={imageAltText} />;
        }
    };
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
        if (lazyLoad) {
            return <img className="gutenverse-image-box-filled" src={imageSrc.url} height={imageSrc.height} width={imageSrc.width} alt={imageAltText} loading="lazy" />;
        } else {
            return <img className="gutenverse-image-box-filled" src={imageSrc.url} height={imageSrc.height} width={imageSrc.width} alt={imageAltText} />;
        }
    }
    return imageLazyLoad();
};

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
        hoverBottom,
        hoverBottomDirection,
        hasInnerBlocks,
        includeButton
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
                <ImageBoxFigure {...attributes} />
            </div>
            <div className="image-box-body">
                {
                    <div className="body-inner">
                        {
                            title && <TitleTag className={classnames(
                                'body-title',
                                `icon-position-${titleIconPosition}`
                            )}>
                                {titleIconPosition === 'before' && titleIcon !== '' && <i className={titleIcon} />}
                                <RichText.Content
                                    value={title}
                                    tagName="span"
                                />
                                {titleIconPosition === 'after' && titleIcon !== '' && <i className={titleIcon} />}
                            </TitleTag>
                        }
                        {
                            description && <RichText.Content
                                className="body-description"
                                value={description}
                                tagName="p"
                            />
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
            {hasInnerBlocks && includeButton ? <ContentBody /> : <WrapAHref {...props}>
                <ContentBody />
            </WrapAHref>}
        </div>
    );
});

export default save;