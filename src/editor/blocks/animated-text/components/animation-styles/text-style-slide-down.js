const textStyleSlideDown = (props) => {
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
        translateY: [-40,0],
        translateZ: 0,
        opacity: [0,1],
        easing: 'easeOutExpo',
        duration: animationDuration,
    });

    if (loop || (isRotationType && !stopRotating)) {
        animationRef.current.add({ //display
            targets: targetRef.current,
            delay: displayDuration
        });
        animationRef.current.add({
            targets: targetRef.current,
            translateY: [0,40],
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

export default textStyleSlideDown;