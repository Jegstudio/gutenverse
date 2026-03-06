const textStyleDrop = (props) => {
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
        scale: [0, 1],
        opacity: [0,1],
        duration: animationDuration,
        elasticity: 600,
        delay: (el, i) => 45 * (i+1)
    });

    if (loop || (isRotationType && !stopRotating)) {
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

export default textStyleDrop;