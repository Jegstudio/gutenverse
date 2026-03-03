import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { BlockPanelController } from 'gutenverse-core/controls';
import { useAnimationEditor, useDisplayEditor } from 'gutenverse-core/hooks';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import { useRef } from '@wordpress/element';
import { CopyElementToolbar } from 'gutenverse-core/components';
import { withMouseMoveEffect, withPartialRender } from 'gutenverse-core/hoc';
import { compose } from '@wordpress/compose';
import classnames from 'classnames';

import { panelList } from './panels/panel-list';
import getBlockStyle from './styles/block-style';

const createPaginationItem = (content, Tag = 'a', extraClass = '') => (
    <Tag key={content} className={`page-numbers ${extraClass}`}>
        {content}
    </Tag>
);

const previewPaginationNumbers = (midSize) => {
    const paginationItems = [];

    // First set of pagination items.
    for (let i = 1; i <= midSize; i++) {
        paginationItems.push(createPaginationItem(i));
    }

    // Current pagination item.
    paginationItems.push(createPaginationItem(midSize + 1, 'span', 'current'));

    // Second set of pagination items.
    for (let i = 1; i <= midSize; i++) {
        paginationItems.push(createPaginationItem(midSize + 1 + i));
    }

    // Dots.
    paginationItems.push(createPaginationItem('...', 'span', 'dots'));

    // Last pagination item.
    paginationItems.push(createPaginationItem(midSize * 2 + 3));

    return <>{paginationItems}</>;
};

const Edit = compose(
    withPartialRender,
    withMouseMoveEffect
)((props) => {
    const { attributes, clientId } = props;
    const { elementId, midSize } = attributes;

    const elementRef = useRef();

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-dynamic-pagination-numbers',
            elementId,
            animationClass,
            displayClass
        ),
        ref: elementRef
    });

    console.log('--previewPaginationNumbers--');

    const paginationNumbers = previewPaginationNumbers(parseInt(midSize, 10));

    return (
        <>
            <CopyElementToolbar {...props} />
            <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
            <div {...blockProps}>{paginationNumbers}</div>
        </>
    );
});

export default Edit;
