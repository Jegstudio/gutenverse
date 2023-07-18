import classnames from 'classnames';

import { compose } from '@wordpress/compose';
import { withAnimationAdvanceScript } from 'gutenverse-core/hoc';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';
import { useAnimationAdvanceData } from 'gutenverse-core/hooks';

const SaveSpacer = compose(
    withAnimationAdvanceScript('spacer')
)(props => {
    const {
        attributes
    } = props;

    const {
        elementId,
    } = attributes;

    const advanceAnimationData = useAnimationAdvanceData(attributes);
    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);

    const className = classnames(
        'guten-element',
        'guten-spacer',
        elementId,
        animationClass,
        displayClass
    );

    return <div className={className} { ...advanceAnimationData }/>;
});

export default SaveSpacer;