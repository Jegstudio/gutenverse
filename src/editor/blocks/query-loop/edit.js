import { compose } from '@wordpress/compose';
import { useBlockProps, useInnerBlocksProps, BlockContextProvider } from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';
import { withMouseMoveEffect, withPartialRender } from 'gutenverse-core/hoc';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import QueryLoopVariation from './components/query-loop-variation';
import { useAnimationEditor, useDisplayEditor } from 'gutenverse-core/hooks';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';
import { useRef, useMemo } from '@wordpress/element';
import { classnames } from 'gutenverse-core/components';
import { CopyElementToolbar } from 'gutenverse-core/components';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { useSelect, useDispatch } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

const QueryLoopBlock = compose(
    withPartialRender,
    withMouseMoveEffect
)((props) => {
    const { attributes, clientId } = props;
    const { replaceInnerBlocks } = useDispatch('core/block-editor');
    const {
        elementId,
        column,
        columnGap,
        rowGap,
        postType,
        numberPost,
        postOffset,
        sortBy,
        includePost,
        excludePost,
        includeCategory,
        includeTag,
        includeAuthor,
        taxonomies: selectedTaxonomies
    } = attributes;
    const { posts, isResolving, postTypes, taxonomies } = useSelect((select) => {
        const { getEntityRecords, isResolving: isEntityResolving } = select(coreStore);
        const { getPostTypes, getTaxonomies } = select('core');

        const currentPostType = postType?.value || postType || 'post';

        // Fetch taxonomy definitions to map slugs to rest_base
        const taxonomyDefinitions = getTaxonomies({ type: currentPostType, per_page: -1 });

        const args = {
            per_page: numberPost || 3,
            offset: postOffset || 0,
            _embed: true,
        };

        // Handle sorting
        switch (sortBy) {
            case 'oldest':
                args.order = 'asc';
                args.orderby = 'date';
                break;
            case 'alphabet_asc':
                args.order = 'asc';
                args.orderby = 'title';
                break;
            case 'alphabet_desc':
                args.order = 'desc';
                args.orderby = 'title';
                break;
            case 'latest':
            default:
                args.order = 'desc';
                args.orderby = 'date';
                break;
        }

        // Include specific posts
        if (includePost?.length > 0) {
            args.include = includePost.map(p => p.value || p);
        }

        // Exclude specific posts
        if (excludePost?.length > 0) {
            args.exclude = excludePost.map(p => p.value || p);
        }

        // Include categories
        if (includeCategory?.length > 0) {
            args.categories = includeCategory.map(c => c.value || c);
        }

        // Include tags
        if (includeTag?.length > 0) {
            args.tags = includeTag.map(t => t.value || t);
        }

        // Include authors
        if (includeAuthor?.length > 0) {
            args.author = includeAuthor.map(a => a.value || a);
        }

        // Custom Taxonomies
        if (selectedTaxonomies) {
            Object.keys(selectedTaxonomies).forEach(taxonomySlug => {
                const terms = selectedTaxonomies[taxonomySlug];
                if (terms && terms.length > 0) {
                    // Map slug to rest_base
                    let queryKey = taxonomySlug;
                    if (taxonomyDefinitions) {
                        const taxDef = taxonomyDefinitions.find(t => t.slug === taxonomySlug);
                        if (taxDef && taxDef.rest_base) {
                            queryKey = taxDef.rest_base;
                        }
                    }

                    args[queryKey] = terms.map(t => t.value || t);
                }
            });
        }

        const queryParams = ['postType', currentPostType, args];

        const postTypes = getPostTypes({ per_page: -1 });

        return {
            posts: getEntityRecords(...queryParams),
            isResolving: isEntityResolving('getEntityRecords', queryParams),
            postTypes,
            taxonomies: taxonomyDefinitions,
        };
    }, [postType, numberPost, postOffset, sortBy, includePost, excludePost, includeCategory, includeTag, includeAuthor, selectedTaxonomies]);

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const elementRef = useRef();
    const deviceType = getDeviceType();

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);

    const { getBlocks } = useSelect((select) => select('core/block-editor'), []);
    const hasInnerBlocks = getBlocks(clientId).length > 0;

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-query-loop',
            'no-margin',
            elementId,
            animationClass,
            displayClass,
            {
                'section-variation-picker': !hasInnerBlocks
            }
        ),
        ref: elementRef,
    });

    // Calculate grid styles for the container
    const gridStyle = useMemo(() => {
        const cols = column?.[deviceType] || column?.Desktop || 3;
        const colGap = columnGap?.[deviceType] || columnGap?.Desktop || { unit: 'px', point: 20 };
        const rGap = rowGap?.[deviceType] || rowGap?.Desktop || { unit: 'px', point: 20 };

        return {
            display: 'grid',
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            columnGap: `${colGap.point || 20}${colGap.unit || 'px'}`,
            rowGap: `${rGap.point || 20}${rGap.unit || 'px'}`,
        };
    }, [column, columnGap, rowGap, deviceType]);

    const innerBlocksProps = useInnerBlocksProps({
        className: 'guten-query-loop-container',
        style: gridStyle
    }, {
        template: [
            ['gutenverse/post-template']
        ],
        allowedBlocks: ['gutenverse/post-template'],
    });

    const handleVariation = (variationType) => {
        // Create inner blocks based on selection
        const titleBlock = createBlock('gutenverse/post-title');
        const imageBlock = createBlock('gutenverse/post-featured-image');
        const excerptBlock = createBlock('gutenverse/post-excerpt');

        let containerChildren = [];

        switch (variationType) {
            case 'title-image-excerpt':
                containerChildren = [titleBlock, imageBlock, excerptBlock];
                break;
            case 'title-image':
                containerChildren = [titleBlock, imageBlock];
                break;
            case 'title-excerpt':
                containerChildren = [titleBlock, excerptBlock];
                break;
            default:
                containerChildren = [titleBlock, imageBlock, excerptBlock];
                break;
        }

        // Create container with the selected children
        const containerBlock = createBlock('gutenverse/container', {}, containerChildren);

        // Create post template with container as child
        const postTemplateBlock = createBlock('gutenverse/post-template', {}, [containerBlock]);

        replaceInnerBlocks(clientId, [postTemplateBlock], true);
    };

    return (
        <BlockContextProvider value={{ 'gutenverse/queryPosts': posts, 'gutenverse/isResolving': isResolving }}>
            <CopyElementToolbar {...props} />
            <BlockPanelController panelList={panelList} props={{ ...props, taxonomies }} elementRef={elementRef} />
            <div {...blockProps}>
                {hasInnerBlocks ? (
                    <div {...innerBlocksProps} />
                ) : (
                    <QueryLoopVariation
                        onSelect={handleVariation}
                        wrapper="guten-container"
                    />
                )}
            </div>
        </BlockContextProvider>
    );
});

export default QueryLoopBlock;
