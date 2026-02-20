// ... imports
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
import { useRef, useState, createPortal } from '@wordpress/element';
import { classnames, LibraryModal } from 'gutenverse-core/components';
import { CopyElementToolbar } from 'gutenverse-core/components';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { fetchLibraryData } from 'gutenverse-core/requests';
import { IconBlocksSVG } from 'gutenverse-core/icons';
import { useSelect, useDispatch, dispatch } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { Placeholder, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';
import { Loader } from 'react-feather';

const QueryLoopBlock = compose(
    withPartialRender,
    withMouseMoveEffect
)((props) => {
    const { attributes, clientId, name } = props;
    const { replaceInnerBlocks, replaceBlocks } = useDispatch('core/block-editor');
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

    // State for Placeholder
    const [ isStartingBlank, setIsStartingBlank ] = useState( false );
    const [ isPatternSelectionModalOpen, setIsPatternSelectionModalOpen ] = useState( false );
    const [ libraryLoading, setLibraryLoading ] = useState( true );
    const [ libraryError, setLibraryError ] = useState( false );

    const { posts, isResolving, taxonomies } = useSelect((select) => {
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
            taxonomies: taxonomyDefinitions,
        };
    }, [postType, numberPost, postOffset, sortBy, includePost, excludePost, includeCategory, includeTag, includeAuthor, selectedTaxonomies, name]);

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

    const innerBlocksProps = useInnerBlocksProps(blockProps, {
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

    const openLibrary = async () => {
        setIsPatternSelectionModalOpen(true);
        setLibraryLoading(true);

        const dev = 'true' == '--dev_mode--';
        const result = await fetchLibraryData(dev);

        // Filter section-data for query-loop category
        const queryLoopCategorySlug = 'query-loop';
        const filteredSectionData = (result['section-data'] || []).filter(section =>
            section.categories && section.categories.some(cat => cat.slug === queryLoopCategorySlug)
        );

        // Filter section-categories for query-loop category
        const filteredSectionCategories = (result['section-categories'] || []).filter(cat =>
            cat.slug === queryLoopCategorySlug
        );

        dispatch('gutenverse/library').initialLibraryData({
            'layoutData': result['layout-data'],
            'layoutCategories': result['layout-categories'],
            'themeData': result['theme-data'],
            'themeCategories': result['theme-categories'],
            'sectionData': filteredSectionData,
            'sectionCategories': filteredSectionCategories,
            'pluginEcosystem': result['plugin-ecosystem'],
        });

        const { plugins } = window['GutenverseConfig'] || {};

        dispatch('gutenverse/library').initialPluginData({
            'installedPlugin': plugins,
        });

        const emptyLicense = applyFilters('gutenverse.panel.tab.pro.content', true);
        const companionActive = plugins['gutenverse-companion']?.active;

        dispatch('gutenverse/library').initialModalData({
            'libraryData': {
                attributes: {emptyLicense, companionActive},
                active: 'section',
                tabs: [
                    {
                        id: 'section',
                        icon: <IconBlocksSVG />,
                        label: __('Sections', 'gutenverse'),
                    },
                ],
            },
            'layoutContentData': {
                categories: [],
                license: '',
                keyword: '',
                author: '',
                paging: 1,
                library: 'section',
            },
        });

        setLibraryLoading(false);
    };

    const handleSectionSelect = (blocks) => {
        console.log('--handle section select--');
        replaceBlocks(clientId, blocks);
        setIsPatternSelectionModalOpen(false);
    };


    return (
        <BlockContextProvider value={{ 'gutenverse/queryPosts': posts, 'gutenverse/isResolving': isResolving }}>
            <CopyElementToolbar {...props} />
            <BlockPanelController panelList={panelList} props={{ ...props, taxonomies }} elementRef={elementRef} />
            {hasInnerBlocks ? (
                <div {...innerBlocksProps} />
            ) : (
                <div {...blockProps}>
                    { isPatternSelectionModalOpen && (
                        <>
                            {createPortal(
                                <LibraryModal
                                    open={isPatternSelectionModalOpen}
                                    setOpen={setIsPatternSelectionModalOpen}
                                    visible={true}
                                    setVisibility={setIsPatternSelectionModalOpen}
                                    loading={libraryLoading}
                                    setLoading={setLibraryLoading}
                                    setLibraryError={setLibraryError}
                                    onSectionSelect={handleSectionSelect}
                                />,
                                document.getElementById('gutenverse-root') || document.body
                            )}
                            {libraryError !== false && createPortal(libraryError, document.body)}
                        </>
                    ) }

                    { isStartingBlank ? (
                        <QueryLoopVariation
                            onSelect={handleVariation}
                            wrapper="guten-container"
                        />
                    ) : (
                        <Placeholder
                            className="block-editor-media-placeholder"
                            icon="layout"
                            label={ __( 'Query Loop', 'gutenverse' ) }
                            instructions={ __( 'Choose a pattern for the query loop or start blank.', 'gutenverse' ) }
                        >
                            <Button
                                __next40pxDefaultSize
                                variant="primary"
                                onClick={ openLibrary }
                            >
                                { libraryLoading && isPatternSelectionModalOpen ? (
                                    <div style={{ marginRight: '10px' }}>
                                        <div className="rotating" style={{ display: 'flex' }}>
                                            <Loader size={20} />
                                        </div>
                                    </div>
                                ) : null }
                                { libraryLoading && isPatternSelectionModalOpen
                                    ? __( 'Updating ...', 'gutenverse' )
                                    : __( 'Choose', 'gutenverse' ) }
                            </Button>

                            <Button
                                __next40pxDefaultSize
                                variant="secondary"
                                onClick={ () => {
                                    setIsStartingBlank( true );
                                } }
                            >
                                { __( 'Start blank', 'gutenverse' ) }
                            </Button>
                        </Placeholder>
                    )}
                </div>
            )}
        </BlockContextProvider>
    );
});

export default QueryLoopBlock;
