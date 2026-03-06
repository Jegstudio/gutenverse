import { useEffect, useRef } from '@wordpress/element';
import Typed from 'typed.js';

const TextTypingComponent = (props) => {
    const {
        text = '',
        loop,
        textType,
        animationDuration,
        displayDuration,
        transitionDuration,
        rotationTexts,
    } = props;

    const typedRef = useRef(null);         // Tempat instance Typed
    const letterRef = useRef(null);        // Target <span class="letter" />

    useEffect(() => {
        const strings = (textType === 'rotation' && rotationTexts.length > 0)
            ? rotationTexts.map(item => item.rotationText)
            : [text];

        // Hapus instance lama kalau ada
        if (typedRef.current) {
            typedRef.current.destroy();
        }

        // Inisialisasi Typed.js ke dalam elemen <span class="letter" />
        typedRef.current = new Typed(letterRef.current, {
            strings,
            typeSpeed: animationDuration,
            backSpeed: transitionDuration,
            backDelay: displayDuration,
            loop,
            showCursor: true,
            smartBackspace: true,
        });

        return () => {
            typedRef.current?.destroy();
        };
    }, [
        text,
        rotationTexts,
        textType,
        loop,
        animationDuration,
        transitionDuration,
        displayDuration,
    ]);

    return (
        <span className="text-content">
            <span className="text-wrapper">
                <span className="letter" ref={letterRef} />
            </span>
        </span>
    );
};

export default TextTypingComponent;
