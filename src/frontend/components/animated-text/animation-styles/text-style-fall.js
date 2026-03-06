const textStyleFall = (props) => {
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
        translateY: [-100,0],
        easing: 'easeOutExpo',
        duration: animationDuration,
        opacity: [0,1],
        delay: (el, i) => 30 * i
    });

    if (loop || (isRotationType && !stopRotating())) {
        animation.add({ //display
            targets: target,
            delay: displayDuration
        });
        animation.add({
            targets: target,
            translateY: [0,100],
            easing: 'easeInExpo',
            duration: transitionDuration,
            opacity: [1,0],
            delay: (el, i) => 30 * i,
            complete: () => {
                if (isRotationType) {
                    nextRotationText();
                }
            },
        });
    }
};

export default textStyleFall;