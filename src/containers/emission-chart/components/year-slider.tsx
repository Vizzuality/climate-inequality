/* eslint-disable prettier/prettier */
import { SVGProps, useMemo, useRef } from 'react';

import { useNumberFormatter } from '@react-aria/i18n';
import { useSlider } from '@react-aria/slider';
import { useSliderThumb } from '@react-aria/slider';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import { useSliderState } from '@react-stately/slider';
import * as d3 from 'd3';

import { YearSlideProps } from './types';

const YearSlider = ({
  years,
  isMobile = false,
  value = years[years.length-1],
  onChange,
  ...rest
}: YearSlideProps) => {
  const textMarginY = !isMobile ? 10 : 26;
  const yearDomain = useMemo(() => d3.extent(years.map((d) => d)), [years]);
  const trackRef = useRef<HTMLDivElement>(null);

  const width = useMemo(() => isMobile ? 40 : 240, [isMobile]);
  const height = useMemo(() => isMobile ? 240 : 40, [isMobile]);

  const yearScale = useMemo(
    () =>
      d3
        .scaleLinear()
        .domain(yearDomain)
        .range(!isMobile ? [0, width] : [height, 0]),
    [height, isMobile, width, yearDomain]
  );

  const orientation: 'vertical' | 'horizontal' = isMobile ? 'vertical' : 'horizontal';

  const propsOverride = useMemo(() =>({
    value: value !== undefined ? [+value] : undefined,
    defaultValue: rest.defaultValue !== undefined ? [+rest.defaultValue] : undefined,
    onChange: (values: number[]) => onChange(values[0]),
    isDisabled: rest.disabled,
    orientation,
    label: 'workaround-label',
    id: undefined,
  }), [onChange, orientation, rest.defaultValue, rest.disabled, value]);

  const sliderState = useSliderState({
    ...rest,
    ...propsOverride,
    numberFormatter: useNumberFormatter({ style: 'decimal' }),
  });

  const { groupProps, trackProps } = useSlider(
    {
      ...rest,
      ...propsOverride,
    },
    sliderState,
    trackRef
  );

  const textProps: SVGProps<SVGTextElement> = useMemo(
    () => ({
      alignmentBaseline: 'central',
      textAnchor: !isMobile ? 'middle' : 'end',
      className: 'fill-800 text-2xs',
    }),
    [isMobile]
  );

  const inputRef = useRef(null);

  const { thumbProps, inputProps } = useSliderThumb(
    {
      ...rest,
      id: 'select-year-thumb',
      index: 0,
      trackRef,
      inputRef,
      isDisabled: false,
    },
    sliderState
  );

  const lastYear = years[years.length - 1];

  return (
    <div {...groupProps}>
      <div {...trackProps} ref={trackRef} className={`relative flex items-center w-full h-full w-[${width}] h-[${height}]`}>
        <svg width={width} height={height} className="overflow-visible">
          <text
            x={!isMobile ? 0 : textMarginY}
            y={!isMobile ? textMarginY : height}
            {...textProps}
          >
            {years[0] !== value && years[0]}
          </text>
          {years.map((year) => {
            const position = value === year ? 21 : year % 10 === 0 ? 12 : 7;
            return (
              <line
                key={year}
                x1={!isMobile ? yearScale(year) : width}
                x2={!isMobile ? yearScale(year) : width - position}
                y1={!isMobile ? height - position : yearScale(year)}
                y2={!isMobile ? height : yearScale(year)}
                strokeWidth={2}
                stroke={value === year ? '#FFE229' : '#665A10'}
              />
            );
          })}
          <text
            x={!isMobile ? width : textMarginY}
            y={!isMobile ? textMarginY : 0}
            {...textProps}
          >
            {lastYear !== value && lastYear}
          </text>
          <text
            x={!isMobile ? yearScale(value) : textMarginY - 10}
            y={!isMobile ? textMarginY : yearScale(value)}
            {...textProps}
            className="text-xs fill-500"
          >
            {value}
          </text>
        </svg>
        <div
          {...thumbProps}
          className="absolute w-10 h-4 transform translate-y-2 cursor-move sm:-translate-x-2 bg-opacity-30 sm:h-10 sm:w-4"
          style={{
            left: orientation === 'horizontal' && `${sliderState.getThumbPercent(0) * 100}%`,
            bottom: orientation === 'vertical' && `${sliderState.getThumbPercent(0) * 100}%`,
          }}
        >
          <VisuallyHidden>
            <input ref={inputRef} {...inputProps} id="select-year-thumb" />
          </VisuallyHidden>
        </div>
      </div>
    </div>
  );
};

export default YearSlider;
