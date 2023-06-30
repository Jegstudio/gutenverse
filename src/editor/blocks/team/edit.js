import { compose } from '@wordpress/compose';
import { useState } from '@wordpress/element';
import { withCustomStyle } from 'gutenverse-core/hoc';
import classnames from 'classnames';
import { getSaveElement } from '@wordpress/blocks';
import { PanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import TeamProfile from './components/team-profile';
import TeamPopup from './components/team-popup';
import { createPortal } from 'react-dom';
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';
import { gutenverseRoot } from 'gutenverse-core/helper';
import { useRef } from '@wordpress/element';
import { useEffect } from '@wordpress/element';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { withAnimationAdvance } from 'gutenverse-core/hoc';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { useSelect } from '@wordpress/data';

const TeamBlock = compose(
    withCustomStyle(panelList),
    withAnimationAdvance('team'),
    withCopyElementToolbar()
)((props) => {
    const {
        getBlocks
    } = useSelect(
        (select) => select('core/block-editor'),
        []
    );

    const [showPop, setShowPop] = useState(false);
    const {
        clientId,
        attributes,
        setElementRef,
        setAdanimRef
    } = props;

    const {
        elementId,
        addPopup,
    } = attributes;

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const teamRef = useRef();

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-team',
            'no-margin',
            elementId,
            displayClass,
            animationClass
        ),
        ref: teamRef
    });

    const openPopup = () => {
        if (addPopup) {
            setShowPop(true);
        }
    };

    const innerBlocksProps = useInnerBlocksProps({}, {
        template: [['gutenverse/social-icons']],
        allowedBlocks: ['gutenverse/social-icons'],
        orientation: 'horizontal',
        __experimentalAppenderTagName: 'div',
    });

    const socialComponent = <div {...innerBlocksProps} />;

    const socialsRef = getBlocks(clientId).map(socials => {
        const { name, attributes, innerBlocks } = socials;

        return getSaveElement(name, attributes, innerBlocks);
    });

    useEffect(() => {
        if (teamRef.current) {
            setElementRef(teamRef.current);
            setAdanimRef && setAdanimRef(teamRef.current);
        }
    }, [teamRef]);

    return <>
        <PanelController panelList={panelList} {...props} />
        {addPopup && showPop && createPortal(<TeamPopup show={true} onClose={() => setShowPop(false)} {...attributes} socialComponent={socialsRef[0]} />, gutenverseRoot)}
        <div  {...blockProps}>
            <TeamProfile {...attributes} socialComponent={socialComponent} onClick={openPopup} />
        </div>
    </>;
});

export default TeamBlock;