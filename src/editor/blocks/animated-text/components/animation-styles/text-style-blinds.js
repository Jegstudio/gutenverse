const textStyleBlinds = (props) => {
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
        delay: (el, i) => animationDuration * i
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
            easing: 'easeOutExpo',
            delay: (el, i) => transitionDuration * i,
            complete: () => {
                if (isRotationType) {
                    nextRotationText();
                }
            },
        });
    }
};

export default textStyleBlinds;