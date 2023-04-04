/* eslint-disable prettier/prettier */
import { useEffect, useMemo, useRef, useState } from 'react';

import classNames from 'classnames';

import Button from 'components/button';
import Beeswarm, { BeeswarmDataset } from 'components/charts/beeswarm';
import RadioButton from 'components/forms/radio-button';
import Icon from 'components/icon';
import { screens } from 'styles/styles.config';

import emissionRadioLegendIcon from 'svgs/ui/emissions-radio-legend.svg';
import playIcon from 'svgs/ui/play-circle.svg';

import YearSlider from './components/year-slider';
import { EmissionChartData } from './types';
import { useEmissionChartData, initialEmissionData } from './utils';

const EmissionChart = () => {
  const yearSliderLabelRef = useRef<HTMLLabelElement>(null);
  const yearIntervalRef = useRef<NodeJS.Timer>(null);
  const chartContainerRef = useRef<HTMLDivElement>(null);

  const [emissionData, setEmissionData] = useState<EmissionChartData>(initialEmissionData);
  const { comparation, emission, income } = useEmissionChartData(emissionData);

  const years: number[] = useMemo(
    () =>
      Object.keys(comparation[0])
        .slice(2)
        .map((year) => Number(year.substring(1))),
    [comparation]
  );

  const [minYear, maxYear] = useMemo(() => [years[0], years[years.length - 1]], [years]);
  const [chartSize, setChartSize] = useState({ width: 1000, height: 300, isMobile: false });
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
            xValue,
            radio,
            color,
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
      let isMobile = false;
      if (window.innerWidth < Number(screens.sm.replace('px', ''))) {
        height = window?.innerHeight * 0.75;
        isMobile = true;
      } else {
        const lg = Number(screens.lg.replace('px', ''));
        height = width > lg ? width / 2 : width / 1.5;
      }
      setChartSize({ width, height, isMobile });
    };
    if (typeof window !== undefined) {
      resizeChart();
      window.addEventListener('resize', resizeChart);
    }
    return () => {
      window.removeEventListener('resize', resizeChart);
      clearInterval(yearIntervalRef.current);
    };
  }, []);

  const handlePlayYears = () => {
    clearInterval(yearIntervalRef.current);
    const lastYear = years[years.length - 1];
    let newYear = year === lastYear ? years[0] : year + 1;
    setYear(newYear);
    yearIntervalRef.current = setInterval(() => {
      if (newYear + 1 === lastYear + 1) {
        clearInterval(yearIntervalRef.current);
      } else {
        setYearChanged(true)
        setYear(newYear + 1);
        newYear++;
      }
    }, 1000);
  };

  const handleChangeYear = (selectedYear: number) => {
    setYearChanged(true)
    clearInterval(yearIntervalRef.current);
    setYear(selectedYear);
  };

  const legendText = useMemo(
    () =>
      emissionData.emission === 'absolute'
        ? 'Total carbon emissions (tCO2)'
        : 'Per capita carbon emissions (tCO2e)',
    [emissionData]
  );

  const handleChange = (name: keyof EmissionChartData, data: string) => {
    setYearChanged(false)
    clearInterval(yearIntervalRef.current);
    setEmissionData({ ...emissionData, [name]: data });
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-4 sm:mb-10">
        <fieldset className="flex items-center flex-shrink-0 gap-x-2">
          <RadioButton
            name="emission-type"
            onChange={(emission) => handleChange('emission', emission)}
            options={[
              { label: 'Absolute', value: 'absolute' },
              { label: 'Per capita', value: 'percapita' },
            ]}
            value={emissionData.emission}
          />
          <div className="flex text-xs gap-x-1">
            <legend>carbon emissions</legend> and
          </div>
        </fieldset>
        <fieldset className="flex items-center flex-shrink-0 gap-x-2">
          <RadioButton
            name="emission-type"
            onChange={(comparation) => handleChange('comparation', comparation)}
            options={[
              { label: 'Vulnerability', value: 'vulnerability' },
              { label: 'Readness', value: 'readness' },
            ]}
            value={emissionData.comparation}
          />
          <div className="flex text-xs gap-x-1">
            <legend>to climate change</legend> by
          </div>
        </fieldset>
        <fieldset className="flex items-center flex-shrink-0 gap-x-2">
          <RadioButton
            name="emission-type"
            onChange={(population) => handleChange('population', population)}
            options={[
              { label: 'Region', value: 'region' },
              { label: 'Country', value: 'country' },
            ]}
            value={emissionData.population}
          />
          <div className="flex text-xs gap-x-1">
            <legend className="sr-only">climate change by</legend>
          </div>
        </fieldset>
      </div>
      <div className="grid grid-flow-col grid-cols-[calc(100%-40px),40px] items-center justify-between gap-y-4 sm:grid-cols-2">
        {/* Chart */}
        <div ref={chartContainerRef} className="col-span-1 sm:col-span-2">
          <Beeswarm
            radiusSize={
              emissionData.emission === 'absolute' || emissionData.population === 'region'
                ? 'md'
                : 'sm'
            }
            xValueUnit="€/year"
            radioUnit="MtCO₂e"
            dataset={dataset}
            xLabel={[`Low ${emissionData.comparation}`, `High ${emissionData.comparation}`]}
            yearChanged={yearChanged}
            // margin={emissionData.emission === 'absolute' ? 100 : 150}
            {...chartSize}
          />
        </div>
        {/* Legends */}
        <div className="flex items-center justify-between col-span-2 col-start-1 row-start-2 leading-3 text-2xs sm:col-span-1 sm:items-start sm:gap-6">
          <div className="w-36 sm:w-44">
            <p>Average national income per capita (€/year)</p>
            <div className="my-1 h-2.5 w-full rounded-full bg-gradient-to-r from-100 to-500" />
            <div className="flex justify-between">
              <span>Min</span>
              <span>Max</span>
            </div>
          </div>
          <div className="flex leading-3 text-2xs">
            <p className="w-16 sm:w-24">{legendText}</p>
            <Icon icon={emissionRadioLegendIcon} className="h-[61px] w-[107px]" />
          </div>
        </div>
        {/* Year selector */}
        <div className="flex flex-col-reverse items-end justify-end col-start-2 row-start-1 gap-2 sm:row-start-2 sm:flex-row">
          <div className="mt-4 -rotate-90 sm:mr-2 sm:mt-0 sm:rotate-0">
            <Button
              theme="secondary"
              className={classNames('rounded-full border-0 px-0 py-0', {
                'rotate-90': chartSize.isMobile,
              })}
              size="xs"
              onClick={handlePlayYears}
            >
              <Icon icon={playIcon} className="w-8 h-8 fill-500" />
            </Button>
          </div>
          <div>
            <label ref={yearSliderLabelRef} id="select-year-label" className="sr-only">
              Select year
            </label>
            <YearSlider
              isMobile={chartSize.isMobile}
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
