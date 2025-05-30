
import { useInnerBlocksProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { useRef } from '@wordpress/element';

const Tab = props => {
    const {
        attributes,
    } = props;

    const {
        active,
        tabId
    } = attributes;

    const tabRef = useRef();

    const tabClass = classnames('gutenverse-tab-item', {
        active: active
    });

    const innerBlocksProps = useInnerBlocksProps({
        className: tabClass
    }, {
        template: [['core/paragraph']]
    });

    const classname = classnames(
        `tab-${tabId}`,
        'tab-body-item'
    );

    return <div className={classname} data-id={tabId} ref={tabRef}>
        <div {...innerBlocksProps}/>
    </div>;
};

export default Tab;
