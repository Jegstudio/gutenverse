/* External dependencies */
import {useRef } from '@wordpress/element';
import { RichTextComponent, classnames } from 'gutenverse-core/components';

/* WordPress dependencies */
import { __ } from '@wordpress/i18n';
import { BlockControls, useBlockProps } from '@wordpress/block-editor';
import { ToolbarGroup } from '@wordpress/components';
import { compose } from '@wordpress/compose';

/* Gutenverse dependencies */
import { withCustomStyle, withCopyElementToolbar, withMouseMoveEffect, withPartialRender } from 'gutenverse-core/hoc';
import { useAnimationEditor, useDisplayEditor } from 'gutenverse-core/hooks';
import { PanelController } from 'gutenverse-core/controls';

/* Local dependencies */
import { panelList } from './panels/panel-list';
import HeadingTypeToolbar from './components/heading-type-toolbar';
import { HighLightToolbar, FilterDynamic } from 'gutenverse-core/toolbars';
import getBlockStyle from './styles/block';
import { useDynamicStyle, useGenerateElementId, headStyleSheet } from 'gutenverse-core/styling';
import { select } from '@wordpress/data';

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
    const { panelProps, isSelected } = props;
    const defaultPanelProps = {
        ...panelProps,
        ...props.attributes,
    };
    return <PanelController
        panelList={panelList}
        panelProps={defaultPanelProps}
        isSelected={isSelected}
        {...props}
    />;
};

const HeadingBlock = compose(
    withCustomStyle(panelList),
    withCopyElementToolbar(),
)(props => {

    const {
        attributes,
        setAttributes,
        clientId,
        setPanelState,
    } = props;

    let {
        elementId,
        type,
    } = attributes;
    const elementRef = useRef(null);

    useGenerateElementId(clientId, elementId, elementRef);
    const tagName = 'h' + type;
    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const [generatedCSS, fontUsed] = useDynamicStyle(elementId, attributes, getBlockStyle);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            elementId,
            animationClass,
            displayClass,
        )
    });
    console.log(select('gutenverse/blockstyle').getStyle());
    return <>
        {generatedCSS && <div ref={elementRef} style={{display: 'none'}} id={elementId}>{generatedCSS}</div>}
        {fontUsed[0] && headStyleSheet(fontUsed, elementRef)}
        <HeadingInspection {...props} />
        <HeadingBlockControl {...props} />
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
            panelPosition={{ panel: 'style', section: 2 }}
            panelDynamic={{ panel: 'setting', section: 1 }}
            contentAttribute={'content'}
            setPanelState={setPanelState}
            textChilds={'textChilds'}
            dynamicList={'dynamicDataList'}
            isUseDinamic={true}
            isUseHighlight={true}
        />
    </>;
});

export default HeadingBlock;
