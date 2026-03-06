
import { classnames } from 'gutenverse-core/components';
import { InnerBlocks, RichText } from '@wordpress/block-editor';
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

    return tabs && <div className={className}>
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
                <i className={'tab-dropdown-icon fas'} />
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
