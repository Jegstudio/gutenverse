import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { useRef, useEffect } from '@wordpress/element';
import { PanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import ServerSideRender from '@wordpress/server-side-render';
import { __ } from '@wordpress/i18n';
import { SelectParent } from 'gutenverse-core/components';
import { isOnEditor } from 'gutenverse-core/helper';

const SingleSocialShare = (props) => {
    const {
        attributes,
        serverPath,
        setElementRef,
        shareType
    } = props;

    const {
        elementId,
        showText,
        text,
        type,
        selectedIcon
    } = attributes;

    const socialShareItemRef = useRef();

    const blockProps = useBlockProps({
        className: classnames(
            'guten-social-share-item-wrapper',
            selectedIcon
        ),
        ref: socialShareItemRef
    });

    useEffect(() => {
        if (socialShareItemRef.current) {
            setElementRef(socialShareItemRef.current);
        }
    }, [socialShareItemRef]);

    return <>
        <InspectorControls>
            <SelectParent {...props}>
                {__('Modify Share Group', 'gutenverse')}
            </SelectParent>
        </InspectorControls>
        <PanelController panelList={panelList} {...props} />
        <div {...blockProps}>
            {isOnEditor() ? <ServerSideRender
                block={serverPath}
                attributes={{
                    elementId,
                    showText,
                    text,
                    type,
                    selectedIcon
                }}
                EmptyResponsePlaceholder={EmptySocialShare}
            /> : <div className={`gutenverse-share-${shareType} gutenverse-share-item`} id={elementId}>
                <a href="#">
                    <div className="gutenverse-share-icon">
                        <i className={`fab fa-${shareType}`}></i>
                    </div>
                    {showText ? <div className="gutenverse-share-text">{__('Share on', 'gutenverse')}{shareType}</div> : ''}
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