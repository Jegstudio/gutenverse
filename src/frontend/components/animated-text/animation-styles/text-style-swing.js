const textStyleSwing = (props) => {
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
        rotate: [
            { value: 15 },
            { value: -10 },
            { value: 5 },
            { value: -5 },
            { value: 0 },
        ],
        opacity: [0, 1],
        duration: animationDuration,
        easing: 'easeOutSine',
        delay: (el, i) => 50 * i,
    });

    if (loop || (isRotationType && !stopRotating())) {
        animation.add({
            targets: target,
            delay: displayDuration
        });
        animation.add({
            targets: target,
            rotate: [
                { value: 0 },
                { value: -5 },
                { value: 10 },
                { value: -15 },
                { value: 15 },
            ],
            opacity: 0,
            easing: 'easeInSine',
            duration: transitionDuration,
            delay: (el, i) => 50 * i,
            complete: () => {
                if (isRotationType) {
                    nextRotationText();
                }
            },
        });
    }
};

export default textStyleSwing;
