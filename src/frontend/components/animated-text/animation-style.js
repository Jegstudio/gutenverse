import listAnimationStyles from './animation-styles/list-animation-styles';
import { u } from 'gutenverse-core-frontend';
import anime from 'animejs';
export class AnimationStyle {
    constructor(element, animationProps) {
        this.element = element;
        this.loop = animationProps.loop;
        this.splitByWord = animationProps.splitByWord;
        this.textType = animationProps.textType;
        this.text = animationProps.text;
        this.rotationTexts = animationProps.rotationTexts;
        this.animationDuration = animationProps.animationDuration;
        this.displayDuration = animationProps.displayDuration;
        this.transitionDuration = animationProps.transitionDuration;
        this.rotationTextIndex = 0;
        this.animationStyle = listAnimationStyles[animationProps.style];
        this.animeInit = null;
        this.target = null;
        this.animationWrapper = null;
        this.targetWrapper = null;

        // Generate element fiirst time.
        this._generateElement();
        this._setTarget();
    }

    run() {
        if (this.animeInit) {
            this.animeInit.remove(this.target.nodes);
        }
        this.animeInit = anime.timeline({loop: this.loop});

        if (this.animationStyle) {
            this.animationStyle({
                loop: this.loop,
                animation: this.animeInit,
                target: this.target,
                animationDuration: this.animationDuration,
                displayDuration: this.displayDuration,
                transitionDuration: this.transitionDuration,
                isRotationType: this.textType == 'rotation',
                stopRotating: this._stopRotating,
                nextRotationText: this._nextRotationText,
            });
        }
    }

    _generateElement = () => {
        const textWrapper = u(this.element).find('.text-wrapper');
        textWrapper.html('');

        if (this.textType == 'rotation') {
            this.rotationTexts.forEach((element, key) => {
                const newDiv = u('<span>').addClass('rotation-text');
                this._addActiveRotationClass(newDiv, key);
                this._generateText(newDiv, element.rotationText);
                textWrapper.append(newDiv);
            });
            const activeText = u(this.element).find('.rotation-text.active').first();
            textWrapper.attr({
                style: `width: ${activeText.offsetWidth}px;`
            });

        } else {
            this._generateText(textWrapper, this.text);
        }
    }

    _setTarget = () => {
        if (this.textType === 'rotation') {
            this.target = [...u(this.element).find('.rotation-text.active').find('.letter').nodes];
        } else {
            this.target = [...u(this.element).find('.letter').nodes];
        }
    };

    _generateText = (wrapper, text) => {
        const div = document.createElement('div');
        div.textContent = text;
        const escapedText = div.innerHTML;
        
        wrapper.html(
            escapedText.replace(
                this.splitByWord ? /&[a-z0-9]+;|\b\w+\b/gi : /&[a-z0-9]+;|\S/gi,
                (match) => `<span class='letter'>${match}</span>`
            )
        );
    }

    _addActiveRotationClass = (element, key) => {
        if (this.rotationTextIndex === key) {
            u(element).addClass('active');
        }
    };

    _updateActiveElementRotation = () => {
        const rotationSpan = u(this.element).find('.rotation-text');

        rotationSpan.removeClass('active');
        rotationSpan.each((element, key) => {
            this._addActiveRotationClass(element, key);
        });
    };

    _updateRotationIndex = () => {
        if (this.rotationTextIndex + 1 >= this.rotationTexts.length) {
            this.rotationTextIndex = 0;
        } else {
            this.rotationTextIndex++;
        }
    };

    _stopRotating = () => {
        const isLastItem = (this.rotationTextIndex + 1) >= this.rotationTexts.length;
        return !this.loop && isLastItem;
    };

    _smoothAnimationWrapper = () => {
        if (this.animationWrapper != null) {
            this.animationWrapper.remove(this.targetWrapper);
        }

        const length = u(this.element).find('.rotation-text.active').first().offsetWidth;
        this.targetWrapper = u(this.element).find('.text-wrapper').nodes;

        this.animationWrapper = anime({
            targets: this.targetWrapper,
            width: length + 'px',
            duration: 300,
            easing: 'easeInOutQuad',
        });
    };

    _nextRotationText = () => { // recursive
        this.animeInit.remove(this.target);
        this._updateRotationIndex();
        this._updateActiveElementRotation();
        this._setTarget();
        this._smoothAnimationWrapper();
        this.run();
    }
}