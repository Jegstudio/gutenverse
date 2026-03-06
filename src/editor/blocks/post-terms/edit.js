import { compose } from '@wordpress/compose';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useEntityProp, store as coreStore } from '@wordpress/core-data';
import { useRef } from '@wordpress/element';
import { withPartialRender } from 'gutenverse-core/hoc';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { PanelTutorial } from 'gutenverse-core/controls';
import { isEmpty } from 'gutenverse-core/helper';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';
import { CopyElementToolbar } from 'gutenverse-core/components';

const PostTermsBlock = compose(
    withPartialRender
)((props) => {
    const {
        attributes,
        clientId,
        context: { postId, postType }
    } = props;

    const {
        elementId,
        taxonomy = 'category',
        separator = ',',
        linkTo,
        contentType,
        inlineDisplay,
        htmlTag: HtmlTag,
    } = attributes;

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const elementRef = useRef();

    let type = taxonomy === 'post_tag' ? 'tags' : 'categories';

    const [termIds = []] = useEntityProp('postType', postType, type, postId);

    const terms = useSelect(
        (select) => {
            const { getEntityRecords } = select(coreStore);

            const data = getEntityRecords(
                'taxonomy',
                taxonomy,
                {
                    include: termIds,
                    context: 'view',
                }
            );

            return data ? data : [];
        },
        [taxonomy]
    );

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-post-terms',
            'no-margin',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: elementRef
    });

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);


    const contentHTML = () => {
        switch (contentType) {
            case 'block':
                if (!isEmpty(terms)) {
                    return <div className={`post-term-block ${inlineDisplay ? 'inline-display' : ''}`}>
                        {
                            terms.map((term) => {
                                const name = term?.name;
                                return linkTo && linkTo !== 'none' ? <a href="#" onClick={e => e.preventDefault()} className="term-item"><HtmlTag >{name}</HtmlTag></a> : <HtmlTag className="term-item">{name}</HtmlTag>;
                            })
                        }
                    </div>;
                } else {
                    return <div className="post-term-block">
                        {
                            linkTo && linkTo !== 'none' ? <a href="#" className="term-item" onClick={e => e.preventDefault()}><HtmlTag >{'Post Terms'}</HtmlTag></a> : <HtmlTag className="term-item">{'Post Terms'}</HtmlTag>
                        }
                    </div>;
                }
            case 'string':
            default:
                return <span>
                    {!isEmpty(terms) ? terms.map((term, index) => {
                        const name = term?.name;
                        const after = index < terms.length - 1 ? separator : '';

                        return linkTo && linkTo !== 'none' ? <><HtmlTag className="term-list"><a href="#" onClick={e => e.preventDefault()}>{name}</a></HtmlTag>{after}</> : <><HtmlTag className="term-list">{name}</HtmlTag>{after}</>;
                    }) : linkTo && linkTo !== 'none' ? <a href="#" onClick={e => e.preventDefault()}>{'Post Terms'}</a> : <span className="term-item">Post Terms</span>}
                </span>;
        }
    };

    return <>
        <CopyElementToolbar {...props} />
        <InspectorControls>
            <PanelTutorial
                title={__('How Post Terms works?', 'gutenverse')}
                list={[
                    {
                        title: __('Inside Post Editor, Query Loop Block, and on Frontend', 'gutenverse'),
                        description: __('Terms data will be fetched automatically based on the current post/loop.', 'gutenverse')
                    },
                    {
                        title: __('Inside Site Editor', 'gutenverse'),
                        description: __('It will load placeholder data.', 'gutenverse')
                    },
                ]}
            />
        </InspectorControls>
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
        <div  {...blockProps}>
            {contentHTML()}
        </div>
    </>;
});

export default PostTermsBlock;