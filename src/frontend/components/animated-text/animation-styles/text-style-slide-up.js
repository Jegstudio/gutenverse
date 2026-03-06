const textStyleSlideUp = (props) => {
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
        translateY: [40,0],
        translateZ: 0,
        opacity: [0,1],
        easing: 'easeOutExpo',
        duration: animationDuration,
    });

    if (loop || (isRotationType && !stopRotating())) {
        animation.add({ //display
            targets: target,
            delay: displayDuration
        });
        animation.add({
            targets: target,
            translateY: [0,-40],
            opacity: [1,0],
            easing: 'easeInExpo',
            duration: transitionDuration,
            complete: () => {
                if (isRotationType) {
                    nextRotationText();
                }
            }
        });
    }
};

export default textStyleSlideUp;