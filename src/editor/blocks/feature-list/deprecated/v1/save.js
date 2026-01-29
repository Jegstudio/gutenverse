import { compose } from '@wordpress/compose';
import { classnames } from 'gutenverse-core/components';
import { getImageSrc } from 'gutenverse-core/editor-helper';
import { withAnimationAdvanceScript, withMouseMoveEffectScript } from 'gutenverse-core/hoc';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';
import { useAnimationAdvanceData } from 'gutenverse-core/hooks';

const save = compose(
    withAnimationAdvanceScript('icon-box'),
    withMouseMoveEffectScript
)((props) => {
    const {
        attributes
    } = props;

    const {
        elementId,
        iconPosition,
        featureList,
        showConnector
    } = attributes;

    const advanceAnimationData = useAnimationAdvanceData(attributes);
    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);

    const className = classnames(
        'guten-element',
        elementId,
        animationClass,
        displayClass,
        'guten-feature-list',
    );

    const iconContent = (item) => {
        switch (item.type) {
            case 'icon':
                return <div className="icon-wrapper">
                    <div className="icon">
                        <i className={item.icon}></i>
                    </div>
                </div>;
            case 'image':
                return <div className="icon-wrapper">
                    <div className="icon">
                        <img src={getImageSrc(item.image)} alt={item.title} loading={item.lazyLoad}/>
                    </div>
                </div>;
            default:
                return null;
        }
    };
    return (
        <div className={className} {...advanceAnimationData} >
            <div className="feature-list-wrapper">
                {
                    featureList.map((el, index) => {
                        return <div key={index} className={`icon-position-${iconPosition} feature-list-item`}>
                            { showConnector && <span className={`connector icon-position-${iconPosition}`}></span>}
                            {iconContent(el)}
                            <div className="feature-list-content">
                                { el.link ? <a href={el.link} target="_blank" rel="noreferrer" aria-label={el.title}><h2 className="feature-list-title">{el.title}</h2></a> : <h2 className="feature-list-title">{el.title}</h2>}
                                <p className="feature-list-desc">{el.content}</p>
                            </div>
                        </div>;
                    })
                }
            </div>
        </div>
    );
});

export default save;