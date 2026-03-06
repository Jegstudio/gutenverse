const textStyleWave = (props) => {
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
        scale: [0.3, 1],
        opacity: [0, 1],
        translateZ: 0,
        delay: (el, i) => animationDuration * i
    });

    if (loop || (isRotationType && !stopRotating)) {
        animationRef.current.add({ //display
            targets: targetRef.current,
            delay: displayDuration
        });
        animationRef.current.add({
            targets: targetRef.current,
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