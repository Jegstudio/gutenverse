import { compose } from '@wordpress/compose';
import { classnames } from 'gutenverse-core/components';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import TeamProfile from './components/team-profile';
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';
import { useEffect, useRef } from '@wordpress/element';
import { withAnimationAdvanceV2, withCopyElementToolbar, withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { useAnimationEditor, useDisplayEditor } from 'gutenverse-core/hooks';
import { HighLightToolbar, FilterDynamic } from 'gutenverse-core/toolbars';
import { useDynamicScript, useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';

const TeamBlock = compose(
    withPartialRender,
    withPassRef,
    withCopyElementToolbar(),
    withAnimationAdvanceV2('team'),
    // withMouseMoveEffect
)((props) => {

    const {
        attributes,
        clientId,
        setBlockRef,
    } = props;

    const {
        elementId,
    } = attributes;

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const elementRef = useRef();
    const nameRef = useRef();
    const descRef = useRef();
    const jobRef = useRef();
    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-team',
            'no-margin',
            elementId,
            displayClass,
            animationClass,
        ),
        ref: elementRef
    });

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);
    useDynamicScript(elementRef);

    const innerBlocksProps = useInnerBlocksProps({}, {
        template: [['gutenverse/social-icons']],
        allowedBlocks: ['gutenverse/social-icons'],
        orientation: 'horizontal',
        __experimentalAppenderTagName: 'div',
    });

    const socialComponent = <div {...innerBlocksProps} />;

    HighLightToolbar(props);
    FilterDynamic(props);

    useEffect(() => {
        if (elementRef) {
            setBlockRef(elementRef);
        }
    }, [elementRef]);

    return <>
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
        <div  {...blockProps}>
            <TeamProfile
                frontEnd={false}
                socialComponent={socialComponent}
                descRef={descRef}
                jobRef={jobRef}
                nameRef={nameRef}
                {...props}
            />
        </div>
    </>;
});

export default TeamBlock;