import listHighlightStyles from './highlight-styles/list-highlighted-styles';
import anime from 'animejs';
export class HighlightStyle {
    constructor(element, animationProps) {
        this.element = element;
        this.elementId = animationProps.elementId;
        this.loop = animationProps.loop;
        this.text = animationProps.text;
        this.animationDuration = animationProps.animationDuration;
        this.displayDuration = animationProps.displayDuration;
        this.transitionDuration = animationProps.transitionDuration;
        this.highlightStyle = listHighlightStyles[animationProps.style];
        this.highlightedStyle = animationProps.highlightedStyle;
        this.highlightGradient = animationProps.highlightGradient;
        this.highlightColorType = animationProps.highlightColorType;
        this.highlightColor = animationProps.highlightColor;
        this.animeInit = null;
        this.target = null;
        this.svgElement = null;
    }

    run() {
        this.__generateStroke();
        this.__inputSvgToElement();
        this.__addAnimation();
    }

    // Private
    __inputSvgToElement() {
        const highlight = this.element.find('.highlighted');
        highlight.append(this.svgElement);
    }

    __generateStroke() {
        let gradientSvg = null;
        let gradientStroke = '';

        if (this.highlightColorType === 'gradient') {
            gradientSvg = `
                <linearGradient
                    x1="0"
                    y1="0"
                    x2="100%"
                    y2="100%"
                    id="${this.elementId}-highlight-gradient"
                >
                    ${this.__generateGradient()}
                </linearGradient>
            `;
            gradientStroke = `url(#${this.elementId}-highlight-gradient)`;
        }

        const svgProps = `
            xmlns="http://www.w3.org/2000/svg",
            viewBox="0 0 500 150",
            preserveAspectRatio="none",
        `;

        const commonPathProps = `
            class="style-${this.highlightColorType}",
            stroke="${gradientStroke || undefined}",
        `;

        this.svgElement = listHighlightStyles[this.highlightedStyle]({svgProps, gradientSvg, commonPathProps});
    }

    __addAnimation() {
        const paths = this.element.find('path').nodes;
        for (let index = 0; index < paths.length; index++) {
            const length = paths[index].getTotalLength();

            paths[index].setAttribute('stroke-dasharray', length);
            paths[index].setAttribute('stroke-dashoffset', length);
        }
        this.target = paths;

        this.animeInit = anime.timeline({loop: this.loop}).add({
            targets: this.target,
            strokeDashoffset: el => [el.getTotalLength(), 0],
            opacity: [0, 1],
            easing: 'easeInOutSine',
            duration: this.animationDuration,
        });

        if (this.loop) {
            this.animeInit.add({
                targets: this.target,
                opacity: [1, 0],
                delay: this.displayDuration,
                duration: this.transitionDuration,
                easing: 'easeInOutSine',
            });
        }
    }

    __generateGradient() {
        if (!this.highlightGradient) return null;
        return this.highlightGradient.map((element, index) => (
            `<stop
                key="${index}"
                offset="${element.offset}"
                style="
                    stop-color:${element.color};
                    stop-opacity:${element.opacity || 1};
                "
            />`
        ));
    }
}