const textStyleSwirl = (props) => {
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
        rotateX: [-90, 0],
        opacity: [0,1],
        delay: (el, i) => animationDuration * i,
    });

    if (loop || (isRotationType && !stopRotating())) {
        animation.add({
            targets: target,
            delay: displayDuration,
        });

        animation.add({
            targets: target,
            rotateX: [0, 90],
            opacity: [1, 0],
            delay: (el, i) => transitionDuration * i,
            complete: () => {
                if (isRotationType) {
                    nextRotationText();
                }
            }
        });
    }
};

export default textStyleSwirl;
