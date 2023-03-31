/* eslint-disable @typescript-eslint/no-var-requires */
import { useMemo } from 'react';

import * as rawData from './data';
import { EmissionChartData, EmissionRawData } from './types';

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
