import Typed from 'typed.js';
import { u } from 'gutenverse-core-frontend';

export class TypingStyle {
    constructor(element, animationProps) {
        this.element = element;
        this.id = `${animationProps.elementId}-letter`;
        this.loop = animationProps.loop;
        this.splitByWord = animationProps.splitByWord;
        this.textType = animationProps.textType;
        this.text = animationProps.text;
        this.rotationTexts = animationProps.rotationTexts;
        this.animationDuration = animationProps.animationDuration;
        this.displayDuration = animationProps.displayDuration;
        this.transitionDuration = animationProps.transitionDuration;

        // Generate element first time.
        this._generateElement();
    }

    run() {
        const strings = (this.textType === 'rotation' && this.rotationTexts.length > 0)
            ? this.rotationTexts.map(item => item.rotationText)
            : [this.text];
        new Typed(`#${this.id}`, {
            strings,
            typeSpeed: this.animationDuration,
            backSpeed: this.transitionDuration,
            backDelay: this.displayDuration,
            loop: this.loop,
            showCursor: true,
            smartBackspace: true,
            contentType: 'text',
        });
    }

    _generateElement = () => {
        const letter = u(this.element).find('.text-wrapper').find('.letter');
        letter.html('');
        letter.attr('id', this.id);
    }
}