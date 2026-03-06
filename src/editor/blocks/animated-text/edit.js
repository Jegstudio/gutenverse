import { compose } from '@wordpress/compose';
import { useRef } from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { withMouseMoveEffect, withPartialRender } from 'gutenverse-core/hoc';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';
import { CopyElementToolbar } from 'gutenverse-core/components';
import TextAnimatedComponent from './components/text-animated-component';
import TextHighlightedComponent from './components/text-highlighted-component';
import TextTypingComponent from './components/complex-animation-components/text-typing-compnent';

const AnimatedTextBlock = compose(
    withPartialRender,
    withMouseMoveEffect
)((props) => {
    const {
        attributes,
        clientId
    } = props;

    const {
        elementId,
        style,
        titleTag: TitleTag,
        beforeTextAnimated,
        afterTextAnimated,
        textType,
    } = attributes;

    const elementRef = useRef(null);
    const displayClass = useDisplayEditor(attributes);
    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-animated-text',
            'no-margin',
            elementId,
            displayClass,
            {
                [`style-${style}`]: style && style !== 'none'
            },
        ),
        ref: elementRef
    });

    const animationProps = {
        ...attributes,
        animatedTextRef : elementRef,
        animationDuration: parseInt(attributes.animationDuration),
        displayDuration: parseInt(attributes.displayDuration),
        transitionDuration: parseInt(attributes.transitionDuration),
    };

    const loadAnimatedComponent = () => {
        if (textType == 'highlighted') {
            return <TextHighlightedComponent {...animationProps} />;
        }

        if (style === 'typing') {
            return <TextTypingComponent {...animationProps} />;
        }

        return <TextAnimatedComponent {...animationProps}/>;
    };

    return <>
        <CopyElementToolbar {...props}/>
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef}/>
        <div  {...blockProps}>
            <TitleTag>
                <span className={'non-animated-text before-text'}>{beforeTextAnimated}</span>
                {loadAnimatedComponent()}
                <span className={'non-animated-text after-text'}>{afterTextAnimated}</span>
            </TitleTag>
        </div>
    </>;
});

export default AnimatedTextBlock;