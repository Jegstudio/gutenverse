import { compose } from '@wordpress/compose';
import { withCustomStyle, withMouseMoveEffect, withAnimationAdvance, withCopyElementToolbar, withPartialRender } from 'gutenverse-core/hoc';
import {
    useInnerBlocksProps, useBlockProps,
} from '@wordpress/block-editor';
import { classnames, PostListSkeleton } from 'gutenverse-core/components';
import { PanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useEffect, useState, useRef, RawHTML } from '@wordpress/element';
import { useDisplayEditor, useAnimationEditor } from 'gutenverse-core/hooks';
import { dummyText, isOnEditor } from 'gutenverse-core/helper';
import { addQueryArgs } from '@wordpress/url';
import apiFetch from '@wordpress/api-fetch';

const IconListBlock = compose(
    withCustomStyle(panelList),
    withCopyElementToolbar(),
    withMouseMoveEffect,
    withPartialRender,
)((props) => {
    const {
        attributes,
        setElementRef,
        refreshStyle
    } = props;

    const {
        elementId,
        includedCategory,
        sortBy,
        qty,
        icon,
        sortType,
        hideEmpty,
        showIcon,
        layout,
        taxonomyType,
        showDivider
    } = attributes;
    const taxonomyListRef = useRef();
    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);

    const [loading, setLoading] = useState(true);
    const [response, setResponse] = useState(null);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-taxonomy-list',
            'no-margin',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: taxonomyListRef
    });

    useEffect(() => {
        if (taxonomyListRef.current) {
            setElementRef && setElementRef(taxonomyListRef.current);
        }
    }, [taxonomyListRef]);

    useEffect(() => {
        if ( isOnEditor() ) {
            setLoading(true);
            elementId && apiFetch({
                path: addQueryArgs('/wp/v2/block-renderer/gutenverse/taxonomy-list', {
                    context: 'edit',
                    attributes: {
                        elementId,
                        sortBy,
                        sortType,
                        includedCategory,
                        qty,
                        icon,
                        hideEmpty,
                        showIcon,
                        taxonomyType
                    }
                }),
            }).then((data) => {
                setResponse(data.rendered);
            }).catch(() => {
                setResponse('<span>Error</span>');
            }).finally(() => setLoading(false));
        }else{
            setResponse(`<div class="taxonomy-list-wrapper">
                    <div class="taxonomy-list-item">
						<a href="#">
							<span class="icon-list"><i aria-hidden="true" class="${icon}"></i></span>
							<div class="taxonomy-list-content">${dummyText(5, 10)}</div>
						</a>
					</div>
                    <div class="taxonomy-list-item">
						<a href="#">
							<span class="icon-list"><i aria-hidden="true" class="${icon}"></i></span>
							<div class="taxonomy-list-content">${dummyText(5, 10)}</div>
						</a>
					</div>
                    <div class="taxonomy-list-item">
						<a href="#">
							<span class="icon-list"><i aria-hidden="true" class="${icon}"></i></span>
							<div class="taxonomy-list-content">${dummyText(5, 10)}</div>
						</a>
					</div>
                </div>
            `);
            setLoading(false);
        }
    }, [
        elementId,
        sortBy,
        sortType,
        includedCategory,
        qty,
        icon,
        hideEmpty,
        showIcon,
        taxonomyType
    ]);

    useEffect(() => {
        refreshStyle()
    },[layout, showDivider])

    return <>
        <PanelController panelList={panelList} {...props} />
        <div  {...blockProps}>
            {!loading ? <RawHTML key="html" className="guten-raw-wrapper">
                {response}
            </RawHTML> : <PostListSkeleton />}
        </div>
    </>;
});

export default IconListBlock;