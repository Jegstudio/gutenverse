import { compose } from '@wordpress/compose';
import { classnames } from 'gutenverse-core/components';
import { useBlockProps } from '@wordpress/block-editor';
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

    const iconContent = (item, index) => {
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
                        <img
                            src={getImageSrc(item.image)}
                            alt={item.title}
                            {...(item.lazyLoad && { loading: 'lazy' })}
                            width={item.image?.width}
                            height={item.image?.height}
                        />
                    </div>
                </div>;
            case 'number':
                return <div className="icon-wrapper">
                    <div className="icon">
                        <span className="icon-number">{typeof item.number === 'number' && !Number.isNaN(item.number) ? item.number : index + 1}</span>
                    </div>
                </div>;
            case 'svg':
                try {
                    const svgData = atob(item.svg);
                    return <div className="icon-wrapper">
                        <div className="icon">
                            <div
                                className="gutenverse-icon-svg"
                                dangerouslySetInnerHTML={{ __html: svgData }}
                            />
                        </div>
                    </div>;
                } catch (error) {
                    console.log(error);
                    return null;
                }
            default:
                return null;
        }
    };
    return (
        <div className={className} {...advanceAnimationData}>
            <div className="feature-list-wrapper">
                {
                    featureList.map((el, index) => {
                        return <div key={index} className={`icon-position-${iconPosition} feature-list-item`}>
                            {showConnector && index != 0 && <span className={`connector-top icon-position-${iconPosition}`}></span>}
                            {showConnector && index != featureList.length - 1 && <span className={`connector-bottom icon-position-${iconPosition}`}></span>}
                            {iconContent(el, index)}
                            <div className="feature-list-content">
                                {el.link ? <a href={el.link} target="_blank" rel="noreferrer" aria-label={el.title}><h2 className="feature-list-title">{el.title}</h2></a> : <h2 className="feature-list-title">{el.title}</h2>}
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