import { compose } from '@wordpress/compose';
import { classnames } from 'gutenverse-core/components';
import { ImageBoxFigure } from './component/image-box-figure';
import { withAnimationAdvanceScript, withMouseMoveEffectScript } from 'gutenverse-core/hoc';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';
import { useAnimationAdvanceData } from 'gutenverse-core/hooks';

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

    const blockProps = {
        ...advanceAnimationData,
        className: classnames(
            'guten-element',
            'guten-image',
            elementId,
            animationClass,
            displayClass,
        ),
    };

    const className = classnames(
        'guten-element',
        'guten-image',
        elementId,
        animationClass,
        displayClass,
    );

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

    return <div className={className} {...advanceAnimationData}>
        <a className="guten-image-wrapper" href={url} target={linkTarget} rel={rel} aria-label={ariaLabel}>
            <ImageBoxFigure {...attributes}/>
        </a>
        {caption()}
    </div>;
});

export default save;