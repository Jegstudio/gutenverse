import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';
import { isAnimationActive } from 'gutenverse-core/helper';
import { useAnimationAdvanceData, useAnimationFrontend, useDisplayFrontend } from 'gutenverse-core/hooks';
import classnames from 'classnames';

import { withAnimationAdvanceScript } from 'gutenverse-core/hoc';

const save = compose(
    withAnimationAdvanceScript('dynamic-pagination')
)(({ attributes }) => {
    const { elementId, backgroundAnimated } = attributes;

    const _isBgAnimated = isAnimationActive(backgroundAnimated);
    const advanceAnimationData = useAnimationAdvanceData(attributes);
    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);

    const className = classnames(
        'guten-element',
        'guten-dynamic-pagination',
        elementId,
        animationClass,
        displayClass,
        {
            'background-animated': _isBgAnimated
        }
    );

    const blockProps = useBlockProps.save({
        className,
        ...advanceAnimationData,
        id: attributes.anchor
    });

    const dataId = elementId?.split('-')[1];

    return (
        <nav {...blockProps} data-id={dataId}>
            {_isBgAnimated &&
                <div className="guten-data">
                    <div data-var={`bgAnimatedData${dataId}`} data-value={JSON.stringify({
                        ...backgroundAnimated
                    })} />
                </div>
            }
            {_isBgAnimated && <div className="guten-background-animated"><div className={`animated-layer animated-${dataId}`}></div></div>}

            <InnerBlocks.Content />
        </nav>
    );
});

export default save;
