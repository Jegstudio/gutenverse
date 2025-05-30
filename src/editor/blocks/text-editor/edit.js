import { compose } from '@wordpress/compose';
import { useBlockProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useInnerBlocksProps } from '@wordpress/block-editor';
import { useEffect, useRef } from '@wordpress/element';
import { withAnimationAdvanceV2, withMouseMoveEffect, withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { useAnimationEditor, useDisplayEditor } from 'gutenverse-core/hooks';
import { useDynamicScript, useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';
import { CopyElementToolbar } from 'gutenverse-core/components';
import { useSelect } from '@wordpress/data';

const TextEditorBlock = compose(
    withPartialRender,
    withPassRef,
    withAnimationAdvanceV2('text-editor'),
    withMouseMoveEffect
)((props) => {
    const {
        attributes,
        clientId,
        setBlockRef,
        setAttributes
    } = props;

    const {
        elementId,
        dropcap,
        enableHeading
    } = attributes;

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const elementRef = useRef();

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);
    useDynamicScript(elementRef);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'gutenverse-text-editor',
            'no-margin',
            elementId,
            animationClass,
            displayClass,
            {
                'dropcap': dropcap
            },
        ),
        ref: elementRef
    });

    const innerBlocksProps = enableHeading ? useInnerBlocksProps({
        template: [['gutenverse/text-paragraph']]
    }, {
        allowedBlocks: ['gutenverse/text-paragraph', 'core/paragraph', 'core/post-content', 'core/heading', 'gutenverse/heading'],
    }) : useInnerBlocksProps({
        template: [['gutenverse/text-paragraph']]
    }, {
        allowedBlocks: ['gutenverse/text-paragraph', 'core/paragraph', 'core/post-content'],
    });

    const innerBlocksContent = useSelect((select) => {
        const { getBlock } = select('core/block-editor');
        const block = getBlock(props.clientId);
        return block?.innerBlocks || [];
    }, [props.clientId]);

    const hasLink = (htmlString) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');
        return doc.querySelector('a') !== null;
    };

    useEffect(() => {
        const containsAnchorTag = innerBlocksContent.some(innerBlock =>
            hasLink(innerBlock.attributes?.content || innerBlock.attributes?.paragraph || '')
        );

        if (containsAnchorTag !== attributes.containsAnchorTag) {
            setAttributes({ containsAnchorTag: containsAnchorTag });
        }
    }, [innerBlocksContent]);

    useEffect(() => {
        if (elementRef) {
            setBlockRef(elementRef);
        }
    }, [elementRef]);

    return <>
        <CopyElementToolbar {...props} />
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
        <div  {...blockProps}>
            <div {...innerBlocksProps} />
        </div>
    </>;
});

export default TextEditorBlock;