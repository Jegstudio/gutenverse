import { compose } from '@wordpress/compose';
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { panelList } from './panels/panel-list';
import { BlockPanelController } from 'gutenverse-core/controls';
import { useEffect, useRef } from '@wordpress/element';
import { withAnimationAdvanceV2, withMouseMoveEffect, withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { useAnimationEditor, useDisplayEditor } from 'gutenverse-core/hooks';
import { useDynamicScript, useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';
import { CopyElementToolbar } from 'gutenverse-core/components';

const SocialIcons = compose(
    withPartialRender,
    withPassRef,
    withAnimationAdvanceV2('social-icons'),
    withMouseMoveEffect
)(props => {
    const {
        attributes,
        clientId,
        setBlockRef,
    } = props;

    const {
        elementId,
        orientation = 'horizontal',
        shape,
        color,
        showText,
    } = attributes;

    const displayClass = useDisplayEditor(attributes);
    const animationClass = useAnimationEditor(attributes);
    const elementRef = useRef(null);

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);
    useDynamicScript(elementRef);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-social-icons',
            'no-margin',
            elementId,
            shape,
            orientation,
            color,
            animationClass,
            displayClass,
            {
                'show-text': showText,
            }),
        ref: elementRef
    });

    const innerBlocksProps = useInnerBlocksProps(blockProps, {
        template: [['gutenverse/social-icon']],
        allowedBlocks: [
            'gutenverse/social-icon',
            'gutenverse/news-social-author-icon'
        ],
        orientation,
        __experimentalAppenderTagName: 'div',
    });

    useEffect(() => {
        if (elementRef) {
            setBlockRef(elementRef);
        }
    }, [elementRef]);

    return <>
        <CopyElementToolbar {...props}/>
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
        <div {...innerBlocksProps} />
    </>;
});

export default SocialIcons;