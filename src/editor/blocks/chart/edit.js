import anime from 'animejs';
import { __ } from '@wordpress/i18n';
import { createPortal } from 'react-dom';
import { compose } from '@wordpress/compose';
import { panelList } from './panels/panel-list';
import { applyFilters } from '@wordpress/hooks';
import generateChart from './data/generateChart';
import getBlockStyle from './styles/block-style';
import { getColor } from 'gutenverse-core/styling';
import { displayShortcut } from '@wordpress/keycodes';
import { gutenverseRoot, renderIcon } from 'gutenverse-core/helper';
import { LogoCircleColor24SVG } from 'gutenverse-core/icons';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { useBlockProps, BlockControls } from '@wordpress/block-editor';
import { RichTextComponent, classnames } from 'gutenverse-core/components';
import { useAnimationEditor, useDisplayEditor } from 'gutenverse-core/hooks';
import { IconLibrary, BlockPanelController } from 'gutenverse-core/controls';
import { useEffect, useState, useRef, useCallback } from '@wordpress/element';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import { HighLightToolbar, URLToolbar, FilterDynamic } from 'gutenverse-core/toolbars';
import { withPassRef, withMouseMoveEffect, withPartialRender, withCopyElementToolbar } from 'gutenverse-core/hoc';

//commented code is for integrating with dynamic and text highlight
const NEW_TAB_REL = 'noreferrer noopener';

export const flipClasses = (contentType) => {
    const flipClass = [];

    if (contentType) {
        const { Desktop, Tablet, Mobile } = contentType;

        const isDesktopFlip = Desktop === 'flipCard';
        const isTabletFlip = Tablet === 'flipCard' || (Tablet === undefined && Desktop === 'flipCard');
        const isMobileFlip = Mobile === 'flipCard' || (Mobile === undefined && isTabletFlip);

        isDesktopFlip ? flipClass.push('Desktop-flipCard') : (isTabletFlip || isMobileFlip) && flipClass.push('Desktop-noFlip');
        isTabletFlip ? flipClass.push('Tablet-flipCard') : (isDesktopFlip || isMobileFlip) && flipClass.push('Tablet-noFlip');
        isMobileFlip ? flipClass.push('Mobile-flipCard') : (isDesktopFlip || isTabletFlip) && flipClass.push('Mobile-noFlip');
    }

    return flipClass;
}

