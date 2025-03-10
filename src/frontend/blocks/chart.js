import anime from 'animejs';
import { Default, u } from 'gutenverse-core-frontend';
import { Chart} from 'chart.js/auto';

class GutenverseChart extends Default {
    /* public */
    init() {
        this._elements.map(element => {
            const dataElement = u(element).find('.chart-content.content-chart').find('.chart-container');

            if (dataElement.length) {
                
                const rawData = dataElement.data('chart');
                if (rawData) {
                    const parsedData = JSON.parse(rawData);
                    const canvas = u(dataElement).find('canvas');
                    const chartData = this._getChartData(parsedData, canvas);

                    const customPositioner = (elements, eventPosition) => ({
                        x: eventPosition.x,
                        y: eventPosition.y,
                    });
            
                    const tooltipPlugin = Chart.registry.getPlugin('tooltip');
                    if (tooltipPlugin) {
                        tooltipPlugin.positioners.custom = customPositioner;
                    }
                    
                    new Chart(canvas.nodes[0], chartData);

                    const numberElement = u(element).find('.chart-content .chart-inside span');
                    this._animateNumber(numberElement, parsedData);
                }
            }
        });
    }

    _animateNumber(element, data) {
        const {
            chartContent,
            chartItems,
            totalValue,
            animationDuration,
            multiValue
        } = data;

        anime({
            targets: element.nodes[0],
            innerHTML: multiValue || 'number' === chartContent ? [0, totalValue] : [0, chartItems[0].value], 
            duration: animationDuration,
            easing: 'cubicBezier(.02, .01, .47, 1)',
            round: 1,
        });
        
    }

    _theColor (color) {
        const theColor = color ? color : {
            r: 255,
            g: 255,
            b: 255,
            a: 0
        }

        const { r, g, b, a, type, id } = theColor;
        let result = '';
    
        if ((r || r === 0) && (g || g === 0) && (g || g === 0)) {
            result = `rgba(${r}, ${g}, ${b}, ${a})`;
        }
    
        if ('variable' === type) {
            const value = variableColorName(id);
            result = `var(${value})`;
        }
    
        return result;
    }

