import { compose } from '@wordpress/compose';
import { useEffect } from '@wordpress/element';
import { withCustomStyle, withPartialRender } from 'gutenverse-core/hoc';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { PanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useEntityProp } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import { useRef } from '@wordpress/element';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { PanelTutorial } from 'gutenverse-core/controls';
import { __ } from '@wordpress/i18n';

const ArchiveTitleBlock = compose(
    withPartialRender,
    withCustomStyle(panelList),
    withCopyElementToolbar()
)((props) => {
    const {
        attributes,
        setElementRef,
        context: { archiveId, archiveType }
    } = props;
    const {
        elementId,
        archiveLink,
        archiveLinkTarget,
        archiveLinkRel = 'noreferrer',
        htmlTag: HtmlTag,
    } = attributes;

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const archiveTitleRef = useRef();
    const linkTarget = archiveLinkTarget ? '_blank' : '_self';

    const archiveTitles = useSelect((select) => {
        const term = select('core').getEntityRecord('taxonomy', archiveType, archiveId);
        return term ? term.name : 'Archive Title';
    }, []);

    const [ archiveTitle = archiveTitles ] = useEntityProp('postType', archiveType, 'title', archiveId);

    const [ link ] = useEntityProp( 'postType', archiveType, 'link', archiveId );
    useEffect(() => {
        archiveTitleRef.current && setElementRef(archiveTitleRef.current);
    }, [archiveTitleRef]);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-archive-title',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: archiveTitleRef
    });
    return <>
        <InspectorControls>
            <PanelTutorial
                title={__('How Archive Title works?', 'gutenverse')}
                list={[
                    {
                        title: __('Inside Page Editor, Query Loop Block, and on Frontend', 'gutenverse'),
                        description: __('Title data will be fetched automatically based on the current archive/loop.', 'gutenverse')
                    },
                    {
                        title: __('Inside Site Editor', 'gutenverse'),
                        description: __('It will load placeholder data.', 'gutenverse')
                    },
                ]}
            />
        </InspectorControls>
        <PanelController panelList={panelList} {...props} />
        <div  {...blockProps}>
            <HtmlTag>{archiveLink ? <a href={link} target={linkTarget} rel={archiveLinkRel} onClick={e => e.preventDefault()}>{archiveTitle}</a> : archiveTitle}</HtmlTag>
        </div>
    </>;
});

export default ArchiveTitleBlock;