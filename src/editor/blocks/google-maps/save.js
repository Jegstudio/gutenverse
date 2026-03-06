import { compose } from '@wordpress/compose';
import { classnames } from 'gutenverse-core/components';
import { useBlockProps } from '@wordpress/block-editor';
import { encodeDataToURL } from 'gutenverse-core/helper';
import { withAnimationAdvanceScript, withMouseMoveEffectScript } from 'gutenverse-core/hoc';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';
import { useAnimationAdvanceData } from 'gutenverse-core/hooks';

const save = compose(
    withAnimationAdvanceScript('google-maps'),
    withMouseMoveEffectScript
)((props) => {
    const {
        attributes
    } = props;

    const {
        elementId,
        location,
        zoom,
    } = attributes;

    const advanceAnimationData = useAnimationAdvanceData(attributes);
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

    const parameter = {
        q: location,
        z: zoom,
        t: 'm',
        output: 'embed',
        iwloc: 'near',
    };

    const iframeParam = {
        frameBorder: 0,
        scrolling: 'no',
        marginHeight: 0,
        marginWidth: 0,
        src: '',
        title: parameter['q'],
    };

    return (
        <div {...useBlockProps.save({ className, ...advanceAnimationData })} data-src={`https://maps.google.com/maps?${encodeDataToURL(parameter)}`}>
            <iframe {...iframeParam}/>
        </div>
    );
});

export default save;