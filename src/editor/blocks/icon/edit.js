
import { compose } from '@wordpress/compose';
import { BlockControls, useBlockProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { ToolbarGroup } from '@wordpress/components';
import { URLToolbar } from 'gutenverse-core/toolbars';
import { useCallback } from '@wordpress/element';
import { renderIcon } from 'gutenverse-core/helper';
import { useRef } from '@wordpress/element';
import { useEffect } from '@wordpress/element';
import { withAnimationAdvanceV2, withMouseMoveEffect, withPartialRender, withPassRef, withTooltip } from 'gutenverse-core/hoc';
import { useAnimationEditor, useDisplayEditor, useDynamicUrl } from 'gutenverse-core/hooks';
import { applyFilters } from '@wordpress/hooks';
import getBlockStyle from './styles/block-style';
import { useDynamicScript, useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import { useRichTextParameter } from 'gutenverse-core/helper';
import { CopyElementToolbar } from 'gutenverse-core/components';

const NEW_TAB_REL = 'noreferrer noopener';

const IconBlock = compose(
    withPartialRender,
    withPassRef,
    withAnimationAdvanceV2('icon'),
    withMouseMoveEffect,
    // withTooltip ? withTooltip('.guten-icon-wrapper') : (BlockElement) => (props) => <BlockElement {...props} />,
)((props) => {
    const {
        attributes,
        setAttributes,
        isSelected,
        clientId,
        setBlockRef,
    } = props;

    const {
        elementId,
        icon,
        iconType,
        iconSVG,
        iconShape,
        iconView,
        url,
        rel,
        linkTarget,
        dynamicUrl,
    } = attributes;

    const {
        panelState,
        setPanelState,
        setPanelIsClicked,
        panelIsClicked
    } = useRichTextParameter();

    const elementRef = useRef();
    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const { dynamicHref } = useDynamicUrl(dynamicUrl);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-icon',
            'no-margin',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: elementRef
    });

    const wrapperProps = {
        className: classnames(
            'guten-icon-wrapper',
            iconShape,
            iconView,
        )
    };

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

    const iconPanelState = {
        panel: 'setting',
        section: 2,
    };

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);
    useDynamicScript(elementRef);

    useEffect(() => {
        if (dynamicHref !== undefined) {
            setAttributes({ url: dynamicHref, isDynamic: true });
        } else { setAttributes({ url: url }); }
    }, [dynamicHref]);

    useEffect(() => {
        if (elementRef) {
            setBlockRef(elementRef);
        }
    }, [elementRef]);

    return <>
        <CopyElementToolbar {...props} />
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} panelState={panelState} setPanelIsClicked={setPanelIsClicked} />
        <BlockControls>
            <ToolbarGroup>
                {applyFilters('gutenverse.button.url-toolbar',
                    <URLToolbar
                        url={url}
                        setAttributes={setAttributes}
                        isSelected={isSelected}
                        opensInNewTab={linkTarget === '_blank'}
                        onToggleOpenInNewTab={onToggleOpenInNewTab}
                        anchorRef={blockProps.ref}
                        usingDynamic={true}
                        setPanelState={setPanelState}
                        panelState={iconPanelState}
                        panelIsClicked={panelIsClicked}
                        setPanelIsClicked={setPanelIsClicked}
                    />,
                    { ...props, setPanelState },
                    iconPanelState
                )}
            </ToolbarGroup>
        </BlockControls>
        <div {...blockProps}>
            <div {...wrapperProps}>
                {renderIcon(icon, iconType, iconSVG)}
            </div>
        </div>
    </>;
});

export default IconBlock;