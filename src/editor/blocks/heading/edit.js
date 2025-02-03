/* External dependencies */
import { useRef } from '@wordpress/element';
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
    const { panelProps, isSelected, setAttributes } = props;
    const defaultPanelProps = {
        ...panelProps,
        ...props.attributes,
        setAttributes
    };
    return <PanelController
        panelList={panelList}
        panelProps={defaultPanelProps}
        isSelected={isSelected}
        {...props}
    />;
};

const HeadingBlock = compose(
    withCopyElementToolbar(),
)(props => {

    const {
        attributes,
        setAttributes,
        clientId,
    } = props;

    let {
        elementId,
        type,
    } = attributes;

    const elementRef = useRef({});
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

    return <>
        {generatedCSS && <div ref={elementRef} id={elementId} className="gutenverse-custom-styles" style={{display:'none'}}>{generatedCSS}</div>}
        {/* {fontUsed[0] && headStyleSheet(fontUsed, elementRef)} */}
        <HeadingInspection {...props} />
        <HeadingBlockControl {...props} />
        <RichTextComponent
            ref={elementRef}
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
            textChilds={'textChilds'}
            dynamicList={'dynamicDataList'}
            isUseDinamic={true}
            isUseHighlight={true}
        />
    </>;
});

export default HeadingBlock;