const ChartBlock = compose(
    withPartialRender,
    withPassRef,
    withCopyElementToolbar(),
    withMouseMoveEffect
)((props) => {
    const {
        clientId,
        attributes,
        isSelected,
        setBlockRef,
        setPanelState,
        setAttributes,
        panelIsClicked,
        setPanelIsClicked
    } = props;

    const {
        url,
        rel,
        icon,
        iconType,
        iconSVG,
        cutout,
        minValue,
        elementId,
        chartType,
        linkTarget,
        chartItems,
        totalValue,
        contentType,
        chartContent,
        barThickness,
        legendDisplay,
        enableContent,
        tooltipDisplay,
        titleTag = 'h2',
        cutoutBackground,
        animationDuration,
        enableContentParsed
    } = attributes;

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const multiValue = chartItems.length > 1;
    const deviceType = getDeviceType();
    const elementRef = useRef();
    const numberRef = useRef();
    const chartRef = useRef();
    const titleRef = useRef();
    const descRef = useRef();
    const canvasRef = useRef();
    // const panelState = {
    //     panel: 'setting',
    //     section: 2,
    // };

    const blockProps = useBlockProps({
        ref: elementRef,
        className: classnames(
            'guten-element',
            'guten-chart',
            elementId,
            animationClass,
            displayClass,
            flipClasses(contentType)
        ),
    });

    // const onToggleOpenInNewTab = useCallback(
    //     (value) => {
    //         const newLinkTarget = value ? '_blank' : undefined;

    //         let updatedRel = rel;
    //         if (newLinkTarget && !rel) {
    //             updatedRel = NEW_TAB_REL;
    //         } else if (!newLinkTarget && rel === NEW_TAB_REL) {
    //             updatedRel = undefined;
    //         }

    //         setAttributes({
    //             linkTarget: newLinkTarget,
    //             rel: updatedRel,
    //         });
    //     },
    //     [rel, setAttributes]
    // );

    useEffect(() => {
        if (elementRef.current) {
            setBlockRef(elementRef.current);
        }
    }, [elementRef]);

    useEffect(() => {
        if (enableContent[deviceType] === true) {
            setAttributes({
                enableContentParsed: {
                    ...enableContentParsed,
                    [deviceType]: 'true'
                }
            });
        } else {
            setAttributes({
                enableContentParsed: {
                    ...enableContentParsed,
                    [deviceType]: 'false'
                }
            });
        }
    }, [enableContent]);

    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }

        canvasRef.current.innerHTML = '';
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    generateChart(attributes, canvasRef.current);
                    obs.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });

        observer.observe(canvasRef.current);

        return () => {
            observer.disconnect();
            if (chartRef.current) {
                chartRef.current.destroy();
                chartRef.current = null;
            }
        };
    }, [
        cutout,
        minValue,
        chartType,
        elementId,
        chartItems,
        totalValue,
        chartContent,
        barThickness,
        legendDisplay,
        tooltipDisplay,
        cutoutBackground,
        animationDuration,
    ]);

    useEffect(() => {
        if (!numberRef.current || (chartContent !== 'percentage' && 'number' !== chartContent)) return;

        const animation = anime({
            targets: numberRef.current,
            innerHTML: multiValue || 'number' === chartContent ? [0, totalValue] : [0, chartItems[0].value],
            duration: animationDuration,
            easing: 'cubicBezier(.02, .01, .47, 1)',
            round: 1,
        });

        return () => animation.pause();
    }, [chartItems, animationDuration, chartContent, totalValue, chartType]);

    // FilterDynamic(props);
    // HighLightToolbar(props);

    const insideChart = <div className={`chart-inside type-${chartType}`}>
        {
            'percentage' === chartContent || 'number' === chartContent ?
                <span ref={numberRef} >{multiValue || 'number' === chartContent ? '0' : '0%'}</span>
                : renderIcon(icon, iconType, iconSVG)
        }
    </div>;

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);

    return <>
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
        <div {...blockProps} >
            <div className="guten-chart-wrapper">
                {enableContent[deviceType] && <div className="chart-content content-card">
                    <RichTextComponent
                        ref={titleRef}
                        classNames={'chart-title'}
                        tagName={titleTag}
                        aria-label={__('Chart Title', 'gutenverse')}
                        placeholder={__('Write title...', 'gutenverse')}
                        onChange={value => setAttributes({ title: value })}
                        multiline={false}
                        setAttributes={setAttributes}
                        attributes={attributes}
                        clientId={clientId}
                        contentAttribute={'title'}
                    // panelDynamic={{ panel: 'setting', section: 3 }}
                    // panelPosition={{ panel: 'style', section: 1 }}
                    // setPanelState={setPanelState}
                    // textChilds={'titleChilds'}
                    // dynamicList={'titleDynamicList'}
                    // isUseDinamic={true}
                    // isUseHighlight={true}
                    // parentHasLink={isGlobalLinkSet}
                    />
                    {'doughnut' !== chartType && 'none' !== chartContent ? insideChart : ''}
                    <RichTextComponent
                        ref={descRef}
                        classNames={'chart-description'}
                        tagName={'p'}
                        aria-label={__('Chart Description', 'gutenverse')}
                        placeholder={__('Write description...', 'gutenverse')}
                        onChange={value => setAttributes({ description: value })}
                        multiline={false}
                        setAttributes={setAttributes}
                        attributes={attributes}
                        clientId={clientId}
                        contentAttribute={'description'}
                    // panelDynamic={{ panel: 'setting', section: 3 }}
                    // panelPosition={{ panel: 'style', section: 1 }}
                    // setPanelState={setPanelState}
                    // textChilds={'descriptionChilds'}
                    // dynamicList={'descriptionDynamicList'}
                    // isUseDinamic={true}
                    // isUseHighlight={true}
                    // parentHasLink={isGlobalLinkSet}
                    />
                </div>}
                <div className="chart-content content-chart">
                    <div className="chart-container">
                        <div ref={canvasRef} id={`chart-${elementId}`} style={{ boxSizing: 'border-box', lineHeight: '0' }}></div>
                    </div>
                    {chartContent !== 'none' && 'doughnut' === chartType ? insideChart : ''}
                </div>
            </div>
        </div>
    </>;
});

export default ChartBlock;