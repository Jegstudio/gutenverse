import { __ } from '@wordpress/i18n';
import { useCallback, useState } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { BlockControls, InspectorControls, RichText, useBlockProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { createPortal } from 'react-dom';
import { IconLibrary } from 'gutenverse-core/controls';
import { getSocialType, gutenverseRoot } from 'gutenverse-core/helper';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { displayShortcut } from '@wordpress/keycodes';
import { URLToolbar } from 'gutenverse-core/toolbars';
import { LogoCircleColor24SVG } from 'gutenverse-core/icons';
import { useRef } from '@wordpress/element';
import { useEffect } from '@wordpress/element';
import { withAnimationAdvanceV2, withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { SelectParent } from 'gutenverse-core/components';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { applyFilters } from '@wordpress/hooks';
import isEmpty from 'lodash/isEmpty';
import { isOnEditor } from 'gutenverse-core/helper';
import { useDynamicScript, useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';
import { useRichTextParameter } from 'gutenverse-core/helper';
import { CopyElementToolbar } from 'gutenverse-core/components';

const NEW_TAB_REL = 'noreferrer noopener';

const SocialIcon = compose(
    withPartialRender,
    withPassRef,
    withAnimationAdvanceV2('social-icon')
)(props => {
    const [openIconLibrary, setOpenIconLibrary] = useState(false);
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
        text,
        url,
        linkTarget,
        rel,
        dynamicUrl,
    } = attributes;

    const {
        panelState,
        setPanelState,
        setPanelIsClicked,
        panelIsClicked
    } = useRichTextParameter();

    const displayClass = useDisplayEditor(attributes);
    const animationClass = useAnimationEditor(attributes);
    const socialType = getSocialType(icon);
    const elementRef = useRef();
    const [dynamicHref, setDynamicHref] = useState();

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-social-icon',
            'no-margin',
            elementId,
            socialType,
            animationClass,
            displayClass,
        ),
        ref: elementRef
    });

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

    const socialIconPanelState = {
        panel: 'setting',
        section: 1,
    };

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);
    useDynamicScript(elementRef);

    useEffect(() => {
        const dynamicUrlcontent = isEmpty(dynamicUrl) || !isOnEditor() ? dynamicUrl : applyFilters(
            'gutenverse.dynamic.fetch-url',
            dynamicUrl
        );

        (typeof dynamicUrlcontent.then === 'function') && !isEmpty(dynamicUrl) && dynamicUrlcontent
            .then(result => {
                if ((!Array.isArray(result) || result.length > 0) && result !== undefined && result !== dynamicHref) {
                    setDynamicHref(result);
                } else if (result !== dynamicHref) setDynamicHref(undefined);
            }).catch(() => { });
        if (dynamicHref !== undefined) {
            setAttributes({ url: dynamicHref, isDynamic: true });
        } else { setAttributes({ url: url }); }
    }, [dynamicUrl, dynamicHref]);

    useEffect(() => {
        if (elementRef) {
            setBlockRef(elementRef);
        }
    }, [elementRef]);

    return <>
        <CopyElementToolbar {...props}/>
        <InspectorControls>
            <SelectParent {...props}>
                {__('Modify Icon Group', 'gutenverse')}
            </SelectParent>
        </InspectorControls>
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} panelState={panelState} setPanelIsClicked={setPanelIsClicked} />
        {openIconLibrary && createPortal(<IconLibrary
            closeLibrary={() => setOpenIconLibrary(false)}
            value={icon}
            onChange={value => setAttributes({ icon: value })}
        />, gutenverseRoot)}
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
                        panelState={socialIconPanelState}
                        title="Item Link"
                        panelIsClicked={panelIsClicked}
                        setPanelIsClicked={setPanelIsClicked}
                    />,
                    {...props, setPanelState},
                    socialIconPanelState
                )}
                <ToolbarButton
                    name="icon"
                    icon={<LogoCircleColor24SVG />}
                    title={__('Choose Icon', 'gutenverse')}
                    shortcut={displayShortcut.primary('i')}
                    onClick={() => setOpenIconLibrary(true)}
                />
            </ToolbarGroup>
        </BlockControls>
        <div {...blockProps}>
            <a id={elementId}>
                <i className={icon} />
                <RichText
                    tagName="span"
                    aria-label={__('Button text')}
                    placeholder={__('Add text…')}
                    value={text}
                    onChange={(value) => setAttributes({ text: value })}
                    withoutInteractiveFormatting
                    identifier="text"
                />
            </a>
        </div>
    </>;
});

export default SocialIcon;