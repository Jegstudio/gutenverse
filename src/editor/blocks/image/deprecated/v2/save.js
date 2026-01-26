import { compose } from '@wordpress/compose';
import { imagePlaceholder } from 'gutenverse-core/config';
import { useBlockProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { withAnimationAdvanceScript, withMouseMoveEffectScript } from 'gutenverse-core/hoc';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';
import { useAnimationAdvanceData } from 'gutenverse-core/hooks';
import { applyFilters } from '@wordpress/hooks';
import { isEmpty } from 'gutenverse-core/helper';

const save = compose(
    withAnimationAdvanceScript('image'),
    withMouseMoveEffectScript
)((props) => {
    const {
        attributes
    } = props;

    const {
        elementId,
        url,
        linkTarget,
        rel,
        captionType,
        captionOriginal,
        captionCustom,
        ariaLabel,
    } = attributes;

    const advanceAnimationData = useAnimationAdvanceData(attributes);
    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);

    const blockProps = useBlockProps.save({
        ...advanceAnimationData,
        className: classnames(
            'guten-element',
            'guten-image',
            elementId,
            animationClass,
            displayClass,
        ),
    });

    const caption = () => {
        switch (captionType) {
            case 'original':
                return <span className="guten-caption">{captionOriginal}</span>;
            case 'custom':
                return <span className="guten-caption">{captionCustom}</span>;
            default:
                return null;
        }
    };

    const href = applyFilters(
        'gutenverse.dynamic.generate-url',
        url,
        'dynamicUrl',
        attributes,
        elementId
    );

    const imageWrapper = url ?
        (<a className="guten-image-wrapper" href={href} target={linkTarget} rel={rel} aria-label={ariaLabel}>
            <ImageBoxFigure {...attributes}/>
        </a>) :
        <div className="guten-image-wrapper">
            <ImageBoxFigure {...attributes}/>
        </div>;

    return <div {...blockProps}>
        {imageWrapper}
        {caption()}
    </div>;
});

export const ImageBoxFigure = attributes => {
    const { imgSrc, altType, altOriginal, altCustom, lazyLoad } = attributes;
    const { media = {}, size } = imgSrc || {};
    const { imageId, sizes = {} } = media || {};

    let imageAltText = null;

    switch (altType) {
        case 'original':
            imageAltText = altOriginal;
            break;
        case 'custom':
            imageAltText = altCustom;
            break;
    }
    const imageLazyLoad = () => <img className="gutenverse-image-box-empty" src={imagePlaceholder} alt={imageAltText} {...(lazyLoad && { loading: 'lazy' })} />;

    // Handle if empty, pick the 'full' size. If 'full' size also not exist, return placeholder image.

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