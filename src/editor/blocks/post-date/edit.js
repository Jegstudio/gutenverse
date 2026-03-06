import { compose } from '@wordpress/compose';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { getDate } from 'gutenverse-core/editor-helper';
import { isEmpty } from 'gutenverse-core/helper';
import { useRef } from '@wordpress/element';
import { withPartialRender } from 'gutenverse-core/hoc';
import { useEntityProp } from '@wordpress/core-data';
import { __ } from '@wordpress/i18n';
import { PanelTutorial } from 'gutenverse-core/controls';
import { getSettings } from '@wordpress/date';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';
import { CopyElementToolbar } from 'gutenverse-core/components';

const PostDateBlock = compose(
    withPartialRender
)((props) => {
    const {
        attributes,
        context: { postId, postType },
        clientId
    } = props;

    const {
        elementId,
        dateFormat,
        dateType,
        customFormat,
        linkTo,
        customURL,
        htmlTag: HtmlTag,
    } = attributes;

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const elementRef = useRef();

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-post-date',
            'no-margin',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: elementRef
    });

    const [defaultDateFormat] = useEntityProp(
        'root',
        'site',
        'date_format'
    );

    const [publishDate] = useEntityProp(
        'postType',
        postType,
        'date',
        postId
    );

    const [modifyDate] = useEntityProp(
        'postType',
        postType,
        'modified',
        postId
    );

    const getDateContent = (date) => {
        if ((!isEmpty(linkTo) && !['none', 'custom'].includes(linkTo)) || (linkTo === 'custom' && !isEmpty(customURL))) {
            return <a href="#link-disabled-in-editor" onClick={e => e.preventDefault()}>{date}</a>;
        }

        return date;
    };

    const getDateResult = () => {
        let format = null;

        switch (dateFormat) {
            case 'custom':
                customFormat && (format = customFormat);
                break;
            case 'F j, Y':
            case 'Y-m-d':
            case 'm/d/Y':
            case 'd/m/Y':
            case 'F j, Y g:i A':
            case 'm/d/Y g:i A':
                format = dateFormat;
                break;
            case 'ago':
                format = 'ago';
                break;
            case 'default':
            default:
                format = defaultDateFormat ? defaultDateFormat : getSettings()?.formats.date;
                break;
        }

        switch (dateType) {
            case 'both':
                const publish = getDate(format, publishDate);
                const modify = getDate(format, modifyDate);
                return publish === modify ? getDateContent(getDate(format, publishDate)) : getDateContent(`${getDate(format, publishDate)} - Updated on ${getDate(format, modifyDate)}`);
            case 'modified':
                return getDateContent(getDate(format, modifyDate));
            default:
                return getDateContent(getDate(format, publishDate));
        }
    };

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);

    return <>
        <CopyElementToolbar {...props}/>
        <InspectorControls>
            <PanelTutorial
                title={__('How Post Date works?', 'gutenverse')}
                list={[
                    {
                        title: __('Inside Page Editor, Query Loop Block, and on Frontend', 'gutenverse'),
                        description: __('Date data will be fetched automatically based on the current post/loop.', 'gutenverse')
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
            <HtmlTag>{getDateResult()}</HtmlTag>
        </div>
    </>;
});

export default PostDateBlock;