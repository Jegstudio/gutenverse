
import { classnames } from 'gutenverse-core/components';
import { InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';
import { withMouseMoveEffectScript } from 'gutenverse-core/hoc';
import { compose } from '@wordpress/compose';

const save = compose(
    withMouseMoveEffectScript
)(({ attributes }) => {
    const {
        elementId,
        tabs,
        orientation,
    } = attributes;

    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);

    const className = classnames(
        'guten-element',
        'guten-tabs',
        elementId,
        orientation,
        animationClass,
        displayClass,
    );

    return tabs && <div {...useBlockProps.save({ className })}>
        <div className={'tab-heading'}>
            {tabs.map((tab, index) => {
                return <div className={classnames('tab-heading-item', {
                    active: index === 0
                })} id={tab.tabId} data-id={tab.tabId} key={tab.tabId}>
                    <RichText.Content
                        value={tab.text}
                        tagName="span"
                    />
                </div>;
            })}
        </div>
        <div className={'tab-heading-mobile'}>
            <div className={'tab-title'}>
                <RichText.Content
                    value={tabs[0].text}
                    tagName="span"
                />
                <div className="gutenverse-icon-svg">
                    <svg className="chevron-up-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M201.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 173.3 54.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z" /></svg>
                    <svg className="chevron-down-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" /></svg>
                </div>
            </div>
            <div className={'tab-option'}>
                {tabs.map((tab, index) => {
                    const itemClassname = classnames('tab-option-item', {
                        active: index === 0
                    });
                    return <div key={tab.tabId} data-id={tab.tabId} className={itemClassname}>
                        <RichText.Content
                            value={tab.text}
                            tagName="span"
                        />
                    </div>;
                })}
            </div>
        </div>
        <div className={'tab-body'}>
            <InnerBlocks.Content />
        </div>
    </div>;
});

export default save;
