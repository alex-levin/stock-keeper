import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import axios from 'axios';
import './StockChart.css';

// Function component. No more constructors, setState, componentDidMount, etc.
const StockChart = (props) => {
    const chartRef = useRef(null);
    alert(props.location.state.symbol);
    // componentDidMount replacement
    // https://reactjs.org/docs/hooks-reference.html
    useEffect(() => {
        axios.get('/data/stockdata.json').then((response) => {
            let data = [];
            /*
            {
            "2010-06-01T00:00:00.000Z": {
                "High": 15.4200000763,
                "Low": 14.9600000381,
                "Open": 15.1599998474,
                "Close": 14.9899997711,
                "Volume": 56881600.0,
                "Adj Close": 10.3696069717
            },
            "2010-06-02T00:00:00.000Z": {
                "High": 15.220000267,
                "Low": 14.9200000763,
                "Open": 15.1199998856,
                "Close": 15.1999998093,
                "Volume": 49540200.0,
                "Adj Close": 10.514875412
            },
            ...
            */
            for (const date in response.data) {
                data.push({
                    date: new Date(date),
                    high: response.data[date]['High'],
                    low: response.data[date]['Low'],
                    open: response.data[date]['Open'],
                    close: response.data[date]['Close'],
                    volume: response.data[date]['Volume']
                });
            }
            renderChart(data);
        });
    });

    // https://brendansudol.com/writing/responsive-d3
    // make d3 mobile friendly
    const responsivefy = (svg) => {
        // get container + svg aspect ratio
        const container = d3.select(svg.node().parentNode),
            width = parseInt(svg.style('width')),
            height = parseInt(svg.style('height')),
            aspect = width / height;

        // get width of container and resize svg to fit it
        const resize = () => {
            var targetWidth = parseInt(container.style('width'));
            svg.attr('width', targetWidth);
            svg.attr('height', Math.round(targetWidth / aspect));
        };

        // add viewBox and preserveAspectRatio properties,
        // and call resize so that svg resizes on inital page load
        svg.attr('viewBox', '0 0 ' + width + ' ' + height)
            .attr('perserveAspectRatio', 'xMinYMid')
            .call(resize);

        // to register multiple listeners for same event type,
        // you need to add namespace, i.e., 'click.foo'
        // necessary if you call invoke this function for multiple svgs
        // api docs: https://github.com/mbostock/d3/wiki/Selections#on
        d3.select(window).on('resize.' + container.attr('id'), resize);
    };

    const movingAverage = (data, numberOfPricePoints) => {
        return data.map((row, index, total) => {
            const start = Math.max(0, index - numberOfPricePoints);
            const end = index;
            const subset = total.slice(start, end + 1);
            const sum = subset.reduce((a, b) => {
                return a + b['close'];
            }, 0);

            return {
                date: row['date'],
                average: sum / subset.length
            };
        });
    };

    const renderChart = (data) => {
        const margin = { top: 50, right: 50, bottom: 30, left: 50 };
        const width = window.innerWidth - margin.left - margin.right; // Use the window's width
        const height = window.innerHeight * 0.85 - margin.top - margin.bottom; // Use the window's height

        // find data range
        const xMin = d3.min(data, (d) => {
            return d['date'];
        });

        const xMax = d3.max(data, (d) => {
            return d['date'];
        });

        const yMin = d3.min(data, (d) => {
            return d['close'];
        });

        const yMax = d3.max(data, (d) => {
            return d['close'];
        });

        // scale using range
        // https://www.d3indepth.com/scales/
        const xScale = d3.scaleTime().domain([xMin, xMax]).range([0, width]);

        const yScale = d3
            .scaleLinear()
            .domain([yMin - 5, yMax])
            .range([height, 0]);

        const svg = d3
            .select(chartRef.current)
            .append('svg')
            .attr('width', width + margin['left'] + margin['right'])
            .attr('height', height + margin['top'] + margin['bottom'])
            .call(responsivefy)
            .append('g')
            .attr(
                'transform',
                `translate(${margin['left']}, ${margin['top']})`
            );

        // create the axes component
        svg.append('g')
            .attr('id', 'xAxis')
            .attr('transform', `translate(0, ${height})`)
            .call(d3.axisBottom(xScale));

        svg.append('g')
            .attr('id', 'yAxis')
            .attr('transform', `translate(${width}, 0)`)
            .call(d3.axisRight(yScale));

        // generates lines when called
        const line = d3
            .line()
            .x((d) => {
                return xScale(d['date']);
            })
            .y((d) => {
                return yScale(d['close']);
            });

        const movingAverageLine = d3
            .line()
            .x((d) => {
                return xScale(d['date']);
            })
            .y((d) => {
                return yScale(d['average']);
            })
            .curve(d3.curveBasis);

        svg.append('path')
            .data([data]) // binds data to the line
            .style('fill', 'none')
            .attr('id', 'priceChart')
            .attr('stroke', 'steelblue')
            .attr('stroke-width', '1.5')
            .attr('d', line);

        // calculates simple moving average over 50 days
        const movingAverageData = movingAverage(data, 49);
        svg.append('path')
            .data([movingAverageData])
            .style('fill', 'none')
            .attr('id', 'movingAverageLine')
            .attr('stroke', '#FF8900')
            .attr('d', movingAverageLine);

        // renders x and y crosshair
        const focus = svg
            .append('g')
            .attr('class', 'focus')
            .style('display', 'none');

        focus.append('circle').attr('r', 4.5);
        focus.append('line').classed('x', true);
        focus.append('line').classed('y', true);

        svg.append('rect')
            .attr('class', 'overlay')
            .attr('width', width)
            .attr('height', height)
            .on('mouseover', () => focus.style('display', null))
            .on('mouseout', () => focus.style('display', 'none'))
            .on('mousemove', generateCrosshair);

        d3.select('.overlay').style('fill', 'none');
        d3.select('.overlay').style('pointer-events', 'all');

        d3.selectAll('.focus line').style('fill', 'none');
        d3.selectAll('.focus line').style('stroke', '#67809f');
        d3.selectAll('.focus line').style('stroke-width', '1.5px');
        d3.selectAll('.focus line').style('stroke-dasharray', '3 3');

        /* Volume series bars */
        const volData = data.filter(
            (d) => d['volume'] !== null && d['volume'] !== 0
        );

        const yMinVolume = d3.min(volData, (d) => {
            return Math.min(d['volume']);
        });

        const yMaxVolume = d3.max(volData, (d) => {
            return Math.max(d['volume']);
        });

        const yVolumeScale = d3
            .scaleLinear()
            .domain([yMinVolume, yMaxVolume])
            .range([height, height * (3 / 4)]);

        svg.selectAll()
            .data(volData)
            .enter()
            .append('rect')
            .attr('x', (d) => {
                return xScale(d['date']);
            })
            .attr('y', (d) => {
                return yVolumeScale(d['volume']);
            })
            .attr('class', 'vol')
            .attr('fill', (d, i) => {
                if (i === 0) {
                    return '#03a678';
                } else {
                    return volData[i - 1].close > d.close
                        ? '#c0392b'
                        : '#03a678'; // green bar if price is rising during that period, and red when price  is falling
                }
            })
            .attr('width', 1)
            .attr('height', (d) => {
                return height - yVolumeScale(d['volume']);
            });

        //returs insertion point
        const bisectDate = d3.bisector((d) => d.date).left;

        // generate crosshair
        // cannot use arrow function because arrow functions don't have _this_
        function generateCrosshair() {
            // d3.mouse(this): (2) [893.113525390625, 90.0245361328125]
            // mouse pointer x, y coordinates
            // returns corresponding value from the domain
            const correspondingDate = xScale.invert(d3.mouse(this)[0]);
            //gets insertion point
            const i = bisectDate(data, correspondingDate, 1);
            const d0 = data[i - 1];
            const d1 = data[i];
            const currentPoint =
                correspondingDate - d0['date'] > d1['date'] - correspondingDate
                    ? d1
                    : d0;
            focus.attr(
                'transform',
                `translate(${xScale(currentPoint['date'])}, ${yScale(
                    currentPoint['close']
                )})`
            );

            focus
                .select('line.x')
                .attr('x1', 0)
                .attr('x2', width - xScale(currentPoint['date']))
                .attr('y1', 0)
                .attr('y2', 0);

            focus
                .select('line.y')
                .attr('x1', 0)
                .attr('x2', 0)
                .attr('y1', 0)
                .attr('y2', height - yScale(currentPoint['close']));

            /* Legends */
            function updateLegends(currentData) {
                d3.selectAll('.lineLegend').remove();

                const legendKeys = Object.keys(data[0]);
                const lineLegend = svg
                    .selectAll('.lineLegend')
                    .data(legendKeys)
                    .enter()
                    .append('g')
                    .attr('class', 'lineLegend')
                    .attr('transform', (d, i) => {
                        return `translate(0, ${i * 20})`;
                    });
                lineLegend
                    .append('text')
                    .text((d) => {
                        if (d === 'date') {
                            return `${d}: ${currentData[
                                d
                            ].toLocaleDateString()}`;
                        } else if (
                            d === 'high' ||
                            d === 'low' ||
                            d === 'open' ||
                            d === 'close'
                        ) {
                            return `${d}: ${currentData[d].toFixed(2)}`;
                        } else {
                            return `${d}: ${currentData[d]}`;
                        }
                    })
                    .style('fill', 'white')
                    .attr('transform', 'translate(15,9)'); //align texts with boxes
            }

            // updates the legend to display the date, open, close, high, low, and volume of the selected mouseover area
            updateLegends(currentPoint);
        }
    };

    return (
        <div className="chart-container">
            <div className="chart-item">
                General Dynamics Corp. is an aerospace and defense company,
                which engages in the provision of tanks, rockets, missiles,
                submarines, warships, fighters and electronics to all of the
                military services. It operates through the following segments:
                Aerospace, Combat Systems, Information Technology, Missi...
                (source: MarketWatch.com)
            </div>
            <div className="chart" ref={chartRef}></div>;
        </div>
    );
};
export default StockChart;
