import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { BlockPanelController } from 'gutenverse-core/controls';
import { useAnimationEditor, useDisplayEditor } from 'gutenverse-core/hooks';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import { useRef } from '@wordpress/element';
import { CopyElementToolbar } from 'gutenverse-core/components';
import { withMouseMoveEffect, withPartialRender } from 'gutenverse-core/hoc';
import { compose } from '@wordpress/compose';
import classnames from 'classnames';

import { panelList } from './panels/panel-list';
import getBlockStyle from './styles/block-style';

const TEMPLATE = [
    ['gutenverse/dynamic-pagination-previous'],
    ['gutenverse/dynamic-pagination-numbers'],
    ['gutenverse/dynamic-pagination-next'],
];

const ALLOWED_BLOCKS = [
    'gutenverse/dynamic-pagination-previous',
    'gutenverse/dynamic-pagination-numbers',
    'gutenverse/dynamic-pagination-next'
];

const Edit = compose(
    withPartialRender,
    withMouseMoveEffect
)((props) => {
    const { attributes, clientId } = props;
    const { elementId } = attributes;

    const elementRef = useRef();

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-dynamic-pagination',
            elementId,
            animationClass,
            displayClass
        ),
        ref: elementRef
    });

    const innerBlocksProps = useInnerBlocksProps(blockProps, {
        template: TEMPLATE,
        allowedBlocks: ALLOWED_BLOCKS,
    });

    console.log('--dynamic pagination--');

    return (
        <>
            <CopyElementToolbar {...props} />
            <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
            <div {...innerBlocksProps} />
        </>
    );
});

export default Edit;

