const textStyleRubberBand = (props) => {
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
        scaleX: [
            { value: 1.25},
            { value: 0.75},
            { value: 1.15},
            { value: 0.95},
            { value: 1.05},
            { value: 1.0},
        ],
        scaleY: [
            { value: 0.75},
            { value: 1.25},
            { value: 0.85},
            { value: 1.05},
            { value: 0.95},
            { value: 1.0},
        ],
        opacity: [0, 1],
        duration: animationDuration,
        easing: 'easeOutQuad',
        delay: (el, i) => 50 * i,
    });

    if (loop || (isRotationType && !stopRotating())) {
        animation.add({ // display
            targets: target,
            delay: displayDuration
        });

        animation.add({
            targets: target,
            scaleX: [
                { value: 1.05},
                { value: 0.95},
                { value: 1.15},
                { value: 0.75},
                { value: 1.25},
                { value: 1.0},
            ],
            scaleY: [
                { value: 0.95},
                { value: 1.05},
                { value: 0.85},
                { value: 1.25},
                { value: 0.75},
                { value: 1.0},
            ],
            opacity: [1, 0],
            easing: 'easeInQuad',
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

export default textStyleRubberBand;
