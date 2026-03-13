
import { classnames } from 'gutenverse-core/components';
import { useBlockProps } from '@wordpress/block-editor';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';

const BreadcrumbBlock = ({ attributes }) => {
    const {
        elementId,
    } = attributes;

    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);

    const className = classnames(
        'guten-element',
        'guten-breadcrumb',
        elementId,
        animationClass,
        displayClass
    );

    return (
        <div {...useBlockProps.save({ className })}>
            {/* Block content */}
        </div>
    );
};

export default BreadcrumbBlock;