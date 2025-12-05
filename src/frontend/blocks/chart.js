import { Default, u } from 'gutenverse-core-frontend';
import isEmpty from 'lodash/isEmpty';
import {
    // Core DOM selection & data binding
    select,
    selectAll,

    // Scales & colors
    scaleLinear,
    scaleBand,
    scaleOrdinal,
    schemeCategory10,

    // Shape generators
    arc,
    pie,
    max,

    // Transitions / animation
    transition,
    easeCubicOut,
    easeCubic,
    interpolate,
    interpolateNumber,

    // Axes (for bar chart)
    axisBottom,
    axisLeft,

    // Gradient & defs utilities (optional manual SVG)
    create,
} from 'd3';

class GutenverseChart extends Default {
    /* public */
    init() {
        this._elements.each(element => {
            const dataElement = u(element).find('.chart-content.content-chart .chart-container');

            if (!dataElement.length) return;

            const rawData = dataElement.data('chart');
            if (!rawData) return;

            let parsedData;
            try {
                parsedData = JSON.parse(rawData);
            } catch (e) {
                console.error('Invalid chart data:', rawData, e); // eslint-disable-line
                return;
            }

            const { elementId } = parsedData;
            const chartElement = u(dataElement).find(`#chart-${elementId}`);
            if (!chartElement.nodes[0]) return;

            const numberElement = u(element).find('.chart-content .chart-inside span');

            const observer = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        try {
                            this._generateChart(parsedData, chartElement.nodes[0]);
                            if (numberElement.length) {
                                this._animateNumber(numberElement, parsedData);
                            }
                        } catch (err) {
                            console.error('Chart rendering failed:', err); // eslint-disable-line
                        } finally {
                            obs.unobserve(entry.target);
                        }
                    }
                });
            }, {
                threshold: 0.2,
                rootMargin: '100px'
            });

            observer.observe(chartElement.nodes[0]);
        });
    }

    _generateChart(chartData, element) {
        const {
            cutout,
            minValue,
            chartType,
            chartSize,
            elementId,
            multiValue,
            totalValue,
            chartItems,
            barThickness,
            chartContent,
            legendDisplay,
            tooltipDisplay,
            cutoutBackground,
            animationDuration,
        } = chartData;

        const chartId = `#chart-${elementId}`;
        const device = this._getDeviceType();
        const width = chartSize[device];
        const height = chartSize[device];
        const radius = Math.min(width, height) / 2;
        const data = chartItems;

        const svgContainer = select(chartId)
            .append('svg')
            .attr('width', width)
            .attr('height', height);

        const svg = svgContainer
            .append('g')
            .attr('transform', `translate(${width / 2}, ${height / 2})`);

        let tooltip;

        if (tooltipDisplay) {
            tooltip = this._appendTooltip(chartId);
        }

        if (chartType === 'doughnut') {
            this._drawDonutChart({
                svg,
                data,
                radius,
                cutout,
                device,
                tooltip,
                elementId,
                totalValue,
                chartContent,
                cutoutBackground,
                animationDuration,
            });
        } else if (chartType === 'bar') {
            this._drawBarChart({
                svg,
                data,
                width,
                height,
                tooltip,
                minValue,
                elementId,
                totalValue,
                svgContainer,
                chartContent,
                barThickness,
                legendDisplay,
                animationDuration,
            });
        }
    }

    _appendGradientDefs(svg, data, elementId, type) {
        const defs = svg.append('defs');

        data.forEach((d, i) => {
            if (d.colorMode !== 'gradient') return;
            if (d.gutenverseGradient) {
                //apply gutenverse gradient
            } else {
                let gradient;
                const position = d.gradientPosition ? d.gradientPosition : 200;
                const positionConverted = (position / 500) * 200;
                const thePosition =`${positionConverted >= 100 ? 100 : positionConverted}%`;
                switch (d.gradientDirection) {
                    case 'topBottom':
                        gradient = defs.append('linearGradient')
                            .attr('id', `gradient-${elementId}-${i}`)
                            .attr('x1', '0%')
                            .attr('y1', type === 'bar' ? thePosition : '0%')
                            .attr('x2', '0%')
                            .attr('y2', type === 'donut' ? thePosition : '0%');
                        break;
                    case 'leftRight':
                        gradient = defs.append('linearGradient')
                            .attr('id', `gradient-${elementId}-${i}`)
                            .attr('x1', '0%')
                            .attr('y1', '0%')
                            .attr('x2', thePosition)
                            .attr('y2', '0%');
                        break;
                    case 'bottomTop':
                        gradient = defs.append('linearGradient')
                            .attr('id', `gradient-${elementId}-${i}`)
                            .attr('x1', '0%')
                            .attr('y1', type === 'donut' ? thePosition : '0%')
                            .attr('x2', '0%')
                            .attr('y2', type === 'bar' ? thePosition : '0%');
                        break;
                    case 'rightLeft':
                        gradient = defs.append('linearGradient')
                            .attr('id', `gradient-${elementId}-${i}`)
                            .attr('x1', thePosition)
                            .attr('y1', '0%')
                            .attr('x2', '0%')
                            .attr('y2', '0%');
                        break;
                }

                gradient.append('stop')
                    .attr('offset', `${positionConverted >= 100 ? (positionConverted - 100) : 0}%`)
                    .attr('stop-color', this._theColor(d.colorGradientOne));

                gradient.append('stop')
                    .attr('offset', '100%')
                    .attr('stop-color', this._theColor(d.colorGradientTwo));
            }
        });
    }

    _drawDonutChart(props) {
        const {
            svg,
            radius,
            cutout,
            device,
            tooltip,
            elementId,
            totalValue,
            chartContent,
            cutoutBackground,
            animationDuration = 800,
        } = props;

        let { data } = props;
        const theCutout = cutout[device] * 0.01;

        if(chartContent !== 'number') {
            let flag = 100;
            for (const dataChart of data) {
                flag -= dataChart.value;
            }
            data = flag > 0 ? [
                ...data,
                {
                    label: '',
                    value: flag,
                    backgroundColor: {
                        r: 255,
                        g: 255,
                        b: 255,
                        a: 0
                    },
                    borderColor: {
                        r: 255,
                        g: 255,
                        b: 255,
                        a: 1
                    },
                    borderWidth: 0,
                    _key: '00000'
                }
            ] : flag === 0 ? data : [
                ...data,
                {
                    label: '',
                    value: totalValue + ( flag - 100 ) ,
                    backgroundColor: {
                        r: 255,
                        g: 255,
                        b: 255,
                        a: 0
                    },
                    borderColor: {
                        r: 255,
                        g: 255,
                        b: 255,
                        a: 1
                    },
                    borderWidth: 0,
                    _key: '00000'
                }
            ];
        } else {
            let flag = totalValue;
            for (const dataChart of data) {
                flag -= dataChart.value;
            }
            data = flag > 0 ? [
                ...data,
                {
                    label: '',
                    value: flag,
                    backgroundColor: {
                        r: 255,
                        g: 255,
                        b: 255,
                        a: 0
                    },
                    borderColor: {
                        r: 255,
                        g: 255,
                        b: 255,
                        a: 1
                    },
                    borderWidth: 0,
                    _key: '00000'
                }
            ] : data;
        }

        this._appendGradientDefs(svg, data, elementId, 'donut');

        const pieGenerator = pie()
            .sort(null)
            .value(d => d.value);

        const arcGenerator = arc()
            .innerRadius(radius * theCutout)
            .outerRadius(radius);

        const backgroundArc = arc()
            .innerRadius(radius * theCutout)
            .outerRadius(radius);

        svg.append('path')
            .attr('d', backgroundArc({ startAngle: 0, endAngle: 2 * Math.PI }))
            .attr('fill', this._theColor(cutoutBackground))
            .attr('stroke', 'none');

        const arcs = svg.selectAll('path.donut')
            .data(pieGenerator(data))
            .enter()
            .append('path')
            .attr('class', 'donut')
            .attr('d', d => {
                const borderWidth = d.data.borderWidth || 0;
                const adjustedArc = arc()
                    .innerRadius(radius * 0.6)
                    .outerRadius(radius - borderWidth);
                return adjustedArc(d);
            })
            .attr('fill', (d, i) =>
                d.data.colorMode === 'gradient'
                    ? `url(#gradient-${elementId}-${i})`
                    : this._theColor(d.data.backgroundColor)
            )
            .style('stroke', d => this._theColor(d.data.borderColor))
            .style('stroke-width', d => d.data.borderWidth || 0)
            .style('stroke-linejoin', 'round')
            .style('transition', 'none');

        arcs.transition()
            .ease(easeCubic)
            .duration(animationDuration)
            .attrTween('d', function (d) {
                const i = interpolate({ startAngle: 0, endAngle: 0 }, d);
                return function (t) {
                    return arcGenerator(i(t));
                };
            });

        arcs.on('mouseover', function (event, d) {
            tooltip?.show(`${d.data.label}: ${d.data.value}`, event);
        })
            .on('mousemove', function (event) {
                tooltip?.move(event);
            })
            .on('mouseout', function () {
                tooltip?.hide();
            });
    }

    _getMaxvalue(data, totalValue, chartContent) {
        if(chartContent !== 'number') {
            const value = Math.max(...data.map(d => d.value));
            return value <= 100 ? 100 : value;
        } else {
            return totalValue;
        }
    }

    _drawBarChart(props) {
        const {
            svg,
            data,
            width,
            height,
            tooltip,
            minValue,
            elementId,
            totalValue,
            svgContainer,
            chartContent,
            barThickness,
            legendDisplay,
            enableGrid = true,
            animationDuration = 800,
        } = props;

        this._appendGradientDefs(svg, data, elementId, 'bar');

        const margin = { top: 20, right: 20, bottom: 40, left: 40 };
        const chartWidth = width - margin.left - margin.right;
        const chartHeight = height - margin.top - margin.bottom;
        const topValue = this._getMaxvalue(data, totalValue, chartContent);
        const bootomValue = minValue ? minValue : 0;
        const totalWidth = (barThickness * data.length) + margin.left + margin.right;
        const theWidth = chartWidth > totalWidth ? chartWidth : totalWidth;

        svgContainer.attr('width', theWidth + margin.left + margin.right);

        const chartGroup = svg.append('g')
            .attr('transform', `translate(${margin.left - width / 2}, ${margin.top - height / 2})`);

        const x = scaleBand()
            .domain(data.map((d) => d.label))
            .range([0, theWidth])
            .padding(0.2);

        const y = scaleLinear()
            .domain([bootomValue, topValue])
            .nice()
            .range([chartHeight, 0]);

        chartGroup.append('g')
            .call(axisLeft(y).ticks(5))
            .selectAll('text')
            .attr('font-size', '10px')
            .attr('fill', '#333');

        const xLabels = chartGroup.append('g')
            .attr('transform', `translate(0, ${chartHeight})`)
            .call(axisBottom(x))
            .selectAll('text');

        let diagonal = false;

        xLabels.each(function() {
            const textWidth = this.getBBox().width;
            if (textWidth > x.bandwidth()) {
                diagonal = true;
            }
        });

        if (diagonal) {
            xLabels
                .attr('text-anchor', 'end')
                .attr('transform', 'rotate(-45)')
                .attr('dx', '-0.5em')
                .attr('dy', '0.25em');
        } else {
            xLabels
                .selectAll('text')
                .attr('font-size', '10px')
                .attr('fill', '#333');
        }

        if (enableGrid) {

            chartGroup.append('g')
                .attr('class', 'grid-lines-y')
                .selectAll('line')
                .data(y.ticks(5).filter(d => d !== 0))
                .enter()
                .append('line')
                .attr('x1', 1)
                .attr('x2', ((theWidth) - 1))
                .attr('y1', d => y(d))
                .attr('y2', d => y(d))
                .attr('stroke', '#e0e0e0')
                .attr('stroke-width', 1);

            const xDomain = x.domain();
            const xPositions = [];

            for (let i = 0; i < xDomain.length - 1; i++) {
                const currentCenter = x(xDomain[i]) + x.bandwidth() / 2;
                const nextCenter = x(xDomain[i + 1]) + x.bandwidth() / 2;
                const mid = currentCenter + (nextCenter - currentCenter) / 2;
                xPositions.push(mid);
            }

            const verticalGrid = chartGroup.append('g').attr('class', 'grid-lines-x');

            verticalGrid.selectAll('line')
                .data(xPositions)
                .enter()
                .append('line')
                .attr('x1', d => d)
                .attr('x2', d => d)
                .attr('y1', 0)
                .attr('y2', chartHeight)
                .attr('stroke', '#f0f0f0')
                .attr('stroke-width', 1)
                .attr('stroke-dasharray', '2,2');
        }

        const bars = chartGroup.selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('x', d => x(d.label) + (x.bandwidth() - barThickness) / 2)
            .attr('width', `${barThickness}px`)

            .attr('y', 0)
            .attr('transform', `scale(1, -1) translate(0, ${-chartHeight})`)
            .attr('height', 0)
            .attr('fill', (d, i) =>
                d.colorMode === 'gradient'
                    ? `url(#gradient-${elementId}-${i})`
                    : this._theColor(d.backgroundColor)
            )
            .style('stroke', d => this._theColor(d.borderColor))
            .style('stroke-width', d => d.borderWidth || 0)
            .style('stroke-linejoin', 'round');

        bars.transition()
            .ease(easeCubic)
            .delay((d, i) => i * 120)
            .duration(animationDuration)
            .attr('height', d => chartHeight - y(d.value));

        bars.on('mouseover', function (event, d) {
            tooltip?.show(`${d.label}: ${d.value}`, event);
        })
            .on('mousemove', function (event) {
                tooltip?.move(event);
            })
            .on('mouseout', function () {
                tooltip?.hide();
            });

        const labels = chartGroup.selectAll('.bar-label')
            .data(data)
            .enter()
            .append('text')
            .attr('class', 'bar-label')
            .attr('x', d => x(d.label) + x.bandwidth() / 2)
            .attr('y', chartHeight - 5)
            .attr('text-anchor', 'middle')
            .attr('font-size', '10px')
            .attr('fill', '#333')
            .text('');

        labels.transition()
            .ease(easeCubic)
            .delay((d, i) => i * 120)
            .duration(parseInt(animationDuration) + 700)
            .attr('y', d => {
                return y(d.value) - 5;
            })
            .tween('text', function (d) {
                const i = interpolateNumber(0, d.value);
                return function (t) {
                    select(this).text(Math.round(i(t)));
                };
            });

        legendDisplay && this._appendLegend({ svgContainer, svg, data, position: 'top', spacing: 70,  elementId, height, width });
    }

    _appendLegend({ svgContainer, svg, data, position = 'top', spacing = 50, elementId, height, width, radius = 8 }) {

        const legendGroup = svg.append('g')
            .attr('class', `chart-legend-${elementId}`);

        let yOffset = position === 'top' ? -(height/2) : (height/2);

        const legendItems = legendGroup.selectAll('.legend-item')
            .data(data)
            .enter()
            .append('g')
            .attr('class', 'legend-item');

        legendItems.append('circle')
            .attr('r', radius)
            .attr('fill', d =>
                d.colorMode === 'gradient'
                    ? `url(#gradient-${elementId}-${data.indexOf(d)})`
                    : this._theColor(d.backgroundColor)
            );

        const text = legendItems.append('text')
            .attr('x', radius + 6)
            .attr('y', 4)
            .attr('font-size', '12px')
            .attr('fill', '#333')
            .text(d => d.label);

        text.each(function(d) {
            const bbox = this.getBBox();
            d.textWidth = bbox.width + radius * 3;
        });

        const lineHeight = 24;
        const maxWidth = +svgContainer.attr('width') - 20;
        let xPos = -(maxWidth / 4);
        let yPos = yOffset;
        let isDown = 0;

        legendItems.attr('transform', function(d) {
            if (xPos + d.textWidth > maxWidth - (maxWidth / 4)) {
                xPos = -(maxWidth / 4);
                yPos += lineHeight;
                isDown++;
            }

            const transform = `translate(${xPos}, ${yPos})`;
            xPos += d.textWidth;
            return transform;
        });

        legendGroup.attr('transform', `translate(0, -${lineHeight * isDown})`);
    }

    _appendTooltip(chartId) {
        const tooltip = select(chartId)
            .append('div')
            .attr('class', 'chart-tooltip');

        let tooltipX = 0, tooltipY = 0, targetX = 0, targetY = 0;

        function animateTooltip() {
            tooltipX += (targetX - tooltipX) * 0.1;
            tooltipY += (targetY - tooltipY) * 0.1;
            tooltip.style('left', tooltipX + 'px')
                .style('top', tooltipY + 'px');
            requestAnimationFrame(animateTooltip);
        }
        animateTooltip();

        return {
            show(text, event) {
                tooltip.html(text)
                    .transition()
                    .duration(300)
                    .style('opacity', 1);

                targetX = event.clientX;
                targetY = event.clientY;
            },
            move(event) {
                targetX = event.clientX;
                targetY = event.clientY;
            },
            hide() {
                tooltip.transition()
                    .duration(300)
                    .style('opacity', 0);
            }
        };
    }

    _animateNumber(element, data) {
        const {
            chartItems,
            totalValue,
            multiValue,
            chartContent,
            animationDuration,
        } = data;

        const el = element.nodes ? element.nodes[0] : element;
        const endValue = multiValue || chartContent === 'number'
            ? totalValue
            : chartItems[0].value;

        const startValue = 0;
        const duration = animationDuration || 1000;
        const startTime = performance.now();

        function cubicBezierEase(t) {
            return t < 0.5
                ? 4 * t * t * t
                : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }

        const isPercentage =
            (endValue > 0 && endValue <= 1) ||
            (el && el.innerHTML?.toLowerCase().includes('%'));

        const finalEndValue = endValue <= 1 ? endValue * 100 : endValue;

        function animate(time) {
            const elapsed = time - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = cubicBezierEase(progress);

            const currentValue = startValue + (finalEndValue - startValue) * easedProgress;

            let displayValue;
            if (isPercentage) {
                displayValue = Math.round(currentValue) + '%';
            } else {
                displayValue = Math.round(currentValue);
            }

            el.innerHTML = displayValue;

            if (progress < 1) requestAnimationFrame(animate);
        }

        el && requestAnimationFrame(animate);
    }

    _theColor (color) {
        const theColor = color ? color : {
            r: 255,
            g: 255,
            b: 255,
            a: 0
        };

        const { r, g, b, a, type, id } = theColor;
        let result = '';

        if ((r || r === 0) && (g || g === 0) && (g || g === 0)) {
            result = `rgba(${r}, ${g}, ${b}, ${a})`;
        }

        if ('variable' === type) {
            const value = `--wp--preset--color--${id}`;
            const temp = document.createElement('div');
            document.body.appendChild(temp);

            temp.style.setProperty('color', `var(${value})`);
            const computedColor = getComputedStyle(temp).color;
            document.body.removeChild(temp);

            const rgbaMatch = computedColor.match(/\d+/g);
            if (!rgbaMatch || rgbaMatch.length < 3) return null;

            const [r, g, b] = rgbaMatch.map(Number);
            result = `rgba(${r}, ${g}, ${b}, 1)`;
        }

        return result;
    }

    _getDeviceType() {
        const {breakPoints} =  window['GutenverseConfig'] || window['GutenverseData'] || {};
        const screenWidth = window.screen.width;
        let currentDevice = 'Desktop';

        if (isEmpty(breakPoints)) {
            return currentDevice;
        }

        if(screenWidth < breakPoints['Tablet'] && screenWidth > breakPoints['Mobile']){
            currentDevice = 'Tablet';
        } else if (screenWidth < breakPoints['Mobile']) {
            currentDevice = 'Mobile';
        }

        return currentDevice;
    }
}

const selected = u('.guten-chart');

if (selected) {
    new GutenverseChart(selected);
}