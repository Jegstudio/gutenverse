import { compose } from '@wordpress/compose';
import { withCustomStyle, withMouseMoveEffect } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { PanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { withAnimationAdvance } from 'gutenverse-core/hoc';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import { dispatch, useSelect } from '@wordpress/data';

const TextBlock = compose(
    withCustomStyle(panelList),
    withAnimationAdvance('text'),
    withCopyElementToolbar(),
    withMouseMoveEffect
)((props) => {
    const { panelProps} = props;
    const {
        attributes,
        setAttributes,
        clientId
    } = props;
    const {
        elementId,
        dropcap,
        paragraph
    } = attributes;
    const {
        getBlocks
    } = useSelect(
        (select) => select('core/block-editor'),
        []
    );
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
            {
                'dropcap': dropcap
            },
        ),
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
    const onReplace = (value) => {
    }
    return <>
        <PanelController
            {...props}
            panelList={panelList}
            panelProps={panelProps}
        />
        <div  {...blockProps}>
            <RichText
                className={'gutenverse-text-paragraph'}
                tagName={'p'}
                aria-label={__('Text Paragraph', 'gutenverse')}
                placeholder={__('Text Paragraph Placeholder', 'gutenverse')}
                value={paragraph}
                onChange={value => setAttributes({ paragraph: value })}
                onSplit={(value,isOriginal) => onSplit(value, isOriginal)}
                onReplace= {onReplace}
            />
        </div>
    </>;
});

export default TextBlock;