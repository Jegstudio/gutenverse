import { compose } from '@wordpress/compose';
import { withMouseMoveEffect, withPartialRender } from 'gutenverse-core/hoc';
import { panelList } from './panels/panel-list';
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';
import { useRef, useState } from '@wordpress/element';
import { useAnimationEditor, useDisplayEditor } from 'gutenverse-core/hooks';
import { classnames } from 'gutenverse-core/components';
import { BlockPanelController } from 'gutenverse-core/controls';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';
import { CopyElementToolbar } from 'gutenverse-core/components';
import { renderIcon } from 'gutenverse-core/helper';

const SearchBlock = compose(
    withPartialRender,
    withMouseMoveEffect
)(props => {
    const {
        attributes,
        clientId
    } = props;
    const {
        closeIcon,
        closeIconType,
        closeIconSVG,
        showButton,
        inputPlaceholder,
        elementId,
    } = attributes;
    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const elementRef = useRef();
    const [inputValue, setInputValue] = useState('');
    const closeIconRef = useRef();
    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: elementRef
    });
    const innerBlockProps = useInnerBlocksProps(
        {className: classnames('guten-search-button-wrapper')},
        {
            template: [['gutenverse/button', {
                role: 'submit',
                buttonSize: 'xs',
                content: 'Search',
                buttonBackground: {
                    color: {
                        r: 4,
                        g: 4,
                        b: 4,
                        a: 1
                    },
                    type: 'default'
                },
                buttonWidth: {
                    Desktop: '100'
                }
            }]],
            allowedBlocks: ['gutenverse/button'],
            renderAppender: false,
            __experimentalAppenderTagName: 'div',
        }
    );

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);

    if (closeIconRef.current) {
        closeIconRef.current.style.visibility = inputValue !== '' ? 'visible' : 'hidden';
    }

    return <>
        <CopyElementToolbar {...props}/>
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
        <div  {...blockProps}>
            <div className="gutenverse-search-form">
                <div className={'search-input-container-outer'}>
                    <div className={'search-input-container'}>
                        <input type="text"
                            placeholder={inputPlaceholder}
                            name="s"
                            className={classnames(
                                'gutenverse-search',
                                'gutenverse-search-input',
                            )}
                            value={inputValue}
                            onChange={(event) => {
                                setInputValue(event.target.value);
                            }}
                        />
                        <div className="close-icon" ref={closeIconRef} onClick={() => setInputValue('')}>
                            {renderIcon(closeIcon, closeIconType, closeIconSVG)}
                        </div>
                    </div>
                </div>
                {
                    showButton && <div className="gutenverse-search-button" {...innerBlockProps} />
                }
            </div>
        </div>
    </>;
});

export default SearchBlock;