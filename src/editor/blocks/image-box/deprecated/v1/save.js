import { compose } from '@wordpress/compose';

import { classnames } from 'gutenverse-core/components';
import { InnerBlocks, RichText } from '@wordpress/block-editor';
import { withAnimationAdvanceScript } from 'gutenverse-core/hoc';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';
import { useAnimationAdvanceData } from 'gutenverse-core/hooks';
import { oldImagePlaceholder } from 'gutenverse-core/config';
import { isEmpty } from 'gutenverse-core/helper';

const ImageBoxFigure = attributes => {
    const { image, imageAlt, lazyLoad } = attributes;
    const { media = {}, size } = image || {};
    const { imageId, sizes = {} } = media || {};

    const imageAltText = imageAlt || null;

    // Handle if empty, pick the 'full' size. If 'full' size also not exist, return placeholder image.
    const imageLazyLoad = () => {
        if(lazyLoad){
            return <img className="gutenverse-image-box-empty"  src={oldImagePlaceholder} alt={imageAltText} loading="lazy" />;
        }else{
            return <img className="gutenverse-image-box-empty"  src={oldImagePlaceholder} alt={imageAltText} />;
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
        if(lazyLoad){
            return <img className="gutenverse-image-box-filled" src={imageSrc.url} height={imageSrc.height} width={imageSrc.width} alt={imageAltText} loading="lazy" />;
        }else{
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
    } = attributes;

    if (url !== undefined && url !== '') {
        return <a className={buttonClass} href={url} target={linkTarget} rel={rel} aria-label={ariaLabel}>
            {children}
        </a>;
    } else {
        return children;
    }
};

const save = compose(
    withAnimationAdvanceScript('image-box')
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
    } = attributes;

    const advanceAnimationData = useAnimationAdvanceData(attributes);
    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);

    const className = classnames(
        elementId,
        animationClass,
        displayClass,
        'gutenverse-image-box',
        'guten-element',
        `style-${contentStyle}`,
    );

    return (
        <div className={className} {...advanceAnimationData}>
            <div className="image-box-header">
                <WrapAHref {...props}>
                    <ImageBoxFigure {...attributes} />
                </WrapAHref>
            </div>
            <div className="image-box-body">
                <div className="body-inner">
                    <TitleTag className={classnames(
                        'body-title',
                        `icon-position-${titleIconPosition}`
                    )}>
                        <WrapAHref {...props}>
                            {titleIconPosition === 'before' && titleIcon !== '' && <i className={titleIcon} />}
                            <RichText.Content
                                value={title}
                                tagName="span"
                            />
                            {titleIconPosition === 'after' && titleIcon !== '' && <i className={titleIcon} />}
                        </WrapAHref>
                    </TitleTag>
                    <RichText.Content
                        className="body-description"
                        value={description}
                        tagName="p"
                    />
                    <InnerBlocks.Content />
                    {hoverBottom && <div className={'border-bottom'}>
                        <div className={`animated ${hoverBottomDirection}`}></div>
                    </div>}
                </div>
            </div>
        </div>
    );
});

export default save;