import { useEffect, useState } from '@wordpress/element';
import { createBlocksFromInnerBlocksTemplate, createBlock } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { withMouseMoveEffect, withPartialRender } from 'gutenverse-core/hoc';
import { panelList } from './panels/panel-list';
import { RichText, useBlockProps, useInnerBlocksProps, BlockControls } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { cryptoRandomString } from 'gutenverse-core/components';
import { trash, plus } from 'gutenverse-core/components';
import { ToolbarButton, ToolbarGroup, Tooltip } from '@wordpress/components';
import { displayShortcut } from '@wordpress/keycodes';
import { BlockPanelController } from 'gutenverse-core/controls';
import { useRef } from '@wordpress/element';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'gutenverse-core/components';
import { reorder } from 'gutenverse-core/helper';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { dispatch, useSelect } from '@wordpress/data';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';
import { CopyElementToolbar } from 'gutenverse-core/components';

const TabHeadingItem = ({
    tab,
    index,
    total,
    changeActiveTab,
    editTabHeading,
    headingTag,
    activeTab,
    onChangeSequence,
    orientation
}) => {
    const classname = classnames('tab-heading-item', {
        active: activeTab === tab.tabId,
    });

    const shiftLeft = () => {
        onChangeSequence({
            source: index,
            destination: index - 1
        });
    };

    const shiftRight = () => {
        onChangeSequence({
            source: index,
            destination: index + 1
        });
    };

    return <div
        className={classname}
        data-id={tab.tabId}
        key={tab.tabId}
        onClick={() => changeActiveTab(tab.tabId)}>
        {orientation === 'horizontal' && index > 0 && <Tooltip text={__('Click to move tab left', 'gutenverse')}>
            <div className={'tab-shift tab-shift-left'} onClick={shiftLeft}>
                <ChevronLeft />
            </div>
        </Tooltip>}
        <RichText
            tagName={headingTag}
            aria-label={__('Tab text')}
            placeholder={__('Add text…')}
            value={tab.text}
            onChange={value => editTabHeading(value, index)}
            withoutInteractiveFormatting
            identifier={`heading-${tab.tabId}`}
        />
        {orientation === 'horizontal' && index < (total - 1) && <Tooltip text={__('Click to move tab right', 'gutenverse')}>
            <div className={'tab-shift tab-shift-right'} onClick={shiftRight}>
                <ChevronRight />
            </div>
        </Tooltip>}
        {orientation === 'vertical' && <div className="heading-navigation">
            {index > 0 && <Tooltip text={__('Click to move tab up', 'gutenverse')}>
                <div className="tab-shift-vertical tab-shift-up" onClick={shiftLeft}>
                    <ChevronUp />
                </div>
            </Tooltip>}
            {index < (total - 1) && <Tooltip text={__('Click to move tab down', 'gutenverse')}>
                <div className="tab-shift-vertical tab-shift-down" onClick={shiftRight}>
                    <ChevronDown />
                </div>
            </Tooltip>}
        </div>}
    </div>;
};


const TabHeadingResponsive = ({
    tabs,
    changeActiveTab,
    activeTab,
}) => {
    const [dropOpen, setDropOpen] = useState(false);
    const active = tabs.filter(item => item.tabId === activeTab);

    const toggleOpenState = () => {
        setDropOpen(state => !state);
    };

    const activateTab = tabId => {
        toggleOpenState();
        changeActiveTab(tabId);
    };

    return <div className={classnames('tab-heading-mobile', {
        open: dropOpen
    })}>
        <div className={'tab-title'} onClick={toggleOpenState}>
            {active.length > 0 && <RichText.Content
                value={active[0].text}
                tagName="span"
            />}
            <div className="gutenverse-icon-svg">
                <svg className="chevron-up-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M201.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 173.3 54.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z" /></svg>
                <svg className="chevron-down-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" /></svg>
            </div>
        </div>
        <div className={'tab-option'}>
            {tabs.map(tab => {
                const itemClassname = classnames('tab-option-item', {
                    active: tab.tabId === activeTab
                });
                return <div key={tab.tabId} data-id={tab.tabId} className={itemClassname} onClick={() => activateTab(tab.tabId)}>
                    <RichText.Content
                        value={tab.text}
                        tagName="span"
                    />
                </div>;
            })}
        </div>
    </div>;
};

const TabHeading = ({
    tabs,
    changeActiveTab,
    editTabHeading,
    onChangeSequence,
    ...attributes
}) => {
    const classname = classnames('tab-heading');
    const TheTabHeading = tabs.map((tab, index) => {
        return <TabHeadingItem
            tab={tab}
            index={index}
            key={tab.tabId}
            total={tabs.length}
            changeActiveTab={changeActiveTab}
            editTabHeading={editTabHeading}
            onChangeSequence={onChangeSequence}
            {...attributes}
        />;
    });

    return <div className={classname}>
        {TheTabHeading}
    </div>;
};


