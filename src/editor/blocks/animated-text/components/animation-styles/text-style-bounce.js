const textStyleBounce = (props) => {
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
        scale: [0.3, 1.4, 0.7, 1],
        easing: 'easeOutQuad',
        duration: animationDuration,
        delay: (el, i) => 50 * i,
    });

    if (loop || (isRotationType && !stopRotating)) {
        animationRef.current.add({
            targets: targetRef.current,
            delay: displayDuration,
        });
        animationRef.current.add({
            targets: targetRef.current,
            scale: [1, 0.7, 1.4, 0.3],
            duration: transitionDuration,
            easing: 'easeInQuad',
            delay: (el, i) => 50 * i,
            complete: () => {
                if (isRotationType) {
                    nextRotationText();
                }
            }
        });
    }
};

export default textStyleBounce;
