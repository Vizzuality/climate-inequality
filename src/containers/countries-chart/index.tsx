import { useEffect, useMemo, useRef, useState } from 'react';

import * as d3 from 'd3';
import { uniq } from 'lodash-es';

import emissions from 'containers/home/data/emission-group-3-countries.json';
import income from 'containers/home/data/income-group-3-countries.json';

import Icon from 'components/icon';
import Tooltip from 'components/tooltip/component';

import CircleLegend from 'svgs/ui/circle-legend.svg';
import ColorLegend from 'svgs/ui/income-population-legend.svg';
import { COLORS } from 'containers/emission-chart/utils';
import { useBreakpoint } from 'hooks/breakpoint';

const groups = ['top', 'middle', 'bottom'];
const groupLabels = ['top 10', 'middle 40', 'bottom 50'];

enum Groups {
  'Top 10',
  'Middle 40',
  'Bottom 50',
}

const CountriesChart = () => {
  const [width, setWidth] = useState(0);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const resizeContainer = () => {
      setWidth(chartRef.current?.clientWidth);
    };
    resizeContainer();
    if (typeof window !== undefined) {
      window.addEventListener('resize', resizeContainer);
    }
    return () => {
      window.removeEventListener('resize', resizeContainer);
    };
  }, []);

  const rDomain = d3.extent(
    emissions.map(({ bottom, middle, top }) => Object.values({ bottom, middle, top })).flat()
  );
  const cDomain = d3.extent(
    income.map(({ bottom, middle, top }) => Object.values({ bottom, middle, top })).flat()
  );
  const breakpoint = useBreakpoint();

  const dataset = useMemo(() => {
    const maxRadius = 284;
    const isMobile = !breakpoint('sm');
    const radiusRangeMax = width / (isMobile ? 1.6 : 3.5);
    const rScale = d3
      .scaleRadial()
      .domain(rDomain)
      .range([isMobile ? 20 : 30, radiusRangeMax > maxRadius ? maxRadius : radiusRangeMax]);
    const colorScale = d3
      .scaleLinear<string>()
      .domain(cDomain)
      .range([COLORS.white, COLORS.yellow]);

    return emissions
      .map(({ bottom, middle, top, name }, i) => {
        const groupSize = rScale(middle) + rScale(top);
        return [top, middle, bottom].map((emissionValue, index) => {
          const r = rScale(emissionValue) / 2;
          // 45 degrees converted to radians. Used to adjust the position of the bottom group in the circle
          const RAD = (45 * Math.PI) / 180;
          const x = index === 0 ? r : index === 1 ? groupSize - r : groupSize * Math.sin(RAD);
          const y = index === 0 || index === 1 ? groupSize / 2 : (groupSize + r) * Math.cos(RAD);
          const incomeValue: number = income[i][groups[index]];
          return {
            country: name,
            emissionValue,
            incomeValue,
            r,
            x,
            y,
            color: colorScale(incomeValue),
            group: groups[index],
            groupSize,
          };
        });
      })
      .flat();
  }, [breakpoint, cDomain, rDomain, width]);

  const countries: string[] = useMemo(() => uniq(dataset.map((d) => d.country)), [dataset]);

  return (
    <>
      <div
        className="mt-4 flex flex-wrap items-end justify-center gap-x-4 gap-y-2 lg:-mt-20 lg:justify-between lg:gap-y-0 lg:gap-x-0"
        ref={chartRef}
      >
        {countries.map((country) => {
          const groupNodes = dataset.filter((node) => node.country === country);
          const groupSize = groupNodes[0].groupSize;
          return (
            <div key={groupSize}>
              <svg width={groupSize + 1} height={groupSize + 1}>
                <circle r={groupSize / 2} cx="50%" cy="50%" stroke="white" />
                {groupNodes.map(({ color, r, x, y, emissionValue, incomeValue, group }, index) => {
                  const key = `${country}-${group}`;
                  return (
                    <Tooltip
                      key={key}
                      arrowProps={{ enabled: true, size: 7.5, className: 'mb-1' }}
                      placement="top"
                      content={
                        <div className="mb-1 bg-white p-2 text-xs text-900">
                          <p className="mb-1 font-semibold">
                            {country} {groupLabels[index]}% population
                          </p>
                          <span className="block">
                            Emissions: {Number(emissionValue.toFixed(2)).toLocaleString()} tCO2e/cap
                          </span>
                          <span className="block">
                            Income: {Number(incomeValue.toFixed(2)).toLocaleString()} euros/year
                          </span>
                        </div>
                      }
                    >
                      <g width={groupSize} height={groupSize}>
                        <circle
                          r={r - 2}
                          color={color}
                          cx={x}
                          cy={y}
                          fill={color}
                          strokeWidth={0}
                        />
                        {r > 30 && (
                          <text
                            x={x}
                            y={y}
                            className="fill-black text-sm font-semibold"
                            textAnchor="middle"
                            alignmentBaseline="middle"
                          >
                            {r > 35
                              ? Groups[index]
                              : Groups[index].split(' ').map((t, i) => (
                                  <tspan x={x} y={y + 15 * i} key={t}>
                                    {t}
                                  </tspan>
                                ))}
                          </text>
                        )}
                      </g>
                    </Tooltip>
                  );
                })}
              </svg>
              <p className="mt-2 text-center lg:mt-6">{groupNodes[0].country}</p>
            </div>
          );
        })}
      </div>
      <div className="mt-7 flex w-full flex-1 items-end sm:mt-20">
        <div className="flex h-fit w-full flex-col justify-between gap-8 text-light-gray sm:flex-row sm:gap-0">
          <div className="flex justify-between gap-6 text-2xs">
            <div className="w-1/2 max-w-[170px] flex-1">
              <p>Average pre-tax national income by population group (€/year)</p>
              <Icon className="h-4 w-full" icon={ColorLegend} />
              <div className="flex justify-between">
                <p>{Math.round(cDomain[0]).toLocaleString()}</p>
                <p>{Math.round(cDomain[1]).toLocaleString()}</p>
              </div>
            </div>
            <div className="flex h-min w-1/2 max-w-[200px] flex-1 gap-1">
              <p className="w-32">Average per capita group emissions in tCO2e/ca</p>
              <Icon className="h-12 w-12" icon={CircleLegend} />
              <div className="flex flex-col justify-between">
                <p>{parseInt(rDomain[1].toLocaleString(), 10)}</p>
                <p>{rDomain[0].toLocaleString()}</p>
              </div>
            </div>
          </div>
          <div className="text-xs sm:text-end">
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
    </>
  );
};

export default CountriesChart;
