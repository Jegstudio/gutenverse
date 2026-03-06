import Circle from './style-circle';
import Cross from './style-cross';
import Curly from './style-curly';
import Diagonal from './style-diagonal';
import Double from './style-double';
import DoubleUnderline from './style-double-underline';
import Strikethrough from './style-strikethrough';
import Underline from './style-underline';
import UnderlineZigzag from './style-underline-zigzag';

const listHighlightStyles = {
    'circle': (props) => Circle(props),
    'x': (props) => Cross(props),
    'curly': (props) => Curly(props),
    'diagonal': (props) => Diagonal(props),
    'double-underline': (props) => DoubleUnderline(props),
    'double': (props) => Double(props),
    'strikethrough': (props) => Strikethrough(props),
    'underline-zigzag': (props) => UnderlineZigzag(props),
    'underline': (props) => Underline(props),
};

export default listHighlightStyles;