import textStyleBend from './text-style-bend';
import textStyleBlinds from './text-style-blinds';
import textStyleBounce from './text-style-bounce';
import textStyleDrop from './text-style-drop';
import textStyleFade from './text-style-fade';
import textStyleFall from './text-style-fall';
import textStyleFlip from './text-style-flip';
import textStyleJump from './text-style-jump';
import textStylePop from './text-style-pop';
import textStyleRising from './text-style-rising';
import textStyleRubberBand from './text-style-rubber-band';
import textStyleSlideDown from './text-style-slide-down';
import textStyleSlideLeft from './text-style-slide-left';
import textStyleSlideRight from './text-style-slide-right';
import textStyleSlideUp from './text-style-slide-up';
import textStyleSwing from './text-style-swing';
import textStyleSwirl from './text-style-swirl';
import textStyleWave from './text-style-wave';
import textStyleZoom from './text-style-zoom';

const listAnimationStyles = {
    'bend': (animationProps) => textStyleBend(animationProps),
    'blinds': (animationProps) => textStyleBlinds(animationProps),
    'bounce': (animationProps) => textStyleBounce(animationProps),
    // clip.
    'drop': (animationProps) => textStyleDrop(animationProps),
    'fade': (animationProps) => textStyleFade(animationProps),
    'fall': (animationProps) => textStyleFall(animationProps),
    'flip': (animationProps) => textStyleFlip(animationProps),
    'jump': (animationProps) => textStyleJump(animationProps),
    'pop': (animationProps) => textStylePop(animationProps),
    'rising': (animationProps) => textStyleRising(animationProps),
    'rubber-band': (animationProps) => textStyleRubberBand(animationProps),
    'slide-down': (animationProps) => textStyleSlideDown(animationProps),
    'slide-left': (animationProps) => textStyleSlideLeft(animationProps),
    'slide-right': (animationProps) => textStyleSlideRight(animationProps),
    'slide-up': (animationProps) => textStyleSlideUp(animationProps),
    // typing
    'swing': (animationProps) => textStyleSwing(animationProps),
    'swirl': (animationProps) => textStyleSwirl(animationProps),
    'wave': (animationProps) => textStyleWave(animationProps),
    'zoom': (animationProps) => textStyleZoom(animationProps),
};

export default listAnimationStyles;