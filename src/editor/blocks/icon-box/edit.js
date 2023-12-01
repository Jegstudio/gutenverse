import { compose } from '@wordpress/compose';
import { useState } from '@wordpress/element';
import { withCustomStyle } from 'gutenverse-core/hoc';
import { BlockControls, RichText, useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { __ } from '@wordpress/i18n';
import { PanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { createPortal } from 'react-dom';
import { IconLibrary } from 'gutenverse-core/controls';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { displayShortcut } from '@wordpress/keycodes';
import { gutenverseRoot } from 'gutenverse-core/helper';
import { LogoCircleColor24SVG } from 'gutenverse-core/icons';
import { useRef } from '@wordpress/element';
import { useEffect } from '@wordpress/element';
import { URLToolbar } from 'gutenverse-core/toolbars';
import { useCallback } from '@wordpress/element';
import { getImageSrc } from 'gutenverse-core/editor-helper';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { withAnimationAdvance } from 'gutenverse-core/hoc';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { dispatch, useSelect } from '@wordpress/data';

const NEW_TAB_REL = 'noreferrer noopener';

const IconBoxBlock = compose(
    withCustomStyle(panelList),
    withAnimationAdvance('icon-box'),
    withCopyElementToolbar()
)((props) => {
    const {
        getBlocks,
    } = useSelect(
        (select) => select('core/block-editor'),
        []
    );

    const {
        updateBlockAttributes,
    } = dispatch('core/block-editor');

    const {
        clientId,
        isSelected,
        attributes,
        setAttributes,
        setElementRef,
        deviceType,
    } = props;

    const {
        elementId,
        url,
        rel,
        linkTarget,
        title,
        titleTag,
        description,
        image,
        imageAlt,
        icon,
        iconType,
        iconPosition,
        iconStyleMode = 'color',
        watermarkIcon,
        watermarkShow,
        badgeShow,
        badge,
        badgePosition,
        iconBoxOverlayDirection = 'left',
        separateButtonLink,
    } = attributes;

    const imageAltText = imageAlt || null;
    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const [openIconLibrary, setOpenIconLibrary] = useState(false);
    const iconBoxRef = useRef();

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-icon-box',
            'no-margin',
            elementId,
            animationClass,
            displayClass,
            `icon-position-${iconPosition}`,
        ),
        ref: iconBoxRef
    });

    const iconContent = () => {
        switch (iconType) {
            case 'icon':
                return <div className="icon-box icon-box-header">
                    <div className={`icon style-${iconStyleMode}`} onClick={() => setOpenIconLibrary(true)}>
                        <i className={icon}></i>
                    </div>
                </div>;
            case 'image':
                return <div className="icon-box icon-box-header">
                    <div className={`icon style-${iconStyleMode}`}>
                        <img src={getImageSrc(image)} alt={imageAltText} />
                    </div>
                </div>;
            default:
                return null;
        }
    };

    const innerBlockProps = useInnerBlocksProps(
        {},
        {
            allowedBlocks: ['gutenverse/button'],
        }
    );

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

    useEffect(() => {
        if (iconBoxRef.current) {
            setElementRef(iconBoxRef.current);
        }
    }, [iconBoxRef]);

    useEffect(()=>{
        setAttributes({
            deviceType: deviceType,
        });
    },[deviceType]);

    useEffect(() => {
        !separateButtonLink && getBlocks(clientId).map(block => {
            updateBlockAttributes(block.clientId, { url, rel, linkTarget });
        });
    }, [url, rel, linkTarget, separateButtonLink]);

    return <>
        <PanelController panelList={panelList} {...props}  deviceType = {deviceType} />
        <BlockControls>
            <ToolbarGroup>
                <URLToolbar
                    url={url}
                    setAttributes={setAttributes}
                    isSelected={isSelected}
                    opensInNewTab={linkTarget === '_blank'}
                    onToggleOpenInNewTab={onToggleOpenInNewTab}
                    anchorRef={blockProps.ref}
                />
                <ToolbarButton
                    name="icon"
                    icon={<LogoCircleColor24SVG/>}
                    title={__('Choose Icon', 'gutenverse')}
                    shortcut={displayShortcut.primary('i')}
                    onClick={() => setOpenIconLibrary(true)}
                />
            </ToolbarGroup>
        </BlockControls>
        {openIconLibrary && createPortal(
            <IconLibrary
                closeLibrary={() => setOpenIconLibrary(false)}
                value={icon}
                onChange={icon => setAttributes({ icon })}
            />,
            gutenverseRoot
        )}
        <div  {...blockProps}>
            <div className={`guten-icon-box-wrapper hover-from-${iconBoxOverlayDirection}`}>
                {iconContent()}
                <div className="icon-box icon-box-body">
                    <RichText
                        className="title"
                        identifier="title"
                        tagName={titleTag}
                        value={title}
                        onChange={(value) => setAttributes({ title: value })}
                        placeholder={__('Write title…')}
                        multiline={false}
                    />
                    <RichText
                        className="icon-box-description"
                        identifier="description"
                        tagName={'p'}
                        value={description}
                        onChange={(value) => setAttributes({ description: value })}
                        placeholder={__('Write description…')}
                        multiline={false}
                    />
                    <div {...innerBlockProps} />
                </div>
                {badgeShow && <div className={`icon-box-badge ${badgePosition}`}>
                    <RichText
                        className="badge-text"
                        identifier="badge"
                        tagName={'span'}
                        value={badge}
                        onChange={(value) => setAttributes({ badge: value })}
                        placeholder={__('Badge name…')}
                        multiline={false}
                    />
                </div>}
                {watermarkShow && <div className="hover-watermark">
                    <i className={watermarkIcon}></i>
                </div>}
            </div>
        </div>
    </>;
});

export default IconBoxBlock;