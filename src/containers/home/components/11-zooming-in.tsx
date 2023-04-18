import { useEffect, useMemo, useRef, useState } from 'react';

import * as d3 from 'd3';
import { uniq } from 'lodash-es';

import data from 'containers/home/data/emission-group-3-countries.json';

import Icon from 'components/icon';
import SectionSubtitle from 'components/section-subtitle/component';
import SectionTitle from 'components/section-title/component';

import CircleLegend from 'svgs/ui/circle-legend.svg';
import ColorLegend from 'svgs/ui/income-population-legend.svg';

type Dataset = d3.SimulationNodeDatum & {
  country: string;
  value: number;
  r: number;
  x: number;
  y: number;
  color: string;
  group: string;
  groupSize: number;
};

const groups = ['top', 'middle', 'bottom'];
const positions = [
  { x: 1.45, y: 3 },
  { x: 1.47, y: 3 },
  { x: 1.37, y: 2.1 },
];

const ZoomingIn = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const resizeContainer = () => {
      setWidth(containerRef.current?.clientWidth);
    };
    resizeContainer();
    if (typeof window !== undefined) {
      window.addEventListener('resize', resizeContainer);
    }
    return () => {
      window.removeEventListener('resize', resizeContainer);
    };
  }, []);

  const [dataset, setDataSet] = useState<Dataset[]>([]);

  const countries: string[] = useMemo(() => uniq(dataset.map((d) => d.country)), [dataset]);

  useEffect(() => {
    const maxRadius = 284;
    const domain = d3.extent(
      data.map(({ bottom, middle, top }) => Object.values({ bottom, middle, top })).flat()
    );
    const isMobile = width < 768;
    const radiusRangeMax = width / (isMobile ? 1.6 : 3.5);
    const rScale = d3
      .scaleRadial()
      .domain(domain)
      .range([isMobile ? 20 : 30, radiusRangeMax > maxRadius ? maxRadius : radiusRangeMax]);
    const colorScale = d3.scaleLinear<string>().domain(domain).range(['#FFFFFF', '#FEE124']);

    setDataSet(
      data
        .map(({ bottom, middle, top, name }, i) => {
          const groupSize = rScale(middle) + rScale(top);
          return [top, middle, bottom].map((value, index) => {
            const r = rScale(value) / 2 - 1;
            const x =
              index === 0 ? r : index === 1 ? groupSize - r : (groupSize * positions[i].x) / 2;
            const y = index === 0 || index === 1 ? groupSize / 2 : groupSize - r * positions[i].y;
            return {
              country: name,
              value,
              r,
              x,
              y,
              color: colorScale(value),
              group: groups[index],
              groupSize,
            };
          });
        })
        .flat()
    );
  }, [width]);

  return (
    <div className="container flex min-h-screen flex-col justify-between py-12 lg:py-16 2xl:justify-around">
      <div className="lg:w-1/2">
        <SectionTitle className="mb-2">Zooming in on internal inequality.</SectionTitle>
        <SectionSubtitle className="mb-6" size="small">
          Income inequality is integral to carbon inequality.
        </SectionSubtitle>
        <p className="text-sm lg:text-base">
          When changing the view from a country&apos;s{' '}
          <span className="font-semibold">total emissions to per capita</span>, the comparison
          between and within countries changes dramatically. This shows the challenge of striving
          for more equal societies without increasing global emissions.{' '}
          <span className="font-semibold">
            We need sustainable development while reducing the carbon intensity associated with
            high-income lives
          </span>
          .
        </p>
      </div>
      <div
        className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 lg:-mt-20 lg:items-end lg:justify-between lg:gap-y-0 lg:gap-x-0"
        ref={containerRef}
      >
        {countries.map((country) => {
          const groupNodes = dataset.filter((node) => node.country === country);
          const groupSize = groupNodes[0].groupSize;
          return (
            <div key={groupSize}>
              <svg width={groupSize + 1} height={groupSize + 1}>
                <circle r={groupSize / 2} cx="50%" cy="50%" stroke="white" />
                {groupNodes.map(({ color, r, x, y, value }, index) => {
                  return (
                    <g key={value} width={groupSize} height={groupSize}>
                      <circle r={r - 2} color={color} cx={x} cy={y} fill={color} strokeWidth={0} />
                      {r > 30 && (
                        <text
                          x={x}
                          y={y}
                          className="fill-black text-sm font-semibold"
                          textAnchor="middle"
                        >
                          {index === 0 ? 'Top 10' : index === 1 ? 'Middle 40' : 'Bottom 50'}
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>
              <p className="mt-2 text-center lg:mt-6">{groupNodes[0].country}</p>
            </div>
          );
        })}
      </div>
      <div className="mt-6 flex flex-col justify-between gap-8 text-ligth-gray lg:mt-0 lg:flex-row lg:gap-0">
        <div className="flex justify-between gap-6 text-2xs">
          <div className="max-w-[180px]">
            <p>Average pre-tax national income by population group (€/year)</p>
            <Icon className="h-4 w-full" icon={ColorLegend} />
            <div className="flex justify-between">
              <p>Min</p>
              <p>Max</p>
            </div>
          </div>
          <div className="flex">
            <p className="w-32">Average per capita group emissions in tCO2e/ca</p>
            <Icon className="h-12 w-12" icon={CircleLegend} />
            <div className="flex flex-col justify-between">
              <p>Min</p>
              <p>Max</p>
            </div>
          </div>
        </div>
        <div className="">
          <p>
            Source:{' '}
            <a
              href="https://wid.world/data/"
              className="underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              World Inequality Database
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ZoomingIn;
