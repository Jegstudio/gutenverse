import { useEffect, useRef } from '@wordpress/element';
import { RichTextComponent, classnames, CopyElementToolbar } from 'gutenverse-core/components';
import { __ } from '@wordpress/i18n';
import { BlockControls, useBlockProps } from '@wordpress/block-editor';
import { ToolbarGroup } from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { withAnimationAdvanceV2, withMouseMoveEffect, withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { useAnimationEditor, useDisplayEditor } from 'gutenverse-core/hooks';
import { PanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import HeadingTypeToolbar from './components/heading-type-toolbar';
import { HighLightToolbar, FilterDynamic } from 'gutenverse-core/toolbars';
import getBlockStyle from './styles/block-style';
import { useDynamicScript, useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import { useRichTextParameter } from 'gutenverse-core/helper';

const HeadingBlockControl = (props) => {
    const {
        attributes,
        setAttributes,
    } = props;
    const {
        type,
    } = attributes;

    FilterDynamic(props);
    HighLightToolbar(props);

    return <BlockControls>
        <ToolbarGroup>
            <HeadingTypeToolbar
                type={type}
                onChange={(newType) =>
                    setAttributes({ type: newType })
                }
            />
        </ToolbarGroup>
    </BlockControls>;
};

const HeadingInspection = (props) => {
    const { panelProps, isSelected, setAttributes, elementRef } = props;
    const defaultPanelProps = {
        ...panelProps,
        ...props.attributes,
        setAttributes,
    };
    return <PanelController
        panelList={panelList}
        panelProps={defaultPanelProps}
        isSelected={isSelected}
        elementRef={elementRef}
        {...props}
    />;
};

const HeadingBlock = compose(
    withPartialRender,
    withPassRef,
    withAnimationAdvanceV2('heading'),
    withMouseMoveEffect
)(props => {
    const {
        attributes,
        setAttributes,
        clientId,
        setBlockRef,
    } = props;

    let {
        elementId,
        type,
        content,
    } = attributes;

    const {
        panelState,
        setPanelState,
    } = useRichTextParameter();

    const elementRef = useRef(null);

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);
    useDynamicScript(elementRef);

    const tagName = 'h' + type;
    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            elementId,
            animationClass,
            displayClass,
        )
    });

    useEffect(() => {
        if (elementRef) {
            setBlockRef(elementRef);
        }
    }, [elementRef]);

    useEffect(() => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, 'text/html');
        const newContainsAnchorTag = doc.querySelector('a') !== null;

        if (newContainsAnchorTag !== attributes.containsAnchorTag) {
            setAttributes({ containsAnchorTag: newContainsAnchorTag });
        }
    }, [content]);

    return <>
        <CopyElementToolbar {...props} />
        <HeadingInspection {...props} elementRef={elementRef} panelState={panelState} />
        <HeadingBlockControl {...props} />
        <span ref={elementRef} style={{ display: 'none' }}></span>
        <RichTextComponent
            isBlockProps={true}
            blockProps={blockProps}
            tagName={tagName}
            onChange={value => setAttributes({ content: value })}
            placeholder={__('Write heading…')}
            ariaLabel={__('Heading Paragraph')}
            multiline={false}
            setAttributes={setAttributes}
            attributes={attributes}
            clientId={clientId}
            setPanelState={setPanelState}
            panelPosition={{ panel: 'style', section: 5 }}
            panelDynamic={{ panel: 'setting', section: 1 }}
            contentAttribute={'content'}
            textChilds={'textChilds'}
            dynamicList={'dynamicDataList'}
            isUseDinamic={true}
            isUseHighlight={true}
        />
    </>;
});

export default HeadingBlock;
