
import { classnames } from 'gutenverse-core/components';
import { InnerBlocks } from '@wordpress/block-editor';

const saveV1 = (props) => {
    const { attributes } = props;
    const { elementId, showText, shape, color, orientation } = attributes;

    const className = classnames(
        'guten-element',
        'guten-social-icons',
        elementId,
        shape,
        orientation,
        color,
        {
            'show-text': showText,
        }
    );

    return (
        <div className={className}>
            <InnerBlocks.Content />
        </div>
    );
};

export default saveV1;
