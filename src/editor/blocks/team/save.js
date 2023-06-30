import { compose } from '@wordpress/compose';

import classnames from 'classnames';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import TeamProfile from './components/team-profile';
import { getImageSrc } from 'gutenverse-core/editor-helper';
import { withAnimationAdvanceScript } from 'gutenverse-core/hoc';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';
import { useAnimationAdvanceData } from 'gutenverse-core/hooks';

const save = compose(
    withAnimationAdvanceScript('team')
)((props) => {
    const {
        attributes
    } = props;

    const {
        elementId,
        addPopup,
        name,
        job,
        src,
        description,
        phone,
        email
    } = attributes;

    const advanceAnimationData = useAnimationAdvanceData(attributes);
    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);

    const className = classnames(
        'guten-element',
        'guten-team',
        elementId,
        animationClass,
        displayClass
    );

    const socialComponent = <InnerBlocks.Content/>;

    return (
        <div {...useBlockProps.save({ className, ...advanceAnimationData })}>
            <TeamProfile {...attributes} socialComponent={socialComponent}/>
            {addPopup && <div className="profile-popup"
                data-name={name}
                data-job={job}
                data-img={getImageSrc(src)}
                data-desc={description}
                data-phone={phone}
                data-email={email}
            ></div>}
        </div>
    );
});

export default save;