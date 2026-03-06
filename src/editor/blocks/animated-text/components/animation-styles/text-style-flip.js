const textStyleFlip = (props) => {
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
        rotateY: [-90, 0],
        opacity: [0,1],
        duration: animationDuration,
        delay: (el, i) => 45 * i
    });

    if (loop || (isRotationType && !stopRotating)) {
        animationRef.current.add({ //display
            targets: targetRef.current,
            delay: displayDuration
        });
        animationRef.current.add({
            targets: targetRef.current,
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