import anime from 'animejs';
import { useEffect, useState } from '@wordpress/element';
import { u } from 'gutenverse-core/components';

const TextStyleRising = (props) => {
    const {
        text,
        titleTag: TitleTag,
        loop,
        animatedTextRef,
        splitByWord,
        style
    } = props;

    const [animation, setAnimation] = useState();

    const animeInit = () => {
        const textWrapper = u(animatedTextRef.current).find('.text-content');
        textWrapper.html(textWrapper.text().replace(splitByWord ? /\b\w+\b/g : /\S/g, (word) => `<span class='letter'>${word}</span>`));

        const animeInit = anime.timeline({loop})
            .add({
                targets: [...animatedTextRef.current.getElementsByClassName('letter')],
                translateY: [100,0],
                translateZ: 0,
                opacity: [0,1],
                easing: 'easeOutExpo',
                duration: 1400,
                delay: (el, i) => 300 + 30 * i
            });

        loop && animeInit.add({
            targets: [...animatedTextRef.current.getElementsByClassName('letter')],
            translateY: [0,-100],
            opacity: [1,0],
            easing: 'easeInExpo',
            duration: 1200,
            delay: (el, i) => 100 + 30 * i
        });

        setAnimation(animeInit);
    };

    useEffect(() => {
        animeInit();
        return () => {
            if (animation) {
                animation.remove();
                setAnimation(null);
            }
        };
    }, [loop, splitByWord, style]);

    return <TitleTag className="text-content">{text}</TitleTag>;
};

export default TextStyleRising;