import { classnames } from 'gutenverse-core/components';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';
import { withMouseMoveEffectScript } from 'gutenverse-core/hoc';
import { compose } from '@wordpress/compose';
import { flipClasses } from './edit';
import { renderIcon } from 'gutenverse-core/helper';

const save = compose(
    withMouseMoveEffectScript
)(({ attributes }) => {
    const {
        elementId,
        titleTag = 'h2',
        icon,
        iconType,
        iconSVG,
        url,
        rel,
        linkTarget,
        enableContent,
        chartContent,
        tooltipDisplay,
        legendDisplay,
        chartItems,
        chartType,
        totalValue,
        animationDuration,
        contentType,
        minValue,
        cutout,
        barThickness,
        cutoutBackground,
        title,
        description,
        chartSize
    } = attributes;

    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);
    const multiValue = chartItems.length > 1;

    const className = classnames(
        'guten-element',
        'guten-chart',
        elementId,
        animationClass,
        displayClass,
        flipClasses(contentType)
    );

    const data = JSON.stringify({
        chartContent,
        tooltipDisplay,
        legendDisplay,
        chartItems,
        chartType,
        minValue,
        totalValue,
        animationDuration,
        cutout,
        barThickness,
        cutoutBackground,
        multiValue,
        chartSize,
        elementId
    });

    const insideChart = <div className={`chart-inside type-${chartType}`}>
        {
            'percentage' === chartContent || 'number' === chartContent ?
                <span >{multiValue || 'number' === chartContent ? '0' : '0%'}</span>
                : renderIcon(icon, iconType, iconSVG)
        }
    </div>;

    return (
        <div {...useBlockProps.save({ className })} >
            <div className="guten-chart-wrapper">
                <div className="chart-content content-card">
                    <RichText.Content
                        className={'chart-title'}
                        value={title}
                        tagName={titleTag}
                    />
                    {'doughnut' !== chartType && 'none' !== chartContent ? insideChart : ''}
                    <RichText.Content
                        className={'chart-description'}
                        value={description}
                        tagName={'p'}
                    />
                </div>
                <div className="chart-content content-chart">
                    <div className="chart-container" data-chart={data}>
                        <div id={`chart-${elementId}`} style={{ boxSizing: 'border-box', lineHeight: '0' }}></div>
                    </div>
                    {chartContent !== 'none' && 'doughnut' === chartType ? insideChart : ''}
                </div>
            </div>
        </div>
    );
});

export default save;