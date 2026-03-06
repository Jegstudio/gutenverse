const textStyleFade = (props) => {
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
        opacity: [0, 1],
        easing: 'easeInOutQuad',
        duration: animationDuration,
        delay: (el, i) => 70 * i,
    });

    if (loop || (isRotationType && !stopRotating())) {
        animation.add({ //display
            targets: target,
            delay: displayDuration
        });
        animation.add({
            targets: target,
            opacity: [1, 0],
            easing: 'easeOutInQuad',
            duration: transitionDuration,
            delay: (el, i) => 70 * i,
            complete: () => {
                if (isRotationType) {
                    nextRotationText();
                }
            },
        });
    }
};

export default textStyleFade;