import { compose } from '@wordpress/compose';
import { useEffect } from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import anime from 'animejs';
import { getDeviceType, getImageSrc } from 'gutenverse-core/editor-helper';
import { renderIcon } from 'gutenverse-core/helper';
import { useRef } from '@wordpress/element';
import { withAnimationAdvanceV2, withMouseMoveEffect, withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { useAnimationEditor, useDisplayEditor } from 'gutenverse-core/hooks';
import { useDynamicScript, useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';
import { CopyElementToolbar } from 'gutenverse-core/components';
import { getImageLoadValue } from '../../helper';

const FunFactBlock = compose(
    withPartialRender,
    withPassRef,
    withAnimationAdvanceV2('fun-fact'),
    withMouseMoveEffect
)((props) => {
    const {
        attributes,
        clientId,
        setBlockRef,
        setAttributes,
    } = props;

    const {
        elementId,
        icon,
        prefix,
        suffix,
        title,
        supper,
        showSupper,
        number,
        safeNumber,
        duration,
        titleTag: TitleTag,
        hoverBottom,
        hoverBottomDirection,
        iconType,
        iconSVG,
        image,
        imageAlt,
        lazyLoad,
        iconPosition,
        contentDisplay,
        numberFormat = '',
        numberRightSpace,
        imageLoad = ''
    } = attributes;

    useEffect(() => {
        if (number && !safeNumber) {
            setAttributes({ safeNumber: number });
        }
        if ('' === imageLoad) {
            setAttributes({ imageLoad: getImageLoadValue('', lazyLoad) });
        }
    }, []);

    const imageAltText = imageAlt || null;
    const elementRef = useRef(null);
    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const deviceType = getDeviceType();

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);
    useDynamicScript(elementRef);

    useEffect(() => {
        if (elementRef.current) {
            const numberElement = elementRef.current.querySelector('.number');

            let used = number ? number : safeNumber;
            let formatter = null;

            // fallback for old block
            if (safeNumber) {
                const formatComma = safeNumber.replaceAll( ',', '.' );
                const isValidNumber = /^-?\d+(\.\d+)?$/.test(formatComma);
                if (!isValidNumber) {
                    //eslint-disable-next-line no-console
                    console.warn('[FunFact] Invalid number input (potentially unsafe):', formatComma);
                    numberElement.textContent = 'Invalid number';
                    return;
                }

                if(numberFormat === 'comma') {
                    formatter = new Intl.NumberFormat('en-US', {
                        maximumFractionDigits: 0
                    });
                }else if(numberFormat === 'point') {
                    formatter = new Intl.NumberFormat('id-ID', {
                        maximumFractionDigits: 0
                    });
                }

                used = Math.round(parseFloat(formatComma));
            }

            numberElement.textContent = '0';

            if (!numberRightSpace) {
                used = `${used} `;
            }

            anime({
                targets: numberElement,
                innerHTML: used,
                easing: 'easeInOutQuart',
                round: 1,
                duration,
                update: formatter && safeNumber ? function(anim) {
                    const val = parseInt(anim.animations[0].currentValue);
                    numberElement.textContent = !isNaN(val) ? formatter.format( val ) : anim.animations[0].currentValue;
                } : null
            });
        }

        return () => {
            const numberElement = elementRef.current?.querySelector('.number');
            if (numberElement) anime.remove(numberElement);
        };
    }, [safeNumber, duration, numberFormat]);

    useEffect(() => {
        if (elementRef) {
            setBlockRef(elementRef);
        }
    }, [elementRef]);

    const iconContent = () => {
        switch (iconType) {
            case 'icon':
            case 'svg':
                return <div className="icon-box">
                    <div className="icon">{renderIcon(icon, iconType, iconSVG)}</div>
                </div>;
            case 'image':
                return <div className="icon-box">
                    <div className="icon"><img src={getImageSrc(image)} alt={imageAltText} {...(lazyLoad && { loading: 'lazy' })} /></div>
                </div>;
            default:
                return null;
        }
    };
    const setIconPosition = () => {
        if (iconPosition[deviceType] == 'left' || iconPosition[deviceType] == 'right') {
            setAttributes( { contentDisplay: 'inline-block' } );
        } else {
            setAttributes( { contentDisplay: 'block' } );
        }
    };
    const setShowIconContent = () => {
        if (iconPosition[deviceType] == 'left' || iconPosition[deviceType] == 'top') {
            setAttributes( {
                topIconContent: true,
                bottomIconContent: false
            } );
        } else {
            setAttributes( {
                topIconContent: false,
                bottomIconContent: true
            } );
        }
    };

    useEffect(() => {
        setIconPosition();
        setShowIconContent();
    }, [iconPosition]);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-fun-fact',
            'no-margin',
            elementId,
            animationClass,
            displayClass,
            'align-center',
            'hover-from-left',
        ),
        ref: elementRef
    });

    return <>
        <CopyElementToolbar {...props} />
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
        <div  {...blockProps}>
            <div className="fun-fact-inner">
                {(iconPosition[deviceType] === 'top' || iconPosition[deviceType] === 'left' || iconPosition[deviceType] == undefined) && iconContent()}
                <div className={`content ${contentDisplay}`}>
                    <div className="number-wrapper">
                        <span className="prefix">{`${prefix} `}</span>
                        <span className="number loaded" data-number={number} data-duration={duration}></span>
                        <span className="suffix">{suffix}</span>
                        {showSupper && <sup className="super">{supper}</sup>}
                    </div>
                    <TitleTag className="title">{title}</TitleTag>
                </div>
                {(iconPosition[deviceType] === 'bottom' || iconPosition[deviceType] === 'right') && iconContent()}
            </div>
            {hoverBottom && <div className={'border-bottom'}>
                <div className={`animated ${hoverBottomDirection}`}></div>
            </div>}
        </div>
    </>;
});

export default FunFactBlock;