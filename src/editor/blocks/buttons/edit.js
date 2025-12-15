
import { compose } from '@wordpress/compose';
import { withAnimationAdvanceV2, withMouseMoveEffect, withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useEffect, useRef, useState } from '@wordpress/element';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { useDynamicScript, useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';
import { CopyElementToolbar } from 'gutenverse-core/components';

const ButtonsBlock = compose(
    withPartialRender,
    withPassRef,
    withAnimationAdvanceV2('buttons'),
    withMouseMoveEffect
)((props) => {
    const {
        attributes,
        clientId,
        setBlockRef,
    } = props;

    const {
        elementId,
        orientation,
    } = attributes;

    const elementRef = useRef();
    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const [localAttr, setLocalAttr] = useState({});

    const blockProps = useBlockProps({
        className: classnames(
            elementId,
            'guten-element',
            'guten-buttons',
            `${orientation}`,
        ),
        ref: elementRef
    });

    const wrapperClassName = classnames(
        'guten-element',
        'guten-buttons-wrapper',
        'no-margin',
        animationClass,
        displayClass,
    );

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef, localAttr);
    useDynamicScript(elementRef);

    useEffect(() => {
        if (elementRef) {
            setBlockRef(elementRef);
        }
    }, [elementRef]);

    const innerBlockProps = useInnerBlocksProps(
        blockProps,
        {
            template: [['gutenverse/button']],
            allowedBlocks: ['gutenverse/button'],
            orientation,
            __experimentalAppenderTagName: 'div',
        }
    );

    return <>
        <CopyElementToolbar {...props} />
        <BlockPanelController panelList={panelList} props={props} setLocalAttr={setLocalAttr} />
        <div className={wrapperClassName}>
            <div {...innerBlockProps} />
        </div>
    </>;
});

export default ButtonsBlock;