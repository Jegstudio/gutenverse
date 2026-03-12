
import { classnames } from 'gutenverse-core/components';
import { useBlockProps } from '@wordpress/block-editor';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';

const save = (props) => {
    const {
        attributes
    } = props;

    const {
        elementId,
    } = attributes;

    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);

    const className = classnames(
        'guten-element',
        'gutenverse-maps',
        'guten-maps',
        elementId,
        animationClass,
        displayClass,
    );

    return (
        <div {...useBlockProps.save({ className })} />
    );
};

export default save;