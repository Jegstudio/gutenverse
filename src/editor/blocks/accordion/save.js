
import { InnerBlocks, RichText } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { AccordionIcon } from './edit';

export const save = (props) => {
    const {
        attributes,
    } = props;

    const {
        title,
        first,
        iconPosition,
        iconOpen,
        iconOpenType,
        iconOpenSVG,
        iconClosed,
        iconClosedType,
        iconClosedSVG,
        titleTag,
        elementId
    } = attributes;

    const accordionStyle = classnames(
        'accordion-item',
        elementId,
        {
            active: first
        }
    );

    return <div className={accordionStyle}>
        <div className={'accordion-heading'}>
            {iconPosition === 'left' && <AccordionIcon iconClosed={iconClosed} iconClosedType={iconClosedType} iconClosedSVG={iconClosedSVG} iconOpen={iconOpen} iconOpenType={iconOpenType} iconOpenSVG={iconOpenSVG} />}
            <RichText.Content
                className={'accordion-text'}
                value={title}
                tagName={titleTag}
            />
            {iconPosition === 'right' && <AccordionIcon iconClosed={iconClosed} iconClosedType={iconClosedType} iconClosedSVG={iconClosedSVG} iconOpen={iconOpen} iconOpenType={iconOpenType} iconOpenSVG={iconOpenSVG} />}
        </div>
        <div className={'accordion-body'}>
            <div className={'accordion-content'}>
                <InnerBlocks.Content />
            </div>
        </div>
    </div>;
};

export default save;
