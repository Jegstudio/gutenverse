import { useEffect, useRef } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { withAnimationAdvanceV2, withMouseMoveEffect, withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { panelList } from './panels/panel-list';
import { useInnerBlocksProps, useBlockProps, InspectorControls, BlockControls } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { BlockPanelController } from 'gutenverse-core/controls';
import { useAnimationEditor, useDisplayEditor } from 'gutenverse-core/hooks';
import { dispatch, useSelect } from '@wordpress/data';
import { Button, ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import { plus } from 'gutenverse-core/components';
import { CopyElementToolbar } from 'gutenverse-core/components';
import { displayShortcut } from '@wordpress/keycodes';
import { useDynamicScript, useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';

const Accordions = compose(
    withPartialRender,
    withPassRef,
    withAnimationAdvanceV2('accordions'),
    withMouseMoveEffect
)(props => {
    const {
        getBlocks
    } = useSelect(
        (select) => select('core/block-editor'),
        []
    );

    const {
        insertBlock,
        updateBlockAttributes
    } = dispatch('core/block-editor');

    const {
        attributes,
        clientId,
        setBlockRef
    } = props;

    const {
        elementId,
        iconOpen,
        iconOpenType,
        iconOpenSVG,
        iconClosed,
        iconClosedType,
        iconClosedSVG,
        iconPosition,
        titleTag,
    } = attributes;

    const elementRef = useRef(null);

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);
    useDynamicScript(elementRef);
    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);

    useEffect(() => {
        getBlocks(clientId).map(child => {
            updateBlockAttributes(child.clientId, {
                iconOpen,
                iconOpenType,
                iconOpenSVG,
                iconClosed,
                iconClosedType,
                iconClosedSVG,
                iconPosition,
                titleTag,
            });
        });
    }, [iconOpen, iconOpenType, iconOpenSVG, iconClosed, iconClosedType, iconClosedSVG, iconPosition, titleTag]);

    useEffect(() => {
        if (elementRef) {
            setBlockRef(elementRef);
        }
    }, [elementRef]);

    const innerBlocksProps = useInnerBlocksProps({
        className: classnames(
            'guten-accordions',
        )
    }, {
        template: [['gutenverse/accordion']],
        allowedBlocks: ['gutenverse/accordion'],
        orientation: 'vertical',
        __experimentalAppenderTagName: 'div',
        ref: elementRef
    });

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-accordions-wrapper',
            'no-margin',
            animationClass,
            displayClass,
            elementId,
        ),
        ref: elementRef
    });

    const addChild = () => {
        const newChild = createBlock('gutenverse/accordion', {});
        insertBlock(newChild, getBlocks(clientId).length + 1, clientId);
    };

    return <>
        <CopyElementToolbar {...props} />
        <InspectorControls>
            <div className={'parent-button'}>
                <Button variant="secondary" onClick={() => addChild()}>
                    {__('Add Accordion Child', 'gutenverse')}
                </Button>
            </div>
        </InspectorControls>
        <BlockControls>
            <ToolbarGroup>
                <ToolbarButton
                    name="add"
                    icon={plus}
                    title={__('Add Accordion Child', 'gutenverse')}
                    shortcut={displayShortcut.primary('a')}
                    onClick={() => addChild()}
                />
            </ToolbarGroup>
        </BlockControls>
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
        <div {...blockProps}>
            <div {...innerBlocksProps} />
        </div>
    </>;
});

export default Accordions;
