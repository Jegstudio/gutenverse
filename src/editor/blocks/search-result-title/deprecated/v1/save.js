import { classnames } from 'gutenverse-core/components';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';

const save = ({ attributes }) => {
    const {
        elementId,
    } = attributes;

    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);
    const className = classnames(
        'guten-element',
        'guten-search-result-title',
        elementId,
        animationClass,
        displayClass
    );
    return (
        <div className={className}>
            {/* Block content */}
        </div>
    );
};

export default save;
