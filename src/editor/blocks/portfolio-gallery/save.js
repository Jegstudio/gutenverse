/* External dependencies */
import { classnames } from 'gutenverse-core/components';
import { compose } from '@wordpress/compose';

/* WordPress dependencies */
import { useBlockProps } from '@wordpress/block-editor';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';
import { withAnimationAdvanceScript, withMouseMoveEffectScript } from 'gutenverse-core/hoc';
import { getImageSrc } from 'gutenverse-core/editor-helper';
import { renderIcon } from 'gutenverse-core/helper';

const save = compose(
    withAnimationAdvanceScript('portfolio-gallery'),
    withMouseMoveEffectScript
)(({attributes}) => {
    const {
        elementId,
        behavior,
        images,
        showLink,
        linkText,
        linkIcon,
        linkIconType,
        linkIconSVG
    } = attributes;

    const { gutenverseImgPlaceholder } = window['GutenverseConfig'];

    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);

    const className = classnames(
        'guten-element',
        'guten-portfolio-gallery',
        elementId,
        animationClass,
        displayClass
    );

    return (
        <div {...useBlockProps.save({ className })} data-behavior={behavior}>
            <div className={`portfolio-gallery-container ${behavior}`}>
                <div className="content-items">
                    {
                        images.map((el,index) => {
                            return <div key={el._key} className={`row-item ${el.current ? 'current-item' : ''}`} data-tab={`portfolio-gallery-tab-${index}`}>
                                <div className="row-item-info">
                                    {el.subtitle && <p className="info-subtitle">{el.subtitle}</p>}
                                    {el.title && <h2 className="info-title">{el.title}</h2>}
                                </div>
                                {
                                    showLink && el.link && <div className="row-link-wrapper">
                                        <a href={el.link} aria-label={el.title} target="_blank" rel="noreferrer">
                                            {linkText}
                                            {renderIcon(linkIcon, linkIconType, linkIconSVG)}
                                        </a>
                                    </div>
                                }
                            </div>;
                        })
                    }
                </div>
                <div className="image-items">
                    {
                        images.map((el,index) => {
                            return <div key={index} id={`portfolio-gallery-tab-${index}`} className={`image-item ${el.current ? 'current-item' : ''}`} style={{backgroundImage:`url(${getImageSrc(el.src, gutenverseImgPlaceholder)})`}}></div>;
                        })
                    }
                </div>
            </div>
        </div>
    );
});

export default save;
