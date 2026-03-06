import { Default, u } from 'gutenverse-core-frontend';
import anime from 'animejs';
class GutenverseProgressBar extends Default {
    /* public */
    init() {
        this._elements.map(element => {
            this._addAnimations(element);
        });
    }

    playOnScreen(element, animations) {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    animations.forEach((animation) => animation.play());
                } else {
                    animations.forEach((animation) => {
                        animation.pause();
                        animation.seek(0);
                    });
                }
            },
            { threshold: [0.5] }
        );

        observer.observe(element);
    }

    /* private */
    _addAnimations(element) {
        const blockElement = u(element);
        const numberLoaded = blockElement.find('.number-percentage');
        const skillTrack = blockElement.find('.skill-track');
        const percentage = skillTrack.data('width');
        const duration = skillTrack.data('duration');

        const barAnimation = anime({
            targets: skillTrack.first(),
            width: `${percentage}%`,
            easing: 'easeInOutQuart',
            duration,
            autoplay: false
        });

        const percentAnimation = anime({
            targets: numberLoaded.first(),
            innerHTML: `${percentage}%`,
            easing: 'easeInOutQuart',
            round: 1,
            duration,
            autoplay: false
        });

        this.playOnScreen(element, [barAnimation, percentAnimation]);
    }
}

const selected = u('.guten-progress-bar');

if (selected) {
    new GutenverseProgressBar(selected);
}
