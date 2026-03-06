const textStyleRising = (props) => {
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
        translateY: [100,0],
        translateZ: 0,
        opacity: [0,1],
        easing: 'easeOutExpo',
        duration: animationDuration,
        delay: (el, i) => 300 + 30 * i
    });

    if (loop || (isRotationType && !stopRotating())) {
        animation.add({ //display
            targets: target,
            delay: displayDuration
        });
        animation.add({
            targets: target,
            translateY: [0,-100],
            opacity: [1,0],
            easing: 'easeInExpo',
            duration: transitionDuration,
            delay: (el, i) => 100 + 30 * i,
            complete: () => {
                if (isRotationType) {
                    nextRotationText();
                }
            },
        });
    }
};

export default textStyleRising;