    _getChartData(data, canvas) {

        const {
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
            multiValue
        } = data;
    
        const values = [];
        const labels = [];
        const backgroundColor = [];
        const borderWidth = [];
        const borderColor = [];
        
        const responsiveSize = true;
    
        chartItems.forEach((item, index) => {
            //color control
            let color;
            if (item.colorMode === 'default' || item.colorMode === undefined) {
                color = this._theColor(item.backgroundColor);
            } else {
                const gradient = "topBottom" === item.gradientDirection ? canvas.getContext('2d').createLinearGradient(0, 0, 0, 400) : canvas.getContext('2d').createLinearGradient(0, 0, 400, 0);
                gradient.addColorStop(0, this._theColor(item.colorGradientOne));
                gradient.addColorStop(1, this._theColor(item.colorGradientTwo)); 
                color = gradient; 
            }
    
            //push data to individual array
            values.push(item.value);
            labels.push(item.label);
            backgroundColor.push(color);
            borderColor.push(this._theColor(item.borderColor));
            borderWidth.push(item.borderWidth);
        });
    
        const topValue = 'number' === chartContent ? parseFloat(totalValue) : 100;
        const bottomValue = 'number' === chartContent ? parseFloat(minValue) : 0;
        const cutoutFill = this._theColor({...cutoutBackground, a: 1});
    
        switch(chartType) {
            case 'doughnut':
    
                const sum = values.reduce((acc, val) => parseFloat(acc) + parseFloat(val), 0);
                const backgroundPlugin = {
                    id: 'customBackground',
                    beforeDraw: (chart) => {
                        const { ctx, chartArea } = chart;
                        const { width, height } = chart;
                        const centerX = chartArea.left + (chartArea.right - chartArea.left) / 2;
                        const centerY = chartArea.top + (chartArea.bottom - chartArea.top) / 2;
                        const outerRadius = Math.min(width, height) / 2;
                        const cutoutPercent = parseFloat(chart.options.cutout);
                        const innerRadius = (outerRadius * cutoutPercent) / 100;
                
                        ctx.save();
                
                        ctx.globalAlpha = cutoutBackground.a;
                        ctx.fillStyle = cutoutFill;
                        ctx.beginPath();
                        ctx.arc(centerX, centerY, outerRadius, 0, Math.PI * 2);
                        ctx.fill();
                
                        ctx.globalAlpha = 1.0;
                        ctx.globalCompositeOperation = 'destination-out';
                        ctx.beginPath();
                        ctx.arc(centerX, centerY, innerRadius, 0, Math.PI * 2);
                        ctx.fill();
                
                        ctx.globalCompositeOperation = 'source-over';
                        ctx.restore();
                    }
                };
    
                if (sum < topValue && 'doughnut' === chartType) {
                    const difference = topValue - sum;
                    values.push(difference);
                    labels.push('gutenEmptyDataSet');
                    backgroundColor.push('rgba(255, 255, 255, 0)')
                    borderColor.push('rgba(255, 255, 255, 0)');
                    borderWidth.push(0);
                }
    
                return {
                    type: chartType,
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                data: values,
                                backgroundColor: backgroundColor,
                                borderColor: borderColor,
                                borderWidth: borderWidth,
                            },
                        ],
                    },
                    options: {
                        responsive: responsiveSize,
                        maintainAspectRatio: false,
                        cutout: `${cutout}%`,
                        plugins: {
                            tooltip: {
                                enabled: tooltipDisplay,
                                position: 'custom',
                                filter: (tooltipItem) => {
                                    return tooltipItem.label !== 'gutenEmptyDataSet';
                                },
                                callbacks: {
                                    label: (tooltipItem) => {
                                        if ('number' === chartContent) return `${tooltipItem.raw} of ${totalValue}`;
                                        if (multiValue) return `${tooltipItem.raw}% of ${totalValue}`;
                                        return `${tooltipItem.label}: ${tooltipItem.raw}%`;
                                    },
                                },
                            },
                            legend: {
                                display: false,
                            },
                        },
                        animation: {
                            animateRotate: true,
                            duration: animationDuration,
                            easing: 'easeInOutQuart'
                        },
                    },
                    plugins: [backgroundPlugin]
                }
            
            case 'bar' :
                
                return {
                    type: chartType,
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                data: values,
                                backgroundColor: backgroundColor,
                                borderColor: borderColor,
                                borderWidth: borderWidth,
                                barThickness: barThickness
                            },
                        ],
                    },
                    options: {
                        responsive: responsiveSize,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true,
                                min: bottomValue,
                                max: topValue
                            }
                        },
                        plugins: {
                            tooltip: {
                                enabled: tooltipDisplay,
                                position: 'custom',
                                callbacks: {
                                    label: (tooltipItem) => {
                                        if ('number' === chartContent) return `${tooltipItem.raw} of ${totalValue}`;
                                        if (multiValue) return `${tooltipItem.raw}% of ${totalValue}`;
                                        return `${tooltipItem.label}: ${tooltipItem.raw}%`;
                                    },
                                },
                            },
                            legend: {
                                display: legendDisplay,
                                onClick: null,
                                labels: {
                                    generateLabels: (chart) => {
                                        return chart.data.labels.map((label, i) => ({
                                            text: `${label}`,
                                            fillStyle: chart.data.datasets[0].backgroundColor[i],
                                            hidden: false,
                                            lineWidth: 0,
                                            pointStyle: 'circle'
                                        }));
                                    },
                                    usePointStyle: true
                                }
                            },
                        },
                        animation: {
                            animateRotate: true,
                            duration: animationDuration,
                            easing: 'easeInOutQuart'
                        },
                    },
                }
    
            case 'line' :
                return {
                    type: chartType,
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                data: values,
                                backgroundColor: backgroundColor,
                                borderColor: borderColor,
                                borderWidth: borderWidth,
                                barThickness: barThickness
                            },
                        ],
                    },
                    options: {
                        responsive: responsiveSize,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true,
                                min: bottomValue,
                                max: topValue
                            }
                        },
                        plugins: {
                            tooltip: {
                                enabled: tooltipDisplay,
                                position: 'custom',
                                callbacks: {
                                    label: (tooltipItem) => {
                                        if ('number' === chartContent) return `${tooltipItem.raw} of ${totalValue}`;
                                        if (multiValue) return `${tooltipItem.raw}% of ${totalValue}`;
                                        return `${tooltipItem.label}: ${tooltipItem.raw}%`;
                                    },
                                },
                            },
                            legend: {
                                display: legendDisplay,
                                onClick: null,
                                labels: {
                                    generateLabels: (chart) => {
                                        return chart.data.labels.map((label, i) => ({
                                            text: `${label}`,
                                            fillStyle: chart.data.datasets[0].backgroundColor[i],
                                            hidden: false,
                                            lineWidth: 0,
                                            pointStyle: 'circle'
                                        }));
                                    },
                                    usePointStyle: true
                                }
                            },
                        },
                        animation: {
                            animateRotate: true,
                            duration: animationDuration,
                            easing: 'easeInOutQuart'
                        },
                    },
                }
        }
    }
}
export default GutenverseChart;