import { compose } from '@wordpress/compose';
import { useRef } from '@wordpress/element';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { BlockPanelController, PanelTutorial } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { withPartialRender } from 'gutenverse-core/hoc';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';
import { CopyElementToolbar } from 'gutenverse-core/components';
import { __ } from '@wordpress/i18n';

const BreadcrumbBlock = compose(
    withPartialRender,
)((props) => {
    const {
        attributes,
        clientId
    } = props;

    const {
        elementId,
        separatorIcon,
    } = attributes;

    const elementRef = useRef(null);
    const displayClass = useDisplayEditor(attributes);
    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-breadcrumb',
            'no-margin',
            elementId,
            displayClass,
        ),
        ref: elementRef
    });

    const breadcrumbs = [
        { name: 'Home', url: '' },
        { name: 'Category', url: '' },
        { name: 'Child Category', url: '' },
        { name: 'Post', url: '' },
    ];

    return <>
        <CopyElementToolbar {...props} />
        <InspectorControls>
            <PanelTutorial
                title={__('How Breadcrumb Works?', 'gutenverse')}
                list={[
                    {
                        title: __('In Frontend', 'gutenverse'),
                        description: __('This block won’t appear on the "Front Page" type.', 'gutenverse'),
                    },
                    {
                        title: __('Inside Post Editor, Page Editor, Query Loop Block, and on the Frontend', 'gutenverse'),
                        description: __('Breadcrumb data such as category, parent, or date hierarchy will be fetched automatically based on the current post or loop.', 'gutenverse')
                    },
                    {
                        title: __('Inside Site Editor', 'gutenverse'),
                        description: __('Placeholder data will be displayed instead.', 'gutenverse')
                    },
                ]}

            />
        </InspectorControls>
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
        <div {...blockProps}>
            <nav className="breadcrumb-nav" aria-label="Breadcrumb">
                <ul itemScope itemType="https://schema.org/BreadcrumbList">
                    {breadcrumbs.map((item, index) => {
                        const notLast = (index < breadcrumbs.length - 1);
                        return <>
                            {notLast ?
                                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                                    <a itemProp="item" href={`${item.url}`} onClick={e => e.preventDefault()}>
                                        <span itemProp="name" className="breadcrumb-link">{`${item.name}`}</span>
                                    </a>
                                </li> :
                                <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                                    <span itemProp="item">
                                        <span itemProp="name" className="breadcrumb-text">{`${item.name}`}</span>
                                    </span>
                                </li>
                            }
                            {
                                notLast && <li className="separator">
                                    <i className={separatorIcon}></i>
                                </li>
                            }
                        </>;
                    })}
                </ul>
            </nav>
        </div>
    </>;
});

export default BreadcrumbBlock;