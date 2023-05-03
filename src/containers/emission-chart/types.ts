export type DataType = Record<string, string | number>[];

export type EmissionChartData = {
  emission: 'absolute' | 'percapita';
  comparation: 'vulnerability' | 'readiness';
  population: 'country' | 'region';
};

export type EmissionChartDataset = {
  name: string;
  comparation: number;
  emission: number;
};

export type EmissionRawData = {
  name: string;
  iso3?: string;
} & {
  [key: string]: number;
};
