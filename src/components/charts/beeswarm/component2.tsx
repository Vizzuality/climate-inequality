/* eslint-disable prettier/prettier */
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import classNames from 'classnames';

import * as d3 from 'd3';

import { COLORS } from 'containers/emission-chart/utils';

import Tooltip from 'components/tooltip';

import ArrowRigthIcon from 'svgs/ui/arrow-right.svg';

import { BeeswarmChartProps, BeeswarmDataset } from './types';

type SimulationNode = d3.SimulationNodeDatum & BeeswarmDataset & { r: number; fill: string };

const MARGIN_Y = 30;
const AXIS_CIRCLE_RADIUS = 3;
const ICON_WIDTH = 10;
const LINE_HEIGHT = 12;

const BeeswarmChart: FC<BeeswarmChartProps> = ({
  dataset,
  xLabel = ['Low', 'High'],
  radioUnit,
  xValueUnit,
  radiusSize,
  width = 0,
  height = 0,
  yearChanged = false,
  emissionVariation = [0, 0],
  comparationVariation = [0, 0],
}) => {
  const simulation = useRef<d3.Simulation<SimulationNode, undefined>>(null);
  const svgRef = useRef<d3.Selection<d3.BaseType, unknown, HTMLElement, any>>(null);
  // const [nodes, setNodes] = useState<SimulationNode[]>([]);
  const isMobile = useMemo(() => height > width, [height, width]);
  const colorDomain = useMemo(() => d3.extent(dataset.map((d) => d.color)), [dataset]);
  const colorScale = useMemo(
    () => d3.scaleLinear<string>().domain(colorDomain).range([COLORS.white, COLORS.yellow]),
    [colorDomain]
  );
  const maxRadius = useMemo(
    () =>
      radiusSize === 'sm'
        ? height / (isMobile ? 20 : 10)
        : radiusSize === 'md'
        ? height / (isMobile ? 18 : 5)
        : height / (isMobile ? 16 : 6),
    [height, isMobile, radiusSize]
  );
  const rScale = useMemo(
    () =>
      d3
        .scaleRadial()
        .domain(emissionVariation)
        .range([2, maxRadius]),
    [emissionVariation, maxRadius]
  );
  const xScale = useMemo(
    () =>
      d3
        .scaleLinear()
        .domain(comparationVariation)
        .range([0, width]),
    [comparationVariation, width]
  );

  const tick = useCallback(() => {
    console.log('tick');
    d3.select('#beeswarm-chart')
      .selectAll('.circle')
      .attr('cx', (d: SimulationNode) => d.x)
      .attr('cy', (d: SimulationNode) => d.y)
      // .attr('fill', (d: SimulationNode) => colorScale(d.color))
      // .attr('r', (d: SimulationNode) => rScale(d.radio));
  }, [colorScale, rScale]);

  useEffect(() => {
    console.log({height, width});
    // svgRef.current = d3.select('#beeswarm-chart');
    d3.select('#beeswarm-chart')
      .selectAll('.beeswarm-circle')
      .data(dataset)
      .enter()
      .append('circle')
      .attr('class', 'beeswarm-circle')
      .attr('fill', (d: SimulationNode) => colorScale(d.color))
      .attr('r', (d: SimulationNode) => rScale(d.radio))
      .attr('cy', height / 2)
      .attr('cx', (d: SimulationNode) => {
        console.log({x: d.xValue, xScaled: xScale(d.xValue)});
        return xScale(d.xValue);
      });
    simulation.current = d3.forceSimulation(
      dataset.map((d) => ({
        ...d,
        r: rScale(d.radio),
        fill: colorScale(d.color),
        x: xScale(d.xValue),
        y: height / 2,
      }))
    );

    simulation.current.on('tick', tick);

    return () => {
      // svgRef.current.remove();
    };
  }, [colorScale, dataset, height, rScale, tick, width, xScale]);

  useEffect(() => {
    if (!!simulation.current) {
      simulation.current
        .nodes(
          dataset.map((d) => ({
            ...d,
            r: rScale(d.radio),
            fill: colorScale(d.color),
            x: xScale(d.xValue),
            y: height / 2,
          }))
        )
        .force('x', d3.forceX((d: SimulationNode) => xScale(d.xValue)).strength(1))
        .force('y', d3.forceY(height / 2).strength(0.05))
        .force(
          'collide',
          d3.forceCollide((d: SimulationNode) => d.r + 1)
        )
        .alpha(0.3)
        .restart();
    }
  }, [colorScale, dataset, height, rScale, xScale]);

  return (
    <div>
      <div className="hidden-text text-opacity-0"></div>
      <svg id="beeswarm-chart" key="svg-scontainer" width={width} height={height}>
        <circle
          cx={isMobile ? width / 2 : AXIS_CIRCLE_RADIUS}
          cy={isMobile ? MARGIN_Y : height / 2}
          r={AXIS_CIRCLE_RADIUS}
          className="fill-white"
        />
        <line
          x1={isMobile ? width / 2 : 0}
          x2={isMobile ? width / 2 : width}
          y1={isMobile ? MARGIN_Y : height / 2}
          y2={isMobile ? height - MARGIN_Y : height / 2}
          strokeDasharray={3}
          strokeWidth={1}
          className="stroke-white"
        />
        <svg
          width={ICON_WIDTH}
          height={ICON_WIDTH}
          viewBox={`0 0 ${ICON_WIDTH} ${ICON_WIDTH}`}
          className="overflow-visible fill-white"
          x={isMobile ? width / 2 : width - 8}
          y={isMobile ? height - MARGIN_Y : height / 2 - ICON_WIDTH / 2}
        >
          <g
            className={classNames({
              'translate-x-1/2 rotate-90': isMobile,
              'translate-x-0 rotate-0': !isMobile,
            })}
          >
            <use xlinkHref={`#${ArrowRigthIcon.id}`} />
          </g>
        </svg>

        <text
          x={isMobile ? width / 2 : 0}
          y={isMobile ? 10 : height * 0.25}
          className="fill-white text-xs sm:text-sm sm:font-semibold"
          textAnchor={isMobile ? 'middle' : 'start'}
        >
          {xLabel[0]}
        </text>
        <text
          x={isMobile ? width / 2 : width}
          y={isMobile ? height : height * 0.25}
          textAnchor={isMobile ? 'middle' : 'end'}
          alignmentBaseline="text-after-edge"
          className="fill-white text-xs sm:text-sm sm:font-semibold"
        >
          {xLabel[1]}
        </text>
      </svg>
    </div>
  );
};

export default BeeswarmChart;
