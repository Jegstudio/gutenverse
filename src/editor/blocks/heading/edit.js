/* External dependencies */
import { useEffect, useRef } from '@wordpress/element';
import { classnames } from 'gutenverse-core/components';

/* WordPress dependencies */
import { __ } from '@wordpress/i18n';
import { BlockControls, RichText, useBlockProps } from '@wordpress/block-editor';
import { ToolbarGroup } from '@wordpress/components';
import { compose } from '@wordpress/compose';

/* Gutenverse dependencies */
import { withCustomStyle, withAnimationAdvance, withCopyElementToolbar, withMouseMoveEffect, withHighLightText } from 'gutenverse-core/hoc';
import { useAnimationEditor, useDisplayEditor } from 'gutenverse-core/hooks';
import { PanelController } from 'gutenverse-core/controls';

/* Local dependencies */
import { panelList } from './panels/panel-list';
import HeadingTypeToolbar from './components/heading-type-toolbar';

const HeadingBlockControl = ({ attributes, setAttributes }) => {
    const {
        type,
    } = attributes;

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
        ...props.attributes
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
    withAnimationAdvance('heading'),
    withCopyElementToolbar(),
    withMouseMoveEffect,
    withHighLightText
)(props => {
    const {
        attributes,
        setElementRef,
        handleOnChange
    } = props;
    const {
        elementId,
        type,
        content,
    } = attributes;
    const tagName = 'h' + type;
    const headingRef = useRef();
    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: headingRef
    });
    useEffect(() => {
        if (headingRef.current) {
            setElementRef(headingRef.current);
        }
    }, [headingRef]);

    return <>
        <HeadingInspection {...props} />
        <HeadingBlockControl {...props} />
        <RichText
            ref={headingRef}
            identifier="content"
            tagName={tagName}
            value={content}
            onChange={handleOnChange}
            placeholder={__('Write heading…')}
            multiline={false}
            {...blockProps}
        />
    </>;
});

export default HeadingBlock;
