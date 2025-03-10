import { compose } from '@wordpress/compose';
import { useBlockProps } from '@wordpress/block-editor';
import { classnames, RichTextComponent } from 'gutenverse-core/components';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { withAnimationAdvanceV2, withCopyElementToolbar, withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { useAnimationEditor, useDisplayEditor } from 'gutenverse-core/hooks';
import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import { dispatch, useSelect } from '@wordpress/data';
import { HighLightToolbar, FilterDynamic } from 'gutenverse-core/toolbars';
import { useEffect, useRef } from '@wordpress/element';
import { applyFilters } from '@wordpress/hooks';
import { useDynamicScript, useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';

const TextBlockControl = (props) => {
    HighLightToolbar(props);
    FilterDynamic(props);
};

const TextBlock = compose(
    withPartialRender,
    withPassRef,
    withCopyElementToolbar(),
    withAnimationAdvanceV2('text-paragraph'),
    // withMouseMoveEffect,
)((props) => {
    const {
        attributes,
        clientId,
        setAttributes,
        setPanelState,
        setBlockRef,
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

    const elementRef = useRef();
    const oldBlock = getBlocks();
    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const { insertBlock, replaceBlock } = dispatch('core/block-editor');

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);
    useDynamicScript(elementRef);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'gutenverse-text',
            'no-margin',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: elementRef
    });

    const onSplit = (value, isOriginal) => {
        const newBlock = createBlock('gutenverse/text-paragraph', {
            paragraph: value,
        });
        if (isOriginal) {
            replaceBlock(clientId, newBlock);
        } else {
            const testBlock = getBlocks();
            const currentBlockIndex = testBlock.findIndex((el, index) => el.clientId !== oldBlock[index].clientId);
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

    useEffect(() => {
        if (elementRef) {
            setBlockRef(elementRef);
        }
    }, [elementRef]);

    return <>
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
        <TextBlockControl {...props} />
        <RichTextComponent
            isBlockProps={true}
            blockProps={blockProps}
            tagName={'p'}
            onChange={value => setAttributes({ paragraph: value })}
            aria-label={__('Text Paragraph', 'gutenverse')}
            placeholder={__('Text Paragraph Placeholder', 'gutenverse')}
            multiline={false}
            setAttributes={setAttributes}
            attributes={attributes}
            clientId={clientId}
            panelDynamic={{ panel: 'setting', section: 0 }}
            panelPosition={{ panel: 'style', section: 2 }}
            contentAttribute={'paragraph'}
            setPanelState={setPanelState}
            isOnSplit={true}
            onSplit={(value, isOriginal) => onSplit(value, isOriginal)}
            onReplace={() => { }}
            textChilds={'textChilds'}
            dynamicList={'dynamicDataList'}
            isUseDinamic={true}
            isUseHighlight={true}
        />
    </>;
});

export default TextBlock;