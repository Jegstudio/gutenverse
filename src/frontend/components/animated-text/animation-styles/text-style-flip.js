const textStyleFlip = (props) => {
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
        rotateY: [-90, 0],
        opacity: [0,1],
        duration: animationDuration,
        delay: (el, i) => 45 * i
    });

    if (loop || (isRotationType && !stopRotating())) {
        animation.add({ //display
            targets: target,
            delay: displayDuration
        });
        animation.add({
            targets: target,
            rotateY: [0,90],
            opacity: [1,0],
            duration: transitionDuration,
            easing: 'easeOutExpo',
            delay: (el, i) => 45 * i,
            complete: () => {
                if (isRotationType) {
                    nextRotationText();
                }
            },
        });
    }
};

export default textStyleFlip;