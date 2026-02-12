import { compose } from '@wordpress/compose';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useRef, useState, useEffect } from '@wordpress/element';
import { withPartialRender } from 'gutenverse-core/hoc';
import { useAnimationEditor, useDisplayEditor } from 'gutenverse-core/hooks';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';
import { CopyElementToolbar } from 'gutenverse-core/components';
import { useEntityProp } from '@wordpress/core-data';
import apiFetch from '@wordpress/api-fetch';

const DynamicFieldBlock = compose(
    withPartialRender
)((props) => {
    const {
        attributes,
        clientId,
        context: blockContext
    } = props;

    const {
        elementId,
        placeholder,
        fieldKey,
        postId: blockPostId,
        htmlTag: HtmlTag = 'p'
    } = attributes;

    // Extract the actual field key string from the SelectSearchControl object
    const fieldKeyValue = fieldKey?.value || '';

    const context = blockContext || {};
    const postType = context.postType || 'post';
    const postId = context.postId || blockPostId;

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const elementRef = useRef();

    // Try to get ACF value from entity meta first (works if field has show_in_rest enabled).
    const [meta] = useEntityProp('postType', postType, 'meta', postId);
    const entityValue = meta?.[fieldKeyValue];

    // State for API fallback.
    const [apiFetchValue, setApiFetchValue] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Fallback to API fetch if entity value is empty.
    useEffect(() => {
        // Only fetch via API if we have a fieldKey, postId, and no entity value.
        if (!fieldKeyValue || !postId || entityValue !== undefined) {
            setApiFetchValue(null);
            return;
        }

        setIsLoading(true);
        apiFetch({
            path: `gutenverse/v1/dynamic-field-value?fieldKey=${encodeURIComponent(fieldKeyValue)}&postId=${postId}`,
        })
            .then((response) => {
                if (response?.value !== undefined) {
                    setApiFetchValue(response.value);
                } else {
                    setApiFetchValue(null);
                }
            })
            .catch(() => {
                setApiFetchValue(null);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [fieldKeyValue, postId, entityValue]);

    // Use entity value first, then API fallback.
    const fieldValue = entityValue !== undefined ? entityValue : apiFetchValue;

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-dynamic-field',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: elementRef
    });

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);

    // Determine what to display.
    let displayText;
    if (isLoading && entityValue === undefined) {
        displayText = 'Loading...';
    } else if (fieldValue !== null && fieldValue !== '' && fieldValue !== undefined) {
        displayText = typeof fieldValue === 'object' ? JSON.stringify(fieldValue) : fieldValue;
    } else if (fieldKey) {
        displayText = `[ACF: ${fieldKey}]`;
    } else {
        displayText = placeholder || 'ACF Text Field';
    }

    return <>
        <CopyElementToolbar {...props}/>
        <InspectorControls>
            {/* Additional Inspector Controls */}
        </InspectorControls>
        <BlockPanelController panelList={panelList} props={{...props, postType}} elementRef={elementRef} />
        <div {...blockProps}>
            <HtmlTag className="guten-dynamic-content">
                {displayText}
            </HtmlTag>
        </div>
    </>;
});

export default DynamicFieldBlock;
