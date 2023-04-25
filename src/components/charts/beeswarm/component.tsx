/* eslint-disable prettier/prettier */
import { FC, useEffect, useMemo, useRef, useState } from 'react';

import classNames from 'classnames';

import * as d3 from 'd3';

import { COLORS } from 'containers/emission-chart/utils';

import Tooltip from 'components/tooltip';

import ArrowRigthIcon from 'svgs/ui/arrow-right.svg';

import { BeeswarmChartProps, BeeswarmDataset } from './types';

type SimulationNode = d3.SimulationNodeDatum & BeeswarmDataset & { r: number };

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
      .range([COLORS.white, COLORS.yellow]);
    const maxRadius =
      radiusSize === 'sm'
        ? height / (isMobile ? 20 : 10)
        : radiusSize === 'md'
        ? height / (isMobile ? 18 : 5)
        : height / (isMobile ? 16 : 5);
    const margin =
      radiusSize === 'lg'
        ? maxRadius * 2
        : isMobile
        ? maxRadius + MARGIN_Y
        : maxRadius;

    const rScale = d3
      .scaleRadial()
      .domain(emissionVariation)
      .range([isMobile ? 1 : 2, maxRadius]);
    const xScale = d3
      .scaleLinear()
      .domain(comparationVariation)
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

    const mainAxisStrength = 0.5;
    const secondaryAxisStrength = 0.75;

    simulation.current
      .nodes(data)
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
      .force(
        'collide',
        d3.forceCollide((d: SimulationNode) => d.r + (isMobile ? 2 : 3.5)).strength(0.75)
      )
      .alpha(yearChanged ? 0.05 : 0.3)
      .restart();
    return () => {
      simulation.current.stop();
    };
    // 'nodes' can't be in the dependencies because we don't want to update the simulation when nodes change (when simulation ticks)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataset, height, isMobile, radiusSize, width, yearChanged]);

  const getTextSize = (text: string) => {
    if (typeof window !== 'undefined') {
      const container = d3.select('.hidden-text').append('svg');
      container.append('text').attr('x', 10).attr('y', 10).text(text);
      const size = container.node().getBBox().width;
      container.remove();
      return size;
    }
  };

  const top3Radio = useMemo(
    () =>
      dataset
        .sort((a, b) => b.radio - a.radio)
        .slice(0, 3)
        .map((d) => d.name),
    [dataset]
  );

  const [tooltipOpen, setTooltipOpen] = useState<string>(null);

  return (
    <div>
      <div className="hidden-text text-opacity-0"></div>
      <svg key="svg-scontainer" width={width} height={height}>
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
        {nodes.map((node) => {
          const isTop3 = top3Radio.includes(node.name);
          const nameText = isTop3 && node.name.split(' ');
          const fitsCircle = isTop3 && nameText.every((t) => getTextSize(t) < node.r * 2);
          const textLeft = isTop3 && node.x < width / 2;
          return (
            <Tooltip
              key={node.name}
              trigger={isMobile ? 'click' : 'hover'}
              arrowProps={{ enabled: true, size: 7.5, className: 'mb-1' }}
              placement="top"
              onChange={(open) => setTooltipOpen(open ? node.name : null)}
              content={
                <div className="mb-1 bg-white p-2 text-xs text-900">
                  <span className="font-semibold">{node.name}</span>
                  <span className="block">
                    {node.radio?.toLocaleString()} {radioUnit}
                  </span>
                  <span className="block">
                    {node.color.toLocaleString()} {xValueUnit}
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
                {isTop3 && (fitsCircle || radiusSize === 'lg') && (
                  <text
                    className={classNames(
                      'max-w-full whitespace-pre-wrap text-xs font-semibold sm:font-bold',
                      {
                        'fill-black ': fitsCircle,
                        'fill-white': !fitsCircle,
                      }
                    )}
                  >
                    {nameText.map((t, i) => (
                      <tspan
                        alignmentBaseline="middle"
                        textAnchor={fitsCircle ? 'middle' : textLeft ? 'end' : 'start'}
                        key={t}
                        x={fitsCircle ? node.x : node.x + (textLeft ? -1 : 1) * (node.r + 10)}
                        y={node.y - (nameText.length - 1) * (LINE_HEIGHT / 2) + i * LINE_HEIGHT} // Position the text in the middle of the circle
                      >
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
