import { compose } from '@wordpress/compose';
import { useEffect, useRef } from '@wordpress/element';
import { withAnimationAdvanceV2, withMouseMoveEffect, withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import { classnames, RichTextComponent } from 'gutenverse-core/components';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useAnimationEditor, useDisplayEditor } from 'gutenverse-core/hooks';
import { __ } from '@wordpress/i18n';
import { HighLightToolbar, FilterDynamic } from 'gutenverse-core/toolbars';
import { useDynamicScript, useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';
import { useRichTextParameter } from 'gutenverse-core/helper';
import { CopyElementToolbar } from 'gutenverse-core/components';

const AdvancedHeadingBlock = compose(
    withPartialRender,
    withPassRef,
    withAnimationAdvanceV2('advance-heading'),
    withMouseMoveEffect
)((props) => {
    const {
        attributes,
        setAttributes,
        clientId,
        setBlockRef,
        context,
    } = props;

    const {
        elementId,
        titleTag: TitleTag,
        subTag: SubTag,
        text,
        focusText,
        subText,
        showSub,
        showLine,
    } = attributes;

    const {
        panelState,
        setPanelState,
    } = useRichTextParameter();

    const elementRef = useRef(null);
    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);
    useDynamicScript(elementRef);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-advanced-heading',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: elementRef
    });

    FilterDynamic(props);
    HighLightToolbar(props);

    const richTextContent = (data, tag, classes, identifier) => {
        return <RichTextComponent
            classNames={classes}
            tagName={tag}
            aria-label={__('Advanced Heading', 'gutenverse')}
            onChange={value => setAttributes({ [identifier]: value })}
            multiline={false}
            setAttributes={setAttributes}
            attributes={attributes}
            clientId={clientId}
            panelDynamic={{ panel: 'setting', section: 1 }}
            panelPosition={{ panel: 'style', section: 1 }}
            contentAttribute={identifier}
            setPanelState={setPanelState}
            textChilds={identifier + 'Childs'}
            dynamicList={identifier + 'DynamicList'}
            isUseDinamic={true}
            isUseHighlight={true}
            context={context}
        />;
    };

    useEffect(() => {
        if (elementRef) {
            setBlockRef(elementRef);
        }
    }, [elementRef]);

    return <>
        <CopyElementToolbar {...props}/>
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} panelState={panelState} />
        <div  {...blockProps}>
            {showLine === 'top' && <div className="heading-line top"></div>}
            {showSub === 'top' && richTextContent(subText, SubTag, 'heading-subtitle', 'subText')}
            {showSub === 'top' && showLine === 'between' && <div className="heading-line between"></div>}
            <div className={`heading-section ${['top', 'bottom', 'between'].includes(showLine) ? 'outside-line' : ''}`}>
                {showLine === 'before' && <div className="heading-line before"></div>}
                <TitleTag className="heading-title">
                    {richTextContent(text, 'span', 'heading-title', 'text')}
                    {richTextContent(focusText, 'span', 'heading-focus', 'focusText')}
                </TitleTag>
                {showLine === 'after' && <div className="heading-line after"></div>}
            </div>
            {showSub === 'bottom' && showLine === 'between' && <div className="heading-line between"></div>}
            {showSub === 'bottom' && richTextContent(subText, SubTag, 'heading-subtitle', 'subText')}
            {showLine === 'bottom' && <div className="heading-line bottom"></div>}
        </div>
    </>;
});

export default AdvancedHeadingBlock;