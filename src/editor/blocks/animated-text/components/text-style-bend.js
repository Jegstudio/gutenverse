const textStyleBend = (props) => {
    const {
        loop,
        animationRef,
        targetRef,
        animationDuration,
        displayDuration,
        transitionDuration,
        isRotationType,
        stopRotating,
        nextRotationText,
    } = props;

    animationRef.current.add({
        targets: targetRef.current,
        translateY: ['1.1em', 0],
        translateX: ['0.55em', 0],
        translateZ: 0,
        rotateZ: [180, 0],
        duration: animationDuration,
        opacity: [0,1],
        easing: 'easeOutExpo',
        delay: (el, i) => 50 * i
    });

    if (loop || isRotationType) {
        if (isRotationType && stopRotating()) {
            return;
        }
        animationRef.current.add({
            targets: targetRef.current,
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