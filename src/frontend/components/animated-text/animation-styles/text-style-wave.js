const textStyleWave = (props) => {
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
        scale: [0.3, 1],
        opacity: [0, 1],
        translateZ: 0,
        delay: (el, i) => animationDuration * i
    });

    if (loop || (isRotationType && !stopRotating())) {
        animation.add({ //display
            targets: target,
            delay: displayDuration
        });
        animation.add({
            targets: target,
            scale: [1, 0.3],
            opacity: [1, 0],
            translateZ: 0,
            delay: (el, i) => transitionDuration * i,
            complete: () => {
                if (isRotationType) {
                    nextRotationText();
                }
            },
        });
    }
};

export default textStyleWave;