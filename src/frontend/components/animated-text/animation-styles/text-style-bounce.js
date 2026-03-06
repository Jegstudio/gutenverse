const textStyleBounce = (props) => {
    const {
        loop,
        animation,
        target,
        animationDuration,
        displayDuration,
        transitionDuration,
        isRotationType,
        stopRotating,
        nextRotationText,
    } = props;

    animation.add({
        targets: target,
        scale: [0.3, 1.4, 0.7, 1],
        easing: 'easeOutQuad',
        duration: animationDuration,
        delay: (el, i) => 50 * i,
    });

    if (loop || (isRotationType && !stopRotating())) {
        animation.add({
            targets: target,
            delay: displayDuration,
        });
        animation.add({
            targets: target,
            scale: [1, 0.7, 1.4, 0.3],
            duration: transitionDuration,
            easing: 'easeInQuad',
            delay: (el, i) => 50 * i,
            complete: () => {
                if (isRotationType) {
                    nextRotationText();
                }
            }
        });
    }
};

export default textStyleBounce;
