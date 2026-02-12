import { compose } from '@wordpress/compose';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useEntityProp } from '@wordpress/core-data';
import { useMemo } from '@wordpress/element';
import { useRef } from '@wordpress/element';
import { withPartialRender } from 'gutenverse-core/hoc';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { __ } from '@wordpress/i18n';
import { PanelTutorial } from 'gutenverse-core/controls';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';
import { CopyElementToolbar } from 'gutenverse-core/components';

const PostExcerptBlock = compose(
    withPartialRender
)((props) => {
    const {
        attributes,
        clientId,
        context: { postId, postType }
    } = props;

    const {
        elementId,
        htmlTag: HtmlTag,
        showReadmore,
        readmoreText,
    } = attributes;

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const elementRef = useRef();

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-post-excerpt',
            'no-margin',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: elementRef
    });

    const [rawExcerpt] = useEntityProp('postType', postType, 'excerpt', postId);

    // Handle both object format { rendered, protected } and plain string
    const renderedExcerpt = typeof rawExcerpt === 'object' && rawExcerpt?.rendered
        ? rawExcerpt.rendered
        : (typeof rawExcerpt === 'string' ? rawExcerpt : '');
    const isProtected = typeof rawExcerpt === 'object' ? rawExcerpt?.protected : false;

    /**
     * When excerpt is editable, strip the html tags from
     * rendered excerpt. This will be used if the entity's
     * excerpt has been produced from the content.
     */
    const strippedRenderedExcerpt = useMemo(() => {

        if (!renderedExcerpt) return '';
        const document = new window.DOMParser().parseFromString(
            renderedExcerpt,
            'text/html'
        );
        return document.body.textContent || document.body.innerText || '';
    }, [renderedExcerpt]);

    const excerptClassName = classnames('wp-block-post-excerpt__excerpt', {
        'is-inline': !false,
    });

    const excerptContent = () => {
        if (!postType || !postId) {
            return <>
                <p>
                    {__('This is the Post Excerpt block, it will display the excerpt from single posts.')}
                </p>
                <p>
                    {__('If there are any Custom Post Types with support for excerpts, the Post Excerpt block can display the excerpts of those entries as well.')}
                </p>
            </>;
        }

        if (isProtected) {
            return <>
                <div>
                    {__(
                        'There is no excerpt because this is a protected post.'
                    )}
                </div>
            </>;
        }

        return <HtmlTag className={excerptClassName}>
            {strippedRenderedExcerpt || __('No post excerpt found')}
            {showReadmore && <a href="#link-disabled-in-editor" onClick={e => e.preventDefault()}>{readmoreText}</a>}
        </HtmlTag>;
    };

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);

    return <>
        <CopyElementToolbar {...props} />
        <InspectorControls>
            <PanelTutorial
                title={__('How Post Excerpt works?', 'gutenverse')}
                list={[
                    {
                        title: __('Inside Page Editor, Query Loop Block, and on Frontend', 'gutenverse'),
                        description: __('Excerpt data will be fetched automatically based on the current post/loop.', 'gutenverse')
                    },
                    {
                        title: __('Inside Site Editor', 'gutenverse'),
                        description: __('It will load placeholder data.', 'gutenverse')
                    },
                ]}
            />
        </InspectorControls>
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
        <div {...blockProps}>
            {excerptContent()}
        </div>
    </>;
});

export default PostExcerptBlock;