
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { compose } from '@wordpress/compose';
import { withAnimationAdvanceScript, withMouseMoveEffectScript } from 'gutenverse-core/hoc';
import * as divider from './data/divider-style';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';
import { useAnimationAdvanceData } from 'gutenverse-core/hooks';
import { renderIcon } from 'gutenverse-core/helper';

const DividerOnly = (props) => {
    const { dividerClass, dividerStyle } = props;

    return <div className={'guten-divider-wrapper'} style={dividerStyle}>
        <div {...dividerClass}></div>
    </div>;
};

const DividerContent = (props) => {
    const { attributes, dividerClass, dividerStyle } = props;
    const { contentAlign, content, text, icon, iconType, iconSVG } = attributes;

    const renderContent = () => {
        switch (content) {
            case 'text':
                return <span><RichText.Content value={text} /></span>;
            case 'icon':
                return renderIcon(icon,iconType,iconSVG);
            default:
                return null;
        }
    };

    return <div className={'guten-divider-wrapper'} style={dividerStyle}>
        {contentAlign !== 'left' && <div {...dividerClass}></div>}
        <span className={'guten-divider-content'}>{renderContent()}</span>
        {contentAlign !== 'right' && <div {...dividerClass}></div>}
    </div>;
};

const save = compose(
    withAnimationAdvanceScript('divider'),
    withMouseMoveEffectScript
)((props) => {
    const {
        attributes,
    } = props;

    const {
        elementId,
        content,
        type,
    } = attributes;

    const advanceAnimationData = useAnimationAdvanceData(attributes);
    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);

    const dividerStyle = divider[`divider_${type}`] && {
        ['--divider-pattern-url']: divider[`divider_${type}`]
    };

    const isRegular = ['default', 'double', 'dotted', 'dashed'].includes(type);

    const isTribal = ['fir', 'halfrounds', 'leaves', 'stripes', 'squares', 'trees', 'tribal', 'x'].includes(type);

    const blockProps = useBlockProps.save({
        ...advanceAnimationData,
        className: classnames(
            'guten-element',
            'guten-divider',
            elementId,
            animationClass,
            displayClass,
            {
                ['guten-divider-tribal']: type && isTribal,
            },
        )
    });

    const dividerClass = {
        className: classnames(
            `guten-divider-${type}`,
            'guten-divider-line',
            {
                'guten-divider-regular': type && isRegular,
                'guten-divider-style': type && !isRegular,
            }
        )
    };

    const Component = content && content !== 'none' ? DividerContent : DividerOnly;

    const theProps = {
        ...props,
        dividerClass,
        dividerStyle
    };

    return <div {...blockProps}>
        <Component {...theProps} />
    </div>;
});

export default save;