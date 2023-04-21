/* eslint-disable prettier/prettier */
import { FC, useEffect, useMemo, useRef, useState } from 'react';

import classNames from 'classnames';

import * as d3 from 'd3';

import { COLORS } from 'containers/emission-chart/utils';

import Tooltip from 'components/tooltip';

import { BeeswarmChartProps, BeeswarmDataset } from './types';

type SimulationNode = d3.SimulationNodeDatum & BeeswarmDataset & { r: number };

const BeeswarmChart: FC<BeeswarmChartProps> = ({
  dataset,
  xLabel = ['Low', 'High'],
  radioUnit,
  xValueUnit,
  radiusSize,
  width = 0,
  height = 0,
  yearChanged = false,
}) => {
  const simulation = useRef<d3.Simulation<SimulationNode, undefined>>(null);
  const [nodes, setNodes] = useState<SimulationNode[]>([]);
  const isMobile = useMemo(() => height > width, [height, width]);

  useEffect(() => {
    // Create the simulation and add the event listener
    simulation.current = d3.forceSimulation();
    simulation.current.on('tick', () => {
      setNodes([...simulation.current.nodes()]);
    });
  }, []);

  useEffect(() => {
    const colorDomain = d3.extent(dataset.map((d) => d.color));
    const colorScale = d3
      .scaleLinear<string>()
      .domain(colorDomain)
      .range([COLORS.yellow, COLORS.white]);
    const radiusDomain = d3.extent(dataset.map((d) => d.radio));
    const radiusRangeMax =
      radiusSize === 'md' ? height / (isMobile ? 16 : 8) : height / (isMobile ? 20 : 12);
    const margin = radiusRangeMax * 2.5;

    const rScale = d3.scaleSqrt().domain(radiusDomain).range([1, radiusRangeMax]);
    const xDomain = d3.extent(dataset.map((d) => d.xValue));
    const xScale = d3
      .scaleLog()
      .domain(xDomain)
      .range([margin, (isMobile ? height : width) - margin]);

    const x = isMobile ? () => width / 2 : xScale;
    const y = isMobile ? xScale : () => height / 2;
    const data = dataset.map((d) => {
      const prevNode = nodes.find((n) => n.name === d.name);
      return {
        ...d,
        x: prevNode?.x || x(d.xValue),
        y: prevNode?.y || y(d.xValue),
        r: rScale(d.radio),
        radio: d.radio,
        colorScale: colorScale(d.color),
      };
    });

    simulation.current.nodes(data);

    const mainAxisStrength = 1;
    const secondaryAxisStrength = 0.5;

    simulation.current
      .force(
        'y',
        d3
          .forceY((d: SimulationNode) => y(d.xValue))
          .strength(isMobile ? mainAxisStrength : secondaryAxisStrength)
      )
      .force(
        'x',
        d3
          .forceX((d: SimulationNode) => x(d.xValue))
          .strength(isMobile ? secondaryAxisStrength : mainAxisStrength)
      )
      .force('collide', d3.forceCollide((d: SimulationNode) => d.r + 3.5).strength(0.75))
      .alpha(yearChanged ? 0.01 : 0.15)
      .restart();

    return () => {
      simulation.current.stop();
    };
    // 'nodes' can't be in the dependencies because we don't want to update the simulation when nodes change (when simulation ticks)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataset, height, isMobile, radiusSize, width, yearChanged]);

  const getTextSize = (text: string) => {
    if (!d3) return;
    const container = d3.select('.hidden-text').append('svg');
    container.append('text').attr('x', 10).attr('y', 10).text(text);
    const size = container.node().getBBox().width;
    container.remove();
    return size;
  };

  const top3Radio = useMemo(
    () =>
      nodes
        .sort((a, b) => b.r - a.r)
        .slice(0, 3)
        .filter((d) => d.name.split(' ').every((slice) => getTextSize(slice) < d.r * 2))
        .map((d) => d.name),
    [nodes]
  );

  const [tooltipOpen, setTooltipOpen] = useState<string>(null);

  return (
    <div>
      <div className="hidden-text text-opacity-0"></div>
      <svg key="svg-scontainer" width={width} height={height}>
        <line
          x1={isMobile ? width / 2 : 0}
          x2={isMobile ? width / 2 : width}
          y1={isMobile ? 20 : height / 2}
          y2={isMobile ? height - 20 : height / 2}
          strokeDasharray={3}
          strokeWidth={1}
          className="stroke-white"
        />
        {nodes.map((node) => {
          const nameText = node.name.split(' ');
          return (
            <Tooltip
              key={node.name}
              arrowProps={{ enabled: true, size: 7.5, className: 'mb-1' }}
              placement="top"
              onChange={(open) => setTooltipOpen(open ? node.name : null)}
              content={
                <div className="mb-1 bg-white p-2 text-xs text-900">
                  <span className="font-semibold">{node.name}</span>
                  <span className="block">
                    {node.radio?.toFixed(2)} {radioUnit}
                  </span>
                  <span className="block">
                    {node.color.toFixed(2)} {xValueUnit}
                  </span>
                </div>
              }
            >
              <g key={node.name} className="group">
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.r + 3.5}
                  strokeWidth={1}
                  className={classNames('stroke-white transition-opacity duration-300 ease-out', {
                    'opacity-100': tooltipOpen === node.name,
                    'opacity-0': tooltipOpen !== node.name,
                  })}
                />
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.r}
                  fill={node.colorScale}
                  className={classNames('transition-shadow duration-300 ease-out', {
                    'drop-shadow-yellow': tooltipOpen === node.name,
                    'drop-shadow-none': tooltipOpen !== node.name,
                  })}
                />
                {top3Radio.includes(node.name) && (
                  <text
                    alignmentBaseline="middle"
                    textAnchor="middle"
                    className="max-w-full whitespace-pre-wrap fill-black text-xs font-bold"
                    // transform={`translate(0,-${((nameText.length - 1) * 15) / 2})`}
                  >
                    {nameText.map((t, i) => (
                      <tspan textAnchor="middle" key={t} x={node.x} y={node.y + i * 12}>
                        {t}
                      </tspan>
                    ))}
                  </text>
                )}
              </g>
            </Tooltip>
          );
        })}
        <text
          x={isMobile ? width / 2 : 0}
          y={isMobile ? 10 : height * 0.2}
          className="fill-white text-sm font-semibold"
          textAnchor={isMobile ? 'middle' : 'start'}
        >
          {xLabel[0]}
        </text>
        <text
          x={isMobile ? width / 2 : width}
          y={isMobile ? height - 5 : height * 0.2}
          textAnchor={isMobile ? 'middle' : 'end'}
          className="fill-white text-sm font-semibold"
        >
          {xLabel[1]}
        </text>
      </svg>
    </div>
  );
};

export default BeeswarmChart;
