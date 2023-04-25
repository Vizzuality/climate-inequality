/* eslint-disable @typescript-eslint/no-var-requires */
import { useMemo } from 'react';

import * as rawData from './data';
import { EmissionChartData, EmissionRawData } from './types';

export const COLORS = {
  white: '#fff',
  yellow: '#FEE124',
};

export const initialEmissionData: EmissionChartData = {
  comparation: 'vulnerability',
  emission: 'absolute',
  population: 'country',
};

export const useEmissionChartData = (data: EmissionChartData) =>
  useMemo(() => {
    const emission = rawData[
      `emission_${data.emission}_${data.population}`
    ] as unknown as EmissionRawData[];
    const comparation = rawData[
      `comparation_${data.comparation}_${data.population}`
    ] as unknown as EmissionRawData[];
    const income = rawData[`income_percapita_${data.population}`] as unknown as EmissionRawData[];
    return { emission, comparation, income };
  }, [data]);

export const useMinMax = (dataset: { [key: string]: number | string }[]): [number, number] =>
  useMemo(() => {
    return dataset.reduce(
      (prev, curr) => {
        const values: number[] = [
          ...(Object.values(curr).filter((v) => typeof v === 'number') as number[]),
        ];
        const min = Math.min(...values, prev[0]);
        const max = Math.max(...values, prev[1]);
        return [min, max];
      },
      [Math.pow(10, 10), 0]
    );
  }, [dataset]);
