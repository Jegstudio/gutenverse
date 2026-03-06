import { __ } from '@wordpress/i18n';
import anime from 'animejs';
import { useEffect, useRef } from '@wordpress/element';
import { panelList } from './panels/panel-list';
import { useInnerBlocksProps, useBlockProps, BlockControls, InspectorControls } from '@wordpress/block-editor';
import { RichTextComponent, classnames, u } from 'gutenverse-core/components';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { Check, X } from 'gutenverse-core/components';
import { dispatch, useSelect } from '@wordpress/data';
import { SelectParent } from 'gutenverse-core/components';
import { BlockPanelController, PanelTutorial } from 'gutenverse-core/controls';
import { HighLightToolbar, FilterDynamic } from 'gutenverse-core/toolbars';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';
import { useRichTextParameter, renderIcon } from 'gutenverse-core/helper';
import { CopyElementToolbar } from 'gutenverse-core/components';

export const AccordionIcon = ({ iconOpen, iconOpenType, iconOpenSVG, iconClosed, iconClosedType, iconClosedSVG }) => {
    return <div className={'accordion-icon'}>
        <span className={'accordion-icon-open'}>
            {renderIcon(iconOpen, iconOpenType, iconOpenSVG)}
        </span>
        <span className={'accordion-icon-closed'}>
            {renderIcon(iconClosed, iconClosedType, iconClosedSVG)}
        </span>
    </div>;
};

