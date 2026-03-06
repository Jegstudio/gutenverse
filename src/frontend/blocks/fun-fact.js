import { Default, u } from 'gutenverse-core-frontend';
import anime from 'animejs';
class GutenverseFunFact extends Default {
    /* public */
    init() {
        this._elements.map(element => {
            this._addAnimation(element);
        });
    }

    /* private */
    _addAnimation(element) {
        const targetElement = u(element).find('.number');
        const number = targetElement.data('number');
        const safeNumber = targetElement.data('safe');
        const duration = targetElement.data('duration');
        const numberFormat = targetElement.data('number-format');
        const numberRightSpace = targetElement.data('number-spaces');

        let formatter = null;
        let used = number ? number : safeNumber;

        if (safeNumber) {
            const formatComma = safeNumber.replaceAll( ',', '.' );
            const isValidNumber = /^-?\d+(\.\d+)?$/.test(formatComma);
            if (!isValidNumber) {
                targetElement.first().textContent = 'Invalid number';
                return;
            }
            if(numberFormat === 'comma') {
                formatter = new Intl.NumberFormat('en-US', {
                    maximumFractionDigits: 0
                });
            }else if(numberFormat === 'point') {
                formatter = new Intl.NumberFormat('id-ID', {
                    maximumFractionDigits: 0
                });
            }
            used = Math.round(parseFloat(formatComma));
        }
        if (!numberRightSpace) {
            used = `${used} `;
        }
        const numberAnimation = anime({
            targets: targetElement.first(),
            innerHTML: used,
            easing: 'easeInOutQuart',
            round: 1,
            duration,
            autoplay: false,
            update: (formatter && safeNumber) ? function(anim) {
                const val = parseInt(anim.animations[0].currentValue);
                targetElement.first().innerHTML = !isNaN(val) ? formatter.format( val ) : anim.animations[0].currentValue;
            } : null
        });

        this.playOnScreen(element, [numberAnimation]);
    }
}

const selected = u('.guten-fun-fact');

if (selected) {
    new GutenverseFunFact(selected);
}