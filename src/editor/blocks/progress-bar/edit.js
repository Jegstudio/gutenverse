import { compose } from '@wordpress/compose';
import { useEffect } from '@wordpress/element';
import { withCustomStyle, withMouseMoveEffect, withPartialRender } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { PanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import anime from 'animejs';
import ProgressContent from './components/progress-content';
import { useRef } from '@wordpress/element';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { withAnimationAdvance } from 'gutenverse-core/hoc';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';

const ProgressBarBlock = compose(
    withPartialRender,
    withCustomStyle(panelList),
    withAnimationAdvance('progress-bar'),
    withCopyElementToolbar(),
    withMouseMoveEffect
)((props) => {
    const {
        attributes,
        setElementRef
    } = props;

    const {
        elementId,
        style,
        percentage,
        duration,
    } = attributes;

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const progressBarRef = useRef();

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-progress-bar',
            'no-margin',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: progressBarRef
    });

    const wrapperClass = classnames(
        'progress-group',
        {
            [`${style}`]: style && style !== 'default'
        }
    );

    useEffect(() => {
        if (progressBarRef.current) {
            setElementRef(progressBarRef.current);
        }
    }, [progressBarRef]);

    useEffect(() => {
        anime({
            targets: [...progressBarRef.current.getElementsByClassName('skill-track')],
            width: `${percentage}%`,
            easing: 'easeInOutQuart',
            duration,
        });

        anime({
            targets: [...progressBarRef.current.getElementsByClassName('number-percentage')],
            innerHTML: `${percentage}%`,
            easing: 'easeInOutQuart',
            round: 1,
            duration,
        });
    }, [attributes]);

    return <>
        <PanelController panelList={panelList} {...props} />
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