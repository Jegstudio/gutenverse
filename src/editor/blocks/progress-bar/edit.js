import { compose } from '@wordpress/compose';
import { useEffect } from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import anime from 'animejs';
import ProgressContent from './components/progress-content';
import { useRef } from '@wordpress/element';
import { withAnimationAdvanceV2, withMouseMoveEffect, withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { useAnimationEditor, useDisplayEditor } from 'gutenverse-core/hooks';
import { useDynamicScript, useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';
import { CopyElementToolbar } from 'gutenverse-core/components';

const ProgressBarBlock = compose(
    withPartialRender,
    withPassRef,
    withAnimationAdvanceV2('progress-bar'),
    withMouseMoveEffect
)((props) => {
    const {
        attributes,
        clientId,
        setBlockRef,
    } = props;

    const {
        elementId,
        style,
        percentage,
        duration,
    } = attributes;

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const elementRef = useRef();

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-progress-bar',
            'no-margin',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: elementRef
    });

    const wrapperClass = classnames(
        'progress-group',
        {
            [`${style}`]: style && style !== 'default'
        }
    );

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);
    useDynamicScript(elementRef);

    useEffect(() => {
        const skillTrack = anime({
            targets: [...elementRef.current.getElementsByClassName('skill-track')],
            width: `${percentage}%`,
            easing: 'easeInOutQuart',
            duration,
        });

        const numPercentage = anime({
            targets: [...elementRef.current.getElementsByClassName('number-percentage')],
            innerHTML: `${percentage}%`,
            easing: 'easeInOutQuart',
            round: 1,
            duration,
        });

        return () => {
            skillTrack.remove();
            numPercentage.remove();
        };
    }, [percentage, duration, style]);

    useEffect(() => {
        if (elementRef) {
            setBlockRef(elementRef);
        }
    }, [elementRef]);

    return <>
        <CopyElementToolbar {...props}/>
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
        <div  {...blockProps}>
            <div className={wrapperClass}>
                <div className="progress-skill-bar">
                    <ProgressContent {...props} />
                </div>
            </div>
        </div>
    </>;
});

export default ProgressBarBlock;