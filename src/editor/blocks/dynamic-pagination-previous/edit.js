import { __ } from '@wordpress/i18n';
import { useBlockProps, PlainText } from '@wordpress/block-editor';
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

const arrowMap = {
    none: '',
    arrow: '←',
    chevron: '«',
};

const Edit = compose(
    withPartialRender,
    withMouseMoveEffect
)((props) => {
    const { attributes, setAttributes, clientId, context } = props;
    const { elementId, label } = attributes;

    const paginationArrow = context['gutenverse/paginationArrow'];
    const showLabel = context['gutenverse/showLabel'];
    const displayArrow = arrowMap[paginationArrow];

    const elementRef = useRef();

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-dynamic-pagination-previous',
            elementId,
            animationClass,
            displayClass
        ),
        ref: elementRef
    });

    return (
        <>
            <CopyElementToolbar {...props} />
            <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
            <a
                href="#pagination-previous-pseudo-link"
                onClick={(event) => event.preventDefault()}
                {...blockProps}
            >
                {displayArrow && (
                    <span
                        className={`wp-block-gutenverse-dynamic-pagination-previous-arrow is-arrow-${paginationArrow}`}
                        aria-hidden
                    >
                        {displayArrow}
                    </span>
                )}
                {showLabel && (
                    <PlainText
                        __experimentalVersion={2}
                        tagName="span"
                        aria-label={__('Previous page link', 'gutenverse')}
                        placeholder={__('Previous Page', 'gutenverse')}
                        value={label}
                        onChange={(newLabel) =>
                            setAttributes({ label: newLabel })
                        }
                    />
                )}
            </a>
        </>
    );
});

export default Edit;
