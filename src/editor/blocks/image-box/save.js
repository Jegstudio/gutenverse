import { compose } from '@wordpress/compose';

import { classnames } from 'gutenverse-core/components';
import { InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor';
import { ImageBoxFigure } from './edit';
import { withAnimationAdvanceScript, withMouseMoveEffectScript } from 'gutenverse-core/hoc';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';
import { useAnimationAdvanceData } from 'gutenverse-core/hooks';
import { applyFilters } from '@wordpress/hooks';

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
        url,
        linkTarget,
        rel
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

    return (
        <div {...useBlockProps.save({ className, ...advanceAnimationData })}>
            <div
                className="inner-container"
                data-url={url ? applyFilters(
                    'gutenverse.dynamic.generate-url',
                    url,
                    'dynamicUrl',
                    attributes,
                    elementId
                ) : ''}
                data-link-target={linkTarget ? linkTarget : ''}
                data-rel={rel ? rel : ''}
            >
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
                            <InnerBlocks.Content />
                            {hoverBottom && <div className={'border-bottom'}>
                                <div className={`animated ${hoverBottomDirection}`}></div>
                            </div>}
                        </div>
                    }
                </div>
            </div>
        </div>
    );
});

export default save;