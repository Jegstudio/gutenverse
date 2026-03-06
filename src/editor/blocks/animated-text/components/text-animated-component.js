import anime from 'animejs';
import { useEffect, useRef } from '@wordpress/element';
import { u } from 'gutenverse-core/components';
import listAnimationStyles from './animation-styles/list-animation-styles';


const TextAnimatedComponent = (props) => {
    const {
        text = '',
        loop,
        animatedTextRef,
        splitByWord,
        style,
        textType,
        animationDuration,
        displayDuration,
        transitionDuration,
        rotationTexts,
    } = props;

    const animation = useRef(null);
    const targets = useRef(null);
    const animationWrapper = useRef(null);
    const targetWrapper = useRef(null);
    const rotationTextIndex = useRef(0);
    const animationStyle = listAnimationStyles[style];

    const updateRotationIndex = () => {
        if (rotationTextIndex.current + 1 >= rotationTexts.length) {
            rotationTextIndex.current = 0;
        } else {
            rotationTextIndex.current++;
        }
    };

    const stopRotating = () => {
        const isLastItem = (rotationTextIndex.current + 1) >= rotationTexts.length;
        return !loop && isLastItem;
    };

    const generateText = (wrapper, text) => {
        wrapper.text(text);
        wrapper.html(
            wrapper.text().replace(
                splitByWord ? /\b\w+\b/g : /\S/g,
                (word) => `<span class='letter'>${word}</span>`
            )
        );
    };

    const addActiveRotationClass = (element, key) => {
        if (rotationTextIndex.current === key) {
            u(element).addClass('active');
        }
    };

    const setTarget = () => {
        if (textType === 'rotation') {
            targets.current = [...u(animatedTextRef.current).find('.rotation-text.active').find('.letter').nodes];
        } else {
            targets.current = [...u(animatedTextRef.current).find('.letter').nodes];
        }
    };

    const updateActiveElementRotation = () => {
        const rotationSpan = u(animatedTextRef.current).find('.rotation-text');

        rotationSpan.removeClass('active');
        rotationSpan.each((element, key) => {
            addActiveRotationClass(element, key);
        });
    };

    const generateElement = () => {
        const textWrapper = u(animatedTextRef.current).find('.text-wrapper');
        textWrapper.html('');

        if (textType == 'rotation') {
            rotationTexts.forEach((element, key) => {
                const newDiv = u('<span>').addClass('rotation-text');
                addActiveRotationClass(newDiv, key);
                generateText(newDiv, element.rotationText);
                textWrapper.append(newDiv);
            });
            const activeText = u(animatedTextRef.current).find('.rotation-text.active').first();
            textWrapper.attr({
                style: `width: ${activeText.offsetWidth}px;`
            });

        } else {
            generateText(textWrapper, text);
            textWrapper.attr({
                style: '',
            });
        }
    };

    const nextRotationText = () => {
        animation.current.remove(targets.current);
        updateRotationIndex();
        updateActiveElementRotation();
        setTarget();
        smoothAnimationWrapper();
        textAnimation();
    };

    // see this function if you want to track the flow
    const textAnimation = () => {
        animation.current = anime.timeline({loop});
        const animationProps = {
            ...props,
            animationRef: animation,
            targetRef: targets,
            isRotationType: textType == 'rotation' && rotationTexts.length != 0,
            stopRotating: stopRotating(),
            nextRotationText,
        };
        animationStyle(animationProps);
    };

    const smoothAnimationWrapper = () => {
        if (animationWrapper.current != null) {
            animationWrapper.current.remove(targetWrapper.current);
        }

        const length = u(animatedTextRef.current).find('.rotation-text.active').first().offsetWidth;
        targetWrapper.current = u(animatedTextRef.current).find('.text-wrapper').nodes;

        animationWrapper.current = anime({
            targets: targetWrapper.current,
            width: length + 'px',
            duration: 300,
            easing: 'easeInOutQuad',
        });
    };

    useEffect(() => {
        rotationTextIndex.current = 0;

        generateElement();
        setTarget();
        if (animationStyle) {
            textAnimation();
        }

        return () => {
            if (animation.current) {
                animation.current.remove(targets.current);
            }
        };
    }, [
        loop,
        splitByWord,
        style,
        textType,
        animationDuration,
        displayDuration,
        transitionDuration,
        text,
        rotationTexts,
    ]);

    return <>
        <span className="text-content">
            <span className="text-wrapper">
                <span className="letter"/>
            </span>
        </span>
    </>;
};

export default TextAnimatedComponent;