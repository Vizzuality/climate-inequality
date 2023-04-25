export type BeeswarmDataset = {
  name: string;
  xValue: number;
  radio: number;
  color: number;
  colorScale?: string;
};

export type BeeswarmChartProps = {
  dataset: BeeswarmDataset[];
  xLabel?: [string, string];
  xValueUnit?: string;
  radioUnit?: string;
  radiusSize: 'sm' | 'md' | 'lg';
  height?: number;
  width?: number;
  isMobile?: boolean;
  /** whether the last param changed was the year  */
  yearChanged?: boolean;
  emissionVariation?: [number, number];
  comparationVariation?: [number, number];
};
