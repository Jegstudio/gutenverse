
import { compose } from '@wordpress/compose';
import { InnerBlocks } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';

const save = compose(
)((props) => {
    const {
        attributes,
    } = props;

    const {
        position
    } = attributes;

    const className = classnames(
        'guten-element',
        'guten-popup-content-inner',
        position,
    );

    return (
        <div className={className}>
            <div className="guten-popup-content-wrapper">
                <InnerBlocks.Content />
            </div>
        </div>
    );
});

export default save;
