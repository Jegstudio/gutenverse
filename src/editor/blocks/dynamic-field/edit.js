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
        fieldContent,
        postId: blockPostId,
        htmlTag: HtmlTag = 'p'
    } = attributes;

    // Extract the actual field key string from the SelectSearchControl object
    const fieldContentValue = fieldContent?.value || '';
    const fieldLinkKey = attributes.fieldLink?.value || '';


    const context = blockContext || {};
    const postType = context.postType || 'post';
    const postId = context.postId || blockPostId;

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const elementRef = useRef();

    // Try to get value from entity meta first (works if field has show_in_rest enabled).
    const [meta] = useEntityProp('postType', postType, 'meta', postId);
    const entityValue = meta?.[fieldContentValue];
    const entityLinkValue = meta?.[fieldLinkKey];

    // State for API fallback.
    const [apiFetchValue, setApiFetchValue] = useState(null);
    const [apiLinkValue, setApiLinkValue] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Fallback to API fetch if entity value is empty.
    useEffect(() => {
        // Only fetch via API if we have a fieldContent, postId, and no entity value.
        if (!fieldContentValue || !postId || entityValue !== undefined) {
            setApiFetchValue(null);
            return;
        }

        setIsLoading(true);
        apiFetch({
            path: `gutenverse/v1/dynamic-field-value?fieldKey=${encodeURIComponent(fieldContentValue)}&postId=${postId}`,
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
    }, [fieldContentValue, postId, entityValue]);

    // Fallback to API fetch for link value
    useEffect(() => {
        if (!fieldLinkKey || !postId || entityLinkValue !== undefined) {
            setApiLinkValue(null);
            return;
        }

        apiFetch({
            path: `gutenverse/v1/dynamic-field-value?fieldKey=${encodeURIComponent(fieldLinkKey)}&postId=${postId}`,
        })
            .then((response) => {
                if (response?.value !== undefined) {
                    setApiLinkValue(response.value);
                } else {
                    setApiLinkValue(null);
                }
            })
            .catch(() => {
                setApiLinkValue(null);
            });
    }, [fieldLinkKey, postId, entityLinkValue]);

    // Use entity value first, then API fallback.
    const fieldValue = entityValue !== undefined ? entityValue : apiFetchValue;
    const linkValue = entityLinkValue !== undefined ? entityLinkValue : apiLinkValue;

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
    } else if (fieldContent) {
        const label = fieldContent?.label || fieldContent;
        const cleanLabel = label.includes(' (') ? label.split(' (')[0] : label;
        displayText = `[${cleanLabel}]`;
    } else {
        displayText = placeholder || 'Dynamic Field';
    }

    let content = displayText;

    if (attributes.link) {
        const urlKey = linkValue || fieldValue;
        const target = attributes.linkTarget ? '_blank' : '_self';

        if (urlKey) {
            content = (
                <a href={urlKey} target={target} onClick={(e) => e.preventDefault()}>
                    {displayText}
                </a>
            );
        }
    }

    return <>
        <CopyElementToolbar {...props} />
        <InspectorControls>
            {/* Additional Inspector Controls */}
        </InspectorControls>
        <BlockPanelController panelList={panelList} props={{ ...props, postType }} elementRef={elementRef} />
        <div {...blockProps}>
            <HtmlTag className="guten-dynamic-content">
                {content}
            </HtmlTag>
        </div>
    </>;
});

export default DynamicFieldBlock;
