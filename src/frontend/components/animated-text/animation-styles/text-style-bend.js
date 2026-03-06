const textStyleBend = (props) => {
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
        translateY: ['1.1em', 0],
        translateX: ['0.55em', 0],
        translateZ: 0,
        rotateZ: [180, 0],
        duration: animationDuration,
        opacity: [0,1],
        easing: 'easeOutExpo',
        delay: (el, i) => 50 * i
    });

    if (loop || (isRotationType && !stopRotating())) {
        animation.add({
            targets: target,
            opacity: 0,
            duration: transitionDuration,
            easing: 'easeOutExpo',
            delay: displayDuration,
            complete: () => {
                if (isRotationType) {
                    nextRotationText();
                }
            },
        });
    }
};

export default textStyleBend;