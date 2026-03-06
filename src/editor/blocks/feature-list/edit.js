import { compose } from '@wordpress/compose';
import { useBlockProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useEffect, useRef } from '@wordpress/element';
import { getImageSrc } from 'gutenverse-core/editor-helper';
import { withAnimationAdvanceV2, withMouseMoveEffect, withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { useAnimationEditor, useDisplayEditor } from 'gutenverse-core/hooks';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { useDynamicScript, useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';
import { CopyElementToolbar } from 'gutenverse-core/components';
import { getImageLoadValue } from '../../helper';
import { svgAtob } from 'gutenverse-core/helper';

const FeatureListBlock = compose(
    withPartialRender,
    withPassRef,
    withAnimationAdvanceV2('feature-list'),
    withMouseMoveEffect
)((props) => {
    const {
        attributes,
        clientId,
        setBlockRef,
        setAttributes
    } = props;

    const {
        elementId,
        iconPosition,
        featureList,
        showConnector
    } = attributes;

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const elementRef = useRef(null);
    const deviceType = getDeviceType();

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);
    useDynamicScript(elementRef);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-feature-list',
            'no-margin',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: elementRef
    });

    /* set image load attribute from calculating the lazyload attribute and dashboard image load attribut on first load block on editor */
    useEffect(() => {
        let newLists = [];
        let changes = 0;
        featureList.forEach((feature) => {
            const { lazyLoad = false, imageLoad = '', type } = feature;
            if ('image' === type && '' === imageLoad) {
                changes++;
                newLists.push({
                    ...feature,
                    imageLoad: getImageLoadValue('', lazyLoad)
                });
            } else {
                newLists.push(feature);
            }
        });
        if (changes > 0) {
            setAttributes({ featureList: newLists });
        }
    }, [featureList]);

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
                    const svgData = svgAtob(item.svg);
                    return <div className="icon-wrapper">
                        <div className="icon">
                            <div
                                className="gutenverse-icon-svg"
                                dangerouslySetInnerHTML={{ __html: svgData }}
                            />
                        </div>
                    </div>;
                } catch (error) {
                    console.log(error); //eslint-disable-line
                    return null;
                }
            default:
                return null;
        }
    };

    useEffect(() => {
        if (elementRef) {
            setBlockRef(elementRef);
        }
    }, [elementRef]);

    return <>
        <CopyElementToolbar {...props} />
        <BlockPanelController panelList={panelList} props={props} deviceType={deviceType} elementRef={elementRef} />
        <div  {...blockProps}>
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
    </>;
});

export default FeatureListBlock;