const Tabs = compose(
    withPartialRender,
    withMouseMoveEffect
)(props => {
    const {
        insertBlock,
        removeBlocks,
        replaceInnerBlocks
    } = dispatch('core/block-editor');

    const {
        getBlocks
    } = useSelect(
        (select) => select('core/block-editor'),
        []
    );

    const {
        clientId,
        attributes,
        setAttributes,
    } = props;

    const {
        elementId,
        tabs,
        orientation,
    } = attributes;

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const deviceType = getDeviceType();
    const [activeTab, setActiveTab] = useState(0);
    const elementRef = useRef();

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);

    useEffect(() => {
        if (tabs === undefined) {
            const newTabs = [
                {
                    tabId: 'tab-' + cryptoRandomString({ length: 6, type: 'alphanumeric' }),
                    text: 'Tab 1'
                },
                {
                    tabId: 'tab-' + cryptoRandomString({ length: 6, type: 'alphanumeric' }),
                    text: 'Tab 2'
                },
                {
                    tabId: 'tab-' + cryptoRandomString({ length: 6, type: 'alphanumeric' }),
                    text: 'Tab 3'
                },
            ];

            setAttributes({
                tabs: newTabs,
            });

            // Create Element
            const child = newTabs.map(tab => {
                return ['gutenverse/tab', {
                    key: tab.tabId,
                    tabId: tab.tabId,
                }];
            });

            const variation = createBlocksFromInnerBlocksTemplate(child);
            replaceInnerBlocks(clientId, variation, true);
            changeActiveTab(newTabs[0].tabId);
        } else {
            changeActiveTab(tabs[0].tabId);
        }
    }, []);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-tabs',
            'no-margin',
            elementId,
            orientation,
            animationClass,
            displayClass,
            deviceType,
        ),
        ref: elementRef
    });

    const innerBlocksProps = useInnerBlocksProps({
        className: 'tab-body'
    }, {
        template: [['gutenverse/tab']],
        allowedBlocks: ['gutenverse/tab'],
        __experimentalAppenderTagName: 'div',
    });

    const editTabHeading = (value, index) => {
        const newTabs = tabs.map((tab, idx) => {
            if (index === idx) {
                return {
                    ...tab,
                    text: value
                };
            } else {
                return tab;
            }
        });

        setAttributes({
            tabs: newTabs
        });
    };

    const onChangeSequence = result => {
        const { destination, source } = result;

        const newOrder = reorder(tabs, source, destination);
        setAttributes({
            tabs: newOrder
        });
    };

    const changeActiveTab = key => {
        setActiveTab(key);
        if (elementRef.current) {
            elementRef.current.querySelectorAll('.tab-body-item.active').forEach(childs => {
                childs.classList.remove('active');
            });
            elementRef.current.querySelectorAll(`.tab-body-item[data-id="${key}"]`).forEach(childs => {
                childs.classList.add('active');
            });
        }
    };

    const headingParameter = {
        changeActiveTab,
        onChangeSequence,
        editTabHeading,
        activeTab,
        ...attributes
    };

    const deleteCurrentTab = () => {
        const remainingTab = tabs.filter(item => item.tabId !== activeTab);
        const removedClient = getBlocks(clientId).filter(item => item.attributes.tabId === activeTab)[0];

        setAttributes({ tabs: remainingTab });
        removeBlocks(removedClient.clientId, false);
        changeActiveTab(remainingTab[0].tabId);
    };

    const addNewTab = () => {
        const tabId = cryptoRandomString({ length: 6, type: 'alphanumeric' });

        const newChild = createBlock('gutenverse/tab', {
            key: tabId,
            tabId: tabId,
        });

        insertBlock(newChild, getBlocks(clientId).length + 1, clientId);

        setAttributes({
            tabs: [
                ...tabs,
                {
                    tabId: tabId,
                    text: __('New Tab', 'gutenverse')
                }
            ]
        });
        changeActiveTab(tabId);
    };

    return <>
        <CopyElementToolbar {...props} />
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
        <BlockControls>
            <ToolbarGroup>
                <ToolbarButton
                    name="add"
                    icon={plus}
                    title={__('Add New Tab', 'gutenverse')}
                    shortcut={displayShortcut.primary('a')}
                    onClick={() => addNewTab()}
                />
                <ToolbarButton
                    name="delete"
                    icon={trash}
                    title={__('Delete Tab', 'gutenverse')}
                    shortcut={displayShortcut.primary('d')}
                    onClick={() => deleteCurrentTab()}
                    disabled={tabs !== undefined && tabs.length <= 1}
                />
            </ToolbarGroup>
        </BlockControls>
        <div {...blockProps}>
            {tabs !== undefined && (
                <>
                    <TabHeading {...headingParameter} />
                    <TabHeadingResponsive {...headingParameter} />
                </>
            )}
            <div {...innerBlocksProps} />
        </div>
    </>;
});

export default Tabs;