const Accordion = props => {
    const {
        getBlocks,
        getBlock,
        getBlockRootClientId,
    } = useSelect(
        (select) => select('core/block-editor'),
        []
    );
    const {
        updateBlockAttributes
    } = dispatch('core/block-editor');

    const {
        attributes,
        setAttributes,
        clientId,
    } = props;

    const {
        iconPosition,
        iconOpen,
        iconOpenType,
        iconOpenSVG,
        iconClosed,
        iconClosedType,
        iconClosedSVG,
        titleTag,
        first,
        elementId
    } = attributes;

    const {
        panelState,
        setPanelState,
    } = useRichTextParameter();

    const elementRef = useRef(null);

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);

    const accordionClass = classnames('accordion-content');

    const blockProps = useBlockProps({
        className: classnames(
            'accordion-item',
            elementId,
            first && 'active'
        ),
        ref: elementRef
    });

    const innerBlocksProps = useInnerBlocksProps({
        className: accordionClass
    }, {
        template: [['core/paragraph']]
    });

    const animate = (accordionBodies, setClosed = false) => {
        for (let i = 0; i < accordionBodies.length; i++) {
            const item = accordionBodies[i];
            const body = u(item);
            const bodySize = body.find('.accordion-content').size();
            const isActive = body.hasClass('active');
            if(isActive) {
                anime({
                    targets: body.first(),
                    height: bodySize.height,
                    duration: 500,
                    easing: 'easeOutCubic',
                }).finished.finally(() => {
                    body.attr('style', '');
                });
            } else {
                setClosed && body.addClass('closed');
                anime({
                    targets: body.first(),
                    height: '0',
                    duration: 500,
                    easing: 'easeOutCubic',
                }).finished.finally(() => {
                    setClosed && body.removeClass('closed');
                    body.attr('style', '');
                });
            }
        }
    };

    const setFirstActive = () => {
        // Remove Active.
        const parent = elementRef.current.parentElement;
        const headings = parent.getElementsByClassName('accordion-heading');
        const bodies = parent.getElementsByClassName('accordion-body');

        animate(bodies, false);

        for (let i = 0; i < headings.length; i++) {
            headings[i].classList.remove('active');
            bodies[i].classList.remove('active');
        }

        // Add active state.
        if (!first) {
            const heading = elementRef.current.getElementsByClassName('accordion-heading');
            const body = elementRef.current.getElementsByClassName('accordion-body');

            heading[0].classList.add('active');
            body[0].classList.add('active');
        }

        animate(bodies, true);

        // Commit to attribute.
        setTimeout(() => {
            const rootId = getBlockRootClientId(clientId);
            const childs = getBlocks(rootId);

            childs.map((child) => {
                updateBlockAttributes(child.clientId, { first: false });
            });

            setAttributes({ first: !first });
        }, 1);
    };

    useEffect(() => {
        if (first) {
            const heading = elementRef.current.getElementsByClassName('accordion-heading');
            const body = elementRef.current.getElementsByClassName('accordion-body');

            heading[0].classList.add('active');
            body[0].classList.add('active');
        }
    }, []);

    useEffect(() => {
        let rootId = getBlockRootClientId(clientId);
        let parent = getBlock(rootId);
        let { attributes } = parent;

        let {
            iconOpen,
            iconOpenType,
            iconOpenSVG,
            iconClosed,
            iconClosedType,
            iconClosedSVG,
            iconPosition,
            titleTag,
        } = attributes;

        setAttributes({
            iconOpen,
            iconOpenType,
            iconOpenSVG,
            iconClosed,
            iconClosedType,
            iconClosedSVG,
            iconPosition,
            titleTag
        });

        return () => {
            rootId = null;
            parent = null;
            attributes = null;
            iconOpen = null;
            iconOpenType = null;
            iconOpenSVG = null;
            iconClosed = null;
            iconClosedType = null;
            iconClosedSVG = null;
            iconPosition = null;
            titleTag = null;
        };
    }, []);

    FilterDynamic(props);
    HighLightToolbar(props);

    return <>
        <CopyElementToolbar {...props}/>
        <InspectorControls>
            <SelectParent {...props}>
                {__('Select accordion parent', 'gutenverse')}
            </SelectParent>
            <PanelTutorial
                title={__('How to use accordion', 'gutenverse')}
                list={[
                    {
                        title: __('Add new accordion child', 'gutenverse'),
                        description: __('To add new accordion, Click above button (Select accordion parent), and click + button (Add accordion item) on bottom right of your accordion.', 'gutenverse')
                    },
                    {
                        title: __('Change default active', 'gutenverse'),
                        description: __('Last Accordin Open will be the active state when first time loaded on frontend.', 'gutenverse')
                    }
                ]}
            />
        </InspectorControls>
        <BlockControls>
            <ToolbarGroup>
                <ToolbarButton
                    name="icon"
                    icon={first ? <X style={{ color: '#000', fill: '#fff' }} /> : <Check style={{ color: '#000', fill: '#fff' }} />}
                    title={__('Default Active', 'gutenverse')}
                    onClick={setFirstActive}
                />
            </ToolbarGroup>
        </BlockControls>
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} panelState={panelState} />
        <div {...blockProps}>
            <div className="accordion-heading" onClick={setFirstActive}>
                {iconPosition === 'left' && <AccordionIcon iconClosed={iconClosed} iconClosedType={iconClosedType} iconClosedSVG={iconClosedSVG} iconOpen={iconOpen} iconOpenType={iconOpenType} iconOpenSVG={iconOpenSVG} />}
                <RichTextComponent
                    classNames={'accordion-text'}
                    tagName={titleTag}
                    aria-label={__('Accordion Title', 'gutenverse')}
                    placeholder={__('Accordion Title', 'gutenverse')}
                    onChange={value => setAttributes({ title: value })}
                    multiline={false}
                    setAttributes={setAttributes}
                    attributes={attributes}
                    clientId={clientId}
                    panelDynamic={{ panel: 'setting', section: 0 }}
                    panelPosition={{ panel: 'style', section: 0 }}
                    contentAttribute={'title'}
                    setPanelState={setPanelState}
                    textChilds={'titleChilds'}
                    dynamicList={'dynamicDataList'}
                    isUseDinamic={true}
                    isUseHighlight={true}
                />
                {iconPosition === 'right' && <AccordionIcon iconClosed={iconClosed} iconClosedType={iconClosedType} iconClosedSVG={iconClosedSVG} iconOpen={iconOpen} iconOpenType={iconOpenType} iconOpenSVG={iconOpenSVG} />}
            </div>
            <div className="accordion-body">
                <div {...innerBlocksProps} />
            </div>
        </div>
    </>;
};

export default Accordion;