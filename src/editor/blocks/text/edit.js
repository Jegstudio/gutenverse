import { compose } from '@wordpress/compose';
import { withCustomStyle,  withMouseMoveEffect } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import { classnames, RichTextComponent } from 'gutenverse-core/components';
import { PanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { withAnimationAdvance } from 'gutenverse-core/hoc';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import { dispatch, useSelect } from '@wordpress/data';
import { HighLightToolbar } from 'gutenverse-core/toolbars';
import { useEffect, useRef } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks';


const TextBlockControl = (props) => {
    HighLightToolbar (props);
    applyFilters(
        'gutenverse.pro.dynamic.toolbar',
        '',
        { isActive: true }
    );
};
const TextBlock = compose(
    withCustomStyle(panelList),
    withAnimationAdvance('text'),
    withCopyElementToolbar(),
    withMouseMoveEffect,
)((props) => {
    const { panelProps} = props;
    const {
        attributes,
        setElementRef,
        clientId,
        setAttributes,
        setPanelState,
        elementRef
    } = props;
    const {
        elementId,
    } = attributes;
    const {
        getBlocks
    } = useSelect(
        (select) => select('core/block-editor'),
        []
    );
    const textRef = useRef();
    const oldBlock = getBlocks();
    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const {insertBlock, replaceBlock} = dispatch('core/block-editor');
    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'gutenverse-text',
            'no-margin',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: textRef
    });
    const onSplit = (value, isOriginal) => {
        const newBlock = createBlock( 'gutenverse/text', {
            paragraph: value,
        } );
        if(isOriginal){
            replaceBlock(clientId,newBlock);
        }else{
            const testBlock = getBlocks();
            const currentBlockIndex = testBlock.findIndex((el,index) => el.clientId !== oldBlock[index].clientId);
            insertBlock(newBlock, currentBlockIndex + 1);
        }
    };
    applyFilters(
        'gutenverse.pro.dynamic.toolbar',
        setPanelState,
        {
            panel: 'setting',
            section: 0,
        }
    );
    //don't delete this, it will get error when deleted;
    const onReplace = (value) => {
    }
    useEffect(() => {
        if (textRef.current) {
            setElementRef(textRef.current);
        }
    }, [textRef]);
    return <>
        <PanelController
            {...props}
            panelList={panelList}
            panelProps={panelProps}
        />
        <TextBlockControl {...props}/>
        <RichTextComponent
            isBlockProps = {true}
            blockProps={blockProps}
            tagName={'p'}
            onChange={value => setAttributes({ paragraph: value })}
            aria-label={__('Text Paragraph', 'gutenverse')}
            placeholder={__('Text Paragraph Placeholder', 'gutenverse')}
            multiline={false}
            setAttributes={setAttributes}
            attributes={attributes}
            clientId={clientId}
            panelDynamic={{panel : 'setting', section : 0}}
            panelPosition={{panel : 'style', section : 2}}
            contentAttribute={'paragraph'}
            setPanelState={setPanelState}
            isOnSplit={true}
            onSplit={(value,isOriginal) => onSplit(value, isOriginal)}
            onReplace= {onReplace}
            textChilds={'textChilds'}
            dynamicList={'dynamicDataList'}
            isUseDinamic={true}
            isUseHighlight={true}
        />
    </>;
});

export default TextBlock;