
import { compose } from '@wordpress/compose';
import { withCustomStyle } from 'gutenverse-core-editor/hoc';
import { panelList } from './panels/panel-list';
import {
    useInnerBlocksProps,
} from '@wordpress/block-editor';
import classnames from 'classnames';
import { useRef } from '@wordpress/element';
import { useEffect } from '@wordpress/element';

const Tab = compose(
    withCustomStyle(panelList)
)(props => {
    const {
        attributes,
        setElementRef
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

    useEffect(() => {
        if (tabRef.current) {
            setElementRef(tabRef.current);
        }
    }, [tabRef]);

    return <div className={classname} data-id={tabId} ref={tabRef}>
        <div {...innerBlocksProps}/>
    </div>;
});

export default Tab;
