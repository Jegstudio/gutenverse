import { compose } from '@wordpress/compose';
import { BlockControls, useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';
import { RichTextComponent, classnames } from 'gutenverse-core/components';
import { __ } from '@wordpress/i18n';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { ToolbarGroup } from '@wordpress/components';
import { svgAtob, renderIcon, renderGradientElement } from 'gutenverse-core/helper';
import { useRef } from '@wordpress/element';
import { useEffect } from '@wordpress/element';
import { HighLightToolbar, URLToolbar, FilterDynamic } from 'gutenverse-core/toolbars';
import { useCallback } from '@wordpress/element';
import { getImageSrc } from 'gutenverse-core/editor-helper';
import { withAnimationAdvanceV2, withMouseMoveEffect, withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { useAnimationEditor, useDisplayEditor, useDynamicUrl } from 'gutenverse-core/hooks';
import { dispatch, useSelect } from '@wordpress/data';
import { applyFilters } from '@wordpress/hooks';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { useDynamicScript, useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';
import { useRichTextParameter } from 'gutenverse-core/helper';
import { CopyElementToolbar } from 'gutenverse-core/components';
import { getImageLoadValue } from '../../helper';

const NEW_TAB_REL = 'noreferrer noopener';

const IconBoxBlock = compose(
    withPartialRender,
    withPassRef,
    withAnimationAdvanceV2('icon-box'),
    withMouseMoveEffect
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
        setBlockRef,
    } = props;

    const {
        elementId,
        url,
        dynamicUrl,
        rel,
        linkTarget,
        titleTag,
        image,
        imageAlt,
        altType,
        icon,
        iconSVG,
        iconType,
        iconPosition,
        iconStyleMode = 'color',
        watermarkIcon,
        watermarkIconType,
        watermarkIconSVG,
        watermarkShow,
        badgeShow,
        badgePosition,
        iconBoxOverlayDirection = 'left',
        separateButtonLink,
        lazyLoad,
        hoverWithParent,
        parentSelector,
        showTitle,
        showDesc,
        iconGradient,
        iconGradientHover,
        imageLoad
    } = attributes;

    useEffect(() => {
        if ('' === imageLoad) {
            setAttributes({ imageLoad: getImageLoadValue('', lazyLoad) });
        }
    }, []);

    const {
        panelState,
        setPanelState,
        setPanelIsClicked,
        panelIsClicked
    } = useRichTextParameter();

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const elementRef = useRef();
    const prevHoverWithParent = useRef();
    const { dynamicHref } = useDynamicUrl(dynamicUrl);
    const isGlobalLinkSet = url !== undefined && url !== '';
    const deviceType = getDeviceType();
    let imageAltText = imageAlt || null;

    switch (altType) {
        case 'original':
            imageAltText = image?.altOriginal;
            break;
        case 'custom':
            imageAltText = imageAlt;
            break;
    }

    const hasInnerBlocks = useSelect(select => {
        const block = select('core/block-editor').getBlock(props.clientId);
        return block && block.innerBlocks.length > 0;
    }, [props.clientId]);

    useEffect(() => {
        setAttributes({
            hasInnerBlocks,
            separateButtonLink: hasInnerBlocks,
            hasGlobalLink: isGlobalLinkSet ? isGlobalLinkSet : false,
        });
    }, [hasInnerBlocks, isGlobalLinkSet]);

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
        ref: elementRef
    });

    const imageLazyLoad = () => {
        return <img src={getImageSrc(image)} alt={imageAltText} {...(lazyLoad && { loading: 'lazy' })} />;
    };

    const iconContent = () => {
        switch (iconType) {
            case 'icon':
                return <div className="icon-box icon-box-header">
                    <div className={`icon bg-style-${iconStyleMode}`}>
                        <i className={`${icon} icon-style-${iconStyleMode}`}></i>
                    </div>
                </div>;
            case 'svg':
                return <div className="icon-box icon-box-header">
                    <div className={`icon bg-style-${iconStyleMode}`}>
                        <div
                            className="gutenverse-icon-svg"
                            dangerouslySetInnerHTML={{ __html: svgAtob(iconSVG) }}
                        />
                        {(iconGradient || iconGradientHover) && (
                            <svg style={{ width: '0', height: '0', position: 'absolute' }} aria-hidden="true" focusable="false">
                                <defs>
                                    {iconGradient && renderGradientElement(iconGradient, `iconGradient-${elementId}`)}
                                    {iconGradientHover && renderGradientElement(iconGradientHover, `iconGradientHover-${elementId}`)}
                                </defs>
                            </svg>
                        )}
                    </div>
                </div>;
            case 'image':
                return <div className="icon-box icon-box-header">
                    <div className={`icon bg-style-${iconStyleMode}`}>
                        {imageLazyLoad()}
                    </div>
                </div>;
            default:
                return null;
        }
    };

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);
    useDynamicScript(elementRef);

    const innerBlockProps = useInnerBlocksProps(
        {},
        {
            allowedBlocks: ['gutenverse/button']
        }
    );

    prevHoverWithParent.current = hoverWithParent;
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
        !separateButtonLink && getBlocks(clientId).map(block => {
            updateBlockAttributes(block.clientId, { url, rel, linkTarget });
        });
    }, [url, rel, linkTarget, separateButtonLink]);

    useEffect(() => {
        getBlocks(clientId).map(block => {
            updateBlockAttributes(block.clientId, { hoverWithParent, parentSelector });
        });
        setAttributes({ parentSelector: `.${elementId}:hover .guten-icon-box-wrapper` });
    }, [hoverWithParent, parentSelector]);

    const iconBoxPanelState = {
        panel: 'setting',
        section: 2,
    };

    FilterDynamic(props);
    HighLightToolbar(props);

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
        <BlockPanelController panelList={panelList} props={props} deviceType={deviceType} elementRef={elementRef} panelState={panelState} setPanelIsClicked={setPanelIsClicked} />
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
                        panelState={iconBoxPanelState}
                        title="Global Link"
                        panelIsClicked={panelIsClicked}
                        setPanelIsClicked={setPanelIsClicked}
                    />,
                    { ...props, setPanelState },
                    iconBoxPanelState
                )}
            </ToolbarGroup>
        </BlockControls>

        <div  {...blockProps}>
            <div className={`guten-icon-box-wrapper hover-from-${iconBoxOverlayDirection}`}>
                {iconPosition !== 'bottom' && iconContent()}
                <div className="icon-box icon-box-body">
                    {
                        showTitle && <RichTextComponent
                            classNames={'title'}
                            tagName={titleTag}
                            aria-label={__('Icon Box Title', 'gutenverse')}
                            placeholder={__('Write title...', 'gutenverse')}
                            onChange={value => setAttributes({ title: value })}
                            multiline={false}
                            setAttributes={setAttributes}
                            attributes={attributes}
                            clientId={clientId}
                            panelDynamic={{ panel: 'setting', section: 3 }}
                            panelPosition={{ panel: 'style', section: 1 }}
                            contentAttribute={'title'}
                            setPanelState={setPanelState}
                            textChilds={'titleChilds'}
                            dynamicList={'titleDynamicList'}
                            isUseDinamic={true}
                            isUseHighlight={true}
                            parentHasLink={isGlobalLinkSet}
                        />
                    }
                    {
                        showDesc && <RichTextComponent
                            classNames={'icon-box-description'}
                            tagName={'p'}
                            aria-label={__('Icon Box Description', 'gutenverse')}
                            placeholder={__('Write description...', 'gutenverse')}
                            onChange={value => setAttributes({ description: value })}
                            multiline={false}
                            setAttributes={setAttributes}
                            attributes={attributes}
                            clientId={clientId}
                            panelDynamic={{ panel: 'setting', section: 3 }}
                            panelPosition={{ panel: 'style', section: 1 }}
                            contentAttribute={'description'}
                            setPanelState={setPanelState}
                            textChilds={'descriptionChilds'}
                            dynamicList={'descriptionDynamicList'}
                            isUseDinamic={true}
                            isUseHighlight={true}
                            parentHasLink={isGlobalLinkSet}
                        />
                    }
                    <div {...innerBlockProps} />
                </div>
                {iconPosition === 'bottom' && iconContent()}
                {badgeShow && <div className={`icon-box-badge ${badgePosition}`}>
                    <RichTextComponent
                        classNames={'badge-text'}
                        tagName={'span'}
                        aria-label={__('Icon Box Badge', 'gutenverse')}
                        placeholder={__('Badge name...', 'gutenverse')}
                        onChange={value => setAttributes({ badge: value })}
                        multiline={false}
                        setAttributes={setAttributes}
                        attributes={attributes}
                        clientId={clientId}
                        panelDynamic={{ panel: 'setting', section: 3 }}
                        panelPosition={{ panel: 'style', section: 1 }}
                        contentAttribute={'badge'}
                        setPanelState={setPanelState}
                        textChilds={'badgeChilds'}
                        dynamicList={'badgeDynamicList'}
                        isUseDinamic={true}
                        isUseHighlight={true}
                        parentHasLink={isGlobalLinkSet}
                    />
                </div>}
                {watermarkShow && <div className="hover-watermark">
                    {renderIcon(watermarkIcon, watermarkIconType, watermarkIconSVG)}
                </div>}
            </div>
        </div>
    </>;
});

export default IconBoxBlock;