import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { useRef } from '@wordpress/element';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import ServerSideRender from '@wordpress/server-side-render';
import { __ } from '@wordpress/i18n';
import { SelectParent } from 'gutenverse-core/components';
import { isOnEditor } from 'gutenverse-core/helper';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';
import { CopyElementToolbar } from 'gutenverse-core/components';
import { useSelect } from '@wordpress/data';

const SingleSocialShare = (props) => {
    const {
        attributes,
        serverPath,
        shareType,
        clientId
    } = props;

    const {
        elementId,
        showText,
        text,
        type,
        selectedIcon,
        additionalAIPrompt
    } = attributes;

    const elementRef = useRef();
    const hasText = showText !== false;
    const itemOrderClass = useSelect(select => {
        const { getBlockOrder, getBlockRootClientId } = select('core/block-editor');
        const parentClientId = getBlockRootClientId(clientId);
        const blockOrder = parentClientId ? getBlockOrder(parentClientId) : [];
        const blockIndex = blockOrder.indexOf(clientId);

        return blockIndex >= 0 ? `guten-social-share-item-order-${blockIndex + 1}` : '';
    }, [clientId]);

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-social-share-item-wrapper',
            elementId,
            selectedIcon,
            itemOrderClass
        ),
        ref: elementRef
    });

    return <>
        <CopyElementToolbar {...props}/>
        <InspectorControls>
            <SelectParent {...props}>
                {__('Modify Share Group', 'gutenverse')}
            </SelectParent>
        </InspectorControls>
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
        <div {...blockProps}>
            {isOnEditor() ? <ServerSideRender
                block={serverPath}
                attributes={{
                    elementId,
                    showText,
                    text,
                    type,
                    selectedIcon,
                    additionalAIPrompt
                }}
                EmptyResponsePlaceholder={EmptySocialShare}
            /> : <div className={`gutenverse-share-${shareType} gutenverse-share-item${hasText ? ' has-text' : ''}`} id={elementId}>
                <a href="#">
                    <div className="gutenverse-share-icon">
                        <i className={`fab fa-${shareType}`}></i>
                    </div>
                    {hasText ? <div className="gutenverse-share-text">{__('Share on', 'gutenverse')}{shareType}</div> : ''}
                </a>
            </div>}
        </div>
    </>;
};

const EmptySocialShare = () => {
    return <div className="gutenverse-share gutenverse-share-item">
        <a href="#" aria-label="#">
            <div className="gutenverse-share-icon">
                <i className="fas fa-share-alt-square"></i>
            </div><div className="gutenverse-share-text">{__('Loading Share Button...', 'gutenverse')}</div>
        </a>
    </div>;
};

export default SingleSocialShare;
