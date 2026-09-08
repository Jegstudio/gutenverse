
import { compose } from '@wordpress/compose';
import { withMouseMoveEffect, withPartialRender } from 'gutenverse-core/hoc';
import {
    useInnerBlocksProps,
    useBlockProps
} from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { panelList } from './panels/panel-list';
import { BlockPanelController } from 'gutenverse-core/controls';
import { useRef } from '@wordpress/element';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';
import { CopyElementToolbar } from 'gutenverse-core/components';

const SocialShare = compose(
    withPartialRender,
    withMouseMoveEffect
)(props => {
    const {
        attributes,
        clientId
    } = props;

    const {
        elementId,
        orientation = 'horizontal',
        layoutMode = 'default',
        buttonLayout = 'split',
        shape,
        color,
        showText,
    } = attributes;

    const elementRef = useRef();
    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-social-share',
            'no-margin',
            elementId,
            shape,
            orientation,
            {
                'stretch-layout': layoutMode === 'stretch',
                'button-layout-solid': buttonLayout === 'solid',
            },
            color,
            animationClass,
            displayClass,
            {
                'show-text': showText,
            }),
        ref: elementRef
    });

    const innerBlocksProps = useInnerBlocksProps(blockProps, {
        template: [
            ['gutenverse/social-share-facebook']
        ],
        allowedBlocks: [
            'gutenverse/social-share-facebook',
            'gutenverse/social-share-twitter',
            'gutenverse/social-share-pinterest',
            'gutenverse/social-share-stumbleupon',
            'gutenverse/social-share-linkedin',
            'gutenverse/social-share-reddit',
            'gutenverse/social-share-tumblr',
            'gutenverse/social-share-vk',
            'gutenverse/social-share-whatsapp',
            'gutenverse/social-share-telegram',
            'gutenverse/social-share-wechat',
            'gutenverse/social-share-line',
            'gutenverse/social-share-email',
        ],
        orientation,
        __experimentalAppenderTagName: 'div',
    });

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);

    return <>
        <CopyElementToolbar {...props}/>
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
        <div {...innerBlocksProps} />
    </>;
});

export default SocialShare;
