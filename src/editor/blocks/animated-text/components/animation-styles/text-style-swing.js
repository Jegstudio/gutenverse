const textStyleSwing = (props) => {
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
        rotate: [
            { value: 15 },
            { value: -10 },
            { value: 5 },
            { value: -5 },
            { value: 0 },
        ],
        opacity: [0, 1],
        duration: animationDuration,
        easing: 'easeOutSine',
        delay: (el, i) => 50 * i,
    });

    if (loop || (isRotationType && !stopRotating)) {
        animationRef.current.add({
            targets: targetRef.current,
            delay: displayDuration
        });
        animationRef.current.add({
            targets: targetRef.current,
            rotate: [
                { value: 0 },
                { value: -5 },
                { value: 10 },
                { value: -15 },
                { value: 15 },
            ],
            opacity: 0,
            easing: 'easeInSine',
            duration: transitionDuration,
            delay: (el, i) => 50 * i,
            complete: () => {
                if (isRotationType) {
                    nextRotationText();
                }
            },
        });
    }
};

export default textStyleSwing;
