/* eslint-disable prettier/prettier */
import { useEffect, useMemo, useRef, useState } from 'react';

import classNames from 'classnames';

import Button from 'components/button';
import Beeswarm, { BeeswarmDataset } from 'components/charts/beeswarm';
import RadioButton from 'components/forms/radio-button';
import Icon from 'components/icon';
import Tooltip from 'components/tooltip';
import { screens } from 'styles/styles.config';

import emissionRadioLegendIcon from 'svgs/ui/emissions-radio-legend.svg';
import pauseIcon from 'svgs/ui/pause.svg';
import playIcon from 'svgs/ui/play-circle.svg';

import YearSlider from './components/year-slider';
import { EmissionChartData } from './types';
import { useEmissionChartData, initialEmissionData, useMinMax } from './utils';

const EmissionChart = () => {
  const yearSliderLabelRef = useRef<HTMLLabelElement>(null);
  const yearIntervalRef = useRef<NodeJS.Timer>(null);
  const chartContainerRef = useRef<HTMLDivElement>(null);

  const [playing, setPlaying] = useState(false);
  const [emissionData, setEmissionData] = useState<EmissionChartData>(initialEmissionData);
  const { comparation, emission, income } = useEmissionChartData(emissionData);

  /** Min and max values emission for all years and countries/regions */
  const emissionVariation = useMinMax(emission);

  /** Min and max values income for all years and countries/regions */
  const colorVariation = useMinMax(income);

  // Get the years from the data
  const years: number[] = useMemo(
    () =>
      // Picks the first emission object, gets the keys that contains 'y' and transform it to a number
      Object.keys(emission[0]).reduce((prev: number[], curr) => {
        if (curr.includes('y')) {
          return [...prev, Number(curr.substring(1))];
        }
        return prev;
      }, []),
    [emission]
  );

  const [minYear, maxYear] = useMemo(() => [years[0], years[years.length - 1]], [years]);
  const [chartSize, setChartSize] = useState({ width: 0, height: 0 });
  const [year, setYear] = useState<number>(years[years.length - 1]);
  const [yearChanged, setYearChanged] = useState(false);

  const dataset = useMemo(() => {
    return comparation.reduce((prev: BeeswarmDataset[], curr) => {
      const xValue = curr?.[`y${year}`];
      const radio = emission.find(({ name }) => name === curr.name)?.[`y${year}`];
      const color = income.find(({ name }) => name === curr.name)?.[`y${year}`];
      if (!!xValue && !!radio && !!color) {
        return [
          ...prev,
          {
            name: curr.name,
            iso3: curr.iso3,
            xValue: Number(xValue),
            radio: Number(radio),
            color: Number(color),
          },
        ];
      }
      return prev;
    }, []);
  }, [comparation, emission, year, income]);

  useEffect(() => {
    const resizeChart = () => {
      const width = chartContainerRef.current.clientWidth;
      let height = 0;
      if (window.innerWidth < Number(screens.sm.replace('px', ''))) {
        height = window?.innerHeight * 0.75;
      } else {
        const lg = Number(screens.lg.replace('px', ''));
        height = width > lg ? width / 2.5 : width / 1.5;
      }
      setChartSize({ width, height });
    };

    resizeChart();
    if (typeof window !== undefined) {
      window.addEventListener('resize', resizeChart);
    }
    return () => {
      window.removeEventListener('resize', resizeChart);
      clearInterval(yearIntervalRef.current);
    };
  }, []);

  const handlePlayYears = () => {
    clearInterval(yearIntervalRef.current);
    setPlaying(!playing);
    if (playing) {
      return;
    }
    const lastYear = years[years.length - 1];
    let newYear = year === lastYear ? years[0] : year + 1;
    setYear(newYear);
    yearIntervalRef.current = setInterval(() => {
      if (newYear + 1 === lastYear + 1) {
        clearInterval(yearIntervalRef.current);
        setPlaying(false);
      } else {
        setYearChanged(true);
        setYear(newYear + 1);
        newYear++;
      }
    }, 1000);
  };

  const handleChangeYear = (selectedYear: number) => {
    setYearChanged(true);
    setPlaying(false);
    clearInterval(yearIntervalRef.current);
    setYear(selectedYear);
  };

  const legendText = useMemo(
    () =>
      emissionData.emission === 'absolute' ? (
        <span>Total carbon emissions (MtCO&#8322;e)</span>
      ) : (
        <span>Per capita carbon emissions (tCO&#8322;e)</span>
      ),
    [emissionData]
  );

  const handleChange = (name: keyof EmissionChartData, data: string) => {
    setYearChanged(false);
    setPlaying(false);
    clearInterval(yearIntervalRef.current);
    setEmissionData({ ...emissionData, [name]: data });
  };

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center gap-1 sm:mb-4 sm:gap-2">
        <fieldset className="flex flex-shrink-0 items-center gap-x-2">
          <RadioButton
            name="emission-type"
            onChange={(emission) => handleChange('emission', emission)}
            options={[
              { label: 'Absolute', value: 'absolute' },
              { label: 'Per capita', value: 'percapita' },
            ]}
            value={emissionData.emission}
          />
          <div className="flex gap-x-1 text-xs">
            <Tooltip
              arrowProps={{ enabled: true, size: 7.5, className: 'mb-1' }}
              content={
                <p className="mb-1 w-64 bg-white p-2 text-xs text-900">
                  Emissions include carbon and other greenhouse gases produced within a
                  country/region as well as net imports embedded in goods and services from other
                  regions.
                </p>
              }
            >
              <legend className="border-b border-dashed">carbon emissions</legend>
            </Tooltip>{' '}
            and
          </div>
        </fieldset>
        <fieldset className="flex flex-shrink-0 items-center gap-x-2">
          <RadioButton
            name="emission-type"
            onChange={(comparation) => handleChange('comparation', comparation)}
            options={[
              { label: 'Vulnerability', value: 'vulnerability' },
              { label: 'Readiness', value: 'readiness' },
            ]}
            value={emissionData.comparation}
          />
          <div className="flex gap-x-1 text-xs">
            <legend>to climate change</legend> by
          </div>
        </fieldset>
        <fieldset className="flex flex-shrink-0 items-center gap-x-2">
          <RadioButton
            name="emission-type"
            onChange={(population) => handleChange('population', population)}
            options={[
              { label: 'Region', value: 'region' },
              { label: 'Country', value: 'country' },
            ]}
            value={emissionData.population}
          />
          <div className="flex gap-x-1 text-xs">
            <legend className="sr-only">climate change by</legend>
          </div>
        </fieldset>
      </div>
      <div className="grid grid-flow-col grid-cols-[calc(100%-40px),40px] items-center justify-between gap-y-4 sm:grid-cols-2">
        {/* Chart */}
        <div ref={chartContainerRef} className="col-span-1 sm:col-span-2 sm:-ml-[10%] sm:w-[120%]">
          <Beeswarm
            radiusSize={
              emissionData.emission === 'absolute' && emissionData.population !== 'region'
                ? 'md'
                : emissionData.population === 'region'
                ? 'lg'
                : 'sm'
            }
            xValueUnit="€/year"
            radioUnit={emissionData.emission === 'absolute' ? 'MtCO₂e' : 'tCO₂e'}
            dataset={dataset}
            xLabel={[`Low ${emissionData.comparation}`, `High ${emissionData.comparation}`]}
            yearChanged={yearChanged}
            {...chartSize}
            emissionVariation={emissionVariation}
          />
        </div>
        {/* Legends */}
        <div className="col-span-2 col-start-1 row-start-2 flex items-center justify-between text-2xs leading-3 sm:col-span-1 sm:items-start sm:gap-6">
          <div className="w-36 sm:w-44">
            <p>Average national income per capita (€/year)</p>
            <div className="my-1 h-2.5 w-full rounded-full bg-gradient-to-r from-100 to-500" />
            <div className="flex justify-between">
              <span>{Math.round(colorVariation[0]).toLocaleString()}</span>
              <span>{Math.round(colorVariation[1]).toLocaleString()}</span>
            </div>
          </div>
          <div className="flex gap-1 text-2xs leading-3 sm:gap-2">
            <p className="w-16 sm:w-24">{legendText}</p>
            <Icon icon={emissionRadioLegendIcon} className="h-[45px] w-[47px]" />
            <div className="flex flex-col justify-between">
              <span>{Math.round(Number(emissionVariation[1])).toLocaleString()}</span>
              <span>{emissionVariation[0].toLocaleString()}</span>
            </div>
          </div>
        </div>
        {/* Year selector */}
        <div className="col-start-2 row-start-1 flex flex-col-reverse items-end justify-end gap-2 sm:row-start-2 sm:flex-row">
          <div className="mt-4 -rotate-90 sm:mr-2 sm:mt-0 sm:rotate-0">
            <Button
              theme="secondary"
              className={classNames('rounded-full border-0 px-0 py-0', {
                'rotate-90': chartSize.height > chartSize.width,
              })}
              size="xs"
              onClick={handlePlayYears}
            >
              <Icon icon={playing ? pauseIcon : playIcon} className="h-8 w-8 fill-500" />
            </Button>
          </div>
          <div>
            <label ref={yearSliderLabelRef} id="select-year-label" className="sr-only">
              Select year
            </label>
            <YearSlider
              isMobile={chartSize.height > chartSize.width}
              labelRef={yearSliderLabelRef}
              years={years}
              maxValue={maxYear}
              minValue={minYear}
              value={year}
              step={1}
              onChange={handleChangeYear}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmissionChart;
