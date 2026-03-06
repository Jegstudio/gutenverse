import { Default, u } from 'gutenverse-core-frontend';
import { AnimationStyle } from '../components/animated-text/animation-style';
import { HighlightStyle } from '../components/animated-text/highlight-style';
import { TypingStyle } from '../components/animated-text/typing-style';
class GutenverseAnimatedText extends Default {
    /* public */
    init() {
        this._elements.map(element => {
            this._loadAnimation(element);
        });
    }

    /* private */
    _loadAnimation(element) {
        const thisElement = u(element);
        const animationProps = JSON.parse(thisElement.data('animation'));

        if (animationProps.textType === 'highlighted') {
            const highlight = new HighlightStyle(thisElement, animationProps);
            highlight.run();
        } else {
            let animation = null;
            switch (animationProps.style) {
                case 'typing':
                    animation = new TypingStyle(thisElement, animationProps);
                    break;
                default:
                    animation = new AnimationStyle(thisElement, animationProps);
                    break;
            }
            animation.run();
        }
    }
}

const selected = u('.guten-animated-text');

if (selected) {
    new GutenverseAnimatedText(selected);
}