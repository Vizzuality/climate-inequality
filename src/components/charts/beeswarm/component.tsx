/* eslint-disable prettier/prettier */
import { FC, useEffect, useMemo, useRef, useState } from 'react';

import classNames from 'classnames';

import * as d3 from 'd3';

import Tooltip from 'components/tooltip';

import { BeeswarmChartProps, BeeswarmDataset } from './types';

type SimulationNode = d3.SimulationNodeDatum & BeeswarmDataset;

const BeeswarmChart: FC<BeeswarmChartProps> = ({
  dataset,
  margin = 100,
  xLabel = ['Low', 'High'],
  radioUnit,
  xValueUnit,
  radiusSize,
  width = 1000,
  height = 400,
  isMobile,
}) => {
  const simulation = useRef<d3.Simulation<SimulationNode, undefined>>(null);
  const [nodes, setNodes] = useState<SimulationNode[]>([]);
  // console.log(nodes[0].name);

  useEffect(() => {
    // Create the simulation and add the event listener
    simulation.current = d3.forceSimulation();
    simulation.current.on('tick', () => {
      setNodes([...simulation.current.nodes()]);
    });
  }, []);

  useEffect(() => {
    const colorDomain = d3.extent(dataset.map((d) => d.color));
    const colorScale = d3.scaleLinear<string>().domain(colorDomain).range(['#FEE124', '#FFFFFF']);
    const radiusDomain = d3.extent(dataset.map((d) => d.radio));
    const radiusRangeMax =
      radiusSize === 'md' ? height / (isMobile ? 16 : 8) : height / (isMobile ? 20 : 12);

    const rScale = d3.scaleSqrt().domain(radiusDomain).range([1, radiusRangeMax]);
    const xDomain = d3.extent(dataset.map((d) => d.xValue));

    const xScale = d3
      .scaleLog()
      .domain(xDomain)
      .range([margin, (isMobile ? height : width) - margin]);

    const x = isMobile ? () => width / 2 : xScale;
    const y = isMobile ? xScale : () => height / 2;
    const data = dataset.map((d, i) => {
      const prevNode = nodes[i];
      return {
        ...d,
        x: prevNode?.x || x(d.xValue),
        y: prevNode?.y || y(d.xValue),
        radio: rScale(d.radio),
        colorScale: colorScale(d.color),
      };
    });

    simulation.current
      .nodes(data)
      .force('y', d3.forceY((d: SimulationNode) => y(d.xValue)).strength(isMobile ? 0.75 : 0.25))
      .force('x', d3.forceX((d: SimulationNode) => x(d.xValue)).strength(isMobile ? 0.25 : 0.75))
      .force('collide', d3.forceCollide((d: SimulationNode) => d.radio + 3.5).strength(0.5))
      .alpha(0.2)
      .restart();

    return () => {
      simulation.current.stop();
    };
  }, [dataset, height, isMobile, margin, radiusSize, width]);

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
        .sort((a, b) => b.radio - a.radio)
        .slice(0, 3)
        .filter((d) => d.name.split(' ').every((slice) => getTextSize(slice) < d.radio * 2))
        .map((d) => d.name),
    [nodes]
  );

  const [tooltipOpen, setTooltipOpen] = useState<string>(null);

  return (
    <div>
      <div className="text-opacity-0 hidden-text"></div>
      <svg key="svg-scontainer" width={width} height={height}>
        {nodes.map((node) => (
          <Tooltip
            key={node.name}
            arrowProps={{ enabled: true, size: 7.5, className: 'mb-1' }}
            placement="top"
            onChange={(open) => setTooltipOpen(open ? node.name : null)}
            content={
              <div className="p-2 mb-1 text-xs bg-white text-900">
                <span className="font-semibold">{node.name}</span>
                <span className="block">
                  {node.radio} {radioUnit}
                </span>
                <span className="block">
                  {node.color} {xValueUnit}
                </span>
              </div>
            }
          >
            <g key={node.name} className="group">
              <circle
                cx={node.x}
                cy={node.y}
                r={node.radio + 3.5}
                stroke="#ffffff"
                strokeWidth={1}
                className={classNames('transition-opacity duration-300 ease-out', {
                  'opacity-100': tooltipOpen === node.name,
                  'opacity-0': tooltipOpen !== node.name,
                })}
              />
              <circle
                cx={node.x}
                cy={node.y}
                r={node.radio}
                fill={node.colorScale || '#FEE124'}
                className={classNames('transition-shadow duration-300 ease-out', {
                  'drop-shadow-[0_0_10px_rgb(254,225,36)]': tooltipOpen === node.name,
                  'drop-shadow-none': tooltipOpen !== node.name,
                })}
              />
              {top3Radio.includes(node.name) && (
                <text
                  textAnchor="middle"
                  className="max-w-full whitespace-pre-wrap fill-[#130E19] text-xs font-bold"
                >
                  {node.name.split(' ').map((t, i) => (
                    <tspan textAnchor="middle" key={t} x={node.x} y={node.y + i * 12}>
                      {t}
                    </tspan>
                  ))}
                </text>
              )}
            </g>
          </Tooltip>
        ))}
        <text
          x={isMobile ? width / 2 : 0}
          y={isMobile ? 10 : height * 0.2}
          className="text-sm font-semibold fill-white"
          textAnchor={isMobile ? 'middle' : 'start'}
        >
          {xLabel[0]}
        </text>
        <line
          x1={isMobile ? width / 2 : 0}
          x2={isMobile ? width / 2 : width}
          y1={isMobile ? 20 : height / 2}
          y2={isMobile ? height - 20 : height / 2}
          strokeDasharray={3}
          strokeWidth={1}
          stroke="#ffffff"
        />
        <text
          x={isMobile ? width / 2 : width}
          y={isMobile ? height - 5 : height * 0.2}
          textAnchor={isMobile ? 'middle' : 'end'}
          className="text-sm font-semibold fill-white"
        >
          {xLabel[1]}
        </text>
      </svg>
    </div>
  );
};

export default BeeswarmChart;

// tick 483.76 - last -1
// data 305.4566553959771
// tick 320.19 - first 1
// tick 482.49 - last 1

// data 301.52238848492476
// tick 317.66 first 2
// tick 497.27 last 2
