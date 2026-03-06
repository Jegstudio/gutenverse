import { compose } from '@wordpress/compose';
import { useRef, useState, useCallback, useEffect } from '@wordpress/element';
import { withPartialRender, withPassRef, withAnimationAdvanceV2, withMouseMoveEffect } from 'gutenverse-core/hoc';
import { useBlockProps, RichText, BlockControls } from '@wordpress/block-editor';
import { classnames, link } from 'gutenverse-core/components';
import { __ } from '@wordpress/i18n';
import { panelList } from './panels/panel-list';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { URLToolbar } from 'gutenverse-core/toolbars';
import { useAnimationEditor, useDisplayEditor, useDynamicContent, useDynamicUrl } from 'gutenverse-core/hooks';
import { useSelect, dispatch } from '@wordpress/data';
import { applyFilters } from '@wordpress/hooks';
import getBlockStyle from './styles/block-style';
import { useDynamicScript, useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import { BlockPanelController } from 'gutenverse-core/controls';
import { useRichTextParameter } from 'gutenverse-core/helper';
import { CopyElementToolbar } from 'gutenverse-core/components';
import { renderIcon } from './render-icon';

const NEW_TAB_REL = 'noreferrer noopener';

const ButtonBlock = compose(
    withPartialRender,
    withPassRef,
    withAnimationAdvanceV2('button'),
    withMouseMoveEffect
)((props) => {
    const {
        attributes,
        setAttributes,
        isSelected,
        clientId,
        context: { hoverWithParent, parentSelector },
        setBlockRef,
    } = props;

    const prevHoverWithParent = useRef();
    useEffect(() => {
        if (attributes.hoverWithParent !== hoverWithParent && prevHoverWithParent.current !== hoverWithParent) {
            setAttributes({
                hoverWithParent: hoverWithParent,
                parentSelector: parentSelector
            });
        }
        prevHoverWithParent.current = hoverWithParent;
    }, [attributes.hoverWithParent, hoverWithParent, parentSelector]);

    const {
        elementId,
        content,
        buttonType,
        buttonSize,
        showIcon,
        icon,
        iconType,
        iconSVG,
        url,
        rel,
        linkTarget,
        iconPosition = 'before',
        role,
        ariaLabel,
        dynamicContent,
        dynamicUrl,
    } = attributes;

    const {
        panelState,
        setPanelState,
        setPanelIsClicked,
        panelIsClicked
    } = useRichTextParameter();

    const {
        getBlockRootClientId,
        getBlock,
    } = useSelect(
        (select) => select('core/block-editor'),
        []
    );

    const {
        selectBlock
    } = dispatch('core/block-editor');

    const textRef = useRef();
    const elementRef = useRef(null);
    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);
    useDynamicScript(elementRef);

    useDynamicScript(elementRef);
    const placeholder = showIcon ? '' : __('Button Text...');
    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const [allowLink, setAllowLink] = useState(true);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-button-wrapper',
            'no-margin',
            elementId,
            displayClass,
            animationClass,
        ),
        ref: elementRef
    });

    const buttonProps = {
        className: classnames(
            'guten-button',
            {
                [`guten-button-${buttonType}`]: buttonType && buttonType !== 'default',
                [`guten-button-${buttonSize}`]: buttonSize,
            }
        ),
    };

    const getAllowedLink = () => {
        const parentId = getBlockRootClientId(clientId);

        if (parentId) {
            const block = getBlock(parentId);
            const nolink = new Set([
                'gutenverse/icon-box',
                'gutenverse/image-box'
            ]);

            if (nolink.has(block.name) && !block.attributes?.separateButtonLink) {
                return false;
            }
        }
        return true;
    };

    useEffect(() => {
        const allowed = getAllowedLink();
        setAllowLink(allowed);
    }, [props]);

    useEffect(() => {
        const allowed = getAllowedLink();

        if (!allowed && url === undefined) {
            const parentId = getBlockRootClientId(clientId);
            const block = getBlock(parentId);
            const { attributes } = block;
            const { url, linkTarget, rel } = attributes;

            setAttributes({
                url: url,
                linkTarget: linkTarget,
                rel: rel,
            });
        }
    }, []);

    useEffect(() => {
        if (elementRef) {
            setBlockRef(elementRef);
        }
    }, [elementRef]);

    const onToggleOpenInNewTab = useCallback(
        (value) => {
            const newLinkTarget = value ? '_blank' : undefined;

            let updatedRel = rel;
            if (newLinkTarget && !rel) {
                updatedRel = NEW_TAB_REL;
            } else if (!newLinkTarget && rel === NEW_TAB_REL) {
                updatedRel = undefined;
            }

            setAttributes({
                linkTarget: newLinkTarget,
                rel: updatedRel,
            });
        },
        [rel, setAttributes]
    );

    const buttonPanelState = {
        panel: 'setting',
        section: 1,
    };

    const buttonText = <>
        {showIcon && iconPosition === 'before' && renderIcon(icon, iconType, iconSVG)}
        <RichText
            tagName={'span'}
            value={content}
            placeholder={placeholder}
            onChange={(value) => setAttributes({ content: value })}
            multiline={false}
            withoutInteractiveFormatting
            identifier="content"
            ref={textRef}
        />
        {showIcon && iconPosition === 'after' && renderIcon(icon, iconType, iconSVG)}
    </>;

    const ButtonURLToolbar = () => {
        return allowLink && role === 'link' && <URLToolbar
            url={url}
            setAttributes={setAttributes}
            isSelected={isSelected}
            opensInNewTab={linkTarget === '_blank'}
            onToggleOpenInNewTab={onToggleOpenInNewTab}
            anchorRef={blockProps.ref}
            usingDynamic={true}
            setPanelState={setPanelState}
            panelState={buttonPanelState}
            panelIsClicked={panelIsClicked}
            setPanelIsClicked={setPanelIsClicked}
        />;
    };

    const { dynamicText } = useDynamicContent(dynamicContent);
    const { dynamicHref } = useDynamicUrl(dynamicUrl);

    useEffect(() => {
        if (dynamicHref !== undefined) {
            setAttributes({ url: dynamicHref, isDynamic: true });
        } else {
            setAttributes({ url: url });
        }

        if (dynamicText !== undefined) {
            setAttributes({ content: dynamicText });
        }
    }, [dynamicText, dynamicHref]);

    return <>
        <CopyElementToolbar {...props} />
        <BlockPanelController props={props} panelList={panelList} elementRef={elementRef} panelState={panelState} setPanelIsClicked={setPanelIsClicked} />
        <BlockControls>
            <ToolbarGroup>
                {applyFilters('gutenverse.button.url-toolbar', <ButtonURLToolbar />, { ...props, setPanelState }, buttonPanelState)}
                {!allowLink && <ToolbarButton
                    name="link"
                    icon={link}
                    title={__('Set link on parent', 'gutenverse')}
                    onClick={() => {
                        const rootId = getBlockRootClientId(props.clientId);
                        selectBlock(rootId);
                    }}
                />}

            </ToolbarGroup>
        </BlockControls>
        <span ref={elementRef} style={{ display: 'none' }}></span>
        <div  {...blockProps}>
            {role === 'link' ?
                <a {...buttonProps} onClick={() => textRef.current.focus()} aria-label={ariaLabel}>{buttonText}</a> :
                <button {...buttonProps} type="submit" onSubmit={() => textRef.current.focus()}>{buttonText}</button>
            }
        </div>
    </>;
});

export default ButtonBlock;