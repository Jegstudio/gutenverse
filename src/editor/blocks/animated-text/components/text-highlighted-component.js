import listHighlightStyles from './highlighted-styles/list-highlighted-styles';
import { useEffect, useRef, useState } from '@wordpress/element';
import anime from 'animejs';

const TextHighlightedComponent = (props) => {
    const {
        elementId,
        animatedTextRef,
        text,
        loop,
        highlightedStyle,
        textType,
        animationDuration,
        displayDuration,
        highlightGradient,
        highlightColorType,
        highlightColor,
        transitionDuration,
    } = props;

    const [svgElement, setSvgElement] = useState(null);
    const targets = useRef(null);
    const animation = useRef(null);

    const generateGradientColor = () => {
        if (!highlightGradient) return null;
        return highlightGradient.map((element, index) => (
            <stop
                key={index}
                offset={element.offset}
                style={{
                    stopColor: element.color,
                    stopOpacity: element.opacity || 1
                }}
            />
        ));
    };

    const renderStroke = () => {
        let gradientSvg = null;
        let gradientStroke = '';

        if (highlightColorType === 'gradient') {
            gradientSvg = (
                <linearGradient
                    x1="0"
                    y1="0"
                    x2="100%"
                    y2="100%"
                    id={`${elementId}-highlight-gradient`}
                >
                    {generateGradientColor()}
                </linearGradient>
            );
            gradientStroke = `url(#${elementId}-highlight-gradient)`;
        }

        const svgProps = {
            xmlns: 'http://www.w3.org/2000/svg',
            viewBox: '0 0 500 150',
            preserveAspectRatio: 'none',
        };

        const commonPathProps = {
            className: `style-${highlightColorType}`,
            stroke: gradientStroke || undefined,
        };

        const generated = listHighlightStyles[highlightedStyle]({svgProps, gradientSvg, commonPathProps});
        setSvgElement(generated);
    };

    const addAnimation = () => {
        const paths = [...animatedTextRef.current.getElementsByTagName('path')];
        for (let index = 0; index < paths.length; index++) {
            const length = paths[index].getTotalLength();

            paths[index].setAttribute('stroke-dasharray', length);
            paths[index].setAttribute('stroke-dashoffset', length);
        }
        targets.current = paths;

        animation.current = anime.timeline({loop}).add({
            targets: targets.current,
            strokeDashoffset: el => [el.getTotalLength(), 0],
            opacity: [0, 1],
            easing: 'easeInOutSine',
            duration: animationDuration,
        });

        if (loop) {
            animation.current.add({
                targets: targets.current,
                opacity: [1, 0],
                delay: displayDuration,
                duration: transitionDuration,
                easing: 'easeInOutSine',
            });
        }
    };

    useEffect(() => {
        if (listHighlightStyles[highlightedStyle]) {
            renderStroke();
        }
    }, [
        text,
        highlightedStyle,
        textType,
        highlightColorType,
        highlightGradient,
        highlightColor,
    ]);

    useEffect(() => {
        if (!svgElement || !animatedTextRef?.current) return;

        addAnimation();

        return () => {
            if (animation.current) {
                animation.current.remove(targets.current);
            }
        };

    }, [svgElement, loop, animationDuration, displayDuration, transitionDuration]);

    return (
        <span className="text-content">
            <span className="text-wrapper">
                <span className="letter">{text}</span>
            </span>
            <span className="highlighted" key={highlightedStyle}>{svgElement}</span>
        </span>
    );
};

export default TextHighlightedComponent;
